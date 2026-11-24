/**
 * Linko AI providers (Doc14). One normalised call for every provider so the
 * engine's gates — kill switch, allowlist, budgets, breaker, latch, validation —
 * apply identically whichever model answers.
 *
 *   LINKO_AI_PROVIDER=groq       (default)  GROQ_API_KEY, GROQ_MODEL, GROQ_MODEL_ALLOWLIST
 *   LINKO_AI_PROVIDER=anthropic             ANTHROPIC_API_KEY, CLAUDE_MODEL, CLAUDE_MODEL_ALLOWLIST
 *
 * Doc14 rules applied here:
 *  - PLAT-06 / LK-AI14-032: the model comes from an allowlist and is never swapped
 *    automatically — no cross-provider fallback and no server-side refusal fallback.
 *  - LK-AI14-014: the Anthropic API version is pinned by the installed SDK release.
 *  - PLAT-08 / LK-AI14-019: Claude input is counted with count_tokens before the call.
 *  - PLAT-13 / D14-12: prompt caching stays off until it has been assessed.
 *  - §07: errors are classified (auth, spend cap, rate limit, overload/server, timeout).
 *  - PLAT-05 / AT14-003: a key tagged for one environment never serves another.
 *  - Keys are server-only and never logged (PLAT-03).
 */
import Anthropic from "@anthropic-ai/sdk";

export type ProviderName = "groq" | "anthropic";

export type ProviderMessage = { role: "user" | "assistant"; content: string };

export type ProviderUsage = { input?: number; output?: number; cacheWrite?: number; cacheRead?: number };

export type ProviderOutcome =
  | { ok: true; text: string; requestId?: string; usage: ProviderUsage | null; refusal?: boolean }
  | {
      ok: false;
      kind: "auth" | "spend" | "rate" | "timeout" | "server" | "network" | "bad_request" | "aborted";
      status?: number;
      retryAfterSec?: number;
    };

const csv = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export function providerConfig() {
  const name: ProviderName = process.env.LINKO_AI_PROVIDER === "anthropic" ? "anthropic" : "groq";
  if (name === "anthropic") {
    const model = process.env.CLAUDE_MODEL || "claude-opus-5-5";
    const allowlist = csv(process.env.CLAUDE_MODEL_ALLOWLIST || "claude-opus-5-5");
    return {
      name,
      model,
      allowlisted: allowlist.includes(model),
      keyPresent: Boolean(process.env.ANTHROPIC_API_KEY),
      // Adaptive thinking counts toward max_tokens, so Claude gets more room than a non-thinking model.
      maxOutputTokens: Number(process.env.CLAUDE_MAX_OUTPUT_TOKENS || 4000),
      environmentOk: keyEnvironmentOk(process.env.ANTHROPIC_KEY_ENVIRONMENT),
    };
  }
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const allowlist = csv(process.env.GROQ_MODEL_ALLOWLIST || "openai/gpt-oss-120b,openai/gpt-oss-20b");
  return {
    name,
    model,
    allowlisted: allowlist.includes(model),
    keyPresent: Boolean(process.env.GROQ_API_KEY),
    maxOutputTokens: 700,
    environmentOk: keyEnvironmentOk(process.env.GROQ_KEY_ENVIRONMENT),
  };
}

/** AT14-003: when both are set, the key's environment tag must match the runtime environment. */
function keyEnvironmentOk(keyEnv?: string) {
  const runtimeEnv = process.env.LINKO_ENVIRONMENT;
  // In production an untagged key is refused: a staging key must never serve production traffic.
  if (runtimeEnv === "production" && !keyEnv) return false;
  return !keyEnv || !runtimeEnv || keyEnv === runtimeEnv;
}

/* ───────────────────────────── Output schema ───────────────────────────── */

/** The Doc12 answer contract, enforced by Claude structured outputs (and re-validated afterwards). */
const ANSWER_SCHEMA = {
  type: "object",
  properties: {
    mode: { type: "string", enum: ["public_guidance", "secure_required", "handoff", "abstain"] },
    message: { type: "string" },
    sources: { type: "array", items: { type: "string" } },
    actions: {
      type: "array",
      items: {
        type: "object",
        properties: { label: { type: "string" }, route: { type: "string" } },
        required: ["label", "route"],
        additionalProperties: false,
      },
    },
  },
  required: ["mode", "message", "sources", "actions"],
  additionalProperties: false,
};

/* ───────────────────────────────── Claude ───────────────────────────────── */

let anthropicClient: Anthropic | null = null;
function claude() {
  // Retries are owned here (one bounded retry by the SDK, honouring retry-after), never unbounded (PLAT-10).
  // No automatic SDK retries: transient limits are retried once by hand below; spend caps never are (Doc14 §07, LK-AI14-037).
  anthropicClient ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0 });
  return anthropicClient;
}

/** count_tokens preflight (PLAT-08). Returns null when counting isn't available. */
export async function countInputTokens(system: string, messages: ProviderMessage[], signal: AbortSignal): Promise<number | null> {
  const cfg = providerConfig();
  if (cfg.name !== "anthropic") return null;
  try {
    const r = await claude().messages.countTokens(
      { model: cfg.model, system, messages, output_config: { format: { type: "json_schema", schema: ANSWER_SCHEMA } } },
      { signal, timeout: 5000 },
    );
    return r.input_tokens;
  } catch {
    return null;
  }
}

function classifyAnthropicError(err: unknown, signal: AbortSignal): ProviderOutcome {
  if (signal.aborted) return { ok: false, kind: "aborted" };
  if (err instanceof Anthropic.APIConnectionTimeoutError) return { ok: false, kind: "timeout" };
  if (err instanceof Anthropic.AuthenticationError) return { ok: false, kind: "auth", status: 401 };
  if (err instanceof Anthropic.PermissionDeniedError) return { ok: false, kind: "auth", status: 403 };
  if (err instanceof Anthropic.RateLimitError) {
    // A 429 about spend/usage limits is a hard stop, not a transient rate limit.
    if (/spend|usage limit|credit|billing/i.test(err.message)) return { ok: false, kind: "spend", status: 429 };
    const ra = Number(err.headers?.get?.("retry-after"));
    return { ok: false, kind: "rate", status: 429, retryAfterSec: Number.isFinite(ra) ? ra : undefined };
  }
  if (err instanceof Anthropic.BadRequestError) {
    // A spend/credit cap arrives as a 400 invalid_request_error (Doc14 AT14-036 → SPEND_HARD_STOP).
    const spend = /credit balance|spend(?:ing)? limit|usage limit|billing/i.test(err.message);
    return { ok: false, kind: spend ? "spend" : "bad_request", status: 400 };
  }
  if (err instanceof Anthropic.APIError && err.status === 529) return { ok: false, kind: "server", status: 529 };
  if (err instanceof Anthropic.APIConnectionError) return { ok: false, kind: "network" };
  if (err instanceof Anthropic.APIError) return { ok: false, kind: "server", status: err.status ?? undefined };
  return { ok: false, kind: "network" };
}

async function callClaude(system: string, messages: ProviderMessage[], signal: AbortSignal, timeoutMs: number): Promise<ProviderOutcome> {
  const first = await callClaudeOnce(system, messages, signal, timeoutMs);
  // One bounded retry, only for a transient rate limit with a short retry-after or an overload (LK-AI14-038).
  if (!first.ok && ((first.kind === "rate" && (first.retryAfterSec ?? 99) <= 8) || first.status === 529)) {
    await new Promise((r) => setTimeout(r, Math.max(first.retryAfterSec ?? 1, 1) * 1000));
    return callClaudeOnce(system, messages, signal, timeoutMs);
  }
  return first;
}

async function callClaudeOnce(
  system: string,
  messages: ProviderMessage[],
  signal: AbortSignal,
  timeoutMs: number,
): Promise<ProviderOutcome> {
  const cfg = providerConfig();
  try {
    const msg = await claude().messages.create(
      {
        model: cfg.model,
        max_tokens: cfg.maxOutputTokens,
        system,
        messages,
        // Chat answers: low effort keeps latency and spend down; structured output guarantees the JSON shape.
        output_config: { effort: "low", format: { type: "json_schema", schema: ANSWER_SCHEMA } },
      },
      { signal, timeout: timeoutMs },
    );
    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
    return {
      ok: true,
      text,
      requestId: msg._request_id ?? msg.id,
      refusal: msg.stop_reason === "refusal",
      usage: {
        input: msg.usage.input_tokens,
        output: msg.usage.output_tokens,
        cacheWrite: msg.usage.cache_creation_input_tokens ?? 0,
        cacheRead: msg.usage.cache_read_input_tokens ?? 0,
      },
    };
  } catch (err) {
    return classifyAnthropicError(err, signal);
  }
}

/* ────────────────────────────────── Groq ────────────────────────────────── */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

async function callGroq(system: string, messages: ProviderMessage[], signal: AbortSignal, timeoutMs: number): Promise<ProviderOutcome> {
  const cfg = providerConfig();
  const timed = AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]);
  let res: Response | null = null;
  let retryAfterSec: number | undefined;
  for (let attempt = 0; attempt < 2; attempt++) {
    let waitMs = 400;
    try {
      res = await fetch(GROQ_URL, {
        method: "POST",
        signal: timed,
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: cfg.model,
          temperature: 0.2,
          max_completion_tokens: cfg.maxOutputTokens,
          reasoning_effort: "low",
          include_reasoning: false,
          response_format: { type: "json_object" },
          messages: [{ role: "system", content: system }, ...messages],
        }),
      });
      if (res.ok || (res.status >= 400 && res.status < 500 && res.status !== 429)) break;
      if (res.status === 429) {
        // Honour a short retry-after only (Doc14 LK-AI14-038); never loop.
        const ra = Number(res.headers.get("retry-after"));
        retryAfterSec = Number.isFinite(ra) ? ra : undefined;
        if (!Number.isFinite(ra) || ra > 8) break;
        waitMs = Math.max(ra, 1) * 1000;
      }
    } catch {
      if (signal.aborted) return { ok: false, kind: "aborted" };
      if (timed.aborted) return { ok: false, kind: "timeout" };
      res = null;
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, waitMs));
  }
  if (!res) return { ok: false, kind: "network" };
  if (!res.ok) {
    // Decide on the provider's machine-readable error code only — the ordinary per-minute
    // rate-limit message mentions billing/upgrades and must not stop the AI.
    const err = (await res.json().catch(() => null)) as { error?: { code?: string; type?: string } } | null;
    const code = `${err?.error?.code ?? ""} ${err?.error?.type ?? ""}`;
    if (res.status === 402 || /\b(?:insufficient_quota|billing_hard_limit_reached|spend_limit(?:_exceeded)?|quota_exceeded)\b/.test(code))
      return { ok: false, kind: "spend", status: res.status };
    if (res.status === 401 || res.status === 403) return { ok: false, kind: "auth", status: res.status };
    if (res.status === 429) return { ok: false, kind: "rate", status: 429, retryAfterSec };
    if (res.status >= 500) return { ok: false, kind: "server", status: res.status };
    return { ok: false, kind: "bad_request", status: res.status };
  }
  const data = (await res.json().catch(() => null)) as {
    id?: string;
    choices?: { message?: { content?: string } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  } | null;
  return {
    ok: true,
    text: data?.choices?.[0]?.message?.content ?? "",
    requestId: data?.id ?? res.headers.get("x-request-id") ?? undefined,
    usage: data?.usage ? { input: data.usage.prompt_tokens, output: data.usage.completion_tokens } : null,
  };
}

export function callProvider(system: string, messages: ProviderMessage[], signal: AbortSignal, timeoutMs: number) {
  return providerConfig().name === "anthropic" ? callClaude(system, messages, signal, timeoutMs) : callGroq(system, messages, signal, timeoutMs);
}

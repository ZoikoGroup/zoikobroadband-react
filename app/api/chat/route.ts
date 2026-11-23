import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/app/lib/chatbot/systemPrompt";
import { checkRateLimit } from "@/app/lib/chatbot/rateLimit";
import {
  COPY,
  FLOWS,
  LinkoAction,
  LinkoAnswer,
  actionFromRoute,
  redactSensitive,
  routeIntent,
} from "@/app/lib/chatbot/linko";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ───────────── Configuration (owner-approved values go in env) ───────────── */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_ALLOWLIST = (process.env.GROQ_MODEL_ALLOWLIST || "openai/gpt-oss-120b,openai/gpt-oss-20b")
  .split(",")
  .map((s) => s.trim());
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const AI_ENABLED = process.env.LINKO_AI_ENABLED !== "false"; // kill switch
const MAX_TURNS = Number(process.env.LINKO_MAX_TURNS || 30); // user messages per conversation
const DAILY_TOKEN_BUDGET = Number(process.env.LINKO_DAILY_TOKEN_BUDGET || 2_000_000);
const MAX_OUTPUT_TOKENS = 700;
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_HISTORY = 12;
const MAX_MESSAGE_CHARS = 2000;

/* ─────────────── In-memory budget + circuit breaker (single server) ─────────
 * For several instances, move these counters to Redis/Upstash.              */

const budget = { day: "", tokens: 0 };
const breaker = { failures: 0, openUntil: 0 };

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function budgetExceeded() {
  if (budget.day !== todayKey()) {
    budget.day = todayKey();
    budget.tokens = 0;
  }
  return budget.tokens >= DAILY_TOKEN_BUDGET;
}
function recordFailure() {
  breaker.failures += 1;
  if (breaker.failures >= 3) {
    breaker.openUntil = Date.now() + 60_000;
    breaker.failures = 0;
  }
}

/* ─────────────────────────────── Helpers ─────────────────────────────────── */

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 200) return null;

  const messages: ChatMessage[] = [];
  for (const m of raw) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) });
  }
  if (messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function json(answer: LinkoAnswer, status = 200) {
  return Response.json(answer, { status, headers: { "Cache-Control": "no-store" } });
}

function flowAnswer(flow: keyof typeof FLOWS, status: LinkoAnswer["status"], redacted?: string[]): LinkoAnswer {
  const step = FLOWS[flow];
  return { status, message: step.text, tone: step.tone, actions: step.actions, redacted };
}

function degraded(status: LinkoAnswer["status"], message: string = COPY.degraded): LinkoAnswer {
  return {
    status,
    tone: "error",
    message,
    actions: [
      { kind: "command", label: "Try again", command: "retry", primary: true },
      { kind: "link", label: "Help Centre", href: "/get-help" },
      { kind: "flow", label: "Speak to our team", flow: "handoff" },
    ],
  };
}

const PRICE_RE = /£\s?\d|\b\d+(?:\.\d{1,2})?\s?(?:p|pence|GBP)\b|\b\d+(?:\.\d{2})\s?(?:a|per)\s?month\b/i;

/** Doc12 "verify" step: schema, route allowlist, no price figures, no leaked secrets. */
function validateModelOutput(raw: string): LinkoAnswer | null {
  let obj: unknown;
  try {
    obj = JSON.parse(raw);
  } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      obj = JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
  if (!obj || typeof obj !== "object") return null;
  const o = obj as { mode?: unknown; message?: unknown; actions?: unknown };
  if (typeof o.message !== "string" || !o.message.trim()) return null;

  let message = redactSensitive(o.message.trim()).text.slice(0, 1500);
  // Strip any raw URLs: destinations must come through allow-listed actions.
  message = message.replace(/https?:\/\/\S+/g, "").replace(/[ \t]{2,}/g, " ");

  const actions: LinkoAction[] = [];
  if (Array.isArray(o.actions)) {
    for (const a of o.actions.slice(0, 3)) {
      if (!a || typeof a !== "object") continue;
      const { route, label } = a as { route?: unknown; label?: unknown };
      if (typeof route !== "string") continue;
      const action = actionFromRoute(route, typeof label === "string" ? label : undefined);
      if (action && !actions.some((x) => JSON.stringify(x) === JSON.stringify(action))) actions.push(action);
    }
  }

  // Block unsupported commercial figures (AT-12-068).
  if (PRICE_RE.test(message)) {
    return { ...flowAnswer("plans", "abstained"), message: `${FLOWS.plans.text}` };
  }

  const mode = typeof o.mode === "string" ? o.mode : "public_guidance";
  const hasHandoff = actions.some((a) => a.kind === "flow" && a.flow === "handoff");
  if ((mode === "handoff" || mode === "abstain") && !hasHandoff && actions.length < 3) {
    actions.push({ kind: "flow", label: "Speak to our team", flow: "handoff" });
  }
  const hasLogin = actions.some((a) => a.kind === "link" && a.href === "/login");
  if (mode === "secure_required" && !hasLogin) {
    actions.unshift({ kind: "link", label: "Sign in securely", href: "/login", primary: true });
  }

  return {
    status: mode === "abstain" ? "abstained" : mode === "handoff" ? "handoff" : "answered",
    message,
    actions: actions.slice(0, 4),
  };
}

async function callModel(messages: ChatMessage[], signal: AbortSignal) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      max_completion_tokens: MAX_OUTPUT_TOKENS,
      reasoning_effort: "low",
      include_reasoning: false,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  return res;
}

/* ─────────────────────────────── Handler ─────────────────────────────────── */

export async function POST(req: NextRequest) {
  const started = Date.now();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return json(degraded("rate_limited", COPY.rateLimited), 429);
  }

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    // fall through
  }
  if (!messages) {
    return json(degraded("invalid", "Sorry, I couldn't read that message. Please try again."), 400);
  }

  // 1. Intake: redact sensitive data before anything else sees it.
  const redactedKinds = new Set<string>();
  messages = messages.map((m) => {
    const r = redactSensitive(m.content);
    if (m.role === "user") r.removed.forEach((k) => redactedKinds.add(k));
    return { ...m, content: r.text };
  });
  const redacted = [...redactedKinds];
  const latest = messages[messages.length - 1].content;

  // 2. Deterministic routing before the model (safety bypasses the model entirely).
  const routed = routeIntent(latest);
  if (routed === "safety") return json(flowAnswer("safety", "safety", redacted));
  if (routed === "handoff") return json(flowAnswer("handoff", "handoff", redacted));
  if (routed === "complaint") return json(flowAnswer("complaint", "complaint", redacted));

  // 3. Availability, budget and circuit-breaker checks.
  if (!AI_ENABLED || !process.env.GROQ_API_KEY || !MODEL_ALLOWLIST.includes(MODEL)) {
    return json({ ...degraded("provider_unavailable"), redacted }, 503);
  }
  if (messages.filter((m) => m.role === "user").length > MAX_TURNS) {
    return json(
      {
        ...degraded(
          "budget_limited",
          "We've covered a lot in this chat. To keep things clear, please start a new enquiry or speak to our team.",
        ),
        actions: [
          { kind: "command", label: "Start a new enquiry", command: "restart", primary: true },
          { kind: "flow", label: "Speak to our team", flow: "handoff" },
        ],
        redacted,
      },
      429,
    );
  }
  if (budgetExceeded() || Date.now() < breaker.openUntil) {
    return json({ ...degraded("provider_unavailable"), redacted }, 503);
  }

  // 4. Generate (bounded history, timeout, one retry on transient errors).
  const history = messages.slice(-MAX_HISTORY);
  while (history.length && history[0].role !== "user") history.shift();
  const signal = AbortSignal.any([req.signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)]);

  let res: Response | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    let waitMs = 400;
    try {
      res = await callModel(history, signal);
      if (res.ok || (res.status >= 400 && res.status < 500 && res.status !== 429)) break;
      if (res.status === 429) {
        // Honour a short retry-after for provider rate limits only (Doc14); never loop.
        const retryAfter = Number(res.headers.get("retry-after"));
        if (!Number.isFinite(retryAfter) || retryAfter > 8) break;
        waitMs = Math.max(retryAfter, 1) * 1000;
      }
    } catch (err) {
      if (req.signal.aborted) return new Response(null, { status: 499 });
      res = null;
      if (signal.aborted) break;
      console.error("[linko] model request failed", (err as Error).name);
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, waitMs));
  }

  if (res?.status === 429) {
    console.error(JSON.stringify({ event: "linko_model_rate_limited", model: MODEL }));
    return json(
      {
        ...degraded(
          "rate_limited",
          "Linko is busy right now. Please try again in a minute, or speak to our team.",
        ),
        redacted,
      },
      429,
    );
  }
  if (!res || !res.ok) {
    recordFailure();
    console.error(
      JSON.stringify({ event: "linko_model_error", status: res?.status ?? "network", model: MODEL, latency_ms: Date.now() - started }),
    );
    // 400 spend cap / 401 / 403 / 429 are not retried; the visitor gets the safe fallback.
    return json({ ...degraded("provider_unavailable"), redacted }, 503);
  }

  const data = (await res.json().catch(() => null)) as {
    choices?: { message?: { content?: string } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
  } | null;
  breaker.failures = 0;
  budget.tokens += data?.usage?.total_tokens ?? MAX_OUTPUT_TOKENS * 4;

  // 5. Verify, then deliver.
  const answer = validateModelOutput(data?.choices?.[0]?.message?.content ?? "");
  console.info(
    JSON.stringify({
      event: "linko_model_call",
      model: MODEL,
      prompt_tokens: data?.usage?.prompt_tokens,
      completion_tokens: data?.usage?.completion_tokens,
      latency_ms: Date.now() - started,
      outcome: answer ? answer.status : "invalid_output",
    }),
  );
  if (!answer) {
    return json({ ...degraded("invalid", "I can't verify that information just now, so I won't guess. You can try again or use the support options."), redacted });
  }
  return json({ ...answer, redacted });
}

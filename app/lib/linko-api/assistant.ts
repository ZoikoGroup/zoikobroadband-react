/**
 * Linko answer engine (used by PUB-02 /v1/linko/conversations/{id}/messages).
 * Pipeline (Doc12): intake + redaction → deterministic routing → gates → model → verify.
 */
import { getSystemPrompt, promptTemplateHash } from "@/app/lib/chatbot/systemPrompt";
import { checkPrompt } from "@/app/lib/chatbot/promptRegistry";
import { KB_VERSION, activeKnowledge, contentHash, kbReady, sourceInfo, type SourceInfo } from "@/app/lib/chatbot/knowledge";
import { welcomeActions } from "@/app/lib/chatbot/linko";
import { callProvider, countInputTokens, providerConfig } from "./providers";
import { aiOverrideActive, persistEvent, persistModelInvocation } from "@/app/lib/linko-db/persist";
import "@/app/lib/linko-db/knowledgeApproval";
import {
  COPY,
  FLOWS,
  LINKO_RELEASE,
  LinkoAction,
  LinkoAnswer,
  actionFromRoute,
  redactSensitive,
  routeIntent,
} from "@/app/lib/chatbot/linko";


/* ───────────── Configuration (owner-approved values go in env) ───────────── */

// Provider, model and allowlist come from providers.ts (Groq or Claude, chosen by LINKO_AI_PROVIDER).
// Kill switch fails closed (Doc08 §10.2): the model is used only when explicitly enabled.
const AI_ENABLED = process.env.LINKO_AI_ENABLED === "true";
export const PROMPT_VERSION = "linko-prompt-2026-11-23";

const IS_PRODUCTION = (process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV) === "production";

/* ───────────── Verified-answer cache (Doc14 cost control, Doc02 NFR-01 latency) ─────────────
 * The same opening question ("What is an ONT?") gets the same verified answer for a few hours,
 * without another model call. Only safe cases are cached:
 *  - the visitor's FIRST question (no earlier turns that could change the meaning)
 *  - nothing was redacted and no safety flag is set
 *  - the answer passed every output gate, cited knowledge, and was "answered"
 * The key includes the prompt template fingerprint and the exact knowledge text in use, so any
 * prompt edit, knowledge approval, withdrawal or expiry changes the key and old answers drop out.
 * The cache is still subject to the kill switch, staff fallback and prompt registry (checked first). */
const CACHE_TTL_MS = Number(process.env.LINKO_ANSWER_CACHE_TTL_MS || 6 * 60 * 60 * 1000);
const CACHE_MAX = 500;
type CachedAnswer = { at: number; answer: LinkoAnswer & { sources?: VerifiedAnswer["sources"] } };
const answerCache: Map<string, CachedAnswer> =
  ((globalThis as { __linkoAnswerCache?: Map<string, CachedAnswer> }).__linkoAnswerCache ??= new Map());
function normaliseQuestion(q: string) {
  return q
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}' ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function cacheKey(question: string) {
  const kb = activeKnowledge()
    .map((k) => `${k.id}#${contentHash(k.text)}`)
    .join(",");
  return contentHash(`${PROMPT_VERSION}|${promptTemplateHash()}|${contentHash(kb)}|${normaliseQuestion(question)}`) + ":" + normaliseQuestion(question).length;
}
function cacheGet(key: string) {
  const hit = answerCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    answerCache.delete(key);
    return null;
  }
  return structuredClone(hit.answer);
}
function cachePut(key: string, answer: CachedAnswer["answer"]) {
  if (answerCache.size >= CACHE_MAX) answerCache.delete(answerCache.keys().next().value!);
  answerCache.set(key, { at: Date.now(), answer: structuredClone(answer) });
}
let warnedPrompt = false;
/** Doc14 AT14-015: in production an unregistered prompt template never reaches the provider. */
function promptAllowed(): boolean {
  const c = checkPrompt(PROMPT_VERSION, promptTemplateHash());
  if (!c.registered && !warnedPrompt) {
    warnedPrompt = true;
    console.warn(
      JSON.stringify({ event: "linko_prompt_unregistered", prompt_version: PROMPT_VERSION, expected: c.expected, actual: c.actual, blocking: IS_PRODUCTION }),
    );
  }
  return c.registered || !IS_PRODUCTION;
}
const MAX_TURNS = Number(process.env.LINKO_MAX_TURNS || 30); // user messages per conversation
const DAILY_TOKEN_BUDGET = Number(process.env.LINKO_DAILY_TOKEN_BUDGET || 2_000_000);
const MONTHLY_TOKEN_BUDGET = Number(process.env.LINKO_MONTHLY_TOKEN_BUDGET || 30_000_000); // Doc14 §06 per month
const MAX_INPUT_TOKENS = Number(process.env.LINKO_MAX_INPUT_TOKENS || 6000); // Doc14 LK-AI14-019 preflight
// Optional metering (Doc14 §06, LK-AI14-025..027): effective price book in USD per million tokens.
// Cache writes/reads are priced separately and never treated as ordinary input.
const PRICE_IN_PER_M = Number(process.env.LINKO_PRICE_INPUT_PER_M || 0);
const PRICE_OUT_PER_M = Number(process.env.LINKO_PRICE_OUTPUT_PER_M || 0);
const PRICE_CACHE_WRITE_PER_M = Number(process.env.LINKO_PRICE_CACHE_WRITE_PER_M || 0);
const PRICE_CACHE_READ_PER_M = Number(process.env.LINKO_PRICE_CACHE_READ_PER_M || 0);
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_HISTORY = 12;

/* ─────────────── In-memory budget + circuit breaker (single server) ─────────
 * For several instances, move these counters to Redis/Upstash.              */

type Budget = { day: string; tokens: number; warned?: boolean; month: string; monthTokens: number; reserved: number };
const ga = globalThis as unknown as {
  __linkoBudget?: Budget;
  /** latched: AUTH (401/403) or SPEND_HARD_STOP (quota/billing) – no further calls until restart (Doc14 §07). */
  __linkoBreakerV2?: { failures: number; openUntil: number; latched?: "AUTH" | "SPEND_HARD_STOP" };
};
ga.__linkoBudget ??= { day: "", tokens: 0, month: "", monthTokens: 0, reserved: 0 };
ga.__linkoBudget.month ??= "";
ga.__linkoBudget.monthTokens ??= 0;
ga.__linkoBudget.reserved ??= 0;
ga.__linkoBreakerV2 ??= { failures: 0, openUntil: 0 };
const budget = ga.__linkoBudget;
const breaker = ga.__linkoBreakerV2;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function rollBudget() {
  if (budget.day !== todayKey()) {
    budget.day = todayKey();
    budget.tokens = 0;
    budget.warned = false;
  }
  if (budget.month !== todayKey().slice(0, 7)) {
    budget.month = todayKey().slice(0, 7);
    budget.monthTokens = 0;
  }
}
function budgetExceeded(extra = 0) {
  rollBudget();
  return (
    budget.tokens + budget.reserved + extra > DAILY_TOKEN_BUDGET ||
    budget.monthTokens + budget.reserved + extra > MONTHLY_TOKEN_BUDGET
  );
}
/** ~3.5 characters per token: a conservative pre-flight estimate (Doc14 LK-AI14-019). */
function estimateTokens(chars: number) {
  return Math.ceil(chars / 3.5);
}
function recordFailure() {
  breaker.failures += 1;
  if (breaker.failures >= 3) {
    breaker.openUntil = Date.now() + 60_000;
    breaker.failures = 0;
  }
}

/* ─────────────────────────────── Helpers ─────────────────────────────────── */

export type ChatMessage = { role: "user" | "assistant"; content: string };

export function flowAnswer(flow: keyof typeof FLOWS, status: LinkoAnswer["status"], redacted?: string[]): LinkoAnswer {
  const step = FLOWS[flow];
  return { status, message: step.text, tone: step.tone, actions: step.actions, redacted, flow };
}

export function degraded(status: LinkoAnswer["status"], message: string = COPY.degraded): LinkoAnswer {
  return {
    status,
    tone: "error",
    message,
    actions: [
      { kind: "command", label: "Try again", command: "retry", primary: true },
      { kind: "link", label: "View Help Centre", href: "/get-help" },
      { kind: "flow", label: "Speak to a person", flow: "handoff" },
      { kind: "command", label: "Start over", command: "restart" },
    ],
  };
}

// Unsupported commercial figures: prices, discounts and speed figures (Doc06 01.1 #02).
export const PRICE_RE =
  /£\s?\d|\b\d+(?:\.\d{1,2})?\s?(?:pounds?|quid|GBP|p|pence)\b|\b\d+(?:\.\d{1,2})?\s?(?:a|per|\/)\s?(?:month|mo|year|yr)\b|\b\d+\.\d{1,2}\s?pm\b|\b\d+(?:\.\d{1,2})?\s?(?:p\/m|monthly)\b|\b\d{1,3}\s?%\s?(?:off|discount)|\b\d+(?:\.\d+)?\s?(?:Mbps|Gbps|Mb\/s|Gb\/s)\b/i;

// Doc06 §03 prohibited claims + claimed actions the assistant can't perform (Doc08 §08.1 post-model gate).
export const PROHIBITED_RE =
  /\bunlimited\b|\byou can (?:use|bring|connect|keep) your own router\b|\b(?:any|most|all) (?:compatible |third[- ]party )?routers? (?:will|should) work\b|\bno (?:data )?caps?\b|\b24\/7\b|\b24 hours a day\b|round[- ]the[- ]clock|\bguarantee(?:d|s)?\b|free installation|no set[- ]?up fee|\bPCI\b|bank[- ]grade|\b(?:will|does|do|always|still|definitely)\s+work\s+(?:in|during)\s+a\s+power\s+cut\b|\bworks\s+(?:in|during)\s+a\s+power\s+cut\b|automatic(?:ally)? compensat|(?:ofcom[- ])?approved (?:our )?speeds|\b\d{1,2}[- ]?months?\b|\bI(?:'ve| have) (?:booked|logged|submitted|cancelled|canceled|arranged|placed|scheduled)\b|\byour (?:order|appointment|engineer(?: visit)?|complaint|cancellation) (?:is|has been) (?:booked|confirmed|scheduled|logged|submitted|placed)\b|\bI(?:'ve| have) (?:escalated|raised|passed|forwarded|sent|reported|requested|transferred)\b|\b(?:an? (?:adviser|agent|engineer)|someone|we) will (?:call|contact|ring) you\b|\bwithin \d+ (?:hours?|minutes?|working days?|days?)\b|\btransferring you\b|\byou are now (?:speaking|connected)\b|\binstant(?:ly)? connect|Communications Ombudsman|CISAS|Ombudsman Services|entitled to (?:a )?(?:refund|compensation|credit)|\bSLA\b|static IP|dedicated (?:line|connectivity)|\b99\.\d+\s?%|one touch switch[^.]{0,40}\b(?:works?|applies|covers?|available) (?:for |to |with |on )?(?:all|every|any)\b|\b(?:do|perform|try|carry out)\s+a\s+factory reset|(?:press|hold)\s+(?:down\s+)?the reset (?:button|pin)|\b(?:arrive|deliver|install|visit|fixed|repaired)\w*\b[^.]{0,30}\b(?:on|by)\s+(?:\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*|(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|tomorrow))/i;

// GR-12-075: the model must never echo its instructions (case-sensitive section labels + prompt phrases).
const LEAK_RE = /\b(?:ROLE|SCOPE|TRUST|EVIDENCE|PRICES|PROHIBITED CLAIMS|PRIVACY|ACTIONS|SAFETY|HUMAN|AUTHORITY|STYLE|OUTPUT)\s*:|ROUTE KEYS|KNOWLEDGE \(each|#\s*\[K\d{2}\]/;
const LEAK_PHRASE_RE = /\bsystem prompt\b|\bmy (?:instructions|prompt)\b/i;
// GF-07 / AT-12-003: injection, jailbreak and prompt-leak requests are answered deterministically and logged.
export const INJECTION_RE =
  /\b(?:ignore|disregard|forget|override|bypass)\b[^.?!\n]{0,40}\b(?:instructions?|rules|prompt|guardrails?|polic(?:y|ies))\b|\b(?:system|developer|hidden|initial)\s+(?:prompt|message|instructions?)\b|\b(?:reveal|show|print|repeat|output|dump)\b[^.?!\n]{0,30}\b(?:your prompt|instructions|context|configuration|rules|api key)\b|\b(?:developer|debug|admin|god|DAN)\s+mode\b|\bjailbreak\b|\byou are now\b|\bpretend (?:to be|you(?:'re| are))\b|\bsystem\s*:|\byou are (?:an? )?(?:admin|administrator|developer|root|superuser)\b|<\/?\s*system\s*>|\[\s*(?:system|inst)\s*\]|^\s*(?:system|assistant)\s*:/im;
const RESTART_RE = /\b(?:restart|reboot|reset|unplug|power[- ]?cycle|turn (?:it |the router )?off|switch (?:it |the router )?off)\b/i;
const SAFE_CLAIM_TOPIC_RE = /power cut|telecare|alarm|999|112|landline|digital (?:voice|phone)/i;
const MODES = ["public_guidance", "secure_required", "handoff", "abstain"] as const;

/** Extra masking for text sent to the model provider only (Doc06 §12.1, Doc08 §06.3). */
export function minimiseForModel(text: string) {
  return text
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/g, "[email removed]")
    .replace(/(?:\+44\s?|\b0)\d(?:[\s-]?\d){8,10}\b/g, "[phone removed]")
    .replace(/\b([A-PR-UWYZ][A-HK-Y]?\d[A-Z\d]?)\s?\d[ABD-HJLNP-UW-Z]{2}\b/gi, "$1 [rest of postcode removed]");
}

export type VerifiedAnswer = LinkoAnswer & { sources: SourceInfo[]; blocked?: string };

/** Doc12 "verify" step: schema, route allowlist, sources, no price figures, no prohibited claims, no leaked secrets.
 * Exported for the evaluation harness (scripts/linko-eval.ts). */
export function validateModelOutput(raw: string, today?: string): VerifiedAnswer | null {
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
  const o = obj as { mode?: unknown; message?: unknown; actions?: unknown; sources?: unknown };
  if (typeof o.message !== "string" || !o.message.trim()) return null;

  let message = redactSensitive(o.message.trim()).text.slice(0, 1500);
  // Strip raw URLs and bare look-alike domains: destinations must come through allow-listed actions (AT-12-067).
  message = message
    .replace(/https?:\/\/\S+/g, "")
    .replace(/(?<![@\w])(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|co\.uk|org|net|uk|io|info|app|xyz|online|site)\b(?:\/\S*)?/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    // The model occasionally misspells the brand ("Zozo's broadband") — always show the real name.
    .replace(/\b(?:Zozo|Zoika|Zioko|Zoko|Zoikko|Zokio|Ziko|Zoico)(?=\b)/g, "Zoiko");

  // Never echo the instructions (GR-12-075).
  if (LEAK_RE.test(message) || LEAK_PHRASE_RE.test(message)) {
    return { ...degraded("invalid", "I can't share how I'm set up, but I can help with broadband."), sources: [], blocked: "leak" };
  }
  // Strict schema (Doc12 §03.3): unknown modes are rejected, not defaulted.
  if (o.mode !== undefined && !MODES.includes(o.mode as (typeof MODES)[number])) return null;

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

  // Citations must resolve to a CURRENT, authorised knowledge item (Doc13 §06.4, L13-FR-026).
  const sources: VerifiedAnswer["sources"] = [];
  const current = activeKnowledge(today);
  if (Array.isArray(o.sources)) {
    for (const id of o.sources.slice(0, 3)) {
      const want = typeof id === "string" ? id.replace(/[[\]]/g, "").trim() : "";
      const k = current.find((x) => x.id === want) ?? null;
      if (k && !sources.some((x) => x.id === k.id)) sources.push(sourceInfo(k));
    }
  }

  // Block unsupported commercial figures (AT-12-068).
  if (PRICE_RE.test(message)) {
    return { ...flowAnswer("plans", "answered"), sources: [], blocked: "price" };
  }
  // Block prohibited claims and claimed actions — show the safe "can't verify" answer instead.
  // On a safety topic the safe answer is the approved safety step, not a generic error (AT-12-072).
  if (PROHIBITED_RE.test(message)) {
    if (SAFE_CLAIM_TOPIC_RE.test(message)) return { ...flowAnswer("safety", "safety"), sources: [], blocked: "claim" };
    return {
      ...degraded("invalid", "I can't confirm that from approved information, so I won't guess. Our team can give you an accurate answer."),
      sources: [],
      blocked: "claim",
    };
  }

  const mode = typeof o.mode === "string" ? o.mode : "public_guidance";
  const hasHandoff = actions.some((a) => a.kind === "flow" && a.flow === "handoff");
  if ((mode === "handoff" || mode === "abstain") && !hasHandoff && actions.length < 3) {
    actions.push({ kind: "flow", label: "Speak to a person", flow: "handoff" });
  }
  const hasLogin = actions.some((a) => a.kind === "link" && a.href === "/login");
  if (mode === "secure_required" && !hasLogin) {
    actions.unshift({ kind: "link", label: "Sign in securely", href: "/login", primary: true });
  }

  // Doc13 L13-FR-031: public guidance must be grounded in at least one current source, otherwise abstain.
  if (mode === "public_guidance" && sources.length === 0) {
    return {
      ...degraded("abstained", "I can't confirm that from approved information, so I won't guess. Our team can give you an accurate answer."),
      sources: [],
      blocked: "ungrounded",
    };
  }

  return {
    status: mode === "abstain" ? "abstained" : mode === "handoff" ? "handoff" : "answered",
    message,
    actions: actions.slice(0, 4),
    sources: mode === "abstain" ? [] : sources,
  };
}

export interface GenerateOptions {
  /** Correlation id for structured logs (Doc08 LK-ARCH-H-01). */
  cid?: string;
  /** Total user turns in this conversation (history is trimmed, so it can't be counted from it). */
  userTurns?: number;
  /** Set once the visitor has disclosed telecare / emergency-line reliance (Doc09 §02.3 safety_flag). */
  safetyFlag?: boolean;
  /** Conversation id, for metering rows (Doc05 DM-25). */
  sessionId?: string;
}

/** Generates one verified Linko answer for a server-held, redacted conversation. */
export async function generateAnswer(
  input: ChatMessage[],
  signal: AbortSignal,
  opts: GenerateOptions = {},
): Promise<{ answer: LinkoAnswer & { sources?: VerifiedAnswer["sources"] }; http: number }> {
  const started = Date.now();
  const provider = providerConfig();
  const logBase = {
    cid: opts.cid,
    provider: provider.name,
    model: provider.model,
    environment: process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV,
    prompt_version: PROMPT_VERSION,
    prompt_hash: contentHash(getSystemPrompt()),
    kb_version: KB_VERSION,
    release: process.env.LINKO_RELEASE || LINKO_RELEASE,
  };
  let messages = input;

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
  if (routed === "safety") return { answer: flowAnswer("safety", "safety", redacted), http: 200 };
  if (routed === "handoff") return { answer: flowAnswer("handoff", "handoff", redacted), http: 200 };
  if (routed === "complaint") return { answer: flowAnswer("complaint", "complaint", redacted), http: 200 };
  // Every other deterministic journey runs before the model (Doc09 GATE-15).
  if (routed === "safetyCheck") return { answer: flowAnswer("safetyCheck", "safety", redacted), http: 200 };
  if (routed) return { answer: flowAnswer(routed, routed === "accessibility" ? "handoff" : "answered", redacted), http: 200 };

  // A bare greeting gets the welcome straight away — no model call needed.
  if (/^\s*(?:hi|hii+|hello|hey|hiya|good (?:morning|afternoon|evening)|hi there|hello there)[\s!.,]*(?:linko)?[\s!.]*$/i.test(latest)) {
    return {
      answer: {
        status: "answered",
        flow: "welcome",
        message: "Hello. I can help you check availability, plans, orders or support. What would you like to do?",
        actions: [...welcomeActions("/"), { kind: "flow", label: "Speak to a person", flow: "handoff" }],
        redacted,
      },
      http: 200,
    };
  }

  // Products outside Linko's scope (K17) get a clear "not here" answer instead of a clarifying question.
  if (/\b(?:tv|television)\b[^.?!]{0,20}\b(?:packages?|channels?|bundles?|services?|subscriptions?)\b|\b(?:sky tv|sky glass|netflix|now tv|freeview)\b|\bmobile (?:phones?|contracts?|plans?|sims?)\b|\bsim[- ]?(?:cards?|only|plans?)?\b|\b(?:energy|electricity|gas) (?:tariffs?|supply|supplier)\b|\binsurance\b/i.test(latest) && !/\b(?:telecare|alarm|power cut|emergency)\b/i.test(latest)) {
    return {
      answer: {
        status: "answered",
        flow: "welcome",
        message:
          "I can't help with that here. I can help with Zoiko Broadband's fibre broadband, digital phone lines, bundles, business connectivity, orders and support.",
        actions: [...welcomeActions("/"), { kind: "flow", label: "Speak to a person", flow: "handoff" }],
        redacted,
      },
      http: 200,
    };
  }

  // Once a telecare / emergency-line risk is disclosed, restart / reset advice is never given (Doc09 CW-07-T02).
  if (opts.safetyFlag && RESTART_RE.test(latest)) return { answer: flowAnswer("safety", "safety", redacted), http: 200 };

  // Injection / jailbreak / prompt-leak attempts never reach the model (Doc12 GF-07, §10.1 injection alarms).
  if (INJECTION_RE.test(latest)) {
    console.warn(JSON.stringify({ event: "linko_injection_suspected", ...logBase }));
    if (opts.sessionId) persistEvent(opts.sessionId, "SECURITY_INJECTION_SUSPECTED", null, {});
    return {
      answer: {
        status: "answered",
        flow: "welcome",
        message: "I can't change how I work or share my internal set-up, but I'm happy to help with broadband, availability, orders or support.",
        actions: [...welcomeActions("/"), { kind: "flow", label: "Speak to a person", flow: "handoff" }],
        redacted,
      },
      http: 200,
    };
  }

  // 3. Availability, budget and circuit-breaker checks.
  // Preflight (Doc14 AT14-010/003): an unapproved model or a key from another environment never reaches the provider.
  // A staff "Activate fallback" override (Doc10 HS-WF-10-24) also disables the model, until it expires or is ended.
  if (!AI_ENABLED || !provider.keyPresent || !provider.allowlisted || !provider.environmentOk || !promptAllowed() || !kbReady() || breaker.latched || aiOverrideActive()) {
    return { answer: { ...degraded("provider_unavailable"), redacted }, http: 503 };
  }

  // A verified answer to the same first question is reused — also while the provider is rate-limiting us.
  const cacheable = messages.filter((m) => m.role === "user").length === 1 && redacted.length === 0 && !opts.safetyFlag;
  const key = cacheable ? cacheKey(latest) : null;
  if (key) {
    const hit = cacheGet(key);
    if (hit) {
      console.info(JSON.stringify({ event: "linko_answer_cache_hit", ...logBase }));
      if (opts.sessionId) persistEvent(opts.sessionId, "ANSWER_CACHE_HIT", null, {});
      return { answer: { ...hit, redacted }, http: 200 };
    }
  }
  if ((opts.userTurns ?? messages.filter((m) => m.role === "user").length) > MAX_TURNS) {
    return {
      answer: {
        ...degraded(
          "budget_limited",
          "We've covered a lot in this chat. To keep things clear, please start a new enquiry or speak to our team.",
        ),
        actions: [
          { kind: "command", label: "Start a new enquiry", command: "restart", primary: true },
          { kind: "flow", label: "Speak to a person", flow: "handoff" },
        ],
        redacted,
      },
      http: 429,
    };
  }
  if (Date.now() < breaker.openUntil) {
    return { answer: { ...degraded("provider_unavailable"), redacted }, http: 503 };
  }

  // 4. Generate (bounded history, timeout, one retry on transient errors).
  // Only minimised text goes to the external model provider.
  const systemPrompt = getSystemPrompt();
  const history = messages.slice(-MAX_HISTORY).map((m) => ({ ...m, content: minimiseForModel(m.content) }));
  while (history.length && history[0].role !== "user") history.shift();
  // Pre-flight: drop the oldest turns (never the system prompt) until the input fits (Doc14 LK-AI14-019).
  const inputChars = () => systemPrompt.length + history.reduce((n, m) => n + m.content.length, 0);
  while (history.length > 1 && estimateTokens(inputChars()) > MAX_INPUT_TOKENS) {
    history.shift();
    while (history.length > 1 && history[0].role !== "user") history.shift();
  }
  // Count input exactly where the provider supports it (Claude count_tokens, PLAT-08); otherwise estimate.
  const counted = await countInputTokens(systemPrompt, history, signal);
  const inputTokens = counted ?? estimateTokens(inputChars());
  if (inputTokens > MAX_INPUT_TOKENS) {
    console.warn(JSON.stringify({ event: "linko_preflight_rejected", ...logBase, input_tokens: inputTokens }));
    return { answer: { ...degraded("budget_limited"), redacted }, http: 503 };
  }
  // Reserve the worst case before calling, so concurrent requests can't overspend (Doc14 LK-AI14-022).
  const reserve = inputTokens + provider.maxOutputTokens;
  if (budgetExceeded(reserve)) {
    console.warn(JSON.stringify({ event: "linko_budget_refused", ...logBase }));
    return { answer: { ...degraded("budget_limited"), redacted }, http: 503 };
  }
  budget.reserved += reserve;
  try {
    const result = await callAndVerify();
    if (key && result.http === 200 && result.answer.status === "answered" && !result.answer.flow && (result.answer.sources?.length ?? 0) > 0) {
      cachePut(key, result.answer);
    }
    return result;
  } finally {
    budget.reserved = Math.max(0, budget.reserved - reserve);
  }

  async function callAndVerify(): Promise<{ answer: LinkoAnswer & { sources?: VerifiedAnswer["sources"] }; http: number }> {
  const out = await callProvider(systemPrompt, history, signal, REQUEST_TIMEOUT_MS);
  if (!out.ok && out.kind === "aborted") return { answer: degraded("provider_unavailable"), http: 499 };

  if (!out.ok) {
    // Doc14 §07 error taxonomy.
    if (out.kind === "auth" || out.kind === "spend") {
      // 401/403 → security/config incident, fail closed; spend cap → SPEND_HARD_STOP. No retry loop.
      breaker.latched = out.kind === "spend" ? "SPEND_HARD_STOP" : "AUTH";
      console.error(
        JSON.stringify({ event: "linko_provider_auth_failure", severity: "critical", ...logBase, status: out.status, latched: breaker.latched }),
      );
      return { answer: { ...degraded("provider_unavailable"), redacted }, http: 503 };
    }
    if (out.kind === "rate") {
      // A sustained provider rate limit opens the breaker so the next visitors don't hit it again (AT14-037).
      breaker.openUntil = Date.now() + Math.min(out.retryAfterSec || 30, 300) * 1000;
      console.error(JSON.stringify({ event: "linko_model_rate_limited", ...logBase, retry_after_s: out.retryAfterSec ?? null }));
      return {
        answer: { ...degraded("rate_limited", "Linko is busy right now. Please try again in a minute, or speak to our team."), redacted },
        http: 429,
      };
    }
    // 5xx / 529 overload / timeout / network → breaker + verified help fallback (AT14-038/039).
    recordFailure();
    console.error(
      JSON.stringify({ event: "linko_model_error", ...logBase, kind: out.kind, status: out.status ?? out.kind, latency_ms: Date.now() - started }),
    );
    return { answer: { ...degraded("provider_unavailable"), redacted }, http: 503 };
  }

  breaker.failures = 0;
  const u = out.usage;
  // Never record a call as free when counts are missing: charge the reservation instead (PLAT-11, AT14-028).
  const used = u ? (u.input ?? 0) + (u.output ?? 0) + (u.cacheWrite ?? 0) + (u.cacheRead ?? 0) : reserve;
  budget.tokens += used;
  budget.monthTokens += used;
  if (!budget.warned && budget.tokens >= DAILY_TOKEN_BUDGET * 0.8) {
    budget.warned = true; // Doc08 §08.3 / Doc14 PLAT-12 warn threshold, once per day
    console.warn(JSON.stringify({ event: "linko_budget_warning", ...logBase, used_pct: Math.round((budget.tokens / DAILY_TOKEN_BUDGET) * 100) }));
  }

  // 5. Verify, then deliver.
  // A provider refusal is an abstention routed to a person — never a model swap (PLAT-06).
  const answer = out.refusal
    ? ({
        status: "abstained",
        message: "I can't help with that here, but our team can.",
        actions: [{ kind: "flow", label: "Speak to a person", flow: "handoff" }],
        sources: [],
        blocked: "refusal",
      } as VerifiedAnswer)
    : validateModelOutput(out.text);
  const estCost =
    PRICE_IN_PER_M || PRICE_OUT_PER_M
      ? Number(
          (
            ((u?.input ?? 0) * PRICE_IN_PER_M +
              (u?.output ?? 0) * PRICE_OUT_PER_M +
              (u?.cacheWrite ?? 0) * PRICE_CACHE_WRITE_PER_M +
              (u?.cacheRead ?? 0) * PRICE_CACHE_READ_PER_M) /
            1e6
          ).toFixed(6),
        )
      : undefined;
  console.info(
    JSON.stringify({
      event: "linko_model_call",
      ...logBase,
      provider_request_id: out.requestId,
      input_tokens: u?.input,
      output_tokens: u?.output,
      cache_write_tokens: u?.cacheWrite,
      cache_read_tokens: u?.cacheRead,
      input_tokens_counted: counted !== null,
      usage_estimated: !u,
      reserved_tokens: reserve,
      price_version: process.env.LINKO_PRICE_VERSION,
      est_cost_usd: estCost,
      latency_ms: Date.now() - started,
      outcome: answer ? (answer.blocked ? `blocked_${answer.blocked}` : answer.status) : "invalid_output",
    }),
  );
  persistModelInvocation({
    sessionId: opts.sessionId ?? null,
    provider: provider.name,
    model: provider.model,
    promptVersion: PROMPT_VERSION,
    requestId: out.requestId,
    input: u?.input ?? reserve - provider.maxOutputTokens,
    output: u?.output ?? provider.maxOutputTokens,
    cacheWrite: u?.cacheWrite ?? 0,
    cacheRead: u?.cacheRead ?? 0,
    estimated: !u,
    costUsd: estCost,
    outcome: !answer || answer.blocked ? "BLOCKED" : answer.status === "handoff" || answer.status === "abstained" ? "ESCALATED" : "PASSED",
    latencyMs: Date.now() - started,
  });
  if (!answer) {
    return { answer: { ...degraded("invalid", "I can't verify that information just now, so I won't guess. You can try again or use the support options."), redacted }, http: 200 };
  }
  const { blocked, ...clean } = answer;
  // Doc01 LK-WF-19 / §8.1 Safety: model_guardrail_triggered, with a reason code only (never the text).
  if (blocked) {
    console.warn(JSON.stringify({ event: "linko_guardrail_triggered", reason: blocked, ...logBase }));
    if (opts.sessionId) persistEvent(opts.sessionId, "GUARDRAIL_TRIGGERED", null, { reason: blocked });
  }
  return { answer: { ...clean, redacted }, http: 200 };
  }
}

/** Health snapshot for /v1/linko/health — no secrets (Doc08 G-07). */
export function aiHealth() {
  rollBudget();
  return {
    aiEnabled: (() => {
      const p = providerConfig();
      return AI_ENABLED && p.keyPresent && p.allowlisted && p.environmentOk && promptAllowed() && kbReady() && !breaker.latched && !aiOverrideActive();
    })(),
    promptRegistered: checkPrompt(PROMPT_VERSION, promptTemplateHash()).registered,
    provider: providerConfig().name,
    model: providerConfig().model,
    latched: breaker.latched ?? null,
    breakerOpen: Date.now() < breaker.openUntil,
    budgetUsedPct: Math.min(100, Math.round((budget.tokens / DAILY_TOKEN_BUDGET) * 100)),
    monthBudgetUsedPct: Math.min(100, Math.round((budget.monthTokens / MONTHLY_TOKEN_BUDGET) * 100)),
    promptVersion: PROMPT_VERSION,
    kbVersion: KB_VERSION,
  };
}

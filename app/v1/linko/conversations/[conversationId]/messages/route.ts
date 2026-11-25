/**
 * PUB-02 POST /v1/linko/conversations/{conversationId}/messages
 * Submit an utterance (kind TEXT) or a selected action (kind ACTION) — Doc04 LK-WF-02/19.
 *
 *  - 2,000-character limit, DLP redaction before storage or model use
 *  - ACTION ids are an allowlist of guided steps; the model can never choose a tool
 *  - requestId makes retries safe (same requestId → same reply)
 *  - No more than 2 clarification turns, then generic help + human (Doc01 WF-02)
 *  - "retry" action limited to 2 retries, then safe fallback (Doc01 WF-19)
 */
import { NextRequest } from "next/server";
import { COPY, FLOWS, FlowId, LinkoAnswer, redactSensitive, welcomeActions } from "@/app/lib/chatbot/linko";
import { generateAnswer } from "@/app/lib/linko-api/assistant";
import { KB_VERSION, contentHash, evidenceRef, knowledgeById } from "@/app/lib/chatbot/knowledge";
import { apiError, BusinessStatus, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { Conversation, ConvState, getConversation, saveConversation } from "@/app/lib/linko-api/store";
import { clearIntentSlots, persistCitations, persistComplaint, persistEvent, persistMessage, persistSlot } from "@/app/lib/linko-db/persist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTENT_VERSION = "intent-registry-2026-11-23";
const MAX_CHARS = 2000;
const MAX_RETRIES = 2;
const MAX_CLARIFY = 2;
// Messages a visitor can send per minute; chip clicks (ACTION) have their own, larger bucket (NFR-05).
const HISTORY_LIMIT = 20;

type ReplyAnswer = LinkoAnswer & {
  screen?: string;
  topic?: string;
  widget?: string;
  context?: string;
  source: "flow" | "ai";
  sources?: { id: string; title: string; source: string }[];
};

/** Map a Doc01 screen title to its LK-WF id for chat_event.screen_ref (DM-05). */
const SCREEN_REFS: Record<string, string> = {
  "Intent clarification and smart routing": "LK-WF-02",
  "Postcode and exact-address eligibility": "LK-WF-03",
  "Eligible plan comparison": "LK-WF-04",
  "Business quote and specialist": "LK-WF-05",
  "One Touch Switch guidance": "LK-WF-06",
  "Track your order": "LK-WF-08",
  "Engineer appointment": "LK-WF-09",
  "Moving home": "LK-WF-10",
  "Service status and fault triage": "LK-WF-11",
  "Wi-Fi speed and router guidance": "LK-WF-12",
  "Billing and payment support": "LK-WF-13",
  "Cancellation, refund and complaints": "LK-WF-14",
  "Digital voice and telecare safety": "LK-WF-15",
  "Sign-in and customer verification": "LK-WF-16",
  "Human escalation and callback": "LK-WF-17",
  "Privacy, AI limits and transcript controls": "LK-WF-18",
  "Conversation summary and close": "LK-WF-20",
};
function screenRef(screen?: string) {
  return screen ? (SCREEN_REFS[screen] ?? null) : "LK-WF-01";
}

function push(conv: Conversation, role: "user" | "assistant", content: string, piiMasked = false) {
  if (!content.trim()) return;
  conv.history.push({ role, content: content.slice(0, MAX_CHARS) });
  conv.msgSeq += 1;
  persistMessage(conv.id, conv.msgSeq, role === "user" ? "USER" : "ASSISTANT", content.slice(0, MAX_CHARS), piiMasked);
  if (conv.history.length > HISTORY_LIMIT) conv.history.splice(0, conv.history.length - HISTORY_LIMIT);
}

function flowReply(conv: Conversation, flow: FlowId): ReplyAnswer {
  const step = FLOWS[flow];
  if (step.topic && !conv.topics.includes(step.topic)) conv.topics.push(step.topic);
  return {
    status: flow === "safety" || flow === "safetyCheck" ? "safety" : flow.startsWith("handoff") ? "handoff" : "answered",
    message: step.text,
    tone: step.tone,
    actions: flow === "welcome" ? welcomeActions(conv.pageKey) : step.actions,
    screen: step.screen,
    topic: step.topic,
    widget: step.widget,
    context: step.context,
    source: "flow",
  };
}

function stateFor(answer: ReplyAnswer): ConvState {
  switch (answer.status) {
    case "safety":
    case "handoff":
      return "HUMAN";
    case "complaint":
      return "NEXT_ACTION";
    case "abstained":
      return "INTENT";
    case "provider_unavailable":
    case "invalid":
    case "budget_limited":
      return "FAILED";
    default:
      return answer.actions.some((a) => a.kind === "link" && a.href === "/login") ? "AUTH" : "RESULT";
  }
}

function businessStatus(answer: ReplyAnswer): BusinessStatus {
  if (answer.status === "provider_unavailable" || answer.status === "invalid" || answer.status === "budget_limited") return "UNAVAILABLE";
  if (answer.status === "safety" || answer.status === "handoff" || answer.status === "complaint") return "REQUIRES_ACTION";
  return answer.source === "flow" ? "CONFIRMED" : "INDICATIVE"; // model wording is never an authoritative fact
}

/**
 * Doc03 §08.1 actionability: what the client may do next with this answer.
 * none = nothing to act on · info_only = information · can_transfer = a person/safety route is offered ·
 * requires_auth = secure sign-in needed · requires_confirmed_mutation = never produced by chat (no changes from Linko).
 */
type Actionability = "none" | "info_only" | "can_transfer" | "requires_auth" | "requires_confirmed_mutation";
function actionabilityFor(answer: ReplyAnswer): Actionability {
  if (answer.status === "provider_unavailable" || answer.status === "invalid" || answer.status === "budget_limited") return "can_transfer";
  if (answer.status === "safety" || answer.status === "handoff" || answer.status === "complaint") return "can_transfer";
  if (answer.actions.some((a) => a.kind === "link" && a.href === "/login")) return "requires_auth";
  if (answer.status === "abstained") return "none";
  return "info_only";
}

/** Doc03 §07 FRS families by Doc01 screen (LK-WF id) — used in the response trace. */
const FRS_FOR: Record<string, string> = {
  "LK-WF-01": "FRS-E",
  "LK-WF-02": "FRS-E",
  "LK-WF-03": "FRS-A",
  "LK-WF-04": "FRS-A",
  "LK-WF-05": "FRS-B",
  "LK-WF-06": "FRS-S",
  "LK-WF-08": "FRS-O",
  "LK-WF-09": "FRS-O",
  "LK-WF-10": "FRS-M",
  "LK-WF-11": "FRS-F",
  "LK-WF-12": "FRS-W",
  "LK-WF-13": "FRS-P",
  "LK-WF-14": "FRS-Q",
  "LK-WF-15": "FRS-V",
  "LK-WF-16": "FRS-U",
  "LK-WF-17": "FRS-H",
  "LK-WF-18": "FRS-D",
  "LK-WF-20": "FRS-E",
};
// Feature-flag snapshot that shaped this answer (Doc03 §08.1 featureFlagVersion) — no secrets, just on/off.
const FLAG_VERSION = [
  "linko-flags-2026-11-25",
  `ai=${process.env.LINKO_AI_ENABLED === "true" ? 1 : 0}`,
  `draftkb=${process.env.LINKO_ALLOW_DRAFT_KB === "true" ? 1 : 0}`,
  `provider=${process.env.LINKO_AI_PROVIDER || "groq"}`,
].join(";");
function traceFor(answer: ReplyAnswer, pageKey: string) {
  const screen = screenRef(answer.screen) ?? (answer.source === "ai" ? "LK-WF-02" : null);
  return { prd: "LINKO-PRD-1.0", frs: screen ? (FRS_FOR[screen] ?? null) : null, screen, pageKey, featureFlagVersion: FLAG_VERSION };
}

async function digest(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function answerText(conv: Conversation, signal: AbortSignal, cid: string): Promise<{ answer: ReplyAnswer; http: number }> {
  const { answer, http } = await generateAnswer(conv.history.slice(), signal, {
    cid,
    userTurns: conv.userTurns,
    safetyFlag: conv.slots.safetyFlag === true,
    sessionId: conv.id,
  });
  const source: "flow" | "ai" =
    answer.flow || answer.tone || !["answered", "abstained", "handoff"].includes(answer.status) ? "flow" : "ai";
  let reply: ReplyAnswer = { ...answer, source };
  // Deterministic routed steps carry their screen and topic like a chip click would.
  if (answer.flow && !["safety", "complaint", "handoff"].includes(answer.status)) {
    const step = FLOWS[answer.flow];
    reply = { ...reply, screen: step.screen, topic: step.topic, widget: step.widget, context: step.context };
    if (step.topic && !conv.topics.includes(step.topic)) conv.topics.push(step.topic);
  }

  // Doc01 WF-02: no more than 2 clarification turns → generic help + human handover.
  if (answer.status === "abstained") {
    conv.clarifyCount += 1;
    if (conv.clarifyCount < MAX_CLARIFY) {
      // Doc01 WF-01/02: unknown → one clarifying question with routing chips (human route still visible).
      // FRS-E06 / AI-03: say plainly that it can't answer, then one clarifying question (LK-WF-02 CTAs).
      reply = {
        status: "abstained",
        message: `I can't answer that reliably from approved information. ${FLOWS.clarify.text}`,
        actions: [...FLOWS.clarify.actions, { kind: "flow", label: "Speak to a person", flow: "handoff" }],
        screen: FLOWS.clarify.screen,
        topic: FLOWS.clarify.topic,
        source: "flow",
      };
    } else {
      conv.clarifyCount = 0;
      reply = {
        status: "handoff",
        message: COPY.clarifyFallback,
        actions: [
          { kind: "flow", label: "Speak to a person", flow: "handoff", primary: true },
          { kind: "link", label: "View Help Centre", href: "/get-help" },
          { kind: "flow", label: "Browse topics", flow: "clarify" },
        ],
        screen: FLOWS.clarify.screen,
        source: "flow",
      };
    }
  } else if (answer.status === "answered") {
    conv.clarifyCount = 0;
  }
  if (answer.status === "safety" || answer.status === "complaint" || answer.status === "handoff") {
    const flow = answer.status === "safety" ? "safety" : answer.status === "complaint" ? "complaint" : "handoff";
    reply = { ...reply, screen: FLOWS[flow].screen, topic: FLOWS[flow].topic };
    if (FLOWS[flow].topic && !conv.topics.includes(FLOWS[flow].topic!)) conv.topics.push(FLOWS[flow].topic!);
  }
  return { answer: reply, http };
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ conversationId: string }> }) {
  const cid = newCorrelationId();
  const { conversationId } = await ctx.params;
  const conv = getConversation(conversationId);
  if (!conv) {
    return apiError(cid, "NOT_FOUND", "This conversation has ended or expired. Please start a new one.", { nextAction: "RETRY" });
  }

  const body = await readJson(req);
  if (!body) return apiError(cid, "VALIDATION_ERROR", "Request body must be JSON.");
  const { kind, text, actionId, requestId, label } = body as Record<string, unknown>;
  // Per-IP and per-conversation limits; button clicks use a larger bucket than typed messages.
  const limited =
    limit(req, cid, kind === "ACTION" ? "msg-action" : "msg", kind === "ACTION" ? 60 : 15) ??
    limit(req, cid, `conv:${conversationId}`, kind === "ACTION" ? 60 : 20, conversationId);
  if (limited) return limited;
  if (typeof requestId !== "string" || requestId.length < 8 || requestId.length > 64) {
    return apiError(cid, "VALIDATION_ERROR", "requestId is required (8–64 characters).", { field: "requestId" });
  }

  // Safe replay of a repeated request (double click, network retry). The same requestId
  // with a different body is rejected (Doc05 DM-30 / T-26).
  const requestDigest = await digest(JSON.stringify([kind, text ?? null, actionId ?? null]));
  const prior = conv.replies.get(requestId);
  if (prior && prior.digest !== requestDigest) {
    return apiError(cid, "VALIDATION_ERROR", "This requestId was already used for a different message.", { field: "requestId" });
  }
  if (prior) {
    return new Response(prior.body, {
      status: prior.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Correlation-Id": cid, "Idempotent-Replay": "true" },
    });
  }

  let result: { answer: ReplyAnswer; http: number };
  let redacted: string[] = [];
  let intentId: string;

  if (kind === "TEXT") {
    if (typeof text !== "string" || !text.trim()) {
      return apiError(cid, "VALIDATION_ERROR", "text is required.", { field: "text", nextAction: "CORRECT_INPUT" });
    }
    if (text.length > MAX_CHARS) {
      return apiError(cid, "VALIDATION_ERROR", `Messages can be up to ${MAX_CHARS} characters.`, { field: "text", nextAction: "CORRECT_INPUT" });
    }
    const r = redactSensitive(text.trim());
    redacted = r.removed;
    push(conv, "user", r.text, r.removed.length > 0);
    conv.retryCount = 0;
    conv.userTurns += 1;
    result = await answerText(conv, req.signal, cid);
    intentId = result.answer.source === "flow" ? result.answer.status : "free_text";
  } else if (kind === "ACTION") {
    if (typeof actionId !== "string") {
      return apiError(cid, "VALIDATION_ERROR", "actionId is required.", { field: "actionId" });
    }
    if (actionId === "retry") {
      // Doc01 WF-19: 2 retries maximum, then a safe fallback without another "Try again".
      conv.retryCount += 1;
      if (conv.retryCount > MAX_RETRIES || !conv.history.some((m) => m.role === "user")) {
        result = {
          answer: {
            status: "provider_unavailable",
            tone: "error",
            message: COPY.retryLimit,
            actions: [
              { kind: "flow", label: "Speak to a person", flow: "handoff", primary: true },
              { kind: "link", label: "View Help Centre", href: "/get-help" },
            ],
            source: "flow",
          },
          http: 200,
        };
      } else {
        // Drop a trailing failed reply so the model sees the user's question last.
        while (conv.history.length && conv.history[conv.history.length - 1].role === "assistant") conv.history.pop();
        result = await answerText(conv, req.signal, cid);
        if (result.answer.status === "answered") conv.retryCount = 0;
      }
      intentId = "retry";
    } else if (actionId in FLOWS) {
      if (typeof label === "string" && label.trim()) push(conv, "user", redactSensitive(label.slice(0, 120)).text);
      result = { answer: flowReply(conv, actionId as FlowId), http: 200 };
      if (conv.intent !== actionId) clearIntentSlots(conv.id); // T-38: slots end with their intent
      conv.intent = actionId;
      conv.clarifyCount = 0;
      intentId = actionId;
    } else {
      return apiError(cid, "VALIDATION_ERROR", "Unknown actionId.", { field: "actionId" });
    }
  } else {
    return apiError(cid, "VALIDATION_ERROR", "kind must be TEXT or ACTION.", { field: "kind" });
  }

  if (result.http === 499) return new Response(null, { status: 499 });
  if (result.http === 429 && result.answer.status === "rate_limited") {
    return apiError(cid, "RATE_LIMITED", result.answer.message, { retryable: true, nextAction: "HUMAN", nextActions: SUPPORT_ACTIONS });
  }

  push(conv, "assistant", result.answer.message);
  // DM-24: record which approved knowledge version the AI answer cited.
  const cited = (result.answer.sources ?? [])
    .map((s) => knowledgeById(s.id))
    .filter((k): k is NonNullable<typeof k> => Boolean(k))
    .map((k) => ({ id: k.id, versionHash: contentHash(k.text) }));
  if (cited.length) persistCitations(conv.id, conv.msgSeq, cited);
  // Doc10 §07.1: the first time dissatisfaction is expressed is preserved and recorded once.
  if (result.answer.status === "complaint" && !conv.slots.complaintFirstAt) {
    conv.slots.complaintFirstAt = nowIso();
    persistComplaint(conv.id, "REQUESTED", null);
  }
  conv.state = stateFor(result.answer);
  // Doc09 §02.3 safety_flag: once set, restart/reset advice is blocked for the rest of the conversation.
  if (result.answer.status === "safety" || intentId === "safety" || intentId === "safetyCheck" || intentId === "handoffSafety") {
    if (!conv.slots.safetyFlag) persistSlot(conv.id, "safety_flag", "BOOLEAN", "true");
    conv.slots.safetyFlag = true;
  }

  // Note: provider outages are returned as HTTP 200 with business status UNAVAILABLE (not 503) on purpose —
  // the reply is a complete, safe answer the widget must render (Doc04 §04.2 envelope), not a transport error.
  const sources = result.answer.sources ?? [];
  const res = envelope(
    cid,
    businessStatus(result.answer),
    {
      intent: { id: intentId, version: INTENT_VERSION },
      state: conv.state,
      answer: result.answer,
      redacted,
      actionability: actionabilityFor(result.answer),
      trace: traceFor(result.answer, conv.pageKey),
    },
    {
      // All flow and knowledge copy is still DRAFT_NOT_APPROVED (Doc06), so evidence is INDICATIVE until sign-off.
      sourceEvidence:
        result.answer.source === "flow"
          ? { source: "approved_flows", version: "doc01-v1.0-draft", checkedAt: nowIso(), status: "INDICATIVE" }
          : {
              source: sources.length ? `knowledge:${sources.map((s) => evidenceRef(s.id)).join(",")}` : "knowledge",
              version: KB_VERSION,
              checkedAt: nowIso(),
              status: "INDICATIVE",
            },
    },
  );
  conv.replies.set(requestId, { at: Date.now(), body: await res.clone().text(), status: res.status, digest: requestDigest });
  saveConversation(conv);
  persistEvent(conv.id, `TURN_${String(intentId).toUpperCase()}`.slice(0, 64), screenRef(result.answer.screen), {
    source: result.answer.source,
    status: result.answer.status,
    state: conv.state,
    redactions: redacted.length,
  });
  // Doc13 §12.2 per-turn decision log — no message text, pseudonymous conversation id.
  console.info(
    JSON.stringify({
      event: "linko_turn",
      cid,
      conv: (await digest(conversationId)).slice(0, 12),
      intent: intentId,
      source: result.answer.source,
      status: result.answer.status,
      business_status: businessStatus(result.answer),
      state: conv.state,
      safety_flag: conv.slots.safetyFlag === true,
      redaction_count: redacted.length,
      redaction_kinds: redacted,
      kb_version: KB_VERSION,
      sources: (result.answer.sources ?? []).map((s) => evidenceRef(s.id)),
      actionability: actionabilityFor(result.answer),
      trace: traceFor(result.answer, conv.pageKey),
    }),
  );
  if (conv.replies.size > 50) conv.replies.delete(conv.replies.keys().next().value!);
  return res;
}

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
import { apiError, BusinessStatus, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { Conversation, ConvState, getConversation } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTENT_VERSION = "intent-registry-2026-11-23";
const MAX_CHARS = 2000;
const MAX_RETRIES = 2;
const MAX_CLARIFY = 2;
const HISTORY_LIMIT = 20;

type ReplyAnswer = LinkoAnswer & {
  screen?: string;
  topic?: string;
  widget?: string;
  context?: string;
  source: "flow" | "ai";
};

function push(conv: Conversation, role: "user" | "assistant", content: string) {
  if (!content.trim()) return;
  conv.history.push({ role, content: content.slice(0, MAX_CHARS) });
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

async function answerText(conv: Conversation, signal: AbortSignal): Promise<{ answer: ReplyAnswer; http: number }> {
  const { answer, http } = await generateAnswer(conv.history.slice(), signal);
  const source: "flow" | "ai" = ["answered", "abstained", "handoff"].includes(answer.status) && !answer.tone ? "ai" : "flow";
  let reply: ReplyAnswer = { ...answer, source };

  // Doc01 WF-02: no more than 2 clarification turns → generic help + human handover.
  if (answer.status === "abstained") {
    conv.clarifyCount += 1;
    if (conv.clarifyCount < MAX_CLARIFY) {
      // Doc01 WF-01/02: unknown → one clarifying question with routing chips (human route still visible).
      reply = {
        status: "abstained",
        message: FLOWS.clarify.text,
        actions: FLOWS.clarify.actions,
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
          { kind: "link", label: "Open Help Centre", href: "/get-help" },
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
  const limited = limit(req, cid, "msg");
  if (limited) return limited;

  const { conversationId } = await ctx.params;
  const conv = getConversation(conversationId);
  if (!conv) {
    return apiError(cid, "NOT_FOUND", "This conversation has ended or expired. Please start a new one.", { nextAction: "RETRY" });
  }

  const body = await readJson(req);
  if (!body) return apiError(cid, "VALIDATION_ERROR", "Request body must be JSON.");
  const { kind, text, actionId, requestId, label } = body as Record<string, unknown>;
  if (typeof requestId !== "string" || requestId.length < 8 || requestId.length > 64) {
    return apiError(cid, "VALIDATION_ERROR", "requestId is required (8–64 characters).", { field: "requestId" });
  }

  // Safe replay of a repeated request (double click, network retry).
  const prior = conv.replies.get(requestId);
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
    push(conv, "user", r.text);
    conv.retryCount = 0;
    result = await answerText(conv, req.signal);
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
              { kind: "link", label: "Open Help Centre", href: "/get-help" },
            ],
            source: "flow",
          },
          http: 200,
        };
      } else {
        // Drop a trailing failed reply so the model sees the user's question last.
        while (conv.history.length && conv.history[conv.history.length - 1].role === "assistant") conv.history.pop();
        result = await answerText(conv, req.signal);
        if (result.answer.status === "answered") conv.retryCount = 0;
      }
      intentId = "retry";
    } else if (actionId in FLOWS) {
      if (typeof label === "string" && label.trim()) push(conv, "user", redactSensitive(label.slice(0, 120)).text);
      result = { answer: flowReply(conv, actionId as FlowId), http: 200 };
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
  conv.state = stateFor(result.answer);

  const res = envelope(
    cid,
    businessStatus(result.answer),
    {
      intent: { id: intentId, version: INTENT_VERSION },
      state: conv.state,
      answer: result.answer,
      redacted,
    },
    {
      sourceEvidence:
        result.answer.source === "flow"
          ? { source: "approved_flows", version: "doc01-v1.0", checkedAt: nowIso(), status: "VERIFIED" }
          : { source: "approved_kb+model", version: "kb-draft", checkedAt: nowIso(), status: "INDICATIVE" },
    },
  );
  conv.replies.set(requestId, { at: Date.now(), body: await res.clone().text(), status: res.status });
  if (conv.replies.size > 50) conv.replies.delete(conv.replies.keys().next().value!);
  return res;
}

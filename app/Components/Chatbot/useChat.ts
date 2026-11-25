"use client";

/**
 * Linko conversation state.
 *
 * Talks to the Document 04 API:
 *   PUB-01 create conversation · PUB-02 TEXT / ACTION messages · PUB-14 close.
 * Guided steps render instantly from the shared flow definitions and are
 * reported to the server as ACTION turns, so the server keeps the
 * authoritative state machine, topics, clarify/retry counters and history.
 * Free text is answered by the server (deterministic safety routing first,
 * then the verified AI answer).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AddressContext,
  COPY,
  FLOWS,
  FlowId,
  LinkoAction,
  MessageTone,
  MessageWidget,
  type ResultCardData,
  redactSensitive,
  routeIntent,
  track,
  welcomeActions,
} from "@/app/lib/chatbot/linko";
import { linkoApi, MessageData, newKey, type AnswerSource, type FeedbackReason } from "./linkoApi";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  tone?: MessageTone;
  widget?: MessageWidget;
  /** Address-check journey for widget "postcode". */
  context?: AddressContext;
  actions?: LinkoAction[];
  /** "flow" = deterministic guided step, "ai" = model answer. */
  source?: "flow" | "ai";
  /** Doc07 screen title for the header. */
  screen?: string;
  topic?: string;
  feedback?: "up" | "down";
  /** Coded reason given after "Not useful" (Doc03 §11.2). */
  feedbackReason?: FeedbackReason;
  /** Time the message was added (ms) – shown as HH:mm (Doc07 C04). */
  at?: number;
  /** Knowledge sections an AI answer was based on (Doc06 evidence label). */
  sources?: AnswerSource[];
  /** Data for widget "resultCard" (verified tool result). */
  result?: ResultCardData;
}

const STORAGE_KEY = "linko-chat-v1";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

function stamp<T extends ChatMessage>(m: T): T {
  return m.at ? m : { ...m, at: Date.now() };
}

/* ───────────────────────── Saved chat history ─────────────────────────
 * OPT-IN only (Doc06 C12, Doc03 FRS-D04, Doc07 LK-WF-18 "no pre-ticked choices"):
 * nothing is kept in localStorage unless the visitor turns on "Save chat history".
 * Saved chats expire after HISTORY_TTL_DAYS (pending Legal sign-off) and are
 * already redacted (no card numbers, passwords or codes).                */

const HISTORY_KEY = "linko-history-v1";
const SAVE_PREF_KEY = "linko-save-history";
const MAX_SAVED = 20;
export const HISTORY_TTL_DAYS = Number(process.env.NEXT_PUBLIC_LINKO_HISTORY_TTL_DAYS || 30);

export function readSavePreference(): boolean {
  try {
    return localStorage.getItem(SAVE_PREF_KEY) === "on";
  } catch {
    return false;
  }
}

export interface SavedChat {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
}

export function readHistory(): SavedChat[] {
  try {
    const v = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    if (!Array.isArray(v)) return [];
    const cutoff = Date.now() - HISTORY_TTL_DAYS * 24 * 60 * 60 * 1000;
    const fresh = (v as SavedChat[]).filter((c) => c && c.updatedAt >= cutoff);
    if (fresh.length !== v.length) writeHistory(fresh); // purge expired chats
    return fresh;
  } catch {
    return [];
  }
}

function writeHistory(list: SavedChat[]) {
  try {
    if (list.length) localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_SAVED)));
    else localStorage.removeItem(HISTORY_KEY);
  } catch {
    // storage unavailable – history simply isn't kept
  }
}

function chatTitle(messages: ChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user")?.content.trim() ?? "";
  const topic = messages.find((m) => m.topic)?.topic;
  const t = firstUser || topic || "Conversation";
  return t.length > 60 ? `${t.slice(0, 57)}…` : t;
}

function flowMessage(flow: FlowId, pathname: string, initial = false): ChatMessage {
  const step = FLOWS[flow];
  return {
    id: initial ? "welcome" : newId(),
    role: "assistant",
    content: step.text,
    tone: step.tone,
    widget: step.widget,
    context: step.context,
    actions: flow === "welcome" ? welcomeActions(pathname) : step.actions,
    source: "flow",
    screen: step.screen,
    topic: step.topic,
  };
}

function degradedMessage(message: string = COPY.degraded, withRetry = true): ChatMessage {
  return {
    id: newId(),
    role: "assistant",
    tone: "error",
    content: message,
    source: "flow",
    actions: [
      ...(withRetry ? [{ kind: "command", label: "Try again", command: "retry", primary: true } as LinkoAction] : []),
      { kind: "link", label: "Open Help Centre", href: "/get-help" },
      { kind: "flow", label: "Speak to a person", flow: "handoff", primary: !withRetry },
      { kind: "command", label: "Start over", command: "restart" },
    ],
  };
}

function fromAnswer(a: MessageData["answer"]): ChatMessage {
  const isError = a.status === "provider_unavailable" || a.status === "invalid" || a.status === "budget_limited";
  return {
    id: newId(),
    role: "assistant",
    content: a.message,
    tone: isError ? "error" : a.tone,
    actions: a.actions,
    widget: a.widget as MessageWidget | undefined,
    context: a.context as AddressContext | undefined,
    source: isError ? "flow" : a.source,
    screen: a.screen,
    topic: a.topic,
    sources: !isError && a.source === "ai" ? a.sources : undefined,
  };
}

function analyticsFor(flow: FlowId) {
  if (flow === "safety" || flow === "safetyCheck") {
    track("linko_safety_shown");
    track("linko_voice_safety_notice");
  }
  if (flow === "handoff") track("linko_handoff", { handoff_type: "options_shown" });
  if (flow === "complaint") track("linko_complaint_started");
  if (flow === "switchingYes" || flow === "switching") track("linko_switch_route_selected", { route: flow === "switchingYes" ? "residential_ots" : "question" });
  if (flow === "switchingYes") track("linko_ots_guidance_shown");
  if (flow === "plans") track("linko_plans_viewed");
  if (flow === "clarify") track("linko_intent_clarified");
  if (flow === "privacy") track("linko_privacy_opened");
  if (flow === "faultStatus" || flow === "faultType") track("linko_intent_selected", { intent_id: "diagnostic_started" });
}

/** Doc02 §04 / Doc03 NFR-02: coarse response-time buckets (no content), so p95 can be watched in analytics. */
function latencyBucket(ms: number) {
  return ms < 500 ? "lt_0_5s" : ms < 1500 ? "lt_1_5s" : ms < 3000 ? "lt_3s" : ms < 5000 ? "lt_5s" : ms < 10000 ? "lt_10s" : "ge_10s";
}

export function useChat(pathname: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [flowMessage("welcome", pathname, true)]);
  const [isLoading, setIsLoading] = useState(false);
  const [restored, setRestored] = useState(false);
  const [saveHistory, setSaveHistoryState] = useState(false);
  /** Confirmed receipts from systems of record (e.g. a CRM reference) – shown apart from "information only" topics. */
  const [receipts, setReceipts] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const lastQuestion = useRef<string | null>(null);
  const convId = useRef<string>(newId()); // local history id
  const serverId = useRef<string | null>(null); // PUB-01 conversationId

  // Restore the open conversation for this tab.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { id?: string; serverId?: string | null; messages?: ChatMessage[] } | ChatMessage[];
        const msgs = Array.isArray(parsed) ? parsed : parsed.messages;
        if (!Array.isArray(parsed)) {
          if (parsed.id) convId.current = parsed.id;
          serverId.current = parsed.serverId ?? null;
        }
        if (Array.isArray(msgs) && msgs.length) setMessages(msgs);
      }
    } catch {
      // storage unavailable – start fresh
    }
    setSaveHistoryState(readSavePreference());
    setRestored(true);
  }, []);

  // Persist the open conversation (tab) and, once the visitor has said something, the saved history (browser).
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: convId.current, serverId: serverId.current, messages }));
    } catch {
      // ignore
    }
    if (!saveHistory || !messages.some((m) => m.role === "user")) return;
    const entry: SavedChat = { id: convId.current, title: chatTitle(messages), updatedAt: Date.now(), messages };
    writeHistory([entry, ...readHistory().filter((c) => c.id !== convId.current)]);
  }, [messages, restored, saveHistory]);

  /** Turn "Save chat history" on or off. Turning it off deletes everything already saved. */
  const setSaveHistory = useCallback((on: boolean) => {
    try {
      if (on) localStorage.setItem(SAVE_PREF_KEY, "on");
      else {
        localStorage.removeItem(SAVE_PREF_KEY);
        writeHistory([]);
      }
    } catch {
      // storage unavailable
    }
    setSaveHistoryState(on);
  }, []);

  const push = useCallback((...items: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...items.map(stamp)]);
  }, []);

  /** PUB-01: create the server conversation on first use. */
  const ensureServer = useCallback(async (): Promise<string | null> => {
    if (serverId.current) return serverId.current;
    const r = await linkoApi.createConversation(pathname);
    if (r.ok) {
      serverId.current = r.body.data.conversationId;
      track("linko_session_started");
    }
    return serverId.current;
  }, [pathname]);

  /** PUB-02 with one transparent re-create if the server session expired (404). */
  const sendToServer = useCallback(
    async (
      body: { kind: "TEXT"; text: string } | { kind: "ACTION"; actionId: string; label?: string },
      signal?: AbortSignal,
    ) => {
      for (let attempt = 0; attempt < 2; attempt++) {
        const id = await ensureServer();
        if (!id) return null;
        const r = await linkoApi.sendMessage(id, { ...body, requestId: newKey() } as never, signal);
        if (!r.ok && r.http === 404) {
          serverId.current = null; // expired → create a new one and try once more (Doc03 §05.1: tell the visitor)
          if (attempt === 0)
            push({
              id: newId(),
              role: "assistant",
              tone: "notice",
              source: "flow",
              content: "Your earlier chat session expired, so I've started a fresh one. I may need you to repeat a detail.",
            });
          continue;
        }
        return r;
      }
      return null;
    },
    [ensureServer, push],
  );

  const closeServer = useCallback(() => {
    const id = serverId.current;
    serverId.current = null;
    if (id) void linkoApi.close(id); // PUB-14 – purge server session
  }, []);

  /** Run a deterministic guided step: render now, record it on the server as an ACTION turn. */
  const startFlow = useCallback(
    (flow: FlowId, userLabel?: string) => {
      const items: ChatMessage[] = [];
      if (userLabel) items.push({ id: newId(), role: "user", content: userLabel });
      items.push(flowMessage(flow, pathname));
      push(...items);
      track("linko_intent_selected", { intent_id: flow });
      analyticsFor(flow);
      // Doc09 telemetry: the answer to the telecare / emergency-line question (no free text).
      const SAFETY_ANSWERS: Record<string, string> = { Yes: "yes", No: "no", "Not sure": "unsure", "Prefer not to say": "declined" };
      if (userLabel && SAFETY_ANSWERS[userLabel] && (flow === "safety" || flow === "faultStatus"))
        track("linko_fault_safety_triaged", { answer: SAFETY_ANSWERS[userLabel] });
      void sendToServer({ kind: "ACTION", actionId: flow, label: userLabel }).catch(() => undefined);
      // Doc10 HS-WF-10-03 / HF-03: safety and contact-option screens also put a case in the staff queue
      // (no topics are shared without the visitor's choice; P0 for safety).
      if (flow === "handoffSafety" || flow === "handoffChannels") {
        void ensureServer().then((id) =>
          linkoApi.handoff(
            { channel: flow === "handoffSafety" ? "PHONE" : "ANY", shareSummary: false, reason: flow === "handoffSafety" ? "SAFETY" : "USER_REQUEST", conversationId: id },
            newKey(),
          ),
        );
      }
    },
    [ensureServer, pathname, push, sendToServer],
  );

  /** Free text → PUB-02 TEXT; the server routes safety/human/complaint first, then the verified AI answer. */
  const ask = useCallback(
    async (body: { kind: "TEXT"; text: string } | { kind: "ACTION"; actionId: "retry" }) => {
      setIsLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const started = performance.now();
      try {
        const r = await sendToServer(body, controller.signal);
        const ms = Math.round(performance.now() - started);
        track("linko_response_time", { elapsed_ms: ms, bucket: latencyBucket(ms), kind: "answer", ok: Boolean(r?.ok) });
        if (r?.ok) {
          const a = r.body.data.answer;
          // Doc01 §8.1 intent_unsupported: the question couldn't be answered from approved information.
          if (a.status === "abstained") track("linko_intent_unsupported", { reason: a.source === "ai" ? "no_grounded_answer" : "clarify" });
          if (a.status === "provider_unavailable" || a.status === "invalid") {
            track("linko_error", { error_class: a.status, component_id: "C04" });
          }
          if (a.message === COPY.clarifyFallback) track("linko_fallback_offered");
          push(fromAnswer(a));
        } else if (r && !r.ok && r.http === 429) {
          push({ ...degradedMessage(r.body?.message ?? COPY.rateLimited, false) });
        } else {
          track("linko_error", { error_class: r ? `http_${r.http}` : "network", component_id: "C04" });
          push(degradedMessage());
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        push(degradedMessage());
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [push, sendToServer],
  );

  /** Free-text question from the composer or an "ask" chip. */
  const send = useCallback(
    (text: string) => {
      const raw = text.trim();
      if (!raw || isLoading) return;

      // DLP in the browser: secrets never leave the device.
      const { text: content, removed } = redactSensitive(raw);
      const userMsg: ChatMessage = { id: newId(), role: "user", content };
      const extra: ChatMessage[] = [];
      if (removed.length) {
        track("linko_dlp_redacted", { kinds: removed.length });
        extra.push({
          id: newId(),
          role: "assistant",
          tone: "notice",
          source: "flow",
          content: COPY.dlpNotice(removed.join(" and ")),
          actions: [
            { kind: "link", label: "Secure sign-in", href: "/login" },
            { kind: "link", label: "Pay securely", href: "/payments-billing" },
          ],
        });
      }
      track("linko_message_sent");
      lastQuestion.current = content;

      // Safety / human / complaint show instantly (no wait); the server applies the same rule.
      const routeStart = performance.now();
      const routed = routeIntent(content);
      if (routed) {
        push(userMsg, ...extra, flowMessage(routed, pathname));
        // Doc01 §8.1 Intent: time_to_route + confidence_bucket (deterministic rules are "rule", the model is "model").
        track("linko_intent_selected", {
          intent_id: routed,
          time_to_route_ms: Math.round(performance.now() - routeStart),
          confidence_bucket: "rule",
        });
        if (routed === "complaint") track("linko_complaint_recognised", { trigger: "wording" });
        analyticsFor(routed);
        void sendToServer({ kind: "TEXT", text: content }).catch(() => undefined);
        return;
      }

      push(userMsg, ...extra);
      void ask({ kind: "TEXT", text: content });
    },
    [ask, isLoading, pathname, push, sendToServer],
  );

  /** "Try again" – the server allows 2 retries, then a safe fallback (Doc01 WF-19). */
  const retry = useCallback(() => {
    if (isLoading) return;
    setMessages((prev) => (prev[prev.length - 1]?.tone === "error" ? prev.slice(0, -1) : prev));
    void ask({ kind: "ACTION", actionId: "retry" });
  }, [ask, isLoading]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    lastQuestion.current = null;
    setIsLoading(false);
    closeServer();
    convId.current = newId();
    setReceipts([]);
    setMessages([stamp(flowMessage("welcome", pathname, true))]);
  }, [closeServer, pathname]);

  const restart = reset;

  /** LK-WF-20 "End chat": close the server session (PUB-14) and start clean. */
  const endChat = useCallback(
    (completion: "summary" | "abandon" | "handoff" = "abandon") => {
      track("linko_session_ended", { completion });
      reset();
    },
    [reset],
  );

  /** Stop waiting for an answer (Doc07 §08 "cancel if safe" – nothing is changed by a question). */
  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  /** Re-open a saved conversation from Chat history. */
  const openChat = useCallback(
    (chat: SavedChat) => {
      abortRef.current?.abort();
      lastQuestion.current = null;
      setIsLoading(false);
      closeServer();
      convId.current = chat.id;
      setMessages(chat.messages);
      track("linko_intent_selected", { intent_id: "history_opened" });
    },
    [closeServer],
  );

  /** Delete one saved chat (or all with no id). Returns the remaining list. */
  const deleteSaved = useCallback(
    (id?: string): SavedChat[] => {
      const rest = id ? readHistory().filter((c) => c.id !== id) : [];
      writeHistory(rest);
      // Deleting the open conversation starts a fresh one so it isn't re-saved.
      if (!id || id === convId.current) reset();
      return rest;
    },
    [reset],
  );

  /**
   * "Useful" is recorded straight away; "Not useful" is recorded once the visitor picks a reason
   * (or skips), and goes to the staff review queue with the redacted answer (Doc03 §11.2 — never used to self-train).
   */
  const setFeedback = useCallback(
    (id: string, value: "up" | "down", reason?: FeedbackReason) => {
      const msg = messages.find((m) => m.id === id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, feedback: value, feedbackReason: reason } : m)));
      track("linko_feedback", { value, ...(reason ? { reason } : {}) });
      if (value === "up") track("linko_task_resolved", { via: "answer_feedback" });
      if (value === "down") track("linko_answer_disputed", reason ? { reason } : {});
      const conv = serverId.current;
      if (conv && msg)
        void linkoApi.feedback(conv, {
          rating: value === "up" ? "UP" : "DOWN",
          reason: value === "down" ? (reason ?? "OTHER") : undefined,
          answer: msg.content.slice(0, 600),
          sourceIds: (msg.sources ?? []).map((s) => s.id),
        });
    },
    [messages],
  );

  /** Adds a message produced by a widget (e.g. the address checker). */
  const addAssistant = useCallback(
    (msg: Omit<ChatMessage, "id" | "role">) => push({ id: newId(), role: "assistant", ...msg }),
    [push],
  );

  /** Adds the visitor's own choice inside a widget (e.g. "All devices"). */
  const addUser = useCallback((content: string) => push({ id: newId(), role: "user", content }), [push]);

  const topics = Array.from(new Set(messages.map((m) => m.topic).filter(Boolean))) as string[];

  return {
    messages,
    isLoading,
    send,
    startFlow,
    retry,
    restart,
    endChat,
    setFeedback,
    addAssistant,
    addUser,
    topics,
    receipts,
    addReceipt: (r: string) => setReceipts((prev) => (prev.includes(r) ? prev : [...prev, r])),
    openChat,
    deleteSaved,
    saveHistory,
    setSaveHistory,
    cancel,
    conversationId: () => convId.current,
    serverConversationId: () => serverId.current,
    /** PUB-01 on demand, for widgets that call the API directly (address search). */
    getServerId: ensureServer,
  };
}

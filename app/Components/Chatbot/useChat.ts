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
  redactSensitive,
  routeIntent,
  track,
  welcomeActions,
} from "@/app/lib/chatbot/linko";
import { linkoApi, MessageData, newKey } from "./linkoApi";

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
}

const STORAGE_KEY = "linko-chat-v1";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

/* ───────────────────────── Saved chat history ─────────────────────────
 * Kept in this browser only (localStorage), never on Zoiko's servers.
 * Messages are already redacted (no card numbers, passwords or codes) and
 * address-picker results are never part of the transcript.              */

const HISTORY_KEY = "linko-history-v1";
const MAX_SAVED = 20;

export interface SavedChat {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
}

export function readHistory(): SavedChat[] {
  try {
    const v = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(v) ? (v as SavedChat[]) : [];
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
  };
}

export function useChat(pathname: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [flowMessage("welcome", pathname, true)]);
  const [isLoading, setIsLoading] = useState(false);
  const [restored, setRestored] = useState(false);
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
    if (!messages.some((m) => m.role === "user")) return;
    const entry: SavedChat = { id: convId.current, title: chatTitle(messages), updatedAt: Date.now(), messages };
    writeHistory([entry, ...readHistory().filter((c) => c.id !== convId.current)]);
  }, [messages, restored]);

  const push = useCallback((...items: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...items]);
  }, []);

  /** PUB-01: create the server conversation on first use. */
  const ensureServer = useCallback(async (): Promise<string | null> => {
    if (serverId.current) return serverId.current;
    const r = await linkoApi.createConversation(pathname);
    if (r.ok) serverId.current = r.body.data.conversationId;
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
          serverId.current = null; // expired → create a new one and try once more
          continue;
        }
        return r;
      }
      return null;
    },
    [ensureServer],
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
      if (flow === "safety" || flow === "safetyCheck") track("linko_safety_shown");
      if (flow === "handoff") track("linko_handoff", { handoff_type: "options_shown" });
      void sendToServer({ kind: "ACTION", actionId: flow, label: userLabel }).catch(() => undefined);
    },
    [pathname, push, sendToServer],
  );

  /** Free text → PUB-02 TEXT; the server routes safety/human/complaint first, then the verified AI answer. */
  const ask = useCallback(
    async (body: { kind: "TEXT"; text: string } | { kind: "ACTION"; actionId: "retry" }) => {
      setIsLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const r = await sendToServer(body, controller.signal);
        if (r?.ok) {
          const a = r.body.data.answer;
          if (a.status === "provider_unavailable" || a.status === "invalid") {
            track("linko_error", { error_class: a.status, component_id: "C04" });
          }
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
          actions: [{ kind: "link", label: "Secure sign-in", href: "/login" }],
        });
      }
      track("linko_message_sent");
      lastQuestion.current = content;

      // Safety / human / complaint show instantly (no wait); the server applies the same rule.
      const routed = routeIntent(content);
      if (routed) {
        push(userMsg, ...extra, flowMessage(routed, pathname));
        track("linko_intent_selected", { intent_id: routed });
        if (routed === "safety") track("linko_safety_shown");
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
    setMessages([flowMessage("welcome", pathname, true)]);
  }, [closeServer, pathname]);

  const restart = reset;

  /** LK-WF-20 "End chat": close the server session (PUB-14) and start clean. */
  const endChat = reset;

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

  const setFeedback = useCallback((id: string, value: "up" | "down") => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, feedback: value } : m)));
    track("linko_feedback", { value });
  }, []);

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
    openChat,
    deleteSaved,
    conversationId: () => convId.current,
    serverConversationId: () => serverId.current,
  };
}

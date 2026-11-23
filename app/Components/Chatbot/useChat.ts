"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  COPY,
  FLOWS,
  FlowId,
  LinkoAction,
  LinkoAnswer,
  MessageTone,
  MessageWidget,
  redactSensitive,
  routeIntent,
  track,
  welcomeActions,
} from "@/app/lib/chatbot/linko";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  tone?: MessageTone;
  widget?: MessageWidget;
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
    actions: flow === "welcome" ? welcomeActions(pathname) : step.actions,
    source: "flow",
    screen: step.screen,
    topic: step.topic,
  };
}

export function useChat(pathname: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [flowMessage("welcome", pathname, true)]);
  const [isLoading, setIsLoading] = useState(false);
  const [restored, setRestored] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const lastQuestion = useRef<string | null>(null);
  const convId = useRef<string>(newId());

  // Restore the open conversation for this tab.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { id?: string; messages?: ChatMessage[] } | ChatMessage[];
        const msgs = Array.isArray(parsed) ? parsed : parsed.messages;
        if (!Array.isArray(parsed) && parsed.id) convId.current = parsed.id;
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
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: convId.current, messages }));
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

  /** Run a deterministic guided step (no AI call). */
  const startFlow = useCallback(
    (flow: FlowId, userLabel?: string) => {
      const items: ChatMessage[] = [];
      if (userLabel) items.push({ id: newId(), role: "user", content: userLabel });
      items.push(flowMessage(flow, pathname));
      push(...items);
      track("linko_intent_selected", { intent_id: flow });
      if (flow === "safety") track("linko_safety_shown");
      if (flow === "handoff") track("linko_handoff", { handoff_type: "options_shown" });
    },
    [pathname, push],
  );

  const askModel = useCallback(
    async (history: ChatMessage[]) => {
      setIsLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            // Only text turns go to the server; the welcome screen is UI-only.
            messages: history
              .filter((m) => m.content !== COPY.welcome && m.content.trim())
              .map(({ role, content }) => ({ role, content })),
          }),
        });
        const answer = (await res.json().catch(() => null)) as LinkoAnswer | null;
        if (!answer || typeof answer.message !== "string") throw new Error("bad response");
        if (answer.status === "provider_unavailable" || answer.status === "invalid") {
          track("linko_error", { error_class: answer.status, component_id: "C04" });
        }
        push({
          id: newId(),
          role: "assistant",
          content: answer.message,
          tone: answer.tone,
          actions: answer.actions,
          source: answer.status === "answered" || answer.status === "abstained" || answer.status === "handoff" ? "ai" : "flow",
          screen:
            answer.status === "safety"
              ? FLOWS.safety.screen
              : answer.status === "complaint"
                ? FLOWS.complaint.screen
                : answer.status === "handoff" && answer.actions.some((x) => x.kind === "link" && x.href.includes("tawk.to"))
                  ? FLOWS.handoff.screen
                  : undefined,
          topic:
            answer.status === "safety"
              ? FLOWS.safety.topic
              : answer.status === "complaint"
                ? FLOWS.complaint.topic
                : undefined,
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        track("linko_error", { error_class: "network", component_id: "C04" });
        push({
          id: newId(),
          role: "assistant",
          tone: "error",
          content: COPY.degraded,
          source: "flow",
          actions: [
            { kind: "command", label: "Try again", command: "retry", primary: true },
            { kind: "link", label: "Help Centre", href: "/get-help" },
            { kind: "flow", label: "Speak to our team", flow: "handoff" },
          ],
        });
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [push],
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

      // Deterministic routing: safety, human request and complaints skip the model.
      const routed = routeIntent(content);
      if (routed) {
        push(userMsg, ...extra, flowMessage(routed, pathname));
        track("linko_intent_selected", { intent_id: routed });
        if (routed === "safety") track("linko_safety_shown");
        return;
      }

      const history = [...messages, userMsg];
      push(userMsg, ...extra);
      void askModel(history);
    },
    [askModel, isLoading, messages, pathname, push],
  );

  /** "Try again" after a degraded answer: re-ask the last question once. */
  const retry = useCallback(() => {
    if (isLoading || !lastQuestion.current) return;
    const trimmed = [...messages];
    if (trimmed[trimmed.length - 1]?.tone === "error") trimmed.pop();
    setMessages(trimmed);
    void askModel(trimmed);
  }, [askModel, isLoading, messages]);

  const restart = useCallback(() => {
    abortRef.current?.abort();
    lastQuestion.current = null;
    setIsLoading(false);
    convId.current = newId();
    setMessages([flowMessage("welcome", pathname, true)]);
  }, [pathname]);

  /** Re-open a saved conversation from Chat history. */
  const openChat = useCallback((chat: SavedChat) => {
    abortRef.current?.abort();
    lastQuestion.current = null;
    setIsLoading(false);
    convId.current = chat.id;
    setMessages(chat.messages);
    track("linko_intent_selected", { intent_id: "history_opened" });
  }, []);

  /** Delete one saved chat (or all with no id). Returns the remaining list. */
  const deleteSaved = useCallback(
    (id?: string): SavedChat[] => {
      const rest = id ? readHistory().filter((c) => c.id !== id) : [];
      writeHistory(rest);
      // Deleting the open conversation starts a fresh one so it isn't re-saved.
      if (!id || id === convId.current) {
        abortRef.current?.abort();
        lastQuestion.current = null;
        setIsLoading(false);
        convId.current = newId();
        setMessages([flowMessage("welcome", pathname, true)]);
      }
      return rest;
    },
    [pathname],
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

  const topics = Array.from(new Set(messages.map((m) => m.topic).filter(Boolean))) as string[];

  return {
    messages,
    isLoading,
    send,
    startFlow,
    retry,
    restart,
    setFeedback,
    addAssistant,
    topics,
    openChat,
    deleteSaved,
    conversationId: () => convId.current,
  };
}

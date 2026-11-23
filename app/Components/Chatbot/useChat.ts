"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ChatRole = "user" | "assistant";
export type ChatMessage = { id: string; role: ChatRole; content: string };

const STORAGE_KEY = "zoiko-chat-history";

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm Zoe 👋 I can help with plans, availability, switching, setup, router issues and billing. What can I help you with today?",
};

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Restore the conversation for this browser tab.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {
      // storage unavailable – start fresh
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isLoading) return;

      setError(null);
      const userMsg: ChatMessage = { id: newId(), role: "user", content };
      const botMsg: ChatMessage = { id: newId(), role: "assistant", content: "" };
      const history = [...messages, userMsg];
      setMessages([...history, botMsg]);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            // The welcome message is UI-only; don't send it to the model.
            messages: history
              .filter((m) => m.id !== WELCOME_MESSAGE.id)
              .map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Something went wrong. Please try again.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsg.id ? { ...m, content: acc } : m)),
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError((err as Error).message);
        // Remove the empty bot bubble on failure.
        setMessages((prev) => prev.filter((m) => !(m.id === botMsg.id && !m.content)));
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, send, reset };
}

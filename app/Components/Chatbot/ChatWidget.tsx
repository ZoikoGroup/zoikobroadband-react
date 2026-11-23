"use client";

import Link from "next/link";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, RotateCcw, Phone } from "lucide-react";
import { useChat, ChatMessage } from "./useChat";

const QUICK_QUESTIONS = [
  "Can I get full fibre at my address?",
  "What's the difference between FTTP and SOGEA?",
  "My internet isn't working",
  "How do I switch to Zoiko?",
];

/** Renders **bold**, [links](/path) and line breaks / bullet lists safely (no HTML injection). */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      const cls = "font-semibold text-[#10446C] underline underline-offset-2 dark:text-[#F6C140]";
      if (href.startsWith("/")) {
        parts.push(
          <Link key={`${keyPrefix}-${i++}`} href={href} className={cls}>
            {m[1]}
          </Link>,
        );
      } else if (/^(https?:|mailto:|tel:)/.test(href)) {
        parts.push(
          <a key={`${keyPrefix}-${i++}`} href={href} className={cls} target="_blank" rel="noopener noreferrer">
            {m[1]}
          </a>,
        );
      } else {
        parts.push(m[1]);
      }
    } else if (m[3]) {
      parts.push(<strong key={`${keyPrefix}-${i++}`}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <>
      {lines.map((line, idx) => {
        const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
        if (bullet) {
          return (
            <div key={idx} className="flex gap-2 pl-1">
              <span aria-hidden className="text-[#F6C140]">•</span>
              <span>{renderInline(bullet[1], `l${idx}`)}</span>
            </div>
          );
        }
        if (!line.trim()) return <div key={idx} className="h-2" />;
        return (
          <Fragment key={idx}>
            <p>{renderInline(line.replace(/^#+\s*/, ""), `l${idx}`)}</p>
          </Fragment>
        );
      })}
    </>
  );
}

function Bubble({ msg, typing }: { msg: ChatMessage; typing: boolean }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div
          aria-hidden
          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#10446C] text-xs font-bold text-[#F6C140]"
        >
          Z
        </div>
      )}
      <div
        className={`max-w-[80%] space-y-1 rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-[#10446C] text-white"
            : "rounded-bl-sm bg-white text-gray-800 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700"
        }`}
      >
        {msg.content ? (
          isUser ? <p className="whitespace-pre-wrap">{msg.content}</p> : <MessageContent content={msg.content} />
        ) : typing ? (
          <span className="flex gap-1 py-1" aria-label="Zoe is typing">
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, error, send, reset } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (text: string) => {
    if (!text.trim() || isLoading) return;
    send(text);
    setInput("");
  };

  const showQuick = messages.length === 1 && !isLoading;

  return (
    <>
      {/* Chat panel */}
      {open && (
        <section
          role="dialog"
          aria-label="Zoiko Broadband chat assistant"
          className="fixed inset-x-0 bottom-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-gray-50 shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-8rem)] sm:w-[380px] sm:rounded-2xl dark:bg-gray-900"
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-[#10446C] px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6C140] font-bold text-[#10446C]">
              Z
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold leading-tight">Zoe · Zoiko Assistant</h2>
              <p className="flex items-center gap-1.5 text-xs text-blue-100">
                <span className="h-2 w-2 rounded-full bg-green-400" /> Online · replies instantly
              </p>
            </div>
            <button
              onClick={reset}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label="Start a new conversation"
              title="New conversation"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <Bubble key={m.id} msg={m} typing={isLoading && i === messages.length - 1} />
            ))}

            {showQuick && (
              <div className="flex flex-wrap gap-2 pl-9">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className="rounded-full border border-[#10446C]/30 bg-white px-3 py-1.5 text-xs font-medium text-[#10446C] transition hover:bg-[#10446C] hover:text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950 dark:text-red-300">
                {error}
              </p>
            )}
          </div>

          {/* Human handoff */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            <span>Prefer a person?</span>
            <a href="tel:+442071646399" className="flex items-center gap-1 font-semibold text-[#10446C] dark:text-[#F6C140]">
              <Phone size={12} /> 020 7164 6399
            </a>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-end gap-2 border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              rows={1}
              maxLength={2000}
              placeholder="Type your question…"
              aria-label="Type your message"
              className="max-h-28 flex-1 resize-none rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#10446C] focus:ring-2 focus:ring-[#10446C]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6C140] text-[#10446C] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="bg-white pb-2 text-center text-[10px] text-gray-400 dark:bg-gray-900">
            AI assistant · may make mistakes · don&apos;t share passwords or card details
          </p>
        </section>
      )}

      {/* Launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Zoiko"}
        aria-expanded={open}
        className={`fixed bottom-6 right-6 z-[60] h-14 items-center justify-center gap-2 rounded-full bg-[#10446C] px-5 text-white shadow-lg ring-4 ring-[#F6C140]/40 transition hover:scale-105 ${
          open ? "hidden sm:flex" : "flex"
        }`}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="hidden text-sm font-semibold sm:inline">Need help?</span>}
      </button>
    </>
  );
}

"use client";

/**
 * Linko – Zoiko Broadband AI assistant widget.
 * Implements the LK-WF-01…20 interface contract (Doc07) with the component
 * set C01–C20: launcher, chat shell, header, messages, composer, intent
 * chips, address picker, safety banner, support CTA, loader, feedback,
 * privacy links and summary card.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Info,
  Loader2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { ChatMessage, useChat } from "./useChat";
import {
  ASSISTANT,
  COMPANY,
  COPY,
  LinkoAction,
  isAllowedHref,
  normalisePostcode,
  track,
} from "@/app/lib/chatbot/linko";

const ENABLED = process.env.NEXT_PUBLIC_LINKO_ENABLED !== "false";

/* ───────────────────────────── Brand tokens ─────────────────────────────
 * PENDING BRAND (Doc07 §02): navy / white / gold taken from the live site.
 * Replace with signed tokens when the brand kit is supplied.             */
const NAVY = "bg-[#0E2440]";
const PRIMARY_BTN =
  "bg-[#10446C] text-white hover:bg-[#0c3658] dark:bg-[#F6C140] dark:text-[#0E2440] dark:hover:bg-[#f3b622]";
const SECONDARY_BTN =
  "border border-slate-300 bg-white text-[#0E2440] hover:border-[#10446C] hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6C140]";

/* ───────────────────────── Safe text rendering ─────────────────────────
 * Only **bold**, - bullets and allow-listed [links](/path). No raw HTML. */

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
      if (isAllowedHref(href) && href.startsWith("/")) {
        parts.push(
          <Link key={`${keyPrefix}-${i++}`} href={href} className={cls}>
            {m[1]}
          </Link>,
        );
      } else {
        parts.push(m[1]); // not allow-listed: plain text only
      }
    } else if (m[3]) {
      parts.push(<strong key={`${keyPrefix}-${i++}`}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function MessageText({ content }: { content: string }) {
  const lines = content.split("\n");
  const out: ReactNode[] = [];
  let list: ReactNode[] = [];
  const flush = (k: number) => {
    if (list.length) {
      out.push(
        <ul key={`ul-${k}`} className="ml-1 space-y-1">
          {list}
        </ul>,
      );
      list = [];
    }
  };
  lines.forEach((line, idx) => {
    const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (bullet) {
      list.push(
        <li key={idx} className="flex gap-2">
          <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A24B]" />
          <span>{renderInline(bullet[1], `l${idx}`)}</span>
        </li>,
      );
      return;
    }
    flush(idx);
    if (line.trim()) out.push(<p key={idx}>{renderInline(line.replace(/^#+\s*/, ""), `l${idx}`)}</p>);
  });
  flush(lines.length);
  return <div className="space-y-2">{out}</div>;
}

/* ─────────────────────────── C01 Launcher “O” ─────────────────────────── */

function LinkoMark({ size = 40 }: { size?: number }) {
  // Schematic placeholder for the approved stylised "O" mark (PENDING BRAND).
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F6C140] to-[#C9A24B] shadow-inner"
    >
      <span
        className="rounded-full border-[#0E2440]"
        style={{ width: size * 0.5, height: size * 0.5, borderWidth: Math.max(2, size * 0.09) }}
      />
    </span>
  );
}

/* ─────────────────────── C06 / C12 / C13 Action buttons ────────────────── */

function ActionButton({
  action,
  onAction,
  disabled,
}: {
  action: LinkoAction;
  onAction: (a: LinkoAction) => void;
  disabled?: boolean;
}) {
  const base = `flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${FOCUS} ${
    action.primary ? PRIMARY_BTN : SECONDARY_BTN
  } disabled:cursor-not-allowed disabled:opacity-50`;

  if (action.kind === "link") {
    const href = action.href;
    if (!isAllowedHref(href)) return null;
    const external = /^https?:/.test(href);
    const onClick = () => {
      if (href.startsWith("tel:") || href.includes("tawk.to")) track("linko_handoff", { handoff_type: href.startsWith("tel:") ? "phone" : "live_chat" });
      track("linko_flow_exit", { reason_code: "link" });
    };
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={base} onClick={onClick}>
          {action.label}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={base}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {action.label}
        {external && (
          <>
            <ExternalLink size={14} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }
  return (
    <button type="button" className={base} onClick={() => onAction(action)} disabled={disabled}>
      {action.label}
    </button>
  );
}

function ActionGroup({
  actions,
  onAction,
  disabled,
}: {
  actions: LinkoAction[];
  onAction: (a: LinkoAction) => void;
  disabled?: boolean;
}) {
  const primary = actions.filter((a) => a.primary);
  const rest = actions.filter((a) => !a.primary);
  return (
    <div className="mt-3 space-y-2" role="group" aria-label="Suggested next steps">
      {primary.map((a, i) => (
        <ActionButton key={`p${i}`} action={a} onAction={onAction} disabled={disabled} />
      ))}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
          {rest.map((a, i) => (
            <ActionButton key={`r${i}`} action={a} onAction={onAction} disabled={disabled} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── C08 Postcode + address ──────────────────────── */

type Address = { id: string; display: string };
type PickerState =
  | { step: "postcode"; error?: string }
  | { step: "loading" }
  | { step: "results"; addresses: Address[]; selected?: string; error?: string }
  | { step: "done"; ok: boolean };

function AddressPicker({
  active,
  onFinished,
}: {
  active: boolean;
  onFinished: (outcome: "selected" | "failed" | "empty" | "notListed") => void;
}) {
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState<PickerState>({ step: "postcode" });
  const uid = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!active || state.step === "done") {
    return (
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {state.step === "done" && state.ok ? "Address step completed." : "This address check has closed."}
      </p>
    );
  }

  const find = async (e: FormEvent) => {
    e.preventDefault();
    const pc = normalisePostcode(postcode);
    if (!pc) {
      setState({ step: "postcode", error: "Enter a full UK postcode, for example SW1A 1AA." });
      inputRef.current?.focus();
      return;
    }
    setPostcode(pc);
    setState({ step: "loading" });
    track("linko_intent_selected", { intent_id: "postcode_submitted" });
    try {
      const res = await fetch("/api/BritishTelecom/search-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode: pc }),
        signal: AbortSignal.timeout(15_000),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        addresses?: { id?: string; display?: string }[];
      } | null;
      if (!res.ok || !data?.success) throw new Error("lookup failed");
      const addresses = (data.addresses ?? [])
        .filter((a): a is Address => !!a.id && !!a.display)
        .map((a) => ({ id: a.id, display: a.display }));
      if (!addresses.length) {
        setState({ step: "done", ok: false });
        onFinished("empty");
        return;
      }
      setState({ step: "results", addresses });
    } catch {
      track("linko_error", { error_class: "address_lookup", component_id: "C08" });
      setState({ step: "done", ok: false });
      onFinished("failed");
    }
  };

  if (state.step === "results") {
    return (
      <form
        className="mt-3 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!state.selected) {
            setState({ ...state, error: "Choose your address from the list, or select “Address not listed”." });
            return;
          }
          setState({ step: "done", ok: true });
          onFinished("selected");
        }}
      >
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-[#0E2440] dark:text-slate-100">
            Choose the full address for {postcode}
          </legend>
          <div
            className="max-h-52 space-y-1 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-600 dark:bg-slate-800"
            aria-describedby={state.error ? `${uid}-err` : undefined}
          >
            {state.addresses.map((a) => (
              <label
                key={a.id}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm ${
                  state.selected === a.id
                    ? "bg-[#10446C]/10 font-semibold text-[#0E2440] dark:bg-[#F6C140]/15 dark:text-white"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-addr`}
                  value={a.id}
                  checked={state.selected === a.id}
                  onChange={() => setState({ ...state, selected: a.id, error: undefined })}
                  className="h-4 w-4 accent-[#10446C]"
                />
                {a.display}
              </label>
            ))}
          </div>
        </fieldset>
        {state.error && (
          <p id={`${uid}-err`} className="text-sm text-red-700 dark:text-red-300">
            {state.error}
          </p>
        )}
        <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
          <button type="submit" className={`min-h-11 rounded-lg px-3 text-sm font-semibold ${PRIMARY_BTN} ${FOCUS}`}>
            Check this address
          </button>
          <button
            type="button"
            className={`min-h-11 rounded-lg px-3 text-sm font-medium ${SECONDARY_BTN} ${FOCUS}`}
            onClick={() => {
              setState({ step: "done", ok: false });
              onFinished("notListed");
            }}
          >
            Address not listed
          </button>
        </div>
      </form>
    );
  }

  const error = state.step === "postcode" ? state.error : undefined;
  return (
    <form onSubmit={find} className="mt-3 space-y-2" noValidate>
      <label htmlFor={`${uid}-pc`} className="block text-sm font-semibold text-[#0E2440] dark:text-slate-100">
        Postcode
      </label>
      <p id={`${uid}-hint`} className="text-xs text-slate-500 dark:text-slate-400">
        For example, SW1A 1AA
      </p>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id={`${uid}-pc`}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          autoComplete="postal-code"
          inputMode="text"
          maxLength={8}
          aria-invalid={!!error}
          aria-describedby={`${uid}-hint${error ? ` ${uid}-err` : ""}`}
          className={`min-h-11 w-full min-w-0 rounded-lg border bg-white px-3 text-sm uppercase text-slate-900 dark:bg-slate-800 dark:text-white ${
            error ? "border-red-600" : "border-slate-300 dark:border-slate-600"
          } ${FOCUS}`}
        />
        <button
          type="submit"
          disabled={state.step === "loading"}
          className={`flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold ${PRIMARY_BTN} ${FOCUS} disabled:opacity-60`}
        >
          {state.step === "loading" && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />}
          {state.step === "loading" ? "Finding…" : "Find my address"}
        </button>
      </div>
      {error && (
        <p id={`${uid}-err`} role="alert" className="text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
      {state.step === "loading" && (
        <p role="status" className="sr-only">
          Finding addresses
        </p>
      )}
    </form>
  );
}

/* ────────────────────────── C20 Summary card ──────────────────────────── */

function SummaryCard({ topics }: { topics: string[] }) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-600 dark:bg-slate-800">
      <h3 className="font-semibold text-[#0E2440] dark:text-white">What we covered</h3>
      {topics.length ? (
        <ul className="mt-2 space-y-1.5">
          {topics.map((t) => (
            <li key={t} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#10446C] dark:text-[#F6C140]" aria-hidden />
              <span>
                {t} <span className="text-xs text-slate-500 dark:text-slate-400">— information only</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-slate-600 dark:text-slate-300">General questions only.</p>
      )}
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Nothing has been ordered, booked or changed in this chat. Your chat is cleared when you start again or close this tab.
      </p>
    </div>
  );
}

/* ─────────────────────────── C04 Message ──────────────────────────────── */

function Message({
  msg,
  isLatest,
  busy,
  topics,
  onAction,
  onFeedback,
  onAddressDone,
}: {
  msg: ChatMessage;
  isLatest: boolean;
  busy: boolean;
  topics: string[];
  onAction: (a: LinkoAction) => void;
  onFeedback: (id: string, v: "up" | "down") => void;
  onAddressDone: (o: "selected" | "failed" | "empty" | "notListed") => void;
}) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="sr-only">You said:</p>
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#10446C] px-4 py-2.5 text-sm leading-relaxed text-white">
          {msg.content}
        </div>
      </div>
    );
  }

  const toneStyles = {
    default: "bg-[#EEF2F8] text-slate-800 dark:bg-slate-800 dark:text-slate-100",
    notice: "border border-sky-200 bg-sky-50 text-slate-800 dark:border-sky-800 dark:bg-sky-950 dark:text-slate-100",
    error: "border border-slate-300 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
    safety:
      "border-2 border-amber-500 bg-amber-50 text-amber-950 dark:border-amber-400 dark:bg-amber-950 dark:text-amber-50",
  } as const;
  const tone = msg.tone ?? "default";
  // Safety guidance stays actionable; otherwise only the latest step shows buttons.
  const showActions = !!msg.actions?.length && (isLatest || tone === "safety");

  return (
    <div className="flex gap-2.5">
      <div className="pt-0.5">
        <LinkoMark size={28} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="sr-only">Linko said:</p>
        <div className={`rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed ${toneStyles[tone]}`}>
          {tone === "safety" && (
            <p className="mb-2 flex items-center gap-2 font-bold">
              <AlertTriangle size={18} aria-hidden /> Safety information
            </p>
          )}
          {tone === "error" && (
            <p className="mb-2 flex items-center gap-2 font-semibold text-[#0E2440] dark:text-white">
              <Info size={16} aria-hidden /> We couldn&apos;t complete that
            </p>
          )}
          {tone === "notice" && (
            <p className="mb-2 flex items-center gap-2 font-semibold text-sky-900 dark:text-sky-200">
              <Info size={16} aria-hidden /> Privacy protection
            </p>
          )}
          <MessageText content={msg.content} />
          {msg.widget === "postcode" && <AddressPicker active={isLatest} onFinished={onAddressDone} />}
          {msg.widget === "summary" && <SummaryCard topics={topics} />}
        </div>

        {showActions && <ActionGroup actions={msg.actions!} onAction={onAction} disabled={busy} />}

        {msg.source === "ai" && (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {msg.feedback ? (
              <span role="status">{COPY.feedbackThanks}</span>
            ) : (
              <>
                <span>Was this helpful?</span>
                <button
                  type="button"
                  onClick={() => onFeedback(msg.id, "up")}
                  className={`flex min-h-8 items-center gap-1 rounded-md px-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${FOCUS}`}
                >
                  <ThumbsUp size={14} aria-hidden /> Yes
                </button>
                <button
                  type="button"
                  onClick={() => onFeedback(msg.id, "down")}
                  className={`flex min-h-8 items-center gap-1 rounded-md px-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${FOCUS}`}
                >
                  <ThumbsDown size={14} aria-hidden /> No
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────── Main widget ────────────────────────────── */

export default function ChatWidget() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState<{ text: string; afterId: string } | null>(null);
  const chat = useChat(pathname);
  const { messages, isLoading } = chat;

  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const openPanel = () => {
    setOpen(true);
    track("linko_open", {
      device_class: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
      current_page_type: pathname.split("/")[1] || "home",
    });
  };
  const closePanel = useCallback(() => {
    setOpen(false);
    track("linko_close");
    // Return focus to the launcher (Doc07 C02).
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  // Focus the heading when the panel opens.
  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open]);

  // Escape closes (only while focus is inside the panel).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelRef.current?.contains(document.activeElement)) closePanel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  // Lock page scroll behind the full-screen mobile sheet.
  useEffect(() => {
    if (!open || window.innerWidth >= 768) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, isLoading, open]);

  // Announce only the newest assistant message (derived, so each reply is read once – not the whole log).
  const lastMsg = messages[messages.length - 1];
  const lastId = lastMsg?.id ?? "";
  const replyText =
    lastMsg?.role === "assistant"
      ? (lastMsg.tone === "safety" ? "Safety information. " : "Linko: ") + lastMsg.content.replace(/\*\*/g, "").slice(0, 400)
      : "";
  const liveText = isLoading ? "Linko is checking" : notice && notice.afterId === lastId ? notice.text : replyText;

  const handleAction = (a: LinkoAction) => {
    if (a.kind === "flow") {
      chat.startFlow(a.flow, a.label);
    } else if (a.kind === "ask") {
      chat.send(a.text);
    } else if (a.kind === "command") {
      if (a.command === "retry") chat.retry();
      if (a.command === "restart") chat.restart();
      if (a.command === "close") closePanel();
      if (a.command === "copySummary") {
        const text = [
          "Zoiko Broadband – Linko chat summary",
          ...chat.topics.map((t) => `• ${t} (information only)`),
          "Nothing has been ordered, booked or changed in this chat.",
          `Need help? Call ${COMPANY.phone} or visit zoikobroadband.com/get-help`,
        ].join("\n");
        navigator.clipboard?.writeText(text).then(
          () => setNotice({ text: "Summary copied to clipboard.", afterId: lastId }),
          () => setNotice({ text: "Sorry, the summary couldn't be copied.", afterId: lastId }),
        );
      }
    }
  };

  const handleAddressDone = (outcome: "selected" | "failed" | "empty" | "notListed") => {
    if (outcome === "selected") {
      chat.addAssistant({
        source: "flow",
        topic: "Checking availability",
        content:
          "Thank you. The services, speeds and prices for this exact property are confirmed in our secure availability checker — I won't show figures here until they're confirmed for the address. Checking availability doesn't create an order.",
        actions: [
          { kind: "link", label: "Continue to availability checker", href: "/check-availability", primary: true },
          { kind: "flow", label: "Use another address", flow: "availability" },
          { kind: "flow", label: "Speak to a person", flow: "handoff" },
        ],
      });
    } else if (outcome === "notListed" || outcome === "empty") {
      chat.addAssistant({
        source: "flow",
        content:
          outcome === "empty"
            ? "I couldn't find any addresses for that postcode. New builds and some properties aren't listed yet — our team can check your address manually."
            : "No problem. New builds and some properties aren't listed yet — our team can check your address manually.",
        actions: [
          { kind: "flow", label: "Speak to our team", flow: "handoff", primary: true },
          { kind: "flow", label: "Try another postcode", flow: "availability" },
        ],
      });
    } else {
      chat.addAssistant({
        source: "flow",
        tone: "error",
        content: COPY.degraded,
        actions: [
          { kind: "flow", label: "Try again", flow: "availability", primary: true },
          { kind: "link", label: "Open availability checker", href: "/check-availability" },
          { kind: "flow", label: "Speak to our team", flow: "handoff" },
        ],
      });
    }
  };

  const submit = () => {
    if (!input.trim() || isLoading) return;
    chat.send(input);
    setInput("");
    inputRef.current?.focus();
  };

  if (!ENABLED) return null;

  const atStart = messages.length <= 1;
  const remaining = 2000 - input.length;

  return (
    <>
      {open && (
        <section
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="linko-title"
          className="fixed inset-0 z-[70] flex h-[100dvh] flex-col overflow-hidden bg-white pb-[env(safe-area-inset-bottom)] text-slate-900 shadow-2xl motion-safe:animate-[linkoIn_180ms_ease-out] md:inset-auto md:bottom-6 md:right-6 md:h-[min(760px,calc(100dvh-48px))] md:max-h-[80dvh] md:min-h-[480px] md:w-[420px] md:rounded-2xl md:border md:border-slate-200 dark:bg-slate-900 dark:text-slate-100 md:dark:border-slate-700"
        >
          <style>{`@keyframes linkoIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

          {/* C03 Header */}
          <header className={`${NAVY} flex items-center gap-2 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white`}>
            {!atStart && (
              <button
                type="button"
                onClick={() => chat.startFlow("welcome")}
                aria-label="Back to start"
                title="Back to start"
                className={`flex h-11 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-white/10 ${FOCUS}`}
              >
                <ArrowLeft size={20} aria-hidden />
              </button>
            )}
            <LinkoMark size={40} />
            <div className="min-w-0 flex-1 pl-1">
              <h2
                id="linko-title"
                ref={headingRef}
                tabIndex={-1}
                className="truncate text-base font-bold leading-tight outline-none"
              >
                {ASSISTANT.name} <span className="font-normal text-white/60">|</span> Zoiko Broadband
              </h2>
              <p className="text-xs text-white/75">{ASSISTANT.label} · Public</p>
            </div>
            <button
              type="button"
              onClick={() => chat.startFlow("end")}
              className={`hidden h-11 shrink-0 rounded-lg px-2.5 text-xs font-semibold text-white/90 hover:bg-white/10 min-[360px]:block ${FOCUS}`}
            >
              End chat
            </button>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close Linko"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/10 ${FOCUS}`}
            >
              <X size={22} aria-hidden />
            </button>
          </header>

          {/* Transcript – the only scrolling region */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="off"
            aria-label="Conversation with Linko"
            className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
          >
            {atStart && (
              <h3 className="text-lg font-bold text-[#0E2440] dark:text-white">What can Linko help with?</h3>
            )}
            {messages.map((m, i) => (
              <Message
                key={m.id}
                msg={m}
                isLatest={i === messages.length - 1 && !isLoading}
                busy={isLoading}
                topics={chat.topics}
                onAction={handleAction}
                onFeedback={chat.setFeedback}
                onAddressDone={handleAddressDone}
              />
            ))}

            {/* C16 Loader */}
            {isLoading && (
              <div className="flex items-center gap-2.5">
                <LinkoMark size={28} />
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-[#EEF2F8] px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />
                  Linko is checking…
                </div>
              </div>
            )}
          </div>

          {/* Single polite live region: each reply announced once */}
          <div role="status" aria-live="polite" className="sr-only">
            {open ? liveText : ""}
          </div>

          {/* C05 Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="border-t border-slate-200 px-3 pt-3 dark:border-slate-700"
          >
            <label htmlFor="linko-input" className="sr-only">
              Message Linko
            </label>
            <div className="flex items-end gap-2 rounded-xl border border-slate-300 bg-slate-50 p-1.5 focus-within:border-[#10446C] focus-within:ring-2 focus-within:ring-[#10446C]/20 dark:border-slate-600 dark:bg-slate-800">
              <textarea
                id="linko-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    submit();
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder={COPY.composerPlaceholder}
                aria-describedby="linko-input-hint"
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-[16px] text-slate-900 outline-none placeholder:text-slate-500 md:text-sm dark:text-white dark:placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`min-h-10 shrink-0 rounded-lg px-4 text-sm font-semibold ${NAVY} text-white hover:bg-[#10446C] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#F6C140] dark:text-[#0E2440] ${FOCUS}`}
              >
                Send
              </button>
            </div>
            <p id="linko-input-hint" className="mt-1.5 flex justify-between gap-2 px-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span>{COPY.footerDisclaimer} Don&apos;t share passwords or card details.</span>
              {remaining < 200 && <span aria-live="polite">{remaining} left</span>}
            </p>
          </form>

          {/* C18 Privacy + persistent human route */}
          <nav
            aria-label="Linko help and privacy"
            className="flex flex-wrap items-center gap-x-1 px-4 pb-3 pt-1 text-xs text-slate-600 dark:text-slate-300"
          >
            <button
              type="button"
              onClick={() => chat.startFlow("privacy")}
              className={`min-h-8 rounded px-1 font-medium underline-offset-2 hover:underline ${FOCUS}`}
            >
              Privacy
            </button>
            <span aria-hidden>·</span>
            <button
              type="button"
              onClick={() => chat.startFlow("handoff")}
              className={`min-h-8 rounded px-1 font-medium text-[#10446C] underline-offset-2 hover:underline dark:text-[#F6C140] ${FOCUS}`}
            >
              Speak to our team
            </button>
            <span aria-hidden className="min-[360px]:hidden">·</span>
            <button
              type="button"
              onClick={() => chat.startFlow("end")}
              className={`min-h-8 rounded px-1 font-medium underline-offset-2 hover:underline min-[360px]:hidden ${FOCUS}`}
            >
              End chat
            </button>
          </nav>
        </section>
      )}

      {/* C01 Launcher */}
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={openPanel}
          aria-label="Open Linko AI assistant"
          className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] flex h-14 items-center gap-2.5 rounded-full ${NAVY} py-2 pl-2 pr-2 text-white shadow-lg transition hover:shadow-xl sm:pr-5 ${FOCUS}`}
        >
          <LinkoMark size={40} />
          <span className="hidden text-sm font-semibold sm:inline">{ASSISTANT.launcherLabel}</span>
        </button>
      )}
    </>
  );
}


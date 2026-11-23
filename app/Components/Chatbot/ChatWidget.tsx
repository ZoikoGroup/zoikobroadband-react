"use client";

/**
 * Linko – Zoiko Broadband AI assistant widget.
 *
 * Visual design follows Document 07 (UI/UX Design System & Detailed
 * Wireframes) as drawn:
 *  - Desktop: right-docked panel, navy header "Linko | Zoiko Broadband"
 *    on the welcome screen and "Linko / <screen title>" inside a journey
 *    (LK-WF-01…20), light message card, white bordered content rows,
 *    filled navy primary CTA + outlined secondary CTAs, composer box with
 *    an inline navy "Send", "AI may make mistakes…" note, divider and
 *    "Privacy · Talk to a person" links.
 *  - Mobile (390 px reference): full-screen sheet, "‹ Linko ×" header,
 *    "Ask Linko" heading, stacked full-width actions, full-width Send.
 *  - Fig. 3 data-constrained cards for plans and private order views.
 * Components map to C01–C20 in Doc07 §04.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Headset,
  Info,
  Loader2,
  Lock,
  ArrowLeft,
  Download,
  History,
  LayoutGrid,
  LifeBuoy,
  Minus,
  Moon,
  MoreHorizontal,
  MessageSquarePlus,
  ShieldAlert,
  Trash2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatMessage, SavedChat, readHistory, useChat } from "./useChat";
import {
  ASSISTANT,
  COMPANY,
  COPY,
  ERROR_SCREEN,
  LinkoAction,
  PLAN_CARD,
  SECURE_CARD,
  isAllowedHref,
  normalisePostcode,
  track,
} from "@/app/lib/chatbot/linko";

const ENABLED = process.env.NEXT_PUBLIC_LINKO_ENABLED !== "false";
const THEME_KEY = "linko-theme";

/* ─────────────────────────── Design tokens ───────────────────────────────
 * Sampled from the Doc07 wireframes. PENDING BRAND: replace with the signed
 * token package when supplied (Doc07 §02).                                 */
const T = {
  header: "bg-[#15213D]",
  primary: "bg-[#1B3A63] text-white hover:bg-[#15305A] linko-dark:bg-[#F6C140] linko-dark:text-[#15213D] linko-dark:hover:bg-[#f3b622]",
  secondary:
    "border border-[#B8C4D6] bg-[#F7F9FC] text-[#1E2A44] hover:border-[#1B3A63] hover:bg-white linko-dark:border-slate-600 linko-dark:bg-slate-800 linko-dark:text-slate-100 linko-dark:hover:bg-slate-700",
  card: "bg-[#EEF2F8] text-[#1E2A44] linko-dark:bg-slate-800 linko-dark:text-slate-100",
  row: "border border-[#C5CFDD] bg-white text-[#33445E] linko-dark:border-slate-600 linko-dark:bg-slate-900 linko-dark:text-slate-200",
  text: "text-[#1E2A44] linko-dark:text-slate-100",
  muted: "text-[#5B6B82] linko-dark:text-slate-400",
  link: "text-[#2B4C7E] linko-dark:text-[#F6C140]",
  focus: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A45]",
};

/* ───────────────────────── Safe text rendering ─────────────────────────
 * Only **bold**, "- " bullets and allow-listed [links](/path). No raw HTML. */

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
      if (isAllowedHref(href) && href.startsWith("/")) {
        parts.push(
          <Link key={`${keyPrefix}-${i++}`} href={href} className={`font-semibold underline underline-offset-2 ${T.link}`}>
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
        <ul key={`ul-${k}`} className="space-y-1.5">
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
        <li key={idx} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
          <span>{renderInline(bullet[1], `l${idx}`)}</span>
        </li>,
      );
      return;
    }
    flush(idx);
    if (line.trim()) out.push(<p key={idx}>{renderInline(line.replace(/^#+\s*/, ""), `l${idx}`)}</p>);
  });
  flush(lines.length);
  return <div className="space-y-2.5">{out}</div>;
}

/* ─────────────────────────── C01 Linko “O” mark ───────────────────────── */

function LinkoMark({ size = 40 }: { size?: number }) {
  // Schematic gold "O" exactly as drawn in Doc07 – placeholder for the approved stylised O (PENDING BRAND).
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      className="inline-flex shrink-0 select-none items-center justify-center rounded-full bg-[#C49A45] font-bold leading-none text-[#15213D]"
    >
      O
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
  const cls = `flex w-full items-center gap-2 rounded-lg px-4 text-left transition ${T.focus} disabled:cursor-not-allowed disabled:opacity-50 ${
    action.primary ? `min-h-12 text-[15px] font-semibold ${T.primary}` : `min-h-11 text-[14px] ${T.secondary}`
  }`;

  if (action.kind === "link") {
    const href = action.href;
    if (!isAllowedHref(href)) return null;
    const external = /^https?:/.test(href);
    const onClick = () => {
      if (href.startsWith("tel:") || href.includes("tawk.to"))
        track("linko_handoff", { handoff_type: href.startsWith("tel:") ? "phone" : "live_chat" });
      track("linko_flow_exit", { reason_code: "link" });
    };
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls} onClick={onClick}>
          {action.label}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <span className="flex-1">{action.label}</span>
        {external && (
          <>
            <ExternalLink size={14} aria-hidden className="shrink-0 opacity-70" />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={() => onAction(action)} disabled={disabled}>
      {action.label}
    </button>
  );
}

/** Primary CTA first (filled navy), then outlined secondary CTAs: 2 columns on desktop, stacked on mobile. */
function ActionGroup({
  actions,
  onAction,
  disabled,
  label = "Suggested next steps",
}: {
  actions: LinkoAction[];
  onAction: (a: LinkoAction) => void;
  disabled?: boolean;
  label?: string;
}) {
  const primary = actions.filter((a) => a.primary);
  const rest = actions.filter((a) => !a.primary);
  return (
    <div className="mt-3 space-y-3" role="group" aria-label={label}>
      {primary.map((a, i) => (
        <ActionButton key={`p${i}`} action={a} onAction={onAction} disabled={disabled} />
      ))}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
      <p className={`mt-3 text-xs ${T.muted}`}>
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
        className="mt-4 space-y-3"
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
          <legend className={`mb-2 text-sm font-semibold ${T.text}`}>Please choose the full address for {postcode}</legend>
          <div
            className="max-h-56 space-y-2 overflow-y-auto"
            aria-describedby={state.error ? `${uid}-err` : undefined}
          >
            {state.addresses.map((a) => (
              <label
                key={a.id}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-sm ${
                  state.selected === a.id
                    ? "border-2 border-[#1B3A63] bg-white font-semibold text-[#1E2A44] linko-dark:border-[#F6C140] linko-dark:bg-slate-900 linko-dark:text-white"
                    : T.row
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-addr`}
                  value={a.id}
                  checked={state.selected === a.id}
                  onChange={() => setState({ ...state, selected: a.id, error: undefined })}
                  className="h-4 w-4 accent-[#1B3A63]"
                />
                {a.display}
                {state.selected === a.id && <span className="sr-only">(selected)</span>}
              </label>
            ))}
          </div>
        </fieldset>
        {state.error && (
          <p id={`${uid}-err`} className="text-sm text-red-700 linko-dark:text-red-300">
            {state.error}
          </p>
        )}
        <button type="submit" className={`flex min-h-12 w-full items-center rounded-lg px-4 text-[15px] font-semibold ${T.primary} ${T.focus}`}>
          Check this address
        </button>
        <button
          type="button"
          className={`flex min-h-11 w-full items-center rounded-lg px-4 text-[14px] ${T.secondary} ${T.focus}`}
          onClick={() => {
            setState({ step: "done", ok: false });
            onFinished("notListed");
          }}
        >
          Address not listed
        </button>
      </form>
    );
  }

  const error = state.step === "postcode" ? state.error : undefined;
  return (
    <form onSubmit={find} className="mt-4 space-y-2" noValidate>
      <label htmlFor={`${uid}-pc`} className={`block text-sm font-semibold ${T.text}`}>
        Postcode
      </label>
      <p id={`${uid}-hint`} className={`text-xs ${T.muted}`}>
        For example, SW1A 1AA
      </p>
      <input
        ref={inputRef}
        id={`${uid}-pc`}
        value={postcode}
        onChange={(e) => setPostcode(e.target.value.toUpperCase())}
        autoComplete="postal-code"
        placeholder="Enter postcode"
        maxLength={8}
        aria-invalid={!!error}
        aria-describedby={`${uid}-hint${error ? ` ${uid}-err` : ""}`}
        className={`min-h-12 w-full rounded-lg border bg-[#F7F9FC] px-4 text-[16px] uppercase text-[#1E2A44] placeholder:normal-case placeholder:text-[#8A97AB] linko-dark:bg-slate-900 linko-dark:text-white ${
          error ? "border-red-600" : "border-[#B8C4D6] linko-dark:border-slate-600"
        } ${T.focus}`}
      />
      {error && (
        <p id={`${uid}-err`} role="alert" className="text-sm text-red-700 linko-dark:text-red-300">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state.step === "loading"}
        className={`flex min-h-12 w-full items-center gap-2 rounded-lg px-4 text-[15px] font-semibold ${T.primary} ${T.focus} disabled:opacity-60`}
      >
        {state.step === "loading" && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />}
        {state.step === "loading" ? "Finding addresses…" : "Find my address"}
      </button>
      {state.step === "loading" && (
        <p role="status" className="sr-only">
          Finding addresses
        </p>
      )}
    </form>
  );
}

/* ─────────────── Doc07 fig. 3 data-constrained cards (C09 / C13) ─────────── */

function DetailRows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <dl className="divide-y divide-[#E1E7F0] linko-dark:divide-slate-700">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-3 py-3 text-sm">
          <dt className={T.muted}>{k}</dt>
          <dd className={`font-semibold ${T.text}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function PlanCard() {
  return (
    <article className={`mt-4 rounded-xl p-4 ${T.row}`} aria-label={PLAN_CARD.title}>
      <h3 className={`text-[15px] font-bold ${T.text}`}>{PLAN_CARD.title}</h3>
      <p className={`mt-0.5 text-xs ${T.muted}`}>{PLAN_CARD.note}</p>
      <div className="mt-3 rounded-lg bg-[#EEF2F8] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#2B4C7E] linko-dark:bg-slate-800 linko-dark:text-slate-200">
        Plan name from live catalogue
      </div>
      <DetailRows rows={PLAN_CARD.rows} />
    </article>
  );
}

function SecureCard() {
  return (
    <article className={`mt-4 rounded-xl p-4 ${T.row}`} aria-label={SECURE_CARD.title}>
      <h3 className={`text-[15px] font-bold ${T.text}`}>{SECURE_CARD.title}</h3>
      <p className="mt-3 flex items-start gap-2 rounded-lg border border-[#D9B56A] bg-[#F8EEDD] px-4 py-3 text-sm text-[#6B4E16] linko-dark:border-amber-500 linko-dark:bg-amber-950 linko-dark:text-amber-100">
        <Lock size={16} aria-hidden className="mt-0.5 shrink-0" /> {SECURE_CARD.banner}
      </p>
      <DetailRows rows={SECURE_CARD.rows} />
      <p className={`mt-1 text-xs ${T.muted}`}>{SECURE_CARD.footnote}</p>
    </article>
  );
}

/* ────────────────────────── C20 Summary card ──────────────────────────── */

function SummaryCard({ topics }: { topics: string[] }) {
  return (
    <article className={`mt-4 rounded-xl p-4 text-sm ${T.row}`} aria-label="Conversation summary">
      <h3 className={`text-[15px] font-bold ${T.text}`}>Short summary</h3>
      {topics.length ? (
        <ul className="mt-2 space-y-2">
          {topics.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1B3A63] linko-dark:text-[#F6C140]" aria-hidden />
              <span>
                {t} <span className={`text-xs ${T.muted}`}>· information only</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">General questions only.</p>
      )}
      <p className={`mt-3 border-t border-[#E1E7F0] pt-3 text-xs linko-dark:border-slate-700 ${T.muted}`}>
        <strong>Completed:</strong> nothing has been ordered, booked or changed in this chat. <strong>Pending:</strong> any next step
        happens on our secure pages or with our team.
      </p>
    </article>
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
        <div className="max-w-[85%] whitespace-pre-wrap rounded-xl bg-[#1B3A63] px-4 py-3 text-[15px] leading-relaxed text-white">
          {msg.content}
        </div>
      </div>
    );
  }

  const tone = msg.tone ?? "default";
  const toneStyles = {
    default: T.card,
    notice: "border border-sky-200 bg-sky-50 text-[#1E2A44] linko-dark:border-sky-800 linko-dark:bg-sky-950 linko-dark:text-slate-100",
    error: `${T.row}`,
    safety: "border-2 border-[#C9861A] bg-[#FFF6E5] text-[#4A3208] linko-dark:border-amber-400 linko-dark:bg-amber-950 linko-dark:text-amber-50",
  } as const;
  // Safety guidance stays actionable; otherwise only the latest step shows buttons.
  const showActions = !!msg.actions?.length && (isLatest || tone === "safety");

  return (
    <div>
      <p className="sr-only">Linko said:</p>
      <div className={`rounded-xl px-5 py-4 text-[15px] leading-relaxed ${toneStyles[tone]}`}>
        {tone === "safety" && (
          <p className="mb-2 flex items-center gap-2 font-bold">
            <AlertTriangle size={18} aria-hidden /> Safety information
          </p>
        )}
        {tone === "error" && (
          <p className={`mb-2 flex items-center gap-2 font-semibold ${T.text}`}>
            <Info size={16} aria-hidden /> We couldn&apos;t complete that
          </p>
        )}
        {tone === "notice" && (
          <p className="mb-2 flex items-center gap-2 font-semibold text-sky-900 linko-dark:text-sky-200">
            <Info size={16} aria-hidden /> Privacy protection
          </p>
        )}
        <MessageText content={msg.content} />
        {msg.widget === "postcode" && <AddressPicker active={isLatest} onFinished={onAddressDone} />}
      </div>

      {msg.widget === "planCard" && <PlanCard />}
      {msg.widget === "secureCard" && <SecureCard />}
      {msg.widget === "summary" && <SummaryCard topics={topics} />}

      {showActions && <ActionGroup actions={msg.actions!} onAction={onAction} disabled={busy} />}

      {msg.source === "ai" && (
        <div className={`mt-2 flex items-center gap-2 text-xs ${T.muted}`}>
          {msg.feedback ? (
            <span role="status">{COPY.feedbackThanks}</span>
          ) : (
            <>
              <span>Was this helpful?</span>
              <button
                type="button"
                onClick={() => onFeedback(msg.id, "up")}
                className={`flex min-h-8 items-center gap-1 rounded-md px-2 hover:bg-[#EEF2F8] linko-dark:hover:bg-slate-800 ${T.focus}`}
              >
                <ThumbsUp size={14} aria-hidden /> Useful
              </button>
              <button
                type="button"
                onClick={() => onFeedback(msg.id, "down")}
                className={`flex min-h-8 items-center gap-1 rounded-md px-2 hover:bg-[#EEF2F8] linko-dark:hover:bg-slate-800 ${T.focus}`}
              >
                <ThumbsDown size={14} aria-hidden /> Not useful
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────────────── LK-WF-01 welcome (desktop + mobile) ──────────────── */

function Welcome({
  msg,
  isLatest,
  onAction,
}: {
  msg: ChatMessage;
  isLatest: boolean;
  onAction: (a: LinkoAction) => void;
}) {
  return (
    <div>
      {/* Mobile reference shows an "Ask Linko" heading above the welcome card. */}
      <h3 className={`mb-4 text-[22px] font-bold md:hidden ${T.text}`}>Ask Linko</h3>
      <p className="sr-only">Linko said:</p>
      <div className={`rounded-xl px-5 py-4 ${T.card}`}>
        <p className="text-[16px] leading-relaxed">{msg.content}</p>
        <p className={`mt-1 text-[13px] ${T.muted}`}>{COPY.welcomeHint}</p>
      </div>
      {isLatest && msg.actions && (
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2" role="group" aria-label="Choose a topic">
          {msg.actions.map((a, i) => (
            <ActionButton key={i} action={a} onAction={onAction} />
          ))}
        </div>
      )}
      {isLatest && <p className={`mt-5 text-[13px] ${T.muted}`}>{COPY.welcomeHuman}</p>}
    </div>
  );
}

/* ─────────────────────────── Header menu (•••) ──────────────────────────
 * WAI-ARIA menu button: Enter/Space/↓ opens, ↑/↓/Home/End move, Esc closes
 * the menu (not the chat) and returns focus to the button.               */

type MenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
  onSelect: () => void;
  hidden?: boolean;
  disabled?: boolean;
  /** Draw a divider above this item. */
  separatorBefore?: boolean;
  /** For on/off items such as Dark mode (menuitemcheckbox). */
  checked?: boolean;
};

const MENU_ITEM_SELECTOR = '[role="menuitem"],[role="menuitemcheckbox"]';

function HeaderMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const visible = items.filter((i) => !i.hidden);

  const focusItem = (index: number) => {
    const els = menuRef.current?.querySelectorAll<HTMLButtonElement>(MENU_ITEM_SELECTOR);
    if (!els?.length) return;
    els[(index + els.length) % els.length].focus();
  };

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) setTimeout(() => btnRef.current?.focus(), 0);
  };

  // Focus the first item when the menu opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => focusItem(0), 0);
    return () => clearTimeout(t);
  }, [open]);

  // Click outside closes.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div className="relative shrink-0">
      <button
        ref={btnRef}
        type="button"
        aria-label="Linko menu"
        title="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="linko-menu"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex h-11 w-10 items-center justify-center rounded-md hover:bg-white/10 ${open ? "bg-white/10" : ""} ${T.focus}`}
      >
        <MoreHorizontal size={20} aria-hidden />
      </button>
      {open && (
        <div
          ref={menuRef}
          id="linko-menu"
          role="menu"
          aria-label="Linko menu"
          onKeyDown={(e) => {
            const els = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>(MENU_ITEM_SELECTOR) ?? []);
            const i = els.indexOf(document.activeElement as HTMLButtonElement);
            if (e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation(); // close the menu, not the whole chat
              close();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              focusItem(i + 1);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              focusItem(i - 1);
            } else if (e.key === "Home") {
              e.preventDefault();
              focusItem(0);
            } else if (e.key === "End") {
              e.preventDefault();
              focusItem(els.length - 1);
            } else if (e.key === "Tab") {
              close(false);
            }
          }}
          className="absolute right-0 top-full z-20 mt-1 w-64 overflow-hidden rounded-xl border border-[#D5DCE6] bg-white py-1.5 text-[#1E2A44] shadow-[0_12px_32px_rgba(21,33,61,0.22)] motion-safe:animate-[linkoIn_120ms_ease-out] linko-dark:border-slate-600 linko-dark:bg-slate-800 linko-dark:text-slate-100"
        >
          {visible.map((item) => (
            <div key={item.id}>
              {item.separatorBefore && <div role="separator" className="my-1.5 border-t border-[#E1E7F0] linko-dark:border-slate-700" />}
              <button
                type="button"
                role={item.checked === undefined ? "menuitem" : "menuitemcheckbox"}
                aria-checked={item.checked}
                aria-disabled={item.disabled || undefined}
                tabIndex={-1}
                onClick={() => {
                  if (item.disabled) return;
                  close();
                  item.onSelect();
                }}
                className={`flex min-h-11 w-full items-center gap-3 px-4 text-left text-[14px] focus:outline-none ${
                  item.disabled
                    ? "cursor-not-allowed text-[#9AA6B8] linko-dark:text-slate-500"
                    : "hover:bg-[#EEF2F8] focus:bg-[#EEF2F8] linko-dark:hover:bg-slate-700 linko-dark:focus:bg-slate-700"
                }`}
              >
                <span aria-hidden className={item.disabled ? "" : "text-[#1E2A44] linko-dark:text-slate-200"}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.checked !== undefined && (
                  <span
                    aria-hidden
                    className={`relative h-5 w-9 shrink-0 rounded-full transition ${item.checked ? "bg-[#1B3A63] linko-dark:bg-[#F6C140]" : "bg-[#C5CFDD] linko-dark:bg-slate-600"}`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${item.checked ? "left-[18px]" : "left-0.5"}`}
                    />
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Chat history view ────────────────────────── */

function formatSavedDate(ts: number) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
    }).format(new Date(ts));
  } catch {
    return "";
  }
}

function HistoryView({
  currentId,
  onBack,
  onNew,
  onOpen,
  onDelete,
}: {
  currentId: string;
  onBack: () => void;
  onNew: () => void;
  onOpen: (c: SavedChat) => void;
  onDelete: (id?: string) => SavedChat[];
}) {
  const [items, setItems] = useState<SavedChat[]>(() => readHistory());
  const [confirmClear, setConfirmClear] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const count = (c: SavedChat) => c.messages.filter((m) => m.role === "user").length;

  return (
    <div className="flex min-h-full flex-col">
      <button
        type="button"
        onClick={onBack}
        className={`inline-flex w-fit items-center gap-1.5 rounded-md text-[15px] font-semibold ${T.link} ${T.focus}`}
      >
        <ArrowLeft size={18} aria-hidden /> Back to chat
      </button>

      <h3 ref={headingRef} tabIndex={-1} className={`mt-6 text-[12px] font-bold uppercase tracking-[0.12em] outline-none ${T.muted}`}>
        Chat history
      </h3>

      <button
        type="button"
        onClick={onNew}
        className={`mt-3 flex min-h-12 w-full items-center gap-2.5 rounded-xl border border-dashed border-[#7F9CC6] px-4 text-[15px] font-semibold hover:bg-[#EEF2F8] linko-dark:border-slate-500 linko-dark:hover:bg-slate-800 ${T.link} ${T.focus}`}
      >
        <MessageSquarePlus size={18} aria-hidden /> Start a new chat
      </button>

      {items.length === 0 ? (
        <p className={`mt-8 text-center text-[15px] ${T.muted}`}>No saved chats in this browser yet.</p>
      ) : (
        <>
          <ul className="mt-4 space-y-2" aria-label="Saved chats">
            {items.map((c) => (
              <li key={c.id} className={`flex items-stretch overflow-hidden rounded-xl ${T.row}`}>
                <button
                  type="button"
                  onClick={() => onOpen(c)}
                  className={`min-w-0 flex-1 px-4 py-3 text-left hover:bg-[#F7F9FC] linko-dark:hover:bg-slate-800 ${T.focus}`}
                >
                  <span className={`block truncate text-[14px] font-semibold ${T.text}`}>{c.title}</span>
                  <span className={`mt-0.5 block text-[12px] ${T.muted}`}>
                    {formatSavedDate(c.updatedAt)} · {count(c)} message{count(c) === 1 ? "" : "s"}
                    {c.id === currentId ? " · Open now" : ""}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setItems(onDelete(c.id))}
                  aria-label={`Delete chat: ${c.title}`}
                  title="Delete chat"
                  className={`flex w-12 shrink-0 items-center justify-center border-l border-[#E1E7F0] text-[#5B6B82] hover:bg-red-50 hover:text-red-700 linko-dark:border-slate-700 linko-dark:text-slate-400 linko-dark:hover:bg-red-950 linko-dark:hover:text-red-300 ${T.focus}`}
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {confirmClear ? (
              <div className={`rounded-xl p-3 text-[13px] ${T.row}`} role="group" aria-label="Clear all saved chats">
                <p className={T.text}>Delete all saved chats from this browser? This can&apos;t be undone.</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setItems(onDelete());
                      setConfirmClear(false);
                    }}
                    className={`min-h-10 rounded-lg bg-red-700 px-3 font-semibold text-white hover:bg-red-800 ${T.focus}`}
                  >
                    Delete all
                  </button>
                  <button type="button" onClick={() => setConfirmClear(false)} className={`min-h-10 rounded-lg px-3 ${T.secondary} ${T.focus}`}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className={`min-h-9 rounded text-[13px] font-medium text-red-700 hover:underline linko-dark:text-red-300 ${T.focus}`}
              >
                Clear all history
              </button>
            )}
          </div>
        </>
      )}

      <p className={`mt-auto pt-8 text-center text-[12px] leading-relaxed ${T.muted}`}>
        Chats are saved in this browser on this device until you clear them. They aren&apos;t stored by Zoiko Broadband.
      </p>
    </div>
  );
}

/** Plain-text transcript (already redacted) for "Download transcript". */
function downloadTranscript(messages: ChatMessage[]) {
  const lines = [
    "Zoiko Broadband – Linko AI assistant transcript",
    `Saved: ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" }).format(new Date())}`,
    "Linko is an AI assistant. Nothing in this chat places an order or changes your account.",
    "",
  ];
  for (const m of messages) {
    if (m.role === "assistant" && m.content === COPY.welcome) continue;
    lines.push(`${m.role === "user" ? "You" : "Linko"}: ${m.content.replace(/\*\*/g, "")}`, "");
  }
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `linko-chat-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ───────────────────────────── Main widget ────────────────────────────── */

export default function ChatWidget() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState<{ text: string; afterId: string } | null>(null);
  const [view, setView] = useState<"chat" | "history">("chat");
  // Linko-only dark mode (remembered in this browser; defaults to the device setting).
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === "dark";
    } catch {
      // ignore
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const router = useRouter();
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

  // On open: focus moves to the chat heading.
  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open]);

  // Escape closes (only while focus is inside the panel).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      // Escape inside the ⋮ menu closes only the menu.
      if ((e.target as Element | null)?.closest?.('[role="menu"]')) return;
      if (panelRef.current?.contains(document.activeElement)) closePanel();
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

  // Current LK-WF screen title for the header: the latest guided step (AI answers keep the journey title).
  let screen: string | null = null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "assistant") continue;
    if (m.tone === "error") {
      screen = ERROR_SCREEN;
      break;
    }
    if (m.screen) {
      screen = m.screen;
      break;
    }
    if (m.content === COPY.welcome) break;
  }

  // Announce only the newest assistant message (derived – each reply is read once, not the whole log).
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
        screen: "Postcode and exact-address eligibility",
        topic: "Checking availability",
        content:
          "Thank you. The services, speeds and prices for this exact property are confirmed in our secure availability checker — I won't show figures here until they're confirmed for the address. Checking availability doesn't create an order.",
        actions: [
          { kind: "link", label: "Check availability", href: "/check-availability", primary: true },
          { kind: "flow", label: "Use another address", flow: "availability" },
          { kind: "flow", label: "Ask for help", flow: "handoff" },
        ],
      });
    } else if (outcome === "notListed" || outcome === "empty") {
      chat.addAssistant({
        source: "flow",
        screen: "Postcode and exact-address eligibility",
        content:
          outcome === "empty"
            ? "I couldn't find any addresses for that postcode. New builds and some properties aren't listed yet — our team can check your address manually."
            : "No problem. New builds and some properties aren't listed yet — our team can check your address manually.",
        actions: [
          { kind: "flow", label: "Ask for help", flow: "handoff", primary: true },
          { kind: "flow", label: "Use another address", flow: "availability" },
        ],
      });
    } else {
      chat.addAssistant({
        source: "flow",
        tone: "error",
        content: COPY.degraded,
        actions: [
          { kind: "flow", label: "Try again", flow: "availability", primary: true },
          { kind: "link", label: "Save my enquiry", href: "/contact-us" },
          { kind: "flow", label: "Speak to support", flow: "handoff" },
          { kind: "flow", label: "Return to start", flow: "welcome" },
        ],
      });
    }
  };

  const submit = () => {
    if (!input.trim() || isLoading) return;
    setView("chat");
    chat.send(input);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleDark = () => {
    setDarkMode((d) => {
      const next = !d;
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {
        // ignore
      }
      setNotice({ text: next ? "Dark mode on." : "Dark mode off.", afterId: lastId });
      return next;
    });
  };

  const startNewChat = () => {
    chat.restart();
    setView("chat");
    setNotice({ text: "New chat started.", afterId: "welcome" });
    setTimeout(() => inputRef.current?.focus(), 0); // after the menu returns focus
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
          style={{ colorScheme: darkMode ? "dark" : "light" }}
          className={`${darkMode ? "linko-dark " : ""}fixed inset-0 z-[70] flex h-[100dvh] flex-col overflow-hidden bg-white pb-[env(safe-area-inset-bottom)] text-[#1E2A44] shadow-[0_12px_40px_rgba(21,33,61,0.18)] motion-safe:animate-[linkoIn_180ms_ease-out] md:inset-auto md:bottom-6 md:right-6 md:h-[min(780px,80dvh)] md:min-h-[480px] md:w-[432px] md:rounded-2xl md:border-2 md:border-[#B8C4D6] linko-dark:bg-slate-900 linko-dark:text-slate-100 md:linko-dark:border-slate-700`}
        >
          <style>{`@keyframes linkoIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

          {/* C03 Header */}
          <header className={`${T.header} flex min-h-[68px] items-center gap-2 px-3 pt-[env(safe-area-inset-top)] text-white md:min-h-[76px] md:rounded-t-[14px] md:px-5`}>
            {/* Mobile: "‹ Linko" back control (Doc07 mobile reference). */}
            <button
              type="button"
              onClick={() => (atStart ? closePanel() : chat.startFlow("welcome"))}
              aria-label={atStart ? "Close Linko" : "Back to start"}
              className={`flex h-11 w-8 shrink-0 items-center justify-center rounded-md hover:bg-white/10 md:hidden ${T.focus}`}
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <span className="hidden md:inline-flex">
              <LinkoMark size={40} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="linko-title" ref={headingRef} tabIndex={-1} className="text-[17px] font-bold leading-snug outline-none">
                <span className="md:hidden">{ASSISTANT.name}</span>
                <span className="hidden md:inline">
                  {view === "history" ? (
                    <>
                      {ASSISTANT.name} <span className="font-normal text-white/70">/</span>{" "}
                      <span className="text-[15px]">Chat history</span>
                    </>
                  ) : screen ? (
                    <>
                      {ASSISTANT.name} <span className="font-normal text-white/70">/</span>{" "}
                      <span className="line-clamp-2 inline text-[15px]">{screen}</span>
                    </>
                  ) : (
                    <>
                      {ASSISTANT.name} <span className="font-normal text-white/70">|</span> Zoiko Broadband
                    </>
                  )}
                </span>
              </h2>
              <p className="text-[12px] text-white/75 md:text-[13px]">{ASSISTANT.label} · Public</p>
            </div>
            <HeaderMenu
              items={[
                { id: "new", label: "Start a new chat", icon: <MessageSquarePlus size={18} />, onSelect: startNewChat },
                {
                  id: "topics",
                  label: "Browse topics",
                  icon: <LayoutGrid size={18} />,
                  onSelect: () => {
                    setView("chat");
                    chat.startFlow("clarify");
                  },
                },
                { id: "history", label: "Chat history", icon: <History size={18} />, onSelect: () => setView("history") },
                {
                  id: "download",
                  label: "Download transcript",
                  icon: <Download size={18} />,
                  disabled: atStart,
                  onSelect: () => {
                    downloadTranscript(messages);
                    setNotice({ text: "Transcript downloaded.", afterId: lastId });
                  },
                },
                { id: "dark", label: "Dark mode", icon: <Moon size={18} />, checked: darkMode, onSelect: toggleDark },
                {
                  id: "help",
                  label: "Help Center",
                  icon: <LifeBuoy size={18} />,
                  separatorBefore: true,
                  onSelect: () => router.push("/get-help"),
                },
                {
                  id: "support",
                  label: "Contact support",
                  icon: <Headset size={18} />,
                  onSelect: () => {
                    setView("chat");
                    chat.startFlow("handoff");
                  },
                },
              ]}
            />
            <button
              type="button"
              onClick={closePanel}
              aria-label="Minimise Linko"
              title="Minimise (your chat is kept)"
              className={`hidden h-11 w-10 shrink-0 items-center justify-center rounded-md hover:bg-white/10 min-[360px]:flex ${T.focus}`}
            >
              <Minus size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close Linko"
              title="Close"
              className={`flex h-11 w-10 shrink-0 items-center justify-center rounded-md hover:bg-white/10 ${T.focus}`}
            >
              <X size={20} aria-hidden />
            </button>
          </header>

          {/* Transcript – the only primary scroll region */}
          {view === "history" && (
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-6">
              <HistoryView
                currentId={chat.conversationId()}
                onBack={() => setView("chat")}
                onNew={startNewChat}
                onOpen={(c) => {
                  chat.openChat(c);
                  setView("chat");
                  setNotice({ text: `Opened chat: ${c.title}`, afterId: c.messages[c.messages.length - 1]?.id ?? "" });
                }}
                onDelete={(id) => {
                  const rest = chat.deleteSaved(id);
                  setNotice({ text: id ? "Chat deleted." : "All saved chats deleted.", afterId: "welcome" });
                  return rest;
                }}
              />
            </div>
          )}
          <div
            ref={scrollRef}
            role="log"
            aria-live="off"
            aria-label="Conversation with Linko"
            hidden={view === "history"}
            className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 md:px-6"
          >
            {/* Desktop-only visible back control inside a journey */}
            {!atStart && (
              <button
                type="button"
                onClick={() => chat.startFlow("welcome")}
                className={`hidden items-center gap-1 rounded-md text-xs font-medium md:inline-flex ${T.link} ${T.focus}`}
              >
                <ChevronLeft size={14} aria-hidden /> Back to start
              </button>
            )}

            {messages.map((m, i) => {
              const isLatest = i === messages.length - 1 && !isLoading;
              if (m.role === "assistant" && m.content === COPY.welcome) {
                return <Welcome key={m.id} msg={m} isLatest={isLatest} onAction={handleAction} />;
              }
              return (
                <Message
                  key={m.id}
                  msg={m}
                  isLatest={isLatest}
                  busy={isLoading}
                  topics={chat.topics}
                  onAction={handleAction}
                  onFeedback={chat.setFeedback}
                  onAddressDone={handleAddressDone}
                />
              );
            })}

            {/* C16 Loader */}
            {isLoading && (
              <div className={`flex items-center gap-2 rounded-xl px-5 py-4 text-[15px] ${T.card}`}>
                <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />
                Linko is checking…
              </div>
            )}
          </div>

          {/* One polite live region: each reply announced once */}
          <div role="status" aria-live="polite" className="sr-only">
            {open ? liveText : ""}
          </div>

          {/* C05 Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="px-5 pt-3 md:px-6"
          >
            <label htmlFor="linko-input" className="sr-only">
              Message Linko
            </label>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-2 md:rounded-xl md:border md:border-[#B8C4D6] md:bg-[#F7F9FC] md:p-2 md:pl-3 linko-dark:md:border-slate-600 linko-dark:md:bg-slate-800">
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
                className={`max-h-32 min-h-12 w-full flex-1 resize-none rounded-lg border border-[#B8C4D6] bg-white px-4 py-3 text-[16px] text-[#1E2A44] placeholder:text-[#8A97AB] md:min-h-10 md:rounded-none md:border-0 md:bg-transparent md:px-1 md:py-2 md:text-[15px] md:outline-none linko-dark:border-slate-600 linko-dark:bg-slate-900 linko-dark:text-white md:linko-dark:bg-transparent ${T.focus} md:focus-visible:outline-none`}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`min-h-12 w-full shrink-0 rounded-lg px-6 text-[15px] font-bold text-white ${T.header} hover:bg-[#1B3A63] disabled:cursor-not-allowed disabled:opacity-40 md:min-h-11 md:w-auto linko-dark:bg-[#F6C140] linko-dark:text-[#15213D] ${T.focus}`}
              >
                Send
              </button>
            </div>
            <p id="linko-input-hint" className={`mt-2 flex justify-between gap-2 text-[12px] ${T.muted}`}>
              <span>{COPY.footerDisclaimer}</span>
              {remaining < 200 && <span aria-live="polite">{remaining} characters left</span>}
            </p>
          </form>

          {/* C18 Privacy links + persistent human route */}
          <nav
            aria-label="Linko privacy and human help"
            className="mx-5 mt-3 flex flex-wrap items-center gap-x-1.5 border-t border-[#D5DCE6] pb-3 pt-2 text-[13px] md:mx-6 linko-dark:border-slate-700"
          >
            <button
              type="button"
              onClick={() => {
                setView("chat");
                chat.startFlow("safety");
              }}
              className={`order-last ml-auto inline-flex min-h-9 items-center gap-1.5 rounded px-0.5 font-semibold text-[#B42318] hover:underline linko-dark:text-red-300 ${T.focus}`}
            >
              <ShieldAlert size={16} aria-hidden /> I need safety help
            </button>
            <button type="button" onClick={() => { setView("chat"); chat.startFlow("privacy"); }} className={`min-h-9 rounded px-0.5 hover:underline ${T.link} ${T.focus}`}>
              Privacy
            </button>
            <span aria-hidden className={T.muted}>
              ·
            </span>
            <button type="button" onClick={() => { setView("chat"); chat.startFlow("handoff"); }} className={`min-h-9 rounded px-0.5 hover:underline ${T.link} ${T.focus}`}>
              Talk to a person
            </button>
            {!atStart && (
              <>
                <span aria-hidden className={T.muted}>
                  ·
                </span>
                <button type="button" onClick={() => { setView("chat"); chat.startFlow("end"); }} className={`min-h-9 rounded px-0.5 hover:underline ${T.link} ${T.focus}`}>
                  End chat
                </button>
              </>
            )}
          </nav>
        </section>
      )}

      {/* C01 Launcher – persistent O at the safe bottom corner */}
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={openPanel}
          aria-label="Open Linko AI assistant"
          className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] flex h-[60px] items-center gap-3 rounded-full ${T.header} p-2.5 text-white shadow-[0_8px_24px_rgba(21,33,61,0.3)] transition hover:bg-[#1B3A63] sm:pr-6 ${T.focus}`}
        >
          <LinkoMark size={40} />
          <span className="hidden text-[15px] font-semibold sm:inline">{ASSISTANT.launcherLabel}</span>
        </button>
      )}
    </>
  );
}

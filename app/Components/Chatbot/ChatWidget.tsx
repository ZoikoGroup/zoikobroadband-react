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
  ClipboardCopy,
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
import { ChatMessage, HISTORY_TTL_DAYS, SavedChat, readHistory, useChat } from "./useChat";
import { FEEDBACK_REASONS, linkoApi, newKey, toActions, TriageData, type AnswerSource, type FeedbackReason } from "./linkoApi";
import {
  AddressContext,
  ApiCall,
  ASSISTANT,
  COMPANY,
  COPY,
  ERROR_SCREEN,
  LinkoAction,
  PLAN_CARD,
  SECURE_CARD,
  isAllowedHref,
  normalisePostcode,
  redactSensitive,
  track,
  type ResultCardData,
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

  const rid = useId();
  // Doc07: a CTA whose backend isn't verified is shown disabled and explains why.
  if (action.disabledReason) {
    return (
      <div>
        <button type="button" className={cls} disabled aria-describedby={rid}>
          {action.label}
        </button>
        <p id={rid} className={`mt-1 px-1 text-[14px] ${T.muted}`}>
          {action.disabledReason}
        </p>
      </div>
    );
  }

  if (action.kind === "link") {
    const href = action.href;
    if (!isAllowedHref(href)) return null;
    const external = /^https?:/.test(href);
    const onClick = () => {
      if (href.startsWith("tel:") || href.includes("tawk.to"))
        track("linko_handoff", { handoff_type: href.startsWith("tel:") ? "phone" : "live_chat" });
      else if (href === "/get-help") track("linko_handoff", { handoff_type: "callback" });
      else if (href === "/contact-us") track("linko_handoff", { handoff_type: "enquiry" });
      // Doc01 LK-WF-11/14/18 journey events (labels only — no personal data).
      if (href === "/report-a-fault") track("linko_fault_handoff", { route: "report_page" });
      if (/^(?:Request data help|Request my data)$/i.test(action.label)) track("linko_dsr_redirect");
      if (/cancellation/i.test(action.label)) track("linko_cancellation_help", { route: "terms" });
      track("linko_flow_exit", { reason_code: "link" });
    };
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls} onClick={onClick}>
          {action.label}
          {/* Doc11 AU-WF-11-01: announce that a secure page is opening */}
          {href === "/login" && <span className="sr-only"> – opens Zoiko&apos;s secure sign-in page</span>}
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

/* ───────────────────────── C08 Postcode + address ────────────────────────
 * Doc01 LK-WF-03 / CF-01: postcode → address list (PUB-03) → mandatory
 * selection → exact-premises qualification (PUB-04). Never auto-selects
 * and never infers availability from the postcode alone.               */

type Address = { addressId: string; label: string };
type PickerState =
  | { step: "postcode"; error?: string }
  | { step: "loading" }
  | { step: "results"; addresses: Address[]; selected?: string; error?: string; checking?: boolean }
  | { step: "done"; ok: boolean };

export type AddressOutcome =
  | { kind: "qualified"; label: string; technologies: string[]; message: string; checkedAt?: string; expiresAt?: string; source?: string }
  | { kind: "unverified"; label: string } // address chosen, but exact-premises check unavailable
  | { kind: "failed" }
  | { kind: "expired" } // the selection token expired (AVL-03)
  | { kind: "empty" }
  | { kind: "notListed" };

function AddressPicker({
  active,
  context,
  onFinished,
  getServerId,
}: {
  active: boolean;
  context: AddressContext;
  onFinished: (o: AddressOutcome, ctx: AddressContext) => void;
  getServerId: () => Promise<string | null>;
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

  const finish = (o: AddressOutcome, ok: boolean) => {
    setState({ step: "done", ok });
    onFinished(o, context);
  };

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
    track("linko_intent_selected", { intent_id: "postcode_validated" });
    const sid = await getServerId();
    if (!sid) {
      finish({ kind: "failed" }, false);
      return;
    }
    const r = await linkoApi.searchAddresses(sid, pc); // PUB-03 (tokens are bound to this conversation)
    if (!r.ok) {
      if (r.http === 400) {
        setState({ step: "postcode", error: r.body?.message ?? "Enter a full UK postcode, for example SW1A 1AA." });
        return;
      }
      track("linko_error", { error_class: "address_lookup", component_id: "C08" });
      finish({ kind: "failed" }, false);
      return;
    }
    if (!r.body.data.matches.length) {
      finish({ kind: "empty" }, false);
      return;
    }
    setState({ step: "results", addresses: r.body.data.matches });
  };

  if (state.step === "results") {
    const choose = async (e: FormEvent) => {
      e.preventDefault();
      if (!state.selected) {
        setState({ ...state, error: "Please choose the full address, or select “Try another postcode”." });
        return;
      }
      const chosen = state.addresses.find((a) => a.addressId === state.selected)!;
      setState({ ...state, checking: true, error: undefined });
      track("linko_intent_selected", { intent_id: "address_selected" });
      const sid = await getServerId();
      const q = sid
        ? await linkoApi.qualify(sid, chosen.addressId, context === "business" ? "BUSINESS" : "RESIDENTIAL") // PUB-04
        : null;
      if (q && !q.ok && q.http === 404) {
        finish({ kind: "expired" }, false);
        return;
      }
      if (q?.ok) {
        finish(
          {
            kind: "qualified",
            label: chosen.label,
            technologies: q.body.data.technologies,
            message: q.body.data.message,
            checkedAt: q.body.sourceEvidence?.checkedAt,
            expiresAt: q.body.sourceEvidence?.expiresAt,
            source: q.body.sourceEvidence?.source,
          },
          true,
        );
      } else {
        finish({ kind: "unverified", label: chosen.label }, true);
      }
    };
    return (
      <form className="mt-4 space-y-3" onSubmit={choose}>
        <fieldset disabled={state.checking}>
          <legend className={`mb-1 text-sm font-semibold ${T.text}`}>
            Please choose the full address. Different properties can have different connections.
          </legend>
          <p className={`mb-2 text-xs ${T.muted}`}>Addresses for {postcode}</p>
          <div className="max-h-56 space-y-2 overflow-y-auto" aria-describedby={state.error ? `${uid}-err` : undefined}>
            {state.addresses.map((a) => (
              <label
                key={a.addressId}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-sm ${
                  state.selected === a.addressId
                    ? "border-2 border-[#1B3A63] bg-white font-semibold text-[#1E2A44] linko-dark:border-[#F6C140] linko-dark:bg-slate-900 linko-dark:text-white"
                    : T.row
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-addr`}
                  value={a.addressId}
                  checked={state.selected === a.addressId}
                  onChange={() => setState({ ...state, selected: a.addressId, error: undefined })}
                  className="h-4 w-4 accent-[#1B3A63]"
                />
                {a.label}
              </label>
            ))}
          </div>
        </fieldset>
        {state.error && (
          <p id={`${uid}-err`} role="alert" className="text-sm text-red-700 linko-dark:text-red-300">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={state.checking}
          className={`flex min-h-12 w-full items-center gap-2 rounded-lg px-4 text-[15px] font-semibold ${T.primary} ${T.focus} disabled:opacity-60`}
        >
          {state.checking && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />}
          {state.checking ? "Checking this address…" : "Choose this address"}
        </button>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            type="button"
            disabled={state.checking}
            className={`flex min-h-11 w-full items-center rounded-lg px-4 text-[14px] ${T.secondary} ${T.focus}`}
            onClick={() => setState({ step: "postcode" })}
          >
            Try another postcode
          </button>
          <button
            type="button"
            disabled={state.checking}
            className={`flex min-h-11 w-full items-center rounded-lg px-4 text-[14px] ${T.secondary} ${T.focus}`}
            onClick={() => finish({ kind: "notListed" }, false)}
          >
            My address isn&apos;t listed
          </button>
        </div>
      </form>
    );
  }

  const error = state.step === "postcode" ? state.error : undefined;
  return (
    <form onSubmit={find} className="mt-4 space-y-2" noValidate>
      <label htmlFor={`${uid}-pc`} className={`block text-sm font-semibold ${T.text}`}>
        Postcode
      </label>
      <p id={`${uid}-hint`} className={`text-sm ${T.muted}`}>
        For example, SW1A 1AA. We only use your postcode to list addresses — it isn&apos;t sent to our AI provider.
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
        {state.step === "loading" ? "Finding addresses…" : "Find addresses"}
      </button>
      {state.step === "loading" && (
        <p role="status" className="sr-only">
          Finding addresses
        </p>
      )}
    </form>
  );
}

/* ─────────────── C19 Business specialist form (Doc01 WF-05 / CF-02, PUB-06) ─────────────── */

export type LeadResult = "accepted" | "unavailable" | "uncertain";

function SpecialistForm({
  active,
  onDone,
  initialSites = "",
}: {
  active: boolean;
  onDone: (result: LeadResult, reference?: string) => void;
  /** The site count the visitor already chose in the business step (FRS-B03: don't ask twice). */
  initialSites?: string;
}) {
  const uid = useId();
  // One Idempotency-Key per form, reused for every resubmission (Doc04 §04.1, AC-42).
  const [idemKey] = useState(() => newKey());
  const [f, setF] = useState({
    sitesCount: initialSites,
    siteOutwardCode: "",
    businessName: "",
    contactName: "",
    channelType: "EMAIL" as "EMAIL" | "PHONE",
    channelValue: "",
    requirements: "",
    permission: false,
    marketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [closed, setClosed] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  if (!active || closed) return <p className={`mt-3 text-xs ${T.muted}`}>This enquiry form has closed.</p>;

  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const field = (k: string) => (errors[k] ? `${uid}-${k}-err` : undefined);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!f.sitesCount) errs.sitesCount = "Choose how many sites this is for.";
    if (!f.businessName.trim()) errs.businessName = "Enter the business name.";
    if (!f.contactName.trim()) errs.contactName = "Enter a contact name.";
    if (f.channelType === "EMAIL" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.channelValue.trim()))
      errs.channelValue = "Enter a valid work email address.";
    if (f.channelType === "PHONE" && !/^\+?[0-9 ()-]{10,20}$/.test(f.channelValue.trim()))
      errs.channelValue = "Enter a valid phone number.";
    if (f.siteOutwardCode.trim() && !/^[A-Z]{1,2}\d[A-Z\d]?$/i.test(f.siteOutwardCode.trim()))
      errs.siteOutwardCode = "Enter the first part of the postcode only, for example SW1A.";
    if (!f.permission) errs.permission = "Please confirm we may contact you about this enquiry.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setBusy(true);
    const r = await linkoApi.businessLead({
      sitesCount: f.sitesCount,
      ...(f.siteOutwardCode.trim() ? { siteOutwardCode: f.siteOutwardCode.trim().toUpperCase() } : {}),
      businessName: f.businessName.trim(),
      contactName: f.contactName.trim(),
      contactChannel: { type: f.channelType, value: f.channelValue.trim() },
      requirements: redactSensitive(f.requirements.trim()).text,
      permission: true,
      marketingOptIn: f.marketing,
    }, idemKey);
    setBusy(false);
    if (!r.ok && r.http === 400 && r.body?.field && r.body.field !== "Idempotency-Key") {
      const map: Record<string, string> = { contactChannel: "channelValue" };
      setErrors({ [map[r.body.field] ?? r.body.field]: r.body.message });
      return;
    }
    // 504 TIMEOUT: the CRM may have it already — never say "nothing was sent" (AC-42).
    const result: LeadResult = r.ok ? "accepted" : r.http === 504 || r.http === 0 ? "uncertain" : "unavailable";
    setClosed(true);
    track("linko_handoff", { handoff_type: "business_lead", result_code: result });
    if (!r.ok) track("linko_tool_failure", { tool: "business_lead", http: r.http });
    onDone(result, r.ok ? r.body.data.reference : undefined);
  };

  const input = `min-h-11 w-full rounded-lg border border-[#B8C4D6] bg-white px-3 text-[15px] text-[#1E2A44] linko-dark:border-slate-600 linko-dark:bg-slate-900 linko-dark:text-white ${T.focus}`;
  const label = `block text-sm font-semibold ${T.text}`;
  const err = (k: string) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1 text-sm text-red-700 linko-dark:text-red-300">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className={`mt-4 space-y-4 rounded-xl p-4 ${T.row}`} aria-label="Business specialist enquiry">
      <p className={`text-xs ${T.muted}`}>
        We&apos;ll use these details only to respond to this enquiry. Marketing is a separate choice. See our{" "}
        <Link href="/privacy-notice" className={`underline ${T.link}`}>
          privacy notice
        </Link>
        . Please don&apos;t include financial records or customer data.
      </p>
      {Object.keys(errors).length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 linko-dark:border-red-700 linko-dark:bg-red-950 linko-dark:text-red-200">
          <p>Please check {Object.keys(errors).length === 1 ? "1 field" : `${Object.keys(errors).length} fields`}:</p>
          {/* LK-UX-QA-017: each error is summarised and linked to its field */}
          <ul className="mt-1 list-disc pl-5">
            {Object.entries(errors).map(([k, msg]) => (
              <li key={k}>
                <a href={`#${uid}-${k}-field`} className="underline">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <fieldset id={`${uid}-sitesCount-field`} tabIndex={-1} aria-describedby={field("sitesCount")}>
        <legend className={label}>Number of sites (required)</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["ONE", "One site"],
            ["MULTIPLE", "Multiple"],
            ["NOT_SURE", "Not sure"],
          ].map(([v, l]) => (
            <label key={v} className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 text-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#C49A45] ${f.sitesCount === v ? "border-2 border-[#1B3A63] font-semibold linko-dark:border-[#F6C140]" : T.secondary}`}>
              <input type="radio" name={`${uid}-sites`} value={v} checked={f.sitesCount === v} onChange={() => set("sitesCount", v)} className="sr-only" />
              {l}
            </label>
          ))}
        </div>
        {err("sitesCount")}
      </fieldset>
      <div>
        <label htmlFor={`${uid}-siteOutwardCode-field`} className={label}>
          First site postcode area (optional)
        </label>
        <p id={`${uid}-pc-hint`} className={`text-sm ${T.muted}`}>
          The first part only, for example SW1A.
        </p>
        <input
          id={`${uid}-siteOutwardCode-field`}
          className={`mt-1 ${input} uppercase`}
          value={f.siteOutwardCode}
          maxLength={4}
          autoComplete="off"
          aria-invalid={!!errors.siteOutwardCode}
          aria-describedby={`${uid}-pc-hint${errors.siteOutwardCode ? ` ${uid}-siteOutwardCode-err` : ""}`}
          onChange={(e) => set("siteOutwardCode", e.target.value)}
        />
        {err("siteOutwardCode")}
      </div>
      <div>
        <label htmlFor={`${uid}-businessName-field`} className={label}>
          Business name (required)
        </label>
        <input id={`${uid}-businessName-field`} className={`mt-1 ${input}`} value={f.businessName} maxLength={120} autoComplete="organization" aria-invalid={!!errors.businessName} aria-describedby={field("businessName")} onChange={(e) => set("businessName", e.target.value)} />
        {err("businessName")}
      </div>
      <div>
        <label htmlFor={`${uid}-contactName-field`} className={label}>
          Contact name (required)
        </label>
        <input id={`${uid}-contactName-field`} className={`mt-1 ${input}`} value={f.contactName} maxLength={120} autoComplete="name" aria-invalid={!!errors.contactName} aria-describedby={field("contactName")} onChange={(e) => set("contactName", e.target.value)} />
        {err("contactName")}
      </div>
      <fieldset>
        <legend className={label}>How should we contact you? (required)</legend>
        <div className="mt-2 flex gap-4 text-sm">
          {(["EMAIL", "PHONE"] as const).map((t) => (
            <label key={t} className="flex min-h-11 items-center gap-2">
              <input type="radio" name={`${uid}-ch`} checked={f.channelType === t} onChange={() => set("channelType", t)} className="h-4 w-4 accent-[#1B3A63]" />
              {t === "EMAIL" ? "Work email" : "Phone"}
            </label>
          ))}
        </div>
        <label htmlFor={`${uid}-channelValue-field`} className="sr-only">
          {f.channelType === "EMAIL" ? "Work email" : "Phone number"}
        </label>
        <input
          id={`${uid}-channelValue-field`}
          className={`mt-2 ${input}`}
          type={f.channelType === "EMAIL" ? "email" : "tel"}
          autoComplete={f.channelType === "EMAIL" ? "email" : "tel"}
          value={f.channelValue}
          maxLength={120}
          aria-invalid={!!errors.channelValue}
          aria-describedby={field("channelValue")}
          onChange={(e) => set("channelValue", e.target.value)}
        />
        {err("channelValue")}
      </fieldset>
      <div>
        <label htmlFor={`${uid}-rq`} className={label}>
          Your requirements (optional)
        </label>
        <textarea id={`${uid}-rq`} className={`mt-1 min-h-20 py-2 ${input}`} value={f.requirements} maxLength={1000} onChange={(e) => set("requirements", e.target.value)} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input id={`${uid}-permission-field`} type="checkbox" checked={f.permission} onChange={(e) => set("permission", e.target.checked)} aria-invalid={!!errors.permission} aria-describedby={field("permission")} className="mt-0.5 h-5 w-5 accent-[#1B3A63]" />
          <span>Zoiko Broadband may contact me about this enquiry. (required)</span>
        </label>
        {err("permission")}
      </div>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" checked={f.marketing} onChange={(e) => set("marketing", e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#1B3A63]" />
        <span>Send me occasional business offers by email. (optional)</span>
      </label>
      <button type="submit" disabled={busy} className={`flex min-h-12 w-full items-center gap-2 rounded-lg px-4 text-[15px] font-semibold ${T.primary} ${T.focus} disabled:opacity-60`}>
        {busy && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />}
        {busy ? "Sending…" : "Send to a business specialist"}
      </button>
    </form>
  );
}

/* ─────────────── LK-WF-12 Wi-Fi guidance: one safe step at a time, max 3 (PUB-10) ─────────────── */

function WifiSteps({
  active,
  onEscalate,
}: {
  active: boolean;
  onEscalate: (reason: "safety" | "unresolved" | "error") => void;
}) {
  const [steps, setSteps] = useState<TriageData["steps"] | null>(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"issue" | "choose" | "loading" | "steps" | "fixed" | "done">("issue");
  const [choice, setChoice] = useState<string | null>(null);
  const stepRef = useRef<HTMLParagraphElement>(null);

  if (!active && (status === "issue" || status === "choose"))
    return <p className={`mt-3 text-xs ${T.muted}`}>This troubleshooting step has closed.</p>;

  // The visitor reached this step by answering "No" to the telecare / emergency-line question.
  const start = async (symptom: string, label: string, allDevices?: boolean) => {
    setChoice(label);
    setStatus("loading");
    const r = await linkoApi.triage({ symptom, allDevices, digitalVoice: false, telecareOrAlarm: false });
    if (!r.ok) {
      setStatus("done");
      onEscalate("error");
      return;
    }
    if (r.body.data.safetyEscalation || !r.body.data.steps.length) {
      setStatus("done");
      onEscalate(r.body.data.safetyEscalation ? "safety" : "unresolved");
      return;
    }
    track("linko_intent_selected", { intent_id: "troubleshoot_step" });
    setSteps(r.body.data.steps.slice(0, 3));
    setIndex(0);
    setStatus("steps");
    setTimeout(() => stepRef.current?.focus(), 0);
  };

  const btn = `flex min-h-11 w-full items-center gap-2 rounded-lg px-4 text-left text-[14px] ${T.secondary} ${T.focus} disabled:opacity-60`;
  if (status === "issue") {
    return (
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2" role="group" aria-label="What's the problem?">
        <button type="button" className={btn} onClick={() => start("NO_CONNECTION", "No connection")}>
          No connection
        </button>
        <button type="button" className={btn} onClick={() => start("SLOW_SPEED", "Slow speed")}>
          Slow speed
        </button>
        <button type="button" className={btn} onClick={() => { setChoice("Wi-Fi problems"); setStatus("choose"); }}>
          Wi-Fi problems
        </button>
        <button type="button" className={btn} onClick={() => start("WIFI_DROPS", "Wi-Fi drop-outs", true)}>
          Wi-Fi drop-outs
        </button>
        <button type="button" className={btn} onClick={() => start("NO_CONNECTION", "Router problem")}>
          Router problem
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => {
            setChoice("Phone line");
            setStatus("done");
            onEscalate("safety"); // phone-line faults always go to the safety route (Doc01 WF-15)
          }}
        >
          Phone line
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => {
            setChoice("Something else");
            setStatus("done");
            onEscalate("unresolved");
          }}
        >
          Something else
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => {
            setChoice("Skip diagnostics");
            setStatus("done");
            track("linko_diagnostics_completed", { outcome: "skipped" });
            onEscalate("unresolved");
          }}
        >
          Skip diagnostics
        </button>
      </div>
    );
  }

  if (status === "choose" || status === "loading") {
    return (
      <>
      {/* Doc01 WF-12 wording + Doc03 FRS-F05 caveat */}
      <p className={`mt-3 text-[14px] ${T.text}`}>
        Is the problem affecting all devices or just one? That helps us distinguish Wi-Fi coverage from a connection fault — though I can&apos;t
        test your line from here.
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2" role="group" aria-label="Which devices are affected?">
        {[
          [true, "All devices"],
          [false, "One device"],
        ].map(([all, label]) => (
          <button
            key={String(label)}
            type="button"
            disabled={status === "loading"}
            onClick={() => start("SLOW_WIFI", `Wi-Fi problems – ${label}`, all as boolean)}
            className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-4 text-left text-[14px] ${T.secondary} ${T.focus} disabled:opacity-60`}
          >
            {label}
          </button>
        ))}
        {status === "loading" && (
          <p role="status" className={`col-span-full text-sm ${T.muted}`}>
            Getting safe steps…
          </p>
        )}
        {status === "choose" && (
          <button type="button" className={`${btn} md:col-span-2`} onClick={() => setStatus("issue")}>
            <ArrowLeft size={16} aria-hidden /> Back
          </button>
        )}
      </div>
      </>
    );
  }

  if (status === "fixed") {
    return (
      <p role="status" className={`mt-4 rounded-lg px-4 py-3 text-sm ${T.row}`}>
        You chose “That fixed it”. Great — glad that helped. If it happens again, you can report a fault or speak to our team.
      </p>
    );
  }
  if (status === "done" || !steps)
    return <p className={`mt-3 text-xs ${T.muted}`}>{choice ? `You chose: ${choice}. ` : ""}Troubleshooting finished.</p>;

  const step = steps[index];
  const last = index === steps.length - 1;
  return (
    <div className={`mt-4 rounded-xl p-4 ${T.row}`}>
      {choice && <p className={`mb-2 text-xs ${T.muted}`}>You chose: {choice}</p>}
      <p className={`text-xs font-semibold uppercase tracking-wide ${T.muted}`}>
        Step {index + 1} of {steps.length}
      </p>
      <p ref={stepRef} tabIndex={-1} className={`mt-1 text-[15px] outline-none ${T.text}`}>
        {step.text}
      </p>
      {step.href && isAllowedHref(step.href) && (
        <Link href={step.href} className={`mt-2 inline-block text-sm font-semibold underline ${T.link}`}>
          {step.linkLabel ?? "More help"}
        </Link>
      )}
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
        {index > 0 && (
          <button
            type="button"
            onClick={() => {
              setIndex(index - 1);
              setTimeout(() => stepRef.current?.focus(), 0);
            }}
            className={`min-h-11 rounded-lg px-3 text-sm ${T.secondary} ${T.focus}`}
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus("fixed");
            track("linko_diagnostics_completed", { outcome: "fixed" });
          }}
          className={`min-h-11 rounded-lg px-3 text-sm font-semibold ${T.primary} ${T.focus}`}
        >
          That fixed it
        </button>
        <button
          type="button"
          onClick={() => {
            if (last) {
              // Doc01 WF-12: stop after 3 steps → human handoff.
              setStatus("done");
              onEscalate("unresolved");
            } else {
              setIndex(index + 1);
              setTimeout(() => stepRef.current?.focus(), 0);
            }
          }}
          className={`min-h-11 rounded-lg px-3 text-sm ${T.secondary} ${T.focus}`}
        >
          {last ? "Still not working" : "Next step"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("done");
            onEscalate("unresolved");
          }}
          className={`min-h-11 rounded-lg px-3 text-sm ${T.secondary} ${T.focus}`}
        >
          Stop and get help
        </button>
      </div>
    </div>
  );
}

/* ─────────────── CF-05 preferred move date (preference only) ─────────────── */

function MoveDate({ active, onSaved }: { active: boolean; onSaved: (isoDate: string | null) => void }) {
  const uid = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (!active || done) return <p className={`mt-3 text-xs ${T.muted}`}>Move date step completed.</p>;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
  return (
    <form
      className="mt-4 space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!value || value < today) {
          setError("Choose a date from today onwards.");
          return;
        }
        setDone(true);
        onSaved(value);
      }}
    >
      <label htmlFor={`${uid}-d`} className={`block text-sm font-semibold ${T.text}`}>
        Preferred move date
      </label>
      <p id={`${uid}-h`} className={`text-xs ${T.muted}`}>
        This is a preference only until a move is confirmed.
      </p>
      <input
        id={`${uid}-d`}
        type="date"
        min={today}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError("");
        }}
        aria-invalid={!!error}
        aria-describedby={`${uid}-h${error ? ` ${uid}-e` : ""}`}
        className={`min-h-12 w-full rounded-lg border border-[#B8C4D6] bg-[#F7F9FC] px-4 text-[16px] text-[#1E2A44] linko-dark:border-slate-600 linko-dark:bg-slate-900 linko-dark:text-white ${T.focus}`}
      />
      {error && (
        <p id={`${uid}-e`} role="alert" className="text-sm text-red-700 linko-dark:text-red-300">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <button type="submit" className={`min-h-12 rounded-lg px-4 text-[15px] font-semibold ${T.primary} ${T.focus}`}>
          Save preference
        </button>
        <button
          type="button"
          onClick={() => {
            setDone(true);
            onSaved(null);
          }}
          className={`min-h-11 rounded-lg px-4 text-[14px] ${T.secondary} ${T.focus}`}
        >
          I don&apos;t know yet
        </button>
      </div>
    </form>
  );
}

/* ─────────────── LK-WF-17 handoff summary (consented, minimised – PUB-12) ─────────────── */

/** Reason sent with the handoff summary, from the journeys in this chat (most serious first). */
function reasonFromTopics(topics: string[]) {
  if (topics.includes("Digital voice and telecare safety")) return "SAFETY";
  if (topics.includes("Cancellation or complaint")) return "COMPLAINT";
  if (topics.includes("Accessibility and support needs")) return "VULNERABILITY";
  if (topics.some((t) => t.startsWith("Business"))) return "BUSINESS";
  if (topics.includes("Reporting a problem") || topics.includes("Troubleshooting")) return "FAULT";
  if (topics.includes("Billing")) return "BILLING";
  if (topics.includes("Tracking an order")) return "ORDER";
  return "USER_REQUEST";
}

/**
 * LK-WF-17 / Doc10 HS-WF-10-02/06: the visitor previews the summary first, can untick topics,
 * chooses separately whether our team may read this chat, and can send nothing or withdraw later.
 * Nothing is recorded until they choose (no pre-ticked consent).
 */
function HandoffSummary({ topics, receipts, serverId }: { topics: string[]; receipts: string[]; serverId: string | null }) {
  const uid = useId();
  const [chosen, setChosen] = useState<string[]>(topics);
  const [shareChat, setShareChat] = useState(false);
  const [state, setState] = useState<"review" | "sending" | "shared" | "declined" | "withdrawn" | "error">("review");
  const [ref, setRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [key] = useState(() => newKey());
  const reason = reasonFromTopics(topics);

  const preview = [
    "Linko chat summary (Zoiko Broadband AI assistant)",
    `Topics: ${chosen.length ? chosen.join("; ") : "general enquiry"}`,
    ...(receipts.length ? [`Confirmed: ${receipts.join("; ")}`] : ["Nothing was ordered, booked or changed in the chat."]),
  ].join("\n");

  const send = async (share: boolean) => {
    setState("sending");
    const r = await linkoApi.handoff(
      { channel: "ANY", shareSummary: share, shareTranscript: share && shareChat, reason, conversationId: serverId, topics: share ? chosen : [] },
      key,
    );
    if (!r.ok) {
      setState(share ? "error" : "declined");
      return;
    }
    setRef(r.body.data.handoffRef ?? null);
    setState(share ? "shared" : "declined");
  };

  const withdraw = async () => {
    if (!ref) return;
    await linkoApi.withdrawHandoff(ref);
    setState("withdrawn");
  };

  return (
    <div className={`mt-4 rounded-xl p-4 text-sm ${T.row}`}>
      <h3 className={`text-[15px] font-bold ${T.text}`}>Summary to share</h3>
      {state === "review" || state === "sending" ? (
        <>
          <p className={`mt-1 ${T.muted}`}>Check what our team will see. Untick anything you&apos;d rather not share.</p>
          {topics.length > 0 && (
            <fieldset className="mt-2">
              <legend className="sr-only">Topics to share</legend>
              {topics.map((t) => (
                <label key={t} className="flex min-h-11 items-center gap-3">
                  <input
                    type="checkbox"
                    checked={chosen.includes(t)}
                    onChange={(e) => setChosen((c) => (e.target.checked ? [...c, t] : c.filter((x) => x !== t)))}
                    className="h-5 w-5 accent-[#1B3A63]"
                  />
                  {t}
                </label>
              ))}
            </fieldset>
          )}
          <pre
            id={`${uid}-preview`}
            className={`mt-2 whitespace-pre-wrap rounded-lg bg-[#F7F9FC] p-3 font-sans text-[14px] leading-relaxed linko-dark:bg-slate-800 ${T.text}`}
          >
            {preview}
          </pre>
          <label className="mt-2 flex min-h-11 items-start gap-3">
            <input type="checkbox" checked={shareChat} onChange={(e) => setShareChat(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#1B3A63]" />
            <span>Also let our support team read this chat (sensitive details are removed). Optional — you can still get help without it.</span>
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={state === "sending"}
              onClick={() => send(true)}
              className={`min-h-11 rounded-lg px-4 font-semibold ${T.primary} ${T.focus} disabled:opacity-60`}
            >
              Share this summary
            </button>
            <button
              type="button"
              disabled={state === "sending"}
              onClick={() => send(false)}
              className={`min-h-11 rounded-lg px-4 ${T.secondary} ${T.focus} disabled:opacity-60`}
            >
              Send nothing
            </button>
          </div>
        </>
      ) : state === "shared" ? (
        <>
          <p className={`mt-1 ${T.text}`} role="status">
            Shared with our support team{shareChat ? ", including this chat" : ""}. It isn&apos;t a live transfer — please also contact the team using
            one of the options below, and you can paste this summary there.
          </p>
          <pre className={`mt-2 whitespace-pre-wrap font-sans text-[14px] leading-relaxed ${T.text}`}>{preview}</pre>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                navigator.clipboard?.writeText(preview).then(
                  () => setCopied(true),
                  () => setCopied(false),
                )
              }
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-semibold ${T.secondary} ${T.focus}`}
            >
              {copied ? <CheckCircle2 size={16} aria-hidden /> : <ClipboardCopy size={16} aria-hidden />}
              {copied ? "Copied" : "Copy summary"}
            </button>
            {ref && (
              <button type="button" onClick={withdraw} className={`min-h-11 rounded-lg px-3 ${T.secondary} ${T.focus}`}>
                Withdraw what I shared
              </button>
            )}
          </div>
          <span role="status" className="sr-only">
            {copied ? "Summary copied to clipboard." : ""}
          </span>
        </>
      ) : state === "withdrawn" ? (
        <p className={`mt-2 ${T.text}`} role="status">
          Withdrawn — our team can no longer see the summary{shareChat ? " or this chat" : ""}.
        </p>
      ) : state === "declined" ? (
        <p className={`mt-2 ${T.text}`} role="status">
          No problem — nothing from this chat has been shared. You can still contact the team below.
        </p>
      ) : (
        <p className={`mt-2 ${T.text}`} role="status">
          I couldn&apos;t share the summary just now. You can copy it instead: <span className="whitespace-pre-wrap">{preview}</span>
        </p>
      )}
    </div>
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

const RESULT_STATUS: Record<ResultCardData["status"], { label: string; cls: string }> = {
  CONFIRMED: { label: "Confirmed", cls: "bg-emerald-50 text-emerald-900 border-emerald-300 linko-dark:bg-emerald-950 linko-dark:text-emerald-100 linko-dark:border-emerald-700" },
  INDICATIVE: { label: "Indicative – not yet confirmed", cls: "bg-[#F8EEDD] text-[#6B4E16] border-[#D9B56A] linko-dark:bg-amber-950 linko-dark:text-amber-100 linko-dark:border-amber-600" },
  UNAVAILABLE: { label: "Not confirmed", cls: "bg-slate-100 text-slate-800 border-slate-300 linko-dark:bg-slate-800 linko-dark:text-slate-100 linko-dark:border-slate-600" },
};

/** C-card for verified tool results: status, facts, source label, checked-at and valid-until (Doc02 §07.1 #4/#5). */
function ResultCard({ data }: { data: ResultCardData }) {
  const st = RESULT_STATUS[data.status];
  const fmt = (iso?: string) => (iso ? DATE_TIME_FMT.format(new Date(iso)) : null);
  return (
    <article className={`mt-4 rounded-xl p-4 ${T.row}`} aria-label={data.title}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={`text-[15px] font-bold ${T.text}`}>{data.title}</h3>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${st.cls}`}>{st.label}</span>
      </div>
      <DetailRows rows={data.rows} />
      <p className={`mt-1 text-xs ${T.muted}`}>
        Source: {data.source}
        {fmt(data.checkedAt) ? ` · Checked ${fmt(data.checkedAt)}` : " · Check time not available"}
        {fmt(data.expiresAt) ? ` · Valid until ${fmt(data.expiresAt)}` : ""}
      </p>
    </article>
  );
}

function PlanCard() {
  return (
    <article className={`mt-4 rounded-xl p-4 ${T.row}`} aria-label={PLAN_CARD.title}>
      <h3 className={`text-[15px] font-bold ${T.text}`}>{PLAN_CARD.title}</h3>
      <p className={`mt-0.5 text-sm ${T.muted}`}>{PLAN_CARD.note}</p>
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

// Doc07 C17: don't ask "Was this helpful?" after a complaint or a safety conversation.
const NO_FEEDBACK_TOPICS = ["Cancellation or complaint", "Digital voice and telecare safety"];

function SummaryCard({
  topics,
  receipts,
  onFeedback,
}: {
  topics: string[];
  receipts: string[];
  onFeedback: (v: "up" | "down") => void;
}) {
  const [fb, setFb] = useState<"up" | "down" | null>(null);
  const askFeedback = !topics.some((t) => NO_FEEDBACK_TOPICS.includes(t));
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
      {/* AT-61 / Doc07 C20: confirmed (system-accepted) items are kept apart from information-only topics. */}
      <p className={`mt-3 border-t border-[#E1E7F0] pt-3 text-sm linko-dark:border-slate-700 ${T.muted}`}>
        {receipts.length ? (
          <>
            <strong>Confirmed:</strong> {receipts.join("; ")}. <strong>Nothing else</strong> has been ordered, booked or changed in
            this chat.
          </>
        ) : (
          <>
            <strong>Completed:</strong> nothing has been ordered, booked or changed in this chat.
          </>
        )}{" "}
        <strong>Pending:</strong> any next step happens on our secure pages or with our team.
      </p>
      {topics.includes("Cancellation or complaint") && (
        <p className={`mt-2 text-sm ${T.muted}`}>
          Ending this chat doesn&apos;t make, close or resolve a complaint. If you&apos;ve raised one with our team, it stays open until
          they reply.
        </p>
      )}
      <div className={`mt-3 flex flex-wrap items-center gap-2 text-sm ${T.muted}`}>
        {!askFeedback ? null : fb ? (
          <span role="status">Thanks for your feedback. Feedback isn&apos;t a complaint and doesn&apos;t change your account.</span>
        ) : (
          <>
            <span>Was this helpful?</span>
            {(["up", "down"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setFb(v);
                  onFeedback(v);
                }}
                className={`flex min-h-11 items-center gap-1 rounded-md px-2 hover:bg-[#EEF2F8] linko-dark:hover:bg-slate-800 ${T.focus}`}
              >
                {v === "up" ? <ThumbsUp size={14} aria-hidden /> : <ThumbsDown size={14} aria-hidden />}
                {v === "up" ? "Yes" : "No"}
              </button>
            ))}
          </>
        )}
      </div>
    </article>
  );
}

/* ─────────────────────────── C04 Message ──────────────────────────────── */

const TIME_FMT = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
const DATE_TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/London",
});

interface WidgetHandlers {
  serverId: string | null;
  receipts: string[];
  businessSites: string;
  getServerId: () => Promise<string | null>;
  onAddressDone: (o: AddressOutcome, ctx: AddressContext) => void;
  onWifiEscalate: (reason: "safety" | "unresolved" | "error") => void;
  onMoveDate: (isoDate: string | null) => void;
  onLeadDone: (result: LeadResult, reference?: string) => void;
  onSummaryFeedback: (v: "up" | "down") => void;
}

function Message({
  msg,
  isLatest,
  busy,
  topics,
  onAction,
  onFeedback,
  w,
}: {
  msg: ChatMessage;
  isLatest: boolean;
  busy: boolean;
  topics: string[];
  onAction: (a: LinkoAction) => void;
  onFeedback: (id: string, v: "up" | "down", reason?: FeedbackReason) => void;
  w: WidgetHandlers;
}) {
  const time = msg.at ? TIME_FMT.format(new Date(msg.at)) : null;
  if (msg.role === "user") {
    return (
      <div className="flex flex-col items-end">
        <p className="sr-only">You said{time ? ` at ${time}` : ""}:</p>
        <div className="max-w-[85%] whitespace-pre-wrap rounded-xl bg-[#1B3A63] px-4 py-3 text-[15px] leading-relaxed text-white">
          {msg.content}
        </div>
        {time && (
          <time aria-hidden className={`mt-1 text-[12px] ${T.muted}`}>
            {time}
          </time>
        )}
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
      <p className="sr-only">Linko said{time ? ` at ${time}` : ""}:</p>
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
        {msg.widget === "postcode" && (
          <AddressPicker active={isLatest} context={msg.context ?? "residential"} onFinished={w.onAddressDone} getServerId={w.getServerId} />
        )}
        {msg.widget === "wifiSteps" && <WifiSteps active={isLatest} onEscalate={w.onWifiEscalate} />}
        {msg.widget === "moveDate" && <MoveDate active={isLatest} onSaved={w.onMoveDate} />}
      </div>

      {msg.widget === "resultCard" && msg.result && <ResultCard data={msg.result} />}
      {msg.widget === "planCard" && <PlanCard />}
      {msg.widget === "secureCard" && <SecureCard />}
      {msg.widget === "summary" && <SummaryCard topics={topics} receipts={w.receipts} onFeedback={w.onSummaryFeedback} />}
      {msg.widget === "specialistForm" && <SpecialistForm active={isLatest} onDone={w.onLeadDone} initialSites={w.businessSites} />}
      {msg.widget === "handoffSummary" && <HandoffSummary topics={topics} receipts={w.receipts} serverId={w.serverId} />}

      {showActions && <ActionGroup actions={msg.actions!} onAction={onAction} disabled={busy} />}

      {msg.source === "ai" && <AnswerSources sources={msg.sources} />}
      {time && (
        <time aria-hidden className={`mt-1 block text-[12px] ${T.muted}`}>
          {time}
        </time>
      )}

      {msg.source === "ai" && <AnswerFeedback msg={msg} onFeedback={onFeedback} />}
    </div>
  );
}

/**
 * Doc06 evidence label / Doc07 C15 KBSource / Doc01 LK-C11: AI answers say what they're based on —
 * a clickable Zoiko page with its version and date, marked when the content is still awaiting approval —
 * and that they're AI-generated. With no verified source there is no source label at all (never an invented one).
 */
function AnswerSources({ sources }: { sources?: AnswerSource[] }) {
  const fmt = (d?: string) => (d ? new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");
  return (
    <div className={`mt-2 text-[14px] ${T.muted}`}>
      {sources?.length ? (
        <p>
          Based on:{" "}
          {sources.map((s, i) => (
            <span key={s.id}>
              {i > 0 && "; "}
              {s.href ? (
                <Link href={s.href} className={`font-semibold underline ${T.link}`}>
                  {s.title}
                </Link>
              ) : (
                <span className="font-semibold">{s.title}</span>
              )}
              {(s.version || s.updated) && (
                <span>
                  {" "}
                  ({[s.version, s.updated && `updated ${fmt(s.updated)}`].filter(Boolean).join(", ")}
                  {s.status === "DRAFT" ? ", awaiting approval" : ""})
                </span>
              )}
            </span>
          ))}
        </p>
      ) : null}
      <p>AI-generated, may need checking</p>
    </div>
  );
}

/** "Was this helpful?" — "Not useful" asks for a coded reason that goes to the staff review queue (Doc03 §11.2). */
function AnswerFeedback({ msg, onFeedback }: { msg: ChatMessage; onFeedback: (id: string, v: "up" | "down", reason?: FeedbackReason) => void }) {
  const [askReason, setAskReason] = useState(false);
  const btn = `flex min-h-11 items-center gap-1 rounded-md px-2 hover:bg-[#EEF2F8] linko-dark:hover:bg-slate-800 ${T.focus}`;
  if (msg.feedback) {
    return (
      <p role="status" className={`mt-2 text-sm ${T.muted}`}>
        {COPY.feedbackThanks}
        {msg.feedback === "down" && " Our team reviews answers marked not useful."}{" "}
        {msg.feedback === "down" && (
          <Link href="/contact-us" className={`font-semibold underline ${T.link}`}>
            Contact us
          </Link>
        )}
      </p>
    );
  }
  if (askReason) {
    return (
      <fieldset className={`mt-2 text-sm ${T.muted}`}>
        <legend className="mb-1">What was wrong with this answer?</legend>
        <div className="flex flex-wrap gap-2">
          {FEEDBACK_REASONS.map((r) => (
            <button key={r.code} type="button" onClick={() => onFeedback(msg.id, "down", r.code)} className={`${btn} border border-[#D5DCE6] linko-dark:border-slate-600`}>
              {r.label}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }
  return (
    <div className={`mt-2 flex flex-wrap items-center gap-2 text-sm ${T.muted}`}>
      <span>Was this helpful?</span>
      <button type="button" onClick={() => onFeedback(msg.id, "up")} className={btn}>
        <ThumbsUp size={14} aria-hidden /> Useful
      </button>
      <button type="button" onClick={() => setAskReason(true)} className={btn}>
        <ThumbsDown size={14} aria-hidden /> Not useful
      </button>
    </div>
  );
}

/* ───────────────────── LK-WF-01 welcome (desktop + mobile) ──────────────── */

const WELCOMES_SEEN = new Set<string>();

function Welcome({
  msg,
  isLatest,
  onAction,
}: {
  msg: ChatMessage;
  isLatest: boolean;
  onAction: (a: LinkoAction) => void;
}) {
  // Doc01 LK-WF-01 events: welcome_viewed, once per welcome message shown.
  useEffect(() => {
    if (WELCOMES_SEEN.has(msg.id)) return; // effects run twice in development; count each welcome once
    WELCOMES_SEEN.add(msg.id);
    track("linko_welcome_viewed", { device_class: window.innerWidth < 768 ? "mobile" : "desktop" });
  }, [msg.id]);
  return (
    <div>
      {/* Mobile reference shows an "Ask Linko" heading above the welcome card. */}
      <h3 className={`mb-4 text-[22px] font-bold md:hidden ${T.text}`}>Ask Linko</h3>
      <p className="sr-only">Linko said:</p>
      <div className={`rounded-xl px-4 py-3.5 ${T.card}`}>
        <p className="text-[15px] leading-relaxed">{msg.content}</p>
      </div>
      {isLatest && msg.actions && (
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2" role="group" aria-label="Choose a topic">
          {msg.actions.map((a, i) => (
            <ActionButton key={i} action={a} onAction={onAction} />
          ))}
        </div>
      )}
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
  saving,
  onToggleSaving,
  onBack,
  onNew,
  onOpen,
  onDelete,
}: {
  currentId: string;
  saving: boolean;
  onToggleSaving: (on: boolean) => void;
  onBack: () => void;
  onNew: () => void;
  onOpen: (c: SavedChat) => void;
  onDelete: (id?: string) => SavedChat[];
}) {
  const uid = useId();
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
        className={`inline-flex min-h-11 w-fit items-center gap-1.5 rounded-md text-[15px] font-semibold ${T.link} ${T.focus}`}
      >
        <ArrowLeft size={18} aria-hidden /> Back to chat
      </button>

      {/* Opt-in, never pre-ticked (Doc07 LK-WF-18, Doc06 C12). Turning it off deletes saved chats. */}
      <label htmlFor={`${uid}-save`} className={`mt-4 flex min-h-11 items-start gap-3 rounded-xl p-3 text-[14px] ${T.row}`}>
        <input
          id={`${uid}-save`}
          type="checkbox"
          checked={saving}
          onChange={(e) => {
            onToggleSaving(e.target.checked);
            if (!e.target.checked) setItems([]);
          }}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#1B3A63]"
        />
        <span>
          <span className={`block font-semibold ${T.text}`}>Save chat history on this device</span>
          <span className={T.muted}>
            Off by default. When on, chats are kept in this browser for up to {HISTORY_TTL_DAYS} days. Turning it off deletes saved
            chats. Avoid on shared devices.
          </span>
        </span>
      </label>

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
        <p className={`mt-8 text-center text-[15px] ${T.muted}`}>
          {saving ? "No saved chats in this browser yet." : "Chat history is off, so chats aren't saved on this device."}
        </p>
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
                  <span className={`mt-0.5 block text-[14px] ${T.muted}`}>
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
                    className={`min-h-11 rounded-lg bg-red-700 px-3 font-semibold text-white hover:bg-red-800 ${T.focus}`}
                  >
                    Delete all
                  </button>
                  <button type="button" onClick={() => setConfirmClear(false)} className={`min-h-11 rounded-lg px-3 ${T.secondary} ${T.focus}`}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className={`min-h-11 rounded text-[14px] font-medium text-red-700 hover:underline linko-dark:text-red-300 ${T.focus}`}
              >
                Clear all history
              </button>
            )}
          </div>
        </>
      )}

      <p className={`mt-auto pt-8 text-center text-[14px] leading-relaxed ${T.muted}`}>
        Saved chats stay only in this browser. While a chat is open, a copy with sensitive details removed is held briefly on our
        servers and deleted when the chat ends.
      </p>
    </div>
  );
}

/** Masks emails, phone numbers and full postcodes in an exported transcript (Doc03 FRS-D10 / Z02). */
function maskForExport(text: string) {
  return text
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/g, "[email]")
    .replace(/(?:\+44\s?|\b0)\d(?:[\s-]?\d){8,10}\b/g, (m) => (m.replace(/\D/g, "") === COMPANY.phoneHref.replace(/\D/g, "") ? m : "[phone]"))
    .replace(/\b([A-PR-UWYZ][A-HK-Y]?\d[A-Z\d]?)\s?\d[ABD-HJLNP-UW-Z]{2}\b/gi, "$1 ***");
}

/** Redacted plain-text transcript for "Download transcript". */
function downloadTranscript(messages: ChatMessage[]) {
  const lines = [
    "Zoiko Broadband – Linko AI assistant transcript (redacted)",
    "Card numbers, passwords, codes, email addresses, phone numbers and full postcodes are removed.",
    `Saved: ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" }).format(new Date())}`,
    "Linko is an AI assistant. Nothing in this chat places an order or changes your account.",
    "",
  ];
  for (const m of messages) {
    if (m.role === "assistant" && m.content === COPY.welcome) continue;
    lines.push(`${m.role === "user" ? "You" : "Linko"}: ${maskForExport(m.content.replace(/\*\*/g, ""))}`, "");
  }
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `linko-redacted-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ───────────────────────────── Main widget ────────────────────────────── */

export default function ChatWidget({ startOpen = false }: { startOpen?: boolean }) {
  const pathname = usePathname() || "/";
  // startOpen: the lightweight launcher (LinkoLoader) loaded this panel because the visitor clicked it.
  const [open, setOpen] = useState(startOpen);
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

  // Doc01 LK-C01 badge state: replies that arrived while the panel was minimised.
  const seenCount = useRef(messages.length);
  const firstId = useRef(messages[0]?.id);
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    // A restored or restarted conversation replaces the list: what's already there isn't "new".
    if (messages[0]?.id !== firstId.current) {
      firstId.current = messages[0]?.id;
      seenCount.current = messages.length;
    }
    if (open) {
      seenCount.current = messages.length;
      setUnread(0);
      return;
    }
    const fresh = messages.slice(seenCount.current).filter((m) => m.role === "assistant").length;
    setUnread(fresh);
  }, [messages, open]);

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

  // Full-screen mobile sheet is modal: lock page scroll, make the page inert and trap Tab inside (Doc07 C02).
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!open || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = panelRef.current?.parentElement;
    const siblings = Array.from(document.body.children).filter(
      (el) => el instanceof HTMLElement && !el.contains(panelRef.current) && el.tagName !== "SCRIPT",
    ) as HTMLElement[];
    siblings.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    void root;
    return () => {
      document.body.style.overflow = prev;
      siblings.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [open, isMobile]);

  // Offline state (Doc07 C05): Send is disabled while the device is offline.
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Keep the newest message in view — but don't pull the visitor down while they're reading earlier messages (LK-WF-04).
  const nearBottom = useRef(true);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, view]);
  const lastRole = messages[messages.length - 1]?.role;
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (!nearBottom.current && lastRole !== "user") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
    nearBottom.current = true;
  }, [messages, isLoading, open, lastRole]);

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
  // Doc01 §3.4: never auto-read a whole generated reply — announce the reply, its position and the first sentence only.
  const assistantCount = messages.filter((m) => m.role === "assistant").length;
  const firstSentence = (lastMsg?.content ?? "").replace(/\*\*/g, "").split(/(?<=[.!?])\s/)[0].slice(0, 160);
  const replyText =
    lastMsg?.role === "assistant"
      ? `${lastMsg.tone === "safety" ? "Safety information from Linko" : "Linko replied"} (message ${assistantCount}). ${firstSentence}`
      : "";
  const liveText = isLoading ? "Linko is checking" : notice && notice.afterId === lastId ? notice.text : replyText;

  /** Calls a /v1/linko endpoint for an "api" button and shows its typed result (Doc04). */
  const [apiBusy, setApiBusy] = useState(false);
  /** Safe exits whenever an API step fails without its own next actions (Doc01 WF-19 / AC-29). */
  const apiFallback = (call: ApiCall, label: string, next?: LinkoAction[]): LinkoAction[] =>
    next?.length
      ? next
      : [
          { kind: "command", label: "Try again", command: "retry", primary: true, retryApi: { call, label } } as LinkoAction,
          { kind: "link", label: "View Help Centre", href: "/get-help" },
          { kind: "flow", label: "Speak to a person", flow: "handoff" },
        ];

  const runApi = async (call: ApiCall, label: string, echo = true) => {
    if (apiBusy) return;
    if (echo) chat.addUser(label);
    setApiBusy(true);
    try {
      await runApiInner(call, label);
    } finally {
      setApiBusy(false);
    }
  };

  const runApiInner = async (call: ApiCall, label: string) => {
    if (call === "serviceStatus") {
      const s = await linkoApi.serviceStatus(); // PUB-09 (public – no private call first)
      if (s.ok) {
        const incidents = s.body.data.incidents ?? [];
        const ev = s.body.sourceEvidence;
        // Doc01 LK-WF-11 events: status_checked (state only — never an address or postcode).
        track("linko_status_checked", { state: s.body.data.state ?? "UNKNOWN", business_status: s.body.status });
        const STATE_LABEL: Record<string, string> = {
          INCIDENT_REPORTED: "Known issue reported",
          NO_KNOWN_INCIDENT: "No known issue reported",
        };
        chat.addAssistant({
          source: "flow",
          screen: "Service status and fault triage",
          content: s.body.data.message,
          widget: "resultCard",
          result: {
            title: "Network status",
            status: s.body.status === "CONFIRMED" ? "CONFIRMED" : s.body.status === "INDICATIVE" ? "INDICATIVE" : "UNAVAILABLE",
            rows: [
              ["Status", STATE_LABEL[s.body.data.state] ?? "Not confirmed"],
              // An incident without an update time is shown as "time not confirmed", never as current (Doc02 §13.1).
              ...incidents.map(
                (i, n): [string, string] => [`Issue ${n + 1}`, `${i.summary}${i.updatedAt ? ` (updated ${TIME_FMT.format(new Date(i.updatedAt))})` : " (update time not confirmed)"}`],
              ),
            ],
            source: "Zoiko network status",
            checkedAt: ev?.checkedAt,
            expiresAt: ev?.expiresAt,
          },
          actions: toActions(s.body.nextActions).length
            ? toActions(s.body.nextActions)
            : [
                { kind: "flow", label: "Troubleshoot connection", flow: "faultType", primary: true },
                { kind: "link", label: "Report a fault", href: "/report-a-fault" },
              ],
        });
      } else {
        track("linko_tool_failure", { tool: "service_status", http: s.http });
        chat.addAssistant({ source: "flow", tone: "error", content: COPY.degraded, actions: apiFallback(call, label, toActions(s.body?.nextActions)) });
      }
      return;
    }
    const r = await linkoApi.private(call);
    if (r.ok) return; // not reachable until MyZoiko sign-in is connected
    if (r.http === 401) {
      track("linko_auth_required", { call });
      // PRV-* fail closed → LK-WF-16 sign-in (no private data, no existence leak).
      chat.addAssistant({
        source: "flow",
        screen: "Sign-in and customer verification",
        content: COPY.signIn,
        widget: "secureCard",
        actions: [
          { kind: "link", label: "Sign in securely", href: "/login", primary: true },
          { kind: "flow", label: "Continue as guest", flow: "welcome" },
          { kind: "flow", label: "Speak to support", flow: "handoff" },
        ],
      });
      return;
    }
    track("linko_tool_failure", { tool: call, http: r.http });
    chat.addAssistant({ source: "flow", tone: "error", content: COPY.degraded, actions: apiFallback(call, label, toActions(r.body?.nextActions)) });
  };

  const lastNextStep = (): LinkoAction | null => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.widget === "summary" || m.role !== "assistant") continue;
      const a = m.actions?.find((x) => x.primary && !x.disabledReason && (x.kind === "link" || x.kind === "flow"));
      if (a) return a;
    }
    return null;
  };

  const handleAction = (a: LinkoAction) => {
    if (a.disabledReason) return;
    if (a.kind === "flow") {
      chat.startFlow(a.flow, a.label);
    } else if (a.kind === "ask") {
      chat.send(a.text);
    } else if (a.kind === "api") {
      void runApi(a.call, a.label);
    } else if (a.kind === "command") {
      const retryApi = (a as LinkoAction & { retryApi?: { call: ApiCall; label: string } }).retryApi;
      if (a.command === "retry" && retryApi) void runApi(retryApi.call, retryApi.label, false);
      else if (a.command === "retry") chat.retry();
      if (a.command === "restart") chat.restart();
      if (a.command === "close") closePanel();
      if (a.command === "endChat") {
        // LK-WF-20 End chat: close the server session (PUB-14), keep saved history, close the panel.
        chat.endChat(messages.some((m) => m.widget === "summary") ? "summary" : chat.topics.includes("Speaking to our team") ? "handoff" : "abandon");
        closePanel();
      }
      if (a.command === "nextStep") {
        const next = lastNextStep();
        if (!next) chat.startFlow("clarify", "Continue to next step");
        else if (next.kind === "link") router.push(next.href.startsWith("/") ? next.href : "/get-help");
        else handleAction(next);
      }
      if (a.command === "copySummary") {
        const text = [
          "Zoiko Broadband – Linko chat summary",
          ...chat.topics.map((t) => `• ${t} (information only)`),
          ...(chat.receipts.length
            ? chat.receipts.map((r) => `• Confirmed: ${r}`)
            : ["Nothing has been ordered, booked or changed in this chat."]),
          `Need help? Call ${COMPANY.phone} or visit zoikobroadband.com/get-help`,
        ].join("\n");
        navigator.clipboard?.writeText(text).then(
          () => setNotice({ text: "Summary copied to clipboard.", afterId: lastId }),
          () => setNotice({ text: "Sorry, the summary couldn't be copied.", afterId: lastId }),
        );
      }
    }
  };

  /** Doc01 CF-01 / CF-02 / CF-05 – what happens after the address step. */
  const handleAddressDone = (o: AddressOutcome, ctx: AddressContext) => {
    const screen = ctx === "business" ? "Business quote and specialist" : ctx === "moving" ? "Moving home" : "Postcode and exact-address eligibility";
    const moveDateStep = () =>
      chat.addAssistant({
        source: "flow",
        screen: "Moving home",
        content: "What is your preferred move date?",
        widget: "moveDate",
      });

    track("linko_availability_result", { outcome: o.kind, journey: ctx });
    if (o.kind === "expired") {
      chat.addAssistant({
        source: "flow",
        screen,
        content: "That address selection has expired, so I haven't checked it. Please search the postcode again.",
        actions: [
          { kind: "flow", label: "Try another postcode", flow: ctx === "moving" ? "movingAddress" : ctx === "business" ? "businessAvailability" : "availability", primary: true },
          { kind: "flow", label: "Speak to a specialist", flow: "handoff" },
        ],
      });
      return;
    }
    if (o.kind === "qualified") {
      // FRS-A06: plain-language technology names.
      const TECH: Record<string, string> = { FTTP: "Full Fibre (FTTP)", SOGEA: "Part Fibre (SOGEA)" };
      chat.addAssistant({
        source: "flow",
        screen,
        topic: ctx === "moving" ? "Moving home" : "Checking availability",
        content: `${o.message}\n\nContinue securely to review contract information and payment details. Prices and speeds will be confirmed in checkout.`,
        widget: "resultCard",
        result: {
          title: "Availability at this address",
          status: "INDICATIVE",
          rows: [
            ["Address", o.label],
            ["Services found", o.technologies.length ? o.technologies.map((t) => TECH[t] ?? t).join(", ") : "None confirmed yet"],
            ["Prices and speeds", "Confirmed in checkout"],
          ],
          // Development test supplier results are always labelled as test data.
          source: o.source === "test_supplier" ? "Test data (BT not connected)" : "Network availability check",
          checkedAt: o.checkedAt,
          expiresAt: o.expiresAt,
        },
        actions:
          ctx === "business"
            ? [
                { kind: "flow", label: "Speak to a business specialist", flow: "businessSpecialist", primary: true },
                { kind: "link", label: "Continue to business plans", href: "/business-broadband-plans" },
              ]
            : [
                { kind: "link", label: "Continue securely", href: "/check-availability", primary: true },
                { kind: "flow", label: "Change address", flow: ctx === "moving" ? "movingAddress" : "availability" },
                { kind: "flow", label: "Speak to a specialist", flow: "handoff" },
              ],
      });
      if (ctx === "moving") moveDateStep();
      return;
    }
    if (o.kind === "unverified") {
      chat.addAssistant({
        source: "flow",
        screen,
        topic: ctx === "moving" ? "Moving home" : "Checking availability",
        content:
          "Thanks — I've got the address you chose. I can't confirm the services for this exact address in chat yet, so I won't guess. The availability checker shows the services, speeds and prices confirmed for your address, and checking doesn't create an order.",
        actions:
          ctx === "business"
            ? [
                { kind: "flow", label: "Speak to a business specialist", flow: "businessSpecialist", primary: true },
                { kind: "link", label: "Open availability checker", href: "/check-availability" },
              ]
            : [
                { kind: "link", label: "Open availability checker", href: "/check-availability", primary: true },
                { kind: "flow", label: "Try another postcode", flow: ctx === "moving" ? "movingAddress" : "availability" },
                { kind: "flow", label: "Speak to a specialist", flow: "handoff" },
              ],
      });
      if (ctx === "moving") moveDateStep();
      return;
    }
    if (o.kind === "notListed" || o.kind === "empty") {
      chat.addAssistant({
        source: "flow",
        screen,
        content:
          o.kind === "empty"
            ? "I couldn't find any addresses for that postcode. New builds and some properties aren't listed yet — a specialist can check your address manually."
            : "No problem. New builds and some properties aren't listed yet — a specialist can check your address manually.",
        actions: [
          { kind: "flow", label: "Speak to a specialist", flow: "handoff", primary: true },
          { kind: "flow", label: "Try another postcode", flow: ctx === "moving" ? "movingAddress" : ctx === "business" ? "businessAvailability" : "availability" },
        ],
      });
      return;
    }
    chat.addAssistant({
      source: "flow",
      tone: "error",
      content: COPY.degraded,
      actions: [
        { kind: "flow", label: "Try again", flow: ctx === "moving" ? "movingAddress" : ctx === "business" ? "businessAvailability" : "availability", primary: true },
        { kind: "link", label: "View Help Centre", href: "/get-help" },
        { kind: "flow", label: "Speak to a person", flow: "handoff" },
      ],
    });
  };

  const widgetHandlers: WidgetHandlers = {
    serverId: chat.serverConversationId(),
    receipts: chat.receipts,
    businessSites:
      { "One site": "ONE", "Multiple sites": "MULTIPLE", "Not sure": "NOT_SURE" }[
        [...messages].reverse().find((m) => m.role === "user" && ["One site", "Multiple sites", "Not sure"].includes(m.content))
          ?.content ?? ""
      ] ?? "",
    getServerId: chat.getServerId,
    onAddressDone: handleAddressDone,
    onWifiEscalate: (reason) => {
      if (reason === "unresolved") track("linko_diagnostics_completed", { outcome: "unresolved" });
      if (reason === "safety") {
        chat.startFlow("safety");
        return;
      }
      chat.addAssistant({
        source: "flow",
        screen: "Wi-Fi speed and router guidance",
        tone: reason === "error" ? "error" : undefined,
        content:
          reason === "error"
            ? COPY.degraded
            : "Thanks for trying those steps. As it's still not right, the best next step is our support team, who can run checks on your line.",
        actions: [
          { kind: "link", label: "Report a fault", href: "/report-a-fault", primary: true },
          { kind: "flow", label: "Contact support", flow: "handoff" },
        ],
      });
    },
    onMoveDate: (iso) => {
      const pretty = iso
        ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" }).format(new Date(`${iso}T12:00:00Z`))
        : null;
      if (pretty) chat.addUser(`Preferred move date: ${pretty}`);
      chat.addAssistant({
        source: "flow",
        screen: "Moving home",
        content: `${pretty ? `Thanks — I've noted ${pretty} as your preferred date. It's a preference only until a move is confirmed.` : "That's fine — you can choose a date later."}\n\nExisting customers can start a move request after signing in. I won't cancel or transfer your current service from chat, and I can't promise the same price or speed at your new address.`,
        actions: [
          { kind: "api", label: "Plan my move", call: "moveRequest", primary: true },
          { kind: "link", label: "Find moving help", href: "/moving-home" },
          { kind: "flow", label: "Speak to a person", flow: "handoff" },
        ],
      });
    },
    onLeadDone: (result, reference) => {
      if (result === "accepted" && reference) chat.addReceipt(`Business enquiry sent – reference ${reference} (pending)`);
      chat.addAssistant(
        result === "accepted" && reference
          ? {
              source: "flow",
              screen: "Business quote and specialist",
              topic: "Business specialist enquiry",
              // §08.3: received and being checked – no promise of contact time.
              content: `Your request has been received and is being checked. Reference: ${reference}.`,
              actions: [{ kind: "flow", label: "Start a new chat", flow: "welcome" }],
            }
          : result === "uncertain"
            ? {
                source: "flow",
                tone: "error",
                screen: "Business quote and specialist",
                content:
                  "I couldn't confirm whether your enquiry reached our team. Please don't send it again — call us and we'll check for you.",
                actions: [
                  { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref, primary: true },
                  { kind: "flow", label: "Speak to a person", flow: "handoff" },
                ],
              }
            : {
              source: "flow",
              tone: "error",
              screen: "Business quote and specialist",
              content:
                "I can't send business enquiries from chat just now, so nothing has been submitted. Please use the business enquiry form or call our team — they can help straight away.",
              actions: [
                { kind: "link", label: "Use the business enquiry form", href: "/business-broadband", primary: true },
                { kind: "link", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
                { kind: "flow", label: "Speak to a person", flow: "handoff" },
              ],
            },
      );
    },
    onSummaryFeedback: (v) => track("linko_feedback", { value: v, scope: "conversation" }),
  };

  const submit = () => {
    if (!input.trim() || isLoading || offline) return;
    setView("chat");
    chat.send(input);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "";
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

  // C03 header variants: public / escalation / degraded / offline (Doc07).
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const headerStatus = offline
    ? "AI assistant · Offline"
    : view === "history"
      ? "AI assistant · Chat history"
    : lastAssistant?.tone === "error"
      ? "AI assistant · Limited service"
      : screen === "Human escalation and callback"
        ? "AI assistant · Contact options for our team"
        : "AI assistant · Public";

  // Doc01 C08 / Doc03 §7.3: warn before sending if the draft looks like sensitive data.
  const draftSensitive = input.trim() ? redactSensitive(input).removed : [];

  return (
    <>
      {open && (
        <section
          ref={panelRef}
          role="dialog"
          lang="en-GB"
          aria-modal={isMobile}
          aria-labelledby="linko-title"
          style={{ colorScheme: darkMode ? "dark" : "light" }}
          className={`${darkMode ? "linko-dark " : ""}fixed inset-0 z-[70] flex h-[100dvh] flex-col overflow-hidden bg-white pb-[env(safe-area-inset-bottom)] text-[#1E2A44] shadow-[0_12px_40px_rgba(21,33,61,0.18)] motion-safe:animate-[linkoIn_180ms_ease-out] md:inset-auto md:bottom-[112px] md:right-5 md:h-[min(740px,calc(100dvh-136px))] md:w-[min(520px,calc(100vw-3rem))] md:rounded-2xl md:border-2 md:border-[#B8C4D6] linko-dark:bg-slate-900 linko-dark:text-slate-100 md:linko-dark:border-slate-700`}
        >
          <style>{`@keyframes linkoIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

          {/* C03 Header */}
          <header className={`${T.header} flex min-h-[68px] items-center gap-2 px-3 pt-[env(safe-area-inset-top)] text-white md:min-h-[76px] md:rounded-t-[14px] md:px-5`}>
            {/* Mobile: "‹ Linko" back control (Doc07 mobile reference). */}
            <button
              type="button"
              onClick={() => (atStart ? closePanel() : chat.startFlow("welcome"))}
              aria-label={atStart ? "Close Linko" : "Back to start"}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-white/10 md:hidden ${T.focus}`}
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            {/* Doc07 figure 1: gold circular O beside "Linko | Zoiko Broadband" on every screen size
                (placeholder O until Brand supplies the approved asset). */}
            <span className="inline-flex md:hidden">
              <LinkoMark size={32} />
            </span>
            <span className="hidden md:inline-flex">
              <LinkoMark size={38} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="linko-title" ref={headingRef} tabIndex={-1} className="truncate text-[17px] font-bold leading-snug outline-none md:text-[18px]">
                {ASSISTANT.name}
                <span className="hidden min-[400px]:inline">
                  {" "}
                  <span className="font-normal text-white/70">|</span> Zoiko Broadband
                </span>
                {/* The current step is still announced to screen-reader users (Doc07 C03). */}
                {view === "history" ? <span className="sr-only">, Chat history</span> : screen ? <span className="sr-only">, {screen}</span> : null}
              </h2>
              <p className="text-[13px] text-white/80">{headerStatus}</p>
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
                  id: "privacy",
                  label: "Privacy and AI",
                  icon: <Info size={18} />,
                  onSelect: () => {
                    setView("chat");
                    chat.startFlow("privacy");
                  },
                },
                {
                  id: "help",
                  label: "Help Centre",
                  icon: <LifeBuoy size={18} />,
                  separatorBefore: true,
                  onSelect: () => router.push("/get-help"),
                },
                // Doc11 FR-11-001: a persistent route to secure sign-in (opens Zoiko's sign-in page).
                { id: "signin", label: "Sign in securely", icon: <Lock size={18} />, onSelect: () => router.push("/login") },
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
            {/* Close ends the session (PUB-14 purge); Minimise keeps it (Doc03 §05.1, FRS-Z03). */}
            <button
              type="button"
              onClick={() => {
                chat.endChat("abandon");
                closePanel();
              }}
              aria-label="End chat and close Linko"
              title="End chat and close"
              className={`flex h-11 w-10 shrink-0 items-center justify-center rounded-md hover:bg-white/10 ${T.focus}`}
            >
              <X size={20} aria-hidden />
            </button>
          </header>

          {/* The trust strip was removed at the product owner's request; the AI disclosure stays in the header
              ("AI assistant · Public"), the footer disclaimer, and the Privacy links (footer and menu). */}

          {/* Transcript – the only primary scroll region */}
          {view === "history" && (
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-6">
              <HistoryView
                currentId={chat.conversationId()}
                saving={chat.saveHistory}
                onToggleSaving={(on) => {
                  chat.setSaveHistory(on);
                  setNotice({ text: on ? "Chat history will be saved on this device." : "Chat history turned off and saved chats deleted.", afterId: lastId });
                }}
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
                className={`hidden min-h-11 items-center gap-1 rounded-md text-sm font-medium md:inline-flex ${T.link} ${T.focus}`}
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
                  w={widgetHandlers}
                />
              );
            })}

            {/* C16 Loader */}
            {(isLoading || apiBusy) && (
              <div className={`flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] ${T.card}`}>
                <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden />
                <span className="flex-1">Linko is checking…</span>
                {isLoading && (
                  // Doc07 §08: cancel is safe – asking a question never changes anything.
                  <button type="button" onClick={chat.cancel} className={`min-h-11 rounded-lg px-3 text-sm font-semibold ${T.secondary} ${T.focus}`}>
                    Stop
                  </button>
                )}
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
            className="px-5 pt-3 md:px-6 md:pt-2"
          >
            <label htmlFor="linko-input" className="sr-only">
              Message Linko
            </label>
            {offline && (
              <p role="status" className="mb-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-[14px] text-amber-900 linko-dark:border-amber-700 linko-dark:bg-amber-950 linko-dark:text-amber-100">
                You&apos;re offline — messages can&apos;t be sent until your connection is back.
              </p>
            )}
            {draftSensitive.length > 0 && (
              <p id="linko-dlp-warning" role="status" className="mb-2 rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-[14px] text-sky-900 linko-dark:border-sky-700 linko-dark:bg-sky-950 linko-dark:text-sky-100">
                This looks like {draftSensitive.join(" and ")}. Please don&apos;t share it here — it will be removed before sending.
              </p>
            )}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-2 md:rounded-xl md:border md:border-[#B8C4D6] md:bg-[#F7F9FC] md:p-1.5 md:pl-3 md:focus-within:outline md:focus-within:outline-2 md:focus-within:outline-offset-2 md:focus-within:outline-[#C49A45] linko-dark:md:border-slate-600 linko-dark:md:bg-slate-800">
              <textarea
                id="linko-input"
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // UI-04: grow with the text up to the max height.
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    submit();
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder={COPY.composerPlaceholder}
                aria-describedby={draftSensitive.length ? "linko-dlp-warning linko-input-hint" : "linko-input-hint"}
                className={`max-h-32 min-h-12 w-full flex-1 resize-none rounded-lg border border-[#B8C4D6] bg-white px-4 py-3 text-[16px] text-[#1E2A44] placeholder:text-[#8A97AB] md:min-h-9 md:rounded-none md:border-0 md:bg-transparent md:px-1 md:py-1.5 md:text-[15px] md:outline-none linko-dark:border-slate-600 linko-dark:bg-slate-900 linko-dark:text-white md:linko-dark:bg-transparent ${T.focus} md:focus-visible:outline-none`}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || offline}
                className={`min-h-12 w-full shrink-0 rounded-lg px-6 text-[15px] font-bold text-white ${T.header} hover:bg-[#1B3A63] disabled:cursor-not-allowed disabled:opacity-80 md:min-h-9 md:w-auto md:px-5 md:text-[14px] linko-dark:bg-[#F6C140] linko-dark:text-[#15213D] ${T.focus}`}
              >
                Send
              </button>
            </div>
            <p id="linko-input-hint" className={`mt-2 flex justify-between gap-2 text-[13px] md:mt-1 md:text-[12px] ${T.muted}`}>
              <span>{COPY.footerDisclaimer}</span>
              {remaining < 200 && <span aria-live="polite">{remaining} characters left</span>}
            </p>
          </form>

          {/* C18 Privacy links + persistent human route */}
          <nav
            aria-label="Linko privacy and human help"
            className="mx-5 mt-3 flex flex-wrap items-center gap-x-1.5 border-t border-[#D5DCE6] pb-3 pt-2 text-[13px] md:mx-6 md:mt-1.5 md:pb-1.5 md:pt-0.5 linko-dark:border-slate-700"
          >
            <button
              type="button"
              onClick={() => {
                setView("chat");
                chat.startFlow("safety");
              }}
              className={`order-last ml-auto inline-flex min-h-11 items-center md:min-h-8 gap-1 rounded px-0.5 text-[#B42318] hover:underline linko-dark:text-red-300 ${T.focus}`}
            >
              <ShieldAlert size={14} aria-hidden /> Safety help
            </button>
            <button type="button" onClick={() => { setView("chat"); chat.startFlow("privacy"); }} className={`min-h-11 rounded px-0.5 hover:underline md:min-h-8 ${T.link} ${T.focus}`}>
              Privacy
            </button>
            <span aria-hidden className={T.muted}>
              ·
            </span>
            <button type="button" onClick={() => { setView("chat"); chat.startFlow("handoff"); }} className={`min-h-11 rounded px-0.5 hover:underline md:min-h-8 ${T.link} ${T.focus}`}>
              Talk to a person
            </button>
            {!atStart && (
              <>
                <span aria-hidden className={T.muted}>
                  ·
                </span>
                <button type="button" onClick={() => { setView("chat"); chat.startFlow("end"); }} className={`min-h-11 rounded px-0.5 hover:underline md:min-h-8 ${T.link} ${T.focus}`}>
                  End chat
                </button>
              </>
            )}
          </nav>
        </section>
      )}

      {/* C01 Launcher – persistent O at the safe bottom corner; on desktop the panel opens above it */}
      {(
        <button
          ref={launcherRef}
          type="button"
          onClick={open ? closePanel : openPanel}
          // WCAG 2.5.3: the accessible name starts with the visible label "Ask Linko".
          aria-label={
            open
              ? "Ask Linko – minimise the Zoiko Broadband AI assistant"
              : `Ask Linko – Zoiko Broadband AI assistant${unread ? ` (${unread} new ${unread === 1 ? "reply" : "replies"})` : ""}`
          }
          aria-expanded={open}
          title={open ? "Minimise Linko" : "Ask Linko"}
          className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] ${open ? "hidden md:flex" : "flex"} h-[76px] w-[76px] items-center justify-center rounded-full ${T.header} text-white shadow-[0_8px_24px_rgba(21,33,61,0.3)] transition hover:bg-[#1B3A63] ${T.focus}`}
        >
          <LinkoMark size={54} />
          {!open && unread > 0 && (
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-[#C0392B] px-1 text-xs font-bold leading-none text-white"
            >
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      )}
    </>
  );
}

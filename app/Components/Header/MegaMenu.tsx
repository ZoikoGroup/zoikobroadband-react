"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  KeyRound,
  LifeBuoy,
  Lightbulb,
  Link2,
  Lock,
  LogIn,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  UserRound,
} from "lucide-react";
import { POPULAR_SEARCHES, QUICK_LINKS, SEARCH_INDEX, type NavItem } from "./navData";

const isExternal = (href: string) => href.startsWith("http");

const panelShell =
  "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] dark:border-gray-800 dark:bg-gray-900";

/** Light postcode bar. UI only — opens the existing /check-my-postcode page. */
export function MenuPostcodeBar({ onNavigate, idSuffix }: { onNavigate: () => void; idSuffix: string }) {
  const router = useRouter();
  const [postcode, setPostcode] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onNavigate();
    router.push("/check-my-postcode");
  };
  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[560px]">
      <label htmlFor={`menu-postcode-${idSuffix}`} className="sr-only">
        Enter your postcode
      </label>
      <div className="flex flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 focus-within:border-[#0B2F5B] dark:border-gray-700 dark:bg-gray-950">
        <MapPin aria-hidden className="h-5 w-5 shrink-0 text-slate-500" />
        <input
          id={`menu-postcode-${idSuffix}`}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          placeholder="Enter your postcode, e.g. SW1A 1AA"
          autoComplete="postal-code"
          maxLength={10}
          className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
        />
      </div>
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F7BE2E] px-6 py-3 font-bold text-[#0B2F5B] hover:bg-[#F2B015]">
        Check availability
        <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
    </form>
  );
}

export function MenuLink({ href, label, onNavigate, icon }: { href: string; label: string; onNavigate: () => void; icon?: ReactNode }) {
  const cls =
    "group flex items-center justify-between gap-3 border-b border-slate-200 py-2 text-[15px] text-[#0B2F5B] last:border-b-0 hover:text-[#1d5fa8] dark:border-gray-800 dark:text-slate-100";
  const inner = (
    <>
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-[#1d5fa8] transition-transform group-hover:translate-x-0.5" />
    </>
  );
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onNavigate}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onNavigate}>
      {inner}
    </Link>
  );
}

function IntroPanel({ title, text, image, alt }: { title: string; text: string; image: string; alt: string }) {
  return (
    <div className="flex flex-col bg-[#0B2F5B] bg-[radial-gradient(ellipse_at_top_left,rgba(48,110,170,0.45),transparent_60%)] p-6 text-white">
      <p className="text-[26px] font-extrabold leading-tight">{title}</p>
      <span aria-hidden className="mt-4 h-1 w-12 rounded bg-[#F7BE2E]" />
      <p className="mt-4 leading-relaxed text-white/85">{text}</p>
      <div className="relative mt-auto aspect-[200/150] overflow-hidden rounded-xl border-b-4 border-[#F7BE2E]">
        <Image src={image} alt={alt} fill sizes="200px" loading="eager" className="object-cover" />
      </div>
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-[#0B2F5B] dark:text-slate-100">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F7BE2E]">
        <Check aria-hidden className="h-3 w-3 text-[#0B2F5B]" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

export default function MegaMenu({ item, id, onNavigate }: { item: NavItem; id: string; onNavigate: () => void }) {
  const { aside, footer } = item;
  return (
    <div id={id} className={panelShell}>
      <div className="grid grid-cols-[220px_1fr] min-[1440px]:grid-cols-[256px_1fr]">
        <IntroPanel {...item.intro} />

        <div className="p-6">
          <div className="grid grid-cols-[1fr_1fr_1fr_220px] min-[1440px]:grid-cols-[1fr_1fr_1fr_252px]">
            {item.columns.map(({ title, icon: Icon, links }) => (
              <div key={title} className="border-r border-slate-200 px-4 first:pl-0 min-[1440px]:px-5 dark:border-gray-800">
                <p className="flex items-center gap-3 border-b-2 border-slate-200 pb-3 font-bold text-[#0B2F5B] dark:border-gray-700 dark:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E6F0FB] dark:bg-gray-800">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="text-[17px]">{title}</span>
                </p>
                <ul className="mt-2">
                  {links.map((l) => (
                    <li key={l.label}>
                      <MenuLink href={l.href} label={l.label} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="pl-4 min-[1440px]:pl-6">
              <div className="rounded-2xl bg-[#EAF2FC] p-5 dark:bg-gray-800">
                {aside.kind === "checks" ? (
                  <>
                    <p className="flex items-center gap-2 text-[17px] font-bold text-[#0B2F5B] dark:text-white">
                      {aside.icon && <aside.icon aria-hidden className="h-5 w-5" />}
                      {aside.title}
                    </p>
                    <ul className="mt-3 space-y-3">
                      {aside.points.map((p) => (
                        <CheckItem key={p}>{p}</CheckItem>
                      ))}
                    </ul>
                    {aside.link && (
                      <Link
                        href={aside.link.href}
                        onClick={onNavigate}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1d5fa8] underline underline-offset-4"
                      >
                        {aside.link.label}
                        <ChevronRight aria-hidden className="h-4 w-4" />
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-[17px] font-bold text-[#0B2F5B] dark:text-white">{aside.title}</p>
                    <ul className="mt-3 space-y-3">
                      {aside.channels.map(({ icon: Icon, title, text }) => (
                        <li key={title} className="flex gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-[#0B2F5B] dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                            <Icon aria-hidden className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-[15px] font-bold text-[#0B2F5B] dark:text-white">{title}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300">{text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div className="mt-5 flex items-center justify-between gap-6 border-t border-slate-200 pt-4 dark:border-gray-800">
            {footer.kind === "postcode" ? (
              <>
                <FooterLabel icon={<MapPin aria-hidden className="h-5 w-5" />} title="Check what is available" text="Search by your postcode and address." />
                <MenuPostcodeBar onNavigate={onNavigate} idSuffix={id} />
              </>
            ) : (
              <>
                <FooterLabel icon={<footer.icon aria-hidden className="h-5 w-5" />} title={footer.title} text={footer.text} />
                <Link
                  href={footer.cta.href}
                  onClick={onNavigate}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#F7BE2E] px-6 py-3 font-bold text-[#0B2F5B] hover:bg-[#F2B015]"
                >
                  {footer.cta.label}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLabel({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E6F0FB] text-[#0B2F5B] dark:bg-gray-800 dark:text-white">{icon}</span>
      <p>
        <span className="block font-bold text-[#0B2F5B] dark:text-white">{title}</span>
        <span className="text-sm text-slate-600 dark:text-slate-400">{text}</span>
      </p>
    </div>
  );
}

/* ── My Account (signed-out) ─────────────────────────────────────────── */

export function AccountPanel({ onNavigate }: { onNavigate: () => void }) {
  const icon = "h-[18px] w-[18px] text-slate-500";
  return (
    <div id="mega-account" className={panelShell}>
      <div className="grid grid-cols-[240px_1fr]">
        <IntroPanel
          title="My Account"
          text="Secure access to billing, services, orders and account details."
          image="/Images/home/guide-internet-phone-lines.webp"
          alt="Hands using a laptop"
        />
        <div className="grid grid-cols-[1fr_auto_1fr] gap-7 p-7">
          <div>
            <p className="flex items-center gap-2 text-[17px] font-bold text-[#0B2F5B] dark:text-white">
              <UserRound aria-hidden className="h-5 w-5" />
              Account access
            </p>
            <Link
              href="/login"
              onClick={onNavigate}
              className="mt-4 flex items-center justify-between rounded-lg bg-[#F7BE2E] px-5 py-3 font-bold text-[#0B2F5B] hover:bg-[#F2B015]"
            >
              <span className="flex items-center gap-2.5">
                <LogIn aria-hidden className="h-5 w-5" />
                Log in securely
              </span>
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              onClick={onNavigate}
              className="mt-3 flex items-center justify-between rounded-lg border border-[#0B2F5B] px-5 py-3 font-bold text-[#0B2F5B] hover:bg-[#EAF2FC] dark:border-slate-300 dark:text-white dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-2.5">
                <UserPlus aria-hidden className="h-5 w-5" />
                Register / activate
              </span>
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
            <ul className="mt-3">
              <li><MenuLink href="/login" label="Forgotten password" onNavigate={onNavigate} icon={<KeyRound aria-hidden className={icon} />} /></li>
              <li><MenuLink href="/dashboard" label="Track an order" onNavigate={onNavigate} icon={<Package aria-hidden className={icon} />} /></li>
              <li><MenuLink href="/get-help" label="Account help & support" onNavigate={onNavigate} icon={<LifeBuoy aria-hidden className={icon} />} /></li>
            </ul>
          </div>

          <span aria-hidden className="w-px bg-slate-200 dark:bg-gray-800" />

          <div className="rounded-2xl bg-[#EAF2FC] p-5 dark:bg-gray-800">
            <p className="flex items-center gap-2 text-[17px] font-bold text-[#0B2F5B] dark:text-white">
              <ShieldCheck aria-hidden className="h-5 w-5" />
              After you sign in
            </p>
            <ul className="mt-3 space-y-3">
              {["Account overview", "My broadband & digital lines", "Bills & payments", "Orders & installations", "Profile & preferences", "Security & two-step verification"].map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#0B2F5B] dark:bg-gray-900 dark:text-white">
              <Lock aria-hidden className="h-4 w-4 shrink-0" />
              No personal details are shown until you sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Search (client-side over site pages; no API) ────────────────────── */

export function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    const terms = q.split(/\s+/);
    return SEARCH_INDEX.filter((e) => {
      const hay = `${e.label} ${e.keywords}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    }).slice(0, 8);
  }, [q]);

  const go = (href: string) => {
    onNavigate();
    router.push(href);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (results[0]) go(results[0].href);
  };

  return (
    <div id="mega-search" className={`${panelShell} p-7`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-2xl font-extrabold text-[#0B2F5B] dark:text-white">Search Zoiko Broadband</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Plans, help, switching and guides</p>
      </div>

      <form onSubmit={submit} role="search" className="mt-5 flex items-center gap-3 rounded-xl border-2 border-[#0B2F5B] p-1.5 pl-4 dark:border-slate-400">
        <Search aria-hidden className="h-5 w-5 shrink-0 text-slate-500" />
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          id="site-search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for broadband plans, support, installation…"
          className="w-full bg-transparent py-2 text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
        />
        <button type="submit" className="rounded-lg bg-[#0B2F5B] px-5 py-2.5 font-bold text-white hover:bg-[#123d72]">
          Search
        </button>
      </form>

      <div className="mt-6 grid grid-cols-2 gap-7">
        <div className="border-r border-slate-200 pr-7 dark:border-gray-800">
          <p className="flex items-center gap-2 text-[17px] font-bold text-[#0B2F5B] dark:text-white">
            <TrendingUp aria-hidden className="h-5 w-5" />
            {q ? "Results" : "Popular searches"}
          </p>
          <ul className="mt-3 space-y-2" aria-live="polite">
            {q ? (
              results.length ? (
                results.map((r) => (
                  <li key={r.label}>
                    <button
                      type="button"
                      onClick={() => go(r.href)}
                      className="flex w-full items-center justify-between gap-3 rounded-full bg-[#EAF2FC] px-5 py-2 text-left text-[15px] text-[#0B2F5B] hover:bg-[#dbe8f8] dark:bg-gray-800 dark:text-white"
                    >
                      {r.label}
                      <ChevronRight aria-hidden className="h-4 w-4 shrink-0" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-slate-600 dark:text-slate-300">No matches. Try “router”, “switch” or “billing”.</li>
              )
            ) : (
              POPULAR_SEARCHES.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setQuery(s)}
                    className="flex w-full items-center gap-3 rounded-full bg-[#EAF2FC] px-5 py-2 text-left text-[15px] text-[#0B2F5B] hover:bg-[#dbe8f8] dark:bg-gray-800 dark:text-white"
                  >
                    <Search aria-hidden className="h-4 w-4 shrink-0" />
                    {s}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[17px] font-bold text-[#0B2F5B] dark:text-white">
            <Link2 aria-hidden className="h-5 w-5" />
            Quick links
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className="flex h-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 font-bold text-[#0B2F5B] hover:border-[#0B2F5B] dark:border-gray-700 dark:text-white"
                >
                  <Icon aria-hidden className="h-5 w-5 shrink-0" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-[#1d5fa8]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 text-sm text-slate-600 dark:border-gray-800 dark:text-slate-300">
        <p className="flex items-center gap-3">
          <Lightbulb aria-hidden className="h-5 w-5 shrink-0 text-[#F7BE2E]" />
          Checking if we cover your address? Availability uses your full address, not search.
        </p>
        <Link href="/availability" onClick={onNavigate} className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#0B2F5B] underline underline-offset-4 dark:text-white">
          Check availability
          <ChevronRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/* Shared design tokens for the home page sections */
export const NAVY = "#0B2F5B";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

/** Small uppercase label above a heading. `lines` adds the short rules either side (centred headings). */
export function Eyebrow({
  children,
  lines = false,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  lines?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-[#F7BE2E]" : "text-[#B8862B] dark:text-[#F7BE2E]";
  const rule = tone === "dark" ? "bg-[#F7BE2E]" : "bg-[#F7BE2E]";
  return (
    <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] sm:text-sm ${color} ${lines ? "justify-center" : ""} ${className}`}>
      {lines && <span aria-hidden className={`h-0.5 w-7 rounded ${rule}`} />}
      {children}
      {lines && <span aria-hidden className={`h-0.5 w-7 rounded ${rule}`} />}
    </p>
  );
}

/** Centred section header: eyebrow + h2 + intro. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow lines>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2F5B] dark:text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">{intro}</p>}
    </div>
  );
}

type BtnVariant = "yellow" | "navy" | "outline";
const btnStyles: Record<BtnVariant, string> = {
  yellow: "bg-[#F7BE2E] text-[#0B2F5B] hover:bg-[#F2B015] shadow-sm",
  navy: "bg-[#0B2F5B] text-white hover:bg-[#123d72] dark:bg-[#1d4f8a] dark:hover:bg-[#245b9c]",
  outline:
    "border border-[#0B2F5B] text-[#0B2F5B] hover:bg-[#0B2F5B] hover:text-white dark:border-slate-300 dark:text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "yellow",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7BE2E] sm:text-base ${btnStyles[variant]} ${className}`}
    >
      {children}
      <ArrowRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}

/** Bold text link with an arrow (card footers). */
export function ArrowLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `group inline-flex items-center gap-2 text-sm font-bold text-[#0B2F5B] hover:text-[#1d5fa8] dark:text-white sm:text-base ${className}`;
  const inner = (
    <>
      {children}
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Underlined text link with a chevron. */
export function UnderlineLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2F5B] underline underline-offset-4 hover:text-[#1d5fa8] dark:text-white sm:text-base ${className}`}
    >
      {children}
      <ChevronRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}

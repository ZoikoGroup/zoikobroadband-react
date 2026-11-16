import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

export const inputClass =
  "h-11 w-full rounded-lg border border-[#d9dee8] bg-white px-3 text-sm text-[#0b2a5b] outline-none focus:border-[#0b2a5b]";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#e3e8f0] bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  n,
  children,
}: {
  n?: number;
  children: ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-3 text-base font-bold text-[#0b2a5b]">
      {n !== undefined && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b2a5b] text-sm font-bold text-white">
          {n}
        </span>
      )}
      {children}
    </h3>
  );
}

type ButtonProps = {
  variant?: "primary" | "outline" | "dark";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  form?: string;
  className?: string;
  children: ReactNode;
};

const VARIANTS = {
  primary: "bg-[#fbb82b] text-[#0b2a5b] hover:brightness-95",
  outline: "border border-[#0b2a5b] bg-white text-[#0b2a5b]",
  dark: "bg-[#0b2a5b] text-white",
} as const;

export function ActionButton({
  variant = "primary",
  href,
  onClick,
  disabled,
  type = "button",
  form,
  className = "",
  children,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      className={cls}
    >
      {children}
    </button>
  );
}

type ChoiceProps = {
  type?: "radio" | "checkbox";
  name?: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  badge?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function ChoiceCard({
  type = "radio",
  name,
  checked,
  onChange,
  title,
  description,
  badge,
  className = "",
  children,
}: ChoiceProps) {
  return (
    <label
      className={`relative flex cursor-pointer gap-3 rounded-xl border-2 p-4 ${
        checked ? "border-[#fbb82b] bg-[#fffaf0]" : "border-[#e3e8f0] bg-white"
      } ${className}`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 accent-[#0b2a5b]"
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#0b2a5b]">{title}</span>
          {badge}
        </span>
        {description && (
          <span className="mt-1 block text-sm leading-5 text-[#5b6578]">
            {description}
          </span>
        )}
        {children}
      </span>
    </label>
  );
}

export function CheckList({
  items,
  tone = "text-[#1f9d55]",
}: {
  items: readonly string[];
  tone?: string;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm leading-5 text-[#0b2a5b]"
        >
          <Check
            className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TwoColumn({
  main,
  aside,
}: {
  main: ReactNode;
  aside: ReactNode;
}) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-5">{main}</div>
      <aside className="min-w-0 space-y-5">{aside}</aside>
    </div>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold tracking-tight text-[#0b2a5b]">
      {children}
    </h2>
  );
}

export function Spinner() {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-[#d9dee8] border-t-[#0b2a5b]"
    />
  );
}

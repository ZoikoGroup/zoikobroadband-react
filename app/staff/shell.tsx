import Link from "next/link";
import { ReactNode } from "react";
import { signOutAction, stepUpAction } from "./actions";
import { ActionForm, field } from "./ui";
import { Staff, steppedUp } from "@/app/lib/linko-staff/auth";
import { navFor, ROLE_LABEL } from "@/app/lib/linko-staff/rbac";

/** Operations shell (Doc10 console rule): who is signed in, their role, allowed screens, step-up and sign-out. */
export function StaffShell({ staff, title, children, current }: { staff: Staff; title: string; children: ReactNode; current: string }) {
  const fresh = steppedUp(staff);
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-[#1E2A44]">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#15213D] px-4 py-3 text-white">
        <div>
          <p className="text-sm font-bold">Linko staff console</p>
          <p className="text-xs text-white/80">
            {staff.displayName} · {ROLE_LABEL[staff.role]}
          </p>
        </div>
        <form action={signOutAction}>
          <button className="min-h-11 rounded-lg border border-white/40 px-3 text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C49A45]">
            Sign out
          </button>
        </form>
      </div>
      <nav aria-label="Staff console" className="mt-3 flex flex-wrap gap-2">
        {navFor(staff.role).map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={current === n.href ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold ${
              current === n.href ? "bg-[#1B3A63] text-white" : "border border-[#B8C4D6] bg-white hover:bg-[#EEF2F8]"
            }`}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <details className="mt-3 rounded-lg border border-[#D5DCE6] bg-[#F7F9FC] p-3 text-sm">
        <summary className="cursor-pointer font-semibold">
          Step-up: {fresh ? "confirmed for sensitive actions" : "needed for sensitive actions"}
        </summary>
        <ActionForm action={stepUpAction} submit="Confirm password" className="mt-2 max-w-sm">
          <label className="block text-sm font-semibold" htmlFor="stepup-pw">
            Password
          </label>
          <input id="stepup-pw" name="password" type="password" autoComplete="current-password" required className={field} />
        </ActionForm>
      </details>
      <h1 className="mt-5 text-2xl font-bold">{title}</h1>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "danger" | "warn" | "ok" }) {
  const c = {
    default: "bg-[#EEF2F8] text-[#1E2A44]",
    danger: "bg-red-100 text-red-900",
    warn: "bg-amber-100 text-amber-900",
    ok: "bg-emerald-100 text-emerald-900",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${c}`}>{children}</span>;
}

export const fmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" });
export const when = (iso: string | null | undefined) => (iso ? fmt.format(new Date(iso)) : "—");

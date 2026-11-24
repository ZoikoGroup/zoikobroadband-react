"use client";

import { ReactNode, useActionState } from "react";
import type { FormState } from "./actions";

type Action = (state: FormState, form: FormData) => Promise<FormState>;

/** A server-action form with an announced status line (WCAG: errors and results are read out). */
export function ActionForm({
  action,
  children,
  className = "",
  submit,
  danger = false,
  hidden,
}: {
  action: Action;
  children?: ReactNode;
  className?: string;
  submit: string;
  danger?: boolean;
  hidden?: Record<string, string>;
}) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <form action={run} className={`space-y-2 ${className}`}>
      {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {children}
      <button
        type="submit"
        disabled={pending}
        className={`min-h-11 rounded-lg px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A45] disabled:opacity-60 ${
          danger ? "bg-red-700 hover:bg-red-800" : "bg-[#1B3A63] hover:bg-[#15305A]"
        }`}
      >
        {pending ? "Working…" : submit}
      </button>
      <p role="status" aria-live="polite" className={`text-sm ${state?.error ? "text-red-700" : "text-emerald-800"}`}>
        {state?.error ?? state?.ok ?? ""}
      </p>
    </form>
  );
}

export const field =
  "min-h-11 w-full rounded-lg border border-[#B8C4D6] bg-white px-3 text-[15px] text-[#1E2A44] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A45]";

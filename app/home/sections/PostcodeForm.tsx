"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, MapPin } from "lucide-react";

/**
 * UI-only postcode entry. It does not call any API itself: it scrolls to the
 * existing, unchanged availability checker on the home page (#check-postcode).
 */
export default function PostcodeForm({
  id,
  label,
  placeholder = "e.g. SW1A 1AA",
}: {
  id: string;
  label?: string;
  placeholder?: string;
}) {
  const [postcode, setPostcode] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = document.getElementById("check-postcode");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.querySelector("input")?.focus({ preventScroll: true });
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[600px]" role="search" aria-label="Check broadband availability">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <div className="rounded-2xl border border-white/25 bg-white/10 p-1.5 backdrop-blur-sm">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-0">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 sm:rounded-r-none">
            <MapPin aria-hidden className="h-5 w-5 shrink-0 text-[#0B2F5B]" />
            <input
              id={id}
              name="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder={placeholder}
              aria-label={label ? undefined : "Enter your postcode"}
              autoComplete="postal-code"
              maxLength={10}
              className="w-full bg-transparent py-3.5 text-base text-slate-900 outline-none placeholder:text-slate-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F7BE2E] px-6 py-3.5 text-base font-bold text-[#0B2F5B] transition-colors hover:bg-[#F2B015] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:rounded-l-none"
          >
            Check Availability
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Loader2, MapPin } from "lucide-react";
import {
  POSTCODE_SEARCH_EVENT,
  POSTCODE_STATUS_EVENT,
  type PostcodeSearchDetail,
  type PostcodeStatusDetail,
} from "@/app/Components/Broadbandplans";

/**
 * Postcode entry for the home page. On submit it asks the (hidden) address
 * checker on the home page (BroadbandPlans with `searchInputId`) to run the
 * BT address search. The checker reveals itself with the address list once
 * results come back; loading and error state are shown here.
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only reflect status for searches started from this form
  useEffect(() => {
    if (!submitted) return;
    const onStatus = (e: Event) => {
      const { loading, error } = (e as CustomEvent<PostcodeStatusDetail>).detail;
      setLoading(loading);
      setError(error);
      if (!loading) setSubmitted(false);
    };
    window.addEventListener(POSTCODE_STATUS_EVENT, onStatus);
    return () => window.removeEventListener(POSTCODE_STATUS_EVENT, onStatus);
  }, [submitted]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = postcode.trim();
    if (!trimmed || loading) return;
    setError(null);
    setLoading(true);
    setSubmitted(true);
    // Defer so the status listener above is registered before the search starts
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent<PostcodeSearchDetail>(POSTCODE_SEARCH_EVENT, {
          detail: { postcode: trimmed },
        }),
      );
    }, 0);
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
              onChange={(e) => {
                setPostcode(e.target.value.toUpperCase());
                if (error) setError(null);
              }}
              placeholder={placeholder}
              aria-label={label ? undefined : "Enter your postcode"}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${id}-error` : undefined}
              autoComplete="postal-code"
              maxLength={10}
              required
              disabled={loading}
              className="w-full bg-transparent py-3.5 text-base text-slate-900 outline-none placeholder:text-slate-500 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !postcode.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F7BE2E] px-6 py-3.5 text-base font-bold text-[#0B2F5B] transition-colors hover:bg-[#F2B015] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-l-none"
          >
            {loading ? (
              <>
                <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                Searching…
              </>
            ) : (
              <>
                Check Availability
                <ArrowRight aria-hidden className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-3 rounded-xl border border-red-300/60 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </form>
  );
}

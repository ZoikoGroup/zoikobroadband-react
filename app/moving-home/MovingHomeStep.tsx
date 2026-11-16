"use client";

import { useState, useCallback } from "react";
import type { FormattedAddress } from "@/app/context/CartContext";
import Image from "next/image";
import {
  Home,
  Info,
  ArrowRight,
  Check,
  Headphones,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

type JourneyStep = {
  id: number;
  label: string;
  href: string;
};

type NextStep = {
  label: string;
  value: string;
};

const journey: readonly JourneyStep[] = [
  { id: 1, label: "New address", href: "#" },
  { id: 2, label: "Check availability", href: "#" },
  { id: 3, label: "Review options & costs", href: "#" },
  { id: 4, label: "Confirm your move", href: "#" },
] as const;

const nextSteps: readonly NextStep[] = [
  { label: "1. Address qualification", value: "Check available services" },
  { label: "2. Your options", value: "Plan, timing and costs" },
  { label: "3. Your confirmation", value: "Only after you review" },
] as const;

type Choice = "yes" | "no" | null;

export default function MovingHomeStep() {
  const [postcode, setPostcode] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [both, setBoth] = useState<Choice>(null);

  const [addresses, setAddresses] = useState<FormattedAddress[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<FormattedAddress | null>(null);

  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // ─── Postcode search ─────────────────────────────────────────────

  const handlePostcodeSearch = useCallback(async () => {
    const trimmed = postcode.trim().toUpperCase();

    if (!trimmed) {
      setSearchError("Please enter a postcode.");
      return;
    }

    setLoadingAddresses(true);
    setSearchError(null);
    setAddresses([]);
    setSelectedAddress(null);

    try {
      const res = await fetch("/api/BritishTelecom/search-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postcode: trimmed,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSearchError(data.message ?? "Failed to find addresses.");
        return;
      }

      const results: FormattedAddress[] = data.addresses ?? [];

      if (results.length === 0) {
        setSearchError("No addresses found for this postcode.");
        return;
      }

      setAddresses(results);
    } catch (error) {
      console.error("Postcode search error:", error);
      setSearchError("Network error. Please try again.");
    } finally {
      setLoadingAddresses(false);
    }
  }, [postcode]);

  // ─── Icons ───────────────────────────────────────────────────────

  const StepIcon: IconType = Home;
  const SupportIcon: IconType = Headphones;
  const ShieldIcon: IconType = ShieldCheck;
  const CalIcon: IconType = Calendar;

  return (
    <main className="w-full bg-[#F4F7FB] pb-16">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#0F2A4A] pb-12">
        <div className="absolute inset-y-0 right-0 hidden w-[55%] md:block">
          <Image
            src="/Images/flow/9.png"
            alt="Moving home broadband router"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A] via-[#0F2A4A]/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1100px] px-4 pt-12 pb-8 sm:px-8 sm:pt-16 lg:px-[34px]">
          <h1 className="max-w-[420px] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Moving home? Let&apos;s get you connected.
          </h1>

          <p className="mt-4 max-w-[400px] text-sm leading-6 text-[#D6E0EE]">
            Tell us where you&apos;re moving and when. We&apos;ll check
            broadband availability at your new address before you make any
            changes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-[34px]">
        {/* Journey stepper */}
        <div className="relative z-10 -mt-5 flex flex-col gap-3 rounded-xl border border-[#E1E7EF] bg-white px-5 py-3.5 shadow-[0_4px_16px_rgba(15,42,74,0.08)] md:flex-row md:items-center md:gap-6">
          <span className="text-xs font-bold text-[#0F2A4A] sm:text-sm">
            Your moving-home journey
          </span>

          <ol className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2">
            {journey.map((s, i) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  className={`flex items-center gap-2 text-xs ${
                    i === 0 ? "font-bold text-[#0F2A4A]" : "text-[#6B7A90]"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      i === 0
                        ? "bg-[#FFC800] text-[#0F2A4A]"
                        : "bg-[#E8EDF4] text-[#6B7A90]"
                    }`}
                  >
                    {s.id}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Card 1 */}
            <div className="rounded-xl border border-[#E1E7EF] bg-white shadow-[0_4px_16px_rgba(15,42,74,0.06)]">
              <div className="flex items-center justify-between border-b border-[#E8EDF4] px-5 py-3">
                <h2 className="flex items-center gap-2 text-sm font-extrabold text-[#0F2A4A] sm:text-base">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F2A4A] text-[10px] font-bold text-white">
                    1
                  </span>
                  Your existing broadband service
                </h2>

                <span className="text-xs text-[#6B7A90]">
                  From your MyZoiko account
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between rounded-lg border border-[#E1E7EF] bg-[#F4F7FB] p-4">
                  <div>
                    <p className="text-xs text-[#6B7A90]">
                      Current service address
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#0F2A4A]">
                      Your address on file
                    </p>

                    <a
                      href="#"
                      className="mt-1 inline-block text-xs font-semibold text-[#12436F] underline"
                    >
                      View full address in MyZoiko
                    </a>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#DDF5E6] px-3 py-1 text-xs font-bold text-[#12A150]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                    Service active
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#6B7A90]">
                  This is read only — we won&apos;t change or cancel your
                  current service while you check your options.
                </p>
              </div>
            </div>

            {/* Card 2: New address */}
            <div className="rounded-xl border border-[#E1E7EF] bg-white shadow-[0_4px_16px_rgba(15,42,74,0.06)]">
              <div className="flex items-center justify-between border-b border-[#E8EDF4] px-5 py-3">
                <h2 className="flex items-center gap-2 text-sm font-extrabold text-[#0F2A4A] sm:text-base">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F2A4A] text-[10px] font-bold text-white">
                    2
                  </span>
                  Where are you moving to?
                </h2>

                <span className="text-xs text-[#6B7A90]">
                  We&apos;ll check your exact property
                </span>
              </div>

              <div className="p-5">
                {/* Postcode input */}
                <label
                  htmlFor="postcode"
                  className="text-xs font-bold text-[#0F2A4A]"
                >
                  New address postcode <span className="text-[#C8102E]">*</span>
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="postcode"
                    type="text"
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.target.value.toUpperCase());
                      setAddresses([]);
                      setSelectedAddress(null);
                      setSearchError(null);
                    }}
                    placeholder="e.g. SW1A 1AA"
                    maxLength={10}
                    disabled={loadingAddresses}
                    className="h-10 flex-1 rounded-md border border-[#D5DDE8] bg-white px-3 text-sm text-[#0F2A4A] placeholder:text-[#9AA7B8] focus:outline-none focus:ring-2 focus:ring-[#FFC800] disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={handlePostcodeSearch}
                    disabled={loadingAddresses || !postcode.trim()}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#FFC800] px-5 text-sm font-bold text-[#0F2A4A] shadow-[0_4px_10px_rgba(255,200,0,0.35)] transition-colors hover:bg-[#FFD633] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loadingAddresses ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0F2A4A] border-t-transparent" />
                        Searching...
                      </>
                    ) : (
                      <>
                        Find my address
                        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-[#6B7A90]">
                  Enter your new postcode, then select the exact property from
                  the address list.
                </p>

                {/* Search error */}
                {searchError && (
                  <p
                    role="alert"
                    className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {searchError}
                  </p>
                )}

                {/* Address results */}
                {addresses.length > 0 && (
                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#0F2A4A]">
                        Select your new address
                      </h3>

                      <span className="text-xs text-[#6B7A90]">
                        {addresses.length} addresses found
                      </span>
                    </div>

                    <div className="flex max-h-[320px] flex-col gap-2 overflow-y-auto">
                      {addresses.map((addr, index) => {
                        const isSelected = selectedAddress === addr;

                        return (
                          <button
                            key={
                              addr.id || addr.uprn || `${addr.display}-${index}`
                            }
                            type="button"
                            onClick={() => setSelectedAddress(addr)}
                            aria-pressed={isSelected}
                            className={`w-full rounded-lg border p-4 text-left transition-all ${
                              isSelected
                                ? "border-[#12436F] bg-[#EAF1F8] ring-1 ring-[#12436F]"
                                : "border-[#D5DDE8] bg-white hover:border-[#12436F]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-[#0F2A4A]">
                                  {addr.display}
                                </p>

                                <p className="mt-1 text-xs text-[#6B7A90]">
                                  {[addr.city, addr.postcode]
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>
                              </div>

                              {isSelected ? (
                                <Check className="h-5 w-5 shrink-0 text-[#12436F]" />
                              ) : (
                                <span className="h-5 w-5 shrink-0 rounded-full border border-[#B5C1D1]" />
                              )}
                            </div>

                            {addr.qualifier && (
                              <span className="mt-2 inline-block text-xs font-semibold text-[#6B7A90]">
                                {addr.qualifier} property
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected address confirmation */}
                {selectedAddress && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />

                      <p className="text-xs font-bold text-green-700">
                        Address selected successfully
                      </p>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-[#0F2A4A]">
                      {selectedAddress.display}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedAddress(null)}
                      className="mt-2 text-xs font-semibold text-[#12436F] underline"
                    >
                      Change selected address
                    </button>
                  </div>
                )}

                {/* Moving date and both addresses */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="text-xs font-bold text-[#0F2A4A]"
                    >
                      Preferred moving date
                    </label>

                    <div className="relative mt-2">
                      <input
                        id="date"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Select a date"
                        className="h-10 w-full rounded-md border border-[#D5DDE8] bg-white px-3 pr-9 text-sm text-[#0F2A4A] placeholder:text-[#9AA7B8] focus:outline-none focus:ring-2 focus:ring-[#FFC800]"
                      />

                      <CalIcon
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7A90]"
                        strokeWidth={2}
                      />
                    </div>

                    <p className="mt-2 text-xs text-[#6B7A90]">
                      This is a preference, not a confirmed activation date.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#0F2A4A]">
                      Will you need service at both addresses?
                    </p>

                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {(["yes", "no"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setBoth(v)}
                          className={`flex h-10 items-center gap-2 rounded-md border px-3 text-sm text-[#0F2A4A] ${
                            both === v
                              ? "border-[#12436F] bg-[#EAF1F8]"
                              : "border-[#D5DDE8] bg-white"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              both === v
                                ? "border-[#12436F]"
                                : "border-[#B5C1D1]"
                            }`}
                          >
                            {both === v ? (
                              <span className="h-2 w-2 rounded-full bg-[#12436F]" />
                            ) : null}
                          </span>

                          {v === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Information notice */}
                <div className="mt-5 flex gap-3 rounded-lg border border-[#C9DCF0] bg-[#EAF2FB] p-4">
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#12436F]"
                    strokeWidth={2}
                  />

                  <p className="text-xs leading-[18px] text-[#33445C]">
                    Availability, any installation needs, switching arrangements
                    and whether your phone number can transfer, plus any
                    possible charges, will be confirmed after your new address
                    has been checked.{" "}
                    <strong className="text-[#0F2A4A]">
                      Please don&apos;t cancel your existing service yet.
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
              <a
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#12436F] bg-white px-5 text-sm font-bold text-[#12436F] transition-colors hover:bg-[#EAF1F8]"
              >
                <span aria-hidden="true">&larr;</span>
                Back to MyZoiko
              </a>

              <button
                type="button"
                disabled={!selectedAddress}
                onClick={() => {
                  // Connect this action to your move/qualification workflow.
                  console.log("Selected new address:", selectedAddress);
                  console.log("Preferred moving date:", date);
                  console.log("Service needed at both addresses:", both);
                }}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#FFC800] px-7 text-sm font-bold text-[#0F2A4A] shadow-[0_4px_10px_rgba(255,200,0,0.35)] transition-colors hover:bg-[#FFD633] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check new address availability
              </button>
            </div>
          </div>

          {/* Right column */}
          <aside className="flex flex-col gap-5">
            {/* Moving request */}
            <div className="overflow-hidden rounded-xl border border-[#E1E7EF] bg-white shadow-[0_4px_16px_rgba(15,42,74,0.06)]">
              <div className="flex items-center gap-2 bg-[#12436F] px-4 py-3 text-sm font-bold text-white">
                <StepIcon className="h-4 w-4" strokeWidth={2} />
                Your moving request
              </div>

              <div className="p-4">
                <ul className="space-y-3">
                  {[
                    {
                      label: "Current broadband",
                      value: "Active",
                      tone: "green" as const,
                    },
                    {
                      label: "New address",
                      value: selectedAddress?.display ?? "Not selected yet",
                      tone: "default" as const,
                    },
                    {
                      label: "Preferred move date",
                      value: date || "Not selected yet",
                      tone: "default" as const,
                    },
                  ].map((r) => (
                    <li
                      key={r.label}
                      className="flex items-start justify-between gap-3 text-xs"
                    >
                      <span className="shrink-0 text-[#6B7A90]">{r.label}</span>

                      <span
                        className={`max-w-[160px] break-words text-right font-bold ${
                          r.tone === "green"
                            ? "text-[#12A150]"
                            : "text-[#0F2A4A]"
                        }`}
                      >
                        {r.value}
                      </span>
                    </li>
                  ))}

                  <li className="flex items-center justify-between text-xs">
                    <span className="text-[#6B7A90]">
                      New service eligibility
                    </span>

                    <span className="rounded-full bg-[#FFF3CF] px-2 py-[2px] text-[10px] font-bold text-[#7A5A00]">
                      Not checked
                    </span>
                  </li>
                </ul>

                <div className="mt-4 rounded-lg bg-[#EAF2FB] p-3 text-xs leading-[17px] text-[#33445C]">
                  <p className="font-bold text-[#0F2A4A]">
                    No changes have been made.
                  </p>

                  <p className="mt-1">
                    Your current broadband remains unchanged while you check
                    your options.
                  </p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="overflow-hidden rounded-xl border border-[#E1E7EF] bg-white shadow-[0_4px_16px_rgba(15,42,74,0.06)]">
              <div className="flex items-center gap-2 bg-[#12436F] px-4 py-3 text-sm font-bold text-white">
                <Info className="h-4 w-4" strokeWidth={2} />
                What happens next?
              </div>

              <ul className="space-y-3 p-4">
                {nextSteps.map((n) => (
                  <li
                    key={n.label}
                    className="flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="text-[#6B7A90]">{n.label}</span>

                    <span className="text-right font-bold text-[#0F2A4A]">
                      {n.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="rounded-xl border border-[#E1E7EF] bg-white p-4 shadow-[0_4px_16px_rgba(15,42,74,0.06)]">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#0F2A4A]">
                <SupportIcon
                  className="h-4 w-4 text-[#12436F]"
                  strokeWidth={2}
                />
                Need help moving home?
              </h3>

              <p className="mt-2 text-xs leading-[17px] text-[#4B5D75]">
                Our UK support team can guide you through availability,
                appointments and service changes.
              </p>

              <a
                href="#"
                className="mt-3 flex h-10 items-center justify-center gap-2 rounded-lg border border-[#12436F] bg-white text-sm font-bold text-[#12436F] transition-colors hover:bg-[#EAF1F8]"
              >
                Speak to our support team
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>

              <p className="mt-3 text-[11px] leading-4 text-[#6B7A90]">
                Installation appointments and service continuity depend on the
                new property&apos;s eligibility and available engineering
                capacity.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom notice */}
        <div className="mt-8 flex gap-3 rounded-xl border border-[#C9DCF0] bg-[#EAF2FB] p-4">
          <ShieldIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-[#12436F]"
            strokeWidth={2}
          />

          <p className="text-xs leading-[18px] text-[#33445C]">
            <strong className="text-[#0F2A4A]">You&apos;re in control.</strong>{" "}
            Checking a new address does not submit an order, cancel your
            existing connection or take a payment. You&apos;ll only confirm once
            you&apos;ve reviewed the options and any costs.
          </p>
        </div>
      </div>
    </main>
  );
}

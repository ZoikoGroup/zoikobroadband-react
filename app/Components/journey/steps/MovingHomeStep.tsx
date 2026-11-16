"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck, Info } from "lucide-react";
import { MOVING_NEXT, MOVING_STEPS } from "../data/content";
import { searchAddresses } from "../lib/api";
import { useAddressLabel, useJourney } from "../JourneyProvider";
import type { FormattedAddress } from "@/app/context/CartContext";
import { ActionButton, Card, CardTitle, inputClass } from "../ui";

export default function MovingHomeStep() {
  const { state, go } = useJourney();
  const currentAddress = useAddressLabel();
  const [postcode, setPostcode] = useState("");
  const [results, setResults] = useState<FormattedAddress[]>([]);
  const [chosen, setChosen] = useState<FormattedAddress | null>(null);
  const [date, setDate] = useState("");
  const [both, setBoth] = useState<"yes" | "no">("no");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const find = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setChosen(null);
    setChecked(false);
    try {
      const res = await searchAddresses(postcode);

      // Safely handle whether the API returns a direct array or a wrapped object
      const addressList = Array.isArray(res)
        ? res
        : (res as any)?.addresses || (res as any)?.data || [];

      setResults(addressList);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const summary = [
    {
      id: "current",
      label: "Current broadband",
      value: state.plan ? "Active" : "—",
    },
    {
      id: "new",
      label: "New address",
      value: chosen ? chosen.display : "Not selected yet",
    },
    {
      id: "date",
      label: "Preferred move date",
      value: date || "Not selected yet",
    },
    {
      id: "elig",
      label: "New service eligibility",
      value: checked ? "Available" : "Not checked",
    },
  ] as const;

  return (
    <div className="space-y-5">
      <ol className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-[#e3e8f0] bg-white px-5 py-3">
        <li className="text-sm font-bold text-[#0b2a5b]">
          Your moving-home journey
        </li>
        {MOVING_STEPS.map((label, i) => (
          <li
            key={label}
            className={`flex items-center gap-2 text-sm ${i === (checked ? 1 : 0) ? "font-bold text-[#0b2a5b]" : "text-[#5b6578]"}`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${i === (checked ? 1 : 0) ? "bg-[#fbb82b] text-[#0b2a5b]" : "border border-[#cfd6e2]"}`}
            >
              {i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardTitle n={1}>Your existing broadband service</CardTitle>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#f6f8fc] p-4">
              <div>
                <p className="text-sm text-[#5b6578]">
                  Current service address
                </p>
                <p className="text-sm font-bold text-[#0b2a5b]">
                  {currentAddress || "Your address on file"}
                </p>
              </div>
              <span className="rounded-full bg-[#d9f7e4] px-3 py-1 text-sm font-bold text-[#168a45]">
                Service active
              </span>
            </div>
            <p className="mt-3 text-sm text-[#5b6578]">
              This is read only — we won&apos;t change or cancel your current
              service while you check your options.
            </p>
          </Card>

          <Card>
            <CardTitle n={2}>Where are you moving to?</CardTitle>
            <form onSubmit={find} className="mt-4">
              <label
                htmlFor="new-postcode"
                className="block text-sm font-bold text-[#0b2a5b]"
              >
                New address postcode *
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="new-postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="e.g. SW1A 1AA"
                  maxLength={10}
                  className={`${inputClass} flex-1`}
                />
                <ActionButton
                  type="submit"
                  disabled={loading || !postcode.trim()}
                >
                  {loading ? "Searching…" : "Find my address"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ActionButton>
              </div>
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </form>

            {results.length > 0 && (
              <select
                aria-label="Select your new address"
                className={`${inputClass} mt-4`}
                value={chosen ? results.indexOf(chosen) : ""}
                onChange={(e) => {
                  setChosen(results[Number(e.target.value)]);
                  setChecked(false);
                }}
              >
                <option value="" disabled>
                  Select an address
                </option>
                {results.map((a, i) => (
                  <option key={a.id || a.uprn || `${a.display}-${i}`} value={i}>
                    {[a.display, a.city, a.postcode].filter(Boolean).join(", ")}
                  </option>
                ))}
              </select>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="move-date"
                  className="block text-sm font-bold text-[#0b2a5b]"
                >
                  Preferred moving date *
                </label>
                <input
                  id="move-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${inputClass} mt-2`}
                />
              </div>
              <fieldset>
                <legend className="text-sm font-bold text-[#0b2a5b]">
                  Will you need service at both addresses?
                </legend>
                <div className="mt-3 flex gap-6">
                  {(["yes", "no"] as const).map((v) => (
                    <label
                      key={v}
                      className="flex items-center gap-2 text-sm capitalize text-[#0b2a5b]"
                    >
                      <input
                        type="radio"
                        name="both"
                        checked={both === v}
                        onChange={() => setBoth(v)}
                        className="accent-[#0b2a5b]"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <p className="mt-4 flex items-start gap-3 rounded-lg bg-[#e8f0fd] p-3 text-sm text-[#0b2a5b]">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-[#2a5bd7]"
                aria-hidden="true"
              />
              Availability, any installation needs, switching arrangements and
              whether your phone number can transfer, plus any possible charges,
              will be confirmed after your new address has been checked. Please
              don&apos;t cancel your existing service yet.
            </p>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <ActionButton variant="outline" onClick={() => go("myzoiko")}>
              ← Back to MyZoiko
            </ActionButton>
            <ActionButton
              disabled={!chosen || !date}
              onClick={() => setChecked(true)}
            >
              Check new address availability
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ActionButton>
          </div>

          <p className="flex items-start gap-3 rounded-xl border border-[#e3e8f0] bg-[#f6f8fc] p-4 text-sm text-[#5b6578]">
            <CircleCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-[#2a5bd7]"
              aria-hidden="true"
            />
            <span>
              <strong className="text-[#0b2a5b]">
                You&apos;re in control.
              </strong>{" "}
              Checking a new address does not submit an order, cancel your
              existing connection or take a payment. You&apos;ll only confirm
              once you&apos;ve reviewed the options and any costs.
            </span>
          </p>
        </div>

        <aside className="space-y-5">
          <div className="overflow-hidden rounded-xl border border-[#e3e8f0] bg-white shadow-sm">
            <h3 className="bg-[#0b2a5b] px-5 py-3 text-base font-bold text-white">
              Your moving request
            </h3>
            <dl className="space-y-3 p-5 text-sm">
              {summary.map((s) => (
                <div key={s.id} className="flex justify-between gap-3">
                  <dt className="text-[#5b6578]">{s.label}</dt>
                  <dd className="text-right font-bold text-[#0b2a5b]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              What happens next?
            </h3>
            <ol className="mt-3 space-y-2">
              {MOVING_NEXT.map((item, i) => (
                <li key={item} className="text-sm text-[#0b2a5b]">
                  {i + 1}. {item}
                </li>
              ))}
            </ol>
          </Card>
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Need help moving home?
            </h3>
            <p className="mt-2 text-sm text-[#5b6578]">
              Our UK support team can guide you through availability,
              appointments and service changes.
            </p>
            <ActionButton
              variant="outline"
              href="/contact"
              className="mt-3 w-full"
            >
              Speak to our support team →
            </ActionButton>
          </Card>
        </aside>
      </div>
    </div>
  );
}

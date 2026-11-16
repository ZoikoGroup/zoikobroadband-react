"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Info,
  Lock,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import type { FormattedAddress } from "@/app/context/CartContext";
import { CONTROL_POINTS, JARGON } from "../data/content";
import { searchAddresses } from "../lib/api";
import { useJourney } from "../JourneyProvider";
import {
  ActionButton,
  Card,
  CardTitle,
  CheckList,
  ChoiceCard,
  PageTitle,
  TwoColumn,
  inputClass,
} from "../ui";

const AUDIENCES = [
  {
    id: "home",
    title: "Home",
    text: "Residential broadband for your household",
  },
  {
    id: "business",
    title: "Business",
    text: "Broadband for a company or premises",
  },
] as const;

export default function AvailabilityStep() {
  const { state, patch, go, loadPlans } = useJourney();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, addresses } = state;

  const find = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.postcode.trim()) return;
    setLoading(true);
    setError(null);
    patch({ addresses: [], address: null, plan: null, plans: [] });
    try {
      const res = await searchAddresses(state.postcode);
      
      // Safely handle whether the API returns a direct array or a wrapped object
      const addressList = Array.isArray(res)
        ? res
        : (res as any)?.addresses || (res as any)?.data || [];

      patch({ addresses: addressList });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const choose = (id: string) => {
    const picked: FormattedAddress | undefined = addresses.find(
      (a, i) => (a.id || a.uprn || `${a.display}-${i}`) === id,
    );
    if (!picked) return;
    patch({ address: picked, plan: null });
    loadPlans(picked, state.contract);
  };

  const technologies = Array.from(
    new Set(state.plans.map((p) => p.technology)),
  );
  const techList = technologies.length ? technologies : (["FTTP"] as const);

  return (
    <>
      <PageTitle>Check availability</PageTitle>
      <div className="mt-6">
        <TwoColumn
          main={
            <>
              <Card>
                <CardTitle n={1}>Who is this broadband for?</CardTitle>
                <p className="mt-1 text-sm text-[#5b6578]">
                  Your answer tailors the plans, switching rules and contract
                  terms we show you.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {AUDIENCES.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      name="audience"
                      checked={state.customerType === item.id}
                      onChange={() => patch({ customerType: item.id })}
                      title={item.title}
                      description={item.text}
                    />
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle n={2}>Find your address</CardTitle>
                <form onSubmit={find} className="mt-4">
                  <label
                    htmlFor="postcode"
                    className="block text-sm font-bold text-[#0b2a5b]"
                  >
                    Postcode *
                  </label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="postcode"
                      value={state.postcode}
                      onChange={(e) =>
                        patch({ postcode: e.target.value.toUpperCase() })
                      }
                      maxLength={10}
                      placeholder="e.g. SW1A 1AA"
                      className={`${inputClass} flex-1`}
                    />
                    <ActionButton
                      type="submit"
                      disabled={loading || !state.postcode.trim()}
                    >
                      {loading ? "Searching…" : "Find my address"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ActionButton>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#5b6578]">
                    <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    We only use your postcode to check coverage — nothing is
                    ordered at this stage.
                  </p>
                </form>

                {error && (
                  <p
                    role="alert"
                    className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {error}
                  </p>
                )}

                {addresses.length > 0 && (
                  <div className="mt-5">
                    <label
                      htmlFor="exact-address"
                      className="block text-sm font-bold text-[#0b2a5b]"
                    >
                      Select your exact address *
                    </label>
                    <select
                      id="exact-address"
                      className={`${inputClass} mt-2`}
                      value={
                        address
                          ? address.id ||
                            address.uprn ||
                            `${address.display}-${addresses.indexOf(address)}`
                          : ""
                      }
                      onChange={(e) => choose(e.target.value)}
                    >
                      <option value="" disabled>
                        Select an address
                      </option>
                      {addresses.map((a, i) => {
                        const key = a.id || a.uprn || `${a.display}-${i}`;
                        return (
                          <option key={key} value={key}>
                            {[a.display, a.city, a.postcode]
                              .filter(Boolean)
                              .join(", ")}
                          </option>
                        );
                      })}
                    </select>
                    <p className="mt-2 text-sm text-[#5b6578]">
                      Pick the exact property — coverage can differ
                      flat-by-flat, so a postcode alone isn&apos;t enough.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-2 inline-block text-sm font-bold text-[#2a5bd7]"
                    >
                      Can&apos;t find your address? Enter it manually
                    </Link>
                  </div>
                )}
              </Card>

              {address && (
                <div className="rounded-xl border border-[#b7e4c7] bg-[#eaf7ee] p-5">
                  <p className="flex items-center gap-3 text-base font-bold text-[#0b2a5b]">
                    <CircleCheck
                      className="h-6 w-6 fill-[#1f9d55] text-white"
                      aria-hidden="true"
                    />
                    Good news — we can connect this address
                  </p>
                  <p className="mt-2 text-sm text-[#0b2a5b]">
                    The following technologies are available at{" "}
                    <strong>
                      {[address.display, address.city, address.postcode]
                        .filter(Boolean)
                        .join(", ")}
                    </strong>
                    :
                  </p>
                  <ul className="mt-3 flex flex-wrap items-center gap-2">
                    {techList.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-[#b7e4c7] bg-white px-3 py-1 text-sm font-semibold text-[#1f9d55]"
                      >
                        {tech === "FTTP" ? "Full Fibre (FTTP)" : "SoGEA"}
                      </li>
                    ))}
                    <li>
                      <Link
                        href="#fibre-jargon"
                        className="flex items-center gap-1 text-sm font-bold text-[#2a5bd7]"
                      >
                        <Info className="h-4 w-4" aria-hidden="true" />
                        What&apos;s this?
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <ActionButton variant="outline" href="/">
                  ← Back to home
                </ActionButton>
                <ActionButton
                  disabled={!address || state.plansLoading}
                  onClick={() => go("plans")}
                >
                  Continue to compare plans
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ActionButton>
              </div>
            </>
          }
          aside={
            <>
              <div className="rounded-xl border border-[#cfe0fb] bg-[#e8f0fd] p-5">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#0b2a5b]">
                  <ShieldCheck
                    className="h-5 w-5 text-[#2a5bd7]"
                    aria-hidden="true"
                  />
                  You&apos;re in control
                </h3>
                <div className="mt-3">
                  <CheckList items={CONTROL_POINTS} />
                </div>
              </div>

              <Card>
                <h3
                  id="fibre-jargon"
                  className="flex items-center gap-2 text-base font-bold text-[#0b2a5b]"
                >
                  <Info className="h-5 w-5 text-[#2a5bd7]" aria-hidden="true" />
                  Fibre jargon, explained
                </h3>
                <dl className="mt-3 space-y-3">
                  {JARGON.map((item) => (
                    <div key={item.term}>
                      <dt className="text-sm font-bold text-[#0b2a5b]">
                        {item.term}
                      </dt>
                      <dd className="text-sm text-[#5b6578]">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              <Card>
                <h3 className="text-base font-bold text-[#0b2a5b]">
                  Can&apos;t see your address?
                </h3>
                <p className="mt-2 text-sm text-[#5b6578]">
                  If your property isn&apos;t listed or coverage looks
                  uncertain, our UK team can check it with you.
                </p>
                <ActionButton
                  variant="outline"
                  href="/contact"
                  className="mt-4 w-full"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Chat to our team
                </ActionButton>
              </Card>
            </>
          }
        />
      </div>
    </>
  );
}
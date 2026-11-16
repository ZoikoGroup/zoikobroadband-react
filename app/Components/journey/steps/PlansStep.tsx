"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Gauge,
  Infinity as InfinityIcon,
  Repeat,
  Router,
  ScrollText,
  Wifi,
} from "lucide-react";
import {
  PLAN_BADGES,
  PLAN_BENEFITS,
  PLAN_FACTS,
  PLAN_FEATURES,
  PLAN_TAGLINES,
  ROUTER_INCLUDES,
} from "../data/content";
import { formatDownload, money } from "../lib/format";
import { useJourney } from "../JourneyProvider";
import { ActionButton, PageTitle, Spinner } from "../ui";

const FILTERS = [
  { id: "all", label: "All plans" },
  { id: "FTTP", label: "Full Fibre (FTTP)" },
  { id: "SoGEA", label: "SoGEA (Fibre to the cabinet)" },
] as const;

const FACT_ICONS = [Gauge, InfinityIcon, Wifi, ScrollText, Repeat] as const;

export default function PlansStep() {
  const { state, patch, go } = useJourney();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [compare, setCompare] = useState(false);

  const available = state.plans
    .filter((p) => p.available)
    .filter((p) => filter === "all" || p.technology === filter);
  const featuredIndex = available.length === 3 ? 1 : -1;

  return (
    <>
      <PageTitle>Choose your broadband plan</PageTitle>
      <p className="mt-2 text-base text-[#5b6578]">
        All our plans come with a reliable connection, a Zoiko router and expert
        UK support.
      </p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PLAN_BENEFITS.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-lg border border-[#e3e8f0] bg-[#f6f8fc] px-4 py-3 text-sm font-semibold text-[#0b2a5b]"
          >
            <Check className="h-4 w-4 text-[#1f9d55]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Technology filter"
          className="flex flex-wrap gap-2 rounded-full bg-[#f1f4f9] p-1"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={
                filter === f.id
                  ? "rounded-full bg-[#0b2a5b] px-4 py-2 text-sm font-bold text-white"
                  : "rounded-full px-4 py-2 text-sm font-semibold text-[#0b2a5b]"
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0b2a5b]">
          Compare plans
          <input
            type="checkbox"
            role="switch"
            checked={compare}
            onChange={() => setCompare((v) => !v)}
            className="h-5 w-9 cursor-pointer accent-[#0b2a5b]"
          />
        </label>
      </div>

      {state.plansLoading && (
        <div className="flex items-center justify-center gap-3 py-16 text-sm text-[#5b6578]">
          <Spinner /> Checking available plans…
        </div>
      )}
      {state.plansError && (
        <p
          role="alert"
          className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.plansError}
        </p>
      )}
      {!state.plansLoading && !state.plansError && available.length === 0 && (
        <p className="py-12 text-center text-base text-[#5b6578]">
          No plans found for this address. Try a different address or
          technology.
        </p>
      )}

      {available.length > 0 && (
        <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {available.slice(0, 3).map((plan, i) => {
            const featured = i === featuredIndex;
            const selected = state.plan?.id === plan.id;
            const features = PLAN_FEATURES[i % PLAN_FEATURES.length];
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-xl bg-white p-5 shadow-sm ${
                  selected || featured
                    ? "border-2 border-[#fbb82b] shadow-lg"
                    : "border border-[#e3e8f0]"
                }`}
              >
                {featured && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fbb82b] px-3 py-1 text-sm font-bold text-[#0b2a5b]">
                    Most popular
                  </span>
                )}
                <h3 className="text-base font-bold text-[#0b2a5b]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-[#5b6578]">
                  {PLAN_TAGLINES[i % PLAN_TAGLINES.length]}
                </p>

                <div className="mt-4 rounded-lg bg-[#2a5bd7] px-4 py-3 text-white">
                  <p className="flex items-center gap-2 text-base font-bold">
                    <Wifi className="h-4 w-4" aria-hidden="true" />
                    Up to {formatDownload(plan.download)}
                  </p>
                  <p className="text-sm text-white/80">
                    Average download speed
                  </p>
                </div>

                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#0b2a5b]">
                    {money(plan.price)}
                  </span>
                  <span className="text-sm text-[#5b6578]">/month</span>
                </p>
                <p className="text-sm text-[#5b6578]">
                  {plan.contractMonths}-month contract
                </p>
                <p className="mt-2 w-fit rounded-full bg-[#ece6fb] px-3 py-1 text-sm font-semibold text-[#5b3fc4]">
                  {PLAN_BADGES[i % PLAN_BADGES.length]}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[#0b2a5b]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#1f9d55]"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                  {compare && (
                    <li className="border-t border-[#e3e8f0] pt-2 text-sm text-[#5b6578]">
                      Upload up to {formatDownload(plan.upload)} ·{" "}
                      {plan.technology === "FTTP" ? "Full Fibre" : "SoGEA"}
                    </li>
                  )}
                </ul>

                <ActionButton
                  variant={featured ? "primary" : "outline"}
                  onClick={() =>
                    patch({ plan, routerId: "wifi6", extraIds: [] })
                  }
                  className="mt-5 w-full"
                >
                  {selected
                    ? `Choose ${plan.name.replace(/^Zoiko\s+/i, "")}`
                    : `Choose ${plan.name.replace(/^Zoiko\s+/i, "")}`}
                  {!selected && (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                </ActionButton>
              </article>
            );
          })}

          <aside className="flex flex-col items-center justify-between rounded-xl bg-[#0b2a5b] p-5 text-center text-white">
            <div className="relative h-[130px] w-full">
              <Image
                src="/Images/flow/router-plan.png"
                alt="The Zoiko Router"
                fill
                sizes="240px"
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="mt-3 text-lg font-bold">
                Included with every plan
              </h3>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                <Router className="h-4 w-4" aria-hidden="true" />
                The Zoiko Router
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-left">
              {ROUTER_INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check
                    className="h-4 w-4 text-[#7be0a4]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      <ul className="mt-10 grid gap-4 border-y border-[#e3e8f0] py-5 sm:grid-cols-2 lg:grid-cols-5">
        {PLAN_FACTS.map((fact, i) => {
          const Icon = FACT_ICONS[i];
          return (
            <li key={fact.id} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ece6fb] text-[#5b3fc4]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-[#0b2a5b]">
                  {fact.title}
                </span>
                <span className="block text-sm text-[#5b6578]">
                  {fact.text}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <ActionButton variant="outline" onClick={() => go("availability")}>
          ← Back to availability
        </ActionButton>
        <ActionButton disabled={!state.plan} onClick={() => go("personalise")}>
          Continue to personalise
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ActionButton>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-[#0b2a5b] to-[#1b4fb8] p-5 text-white">
        <div>
          <p className="text-lg font-bold">Switch to Zoiko Broadband</p>
          <p className="text-sm text-white/80">
            Changing provider is simple. We&apos;ll manage the switch and keep
            you connected.
          </p>
        </div>
        <Link
          href="/faqs"
          className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0b2a5b]"
        >
          Learn about switching →
        </Link>
      </div>
    </>
  );
}

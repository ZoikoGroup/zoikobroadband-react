"use client";

import { ChevronRight } from "lucide-react";
import { DASH_ACTIONS, DASH_LINKS, DASH_NAV } from "../data/content";
import { addDays, fmtDate, money } from "../lib/format";
import { useAddressLabel, useJourney, usePricing } from "../JourneyProvider";
import { ActionButton, Card } from "../ui";

export default function MyZoikoStep() {
  const { state, go } = useJourney();
  const { monthly } = usePricing();
  const address = useAddressLabel();
  const plan = state.plan;
  const name = state.details.firstName || "there";
  const created = state.order?.createdAt ?? new Date().toISOString();
  const planName = plan
    ? `Zoiko ${plan.name.replace(/^Zoiko\s+/i, "")} – ${plan.technology === "FTTP" ? "Full Fibre" : "SoGEA"}`
    : "";

  const speeds = [
    { id: "usage", value: "Unlimited", label: "Data this month" },
    { id: "down", value: "Up to 500", label: "Mbps · plan download" },
    { id: "up", value: "Up to 500", label: "Mbps · plan upload" },
  ] as const;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[220px_1fr]">
      <nav
        aria-label="MyZoiko"
        className="rounded-xl bg-[#0b2a5b] p-3 text-white"
      >
        <ul className="space-y-1">
          {DASH_NAV.map((item, i) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => item === "Sign Out" && go("availability")}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${
                  i === 0 ? "bg-[#fbb82b] text-[#0b2a5b]" : "text-white/85"
                }`}
              >
                {item}
                {item === "Messages" && (
                  <span className="rounded-full bg-[#e6007e] px-2 text-sm font-bold text-white">
                    2
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 space-y-5">
        <h2 className="text-2xl font-extrabold text-[#0b2a5b]">
          Good evening, {name}
        </h2>

        <Card className="flex flex-wrap items-center justify-between gap-3 !p-4 text-sm">
          <p className="text-[#5b6578]">
            Here&apos;s your Zoiko Broadband account at a glance.
          </p>
          <p className="text-[#5b6578]">
            Account number{" "}
            <strong className="text-[#0b2a5b]">
              {state.order?.ref ?? "—"}
            </strong>
          </p>
          <p className="text-[#5b6578]">
            Service address{" "}
            <strong className="text-[#0b2a5b]">{address}</strong>
          </p>
          <span className="rounded-full bg-[#d9f7e4] px-3 py-1 font-bold text-[#168a45]">
            Active
          </span>
        </Card>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr_0.8fr]">
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Your Broadband
            </h3>
            <p className="mt-2 text-sm font-bold text-[#0b2a5b]">{planName}</p>
            <p className="rounded-lg bg-[#eaf7ee] p-3 mt-3 text-sm text-[#168a45]">
              Service active · Activated {fmtDate(addDays(created, 9))}
            </p>
            <ActionButton
              variant="outline"
              onClick={() => go("tracking")}
              className="mt-3 !py-2"
            >
              Run speed test
            </ActionButton>
          </Card>
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Your usage &amp; speed
            </h3>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              {speeds.map((s) => (
                <div key={s.id}>
                  <dd className="text-sm font-bold text-[#0b2a5b]">
                    {s.value}
                  </dd>
                  <dt className="text-sm text-[#5b6578]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">Need help?</h3>
            <p className="mt-1 text-sm text-[#5b6578]">
              Get support quickly and easily.
            </p>
            <div className="mt-3 space-y-2">
              <ActionButton href="/contact" className="w-full !py-2">
                Live chat
              </ActionButton>
              <ActionButton
                variant="outline"
                href="tel:08003214321"
                className="w-full !py-2"
              >
                Call us 0800 321 4321
              </ActionButton>
              <ActionButton
                variant="outline"
                href="/faqs"
                className="w-full !py-2"
              >
                Help Centre
              </ActionButton>
            </div>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr]">
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Billing &amp; Payments
            </h3>
            <p className="mt-3 text-2xl font-extrabold text-[#0b2a5b]">
              {money(monthly)}{" "}
              <span className="text-sm font-normal text-[#5b6578]">
                / month
              </span>
            </p>
            <p className="text-sm text-[#5b6578]">
              Next payment: {fmtDate(addDays(created, 40))}
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">Your Plan</h3>
            <p className="mt-3 text-sm font-bold text-[#0b2a5b]">{planName}</p>
            <p className="text-sm text-[#5b6578]">
              Contract: {plan?.contractMonths} months · Ends{" "}
              {fmtDate(addDays(created, (plan?.contractMonths ?? 24) * 30))}
            </p>
          </Card>
          <div className="rounded-xl border border-[#b7e4c7] bg-[#eaf7ee] p-5">
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Service status
            </h3>
            <p className="mt-2 text-sm text-[#168a45]">
              All services are running normally.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {DASH_ACTIONS.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => a.id === "move" && go("moving")}
                className="flex h-full w-full flex-col items-center rounded-xl border border-[#e3e8f0] bg-white p-4 text-center shadow-sm"
              >
                <span className="text-sm font-bold text-[#0b2a5b]">
                  {a.label}
                </span>
                {a.text && (
                  <span className="text-sm text-[#5b6578]">{a.text}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#5b6578]">
          Also available:
          {DASH_LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => l.id === "move" && go("moving")}
              className="font-semibold text-[#2a5bd7]"
            >
              {l.label}
            </button>
          ))}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-[#e8dcfb] to-[#d5e4fb] p-5">
          <div>
            <p className="text-base font-bold text-[#0b2a5b]">
              Make the most of your connection
            </p>
            <p className="text-sm text-[#5b6578]">
              Explore add-ons, device upgrades and exclusive Zoiko deals.
            </p>
          </div>
          <ActionButton variant="dark" href="/bt-broadband">
            Explore deals{" "}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

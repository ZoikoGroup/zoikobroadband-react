"use client";

import { Check, Circle, Truck } from "lucide-react";
import { TIMELINE, TRACKING_HELP } from "../data/content";
import { addDays, fmtDate, fmtShort, money } from "../lib/format";
import { useAddressLabel, useJourney, usePricing } from "../JourneyProvider";
import { ActionButton, Card, TwoColumn } from "../ui";

export default function TrackingStep() {
  const { state, go } = useJourney();
  const { monthly, router } = usePricing();
  const address = useAddressLabel();
  const created = state.order?.createdAt ?? new Date().toISOString();
  const install = addDays(created, 9);
  const plan = state.plan;

  const status = [
    { id: "ref", label: "Order reference", value: state.order?.ref ?? "—" },
    { id: "status", label: "Status", value: "Being set up (not yet live)" },
    { id: "billing", label: "Billing starts", value: "On activation" },
  ] as const;

  const header = [
    { id: "ref", label: "Order reference", value: state.order?.ref ?? "—" },
    { id: "install", label: "Installation date", value: fmtDate(install) },
    { id: "addr", label: "Installation address", value: address },
  ] as const;

  return (
    <TwoColumn
      main={
        <>
          <Card className="!border-[#cfe0fb] !bg-[#eef4ff]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-[#0b2a5b]">
                <Truck className="h-5 w-5 text-[#2a5bd7]" aria-hidden="true" />
                Equipment on the way
              </h2>
              <span className="rounded-full bg-[#fbb82b] px-3 py-1 text-sm font-bold text-[#0b2a5b]">
                Order accepted · In progress
              </span>
            </div>
            <p className="mt-2 text-sm text-[#5b6578]">
              Your order has been accepted by the network and your router has
              been dispatched. Your engineer appointment is confirmed — no
              action is needed right now.
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {header.map((h) => (
                <div key={h.id}>
                  <dt className="text-sm text-[#5b6578]">{h.label}</dt>
                  <dd className="text-sm font-bold text-[#0b2a5b]">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-[#0b2a5b]">
              Your order timeline
            </h3>
            <ol className="mt-5">
              {TIMELINE.map((item, i) => (
                <li
                  key={item.id}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {i < TIMELINE.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[11px] top-7 h-[calc(100%-1.75rem)] w-0.5 bg-[#cfd6e2]"
                    />
                  )}
                  <span
                    className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      item.status === "done"
                        ? "bg-[#1f9d55] text-white"
                        : item.status === "current"
                          ? "bg-[#2a5bd7] text-white"
                          : "border-2 border-[#cfd6e2] bg-white text-[#cfd6e2]"
                    }`}
                  >
                    {item.status === "pending" ? (
                      <Circle className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <p
                      className={`text-sm font-bold ${item.status === "current" ? "text-[#2a5bd7]" : "text-[#0b2a5b]"}`}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm text-[#5b6578]">
                      {fmtShort(addDays(created, item.offset))}
                      {item.text && ` · ${item.text}`}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <h3 className="text-base font-bold text-[#0b2a5b]">
                Your engineer appointment
              </h3>
              <p className="mt-3 text-sm font-bold text-[#0b2a5b]">
                {fmtDate(install)}{" "}
                <span className="rounded-full bg-[#d9f7e4] px-2 py-0.5 text-sm text-[#168a45]">
                  Confirmed
                </span>
              </p>
              <p className="text-sm text-[#5b6578]">
                Arrival window: 8:00 am – 1:00 pm
              </p>
              <p className="mt-3 rounded-lg bg-[#fff6dc] p-3 text-sm text-[#7a5a00]">
                Someone aged 18+ needs to be home for the full window to give
                the engineer access.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-bold text-[#0b2a5b]">
                Your router delivery
              </h3>
              <p className="mt-3 text-sm font-bold text-[#0b2a5b]">
                {router.name}
              </p>
              <p className="text-sm text-[#5b6578]">Included with your plan</p>
              <p className="mt-2 text-sm text-[#5b6578]">
                Dispatched via Royal Mail Tracked 48. Estimated delivery:{" "}
                {fmtShort(addDays(created, 5))}.
              </p>
            </Card>
          </div>

          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">Going live</h3>
            <p className="mt-2 text-sm text-[#5b6578]">
              Your broadband isn&apos;t active yet. On your activation date
              we&apos;ll place your service on the network, run connection
              tests, and confirm once everything passes.
            </p>
            <p className="mt-3 rounded-lg bg-[#fff6dc] p-3 text-sm text-[#7a5a00]">
              For your security, your Wi-Fi network name and password are shown
              here — you&apos;ll find them on the base of your router when it
              arrives.
            </p>
          </Card>
        </>
      }
      aside={
        <>
          <div className="overflow-hidden rounded-xl border border-[#e3e8f0] bg-white shadow-sm">
            <h3 className="bg-[#0b2a5b] px-5 py-3 text-base font-bold text-white">
              Your order
            </h3>
            <div className="space-y-3 p-5 text-sm">
              <p className="flex justify-between gap-3 text-[#0b2a5b]">
                <span>
                  {plan ? `Zoiko ${plan.name.replace(/^Zoiko\s+/i, "")}` : ""}
                </span>
                <span className="font-bold">{money(monthly)}</span>
              </p>
              {status.map((s) => (
                <p
                  key={s.id}
                  className="flex justify-between gap-3 text-[#5b6578]"
                >
                  <span>{s.label}</span>
                  <span className="font-bold text-[#0b2a5b]">{s.value}</span>
                </p>
              ))}
            </div>
          </div>
          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Manage or get help
            </h3>
            <div className="mt-4 space-y-3">
              {TRACKING_HELP.map((h) => (
                <ActionButton
                  key={h.id}
                  variant={h.primary ? "primary" : "outline"}
                  href={
                    h.id === "chat"
                      ? "/contact"
                      : h.id === "call"
                        ? "tel:08003214321"
                        : undefined
                  }
                  onClick={
                    h.id === "connected" ? () => go("connected") : undefined
                  }
                  className="w-full"
                >
                  {h.label}
                </ActionButton>
              ))}
            </div>
          </Card>
        </>
      }
    />
  );
}

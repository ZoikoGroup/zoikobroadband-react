"use client";

import {
  Calendar,
  Check,
  FileText,
  Mail,
  MapPin,
  Truck,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { CONFIRMED_BENEFITS, NEXT_STEPS } from "../data/content";
import { addDays, fmtDate, money } from "../lib/format";
import { useAddressLabel, useJourney, usePricing } from "../JourneyProvider";
import { SummaryCard } from "../PackageParts";
import { ActionButton, Card, CheckList, TwoColumn } from "../ui";

const ICONS: Record<(typeof NEXT_STEPS)[number]["icon"], LucideIcon> = {
  check: Check,
  calendar: Calendar,
  truck: Truck,
  wifi: Wifi,
};

export default function ConfirmationStep() {
  const { state, go } = useJourney();
  const { monthly } = usePricing();
  const address = useAddressLabel();
  const created = state.order?.createdAt ?? new Date().toISOString();

  const facts = [
    {
      id: "ref",
      icon: FileText,
      label: "Your order number",
      value: state.order?.ref ?? "—",
    },
    {
      id: "date",
      icon: Calendar,
      label: "Installation date",
      value: fmtDate(addDays(created, 9)),
    },
    { id: "addr", icon: MapPin, label: "Installation address", value: address },
  ] as const;

  return (
    <TwoColumn
      main={
        <>
          <Card className="grid gap-5 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.id} className="flex items-start gap-3">
                <f.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#2a5bd7]"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm text-[#5b6578]">{f.label}</p>
                  <p className="text-sm font-bold text-[#0b2a5b]">{f.value}</p>
                </div>
              </div>
            ))}
          </Card>

          <section>
            <h2 className="text-2xl font-extrabold text-[#0b2a5b]">
              What happens next?
            </h2>
            <ol className="relative mt-5 grid gap-5 sm:grid-cols-4">
              <span
                aria-hidden="true"
                className="absolute left-[12%] right-[12%] top-5 hidden h-0.5 bg-[#cfe6d8] sm:block"
              />
              {NEXT_STEPS.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <li
                    key={s.id}
                    className="relative flex flex-col items-center text-center"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${i === 0 ? "bg-[#1f9d55]" : "border-2 border-[#1f9d55] bg-white text-[#1f9d55]"}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-[#0b2a5b]">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#5b6578]">{s.text}</p>
                  </li>
                );
              })}
            </ol>
          </section>

          <p className="flex items-start gap-3 rounded-xl border border-[#cfe0fb] bg-[#e8f0fd] p-4 text-sm text-[#0b2a5b]">
            <Mail
              className="mt-0.5 h-4 w-4 shrink-0 text-[#2a5bd7]"
              aria-hidden="true"
            />
            <span>
              <strong>
                We&apos;ve sent a confirmation email to {state.details.email}
              </strong>
              <br />
              You&apos;ll also receive SMS updates about your order, delivery
              and installation.
            </span>
          </p>

          <Card>
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Manage your order
            </h3>
            <p className="mt-1 text-sm text-[#5b6578]">
              Track, change or get support for your order anytime.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ActionButton variant="dark" onClick={() => go("tracking")}>
                Track my order
              </ActionButton>
              <ActionButton variant="outline" onClick={() => go("switching")}>
                Change installation date
              </ActionButton>
              <ActionButton variant="outline" onClick={() => go("myzoiko")}>
                Create MyZoiko account
              </ActionButton>
            </div>
          </Card>
        </>
      }
      aside={
        <>
          <SummaryCard title="Your confirmed order" />
          <div className="rounded-xl bg-[#fbb82b] p-4 text-center text-[#0b2a5b]">
            <p className="text-base font-bold">
              Place order — monthly charges apply
            </p>
            <p className="text-sm font-medium">
              {money(0)} payable today · then {money(monthly)} / month
            </p>
          </div>
          <div className="rounded-xl border border-[#cfe0fb] bg-[#e8f0fd] p-5">
            <h3 className="text-base font-bold text-[#0b2a5b]">
              Set up for a great experience
            </h3>
            <div className="mt-3">
              <CheckList items={CONFIRMED_BENEFITS} />
            </div>
          </div>
        </>
      }
    />
  );
}

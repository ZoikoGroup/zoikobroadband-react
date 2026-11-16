"use client";

import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import { PAYMENT_OPTIONS } from "../data/content";
import { money } from "../lib/format";
import { useAddressLabel, useJourney, usePricing } from "../JourneyProvider";
import { PlanBar } from "../PackageParts";
import {
  ActionButton,
  Card,
  CardTitle,
  ChoiceCard,
  TwoColumn,
  inputClass,
} from "../ui";

const FIELDS = [
  {
    id: "firstName",
    label: "First name *",
    type: "text",
    autoComplete: "given-name",
  },
  {
    id: "lastName",
    label: "Last name *",
    type: "text",
    autoComplete: "family-name",
  },
  {
    id: "email",
    label: "Email address *",
    type: "email",
    autoComplete: "email",
  },
  { id: "phone", label: "Contact number *", type: "tel", autoComplete: "tel" },
] as const;

type FieldId = (typeof FIELDS)[number]["id"];

export default function DetailsStep() {
  const { state, patch, go } = useJourney();
  const { router, extras, planPrice, monthly } = usePricing();
  const address = useAddressLabel();
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});
  const plan = state.plan;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<FieldId, string>> = {};
    FIELDS.forEach((f) => {
      if (!state.details[f.id].trim()) next[f.id] = "This field is required.";
    });
    if (state.details.email && !/^\S+@\S+\.\S+$/.test(state.details.email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    patch({
      order: {
        ref: `ZB-${Math.floor(10000000 + Math.random() * 89999999)}`,
        createdAt: new Date().toISOString(),
      },
    });
    go("confirmation");
  };

  const rows = [
    {
      id: "plan",
      label: plan
        ? `Zoiko ${plan.name.replace(/^Zoiko\s+/i, "")} - ${plan.technology === "FTTP" ? "Full Fibre (FTTP)" : "SoGEA"}`
        : "",
      value: money(planPrice),
    },
    {
      id: "router",
      label: router.name,
      value: router.price ? money(router.price) : "Included",
    },
    ...extras.map((e) => ({ id: e.id, label: e.name, value: money(e.price) })),
  ];

  return (
    <div className="space-y-5">
      <PlanBar />
      <TwoColumn
        main={
          <form
            id="details-form"
            onSubmit={submit}
            noValidate
            className="space-y-5"
          >
            <Card>
              <CardTitle n={1}>Your details</CardTitle>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-sm font-bold text-[#0b2a5b]"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      value={state.details[f.id]}
                      onChange={(e) =>
                        patch({
                          details: { ...state.details, [f.id]: e.target.value },
                        })
                      }
                      aria-invalid={Boolean(errors[f.id])}
                      className={`${inputClass} mt-2`}
                    />
                    {errors[f.id] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[f.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <label className="mt-4 flex items-start gap-3 text-sm text-[#0b2a5b]">
                <input
                  type="checkbox"
                  checked={state.details.marketing}
                  onChange={(e) =>
                    patch({
                      details: {
                        ...state.details,
                        marketing: e.target.checked,
                      },
                    })
                  }
                  className="mt-0.5 h-4 w-4 accent-[#0b2a5b]"
                />
                Keep me updated with Zoiko offers and news.
              </label>
            </Card>

            <Card>
              <CardTitle n={2}>Service &amp; installation address</CardTitle>
              <div className="mt-3 flex items-start justify-between gap-3">
                <p className="text-sm font-bold text-[#0b2a5b]">{address}</p>
                <button
                  type="button"
                  onClick={() => go("availability")}
                  className="flex items-center text-sm font-bold text-[#2a5bd7]"
                >
                  Change <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 text-sm text-[#5b6578]">
                This is the verified address from your availability check.
                Changing it re-checks availability and may change your plan and
                price.
              </p>
            </Card>

            <Card>
              <CardTitle n={3}>Billing address</CardTitle>
              <label className="mt-3 flex items-center gap-3 text-sm text-[#0b2a5b]">
                <input
                  type="checkbox"
                  checked={state.billingSame}
                  onChange={(e) => patch({ billingSame: e.target.checked })}
                  className="h-4 w-4 accent-[#0b2a5b]"
                />
                My billing address is the same as my service address
              </label>
            </Card>

            <Card>
              <CardTitle n={4}>How would you like to pay?</CardTitle>
              <p className="mt-1 text-sm text-[#5b6578]">
                Your monthly charges are collected by Direct Debit. Payment
                details are captured securely by our payment provider — Zoiko
                never stores your card or bank details.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {PAYMENT_OPTIONS.map((opt) => (
                  <ChoiceCard
                    key={opt.id}
                    name="payment"
                    checked={state.payment === opt.id}
                    onChange={() => patch({ payment: opt.id })}
                    title={opt.title}
                    description={opt.text}
                    badge={
                      opt.recommended ? (
                        <span className="rounded-full bg-[#d9f7e4] px-2 py-0.5 text-sm font-bold text-[#168a45]">
                          Recommended
                        </span>
                      ) : undefined
                    }
                  />
                ))}
              </div>
              <p className="mt-4 flex items-start gap-3 rounded-lg bg-[#e8f0fd] p-3 text-sm text-[#0b2a5b]">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#2a5bd7]"
                  aria-hidden="true"
                />
                Setting up a new Direct Debit mandate authorises future monthly
                payments — it is not an immediate charge. You&apos;re protected
                by the Direct Debit Guarantee.
              </p>
            </Card>

            <ActionButton
              variant="outline"
              onClick={() => go("switching")}
              className="!border-0 !px-0 text-[#2a5bd7]"
            >
              ← Back to Switching &amp; Installation
            </ActionButton>
          </form>
        }
        aside={
          <>
            <div className="overflow-hidden rounded-xl border border-[#e3e8f0] bg-white shadow-sm">
              <h3 className="bg-[#0b2a5b] px-5 py-3 text-base font-bold text-white">
                Your order
              </h3>
              <div className="space-y-3 p-5 text-sm">
                {rows.map((r) => (
                  <p
                    key={r.id}
                    className="flex justify-between gap-3 text-[#0b2a5b]"
                  >
                    <span>{r.label}</span>
                    <span className="font-bold">{r.value}</span>
                  </p>
                ))}
                <p className="flex justify-between border-t border-[#e3e8f0] pt-3 text-base font-bold text-[#0b2a5b]">
                  <span>Monthly total</span>
                  <span>{money(monthly)}</span>
                </p>
                <p className="flex justify-between text-[#5b6578]">
                  <span>Contract length</span>
                  <span className="font-bold text-[#0b2a5b]">
                    {plan?.contractMonths} months
                  </span>
                </p>
                <p className="flex justify-between text-[#5b6578]">
                  <span>Price after {plan?.contractMonths} months</span>
                  <span className="font-bold text-[#0b2a5b]">
                    {money(monthly)} / month
                  </span>
                </p>
                <p className="flex justify-between text-[#5b6578]">
                  <span>One-off charges</span>
                  <span className="font-bold text-[#0b2a5b]">{money(0)}</span>
                </p>
                <p className="flex justify-between border-t border-[#e3e8f0] pt-3 font-bold text-[#0b2a5b]">
                  <span>Payable today</span>
                  <span>{money(0)}</span>
                </p>
              </div>
            </div>
            <p className="rounded-xl bg-[#f6f8fc] p-4 text-sm leading-5 text-[#5b6578]">
              Before you order, please read our Contract Information and
              Contract Summary. They set out your price, minimum term,
              early-exit terms and cancellation rights.
            </p>
            <ActionButton
              type="submit"
              form="details-form"
              className="w-full !rounded-xl !py-4"
            >
              <span className="text-left">
                <span className="block text-base">Next</span>
                <span className="block text-sm font-medium">
                  {money(0)} payable today · then {money(monthly)} / month
                </span>
              </span>
            </ActionButton>
            <p className="text-sm text-[#5b6578]">
              You have a 14-day cooling-off period in line with UK regulations.
            </p>
          </>
        }
      />
    </div>
  );
}

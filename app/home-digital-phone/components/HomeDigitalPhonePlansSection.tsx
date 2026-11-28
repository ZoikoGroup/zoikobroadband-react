import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

interface PlanSpec {
  label: string;
  value: string;
}

interface HomeDigitalPhonePlan {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  unitLabel: string;
  metaCaption: string;
  specs: readonly PlanSpec[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

const HOME_DIGITAL_PHONE_PLANS: readonly HomeDigitalPhonePlan[] = [
  {
    id: "home-digital-phone-payg",
    eyebrow: "Home Digital Phone",
    title: "Home Digital Phone",
    description: "A digital landline with pay-as-you-go calls.",
    price: "£8",
    unitLabel: "/mo incl. VAT",
    metaCaption: "Monthly · incl. VAT · sample",
    specs: [
      { label: "Calls", value: "Pay as you go" },
      { label: "Your number", value: "Keep yours (porting check)" },
      { label: "Handset", value: "Use your handset via router" },
      { label: "Setup", value: "£0" },
    ],
    primaryCtaLabel: "Check availability first",
    primaryCtaHref: "#check-availability",
    secondaryCtaLabel: "Ask a question",
    secondaryCtaHref: "#ask-about-home-digital-phone",
  },
  {
    id: "home-digital-phone-uk-calls",
    eyebrow: "Home Digital Phone",
    title: "Home Digital Phone + UK calls",
    description: "Add an inclusive UK calls package.",
    price: "£12",
    unitLabel: "/mo incl. VAT",
    metaCaption: "Monthly · incl. VAT · sample",
    specs: [
      { label: "Calls", value: "Inclusive UK calls" },
      { label: "Your number", value: "Keep yours (porting check)" },
      { label: "Handset", value: "Use your handset via router" },
      { label: "Setup", value: "£0" },
    ],
    primaryCtaLabel: "Check availability first",
    primaryCtaHref: "#check-availability",
    secondaryCtaLabel: "Ask a question",
    secondaryCtaHref: "#ask-about-home-digital-phone",
  },
] as const;

export default function HomeDigitalPhonePlansSection() {
  return (
    <section
      id="plan-and-price"
      aria-label="Illustrative Home Digital Phone plans"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Top Illustrative Example Notice Banner */}
        <div className="bg-[#FEF9EC] border border-[#F5E2B8] rounded-2xl px-5 py-4 flex items-start gap-3.5 mb-8 shadow-2xs">
          <div className="w-6 h-6 rounded-full border border-[#B45309]/60 text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>

          <p className="text-xs sm:text-[13px] text-[#5C4618] leading-relaxed">
            <strong className="font-bold text-[#3D2E0E]">
              Illustrative example.
            </strong>{" "}
            These sample Home Digital Phone options show how they&apos;re
            presented. Check your address above to see what can actually be
            offered. Prices include VAT and are confirmed per address.
          </p>
        </div>

        {/* 2-Column Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOME_DIGITAL_PHONE_PLANS.map((plan) => (
            <article
              key={plan.id}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
            >
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0" />
                  <span className="text-[11px] font-bold text-[#B45309] tracking-tight">
                    {plan.eyebrow}
                  </span>
                </div>

                {/* Plan Title & Subtitle */}
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2F52] tracking-tight mb-1.5 leading-snug">
                  {plan.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-5 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Block */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-3xl sm:text-[34px] font-extrabold text-[#0E2F52] tracking-tight leading-none">
                    {plan.price}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {plan.unitLabel}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 pb-5 border-b border-gray-100">
                  {plan.metaCaption}
                </p>

                {/* Key Plan Specs */}
                <dl className="divide-y divide-gray-50 py-3 space-y-2.5 text-xs sm:text-[13px]">
                  {plan.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between gap-4 pt-1 first:pt-0"
                    >
                      <dt className="text-gray-500">{spec.label}</dt>
                      <dd className="font-bold text-[#0E2F52] text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <Link
                  href={plan.primaryCtaHref}
                  className="w-full inline-flex items-center justify-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shadow-2xs"
                >
                  {plan.primaryCtaLabel}
                </Link>

                <Link
                  href={plan.secondaryCtaHref}
                  className="w-full inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 hover:border-gray-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors"
                >
                  {plan.secondaryCtaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Terms Note */}
        <p className="text-center text-[11px] sm:text-xs text-gray-400 mt-7 leading-relaxed">
          Any call charges, package options and terms are set out in full before
          you order — no surprises at checkout.
        </p>
      </div>
    </section>
  );
}

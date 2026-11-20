"use client";

import React from "react";
import { Tag, ArrowRight } from "lucide-react";

interface ChargeItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly statusLabel: string;
}

const CHARGE_ITEMS: readonly ChargeItem[] = [
  {
    id: "installation-charges",
    title: "Installation charges",
    description: "Any connection or engineer charges for your order.",
    statusLabel: "In your order",
  },
  {
    id: "extra-works",
    title: "Extra works",
    description:
      "Additional cabling or building work, quoted before it happens.",
    statusLabel: "In your order",
  },
  {
    id: "access-or-permission-costs",
    title: "Access or permission costs",
    description: "If your building needs specific arrangements.",
    statusLabel: "In your order",
  },
  {
    id: "vat",
    title: "VAT",
    description: "Clearly shown as included or excluded.",
    statusLabel: "In your order",
  },
  {
    id: "contract-terms",
    title: "Contract terms",
    description: "Your term and the support level that applies.",
    statusLabel: "In your order",
  },
];

export interface OnboardingChargesProps {
  readonly quoteHref?: string;
  readonly onRequestQuote?: () => void;
}

export default function OnboardingCharges({
  quoteHref = "#get-ready-together",
  onRequestQuote,
}: OnboardingChargesProps) {
  return (
    <section
      id="charges"
      className="w-full bg-[#061A33] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Step Eyebrow, Heading, Copy & CTA */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                11
              </span>
              <span className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase">
                CHARGES
              </span>
            </div>

            <h2 className="text-white text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-4">
              No surprise costs.
            </h2>

            <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[440px] mb-7">
              We don&apos;t list installation prices here because they depend on
              your order and premises. You&apos;ll see every charge before you
              agree.
            </p>

            <a
              href={quoteHref}
              onClick={() => onRequestQuote?.()}
              className="inline-flex items-center justify-center gap-2 px-6 h-[44px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[13.5px] font-bold transition-colors shadow-[0_4px_14px_rgba(255,193,25,0.22)]"
            >
              <span>Request a tailored quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.3]" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Stacked Charge Transparency Rows */}
          <div className="lg:col-span-7 space-y-3">
            {CHARGE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-[#0F2744] rounded-[14px] border border-white/10 px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-[8px] bg-[#FFC119] flex items-center justify-center shrink-0">
                    <Tag
                      className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-white text-[14px] font-bold leading-[1.3] mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[#94A3B8] text-[12px] leading-[1.45]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#362E14] text-[#FFC119] text-[10.5px] font-bold leading-none shrink-0 self-start sm:self-center whitespace-nowrap">
                  {item.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

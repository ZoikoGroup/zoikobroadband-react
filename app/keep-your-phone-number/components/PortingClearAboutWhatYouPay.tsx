"use client";

import React from "react";
import { Tag, FileCheck2 } from "lucide-react";

interface CostBreakdownRow {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly badgeLabel: string;
}

const COST_BREAKDOWN_ROWS: readonly CostBreakdownRow[] = [
  {
    id: "your-new-phone-service",
    title: "Your new phone service",
    description: "Monthly price and any set-up fees.",
    badgeLabel: "In your quote",
  },
  {
    id: "equipment",
    title: "Equipment",
    description: "Any phone or adaptor you need.",
    badgeLabel: "In your quote",
  },
  {
    id: "your-current-providers-charges",
    title: "Your current provider's charges",
    description: "Notice periods or early-exit fees are set by them.",
    badgeLabel: "In your quote",
  },
  {
    id: "vat",
    title: "VAT",
    description: "Shown clearly as included or excluded.",
    badgeLabel: "In your quote",
  },
];

export interface PortingClearAboutWhatYouPayProps {
  readonly noTransferChargeNote?: string;
  readonly onSelectRow?: (rowId: string) => void;
}

export default function PortingClearAboutWhatYouPay({
  noTransferChargeNote = "[Subject to Compliance approval of the applicable rules]",
  onSelectRow,
}: PortingClearAboutWhatYouPayProps) {
  return (
    <section
      id="clear-about-what-you-pay"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Eyebrow, Heading, Intro & Highlighted No-Charge Callout */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                06
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                COSTS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[440px]">
              Clear about what you pay.
            </h2>

            <p className="text-[#475569] text-[14.5px] leading-[1.55] mb-6 max-w-[440px]">
              We show only approved charges. Anything else is listed separately
              in your quote.
            </p>

            {/* Yellow Highlighted Callout Box */}
            <div className="rounded-[14px] bg-[#FFFDF2] border border-[#F5D97E] p-4 flex items-center gap-3.5 shadow-[0_4px_14px_rgba(255,193,25,0.08)]">
              <span className="w-10 h-10 rounded-[10px] bg-[#FFC119] text-[#0B2241] inline-flex items-center justify-center shrink-0 shadow-2xs">
                <Tag className="w-4.5 h-4.5 stroke-[2.2]" aria-hidden="true" />
              </span>

              <div className="min-w-0">
                <p className="text-[#0B2241] text-[13px] font-extrabold leading-[1.3] mb-0.5">
                  No charge from us just to move your number.
                </p>
                <p className="text-[#64748B] text-[10.5px] leading-[1.45]">
                  {noTransferChargeNote}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Cost Breakdown Rows */}
          <div className="lg:col-span-7 space-y-3">
            {COST_BREAKDOWN_ROWS.map((row) => {
              const isInteractive = Boolean(onSelectRow);

              return (
                <div
                  key={row.id}
                  onClick={
                    isInteractive ? () => onSelectRow?.(row.id) : undefined
                  }
                  className={`rounded-[14px] bg-[#F4F7FA] border border-[#E2E8F0] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-4 transition-colors ${
                    isInteractive
                      ? "cursor-pointer hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-8 h-8 rounded-[8px] bg-white border border-[#E2E8F0] text-[#1963DD] inline-flex items-center justify-center shrink-0">
                      <FileCheck2
                        className="w-4 h-4 stroke-[2.1]"
                        aria-hidden="true"
                      />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-[#0B2241] text-[13.5px] font-extrabold leading-[1.3]">
                        {row.title}
                      </h3>
                      <p className="text-[#64748B] text-[11.5px] leading-[1.45]">
                        {row.description}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[6px] bg-white border border-[#CBD5E1] text-[#0B2241] text-[10.5px] font-bold leading-none shrink-0">
                    {row.badgeLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

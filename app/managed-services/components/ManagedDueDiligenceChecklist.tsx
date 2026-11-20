"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface DueDiligenceItem {
  readonly id: string;
  readonly label: string;
}

const DUE_DILIGENCE_ITEMS: readonly DueDiligenceItem[] = [
  { id: "how-quote-worked-out", label: "How the quote is worked out" },
  { id: "whether-prices-include-vat", label: "Whether prices include VAT" },
  { id: "contract-term-and-renewal", label: "The contract term and renewal" },
  { id: "service-credits-if-any", label: "Service credits, if any" },
  { id: "whats-excluded-from-scope", label: "What's excluded from scope" },
  { id: "who-data-is-shared-with", label: "Who your data is shared with" },
  {
    id: "how-access-removed-when-leaving",
    label: "How access is removed when you leave",
  },
  {
    id: "what-happens-to-data-at-exit",
    label: "What happens to your data at exit",
  },
];

export interface ManagedDueDiligenceChecklistProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly onCheckedChange?: (checkedIds: readonly string[]) => void;
}

export default function ManagedDueDiligenceChecklist({
  imageSrc = "/Images/onb/10.png",
  imageAlt = "Team member smiling in an office with planning notes on a glass board",
  onCheckedChange,
}: ManagedDueDiligenceChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<readonly string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      onCheckedChange?.(next);
      return next;
    });
  };

  const totalCount = DUE_DILIGENCE_ITEMS.length;
  const checkedCount = checkedIds.length;
  const progressPercent =
    totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <section
      id="before-you-sign"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Eyebrow, Heading, Helper Copy & Portrait Photo */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                06
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                BEFORE YOU SIGN
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[400px]">
              Your due-diligence checklist.
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[420px] mb-7">
              Ask for each of these in writing. Tick them off as you go; nothing
              here is saved or sent.
            </p>

            <div className="w-full aspect-[16/10] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_24px_rgba(11,34,65,0.08)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right Column: Interactive Checklist Card */}
          <div className="lg:col-span-7 bg-[#F3F5F8] rounded-[20px] border border-[#E2E8F0]/70 p-6 sm:p-7">
            {/* Card Header + Counter Pill */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <h3 className="text-[#0B2241] text-[16px] sm:text-[17px] font-extrabold leading-[1.3]">
                Ask for these in writing
              </h3>

              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-none shrink-0">
                {checkedCount} of {totalCount}
              </span>
            </div>

            {/* Progress Bar */}
            <div
              role="progressbar"
              aria-valuenow={checkedCount}
              aria-valuemin={0}
              aria-valuemax={totalCount}
              aria-label="Due-diligence checklist completion"
              className="w-full h-1.5 rounded-full bg-[#DCE3EC] overflow-hidden mb-5"
            >
              <div
                className="h-full bg-[#061A33] transition-all duration-200 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {DUE_DILIGENCE_ITEMS.map((item) => {
                const isChecked = checkedIds.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-[10px] border flex items-center gap-3 cursor-pointer select-none transition-all ${
                      isChecked
                        ? "bg-[#FFFDF5] border-[#061A33] text-[#0B2241] shadow-[0_2px_6px_rgba(11,34,65,0.05)]"
                        : "bg-white hover:bg-[#F8FAFC] border-[#E2E8F0] text-[#0B2241]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item.id)}
                      className="sr-only"
                    />

                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? "bg-[#061A33] border-[#061A33] text-[#FFC119]"
                          : "bg-white border-[#CBD5E1]"
                      }`}
                    >
                      {isChecked ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : null}
                    </span>

                    <span
                      className={`text-[12.5px] font-bold leading-[1.35] ${
                        isChecked ? "text-[#0B2241]" : "text-[#0B2241]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

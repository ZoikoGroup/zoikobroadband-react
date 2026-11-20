"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface SlaTermItem {
  readonly id: string;
  readonly label: string;
  readonly plainEnglishSummary: string;
}

const SLA_TERMS: readonly SlaTermItem[] = [
  {
    id: "service-hours",
    label: "Service hours",
    plainEnglishSummary:
      "When support is available for your service. They differ by product and contract.",
  },
  {
    id: "response-time",
    label: "Response time",
    plainEnglishSummary:
      "How quickly we acknowledge and start looking into a reported issue within your service hours—not a guarantee that it is fixed in that time.",
  },
  {
    id: "repair-or-restoration-time",
    label: "Repair or restoration time",
    plainEnglishSummary:
      "Target or committed timeframes to restore service, where specified in your plan or contract, subject to site access and third-party dependencies.",
  },
  {
    id: "when-clock-starts-and-pauses",
    label: "When the clock starts and pauses",
    plainEnglishSummary:
      "When a fault timer begins and when it pauses—such as while waiting on site access, customer testing, or third-party approvals.",
  },
  {
    id: "priority-and-impact",
    label: "Priority and impact",
    plainEnglishSummary:
      "How severity is assessed based on business impact, affected users or critical lines—never invented or assumed without checking your situation.",
  },
  {
    id: "exclusions",
    label: "Exclusions",
    plainEnglishSummary:
      "Situations outside standard SLA cover, such as unapproved changes, local power or wiring faults, or items excluded from your agreement.",
  },
  {
    id: "service-credits",
    label: "Service credits",
    plainEnglishSummary:
      "Any contractual remedies or credits if agreed targets are missed, governed strictly by your written agreement rather than implied automatically.",
  },
  {
    id: "planned-maintenance",
    label: "Planned maintenance",
    plainEnglishSummary:
      "Scheduled updates or network work carried out to keep services healthy, with notice and timing handled according to your terms.",
  },
];

export interface SupportServiceLevelsExplainedProps {
  readonly contractLinked?: boolean;
  readonly onSelectTerm?: (termId: string) => void;
}

export default function SupportServiceLevelsExplained({
  contractLinked = false,
  onSelectTerm,
}: SupportServiceLevelsExplainedProps) {
  const [selectedId, setSelectedId] = useState<string>(
    SLA_TERMS[0]?.id ?? "service-hours",
  );

  const activeTerm =
    SLA_TERMS.find((term) => term.id === selectedId) ?? SLA_TERMS[0];

  const handleSelectTerm = (termId: string) => {
    setSelectedId(termId);
    onSelectTerm?.(termId);
  };

  return (
    <section
      id="service-levels-explained"
      className="w-full bg-[#FFF8E1] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              05
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              SERVICE LEVELS, EXPLAINED
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            The SLA words that matter, in plain English.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Every plan and contract can be different. These terms help you read
            yours.
          </p>
        </div>

        {/* Main 2-Column Layout: Left Term Selector + Right Plain English Card & Contract Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 8-Term Selector List */}
          <div className="lg:col-span-4 bg-white rounded-[18px] border border-[#F1E5B8] p-3.5 shadow-[0_6px_20px_rgba(11,34,65,0.04)]">
            <ul role="listbox" aria-label="SLA terms" className="space-y-1">
              {SLA_TERMS.map((term) => {
                const isSelected = term.id === activeTerm?.id;

                return (
                  <li key={term.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => handleSelectTerm(term.id)}
                      className={`w-full px-4 py-3 rounded-[10px] flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061A33] text-[#FFC119] shadow-[0_4px_12px_rgba(6,26,51,0.16)]"
                          : "bg-transparent hover:bg-[#FFFDF5] text-[#0B2241]"
                      }`}
                    >
                      <span className="text-[12.5px] font-bold leading-[1.35]">
                        {term.label}
                      </span>

                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          isSelected
                            ? "text-[#FFC119] translate-x-0.5"
                            : "text-[#64748B]"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Dark Plain English Card + Unlinked Contract Entitlement Box */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="bg-[#061A33] rounded-[20px] p-6 sm:p-8 lg:p-9 text-white shadow-[0_10px_26px_rgba(6,26,51,0.16)] min-h-[185px] sm:min-h-[205px] flex flex-col justify-center">
              <p className="text-[#FFC119] text-[10.5px] font-extrabold tracking-[0.12em] uppercase mb-2.5">
                PLAIN ENGLISH
              </p>

              <h3 className="text-white text-[22px] sm:text-[25px] font-extrabold leading-[1.2] tracking-[-0.015em] mb-3">
                {activeTerm?.label}
              </h3>

              <p className="text-[#CBD5E1] text-[13.5px] leading-[1.6] max-w-[600px]">
                {activeTerm?.plainEnglishSummary}
              </p>
            </div>

            <div className="bg-[#FFFFFF] rounded-[18px] border border-[#F3E5B5] p-5 sm:p-6 shadow-[0_4px_14px_rgba(11,34,65,0.03)]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-[#0B2241] text-[14.5px] font-extrabold leading-[1.3]">
                  Your contract&apos;s service levels
                </h3>

                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[6px] bg-[#E2E8F0] text-[#334155] text-[10.5px] font-bold leading-none shrink-0">
                  {contractLinked ? "Linked" : "Not linked"}
                </span>
              </div>

              <p className="text-[#64748B] text-[12.5px] leading-[1.55] max-w-[650px]">
                {contractLinked
                  ? "Service level entitlements shown here reflect your linked account agreement."
                  : "We can't show your entitlement here yet. Check your signed agreement, or sign in once your contract details are linked. We never assume a standard tier."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

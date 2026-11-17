"use client";

import React, { useState } from "react";
import { Check, Info } from "lucide-react";

const CONTRACT_CHECKLIST_ITEMS = [
  {
    id: "contract-end-date",
    title: "Your contract end date",
    description: "Check when your current broadband deal ends.",
  },
  {
    id: "early-termination-charges",
    title: "Any early-termination charges",
    description:
      "Leaving before your contract ends may have charges — your current provider can confirm them.",
  },
  {
    id: "equipment-returns",
    title: "Existing equipment returns",
    description:
      "You may need to return your old provider's router or equipment.",
  },
  {
    id: "billing-overlap",
    title: "Possible billing overlap or linked services",
    description:
      "Services may briefly run together, and linked services (like TV or mobile) could be affected.",
  },
] as const;

export default function SwitchBeforeYouSwitchChecklist() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="before-you-switch"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              BEFORE YOU SWITCH
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Check your current contract and charges
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A few minutes here can save a surprise later. Tick these off as you
            check — nothing is saved to an account.
          </p>
        </div>

        {/* Checklist & Advisory Container */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 mb-5">
            {CONTRACT_CHECKLIST_ITEMS.map((item) => {
              const isChecked = Boolean(checkedIds[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-pressed={isChecked}
                  className={`w-full text-left rounded-2xl border p-5 flex items-start gap-4 transition-all cursor-pointer ${
                    isChecked
                      ? "bg-slate-50/80 border-[#0A3A66]/40"
                      : "bg-white border-gray-200/90 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {isChecked && (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm sm:text-base mb-1 transition-colors ${
                        isChecked
                          ? "text-[#0E2F52]/70 line-through"
                          : "text-[#0E2F52]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Info Banner */}
          <div className="bg-[#F4F9FF] border border-[#CBD9E8] rounded-2xl p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#0E2F52] mb-1">
                Who confirms charges?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your current provider can confirm any charges under your
                existing contract. We don&apos;t estimate another
                provider&apos;s fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

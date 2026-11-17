"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const PLAN_DETAILS_ITEMS = [
  {
    title: "Price & billing",
    content:
      "The monthly price and billing frequency, any introductory period and what the price changes to afterwards, shown inclusive of VAT for consumers.",
  },
  {
    title: "Contract & commitment",
    content:
      "Details on the minimum contract term (such as 24 months), cancellation terms, and what happens when your agreement period comes to an end.",
  },
  {
    title: "Installation & activation",
    content:
      "Information on engineer visits (if required for your Part Fibre / SOGEA line), activation timelines, and any setup or activation fees.",
  },
  {
    title: "Equipment",
    content:
      "Details on the Wi-Fi router included with your plan, delivery information, and whether any hardware costs apply.",
  },
  {
    title: "Speed estimates & limitations",
    content:
      "Estimated, minimum guaranteed, and maximum download/upload speeds for your line, along with factors that can affect copper-segment performance.",
  },
] as const;

export default function PartFibrePlanDetails() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="plan-details"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PLAN DETAILS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What every plan shows you
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            No surprise fees. Every Part Fibre plan sets out the same details
            clearly before you choose.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {PLAN_DETAILS_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.title}
                className={`relative bg-white border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? "border-[#F0B429] border-l-4 shadow-xs"
                    : "border-gray-200/90 hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-[#0E2F52]">
                    {item.title}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#0A3A66] text-white"
                        : "bg-[#EFF6FF] text-[#0E2F52]"
                    }`}
                  >
                    {isOpen ? (
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-0 text-sm text-gray-600 leading-relaxed">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

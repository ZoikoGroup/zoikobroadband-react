"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const FULL_FIBRE_DETAILS_ITEMS = [
  {
    title: "Price, billing & VAT",
    content:
      "The monthly price and billing frequency, any introductory price and the basis for future price changes, shown inclusive of VAT for consumers, with a total-term estimate where it can be calculated.",
  },
  {
    title: "Contract term & after the term",
    content:
      "Details on the minimum contract duration (such as 24 months), renewal terms, and what happens once your initial agreement period concludes.",
  },
  {
    title: "Upfront & one-time charges",
    content:
      "Information on any activation fees, delivery costs, or installation charges associated with bringing Full Fibre to your property.",
  },
  {
    title: "Equipment & ONT",
    content:
      "Details on the Optical Network Terminal (ONT) installed inside your premises, the included Wi-Fi router, and connection requirements.",
  },
  {
    title: "Speed estimates & limitations",
    content:
      "Guaranteed minimum speeds, estimated download and upload rates for your specific line, and factors that can influence FTTP performance.",
  },
] as const;

export default function FullFibrePlanDetails() {
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PLAN DETAILS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Understand the offer before you order
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Every Full Fibre plan sets out the full costs, terms and constraints
            — no surprises at checkout.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FULL_FIBRE_DETAILS_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.title}
                className={`relative bg-white border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? "border-[#F0B429] border-l-4 ring-1 ring-[#F0B429] shadow-xs"
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

"use client";

import React, { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "which-plans",
    question: "How do I find out which plans I can get?",
    answer:
      "Enter your business postcode and choose your exact premises. We show only the plans that can be sold at that address.",
  },
  {
    id: "fttp-sogea",
    question: "What is the difference between FTTP and SOGEA?",
    answer:
      "Full Fibre (FTTP) runs fibre all the way to your premises, whereas Part Fibre (SOGEA) runs fibre to the cabinet with a data-only line to your premises.",
  },
  {
    id: "vat-prices",
    question: "Are prices shown with or without VAT?",
    answer:
      "VAT basis and any applicable one-off charges are clearly shown before you agree to your contract summary.",
  },
  {
    id: "static-ip",
    question: "Can I get a static IP address?",
    answer:
      "Yes, static IP addresses are clearly labelled on each plan as included, an optional add-on, or unavailable depending on the product.",
  },
  {
    id: "support-included",
    question: "What support is included?",
    answer:
      "Each business plan details its included support hours, fault response targets, and any optional SLA upgrades prior to checkout.",
  },
] as const;

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("which-plans");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-12 px-6 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1060px]">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1D63DC] mb-2">
          FAQ
        </p>

        {/* Main Heading */}
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[#0F172A] mb-7">
          Common questions
        </h2>

        {/* Accordion List */}
        <div className="max-w-[740px] flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-[12px] border border-[#E2E8F0] bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center text-left px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D63DC] rounded-[12px]"
                >
                  <span
                    className="w-[4px] h-[4px] rounded-full bg-[#0F172A] mr-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] font-bold leading-[1.4] text-[#0F172A]">
                    {item.question}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 pl-[34px]">
                    <p className="text-[13.5px] leading-[1.6] text-[#64748B]">
                      {item.answer}
                    </p>
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

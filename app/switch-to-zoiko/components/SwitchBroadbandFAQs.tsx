"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, ArrowRight } from "lucide-react";

const SWITCH_FAQ_ITEMS = [
  {
    question: "How do I switch broadband to Zoiko?",
    answer:
      "Check eligibility at your address, review the eligible plans and your contract implications, then follow the confirmed order steps. The exact process depends on your current provider and connection.",
  },
  {
    question: "Will I have to cancel my old broadband?",
    answer:
      "Whether your old service is cancelled automatically or requires you to contact your current provider depends on your existing connection type and provider. Do not cancel your old service until your order steps are confirmed.",
  },
  {
    question: "Will I pay an early-termination fee?",
    answer:
      "If you leave your current provider before your minimum contract term ends, early-termination charges may apply. Your current provider can confirm any fees under your existing agreement before you switch.",
  },
  {
    question: "Can I keep my phone number?",
    answer:
      "Keeping your existing phone number may be possible subject to eligibility and published terms, though it cannot be guaranteed in all cases. See our Digital Lines guidance or ask our team before switching.",
  },
  {
    question: "How long does switching take?",
    answer:
      "There's no fixed duration — it depends on your current provider, connection type, and whether an engineer visit is required. We'll confirm the applicable dates during your order.",
  },
  {
    question: "Can I switch when I move home?",
    answer:
      "Yes, though switching as part of a house move requires separate checks for your old and new addresses. Visit our Moving Home guidance to plan around your moving dates.",
  },
  {
    question: "What if full fibre isn't available at my address?",
    answer:
      "If Full Fibre (FTTP) is not yet serviceable at your property, Part Fibre (SOGEA) or other eligible options may be available. Checking your exact postcode will show what is currently supported.",
  },
] as const;

export default function SwitchBroadbandFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HELP &amp; ANSWERS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Frequently asked questions about switching
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: CTA Card & Image */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            {/* Dark Blue Card */}
            <div className="relative rounded-3xl bg-[#0A3A66] p-8 text-white overflow-hidden shadow-lg">
              <div
                className="pointer-events-none absolute -top-16 -right-12 w-52 h-52 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold text-white mb-2.5 relative z-10">
                Prefer to talk it through?
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6 relative z-10">
                Our UK-based team can walk you through switching around your
                contract and your current service. Checking availability never
                creates an order.
              </p>
              <Link
                href="#check-address"
                className="relative z-10 inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3 rounded-xl transition-colors group"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image Card */}
            <div className="relative w-full h-[300px] sm:h-[340px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/Images/switch/2.png"
                alt="Woman speaking on the phone while reviewing broadband details on a laptop"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {SWITCH_FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
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
                      {item.question}
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
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Can I move Zoiko Broadband to a new address?",
    answer:
      "It depends on the service available at the new property and your agreement. Start by checking availability at the new address, then confirm move options through your account or support.",
  },
  {
    question: "Do I need a new broadband plan?",
    answer:
      "If your new home uses a different broadband technology or speed tier than your current property, a new plan may be required. Checking availability at your new postcode will show which eligible plans apply.",
  },
  {
    question: "When should I check availability?",
    answer:
      "Check availability at your new address as soon as you know where you are moving. Giving plenty of notice helps if an engineer visit or new equipment is needed before your moving date.",
  },
  {
    question: "Will my phone number move with me?",
    answer:
      "Keeping your existing phone number may be possible depending on your exchange area, technology type, and published terms. Ask our support team to check eligibility before cancelling or changing anything.",
  },
  {
    question: "What if there's no service at my new home?",
    answer:
      "If we cannot supply broadband at your new property, contact our UK-based support team or sign in to your account to review your agreement terms and discuss your options before making changes.",
  },
  {
    question: "Could moving affect my alarm or telecare device?",
    answer:
      "Yes. Monitored burglar alarms, personal care alarms, and medical alert systems can be affected by moving to a digital line or a different connection type. Always check continuity and compatibility with your alarm provider and our team first.",
  },
] as const;

export default function MovingHomeFAQs() {
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
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HELP &amp; ANSWERS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Moving home FAQs
          </h2>
        </div>

        {/* Highlight Callout Box */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative bg-white border border-[#0A3A66] border-l-4 border-l-[#0A3A66] rounded-2xl px-6 py-5 shadow-xs overflow-hidden">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong className="font-bold text-[#0E2F52]">
                Can I keep my plan when I move?
              </strong>{" "}
              Whether you can keep your plan when moving depends on the service
              available at the new property and the terms of your existing
              agreement. Check availability at the new address, then confirm the
              details through your account or support.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Moving Soon Card & Image */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            {/* Dark Blue Card */}
            <div className="relative rounded-3xl bg-[#0A3A66] p-8 text-white overflow-hidden shadow-lg">
              <div
                className="pointer-events-none absolute -top-16 -right-12 w-52 h-52 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold text-white mb-2.5 relative z-10">
                Moving soon?
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6 relative z-10">
                Our UK-based team can help you plan the move around your dates
                and your current service. Checking availability never creates an
                order.
              </p>
              <Link
                href="#new-address"
                className="relative z-10 inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3 rounded-xl transition-colors group"
              >
                <span>Check my new address</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image Card */}
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/Images/moving/3.png"
                alt="Couple checking broadband availability on a laptop surrounded by packed moving boxes"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`relative bg-white border rounded-2xl transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#F0B429] border-l-3 ring-1 ring-[#F0B429] shadow-xs"
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

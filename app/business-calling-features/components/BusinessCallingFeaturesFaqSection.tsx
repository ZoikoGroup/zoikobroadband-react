"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

interface BusinessFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const BUSINESS_FEATURES_FAQ_ITEMS: readonly BusinessFaqItem[] = [
  {
    id: "are-these-features-available-on-my-plan",
    question: "Are these features available on my plan?",
    answer:
      "Not necessarily. These are candidate capabilities \u2014 availability depends on your plan, account and devices. We confirm what applies to you before anything is set up or billed.",
  },
  {
    id: "how-much-do-call-features-cost",
    question: "How much do call features cost?",
    answer:
      "Charges vary by plan, seat/number/site basis, and whether one-off setup or usage-based call legs apply. Nothing is billed from this page, and your tailored quote sets out the exact pricing basis before you commit.",
  },
  {
    id: "can-i-legally-record-calls",
    question: "Can I legally record calls?",
    answer:
      "Call recording carries strict legal and compliance duties \u2014 including a lawful basis, caller notices, secure storage, retention limits, access controls, and pause/delete safeguards. We won\u2019t enable it casually, and we don\u2019t provide legal advice, so check your obligations and work with our specialists.",
  },
  {
    id: "will-my-phone-work-in-a-power-cut",
    question: "Will my phone work in a power cut?",
    answer:
      "Digital business voice generally relies on working broadband and mains power, so calls \u2014 including 999 emergency calls \u2014 may not work during a power cut or broadband outage. Plan a backup route and tell us in advance if anyone relies on a line, care alarm or telecare device.",
  },
  {
    id: "can-i-keep-my-existing-number-and-features",
    question: "Can I keep my existing number and features?",
    answer:
      "Number porting and feature carry-over depend on line type, eligibility, device compatibility and account configuration. We check what can be transferred or recreated for your setup before anything is switched.",
  },
  {
    id: "what-happens-when-i-request-a-quote",
    question: "What happens when I request a quote?",
    answer:
      "Nothing is activated or ordered automatically. Your enquiry and any selected features are logged with a receipt reference so our business team can review your account, verify compatibility and follow up with clear options.",
  },
] as const;

export default function BusinessCallingFeaturesFaqSection() {
  const [openId, setOpenId] = useState<string | null>(
    "are-these-features-available-on-my-plan",
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
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

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Business calling features, answered
          </h2>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Navy CTA Card + Team Collaboration Image Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Navy CTA Card */}
            <div className="relative bg-gradient-to-br from-[#0E3A63] via-[#0B2D4E] to-[#08223C] text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-md">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  Not sure what you need?
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Tell us how your calls work today and what you&apos;d like to
                  improve &mdash; our business team can map features to your
                  setup. Nothing here activates a service.
                </p>

                <Link
                  href="#request-a-quote"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>Speak to a specialist</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/feat/2.png"
                alt="Business team members joining a multi-participant video and voice call"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {BUSINESS_FEATURES_FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all ${
                    isOpen
                      ? "bg-white border border-[#F59E0B]/70 border-l-4 border-l-[#F59E0B] shadow-xs"
                      : "bg-white border border-gray-200/90 hover:border-gray-300"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-[15px] text-[#0E2F52] leading-snug">
                      {item.question}
                    </span>

                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#0A3A66] text-white"
                          : "bg-[#EEF4FA] text-[#0A3A66]"
                      }`}
                    >
                      {isOpen ? (
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
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

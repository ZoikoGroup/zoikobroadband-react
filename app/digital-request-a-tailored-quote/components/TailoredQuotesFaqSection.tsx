"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

interface TailoredQuoteFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const TAILORED_QUOTES_FAQ_ITEMS: readonly TailoredQuoteFaqItem[] = [
  {
    id: "does-requesting-a-quote-commit-me-to-anything",
    question: "Does requesting a quote commit me to anything?",
    answer:
      "No. It\u2019s a non-binding request. We review your needs and prepare a quote if it\u2019s suitable \u2014 nothing is ordered, activated or ported, and you decide after you see the quote.",
  },
  {
    id: "how-long-does-a-quote-take",
    question: "How long does a quote take?",
    answer:
      "We don\u2019t promise a fixed turnaround time here because multi-site setups, number checks and specialist features take varying time to verify. Once you submit your request, a specialist reviews your requirements and follows up directly.",
  },
  {
    id: "what-will-the-quote-include",
    question: "What will the quote include?",
    answer:
      "If your setup is a good fit, your quote sets out the confirmed feature scope, per-seat/number/site pricing basis, any one-off setup or usage-based elements, VAT basis, and any minimum terms clearly before you commit.",
  },
  {
    id: "i-use-a-care-alarm-or-critical-line-can-you-help",
    question: "I use a care alarm or critical line \u2014 can you help?",
    answer:
      "Tell us before anything is switched if someone relies on a phone line, care alarm, telecare device or critical equipment. Digital voice usually needs working broadband and mains power, so we\u2019ll talk through continuity and backup options rather than assuming an unverified fallback.",
  },
  {
    id: "can-i-keep-my-number",
    question: "Can I keep my number?",
    answer:
      "In many cases yes, depending on line type, number range and account eligibility. Tell us which numbers you want to retain in your request so our team can verify porting options before anything is moved.",
  },
  {
    id: "what-happens-to-my-details",
    question: "What happens to my details?",
    answer:
      "We only use your details to review your request and respond with a quote or next steps, in line with our Privacy Notice. There are no pre-ticked marketing boxes, and nothing is ordered or billed from this page.",
  },
] as const;

export default function TailoredQuotesFaqSection() {
  const [openId, setOpenId] = useState<string | null>(
    "does-requesting-a-quote-commit-me-to-anything",
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
            Tailored quotes, answered
          </h2>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Navy CTA Card + Consultation Visual Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Navy CTA Card */}
            <div className="relative bg-gradient-to-br from-[#0E3A63] via-[#0B2D4E] to-[#08223C] text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-md">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  Prefer to talk?
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Start the request and a specialist will follow up, or ask for
                  a call back. It&apos;s consultative &mdash; nothing is ordered
                  from this page.
                </p>

                <Link
                  href="#start-your-request"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>Start a quote request</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/quote/2.png"
                alt="Specialists reviewing business communications requirements around a conference table"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {TAILORED_QUOTES_FAQ_ITEMS.map((item) => {
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

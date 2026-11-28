"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

const HOME_PHONE_FAQ_ITEMS = [
  {
    id: "what-is-home-digital-phone",
    question: "What is Home Digital Phone?",
    answer:
      "It\u2019s a home phone that works over your broadband instead of a traditional analogue line. Your existing handset usually plugs into the router or an adapter, and you call as normal.",
  },
  {
    id: "can-i-keep-my-phone-number",
    question: "Can I keep my phone number?",
    answer:
      "Often yes, subject to a porting check and eligibility with your current provider. Nothing is ported automatically without checking first, and we confirm what applies once you check your address.",
  },
  {
    id: "will-it-work-in-a-power-cut",
    question: "Will it work in a power cut?",
    answer:
      "If mains power goes out, your router or adapter usually loses power too \u2014 meaning your digital home phone may not work, including for 999 calls. Keep a charged mobile with signal as a backup, and never call 999 to test.",
  },
  {
    id: "what-about-care-alarm-or-telecare",
    question: "What about my care alarm or telecare?",
    answer:
      "Care alarms, telecare, medical alerts and some security or lift systems can depend on how your line is delivered, and a dial tone does not prove they will work after a switch. Speak with both your device supplier and landline provider first \u2014 do not disconnect anything to test.",
  },
  {
    id: "do-i-need-full-fibre",
    question: "Do I need full fibre?",
    answer:
      "Not necessarily in every case, as availability and technical setup depend on your exact home and broadband line. Enter your postcode and select your address above so we can check what can be offered.",
  },
  {
    id: "how-much-does-it-cost",
    question: "How much does it cost?",
    answer:
      "Prices include VAT and are confirmed for your specific address once checked. Any illustrative sample plans shown above are examples only, with full call charges, package options and contract terms set out before you order.",
  },
] as const;

export default function HomeDigitalPhoneFaqSection() {
  const [openId, setOpenId] = useState<string | null>(
    "what-is-home-digital-phone",
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
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
            Home Digital Phone, answered
          </h2>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Navy CTA Card + Digital Interface Image Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Navy CTA Card */}
            <div className="relative bg-gradient-to-br from-[#0E3A63] via-[#0B2D4E] to-[#08223C] text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-md">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  Not sure it&apos;s right for you?
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Check availability, keep your number with a porting check, and
                  sort out any care or alarm devices. Our UK-based team can help
                  with the switch.
                </p>

                <Link
                  href="#check-availability"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/home/2.png"
                alt="Hand touching a smartphone projecting a glowing digital network hub"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {HOME_PHONE_FAQ_ITEMS.map((item) => {
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

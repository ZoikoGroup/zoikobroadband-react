"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

const SETUP_FAQ_ITEMS = [
  {
    id: "how-do-i-set-up",
    question: "How do I set up my digital phone?",
    answer:
      "Check your broadband is on, then connect your phone to the router or adapter using the guide supplied for your equipment — not the old telephone wall socket. When it\u2019s active, test with an ordinary (non-999) call.",
  },
  {
    id: "do-i-need-an-engineer",
    question: "Do I need an engineer?",
    answer:
      "Which install method applies depends on your order. Where an engineer visit is part of your order, you\u2019ll receive confirmed appointment details; where self-setup is supported, you can connect the kit yourself using your model\u2019s guide.",
  },
  {
    id: "how-do-i-know-activated",
    question: "How do I know it\u2019s activated?",
    answer:
      "Check your confirmed order or online account for the authoritative live status (pending, active, or needs attention). A dial tone alone or ticking off a checklist isn\u2019t confirmation of live activation.",
  },
  {
    id: "how-do-i-test-phone",
    question: "How do I test my phone?",
    answer:
      "Once your account shows the service is active, call a normal, non-emergency number to verify outgoing calls, and ask someone to call you back to confirm incoming calls and voicemail. Never call 999 or 112 to test.",
  },
  {
    id: "care-alarm-or-telecare",
    question: "What if I use a care alarm or telecare?",
    answer:
      "Do not set up or disconnect anything until it has been checked. Request an assisted review first, inform both your provider and your device supplier, and have the supplier verify the device after setup.",
  },
  {
    id: "missed-appointment-or-damaged-kit",
    question: "What if my appointment is missed or kit is damaged?",
    answer:
      "Don\u2019t cancel your existing service or improvise with other hardware or rewiring. Contact support using a non-affected phone or online channel to reschedule your visit or arrange replacement kit.",
  },
] as const;

export default function InstallationSetupFaqSection() {
  const [openId, setOpenId] = useState<string | null>("how-do-i-set-up");

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
            Installation &amp; setup, answered
          </h2>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Navy CTA Card + Image Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Navy CTA Card */}
            <div className="relative bg-gradient-to-br from-[#0E3A63] via-[#0B2D4E] to-[#08223C] text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-md">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  Not sure where to start?
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Read the safety panel, run the preparation checklist, then
                  follow the guide for your equipment. If you rely on your line
                  for care or emergencies, get assisted help first.
                </p>

                <Link
                  href="#prepare"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>Find my setup steps</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/setup/2.png"
                alt="Customer reviewing digital voice installation status and setup steps on a mobile device"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {SETUP_FAQ_ITEMS.map((item) => {
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

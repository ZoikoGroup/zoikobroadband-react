"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

const SWITCHING_FAQ_ITEMS = [
  {
    id: "do-anything-right-now",
    question: "Do I have to do anything right now?",
    answer:
      "The switch-off is phased, so there\u2019s usually no need to rush. A genuine move comes with notice. Be wary of any message pressuring you to act urgently or share details \u2014 verify it with your provider using details you already have.",
  },
  {
    id: "keep-phone-number",
    question: "Will I keep my phone number?",
    answer:
      "Keeping your existing number is often possible during a move or provider switch, subject to eligibility and a porting check. Don\u2019t cancel your current service early while a switch or number port is in progress.",
  },
  {
    id: "work-in-power-cut",
    question: "Will my phone work in a power cut?",
    answer:
      "Digital voice needs both power and broadband, so it may not work during a power cut or outage. Keep a backup such as a charged mobile (checking signal where you live) and never call 999 or 112 to test.",
  },
  {
    id: "care-alarm-or-telecare",
    question: "I use a care alarm or telecare \u2014 what should I do?",
    answer:
      "Before switching or disconnecting anything, tell both your landline provider and your device supplier or monitoring company, get an assisted review, and confirm a safe approach.",
  },
  {
    id: "keep-handset",
    question: "Can I keep my handset?",
    answer:
      "Many standard handsets can still be used via your router or an approved adapter, depending on your equipment setup. Follow the guide for your equipment and connect to the router or adapter rather than the old wall socket.",
  },
  {
    id: "move-delayed-or-not-working",
    question: "What if the move is delayed or something doesn\u2019t work?",
    answer:
      "Don\u2019t cancel your existing service on an unconfirmed result. Use Help & Troubleshooting for safe checks, and contact support if anything is unclear \u2014 a self-reported \u201cit works now\u201d doesn\u2019t close a case.",
  },
] as const;

export default function DigitalVoiceSwitchingFaqSection() {
  const [openId, setOpenId] = useState<string | null>("do-anything-right-now");

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
            Moving to digital voice, answered
          </h2>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: CTA Card + Image Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Navy CTA Card */}
            <div className="relative bg-gradient-to-br from-[#0E3A63] via-[#0B2D4E] to-[#08223C] text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-md">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  Not sure where to start?
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Run the readiness check, then sort out your number, equipment
                  and any dependencies. If you rely on your line for care or
                  emergencies, get an assisted review first.
                </p>

                <Link
                  href="#readiness-check"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>Check my readiness</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/digital/3.png"
                alt="Digital voice calling illustration with waveform and microphone icon"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {SWITCHING_FAQ_ITEMS.map((item) => {
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

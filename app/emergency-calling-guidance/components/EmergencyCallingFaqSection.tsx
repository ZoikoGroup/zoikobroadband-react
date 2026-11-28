"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

const EMERGENCY_FAQ_ITEMS = [
  {
    id: "can-i-call-999-digital-phone",
    question: "Can I call 999 on a digital phone?",
    answer:
      "Yes, when you have power and working broadband. If the power or internet is down, the phone may not work — so keep a backup such as a charged mobile. Never call 999 to test.",
  },
  {
    id: "what-if-i-cant-speak-or-hear",
    question: "What if I can\u2019t speak or hear?",
    answer:
      "You can contact 999 using official accessible routes: Relay UK (dial 18000 via the app or textphone), emergencySMS (register in advance by texting \u2018register\u2019 to 999), 999 BSL video relay, or the Silent Solution (press 55 when prompted if you cannot speak).",
  },
  {
    id: "will-my-phone-work-in-a-power-cut",
    question: "Will my phone work in a power cut?",
    answer:
      "If the mains power is off, your router or adapter usually turns off too — meaning your digital phone will not work unless you have an eligible, working battery backup unit (which is time-limited). Keep a charged mobile phone available as a backup for 999.",
  },
  {
    id: "care-alarm-or-telecare-safe",
    question: "I use a care alarm or telecare — is it safe?",
    answer:
      "Care alarms, telecare, medical alert devices, lifts and security systems can depend on your phone line, and a dial tone does not prove they still work. Do not disconnect or switch anything to test — contact your device supplier and landline provider for a qualified safety review.",
  },
  {
    id: "does-999-know-where-i-am",
    question: "Does 999 know where I am?",
    answer:
      "Because a digital phone can be used anywhere with internet access, the registered address held for your line may not match your actual location. Always state your exact location clearly on any emergency call, and keep your registered address up to date with your provider if you move.",
  },
  {
    id: "is-this-page-an-emergency-service",
    question: "Is this page an emergency service?",
    answer:
      "No. This page provides public safety guidance only and cannot contact 999 or emergency services for you. In an emergency, always call 999 (or 112) directly from any working phone.",
  },
] as const;

export default function EmergencyCallingFaqSection() {
  const [openId, setOpenId] = useState<string | null>(
    "can-i-call-999-digital-phone",
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
            Emergency calling, answered
          </h2>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Navy CTA Card + Support Team Image Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Navy CTA Card */}
            <div className="relative bg-gradient-to-br from-[#0E3A63] via-[#0B2D4E] to-[#08223C] text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-md">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  In an emergency
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Always call 999 or 112 from any working phone, including a
                  mobile. If you can&apos;t speak or hear, use the accessible
                  routes above. This page is information only.
                </p>

                <Link
                  href="#accessible-routes"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>Accessible routes</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/calling/2.png"
                alt="Emergency and support operators wearing headsets at computer workstations"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {EMERGENCY_FAQ_ITEMS.map((item) => {
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

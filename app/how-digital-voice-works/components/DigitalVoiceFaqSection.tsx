"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "what-is-digital-voice",
    question: "What is digital voice?",
    answer:
      "Digital voice (VoIP) carries your calls over your broadband instead of a traditional analogue phone line. It usually connects through your router, and is the modern replacement for the old PSTN service being retired.",
  },
  {
    id: "plug-into-wall-socket",
    question: "Do I plug my phone into the wall socket?",
    answer:
      "No — with digital voice, your phone connects to your router or an approved adapter, not the old telephone wall socket or a test socket. Follow the guide provided with your equipment.",
  },
  {
    id: "keep-handset-and-number",
    question: "Can I keep my handset and number?",
    answer:
      "Many standard handsets still work via the router or an adapter, and keeping your existing number is often possible subject to eligibility and a porting check.",
  },
  {
    id: "cost-more",
    question: "Does digital voice cost more?",
    answer:
      "Pricing depends on the specific plan, equipment requirements, and any optional features or add-ons. Check full plan details, setup fees, and contract terms before ordering.",
  },
  {
    id: "power-cut",
    question: "Will it work in a power cut?",
    answer:
      "Digital voice requires both mains power and a working broadband connection, so it may not work during a power cut or outage. Keep a backup such as a charged mobile, and never call 999 or 112 to test.",
  },
  {
    id: "alarm-or-telecare",
    question: "What about my alarm or telecare device?",
    answer:
      "Care alarms, telecare, medical alerts, lifts, and security devices can depend on traditional line characteristics. Speak with both your provider and your device supplier or monitoring company before switching.",
  },
] as const;

export default function DigitalVoiceFaqSection() {
  const [openId, setOpenId] = useState<string | null>("what-is-digital-voice");

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
            Digital voice, answered
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
                  Still have a question?
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Our UK-based team can explain how digital voice works for your
                  setup and help you get ready. If you rely on your line for
                  alarms or emergencies, ask before switching.
                </p>

                <Link
                  href="#readiness"
                  className="inline-flex items-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm group"
                >
                  <span>See the readiness checklist</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#081A2E]">
              <Image
                src="/Images/digital/2.png"
                alt="Smartphone displaying digital voice waveform and microphone icon"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Accordion FAQ List */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((item) => {
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

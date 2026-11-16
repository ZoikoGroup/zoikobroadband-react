"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Will I need an engineer?",
    answer:
      "It depends on the connection at your property and the work already completed. Check availability and your confirmed order to see whether an engineer visit is required.",
  },
  {
    question: "What is an ONT?",
    answer:
      "An Optical Network Terminal (ONT) is a small box fitted inside your home for Full Fibre (FTTP) connections. It converts the fibre-optic light signal into an Ethernet connection that plugs directly into your broadband router.",
  },
  {
    question: "Can I install broadband myself?",
    answer:
      "If your property already has an active ONT or compatible master socket installed, self-setup may be possible by following the instructions supplied with your router. Your confirmed order will state whether self-install or an engineer visit applies.",
  },
  {
    question: "Where should I put my router?",
    answer:
      "Place your router in a central, open spot on a flat, ventilated surface off the floor. Keep it away from thick walls, large metal objects, TVs, and other electronics to help your Wi-Fi signal reach as much of your home as possible.",
  },
  {
    question: "What if I rent my home?",
    answer:
      "If you rent or live in a managed building, you should check with your landlord, letting agent, or property management company before an engineer visit in case drilling or internal cabling permission is needed.",
  },
  {
    question: "When will my connection be active?",
    answer:
      "Your activation date is shown in your confirmed order updates. On activation day, your service can go live at any point up until midnight, so keep your equipment connected and follow your confirmation messages.",
  },
  {
    question: "What should I do if the internet doesn't work?",
    answer:
      "First check that all cables are firmly connected to the right ports and that your ONT or socket and router are powered on. Wait a few minutes after switching on, and if your activation time has passed and you are still offline, try the troubleshooting steps above or contact our UK-based support team.",
  },
  {
    question: "Can my existing phone or alarm be affected?",
    answer:
      "Yes. Full Fibre and Part Fibre (SOGEA) services do not include a traditional analogue landline by default, which can affect telecare devices, care alarms, security alarms, or existing landline handsets. Let us know before installation if you rely on any of these.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "If your confirmed order includes an engineer appointment that you need to move, use Track Your Order or contact support as early as possible so we can arrange a new slot.",
  },
  {
    question: "Can I use my own router?",
    answer:
      "You may be able to use a compatible third-party router that supports your connection type (FTTP WAN or SOGEA VDSL), though our support team can only provide full diagnostics and troubleshooting for equipment supplied with your order.",
  },
] as const;

export default function InstallationFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HELP &amp; ANSWERS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Installation &amp; router FAQs
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Help Card & Image */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            {/* Dark Blue Help Card */}
            <div className="relative rounded-3xl bg-[#0A3A66] p-8 text-white overflow-hidden shadow-lg">
              <div
                className="pointer-events-none absolute -top-16 -right-12 w-52 h-52 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold text-white mb-2.5 relative z-10">
                Still need a hand?
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6 relative z-10">
                Our UK-based team can help before, during and after your
                installation. Your confirmed order is always the source of truth
                for dates and equipment.
              </p>
              <Link
                href="/help-centre"
                className="relative z-10 inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3 rounded-xl transition-colors group"
              >
                <span>Visit the Help Centre</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Tall Image Card */}
            <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/Images/ins/2.png"
                alt="Woman connecting an Ethernet cable to a broadband router on a wooden table"
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

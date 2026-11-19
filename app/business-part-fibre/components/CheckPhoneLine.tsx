"use client";

import React from "react";

interface PhoneLineCheckItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

const PHONE_LINE_CHECKS = [
  {
    id: "your-phone-number",
    title: "Your phone number",
    description:
      "Ask about number porting early if you use a traditional line.",
  },
  {
    id: "card-terminals",
    title: "Card terminals",
    description: "Check whether payment devices use the phone line.",
  },
  {
    id: "alarms-and-fax",
    title: "Alarms and fax",
    description: "Security alarms and fax machines may rely on the line.",
  },
  {
    id: "safety-equipment",
    title: "Safety equipment",
    description: "Lifts and telecare devices need checking before any change.",
  },
] as const satisfies readonly PhoneLineCheckItem[];

export default function CheckPhoneLine() {
  return (
    <section className="w-full bg-[#FF885B] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            BEFORE YOU SWITCH
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] max-w-2xl mb-3.5">
            Check what depends on your phone line
          </h2>

          <p className="text-[#0B2241]/85 text-[15.5px] leading-[1.55]">
            Part Fibre is broadband only. Review these first, so nothing stops
            working after the switch.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {PHONE_LINE_CHECKS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[16px] p-5 sm:p-6 shadow-[0_8px_20px_rgba(11,34,65,0.08)] flex flex-col"
            >
              <span
                aria-hidden="true"
                className="w-[24px] h-[24px] rounded-full bg-[#0B2241] text-white text-[13px] font-bold flex items-center justify-center leading-none mb-5 shrink-0"
              >
                !
              </span>

              <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-2">
                {item.title}
              </h3>

              <p className="text-[#64748B] text-[13px] leading-[1.55]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3.5">
          <a
            href="#"
            aria-label="Keep Your Number"
            className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-[#0B2241] hover:bg-[#143563] text-[#0B2241]/0 select-none text-[13.5px] font-bold transition-colors"
          >
            Keep Your Number
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-[#FF885B] hover:bg-[#F47B4E] border border-[#0B2241] text-[#0B2241] text-[13.5px] font-bold transition-colors"
          >
            Business VoIP / Digital Lines
          </a>
        </div>
      </div>
    </section>
  );
}

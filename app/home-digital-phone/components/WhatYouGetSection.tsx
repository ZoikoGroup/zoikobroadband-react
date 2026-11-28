import React from "react";
import { PhoneCall, Mail, AlignLeft, CreditCard } from "lucide-react";

const WHAT_YOU_GET_CARDS = [
  {
    icon: PhoneCall,
    title: "Make & take calls",
    description:
      "Dial and answer as usual, using your existing handset via the router or an adapter.",
  },
  {
    icon: Mail,
    title: "Calling features",
    description:
      "Voicemail, caller display and similar may be available, depending on your plan.",
  },
  {
    icon: AlignLeft,
    title: "Keep your number",
    description:
      "Often possible, subject to a porting check \u2014 see Keep Your Phone Number.",
  },
  {
    icon: CreditCard,
    title: "Clear pricing",
    description:
      "Monthly price (incl. VAT), any call charges and the contract term, shown before you order.",
  },
] as const;

export default function WhatYouGetSection() {
  return (
    <section
      id="what-you-get"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              WHAT YOU GET
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            A familiar home phone, carried digitally
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Most of calling stays the same. Features depend on your plan — we
            confirm what&apos;s included.
          </p>
        </div>

        {/* 4-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_YOU_GET_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

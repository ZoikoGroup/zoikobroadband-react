import React from "react";
import { Clock, Tag, Router } from "lucide-react";

const READING_PRICE_CARDS = [
  {
    icon: Clock,
    title: "Total contract cost",
    description:
      "Add up the monthly charges across the contract term plus any one-off fees. We calculate this from actual scheduled charges — never from an incomplete price.",
  },
  {
    icon: Tag,
    title: "Price changes & discounts",
    description:
      "Some plans have an introductory period or a scheduled change. Where it applies, we show the timing and how it affects your full-term cost — we don’t invent future prices.",
  },
  {
    icon: Router,
    title: "Setup & after the term",
    description:
      "Check equipment, installation fees and what happens when your term ends. Where a fee isn’t confirmed, we’ll say so rather than guess.",
  },
] as const;

export default function BusinessBroadbandReadingThePrice() {
  return (
    <section
      id="network-options"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              READING THE PRICE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Look beyond the headline monthly price
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A lower monthly price isn&apos;t always cheaper overall. Here&apos;s
            what shapes the real cost of a plan.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {READING_PRICE_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
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

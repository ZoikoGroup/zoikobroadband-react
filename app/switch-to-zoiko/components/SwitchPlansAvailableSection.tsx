import React from "react";
import Link from "next/link";
import { Wifi, FileCheck2, AlignLeft, ArrowRight } from "lucide-react";

const PLAN_HIGHLIGHT_CARDS = [
  {
    icon: Wifi,
    title: "Full Fibre (FTTP) or Part Fibre (SOGEA)",
    description:
      "The technology shown depends on what's serviceable at your property — we don't turn provisional network data into a confirmed order.",
  },
  {
    icon: FileCheck2,
    title: "Clear, complete pricing",
    description:
      "Each plan shows the recurring price, any introductory and standard periods, contract term, set-up charges and scheduled changes — from our approved price source.",
  },
  {
    icon: AlignLeft,
    title: "Compare before you choose",
    description:
      "Open the full Compare Plans & Speeds view to weigh eligible options side by side. If nothing's available yet, we'll explain the alternatives — no invented waitlist.",
  },
] as const;

export default function SwitchPlansAvailableSection() {
  return (
    <section
      id="your-plans"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              YOUR PLANS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Plans available for your address
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            After you check your address, you&apos;ll see the eligible plans —
            with the technology, speed, price, contract term and set-up costs
            shown clearly before you order.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLAN_HIGHLIGHT_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-start shadow-xs"
              >
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
            );
          })}
        </div>

        {/* Centered CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="#check-address"
            className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs group"
          >
            <span>Review available plans</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/compare-plans"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-2xs"
          >
            <span>Compare Plans &amp; Speeds</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

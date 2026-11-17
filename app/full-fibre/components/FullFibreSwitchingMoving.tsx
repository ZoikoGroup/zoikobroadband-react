import React from "react";
import Link from "next/link";
import { LogOut, Home, Phone, ArrowRight } from "lucide-react";

const SWITCHING_CARDS = [
  {
    icon: LogOut,
    title: "Switch to Zoiko",
    description:
      "Switching steps depend on your current provider and contract. Check your contract and charges first, and don't cancel until it's confirmed.",
    linkLabel: "How switching works",
    linkHref: "/why-zoiko",
  },
  {
    icon: Home,
    title: "Moving home",
    description:
      "Moving to a new address? Availability is rechecked for the new property — your old and new homes each need a separate check.",
    linkLabel: "Plan your move",
    linkHref: "/moving-home",
  },
  {
    icon: Phone,
    title: "Phone & your number",
    description:
      "Full Fibre is broadband access — calling isn't included by default. A digital voice option may be available separately; keeping a number depends on eligibility.",
    linkLabel: "Explore Digital Lines",
    linkHref: "/digital-lines",
  },
] as const;

export default function FullFibreSwitchingMoving() {
  return (
    <section
      id="switching-moving"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              SWITCHING &amp; MOVING
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Already have broadband, or moving home?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            There&apos;s a real next step for each situation — without blanket
            continuity promises.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SWITCHING_CARDS.map((card) => {
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
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={card.linkHref}
                    className="inline-flex items-center text-sm font-bold text-[#0E2F52] hover:text-[#0A3A66] transition-colors group"
                  >
                    <span>{card.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { User, Wrench, Info, ArrowRight } from "lucide-react";

const NON_URGENT_HELP_CARDS = [
  {
    icon: User,
    title: "Assisted & accessible support",
    description:
      "Need help getting ready, an alternative format, or support for a carer? Ask \u2014 and tell us if you rely on your line so we can prioritise. This is non-urgent support, not an emergency line.",
  },
  {
    icon: Wrench,
    title: "Phone not working?",
    description:
      "For a non-urgent fault, use the safe step-by-step guide \u2014 it never suggests a 999 test call.",
    linkLabel: "Help & Troubleshooting",
    linkHref: "/help-and-troubleshooting",
  },
  {
    icon: Info,
    title: "Official sources",
    description:
      "For the accessible routes above, always follow the official guidance from the emergency services and relay providers \u2014 it\u2019s kept up to date by them.",
  },
] as const;

export default function AssistedSupportAndFaults() {
  return (
    <section
      id="non-urgent-help"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              NON-URGENT HELP
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Assisted support &amp; faults
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            For non-urgent help, use these routes. For an emergency, always call
            999 — this page can&apos;t do that for you.
          </p>
        </div>

        {/* 3-Column Non-Urgent Help Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NON_URGENT_HELP_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
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

                  {"linkLabel" in card && card.linkLabel && card.linkHref && (
                    <div className="mt-4">
                      <Link
                        href={card.linkHref}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A3A66] hover:text-[#0E2F52] transition-colors group"
                      >
                        <span>{card.linkLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

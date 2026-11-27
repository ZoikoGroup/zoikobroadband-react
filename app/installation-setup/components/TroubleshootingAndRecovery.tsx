import React from "react";
import Link from "next/link";
import { Wrench, Calendar, Package, ArrowRight } from "lucide-react";

const TROUBLESHOOTING_CARDS = [
  {
    icon: Wrench,
    title: "No dial tone / audio issues",
    description:
      "Use the step-by-step guide — it screens for safety first and never suggests a 999 test call.",
    linkLabel: "Help & Troubleshooting",
    linkHref: "/help-and-troubleshooting",
  },
  {
    icon: Calendar,
    title: "Missed visit or delay",
    description:
      "If an appointment was missed or setup is incomplete, don't cancel your existing service — contact support to reschedule or recover.",
  },
  {
    icon: Package,
    title: "Damaged or missing kit",
    description:
      "If equipment is damaged or didn't arrive, tell us — don't improvise with other hardware or rewire anything.",
  },
] as const;

export default function TroubleshootingAndRecovery() {
  return (
    <section
      id="get-help"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              IF SOMETHING&apos;S WRONG
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Troubleshooting &amp; recovery
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            No dial tone, one-way audio or calls not reaching you? Use the safe,
            step-by-step guide. If a visit was missed or kit arrived damaged,
            we&apos;ll help recover it.
          </p>
        </div>

        {/* 3-Column Troubleshooting Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TROUBLESHOOTING_CARDS.map((card) => {
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

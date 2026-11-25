import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

const NAV_ANCHORS = [
  { label: "The pathway", href: "#the-pathway" },
  { label: "Analogue vs digital", href: "#analogue-vs-digital" },
  { label: "Equipment", href: "#equipment" },
  { label: "Common questions", href: "#common-questions" },
  { label: "Power & emergency", href: "#power-emergency" },
  { label: "Readiness", href: "#readiness" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function DigitalVoiceNavAndSummary() {
  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased">
      {/* Sub-navigation Bar */}
      <nav
        aria-label="Digital voice sections"
        className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-30"
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:justify-around gap-6 overflow-x-auto py-4 no-scrollbar">
            {NAV_ANCHORS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs sm:text-sm font-bold text-[#0E2F52] hover:text-[#D97706] whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* "In short" Callout Banner */}
      <section className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="relative bg-white border border-[#0A3A66] border-l-4 rounded-2xl p-6 sm:p-7 flex items-start gap-4 overflow-hidden shadow-xs">

          {/* Info Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 stroke-[2]" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="font-extrabold text-base text-[#0E2F52] mb-1.5">
              In short
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Digital voice replaces the old analogue phone line: your calls are
              carried over your broadband connection instead. It usually plugs
              into your router, and because it relies on broadband and power, it
              may not work during an outage — so a backup matters for
              emergencies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

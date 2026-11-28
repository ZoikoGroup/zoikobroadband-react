import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

const BUSINESS_FEATURES_NAV_LINKS = [
  { label: "By goal", href: "#by-goal" },
  { label: "All features", href: "#all-features" },
  { label: "Costs & billing", href: "#costs-and-billing" },
  { label: "Compatibility", href: "#compatibility" },
  { label: "Voice continuity", href: "#voice-continuity" },
  { label: "Recording & privacy", href: "#recording-and-privacy" },
  { label: "Request a quote", href: "#request-a-quote" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function BusinessFeaturesNavAndNotice() {
  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased">
      {/* Sticky Horizontal Anchor Navigation Bar */}
      <nav
        aria-label="Business calling features sections"
        className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xs border-b border-gray-200/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start md:justify-between gap-6 sm:gap-8 overflow-x-auto py-4 text-xs sm:text-sm font-bold text-[#0E2F52] whitespace-nowrap">
            {BUSINESS_FEATURES_NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-[#0A3A66] transition-colors py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Amber Left-Border Availability Notice Section */}
      <section
        aria-label="Feature availability disclaimer"
        className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#F59E0B]/60 border-l-4 border-l-[#F59E0B] rounded-2xl px-6 py-6 sm:px-8 sm:py-7 flex items-start gap-4 sm:gap-5 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-[#FEF7E6] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0E2F52] tracking-tight leading-snug">
                Availability depends on your plan, account and devices
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The features below are candidate capabilities, not a confirmed
                Zoiko availability list. Compatibility, account scope and
                charges vary, and some features may not apply to your setup. We
                confirm what&apos;s available for your account before anything
                is set up or billed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

const MULTI_SITE_NAV_ITEMS = [
  { label: "How many sites?", href: "#how-many-sites" },
  { label: "How it works", href: "#how-it-works" },
  { label: "What to connect", href: "#what-to-connect" },
  { label: "Plan my sites", href: "#plan-my-sites" },
  { label: "Costs", href: "#costs" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function MultiSiteSubNavAndNotice() {
  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden">
      {/* Sub-Navigation Bar */}
      <header className="w-full border-b border-gray-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Multi-site page sections"
            className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 py-4"
          >
            {MULTI_SITE_NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[#0E2F52] hover:text-[#0A3A66] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Notice Banner */}
        <div className="relative bg-white border border-[#F0B429] border-l-4 border-l-[#F0B429] rounded-2xl p-5 sm:p-6 flex items-start gap-4 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>

          <div>
            <h2 className="font-bold text-base text-[#0E2F52] mb-1">
              Every site is confirmed on its own
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Multi-site connectivity is designed per premises. We don&apos;t
              promise nationwide coverage, a zero-downtime network, or that
              every service is available everywhere. Availability, design,
              installation and prices are reviewed and confirmed separately for
              each location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RELATED_PAGES = [
  {
    label: "Home Digital Phone",
    href: "/home-digital-phone",
  },
  {
    label: "Keep Your Number",
    href: "/keep-your-number",
  },
  {
    label: "Help & Troubleshooting",
    href: "/help-and-troubleshooting",
  },
  {
    label: "Business VoIP",
    href: "/business-voip",
  },
  {
    label: "Emergency Calling Guide",
    href: "/emergency-calling-guide",
  },
  {
    label: "Check Availability",
    href: "/check-availability",
  },
] as const;

export default function DigitalVoiceRelatedPages() {
  return (
    <section
      aria-labelledby="related-pages-heading"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              KEEP EXPLORING
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2
            id="related-pages-heading"
            className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight"
          >
            Related pages
          </h2>
        </div>

        {/* 3x2 Related Page Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {RELATED_PAGES.map((page) => (
            <Link
              key={page.label}
              href={page.href}
              className="group bg-white border border-gray-200/90 hover:border-[#0A3A66]/40 rounded-2xl px-6 py-4.5 flex items-center justify-between gap-4 transition-all shadow-2xs hover:shadow-xs"
            >
              <span className="font-bold text-sm sm:text-[15px] text-[#0E2F52] group-hover:text-[#0A3A66] transition-colors leading-snug">
                {page.label}
              </span>

              <ArrowRight className="w-4 h-4 text-[#0E2F52] shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RELATED_PAGES = [
  {
    label: "Check Availability",
    href: "/check-availability",
  },
  {
    label: "All Broadband Deals",
    href: "/all-broadband-deals",
  },
  {
    label: "How Switching Works",
    href: "/switch-to-zoiko",
  },
  {
    label: "Installation & Routers",
    href: "/installation-routers",
  },
  {
    label: "Digital Lines",
    href: "/digital-lines",
  },
  {
    label: "Help & Support",
    href: "/get-help",
  },
] as const;

export default function MovingRelatedPages() {
  return (
    <section className="w-full bg-[#FFFFFF] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Related pages
          </h2>
        </div>

        {/* 3x2 Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RELATED_PAGES.map((page) => (
            <Link
              key={page.label}
              href={page.href}
              className="bg-white border border-gray-200/90 rounded-2xl px-6 py-5 min-h-[76px] flex items-center justify-between gap-4 shadow-xs hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <span className="font-bold text-sm text-[#0E2F52] leading-snug">
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

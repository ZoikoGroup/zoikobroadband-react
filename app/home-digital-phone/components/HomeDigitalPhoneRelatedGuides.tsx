import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HOME_PHONE_RELATED_GUIDES = [
  {
    title: "Check Availability",
    href: "#check-availability",
  },
  {
    title: "How Digital Voice Works",
    href: "/digital-voice",
  },
  {
    title: "Keep Your Phone Number",
    href: "/keep-your-number",
  },
  {
    title: "Emergency Calling Guidance",
    href: "/emergency-calling-guide",
  },
  {
    title: "Help & Troubleshooting",
    href: "/help-and-troubleshooting",
  },
  {
    title: "Installation & Setup",
    href: "/installation-and-setup",
  },
] as const;

export default function HomeDigitalPhoneRelatedGuides() {
  return (
    <section
      id="related-guides"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              KEEP EXPLORING
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Related guides
          </h2>
        </div>

        {/* 3x2 Related Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOME_PHONE_RELATED_GUIDES.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group bg-white border border-gray-200/90 hover:border-[#0A3A66]/45 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all shadow-2xs hover:shadow-sm"
            >
              <span className="font-bold text-sm sm:text-[15px] text-[#0E2F52] group-hover:text-[#0A3A66] transition-colors">
                {guide.title}
              </span>

              <ArrowRight className="w-4 h-4 text-[#0E2F52] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

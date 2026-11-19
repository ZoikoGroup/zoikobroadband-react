"use client";

import React from "react";

interface NetworkOption {
  id: string;
  title: string;
  description: string;
  statusLabel: string;
}

const NETWORK_OPTIONS: readonly NetworkOption[] = [
  {
    id: "static-ip",
    title: "Static IP address",
    description: "Remote access, hosted systems, CCTV",
    statusLabel: "[status]",
  },
  {
    id: "business-router",
    title: "Business router and Wi-Fi",
    description: "Equipment and delivery shown separately",
    statusLabel: "[status]",
  },
  {
    id: "business-phone",
    title: "Business phone / VoIP",
    description: "Readiness is not inferred from speed",
    statusLabel: "[status]",
  },
] as const;

export default function NetworkOptionsSection() {
  return (
    <section className="w-full bg-white py-12 px-6 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1060px]">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1D63DC] mb-2.5">
          ADD WHAT YOU NEED
        </p>

        {/* Main Heading */}
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[#0F172A] mb-2.5">
          Network options, clearly labelled
        </h2>

        {/* Subheading */}
        <p className="text-[14.5px] leading-[1.55] text-[#64748B] max-w-[620px] mb-7">
          Each feature shows whether it is included, an add-on, unavailable or
          not yet confirmed.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NETWORK_OPTIONS.map((option) => (
            <div
              key={option.id}
              className="rounded-[14px] border border-[#E2E8F0] bg-white px-5 py-5 flex flex-col justify-between min-h-[132px]"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Text Content */}
                <div>
                  <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0F172A] mb-1.5">
                    {option.title}
                  </h3>
                  <p className="text-[13px] leading-[1.5] text-[#64748B]">
                    {option.description}
                  </p>
                </div>

                {/* Status Badge */}
                <span className="inline-flex items-center rounded-[4px] bg-[#FEF3C7] px-2 py-0.5 text-[11.5px] font-medium text-[#78350F] shrink-0">
                  {option.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

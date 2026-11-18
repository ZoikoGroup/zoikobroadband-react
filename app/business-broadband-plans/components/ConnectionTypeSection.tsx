"use client";

import React from "react";

interface ConnectionOption {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

const CONNECTION_OPTIONS: readonly ConnectionOption[] = [
  {
    id: "fttp",
    title: "Full Fibre (FTTP)",
    description: "Fibre runs all the way to your premises.",
    ctaLabel: "Explore Business Full Fibre",
    href: "#",
  },
  {
    id: "sogea",
    title: "Part Fibre (SOGEA)",
    description:
      "Fibre to the cabinet, with a data-only line to your premises.",
    ctaLabel: "Explore Part Fibre",
    href: "#",
  },
] as const;

export default function ConnectionTypeSection() {
  return (
    <section className="w-full bg-[#F5F8FC] py-12 px-6 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1060px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 pt-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1D63DC] mb-2.5">
            UNDERSTAND YOUR CONNECTION
          </p>

          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[#0F172A] mb-3">
            FTTP or SOGEA?
          </h2>

          <p className="text-[14.5px] leading-[1.55] text-[#64748B] max-w-[400px]">
            Two ways a business line can reach you. Which is available depends
            on your premises, so check your address first.
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Diagram Card */}
          <div className="w-full rounded-[14px] border border-[#E2E8F0] bg-white px-6 sm:px-8 py-6">
            <div className="flex items-end justify-between gap-2">
              {/* Exchange Box */}
              <div className="w-[54px] h-[54px] rounded-[8px] bg-[#0B2240] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-medium tracking-[-0.01em] text-[#FBBF24]">
                  Exchange
                </span>
              </div>

              {/* Dotted Connection Line with Label */}
              <div className="flex-1 flex flex-col items-center pb-[25px]">
                <span className="text-[10.5px] font-medium text-[#64748B] mb-2">
                  Your connection
                </span>
                <svg
                  className="w-full h-[6px] overflow-visible"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    x1="2"
                    y1="3"
                    x2="100%"
                    y2="3"
                    stroke="#1D63DC"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="1 10"
                  />
                </svg>
              </div>

              {/* Premises / House Illustration */}
              <div className="shrink-0 flex items-end" aria-hidden="true">
                <svg
                  width="68"
                  height="80"
                  viewBox="0 0 68 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Dark Navy Triangle Roof */}
                  <polygon points="34,2 4,26 64,26" fill="#0B2240" />
                  {/* Amber/Yellow House Body */}
                  <path
                    d="M9 26H59V76C59 78.2091 57.2091 80 55 80H13C10.7909 80 9 78.2091 9 76V26Z"
                    fill="#FBBF24"
                  />
                  {/* Dark Navy Door */}
                  <rect x="27" y="48" width="14" height="32" fill="#0B2240" />
                </svg>
              </div>
            </div>
          </div>

          {/* Connection Option Cards */}
          {CONNECTION_OPTIONS.map((option) => (
            <div
              key={option.id}
              className="w-full rounded-[14px] border border-[#E2E8F0] bg-white px-6 py-5"
            >
              <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0F172A] mb-1">
                {option.title}
              </h3>

              <p className="text-[13px] leading-[1.5] text-[#64748B] mb-4">
                {option.description}
              </p>

              <a
                href={option.href}
                className="inline-flex items-center justify-center rounded-[8px] border border-[#1E293B] bg-white px-4 py-2 text-[12px] font-semibold text-[#0F172A] transition-colors hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D63DC]"
              >
                {option.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

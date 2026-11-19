"use client";

import React from "react";

interface EngagementStage {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

const ENGAGEMENT_STAGES = [
  {
    step: 1,
    title: "Discovery",
    description: "We learn what matters in your business.",
  },
  {
    step: 2,
    title: "Validation",
    description: "We confirm what can be offered at your site.",
  },
  {
    step: 3,
    title: "Approval",
    description: "You review scope, costs and terms.",
  },
  {
    step: 4,
    title: "Deployment",
    description: "Set up with clear responsibilities.",
  },
] as const satisfies readonly EngagementStage[];

export default function CyberEngagementPath() {
  return (
    <section className="w-full bg-[#0B2241] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            HOW AN ENGAGEMENT WORKS
          </p>

          <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            A clear path from first call to review
          </h2>

          <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[540px]">
            Each stage is agreed with you. Timings and scope are confirmed in
            writing, never assumed.
          </p>
        </div>

        {/* 4 Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {ENGAGEMENT_STAGES.map((stage) => (
            <article
              key={stage.step}
              className="bg-white rounded-[16px] p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)] flex flex-col items-start min-h-[168px]"
            >
              <span className="w-[28px] h-[28px] rounded-full bg-[#FFC119] text-[#0B2241] text-[12.5px] font-extrabold flex items-center justify-center mb-5 shrink-0">
                {stage.step}
              </span>

              <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-1.5">
                {stage.title}
              </h3>

              <p className="text-[#64748B] text-[13px] leading-[1.5]">
                {stage.description}
              </p>
            </article>
          ))}
        </div>

        {/* Wide Bottom Banner Image */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] rounded-[16px] overflow-hidden bg-[#1E293B]">
          <img
            src="/Images/cyber/10.png"
            alt="Hands holding wireless router above desk and laptop"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[16px] border-[1.5px] border-dashed border-[#4B7FD6]/80"
          />
        </div>
      </div>
    </section>
  );
}

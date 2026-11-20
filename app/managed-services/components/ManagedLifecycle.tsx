"use client";

import React from "react";

type LifecycleCardTheme = "light" | "dark";

interface LifecycleStageCard {
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly theme: LifecycleCardTheme;
}

const LIFECYCLE_STAGES: readonly LifecycleStageCard[] = [
  {
    stepNumber: "1",
    title: "Discovery",
    description: "We learn your sites, systems and goals.",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Team member speaking on the phone at a desk in an office",
    theme: "light",
  },
  {
    stepNumber: "2",
    title: "Due diligence",
    description: "We check scope, access and dependencies.",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of wooden desk with coffee, glasses, laptop and small plant",
    theme: "light",
  },
  {
    stepNumber: "3",
    title: "Transition",
    description: "Agreed handover, step by step.",
    imageSrc: "/Images/mng/1.png",
    imageAlt:
      "Three colleagues collaborating closely over a laptop during transition",
    theme: "light",
  },
  {
    stepNumber: "4",
    title: "Operate & review",
    description: "Run as agreed, with reviews if included.",
    imageSrc: "/Images/onb/12.png",
    imageAlt: "Support advisor with headset smiling at a computer workstation",
    theme: "light",
  },
  {
    stepNumber: "5",
    title: "Exit",
    description: "Access removed, data returned or deleted as agreed.",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router on desk with person working in background",
    theme: "dark",
  },
];

export interface ManagedLifecycleProps {
  readonly onSelectStage?: (stepNumber: string) => void;
}

export default function ManagedLifecycle({
  onSelectStage,
}: ManagedLifecycleProps) {
  return (
    <section
      id="the-lifecycle"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              07
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              THE LIFECYCLE
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[520px]">
            From first conversation to a clean exit.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            A good managed service plans the end as carefully as the start.
          </p>
        </div>

        {/* 5-Stage Lifecycle Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LIFECYCLE_STAGES.map((stage) => {
            const isDark = stage.theme === "dark";

            return (
              <article
                key={stage.stepNumber}
                onClick={() => onSelectStage?.(stage.stepNumber)}
                className={`rounded-[16px] overflow-hidden flex flex-col transition-colors ${
                  isDark
                    ? "bg-[#061A33] text-white shadow-[0_10px_24px_rgba(6,26,51,0.18)]"
                    : "bg-white text-[#0B2241] border border-[#E2E8F0] shadow-[0_6px_18px_rgba(11,34,65,0.04)]"
                } ${onSelectStage ? "cursor-pointer" : ""}`}
              >
                {/* Top Photo with Gold Step Badge */}
                <div className="relative w-full h-[130px] sm:h-[140px] bg-[#1E293B] overflow-hidden">
                  <img
                    src={stage.imageSrc}
                    alt={stage.imageAlt}
                    className="w-full h-full object-cover object-[50%_20%]"
                  />

                  <span className="absolute top-3 left-3 w-6 h-6 rounded-[6px] bg-[#FFC119] text-[#0B2241] text-[11.5px] font-extrabold inline-flex items-center justify-center shadow-xs">
                    {stage.stepNumber}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <h3
                    className={`text-[15px] font-extrabold leading-[1.3] mb-1.5 ${
                      isDark ? "text-[#FFC119]" : "text-[#0B2241]"
                    }`}
                  >
                    {stage.title}
                  </h3>

                  <p
                    className={`text-[12px] leading-[1.5] ${
                      isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                    }`}
                  >
                    {stage.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

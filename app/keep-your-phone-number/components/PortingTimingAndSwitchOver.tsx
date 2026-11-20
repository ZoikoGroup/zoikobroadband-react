"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface SwitchStep {
  readonly stepNumber: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

const SWITCH_STEPS: readonly SwitchStep[] = [
  {
    stepNumber: "1",
    id: "request",
    title: "Request",
    description: "You ask, and we check the details.",
  },
  {
    stepNumber: "2",
    id: "validate",
    title: "Validate",
    description: "Your current provider checks the request.",
  },
  {
    stepNumber: "3",
    id: "confirm-a-date",
    title: "Confirm a date",
    description: "A switch-over date is agreed with you.",
  },
  {
    stepNumber: "4",
    id: "prepare",
    title: "Prepare",
    description: "We get your new service ready.",
  },
  {
    stepNumber: "5",
    id: "switch-over",
    title: "Switch over",
    description: "Your number moves on the agreed day.",
  },
  {
    stepNumber: "6",
    id: "test",
    title: "Test",
    description: "We help you check calls are working.",
  },
];

const POST_SWITCH_TIPS: readonly string[] = [
  "Test incoming and outgoing calls after the switch (never by calling 999).",
  "Keep another way for people to reach you on the day.",
  "If calls fail after the switch, contact support straight away.",
];

export interface PortingTimingAndSwitchOverProps {
  readonly defaultActiveStepId?: string | null;
  readonly onSelectStep?: (stepId: string) => void;
}

export default function PortingTimingAndSwitchOver({
  defaultActiveStepId = null,
  onSelectStep,
}: PortingTimingAndSwitchOverProps) {
  const [activeStepId, setActiveStepId] = useState<string | null>(
    defaultActiveStepId,
  );

  const handleSelectStep = (id: string) => {
    const next = activeStepId === id ? null : id;
    setActiveStepId(next);
    onSelectStep?.(id);
  };

  return (
    <section
      id="timing-and-switch-over"
      className="relative w-full bg-[#061A33] text-white py-16 md:py-20 font-sans antialiased overflow-hidden"
    >
      {/* Subtle decorative arc in top-left corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-28 w-[340px] h-[340px] rounded-full border-[38px] border-[#1963DD]/10"
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-11">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              05
            </span>
            <span className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase">
              TIMING &amp; SWITCH-OVER
            </span>
          </div>

          <h2 className="text-white text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            What happens, and when.
          </h2>

          <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[580px]">
            Timings depend on your number and providers. We&apos;ll only show a
            date once it&apos;s confirmed.
          </p>
        </div>

        {/* 6-Step Horizontal Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 mb-10">
          {SWITCH_STEPS.map((step, index) => {
            const isSelected = activeStepId === step.id;
            const isLast = index === SWITCH_STEPS.length - 1;

            return (
              <div key={step.id} className="relative flex flex-col">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectStep(step.id)}
                  className="group text-left flex flex-col items-start focus:outline-none cursor-pointer"
                >
                  {/* Step Circle + Connector Line */}
                  <div className="w-full flex items-center mb-4">
                    <span
                      className={`w-8 h-8 rounded-full text-[12px] font-extrabold inline-flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "bg-[#FFC119] text-[#0B2241] ring-4 ring-[#FFC119]/25"
                          : "bg-[#0B2241] text-[#FFC119] border border-[#FFC119]/75 group-hover:bg-[#FFC119] group-hover:text-[#0B2241]"
                      }`}
                    >
                      {step.stepNumber}
                    </span>

                    {!isLast ? (
                      <span
                        aria-hidden="true"
                        className="hidden lg:block h-[1.5px] flex-1 ml-2.5 bg-gradient-to-r from-[#FFC119]/55 to-[#334155]/70"
                      />
                    ) : null}
                  </div>

                  <h3 className="text-white text-[13.5px] font-extrabold leading-[1.3] mb-1.5 group-hover:text-[#FFC119] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-[#94A3B8] text-[11.5px] leading-[1.5] max-w-[175px]">
                    {step.description}
                  </p>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom 2-Column Split: Preferred vs Confirmed Card + Switch-Day Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left White Comparison Card */}
          <div className="lg:col-span-5 bg-white rounded-[18px] p-6 sm:p-7 text-[#0B2241] shadow-[0_12px_28px_rgba(0,0,0,0.22)] flex items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <p className="text-[#64748B] text-[9.5px] font-extrabold tracking-[0.12em] uppercase mb-1.5">
                YOUR PREFERRED DATE
              </p>
              <p className="text-[#0B2241] text-[14.5px] sm:text-[15.5px] font-extrabold leading-[1.25]">
                A preference
              </p>
            </div>

            <span
              aria-hidden="true"
              className="text-[#DC2626] text-[18px] font-extrabold leading-none shrink-0"
            >
              &ne;
            </span>

            <div className="flex-1 text-center">
              <p className="text-[#64748B] text-[9.5px] font-extrabold tracking-[0.12em] uppercase mb-1.5">
                CONFIRMED DATE
              </p>
              <p className="text-[#0B2241] text-[14.5px] sm:text-[15.5px] font-extrabold leading-[1.25]">
                Agreed with you
              </p>
            </div>
          </div>

          {/* Right Stacked Switch-Day Checklist Items */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
            {POST_SWITCH_TIPS.map((tip) => (
              <div
                key={tip}
                className="rounded-[12px] bg-[#0D2748]/90 border border-white/10 px-4 py-3 flex items-center gap-3 shadow-2xs"
              >
                <span
                  aria-hidden="true"
                  className="w-4 h-4 rounded-full border border-[#FFC119] text-[#FFC119] inline-flex items-center justify-center shrink-0"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>

                <p className="text-[#E2E8F0] text-[12px] font-medium leading-[1.4]">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

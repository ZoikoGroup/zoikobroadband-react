"use client";

import React from "react";

interface SwitchStep {
  readonly stepNumber: number;
  readonly title: string;
  readonly description: string;
}

const SWITCH_STEPS = [
  {
    stepNumber: 1,
    title: "Check availability",
    description: "Select your exact premises and read the result.",
  },
  {
    stepNumber: 2,
    title: "Confirm your socket",
    description: "See if a DSL-ready socket or router change is needed.",
  },
  {
    stepNumber: 3,
    title: "Plan voice and devices",
    description: "Review numbers, alarms and terminals first.",
  },
  {
    stepNumber: 4,
    title: "Engineer visit, if required",
    description: "Appointments are shown only when confirmed.",
  },
  {
    stepNumber: 5,
    title: "Router setup",
    description: "Equipment inclusion is stated per offer.",
  },
  {
    stepNumber: 6,
    title: "Switch and test",
    description: "Check every dependent device after go-live.",
  },
] as const satisfies readonly SwitchStep[];

export default function SwitchDaySteps() {
  return (
    <section className="w-full bg-[#FFC119] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Header + Router Image */}
          <div className="lg:col-span-6">
            <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              INSTALLATION &amp; READINESS
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.13] tracking-[-0.02em] mb-4 max-w-[460px]">
              From address check to switch day
            </h2>

            <p className="text-[#0B2241]/85 text-[15px] leading-[1.55] max-w-[460px] mb-7">
              No dates or seamless-switch promises are made before your order is
              confirmed.
            </p>

            <div className="relative w-full max-w-[500px] aspect-[16/10.5] rounded-[16px] overflow-hidden bg-[#E2E8F0]">
              <img
                src="/Images/fttp/7.png"
                alt="Connecting cables to a wireless router during switch setup"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[16px] border-[1.5px] border-dashed border-[#4B7FD6]/75"
              />
            </div>
          </div>

          {/* Right Column: Numbered Steps List */}
          <div className="lg:col-span-6 pt-1">
            <ol className="divide-y divide-[#0B2241]/15">
              {SWITCH_STEPS.map((step, index) => (
                <li
                  key={step.stepNumber}
                  className={`flex items-start gap-4 ${
                    index === 0
                      ? "pb-5"
                      : index === SWITCH_STEPS.length - 1
                        ? "pt-5"
                        : "py-5"
                  }`}
                >
                  <span className="w-[30px] h-[30px] rounded-full bg-[#0B2241] text-white text-[12.5px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </span>

                  <div>
                    <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#0B2241]/85 text-[13.5px] leading-[1.5]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

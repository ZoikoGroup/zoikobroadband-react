"use client";

import React from "react";

interface InstallationStep {
  readonly stepNumber: number;
  readonly title: string;
  readonly description: string;
}

const INSTALLATION_STEPS = [
  {
    stepNumber: 1,
    title: "Check availability",
    description: "Select your exact premises and see the result.",
  },
  {
    stepNumber: 2,
    title: "Survey, if required",
    description: "Some sites need an assessment before ordering.",
  },
  {
    stepNumber: 3,
    title: "Access and permissions",
    description: "Building access and landlord approval, where relevant.",
  },
  {
    stepNumber: 4,
    title: "Installation",
    description: "Fibre enters the premises and connects to the ONT.",
  },
  {
    stepNumber: 5,
    title: "Test",
    description: "Service is tested with a responsible contact.",
  },
  {
    stepNumber: 6,
    title: "Go live",
    description: "Confirmed only once your order status is verified.",
  },
] as const satisfies readonly InstallationStep[];

export default function InstallationReadiness() {
  return (
    <section className="w-full bg-[#FFC119] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Header + Engineer Image */}
          <div className="lg:col-span-6">
            <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              INSTALLATION &amp; READINESS
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.13] tracking-[-0.02em] mb-4 max-w-[460px]">
              From address check to going live
            </h2>

            <p className="text-[#0B2241]/85 text-[15px] leading-[1.55] max-w-[460px] mb-7">
              Some steps apply only to certain premises. No dates or durations
              are promised before your order is confirmed.
            </p>

            <div className="relative w-full max-w-[500px] aspect-[16/10.5] rounded-[16px] overflow-hidden bg-[#E2E8F0]">
              <img
                src="/Images/fttp/6.png"
                alt="Engineer checking premises fibre installation"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[16px] border-[1.5px] border-dashed border-[#4B7FD6]/75"
              />
            </div>
          </div>

          {/* Right Column: Numbered Timeline List */}
          <div className="lg:col-span-6 pt-1">
            <ol className="divide-y divide-[#0B2241]/15">
              {INSTALLATION_STEPS.map((step, index) => (
                <li
                  key={step.stepNumber}
                  className={`flex items-start gap-4 ${
                    index === 0
                      ? "pb-5"
                      : index === INSTALLATION_STEPS.length - 1
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

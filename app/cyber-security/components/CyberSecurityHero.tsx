"use client";

import React from "react";

interface StartingStep {
  readonly number: number;
  readonly label: string;
  readonly badgeBg: string;
  readonly badgeText: string;
}

const STARTING_STEPS = [
  {
    number: 1,
    label: "Protect your accounts",
    badgeBg: "bg-[#FFC119]",
    badgeText: "text-[#0B2241]",
  },
  {
    number: 2,
    label: "Keep devices updated",
    badgeBg: "bg-[#7BA8FF]",
    badgeText: "text-[#0B2241]",
  },
  {
    number: 3,
    label: "Back up and test",
    badgeBg: "bg-[#24D694]",
    badgeText: "text-[#0B2241]",
  },
] as const satisfies readonly StartingStep[];

export default function CyberSecurityHero() {
  return (
    <section className="w-full bg-[#EDF3FE] py-14 md:py-20 font-sans antialiased overflow-x-clip">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Copy & CTA Column */}
          <div className="lg:col-span-6 relative z-10">
            <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3.5">
              BUSINESS BROADBAND / BUSINESS SERVICES
            </p>

            <h1 className="text-[#0B2241] text-[40px] sm:text-[48px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-6 max-w-[500px]">
              Cyber security guidance and protection options for{" "}
              <span className="relative inline-block">
                your business.
                <span
                  aria-hidden="true"
                  className="block w-full h-[5px] bg-[#FFC119] mt-1 rounded-full"
                />
              </span>
            </h1>

            <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[495px] mb-7">
              Explore practical security priorities, understand which protection
              options may fit your organization, and request a tailored
              conversation about verified services.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-[#0B2241] hover:bg-[#143563] text-white text-[13.5px] font-bold transition-colors"
              >
                Discuss Your Business Security
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-transparent hover:bg-white/70 border border-[#0B2241] text-[#0B2241] text-[13.5px] font-bold transition-colors"
              >
                Explore Protection Options
              </a>
            </div>

            <p className="text-[#64748B] text-[12px] leading-[1.55] max-w-[470px]">
              Security needs vary. Features, eligibility, support terms and
              costs depend on the confirmed service and contract.
            </p>
          </div>

          {/* Right Visual & Floating Cards Column */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[465px]">
              {/* Offset Dark Navy Backing Card */}
              <div
                aria-hidden="true"
                className="w-full h-full bg-[#0B2241] rounded-[24px] absolute top-4 left-4 z-0"
              />

              {/* Main Image Container */}
              <div className="relative z-10 rounded-[22px] border-[2px] border-white overflow-hidden bg-[#0B2241] shadow-[0_18px_38px_rgba(11,34,65,0.14)] aspect-[1/1.02]">
                <img
                  src="/Images/cyber/1.png"
                  alt="Digital shield security interface over business workstation"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Top-Right Floating Card: Talk to a person */}
              <div className="absolute top-6 -right-3 sm:-right-5 z-20 bg-white rounded-[14px] p-3.5 pr-5 shadow-[0_12px_28px_rgba(11,34,65,0.12)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E2E8F0] shrink-0">
                  <img
                    src="/Images/cyber/2.png"
                    alt="Security specialist portrait"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-[#0B2241] text-[12px] font-extrabold leading-[1.25]">
                    Talk to a person
                  </p>
                  <p className="text-[#64748B] text-[11px] leading-[1.35] mt-0.5">
                    Plain-English
                    <br />
                    advice, no jargon
                  </p>
                </div>
              </div>

              {/* Bottom-Left Floating Card: Good places to start */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 z-20 bg-white rounded-[16px] p-4 sm:p-5 shadow-[0_14px_32px_rgba(11,34,65,0.12)] min-w-[235px]">
                <p className="text-[#0B2241] text-[12.5px] font-extrabold leading-[1.3] mb-3">
                  Good places to start
                </p>

                <ol className="space-y-2.5">
                  {STARTING_STEPS.map((step) => (
                    <li key={step.number} className="flex items-center gap-2.5">
                      <span
                        className={`w-[20px] h-[20px] rounded-full ${step.badgeBg} ${step.badgeText} text-[11px] font-extrabold flex items-center justify-center shrink-0`}
                      >
                        {step.number}
                      </span>
                      <span className="text-[#334155] text-[12px] font-medium leading-none">
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Phone, List, Users, Smartphone, Mic } from "lucide-react";

const SCENARIO_DATA = {
  badge: "EXAMPLE SCENARIO",
  headingLine1: "How a call could flow for your",
  headingLine2: "business.",
  subheadingLine1:
    "An illustration of one possible setup, not a product screen. Which options apply is confirmed",
  subheadingLine2: "with you.",
  footnote:
    "*Example options. Availability for your business is confirmed during consultation.",
  steps: [
    {
      number: "01",
      icon: "phone",
      title: "A customer calls",
      description: "They dial your main business number.",
    },
    {
      number: "02",
      icon: "menu",
      title: "Greeting & options",
      description: "An optional welcome message offers choices*.",
    },
    {
      number: "03",
      icon: "team",
      title: "Right team rings",
      description: "Calls go to a group, in hours or after hours*.",
    },
    {
      number: "04",
      icon: "device",
      title: "Answered anywhere",
      description: "On a desk phone, computer or mobile*.",
    },
    {
      number: "05",
      icon: "voicemail",
      title: "Voicemail if busy",
      description: "Messages are saved for follow-up*.",
    },
  ],
} as const;

export default function CallFlowScenario() {
  return (
    <section
      aria-labelledby="call-flow-scenario-heading"
      className="relative w-full overflow-hidden bg-[#0E4673] py-12 text-white sm:py-14 lg:py-16"
    >
      {/* Subtle radial depth gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 20% 25%, #145487 0%, #0E4673 58%, #093356 100%)",
        }}
      />

      {/* Large muted teal-slate ring graphic in top-right background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-165px] right-[-145px] z-0 h-[520px] w-[520px] rounded-full border-[46px] border-[#426F6D]/55 lg:top-[-155px] lg:right-[-115px] lg:h-[580px] lg:w-[580px]"
      />

      {/* Main 1300px centered container */}
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            {SCENARIO_DATA.badge}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="call-flow-scenario-heading"
          className="mt-3.5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-white sm:text-[42px] lg:text-[44px]"
        >
          <span className="block">{SCENARIO_DATA.headingLine1}</span>
          <span className="block">{SCENARIO_DATA.headingLine2}</span>
        </h2>

        {/* Subheading */}
        <p className="mt-3 max-w-[650px] text-[13.5px] leading-[1.52] font-normal text-[#C8D9E8] sm:text-[14px]">
          <span className="block">{SCENARIO_DATA.subheadingLine1}</span>
          <span className="block">{SCENARIO_DATA.subheadingLine2}</span>
        </p>

        {/* 5-Step Glassmorphic Cards Row */}
        <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {SCENARIO_DATA.steps.map((step) => (
            <div
              key={step.number}
              className="flex min-h-[188px] flex-col justify-start rounded-[12px] border border-white/15 bg-white/[0.08] p-4 shadow-[0_10px_24px_rgba(4,24,43,0.16)] backdrop-blur-[6px]"
            >
              {/* Top row: Yellow icon tile + Step number */}
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#FFD100] text-[#081C2E] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
                  {step.icon === "phone" && (
                    <Phone className="h-4 w-4 stroke-[2.2]" />
                  )}
                  {step.icon === "menu" && (
                    <List className="h-4 w-4 stroke-[2.2]" />
                  )}
                  {step.icon === "team" && (
                    <Users className="h-4 w-4 stroke-[2.2]" />
                  )}
                  {step.icon === "device" && (
                    <Smartphone className="h-4 w-4 stroke-[2.2]" />
                  )}
                  {step.icon === "voicemail" && (
                    <Mic className="h-4 w-4 stroke-[2.2]" />
                  )}
                </span>

                <span className="text-[22px] leading-none font-extrabold tracking-[-0.02em] text-white/35">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="mt-4 text-[13.5px] leading-[1.28] font-bold text-white">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-2 max-w-[175px] text-[11.5px] leading-[1.45] font-normal text-[#C7D8E8]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Footnote */}
        <p className="mt-3.5 text-[10.5px] leading-[1.4] font-normal text-[#A7BDD1]">
          {SCENARIO_DATA.footnote}
        </p>
      </div>
    </section>
  );
}

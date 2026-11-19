"use client";

import React, { useMemo, useState } from "react";

type RouteTone = "slate" | "amber" | "green";

interface EscalationRouteCard {
  readonly stepNumber: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tone: RouteTone;
}

type EmployeeBand = "10 or fewer" | "More than 10" | "Not sure";
type ComplaintStage =
  | "Just made it"
  | "Unresolved for a while"
  | "Got a deadlock letter";

const ESCALATION_ROUTES: readonly EscalationRouteCard[] = [
  {
    stepNumber: "1",
    id: "escalate-a-case",
    title: "Escalate a case",
    description:
      "When a case needs more attention. It stays part of your support case.",
    bullets: [
      "Ask from your case page",
      "We tell you who owns it",
      "Urgency isn't a repair guarantee",
    ],
    imageSrc: "/Images/mng/3.png",
    imageAlt:
      "Business representative in a navy suit holding a phone in a bright office",
    tone: "slate",
  },
  {
    stepNumber: "2",
    id: "make-a-formal-complaint",
    title: "Make a formal complaint",
    description:
      "A separate route with its own receipt. You don't have to wait for every support step first.",
    bullets: [
      "Separate from fault reports",
      "You get a complaint reference",
      "We explain each stage",
    ],
    imageSrc: "/Images/onb/10.png",
    imageAlt:
      "Team member smiling in an office with planning notes on a glass board",
    tone: "amber",
  },
  {
    stepNumber: "3",
    id: "independent-adr",
    title: "Independent ADR",
    description:
      "If eligible, an independent scheme can review an unresolved complaint.",
    bullets: [
      "For eligible small businesses",
      "After a set time or a deadlock letter",
      "Free for eligible customers",
    ],
    imageSrc: "/Images/onb/17.png",
    imageAlt: "City skyline with bridge and glass tower at dusk",
    tone: "green",
  },
];

const EMPLOYEE_BANDS: readonly EmployeeBand[] = [
  "10 or fewer",
  "More than 10",
  "Not sure",
];

const COMPLAINT_STAGES: readonly ComplaintStage[] = [
  "Just made it",
  "Unresolved for a while",
  "Got a deadlock letter",
];

function getRoutePillClasses(tone: RouteTone) {
  switch (tone) {
    case "slate":
      return "bg-[#EEF2F6] text-[#1E3A8A]";
    case "amber":
      return "bg-[#FFF8DF] text-[#92400E]";
    case "green":
      return "bg-[#E9F6EE] text-[#15803D]";
  }
}

export interface SupportEscalationComplaintsAdrProps {
  readonly onGuidanceChange?: (payload: {
    readonly employees: EmployeeBand | null;
    readonly stage: ComplaintStage | null;
  }) => void;
}

export default function SupportEscalationComplaintsAdr({
  onGuidanceChange,
}: SupportEscalationComplaintsAdrProps) {
  const [employees, setEmployees] = useState<EmployeeBand | null>(null);
  const [stage, setStage] = useState<ComplaintStage | null>(null);

  const handleSelectEmployees = (value: EmployeeBand) => {
    const nextValue = employees === value ? null : value;
    setEmployees(nextValue);
    onGuidanceChange?.({ employees: nextValue, stage });
  };

  const handleSelectStage = (value: ComplaintStage) => {
    const nextValue = stage === value ? null : value;
    setStage(nextValue);
    onGuidanceChange?.({ employees, stage: nextValue });
  };

  const guidance = useMemo(() => {
    if (!employees || !stage) {
      return {
        heading: "Answer both questions",
        body: "We'll show general guidance on whether independent review might apply.",
      };
    }

    if (stage === "Just made it") {
      return {
        heading: "Usually early in our complaint process",
        body: "Independent ADR normally applies once a complaint has been through our internal process for a set period or reached deadlock, rather than immediately after raising it.",
      };
    }

    if (employees === "10 or fewer") {
      return {
        heading: "Independent ADR may be worth checking",
        body: "Small businesses with 10 or fewer employees are commonly within scope for approved ADR schemes once unresolved for a set time or after a deadlock letter—confirm eligibility with us or the scheme.",
      };
    }

    if (employees === "More than 10") {
      return {
        heading: "Check scheme eligibility rules carefully",
        body: "Eligibility for independent ADR often has micro-business or employee thresholds, so check whether your business size and contract terms qualify alongside any deadlock or timeframe rules.",
      };
    }

    return {
      heading: "Check employee count and complaint stage",
      body: "Whether independent ADR might apply depends on both your business size eligibility and how long the complaint has been open or whether a deadlock letter has been issued.",
    };
  }, [employees, stage]);

  return (
    <section
      id="escalation-complaints-adr"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              07
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              WHEN YOU NEED MORE
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Escalation, complaints and independent review.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[580px]">
            Three separate routes. Escalating never opens a complaint without
            you choosing to.
          </p>
        </div>

        {/* 3-Column Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {ESCALATION_ROUTES.map((route) => {
            const pillClass = getRoutePillClasses(route.tone);

            return (
              <article
                key={route.id}
                className="bg-white rounded-[18px] border border-[#E2E8F0] overflow-hidden shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col"
              >
                {/* Top Photo with Step Number Badge */}
                <div className="relative w-full h-[155px] sm:h-[165px] bg-[#1E293B] overflow-hidden">
                  <img
                    src={route.imageSrc}
                    alt={route.imageAlt}
                    className="w-full h-full object-cover object-[50%_20%]"
                  />

                  <span className="absolute top-3.5 left-3.5 w-6 h-6 rounded-[6px] bg-[#FFC119] text-[#0B2241] text-[11.5px] font-extrabold inline-flex items-center justify-center shadow-xs">
                    {route.stepNumber}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#0B2241] text-[16px] font-extrabold leading-[1.3] mb-1.5">
                      {route.title}
                    </h3>

                    <p className="text-[#64748B] text-[12px] leading-[1.5] mb-4">
                      {route.description}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {route.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`rounded-[8px] px-3.5 py-2 text-[11.5px] font-bold leading-[1.35] ${pillClass}`}
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom ADR Eligibility Helper Card */}
        <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-6 sm:p-7 shadow-[0_6px_20px_rgba(11,34,65,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Questions & Pill Selectors */}
          <div className="lg:col-span-7">
            <h3 className="text-[#0B2241] text-[16px] font-extrabold leading-[1.3] mb-1">
              Could ADR apply to you?
            </h3>

            <p className="text-[#64748B] text-[11.5px] leading-[1.5] mb-4">
              A quick guide, not a legal decision. Eligibility rules are
              confirmed with you.
            </p>

            {/* Question 1: Business Size */}
            <div className="mb-4">
              <p className="text-[#0B2241] text-[12px] font-bold leading-[1.4] mb-2">
                How many employees does your business have?
              </p>

              <div
                role="radiogroup"
                aria-label="How many employees does your business have?"
                className="flex flex-wrap gap-2"
              >
                {EMPLOYEE_BANDS.map((band) => {
                  const isSelected = employees === band;
                  return (
                    <button
                      key={band}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectEmployees(band)}
                      className={`px-3.5 py-2 rounded-[8px] border text-[11.5px] font-bold leading-none transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061A33] border-[#061A33] text-[#FFC119] shadow-2xs"
                          : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                      }`}
                    >
                      {band}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Complaint Stage */}
            <div>
              <p className="text-[#0B2241] text-[12px] font-bold leading-[1.4] mb-2">
                Where is your complaint?
              </p>

              <div
                role="radiogroup"
                aria-label="Where is your complaint?"
                className="flex flex-wrap gap-2"
              >
                {COMPLAINT_STAGES.map((itemStage) => {
                  const isSelected = stage === itemStage;
                  return (
                    <button
                      key={itemStage}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectStage(itemStage)}
                      className={`px-3.5 py-2 rounded-[8px] border text-[11.5px] font-bold leading-none transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061A33] border-[#061A33] text-[#FFC119] shadow-2xs"
                          : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                      }`}
                    >
                      {itemStage}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Guidance Box */}
          <div className="lg:col-span-5 bg-[#F1F4F8] rounded-[14px] p-5 sm:p-6">
            <p className="text-[#1963DD] text-[10px] font-extrabold tracking-[0.12em] uppercase mb-1.5">
              GUIDANCE
            </p>

            <h4 className="text-[#0B2241] text-[15px] font-extrabold leading-[1.3] mb-1.5">
              {guidance.heading}
            </h4>

            <p className="text-[#64748B] text-[12px] leading-[1.55]">
              {guidance.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

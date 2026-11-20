"use client";

import React from "react";
import {
  AlertTriangle,
  Clock,
  Building2,
  Plug,
  Wifi,
  FileText,
} from "lucide-react";

type ChangeIconKey =
  | "access"
  | "appointment"
  | "permission"
  | "equipment"
  | "activation"
  | "extra-works";

interface ChangeScenarioCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconKey: ChangeIconKey;
}

const CHANGE_SCENARIOS: readonly ChangeScenarioCard[] = [
  {
    id: "engineer-couldnt-get-in",
    title: "Engineer couldn't get in",
    description: "We explain why and help you rebook through your account.",
    iconKey: "access",
  },
  {
    id: "missed-appointment",
    title: "Missed appointment",
    description:
      "We'll contact you about a new visit. Your original status stays until it's rebooked.",
    iconKey: "appointment",
  },
  {
    id: "permission-refused",
    title: "Permission refused",
    description: "A case manager talks you through other options.",
    iconKey: "permission",
  },
  {
    id: "equipment-delayed",
    title: "Equipment delayed",
    description: 'You\'ll see "pending", never a guessed delivery date.',
    iconKey: "equipment",
  },
  {
    id: "activation-failed",
    title: "Activation failed",
    description: "We escalate it and help you keep your old service running.",
    iconKey: "activation",
  },
  {
    id: "extra-works-needed",
    title: "Extra works needed",
    description: "Any new charge needs your agreement before work goes ahead.",
    iconKey: "extra-works",
  },
];

function renderScenarioIcon(iconKey: ChangeIconKey) {
  switch (iconKey) {
    case "access":
      return (
        <AlertTriangle
          className="w-4 h-4 text-[#FFC119] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "appointment":
      return (
        <Clock
          className="w-4 h-4 text-[#FFC119] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "permission":
      return (
        <Building2
          className="w-4 h-4 text-[#FFC119] stroke-[2]"
          aria-hidden="true"
        />
      );
    case "equipment":
      return (
        <Plug
          className="w-4 h-4 text-[#FFC119] stroke-[2]"
          aria-hidden="true"
        />
      );
    case "activation":
      return (
        <Wifi
          className="w-4 h-4 text-[#FFC119] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "extra-works":
      return (
        <FileText
          className="w-4 h-4 text-[#FFC119] stroke-[2]"
          aria-hidden="true"
        />
      );
  }
}

export default function OnboardingIfSomethingChanges() {
  return (
    <section
      id="if-something-changes"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              09
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              IF SOMETHING CHANGES
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[700px]">
            What happens when plans don&apos;t go to plan.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            Honest recovery for the most common issues. No silent delays.
          </p>
        </div>

        {/* 3x2 Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHANGE_SCENARIOS.map((scenario) => (
            <article
              key={scenario.id}
              className="bg-[#F3F5F8] rounded-[16px] p-5 sm:p-6 flex items-start gap-4 border border-[#E2E8F0]/60"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#061A33] flex items-center justify-center shrink-0 mt-0.5">
                {renderScenarioIcon(scenario.iconKey)}
              </div>

              <div className="min-w-0">
                <h3 className="text-[#0B2241] text-[14.5px] font-bold leading-[1.3] mb-1.5">
                  {scenario.title}
                </h3>
                <p className="text-[#64748B] text-[12.5px] leading-[1.5]">
                  {scenario.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

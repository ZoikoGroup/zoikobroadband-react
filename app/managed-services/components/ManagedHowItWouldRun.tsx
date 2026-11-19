"use client";

import React from "react";
import {
  TrendingUp,
  ArrowLeftRight,
  Headphones,
  KeyRound,
  Lock,
  Zap,
  FileText,
  Info,
} from "lucide-react";

type RunTopicIconKey =
  | "operations"
  | "change-management"
  | "support-escalation"
  | "security-access"
  | "data-subcontractors"
  | "resilience"
  | "reporting";

interface RunTopicCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconKey: RunTopicIconKey;
  readonly spanClass?: string;
}

const RUN_TOPIC_CARDS: readonly RunTopicCard[] = [
  {
    id: "operations",
    title: "Operations",
    description:
      "How monitoring and maintenance would work, only where it's verified for your service.",
    iconKey: "operations",
  },
  {
    id: "change-management",
    title: "Change management",
    description: "Approvals, maintenance windows and a way to roll back.",
    iconKey: "change-management",
  },
  {
    id: "support-escalation",
    title: "Support & escalation",
    description:
      "Linked to Business Support & SLAs. No invented response times.",
    iconKey: "support-escalation",
  },
  {
    id: "security-access",
    title: "Security & access",
    description: "Least-privilege access you approve, logged and removable.",
    iconKey: "security-access",
  },
  {
    id: "data-subcontractors",
    title: "Data & subcontractors",
    description:
      "Who processes data, where, and under what terms, confirmed by Legal.",
    iconKey: "data-subcontractors",
  },
  {
    id: "resilience",
    title: "Resilience",
    description:
      "Dependencies and backup expectations, without promising recovery.",
    iconKey: "resilience",
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Review cadence and reports, only once agreed.",
    iconKey: "reporting",
    spanClass: "sm:col-span-2",
  },
];

function renderRunTopicIcon(iconKey: RunTopicIconKey) {
  switch (iconKey) {
    case "operations":
      return (
        <TrendingUp
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "change-management":
      return (
        <ArrowLeftRight
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "support-escalation":
      return (
        <Headphones
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "security-access":
      return (
        <KeyRound
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "data-subcontractors":
      return (
        <Lock
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "resilience":
      return (
        <Zap
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "reporting":
      return (
        <FileText
          className="w-4 h-4 text-[#0B2241] stroke-[2]"
          aria-hidden="true"
        />
      );
  }
}

export interface ManagedHowItWouldRunProps {
  readonly topImageSrc?: string;
  readonly topImageAlt?: string;
  readonly bottomImageSrc?: string;
  readonly bottomImageAlt?: string;
}

export default function ManagedHowItWouldRun({
  topImageSrc = "/Images/onb/8.png",
  topImageAlt = "Overhead view of wooden desk with coffee cup, glasses, laptop edge and small plant",
  bottomImageSrc = "/Images/onb/12.png",
  bottomImageAlt = "Support advisor wearing a headset smiling at a computer workstation",
}: ManagedHowItWouldRunProps) {
  return (
    <section
      id="how-it-would-run"
      className="relative w-full bg-[#061A33] py-16 md:py-20 font-sans antialiased overflow-hidden"
    >
      {/* Subtle decorative ring accent on top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-28 w-[340px] h-[340px] rounded-full border-[32px] border-white/[0.04]"
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              05
            </span>
            <span className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase">
              HOW IT WOULD RUN
            </span>
          </div>

          <h2 className="text-white text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Operations, change, support, security and data.
          </h2>

          <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[560px]">
            The questions to answer before anything is managed. Each depends on
            what&apos;s verified for your service.
          </p>
        </div>

        {/* Main 2-Column Layout: Left Topic Grid + Right Stacked Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 7 Operational Topic Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RUN_TOPIC_CARDS.map((card) => (
              <div
                key={card.id}
                className={`bg-[#0E2644] rounded-[14px] border border-white/10 p-5 flex flex-col justify-between ${
                  card.spanClass ?? ""
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-[7px] bg-[#FFC119] flex items-center justify-center mb-3.5">
                    {renderRunTopicIcon(card.iconKey)}
                  </div>

                  <h3 className="text-white text-[14.5px] font-bold leading-[1.3] mb-1.5">
                    {card.title}
                  </h3>

                  <p className="text-[#94A3B8] text-[12px] leading-[1.5]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Two Stacked Photos with Bottom Verification Callout */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="w-full h-[210px] sm:h-[235px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
              <img
                src={topImageSrc}
                alt={topImageAlt}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="relative w-full flex-1 min-h-[230px] sm:min-h-[260px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
              <img
                src={bottomImageSrc}
                alt={bottomImageAlt}
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
              />

              {/* Subtle bottom scrim to keep pill callout crisp over photo */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061A33]/75 to-transparent"
              />

              <div className="relative z-10 h-full p-3.5 sm:p-4 flex items-end">
                <div className="w-full bg-white/95 backdrop-blur-xs rounded-[10px] px-3.5 py-2.5 shadow-[0_6px_18px_rgba(6,26,51,0.28)] flex items-center gap-2">
                  <Info
                    className="w-3.5 h-3.5 text-[#1963DD] shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-[#0B2241] text-[11px] font-bold leading-[1.4]">
                    No 24/7, proactive monitoring or certification claims unless
                    verified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

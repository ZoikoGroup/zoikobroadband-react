"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

type SituationId =
  | "home-switching-both"
  | "home-number-only"
  | "moving-address"
  | "recently-cancelled"
  | "arranging-own-switch"
  | "business-one-line"
  | "business-several-sites"
  | "telecare-safety-devices"
  | "unexpected-switch"
  | "calls-failing-after-transfer";

interface PortingSituationOption {
  readonly id: SituationId;
  readonly pillLabel: string;
  readonly badgeLabel: string;
  readonly headline: string;
  readonly description: string;
  readonly checkSummary: string;
  readonly actionLabel: string;
  readonly actionHref: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const PORTING_SITUATIONS: readonly PortingSituationOption[] = [
  {
    id: "home-switching-both",
    pillLabel: "Home: switching both",
    badgeLabel: "Home",
    headline: "Ask your new provider to keep your number",
    description:
      "For many home switches, your new provider arranges the switch for you. Have your current provider details ready and choose to keep your number.",
    checkSummary:
      "That the switch process applies to your line, and that your order and consent are separate.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Wireless router in the foreground with two colleagues discussing over a laptop in the background",
  },
  {
    id: "home-number-only",
    pillLabel: "Home: number only",
    badgeLabel: "Home",
    headline: "Check number-only porting options before changing lines",
    description:
      "Moving a number without moving broadband at the same time depends on your current line type and provider rules. Confirm details before cancelling anything.",
    checkSummary:
      "Whether your number can port standalone and how your existing service is billed.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/12.png",
    imageAlt: "Modern desk phone with illuminated display on a workspace",
  },
  {
    id: "moving-address",
    pillLabel: "Moving address",
    badgeLabel: "Relocation",
    headline: "Check exchange and area rules when moving premises",
    description:
      "Geographic numbers are often tied to specific exchanges or areas. A move can affect whether a number stays active or needs a new arrangement.",
    checkSummary:
      "Whether your number can move to the new address or if area rules apply.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/17.png",
    imageAlt: "City skyline with bridge and glass tower at dusk",
  },
  {
    id: "recently-cancelled",
    pillLabel: "Recently cancelled",
    badgeLabel: "Time-sensitive",
    headline: "Act quickly if a line or number was recently cancelled",
    description:
      "Cancelled numbers can enter a limited recovery window or be released back into the pool. Check your status as soon as possible.",
    checkSummary:
      "Whether the number is still within a recovery window and eligible to port.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of wooden desk with laptop, glasses, coffee and small plant",
  },
  {
    id: "arranging-own-switch",
    pillLabel: "Arranging my own switch",
    badgeLabel: "Customer-led",
    headline: "Coordinate timing carefully if you arrange the switch yourself",
    description:
      "When you manage parts of a switch directly, keep accurate account details and avoid stopping active services before port confirmation.",
    checkSummary:
      "Which steps you lead versus what requires provider authorisation.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/11.png",
    imageAlt: "Three colleagues reviewing details together on a laptop",
  },
  {
    id: "business-one-line",
    pillLabel: "Business: one line",
    badgeLabel: "Business",
    headline: "Keep your single business line running during transfer",
    description:
      "For a single business line, check compatibility, account authority and target switch timing so customer calls stay reachable.",
    checkSummary:
      "Line compatibility, account ownership checks and switch-over timing.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Business representative speaking on the phone at a desk",
  },
  {
    id: "business-several-sites",
    pillLabel: "Business: several sites or a range",
    badgeLabel: "Multi-site",
    headline: "Plan number ranges and multi-site ports in stages",
    description:
      "Number blocks, hunt groups and multiple sites often need staged porting so branches and extensions stay connected throughout.",
    checkSummary:
      "Number range portability, site order sequence and dependency checks.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/17.png",
    imageAlt: "City skyline representing multiple business locations",
  },
  {
    id: "telecare-safety-devices",
    pillLabel: "Telecare or safety devices",
    badgeLabel: "Priority care",
    headline: "Confirm line compatibility for telecare or safety alarms",
    description:
      "Alarm, pendant or safety equipment on a line requires extra care and compatibility checks before any line or number change goes ahead.",
    checkSummary:
      "Safety device compatibility and extra support steps before switching.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/10.png",
    imageAlt: "Specialist advisor with headset ready to assist",
  },
  {
    id: "unexpected-switch",
    pillLabel: "Unexpected switch",
    badgeLabel: "Dispute & review",
    headline: "Report a number or line switch you did not authorise",
    description:
      "If a number or service moved without your clear consent, gather your account details and raise it promptly so it can be investigated.",
    checkSummary:
      "Switch authorisation records, account details and next review steps.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/19.png",
    imageAlt: "Customer checking mobile updates outdoors",
  },
  {
    id: "calls-failing-after-transfer",
    pillLabel: "Calls failing after a transfer",
    badgeLabel: "Post-port check",
    headline: "Log routing or incoming call issues after a port completes",
    description:
      "Sometimes inbound or outbound calls take time to route across networks after a switch. Note which numbers fail and when.",
    checkSummary:
      "Whether post-port routing is still settling or needs a fault report.",
    actionLabel: "Check my transfer path",
    actionHref: "#transfer-eligibility-check",
    imageSrc: "/Images/onb/12.png",
    imageAlt: "Desk handset used for checking call routing",
  },
];

export interface PortingYourSituationProps {
  readonly defaultSituationId?: SituationId;
  readonly onSelectSituation?: (situationId: SituationId) => void;
  readonly onActionClick?: (situation: PortingSituationOption) => void;
}

export default function PortingYourSituation({
  defaultSituationId = "home-switching-both",
  onSelectSituation,
  onActionClick,
}: PortingYourSituationProps) {
  const [selectedId, setSelectedId] = useState<SituationId>(defaultSituationId);

  const activeSituation =
    PORTING_SITUATIONS.find((item) => item.id === selectedId) ??
    PORTING_SITUATIONS[0];

  const handleSelect = (id: SituationId) => {
    setSelectedId(id);
    onSelectSituation?.(id);
  };

  return (
    <section
      id="your-situation"
      className="w-full bg-[#FFF8DC] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              02
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              YOUR SITUATION
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            What&apos;s happening with your number?
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[600px]">
            Pick the closest match for advice that fits. No path here moves your
            number by itself.
          </p>
        </div>

        {/* Situation Filter Pills */}
        <div
          role="tablist"
          aria-label="Porting situations"
          className="flex flex-wrap gap-2 mb-7"
        >
          {PORTING_SITUATIONS.map((situation) => {
            const isSelected = situation.id === activeSituation?.id;

            return (
              <button
                key={situation.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelect(situation.id)}
                className={`px-3.5 py-2 rounded-full border text-[11.5px] font-bold leading-none transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#061A33] border-[#061A33] text-white shadow-[0_4px_12px_rgba(6,26,51,0.18)]"
                    : "bg-white hover:bg-[#FFFDF6] border-[#F1E2AE] text-[#0B2241]"
                }`}
              >
                {situation.pillLabel}
              </button>
            );
          })}
        </div>

        {/* Main Split Guidance Card */}
        {activeSituation ? (
          <div className="rounded-[20px] bg-white border border-[#F3E5B5] overflow-hidden shadow-[0_8px_24px_rgba(11,34,65,0.05)] grid grid-cols-1 lg:grid-cols-12">
            {/* Left Photo with Category Pill Badge */}
            <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] bg-[#1E293B] overflow-hidden">
              <img
                src="/Images/keep/2.png"
                alt={activeSituation.imageAlt}
                className="w-full h-full object-cover object-center"
              />

              <span className="absolute top-4 left-4 inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-none shadow-xs">
                {activeSituation.badgeLabel}
              </span>
            </div>

            {/* Right Guidance Panel */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-center">
              <h3 className="text-[#0B2241] text-[20px] sm:text-[23px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-2.5">
                {activeSituation.headline}
              </h3>

              <p className="text-[#475569] text-[13px] leading-[1.6] mb-5 max-w-[580px]">
                {activeSituation.description}
              </p>

              {/* What we'll check callout */}
              <div className="rounded-[10px] bg-[#F4F7FA] border border-[#E2E8F0] px-4 py-3 mb-6 flex items-start gap-2.5">
                <ShieldCheck
                  className="w-4 h-4 text-[#1963DD] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-[#334155] text-[11.5px] leading-[1.5]">
                  <span className="font-extrabold text-[#0B2241]">
                    What we&apos;ll check:
                  </span>{" "}
                  {activeSituation.checkSummary}
                </p>
              </div>

              {/* Primary Action Button */}
              <div>
                <a
                  href={activeSituation.actionHref}
                  onClick={() => onActionClick?.(activeSituation)}
                  className="inline-flex items-center justify-center gap-2 px-4.5 h-[40px] rounded-[8px] bg-[#061A33] hover:bg-[#0E2B52] text-white text-[12px] font-bold transition-colors shadow-2xs"
                >
                  <span>{activeSituation.actionLabel}</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[#FFC119] stroke-[2.3]"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

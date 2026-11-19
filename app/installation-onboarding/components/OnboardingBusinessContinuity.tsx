"use client";

import React, { useState } from "react";

export type ContinuitySystemKey =
  | "card-machines"
  | "alarms"
  | "lift-lines"
  | "telecare"
  | "business-phones"
  | "cctv"
  | "vpn-remote-access"
  | "cloud-systems"
  | "none-of-these";

interface ContinuitySystemOption {
  readonly key: ContinuitySystemKey;
  readonly label: string;
}

interface ContinuityCardItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly highlightWhen: readonly ContinuitySystemKey[];
}

const CONTINUITY_SYSTEM_OPTIONS: readonly ContinuitySystemOption[] = [
  { key: "card-machines", label: "Card machines" },
  { key: "alarms", label: "Alarms" },
  { key: "lift-lines", label: "Lift lines" },
  { key: "telecare", label: "Telecare" },
  { key: "business-phones", label: "Business phones" },
  { key: "cctv", label: "CCTV" },
  { key: "vpn-remote-access", label: "VPN or remote access" },
  { key: "cloud-systems", label: "Cloud systems" },
  { key: "none-of-these", label: "None of these" },
];

const ALL_ACTIVE_SYSTEMS: readonly ContinuitySystemKey[] = [
  "card-machines",
  "alarms",
  "lift-lines",
  "telecare",
  "business-phones",
  "cctv",
  "vpn-remote-access",
  "cloud-systems",
];

const CONTINUITY_CARDS: readonly ContinuityCardItem[] = [
  {
    id: "keep-current-service",
    title: "Keep your current service running",
    description:
      "Don't cancel anything until your new service is tested and handed over.",
    imageSrc: "/Images/onb/14.png",
    imageAlt: "Person working by a wireless router in an office setting",
    highlightWhen: ALL_ACTIVE_SYSTEMS,
  },
  {
    id: "plan-number-moves",
    title: "Plan number moves separately",
    description:
      "Moving phone numbers is its own process. Continuity isn't guaranteed until it's confirmed.",
    imageSrc: "/Images/onb/15.png",
    imageAlt: "Desk telephone with display screen on an office desk",
    highlightWhen: ["business-phones"],
  },
  {
    id: "run-both-services",
    title: "Run both services, if needed",
    description:
      "Overlapping services for a while may be possible, subject to a quote.",
    imageSrc: "/Images/onb/17.png",
    imageAlt: "City skyline with bridge and glass tower at dusk",
    highlightWhen: [
      "alarms",
      "lift-lines",
      "telecare",
      "cctv",
      "vpn-remote-access",
    ],
  },
  {
    id: "continuity-review",
    title: "A continuity review",
    description:
      "For alarms, card machines or telecare, a specialist reviews your plan with you.",
    imageSrc: "/Images/onb/12.png",
    imageAlt: "Support specialist with headset smiling at a desk",
    highlightWhen: ["alarms", "card-machines", "telecare"],
  },
];

export interface OnboardingBusinessContinuityProps {
  readonly onSelectionChange?: (
    selected: readonly ContinuitySystemKey[],
  ) => void;
}

export default function OnboardingBusinessContinuity({
  onSelectionChange,
}: OnboardingBusinessContinuityProps) {
  const [selectedSystems, setSelectedSystems] = useState<
    readonly ContinuitySystemKey[]
  >([]);

  const toggleSystem = (key: ContinuitySystemKey) => {
    setSelectedSystems((prev) => {
      let next: ContinuitySystemKey[];

      if (key === "none-of-these") {
        next = prev.includes("none-of-these") ? [] : ["none-of-these"];
      } else {
        const withoutNone = prev.filter((item) => item !== "none-of-these");
        next = withoutNone.includes(key)
          ? withoutNone.filter((item) => item !== key)
          : [...withoutNone, key];
      }

      onSelectionChange?.(next);
      return next;
    });
  };

  const hasActiveSelection =
    selectedSystems.length > 0 && !selectedSystems.includes("none-of-these");

  return (
    <section
      id="business-continuity"
      className="w-full bg-[#FFF8E1] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Heading, Copy & System Checkboxes */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                06
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                BUSINESS CONTINUITY
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[42px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-4 max-w-[430px]">
              Keep your business running during the switch.
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[440px] mb-6">
              Some systems rely on your current lines. Tell us what you use, and
              we&apos;ll plan around it.
            </p>

            <fieldset>
              <legend className="text-[#0B2241] text-[13px] font-bold mb-3">
                Which of these does your business rely on?
              </legend>

              <div className="flex flex-wrap gap-2.5">
                {CONTINUITY_SYSTEM_OPTIONS.map((option) => {
                  const isChecked = selectedSystems.includes(option.key);

                  return (
                    <label
                      key={option.key}
                      className={`inline-flex items-center gap-2 px-3.5 h-[38px] rounded-[8px] border text-[12px] font-bold cursor-pointer select-none transition-colors ${
                        isChecked
                          ? "bg-white border-[#0B2241] text-[#0B2241] shadow-[0_2px_6px_rgba(11,34,65,0.06)]"
                          : "bg-white/90 hover:bg-white border-[#E5D8A5] text-[#0B2241]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSystem(option.key)}
                        className="w-3.5 h-3.5 rounded-[3px] border border-[#CBD5E1] accent-[#0B2241] cursor-pointer"
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Right Column: Stacked Continuity Guidance Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            {CONTINUITY_CARDS.map((card) => {
              const isRelevant =
                hasActiveSelection &&
                selectedSystems.some((sys) => card.highlightWhen.includes(sys));

              return (
                <article
                  key={card.id}
                  className={`bg-white rounded-[16px] p-4 flex items-center gap-4 transition-all ${
                    isRelevant
                      ? "border-2 border-[#0B2241] shadow-[0_8px_22px_rgba(11,34,65,0.08)]"
                      : "border border-[#F1E5B8] shadow-[0_4px_14px_rgba(11,34,65,0.03)]"
                  }`}
                >
                  <div className="w-[78px] sm:w-[88px] h-[58px] sm:h-[64px] rounded-[10px] overflow-hidden bg-[#E2E8F0] shrink-0">
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[#0B2241] text-[14.5px] font-bold leading-[1.3] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-[#64748B] text-[12px] leading-[1.5]">
                      {card.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

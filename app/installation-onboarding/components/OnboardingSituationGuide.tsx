"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

type SituationKey =
  | "new-connection"
  | "switching-provider"
  | "moving-premises"
  | "adding-a-site"
  | "upgrading"
  | "not-sure";

type ServiceTypeKey = "fttp" | "sogea" | "not-sure";

interface SituationOption {
  readonly key: SituationKey;
  readonly label: string;
}

interface ServiceTypeOption {
  readonly key: ServiceTypeKey;
  readonly label: string;
}

interface PathGuideContent {
  readonly steps: readonly string[];
  readonly caveat: string;
}

const SITUATION_OPTIONS = [
  { key: "new-connection", label: "New connection" },
  { key: "switching-provider", label: "Switching provider" },
  { key: "moving-premises", label: "Moving premises" },
  { key: "adding-a-site", label: "Adding a site" },
  { key: "upgrading", label: "Upgrading" },
  { key: "not-sure", label: "Not sure" },
] as const satisfies readonly SituationOption[];

const SERVICE_TYPE_OPTIONS = [
  { key: "fttp", label: "Full Fibre (FTTP)" },
  { key: "sogea", label: "Part Fibre (SOGEA)" },
  { key: "not-sure", label: "Not sure" },
] as const satisfies readonly ServiceTypeOption[];

function getPathContent(
  situation: SituationKey,
  serviceType: ServiceTypeKey,
): PathGuideContent {
  if (situation === "new-connection" && serviceType === "fttp") {
    return {
      steps: [
        "Confirm your address and order.",
        "Check your fibre box (ONT). An existing one may allow remote activation; a new one needs an engineer visit.",
        "A survey or landlord permission, if your building needs it.",
        "Activation, then testing with you.",
      ],
      caveat:
        "that it will be same-day or self-install, or that every site needs drilling.",
    };
  }

  if (serviceType === "sogea") {
    return {
      steps: [
        "Confirm your address, line availability, and order details.",
        "Check existing master socket wiring and confirm whether an engineer appointment is needed.",
        "Plan any voice number porting or separate VoIP setup before switchover.",
        "Line activation and connection testing with your router.",
      ],
      caveat:
        "that existing analogue alarms, card terminals, or voice lines will transfer without separate setup.",
    };
  }

  if (serviceType === "fttp") {
    return {
      steps: [
        "Confirm your address, order scope, and preferred target date.",
        "Verify whether a working fibre box (ONT) is already installed or an engineer visit is required.",
        "Arrange any building access, wayleave, or landlord sign-off if applicable.",
        "Service activation and final connection verification.",
      ],
      caveat:
        "that existing internal cabling or multi-floor Wi-Fi coverage is included unless agreed in writing.",
    };
  }

  return {
    steps: [
      "Check address availability to confirm whether Full Fibre (FTTP) or Part Fibre (SOGEA) can be supplied.",
      "Review current lines, routers, and any building access requirements.",
      "Confirm installation path and engineer requirements once your order is validated.",
      "Activation and handover testing with your team.",
    ],
    caveat:
      "exact lead times or installation requirements before your address and order are checked.",
  };
}

export default function OnboardingSituationGuide() {
  const [selectedSituation, setSelectedSituation] =
    useState<SituationKey>("new-connection");
  const [selectedServiceType, setSelectedServiceType] =
    useState<ServiceTypeKey>("fttp");

  const activeSituation =
    SITUATION_OPTIONS.find((item) => item.key === selectedSituation) ??
    SITUATION_OPTIONS[0];
  const activeServiceType =
    SERVICE_TYPE_OPTIONS.find((item) => item.key === selectedServiceType) ??
    SERVICE_TYPE_OPTIONS[0];

  const pathContent = getPathContent(selectedSituation, selectedServiceType);

  return (
    <section className="w-full bg-white py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              01
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              YOUR SITUATION
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[42px] font-extrabold leading-[1.13] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            What usually happens for your installation?
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[530px]">
            Choose your situation and service type to see the typical path. Your
            order confirms the exact steps.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
          {/* Your situation */}
          <div className="lg:col-span-6">
            <p className="text-[#0B2241] text-[12.5px] font-bold mb-2.5">
              Your situation
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SITUATION_OPTIONS.map((option) => {
                const isSelected = option.key === selectedSituation;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSelectedSituation(option.key)}
                    aria-pressed={isSelected}
                    className={`px-4 h-[38px] rounded-full text-[12.5px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#061A33] text-[#FFC119] border border-[#061A33]"
                        : "bg-white text-[#0B2241] border border-[#CBD5E1] hover:border-[#0B2241]/50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service type */}
          <div className="lg:col-span-6">
            <p className="text-[#0B2241] text-[12.5px] font-bold mb-2.5">
              Service type
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_TYPE_OPTIONS.map((option) => {
                const isSelected = option.key === selectedServiceType;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSelectedServiceType(option.key)}
                    aria-pressed={isSelected}
                    className={`px-4 h-[38px] rounded-full text-[12.5px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#061A33] text-[#FFC119] border border-[#061A33]"
                        : "bg-white text-[#0B2241] border border-[#CBD5E1] hover:border-[#0B2241]/50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Split Card */}
        <div className="bg-[#F3F5F8] rounded-[20px] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Image Side */}
          <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px]">
            <img
              src="/Images/onb/2.png"
              alt="Business colleagues reviewing installation with a white wireless router on the desk"
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute top-4 left-4 inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#061A33] text-[#FFC119] text-[11px] font-bold tracking-[0.01em] shadow-sm">
              {activeServiceType.label}
            </span>
          </div>

          {/* Right Steps & Caveat Side */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-[#0B2241] text-[22px] sm:text-[25px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-5">
                {activeSituation.label} · {activeServiceType.label}
              </h3>

              <ol className="space-y-3.5 mb-7">
                {pathContent.steps.map((stepText, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-[22px] h-[22px] rounded-[6px] bg-[#061A33] text-[#FFC119] text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[#475569] text-[13.5px] leading-[1.5]">
                      {stepText}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Warning / Assumption Box */}
            <div className="bg-[#FEF2C7] rounded-[12px] px-4 py-3.5 flex items-start gap-2.5">
              <AlertTriangle
                className="w-4 h-4 text-[#92400E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-[#78350F] text-[12.5px] leading-[1.5]">
                <strong className="font-bold text-[#0B2241]">
                  We can&apos;t assume:
                </strong>{" "}
                {pathContent.caveat}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ArrowUpRight, Info } from "lucide-react";

type StageBadgeType = "typical" | "may-be-needed";

interface InstallationStage {
  readonly step: number;
  readonly badge: StageBadgeType;
  readonly title: string;
  readonly description: string;
  readonly mapTargetId: string;
}

const INSTALLATION_STAGES = [
  {
    step: 1,
    badge: "typical",
    title: "Order check",
    description: "We confirm your order, address and service.",
    mapTargetId: "stage-1",
  },
  {
    step: 2,
    badge: "typical",
    title: "Site readiness",
    description: "Contact, access, power and safe equipment location.",
    mapTargetId: "stage-2",
  },
  {
    step: 3,
    badge: "may-be-needed",
    title: "Permission & survey",
    description: "Landlord approval or a survey, if needed.",
    mapTargetId: "stage-3",
  },
  {
    step: 4,
    badge: "may-be-needed",
    title: "Appointment",
    description: "A visit, only once it's confirmed.",
    mapTargetId: "stage-4",
  },
  {
    step: 5,
    badge: "typical",
    title: "Installation",
    description: "Equipment and cabling, where needed.",
    mapTargetId: "stage-5",
  },
  {
    step: 6,
    badge: "typical",
    title: "Activation",
    description: "Network switch-on and testing.",
    mapTargetId: "stage-6",
  },
  {
    step: 7,
    badge: "typical",
    title: "Handover",
    description: "Your service details and support path.",
    mapTargetId: "stage-7",
  },
] as const satisfies readonly InstallationStage[];

interface OnboardingInstallationStepsProps {
  readonly onSelectStage?: (stageNumber: number) => void;
}

export default function OnboardingInstallationSteps({
  onSelectStage,
}: OnboardingInstallationStepsProps) {
  return (
    <section
      id="installation-steps"
      className="w-full bg-[#061A33] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              02
            </span>
            <span className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase">
              INSTALLATION STEPS
            </span>
          </div>

          <h2 className="text-white text-[34px] sm:text-[42px] font-extrabold leading-[1.13] tracking-[-0.02em] mb-3.5 max-w-[560px]">
            Seven typical stages, from order to handover.
          </h2>

          <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[540px]">
            Some stages only apply to certain services or premises. We&apos;ll
            tell you which apply to you.
          </p>
        </div>

        {/* 7 Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3.5 mb-7">
          {INSTALLATION_STAGES.map((stage) => {
            const isConditional = stage.badge === "may-be-needed";

            return (
              <article
                key={stage.step}
                className={`rounded-[16px] p-4 flex flex-col justify-between min-h-[205px] transition-colors ${
                  isConditional
                    ? "bg-[#1A2622] border border-[#5B5224] hover:border-[#FFC119]/70"
                    : "bg-[#0F2744] border border-white/10 hover:border-white/25"
                }`}
              >
                <div>
                  {/* Number Badge + Status Label */}
                  <div className="flex items-start gap-2.5 mb-4">
                    <span className="w-[28px] h-[28px] rounded-full bg-[#FFC119] text-[#0B2241] text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {stage.step}
                    </span>

                    {isConditional ? (
                      <span className="text-[#FFC119] text-[9.5px] font-extrabold tracking-[0.08em] uppercase leading-[1.2] pt-0.5">
                        MAY BE
                        <br />
                        NEEDED
                      </span>
                    ) : (
                      <span className="text-[#94A3B8] text-[9.5px] font-bold tracking-[0.1em] uppercase leading-[1.2] pt-2">
                        TYPICAL
                      </span>
                    )}
                  </div>

                  {/* Stage Title & Copy */}
                  <h3 className="text-white text-[14.5px] font-bold leading-[1.3] mb-1.5">
                    {stage.title}
                  </h3>

                  <p className="text-[#94A3B8] text-[12px] leading-[1.5] mb-5">
                    {stage.description}
                  </p>
                </div>

                {/* Footer Link */}
                <a
                  href={`#${stage.mapTargetId}`}
                  onClick={() => onSelectStage?.(stage.step)}
                  className="inline-flex items-center gap-1 text-[#FFC119] hover:text-[#FFD35A] text-[11.5px] font-bold leading-none transition-colors"
                >
                  <span>See on map</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 stroke-[2.2]"
                    aria-hidden="true"
                  />
                </a>
              </article>
            );
          })}
        </div>

        {/* Bottom Clarification Note */}
        <div className="flex items-start sm:items-center gap-2.5 text-[#CBD5E1] text-[12.5px] leading-[1.5]">
          <Info
            className="w-4 h-4 text-[#FFC119] shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <p>
            Being installed isn&apos;t the same as being activated, and
            activation isn&apos;t the same as a completed handover. We confirm
            each one separately.
          </p>
        </div>
      </div>
    </section>
  );
}

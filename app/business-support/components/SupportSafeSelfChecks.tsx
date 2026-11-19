"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ArrowRight,
  Check,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface SelfCheckStep {
  readonly stepNumber: number;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly criticalLineNote?: string;
}

const SELF_CHECK_STEPS: readonly SelfCheckStep[] = [
  {
    stepNumber: 1,
    id: "check-power-and-lights",
    title: "Check power and lights",
    description:
      "Make sure your router is switched on and note which lights are on, off or flashing.",
    imageSrc: "/Images/onb/3.png",
    imageAlt:
      "Person plugging a white router power adapter into a wall socket while holding a wireless router",
    criticalLineNote:
      "If phones, alarms or card machines rely on this line, avoid cutting power without checking continuity or emergency/card fallback first.",
  },
  {
    stepNumber: 2,
    id: "check-cables-and-connections",
    title: "Check cables and connections",
    description:
      "Check that line, WAN and Ethernet leads are firmly seated in the right ports with no visible damage.",
    imageSrc: "/Images/onb/14.png",
    imageAlt: "Wireless router and network cabling in a workspace",
    criticalLineNote:
      "Be careful not to disturb voice adapters, alarm lines or payment terminals connected to the same router or switch.",
  },
  {
    stepNumber: 3,
    id: "check-local-devices-and-wifi",
    title: "Check local devices and Wi-Fi",
    description:
      "Test on a wired device if possible, or check another device on Wi-Fi to see if the issue is isolated.",
    imageSrc: "/Images/onb/7.png",
    imageAlt: "Laptop, tablet and smartphone used to test local connectivity",
    criticalLineNote:
      "Keep card terminals and voice handsets in mind before changing network settings or disconnecting devices.",
  },
  {
    stepNumber: 4,
    id: "power-cycle-safely",
    title: "Power-cycle safely",
    description:
      "Switch off the router and any separate modem/ONT, wait 30–60 seconds, then power back on and allow time to sync.",
    imageSrc: "/Images/onb/16.png",
    imageAlt: "Workspace desk setup during a connection restart check",
    criticalLineNote:
      "Only power-cycle if safe for your site—restarting equipment can briefly interrupt alarms, voice lines or card payments.",
  },
  {
    stepNumber: 5,
    id: "note-what-you-saw",
    title: "Note what you saw",
    description:
      "Record any error lights, what happened before the drop and which devices are affected before reporting a fault.",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Team member on a call noting fault details at a desk",
    criticalLineNote:
      "Let our team know that phones, alarms or card machines rely on this connection when you get in touch.",
  },
];

export interface SupportSafeSelfChecksProps {
  readonly onCriticalDependencyChange?: (
    hasCriticalDependency: boolean,
  ) => void;
  readonly onStepChange?: (stepNumber: number) => void;
}

export default function SupportSafeSelfChecks({
  onCriticalDependencyChange,
  onStepChange,
}: SupportSafeSelfChecksProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [criticalDependency, setCriticalDependency] = useState(false);

  const currentStep = SELF_CHECK_STEPS[activeIndex] ?? SELF_CHECK_STEPS[0];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === SELF_CHECK_STEPS.length - 1;

  const handleSelectStep = (index: number) => {
    setActiveIndex(index);
    onStepChange?.(SELF_CHECK_STEPS[index]?.stepNumber ?? 1);
  };

  const handlePrevious = () => {
    if (isFirst) return;
    const nextIndex = activeIndex - 1;
    setActiveIndex(nextIndex);
    onStepChange?.(SELF_CHECK_STEPS[nextIndex]?.stepNumber ?? 1);
  };

  const handleNext = () => {
    if (isLast) {
      setActiveIndex(0);
      onStepChange?.(1);
      return;
    }
    const nextIndex = activeIndex + 1;
    setActiveIndex(nextIndex);
    onStepChange?.(SELF_CHECK_STEPS[nextIndex]?.stepNumber ?? 1);
  };

  const handleToggleCritical = () => {
    setCriticalDependency((prev) => {
      const next = !prev;
      onCriticalDependencyChange?.(next);
      return next;
    });
  };

  return (
    <section
      id="safe-checks"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow, Heading & Critical Line Toggle */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              02
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              SAFE SELF-CHECKS
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3 max-w-[540px]">
            Five quick checks before you report a fault.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px] mb-5">
            They often help, but they won&apos;t fix every fault. Skip any step
            that doesn&apos;t feel safe.
          </p>

          {/* Critical Dependency Checkbox Card */}
          <label
            className={`inline-flex items-center gap-3 px-4 py-3 rounded-[10px] border max-w-[340px] cursor-pointer select-none transition-all ${
              criticalDependency
                ? "bg-[#FFFBEB] border-[#F59E0B] shadow-[0_2px_8px_rgba(180,83,9,0.08)]"
                : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1]"
            }`}
          >
            <input
              type="checkbox"
              checked={criticalDependency}
              onChange={handleToggleCritical}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                criticalDependency
                  ? "bg-[#061A33] border-[#061A33] text-[#FFC119]"
                  : "bg-white border-[#CBD5E1]"
              }`}
            >
              {criticalDependency ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : null}
            </span>
            <span className="text-[#0B2241] text-[12px] font-bold leading-[1.35]">
              Phones, alarms or card machines rely on this connection
            </span>
          </label>
        </div>

        {/* Main Split Check Card */}
        <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden shadow-[0_8px_24px_rgba(11,34,65,0.05)] grid grid-cols-1 lg:grid-cols-12">
          {/* Left Photo Panel with "Check X of 5" Pill */}
          <div className="lg:col-span-6 relative min-h-[250px] sm:min-h-[300px] lg:min-h-[330px] bg-[#1E293B] overflow-hidden">
            <img
              src="/Images/mng/7.png"
              alt={currentStep.imageAlt}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="relative z-10 p-4 sm:p-5">
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-none shadow-xs">
                Check {currentStep.stepNumber} of {SELF_CHECK_STEPS.length}
              </span>
            </div>
          </div>

          {/* Right Step Selector, Instructions & Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
            <div>
              {/* Step 1–5 Pills */}
              <div
                role="tablist"
                aria-label="Self-check steps"
                className="flex items-center gap-2 mb-5"
              >
                {SELF_CHECK_STEPS.map((step, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectStep(index)}
                      className={`w-8 h-8 rounded-[7px] text-[12px] font-extrabold inline-flex items-center justify-center transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#061A33] text-white shadow-xs"
                          : "bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0B2241]"
                      }`}
                    >
                      {step.stepNumber}
                    </button>
                  );
                })}
              </div>

              {/* Active Check Title & Description */}
              <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-2.5">
                {currentStep.title}
              </h3>

              <p className="text-[#475569] text-[13.5px] leading-[1.6] max-w-[460px]">
                {currentStep.description}
              </p>

              {/* Contextual Warning when Critical Line Checkbox is Selected */}
              {criticalDependency && currentStep.criticalLineNote ? (
                <div className="mt-4 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] px-3.5 py-2.5 flex items-start gap-2.5">
                  <AlertTriangle
                    className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-[#78350F] text-[12px] font-medium leading-[1.45]">
                    {currentStep.criticalLineNote}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Bottom Previous / Next Navigation */}
            <div className="flex items-center justify-between gap-4 pt-8 mt-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isFirst}
                className={`inline-flex items-center justify-center gap-1.5 px-4 h-[38px] rounded-[8px] border text-[12px] font-bold transition-colors ${
                  isFirst
                    ? "border-[#E2E8F0] bg-white text-[#94A3B8] cursor-not-allowed"
                    : "border-[#0B2241] bg-white hover:bg-[#F8FAFC] text-[#0B2241] cursor-pointer"
                }`}
              >
                <ChevronLeft
                  className="w-3.5 h-3.5 stroke-[2.2]"
                  aria-hidden="true"
                />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 px-5 h-[38px] rounded-[8px] bg-[#061A33] hover:bg-[#0F2744] text-white text-[12px] font-bold transition-colors cursor-pointer"
              >
                <span>{isLast ? "Restart checks" : "Next check"}</span>
                {isLast ? (
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <ArrowRight
                    className="w-3.5 h-3.5 stroke-[2.2]"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

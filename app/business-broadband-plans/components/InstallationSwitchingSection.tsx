"use client";

import React from "react";

interface StepItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface ActionButton {
  id: string;
  label: string;
  href: string;
}

const STEPS: readonly StepItem[] = [
  {
    id: "step-1",
    number: "1",
    title: "Check and choose",
    description: "Select your premises and a plan.",
  },
  {
    id: "step-2",
    number: "2",
    title: "Review your terms",
    description: "Contract summary and full costs before you agree.",
  },
  {
    id: "step-3",
    number: "3",
    title: "Plan your switch",
    description: "Access, engineer and consent checks.",
  },
  {
    id: "step-4",
    number: "4",
    title: "Get connected",
    description: "Equipment and onboarding guidance.",
  },
] as const;

const ACTION_BUTTONS: readonly ActionButton[] = [
  {
    id: "installation",
    label: "Installation & Onboarding",
    href: "/installation-onboarding",
  },
  {
    id: "support",
    label: "Business Support & SLAs",
    href: "/business-support",
  },
] as const;

export default function InstallationSwitchingSection() {
  return (
    <section className="w-full bg-[#F5F8FC] py-12 px-6 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1060px]">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1D63DC] mb-2.5">
          INSTALLATION & SWITCHING
        </p>

        {/* Main Heading */}
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[#0F172A] mb-2.5">
          From order to online
        </h2>

        {/* Subheading */}
        <p className="text-[14.5px] leading-[1.55] text-[#64748B] max-w-[560px] mb-7">
          No promised dates or downtime. Timings come from your confirmed order.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="rounded-[14px] border border-[#E2E8F0] bg-white px-5 py-6 flex flex-col justify-start min-h-[190px]"
            >
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-[8px] bg-[#FBBF24] flex items-center justify-center mb-4 shrink-0">
                <span className="text-[13px] font-bold text-[#0F172A]">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0F172A] mb-1.5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] leading-[1.5] text-[#64748B]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {ACTION_BUTTONS.map((btn) => (
            <a
              key={btn.id}
              href={btn.href}
              className="inline-flex items-center justify-center rounded-[8px] border border-[#1E293B] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F172A] transition-colors hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D63DC]"
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

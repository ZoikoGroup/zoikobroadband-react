"use client";

import React, { useState } from "react";

type ProfileId =
  | "sole-trader"
  | "small-office"
  | "retail-hospitality"
  | "multi-site";

interface BusinessProfile {
  id: ProfileId;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCenteredVertically?: boolean;
}

const PROFILES: readonly BusinessProfile[] = [
  {
    id: "sole-trader",
    title: "Sole trader",
    description:
      "Reliable connectivity for invoicing, video calls and cloud tools.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#111827]"
      >
        <circle
          cx="8"
          cy="5.25"
          r="2.25"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M3.75 12.75C3.75 10.75 5.65 9.25 8 9.25C10.35 9.25 12.25 10.75 12.25 12.75"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "small-office",
    title: "Small office",
    description: "Shared access for teams, meetings and everyday devices.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#111827]"
      >
        <rect
          x="3.75"
          y="2.75"
          width="8.5"
          height="10.5"
          rx="1.25"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M6.25 5.75H9.75M6.25 8H9.75M6.25 10.25H8.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "retail-hospitality",
    title: "Retail & hospitality",
    description:
      "Card payments, till systems and guest-facing Wi-Fi considerations.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#111827]"
      >
        <path
          d="M4.25 2.75H9.5L11.75 5V12.5C11.75 12.9142 11.4142 13.25 11 13.25H4.25C3.83579 13.25 3.5 12.9142 3.5 12.5V3.5C3.5 3.08579 3.83579 2.75 4.25 2.75Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "multi-site",
    title: "Multi-site",
    description: "Coordinate several premises through one conversation.",
    isCenteredVertically: true,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#111827]"
      >
        <circle
          cx="4.75"
          cy="5.25"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <circle
          cx="11.25"
          cy="6.25"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <circle
          cx="7.75"
          cy="11.5"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M6.15 5.55L9.8 6.05M5.55 6.55L7.05 10.15M10.45 7.55L8.6 10.25"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

export default function BusinessProfileSelector() {
  const [selectedProfile, setSelectedProfile] =
    useState<ProfileId>("sole-trader");

  return (
    <section className="w-full bg-white py-10 px-6 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1060px]">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1D63DC] mb-2.5">
          START WITH YOUR BUSINESS
        </p>

        {/* Main Heading */}
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[#0F172A] mb-2.5">
          Which sounds most like you?
        </h2>

        {/* Subheading */}
        <p className="text-[14.5px] leading-[1.55] text-[#64748B] max-w-[600px] mb-7">
          Pick a profile for guidance on what to look for. It never changes
          verified plan prices or eligibility.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILES.map((profile) => {
            const isSelected = selectedProfile === profile.id;

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => setSelectedProfile(profile.id)}
                aria-pressed={isSelected}
                className={`group text-left rounded-[14px] bg-white px-5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D63DC] min-h-[208px] flex flex-col ${
                  profile.isCenteredVertically
                    ? "justify-center py-6"
                    : "justify-start pt-5 pb-6"
                } ${
                  isSelected
                    ? "border-[1.5px] border-[#1D63DC] shadow-[0_1px_3px_rgba(29,99,220,0.06)]"
                    : "border border-[#E2E8F0] hover:border-[#CBD5E1]"
                }`}
              >
                {/* Icon Box */}
                <div className="w-9 h-9 rounded-[9px] bg-[#FEF3C7] flex items-center justify-center mb-4 shrink-0">
                  {profile.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0F172A] mb-1.5">
                  {profile.title}
                </h3>

                {/* Card Description */}
                <p className="text-[13px] leading-[1.5] text-[#64748B]">
                  {profile.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

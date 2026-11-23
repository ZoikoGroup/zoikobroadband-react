"use client";

import React, { useState } from "react";
import { Phone, Users, List, Globe, HelpCircle, Check } from "lucide-react";

type NumberTypeId =
  | "single-number"
  | "several-numbers"
  | "number-range-ddi"
  | "non-geographic"
  | "not-sure";

type NumberTypeIconKey = "single" | "several" | "range" | "non-geo" | "unsure";

interface NumberTypeCard {
  readonly id: NumberTypeId;
  readonly title: string;
  readonly description: string;
  readonly statusLabel: string;
  readonly iconKey: NumberTypeIconKey;
}

const NUMBER_TYPE_CARDS: readonly NumberTypeCard[] = [
  {
    id: "single-number",
    title: "Single number",
    description: "One home or business line.",
    statusLabel: "Needs review",
    iconKey: "single",
  },
  {
    id: "several-numbers",
    title: "Several numbers",
    description: "More than one line, possibly at different sites.",
    statusLabel: "Needs review",
    iconKey: "several",
  },
  {
    id: "number-range-ddi",
    title: "Number range (DDI)",
    description: "A block of direct-dial numbers for a team.",
    statusLabel: "Needs review",
    iconKey: "range",
  },
  {
    id: "non-geographic",
    title: "Non-geographic",
    description: "Numbers such as 03 or 08 that aren't tied to a place.",
    statusLabel: "Needs review",
    iconKey: "non-geo",
  },
  {
    id: "not-sure",
    title: "Not sure",
    description: "That's fine. We'll help you work it out.",
    statusLabel: "Needs review",
    iconKey: "unsure",
  },
];

const AUTHORITY_REQUIREMENTS: readonly string[] = [
  "The number is in your name, or you're authorised to act for the account",
  "You know your current provider (or can find it on a bill)",
  "You haven't cancelled your current service",
  "You can tell us about anything else that uses the line",
];

function renderNumberTypeIcon(iconKey: NumberTypeIconKey) {
  switch (iconKey) {
    case "single":
      return (
        <Phone
          className="w-4 h-4 text-[#FFC119] stroke-[2.1]"
          aria-hidden="true"
        />
      );
    case "several":
      return (
        <Users
          className="w-4 h-4 text-[#FFC119] stroke-[2.1]"
          aria-hidden="true"
        />
      );
    case "range":
      return (
        <List
          className="w-4 h-4 text-[#FFC119] stroke-[2.1]"
          aria-hidden="true"
        />
      );
    case "non-geo":
      return (
        <Globe
          className="w-4 h-4 text-[#FFC119] stroke-[2.1]"
          aria-hidden="true"
        />
      );
    case "unsure":
      return (
        <HelpCircle
          className="w-4 h-4 text-[#FFC119] stroke-[2.1]"
          aria-hidden="true"
        />
      );
  }
}

export interface PortingNumberTypeAndAuthorityProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly defaultSelectedId?: NumberTypeId | null;
  readonly onSelectNumberType?: (id: NumberTypeId) => void;
}

export default function PortingNumberTypeAndAuthority({
  imageSrc = "/Images/onb/10.png",
  imageAlt = "Business owner smiling in an office with sticky notes on a glass wall",
  defaultSelectedId = null,
  onSelectNumberType,
}: PortingNumberTypeAndAuthorityProps) {
  const [selectedId, setSelectedId] = useState<NumberTypeId | null>(
    defaultSelectedId,
  );

  const handleSelect = (id: NumberTypeId) => {
    const nextValue = selectedId === id ? null : id;
    setSelectedId(nextValue);
    onSelectNumberType?.(id);
  };

  return (
    <section
      id="number-type-and-authority"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              03
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              NUMBER TYPE &amp; AUTHORITY
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Every number needs a review first.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[580px]">
            We can&apos;t say a number will transfer until we&apos;ve checked
            it. Here&apos;s what affects that.
          </p>
        </div>

        {/* 5-Column Number Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {NUMBER_TYPE_CARDS.map((card) => {
            const isSelected = selectedId === card.id;

            return (
              <button
                key={card.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelect(card.id)}
                className={`rounded-[16px] border p-4.5 text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#FFFDF5] border-[#061A33] shadow-[0_8px_20px_rgba(11,34,65,0.08)]"
                    : "bg-[#F4F7FA] hover:bg-[#F8FAFC] border-[#E2E8F0] shadow-[0_4px_14px_rgba(11,34,65,0.03)]"
                }`}
              >
                <div>
                  <span className="w-8 h-8 rounded-[8px] bg-[#061A33] inline-flex items-center justify-center mb-3.5 shadow-2xs">
                    {renderNumberTypeIcon(card.iconKey)}
                  </span>

                  <h3 className="text-[#0B2241] text-[14px] font-extrabold leading-[1.3] mb-1.5">
                    {card.title}
                  </h3>

                  <p className="text-[#64748B] text-[11.5px] leading-[1.48] mb-4">
                    {card.description}
                  </p>
                </div>

                <div>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[5px] bg-[#FEF3C7] text-[#92400E] text-[10px] font-extrabold leading-none">
                    {card.statusLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Split: Left Photo + Right "Who can ask to move a number?" Dark Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[250px] rounded-[20px] overflow-hidden bg-[#1E293B] shadow-[0_8px_24px_rgba(11,34,65,0.08)]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover object-[50%_20%]"
            />
          </div>

          <div className="lg:col-span-7 bg-[#061A33] rounded-[20px] p-6 sm:p-8 text-white shadow-[0_12px_28px_rgba(6,26,51,0.18)] flex flex-col justify-center">
            <h3 className="text-white text-[18px] sm:text-[20px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-1.5">
              Who can ask to move a number?
            </h3>

            <p className="text-[#94A3B8] text-[12px] leading-[1.55] mb-5 max-w-[540px]">
              You&apos;ll usually need all of these. Proof is checked securely
              later, never through this page.
            </p>

            <ul className="space-y-3">
              {AUTHORITY_REQUIREMENTS.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-3 text-[12px] text-[#E2E8F0] leading-[1.45]"
                >
                  <span
                    aria-hidden="true"
                    className="w-4 h-4 rounded-full bg-[#FFC119] text-[#0B2241] inline-flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

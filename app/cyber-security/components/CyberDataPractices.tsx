"use client";

import React from "react";
import { Check, X, FileText } from "lucide-react";

interface DataPracticeCard {
  readonly id: string;
  readonly iconType: "check" | "cross" | "contract";
  readonly title: string;
  readonly description: string;
}

const DATA_PRACTICE_CARDS = [
  {
    id: "what-we-ask",
    iconType: "check",
    title: "What we ask",
    description: "Name, business, contact details and broad needs.",
  },
  {
    id: "what-we-never-ask",
    iconType: "cross",
    title: "What we never ask",
    description:
      "Passwords, logs, network maps or vulnerability details in a form.",
  },
  {
    id: "in-writing",
    iconType: "contract",
    title: "In writing",
    description: "Data roles and retention appear in your contract.",
  },
] as const satisfies readonly DataPracticeCard[];

function renderPracticeIcon(iconType: DataPracticeCard["iconType"]) {
  switch (iconType) {
    case "check":
      return (
        <Check
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "cross":
      return (
        <X className="w-4 h-4 text-[#0B2241] stroke-[2.2]" aria-hidden="true" />
      );
    case "contract":
      return (
        <FileText
          className="w-4 h-4 text-[#0B2241] stroke-[2]"
          aria-hidden="true"
        />
      );
  }
}

export default function CyberDataPractices() {
  return (
    <section className="w-full bg-[#FFE3D3] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            YOUR DATA
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            What we ask for, and what we never do
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Privacy roles, retention and any logging are confirmed per service
            in your contract and privacy notice.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {DATA_PRACTICE_CARDS.map((card) => (
            <article
              key={card.id}
              className="bg-white rounded-[16px] p-6 sm:p-7 shadow-[0_6px_20px_rgba(11,34,65,0.05)] flex flex-col items-start min-h-[168px]"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#FEF3C7] flex items-center justify-center mb-5 shrink-0">
                {renderPracticeIcon(card.iconType)}
              </div>

              <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-1.5">
                {card.title}
              </h3>

              <p className="text-[#64748B] text-[13.5px] leading-[1.5]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

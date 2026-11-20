"use client";

import React from "react";
import { Wrench, Wifi, CheckCircle2, FileText } from "lucide-react";

type HandoverCardTheme = "light" | "dark";
type HandoverIconKey = "wrench" | "wifi" | "check";
type FooterNoteTone = "red" | "blue" | "gold";

interface HandoverStageCard {
  readonly numberLabel: string;
  readonly title: string;
  readonly description: string;
  readonly footnote: string;
  readonly footnoteTone: FooterNoteTone;
  readonly theme: HandoverCardTheme;
  readonly iconKey: HandoverIconKey;
}

const HANDOVER_STAGE_CARDS: readonly HandoverStageCard[] = [
  {
    numberLabel: "01",
    title: "Installed",
    description: "Equipment and cabling are in place.",
    footnote: "Not yet a live service.",
    footnoteTone: "red",
    theme: "light",
    iconKey: "wrench",
  },
  {
    numberLabel: "02",
    title: "Activated",
    description: "The network reports your service is ready.",
    footnote: "Your own tests still matter.",
    footnoteTone: "blue",
    theme: "light",
    iconKey: "wifi",
  },
  {
    numberLabel: "03",
    title: "Handed over",
    description: "Service tested, details shared, support path set.",
    footnote: "Only with evidence that it's complete.",
    footnoteTone: "gold",
    theme: "dark",
    iconKey: "check",
  },
];

function renderStageIcon(iconKey: HandoverIconKey, theme: HandoverCardTheme) {
  const iconColor = theme === "dark" ? "text-[#0B2241]" : "text-[#0B2241]";
  switch (iconKey) {
    case "wrench":
      return (
        <Wrench
          className={`w-4 h-4 ${iconColor} stroke-[2.2]`}
          aria-hidden="true"
        />
      );
    case "wifi":
      return (
        <Wifi
          className={`w-4 h-4 ${iconColor} stroke-[2.2]`}
          aria-hidden="true"
        />
      );
    case "check":
      return (
        <CheckCircle2
          className={`w-4 h-4 ${iconColor} stroke-[2.2]`}
          aria-hidden="true"
        />
      );
  }
}

function getFootnoteClasses(tone: FooterNoteTone): string {
  switch (tone) {
    case "red":
      return "text-[#DC2626]";
    case "blue":
      return "text-[#1963DD]";
    case "gold":
      return "text-[#FFC119]";
  }
}

export default function OnboardingActivationHandover() {
  return (
    <section
      id="activation-and-handover"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              08
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              ACTIVATION &amp; HANDOVER
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[560px]">
            Installed, activated and handed over are three different things.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            We confirm each one separately, so you always know where you stand.
          </p>
        </div>

        {/* 3 Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {HANDOVER_STAGE_CARDS.map((card) => {
            const isDark = card.theme === "dark";

            return (
              <article
                key={card.numberLabel}
                className={`rounded-[18px] p-6 sm:p-7 flex flex-col justify-between min-h-[225px] transition-colors ${
                  isDark
                    ? "bg-[#061A33] text-white shadow-[0_12px_28px_rgba(6,26,51,0.18)]"
                    : "bg-white text-[#0B2241] border border-[#E2E8F0] shadow-[0_6px_20px_rgba(11,34,65,0.04)]"
                }`}
              >
                <div>
                  {/* Top Row: Gold Icon Box + Large Step Number */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-9 h-9 rounded-[9px] bg-[#FFC119] flex items-center justify-center shrink-0">
                      {renderStageIcon(card.iconKey, card.theme)}
                    </div>

                    <span
                      aria-hidden="true"
                      className={`text-[32px] sm:text-[36px] font-extrabold leading-none tracking-[-0.03em] select-none ${
                        isDark ? "text-white/15" : "text-[#CBD5E1]/65"
                      }`}
                    >
                      {card.numberLabel}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-[18px] font-extrabold leading-[1.25] mb-2 ${
                      isDark ? "text-[#FFC119]" : "text-[#0B2241]"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-[13px] leading-[1.55] mb-6 ${
                      isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Bottom Status Note */}
                <p
                  className={`text-[12px] font-bold leading-snug ${getFootnoteClasses(
                    card.footnoteTone,
                  )}`}
                >
                  {card.footnote}
                </p>
              </article>
            );
          })}
        </div>

        {/* Wide Banner Image with Overlay Callout */}
        <div className="relative w-full h-[210px] sm:h-[245px] md:h-[265px] rounded-[20px] overflow-hidden bg-[#1E293B] shadow-[0_10px_28px_rgba(11,34,65,0.08)]">
          <img
            src="/Images/onb/11.png"
            alt="Three colleagues collaborating closely over handover and service details"
            className="w-full h-full object-cover object-[50%_22%]"
          />

          <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-5 sm:bottom-5 max-w-[490px] bg-white/95 backdrop-blur-xs rounded-[12px] px-4 py-3.5 shadow-[0_8px_22px_rgba(11,34,65,0.16)] flex items-start gap-2.5">
            <FileText
              className="w-4 h-4 text-[#1963DD] shrink-0 mt-0.5 stroke-[2]"
              aria-hidden="true"
            />
            <p className="text-[#475569] text-[12px] leading-[1.5]">
              <strong className="font-bold text-[#0B2241]">
                Your handover pack
              </strong>{" "}
              covers your service details, router guidance, account owner and
              support path. Passwords and IP details are only shared securely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ArrowRight, Info } from "lucide-react";

type PortingCardTone = "light" | "navy";

interface PortingFlowCard {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tone: PortingCardTone;
}

const PORTING_FLOW_CARDS: readonly PortingFlowCard[] = [
  {
    id: "your-current-provider",
    eyebrow: "TODAY",
    title: "Your current provider",
    description:
      "They hold your number now. They release it when a valid request arrives.",
    imageSrc: "/Images/onb/15.png",
    imageAlt: "Modern VoIP desk phone with illuminated display on a desk",
    tone: "light",
  },
  {
    id: "your-phone-number",
    eyebrow: "THE NUMBER",
    title: "Your phone number",
    description:
      "Stays the same. Whether it can move depends on its type, location and account.",
    imageSrc: "/Images/keep/1.png",
    imageAlt:
      "Person smiling while looking at a mobile phone outdoors on a city street",
    tone: "navy",
  },
  {
    id: "your-new-provider",
    eyebrow: "NEXT",
    title: "Your new provider",
    description:
      "Usually leads the request and confirms the switch-over date with you.",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router in a workspace with a person working in the background",
    tone: "light",
  },
];

export interface PortingHowNumberTransferWorksProps {
  readonly complianceNote?: string;
  readonly onSelectStep?: (stepId: string) => void;
}

export default function PortingHowNumberTransferWorks({
  complianceNote = "For many home switches, your new provider arranges the switch for you. The exact process depends on your situation and is confirmed when we review your request. [Rights wording subject to Compliance approval]",
  onSelectStep,
}: PortingHowNumberTransferWorksProps) {
  return (
    <section
      id="how-a-number-transfer-works"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              01
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              HOW A NUMBER TRANSFER WORKS
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[560px]">
            Your number moves; your new provider leads.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[580px]">
            Moving a number is called &ldquo;porting&rdquo;. Here&apos;s who
            does what, in plain English.
          </p>
        </div>

        {/* 3-Card Porting Sequence with Connecting Yellow Arrows on Desktop */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-6">
          {PORTING_FLOW_CARDS.map((card, index) => {
            const isNavy = card.tone === "navy";

            return (
              <div key={card.id} className="relative flex flex-col">
                <article
                  onClick={
                    onSelectStep ? () => onSelectStep(card.id) : undefined
                  }
                  className={`rounded-[18px] overflow-hidden flex-1 flex flex-col transition-transform duration-200 ${
                    isNavy
                      ? "bg-[#061A33] text-white shadow-[0_12px_28px_rgba(6,26,51,0.2)]"
                      : "bg-white border border-[#E2E8F0] text-[#0B2241] shadow-[0_6px_20px_rgba(11,34,65,0.04)]"
                  } ${
                    onSelectStep ? "cursor-pointer hover:-translate-y-0.5" : ""
                  }`}
                >
                  <div className="w-full h-[175px] sm:h-[190px] bg-[#1E293B] overflow-hidden">
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover object-[50%_20%]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p
                      className={`text-[10px] font-extrabold tracking-[0.12em] uppercase mb-2 ${
                        isNavy ? "text-[#FFC119]" : "text-[#1963DD]"
                      }`}
                    >
                      {card.eyebrow}
                    </p>

                    <h3
                      className={`text-[18px] sm:text-[19px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-2 ${
                        isNavy ? "text-white" : "text-[#0B2241]"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`text-[12.5px] leading-[1.55] ${
                        isNavy ? "text-[#CBD5E1]" : "text-[#64748B]"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </article>

                {/* Connecting Gold Arrow Pill between cards on desktop */}
                {index < PORTING_FLOW_CARDS.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-[#FFC119] text-[#0B2241] shadow-[0_4px_12px_rgba(11,34,65,0.16)] absolute -right-[21px] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Bottom Compliance Notice Bar */}
        <div className="rounded-[12px] bg-[#F1F5F9] border border-[#E2E8F0] px-4 sm:px-5 py-3.5 flex items-start gap-3">
          <Info
            className="w-4 h-4 text-[#1963DD] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-[#475569] text-[11.5px] sm:text-[12px] leading-[1.5]">
            {complianceNote}
          </p>
        </div>
      </div>
    </section>
  );
}

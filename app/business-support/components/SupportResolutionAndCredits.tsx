"use client";

import React from "react";

type ResolutionCardTone = "cream" | "navy" | "slate";

interface ResolutionPolicyCard {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tone: ResolutionCardTone;
}

const RESOLUTION_CARDS: readonly ResolutionPolicyCard[] = [
  {
    id: "service-credits",
    eyebrow: "08 · SERVICE CREDITS",
    title: "Credits depend on your contract",
    description:
      "If your agreement includes service credits, we'll explain the conditions and how to request one. They aren't automatic.",
    imageSrc: "/Images/mng/1.png",
    imageAlt:
      "Three colleagues collaborating over a laptop during a service review",
    tone: "cream",
  },
  {
    id: "major-incidents",
    eyebrow: "09 · MAJOR INCIDENTS",
    title: "Updates you can rely on",
    description:
      "During a confirmed major incident, we share approved updates with the affected area and the time of each update.",
    imageSrc: "/Images/onb/17.png",
    imageAlt:
      "City skyline with bridge and tall glass tower illuminated at dusk",
    tone: "navy",
  },
  {
    id: "resolution",
    eyebrow: "10 · RESOLUTION",
    title: "Fixed? You confirm it",
    description:
      "When we mark a fault resolved, you can confirm it's working or reopen it with new details.",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router in a workspace with a person working in the background",
    tone: "slate",
  },
];

function getToneStyles(tone: ResolutionCardTone) {
  switch (tone) {
    case "cream":
      return {
        cardClass:
          "bg-[#FFF8DF] border-[#F6E8B4] text-[#0B2241] shadow-[0_6px_20px_rgba(11,34,65,0.04)]",
        eyebrowClass: "text-[#854D0E]",
        titleClass: "text-[#0B2241]",
        descriptionClass: "text-[#475569]",
      };
    case "navy":
      return {
        cardClass:
          "bg-[#061A33] border-[#061A33] text-white shadow-[0_10px_24px_rgba(6,26,51,0.18)]",
        eyebrowClass: "text-[#FFC119]",
        titleClass: "text-white",
        descriptionClass: "text-[#CBD5E1]",
      };
    case "slate":
      return {
        cardClass:
          "bg-[#F1F4F8] border-[#E2E8F0] text-[#0B2241] shadow-[0_6px_20px_rgba(11,34,65,0.04)]",
        eyebrowClass: "text-[#1963DD]",
        titleClass: "text-[#0B2241]",
        descriptionClass: "text-[#475569]",
      };
  }
}

export interface SupportResolutionAndCreditsProps {
  readonly onSelectItem?: (itemId: string) => void;
}

export default function SupportResolutionAndCredits({
  onSelectItem,
}: SupportResolutionAndCreditsProps) {
  return (
    <section
      id="resolution-and-credits"
      className="w-full bg-white py-14 md:py-16 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESOLUTION_CARDS.map((card) => {
            const styles = getToneStyles(card.tone);

            return (
              <article
                key={card.id}
                onClick={onSelectItem ? () => onSelectItem(card.id) : undefined}
                className={`rounded-[18px] border overflow-hidden flex flex-col transition-transform duration-200 ${
                  styles.cardClass
                } ${onSelectItem ? "cursor-pointer hover:-translate-y-0.5" : ""}`}
              >
                <div className="w-full h-[155px] sm:h-[170px] bg-[#1E293B] overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-[50%_25%]"
                  />
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <p
                    className={`text-[10px] font-extrabold tracking-[0.12em] uppercase mb-2 ${styles.eyebrowClass}`}
                  >
                    {card.eyebrow}
                  </p>

                  <h3
                    className={`text-[17px] sm:text-[18px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-2 ${styles.titleClass}`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-[12px] leading-[1.55] ${styles.descriptionClass}`}
                  >
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

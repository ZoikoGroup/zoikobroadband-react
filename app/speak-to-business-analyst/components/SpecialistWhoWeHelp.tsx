"use client";

import React from "react";

interface BusinessAudienceCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const BUSINESS_AUDIENCE_CARDS: readonly BusinessAudienceCard[] = [
  {
    id: "sole-traders",
    title: "Sole traders",
    description: "Simple advice for one-person businesses.",
    imageSrc: "/Images/onb/10.png",
    imageAlt:
      "Business owner smiling in an office with sticky notes on a glass wall",
  },
  {
    id: "small-and-medium-businesses",
    title: "Small & medium businesses",
    description: "Teams that rely on a steady connection.",
    imageSrc: "/Images/mng/1.png",
    imageAlt:
      "Three colleagues collaborating over a laptop in a modern workspace",
  },
  {
    id: "retail-and-hospitality",
    title: "Retail & hospitality",
    description: "Shops, cafés and card payments.",
    imageSrc: "/Images/speak/3.png",
    imageAlt: "Colourful fresh produce display in a retail market shop",
  },
  {
    id: "offices",
    title: "Offices",
    description: "Calls, cloud apps and video meetings.",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Team member speaking on the phone at a desk in a busy office",
  },
  {
    id: "several-locations",
    title: "Several locations",
    description: "Branches and more than one site.",
    imageSrc: "/Images/onb/17.png",
    imageAlt:
      "City skyline with river bridge and glass tower illuminated at dusk",
  },
];

export interface SpecialistWhoWeHelpProps {
  readonly onSelectAudience?: (audienceId: string) => void;
}

export default function SpecialistWhoWeHelp({
  onSelectAudience,
}: SpecialistWhoWeHelpProps) {
  return (
    <section
      id="who-we-help"
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
              WHO WE HELP
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[700px]">
            Specialist advice for every kind of business.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Wherever you work, a specialist can help you understand your
            options.
          </p>
        </div>

        {/* 5-Column Business Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {BUSINESS_AUDIENCE_CARDS.map((card) => (
            <article
              key={card.id}
              onClick={
                onSelectAudience ? () => onSelectAudience(card.id) : undefined
              }
              className={`group relative w-full h-[250px] sm:h-[265px] rounded-[18px] overflow-hidden bg-[#061A33] shadow-[0_8px_22px_rgba(11,34,65,0.08)] ${
                onSelectAudience ? "cursor-pointer" : ""
              }`}
            >
              <img
                src={card.imageSrc}
                alt={card.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />

              {/* Bottom dark gradient overlay for legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A33] via-[#061A33]/55 to-transparent"
              />

              {/* Bottom Text Overlay */}
              <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-end">
                <h3 className="text-white text-[14.5px] font-extrabold leading-[1.25] mb-1.5 drop-shadow-xs">
                  {card.title}
                </h3>

                <p className="text-[#CBD5E1] text-[11.5px] leading-[1.45]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

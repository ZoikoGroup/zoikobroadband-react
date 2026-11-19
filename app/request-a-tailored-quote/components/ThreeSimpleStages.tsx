import React from "react";

const STAGES_DATA = {
  badge: "WHAT TO EXPECT",
  headingLine1: "Three simple stages, with no",
  headingLine2: "surprises.",
  subheading:
    "A request is the start of a conversation. It isn't a quote, and a quote isn't a contract.",
  cards: [
    {
      step: "01",
      imageSrc: "/Images/req/2.png",
      imageAlt:
        "Three colleagues reviewing business needs together around a laptop",
      imagePosition: "object-[44%_22%]",
      title: "Share your needs",
      description:
        "Tell us about your business, sites and the services you're interested in. Around five minutes.",
      href: "#start-quote-request",
    },
    {
      step: "02",
      imageSrc: "/Images/req/3.png",
      imageAlt: "Specialist wearing a headset smiling at a computer monitor",
      imagePosition: "object-[56%_22%]",
      title: "A specialist reviews it",
      description:
        "We check what's possible for each of your sites. We'll tell you if something can't be confirmed yet.",
      href: "#specialist-review",
    },
    {
      step: "03",
      imageSrc: "/Images/req/4.png",
      imageAlt:
        "Business advisor smiling by a glass office wall with sticky notes",
      imagePosition: "object-[58%_22%]",
      title: "A quote, if suitable",
      description:
        "If we can help, you'll get a written quote with every cost and its expiry date. You decide what happens next.",
      href: "#quote-details",
    },
  ],
} as const;

export default function ThreeSimpleStages() {
  return (
    <section
      id="what-to-expect"
      aria-labelledby="three-simple-stages-heading"
      className="w-full bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            {STAGES_DATA.badge}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="three-simple-stages-heading"
          className="mt-3.5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[42px] lg:text-[44px]"
        >
          <span className="block">{STAGES_DATA.headingLine1}</span>
          <span className="block">{STAGES_DATA.headingLine2}</span>
        </h2>

        {/* Subheading */}
        <p className="mt-3 max-w-[740px] text-[13.5px] leading-[1.52] font-normal text-[#475569] sm:text-[14px]">
          {STAGES_DATA.subheading}
        </p>

        {/* 3-Column Stage Cards */}
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {STAGES_DATA.cards.map((card) => (
            <a
              key={card.step}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-white shadow-[0_2px_8px_rgba(8,28,46,0.03)] transition-colors hover:border-[#CBD5E1]"
            >
              {/* Top Photo with Top-Left Yellow Number Pill */}
              <div className="relative h-[182px] w-full overflow-hidden bg-[#EEF3F8] sm:h-[192px]">
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className={`h-full w-full object-cover ${card.imagePosition} transition-transform duration-300 group-hover:scale-[1.02]`}
                />

                <span className="absolute top-3 left-3 flex h-6 w-7 items-center justify-center rounded-[5px] bg-[#FFD100] text-[11px] leading-none font-extrabold text-[#081C2E] shadow-[0_2px_8px_rgba(0,0,0,0.16)]">
                  {card.step}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-start p-5">
                <h3 className="text-[14.5px] leading-[1.3] font-bold text-[#081C2E]">
                  {card.title}
                </h3>

                <p className="mt-1.5 text-[12px] leading-[1.52] font-normal text-[#5A6A7E]">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import {
  MapPin,
  Wifi,
  Wrench,
  FileText,
  PoundSterling,
  Headphones,
} from "lucide-react";

const QUOTE_FACTORS_DATA = {
  badge: "ABOUT YOUR QUOTE",
  heading: "What shapes your quote.",
  subheadingLine1:
    "We don't publish fixed business prices on this page. Your quote depends",
  subheadingLine2: "on these things, and every cost is shown before you agree.",
  image: {
    src: "/Images/req/8.png",
    alt: "Twilight skyline view with glass tower and historic bridge at dusk",
    badgeText: "Every site checked on its own",
  },
  factors: [
    {
      id: "your-sites",
      icon: "sites",
      title: "Your sites",
      description:
        "What's available at each address, and how many sites you have.",
    },
    {
      id: "technology",
      icon: "technology",
      title: "Technology",
      description: "Full fibre, SOGEA or other options, where available.",
    },
    {
      id: "installation",
      icon: "installation",
      title: "Installation",
      description: "Any surveys, engineering work or set-up needed.",
    },
    {
      id: "contract-term",
      icon: "contract",
      title: "Contract term",
      description: "How long the agreement runs and how it renews.",
    },
    {
      id: "vat-charges",
      icon: "vat",
      title: "VAT & charges",
      description:
        "One-off and monthly charges, shown with or without VAT clearly.",
    },
    {
      id: "support-level",
      icon: "support",
      title: "Support level",
      description: "The support and service levels agreed in writing.",
    },
  ],
  timelineTitle: "From request to contract",
  timelineSteps: [
    {
      step: "1",
      title: "Your request",
      description: "You tell us what you need. No commitment.",
      badgeClass: "bg-[#154976] text-white",
      hasConnector: true,
    },
    {
      step: "2",
      title: "Specialist review",
      description: "We check sites, availability and options.",
      badgeClass: "bg-[#154976] text-white",
      hasConnector: true,
    },
    {
      step: "3",
      title: "Written quote",
      description: "Itemised costs, terms and an expiry date.",
      badgeClass: "bg-[#FFD100] text-[#081C2E]",
      hasConnector: true,
    },
    {
      step: "4",
      title: "Revised quote",
      description: "If anything changes, you get a new version.",
      badgeClass: "bg-[#154976] text-white",
      hasConnector: true,
    },
    {
      step: "5",
      title: "Signed contract",
      description: "Only an agreement you accept creates an order.",
      badgeClass: "bg-[#061A2E] text-[#FFD100]",
      hasConnector: false,
    },
  ],
  disclaimer:
    "Your request reference isn't a quote, and a quote isn't an order. Any small-business contract information you're entitled to is given before you sign.",
} as const;

export default function WhatShapesYourQuote() {
  return (
    <section
      id="about-your-quote"
      aria-labelledby="what-shapes-your-quote-heading"
      className="w-full bg-[#FFFBEB] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Top Row: Left Badge + Heading + Subheading | Right Skyline Card */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {QUOTE_FACTORS_DATA.badge}
              </span>
            </div>

            <h2
              id="what-shapes-your-quote-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
            >
              {QUOTE_FACTORS_DATA.heading}
            </h2>

            <p className="mt-2.5 max-w-[560px] text-[13px] leading-[1.52] font-normal text-[#475569] sm:text-[13.5px]">
              <span className="block">
                {QUOTE_FACTORS_DATA.subheadingLine1}
              </span>
              <span className="block">
                {QUOTE_FACTORS_DATA.subheadingLine2}
              </span>
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-[160px] w-full overflow-hidden rounded-[12px] border border-[#F1E2A8] bg-[#1E1B3A] shadow-[0_6px_18px_rgba(8,28,46,0.06)] sm:h-[176px]">
              <img
                src={QUOTE_FACTORS_DATA.image.src}
                alt={QUOTE_FACTORS_DATA.image.alt}
                className="h-full w-full object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081C2E]/55 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 inline-flex items-center rounded-[5px] bg-[#081C2E]/85 px-2.5 py-1 backdrop-blur-[2px]">
                <span className="text-[10.5px] leading-none font-semibold text-white">
                  {QUOTE_FACTORS_DATA.image.badgeText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle 3x2 Grid of Quote Factor Cards */}
        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {QUOTE_FACTORS_DATA.factors.map((factor) => (
            <div
              key={factor.id}
              className="flex items-start gap-3 rounded-[10px] border border-[#F3E5B0] bg-white p-4 shadow-[0_1px_3px_rgba(8,28,46,0.02)]"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-[#FFD100] text-[#081C2E]">
                {factor.icon === "sites" && (
                  <MapPin className="h-4 w-4 stroke-[2.2]" />
                )}
                {factor.icon === "technology" && (
                  <Wifi className="h-4 w-4 stroke-[2.2]" />
                )}
                {factor.icon === "installation" && (
                  <Wrench className="h-4 w-4 stroke-[2.2]" />
                )}
                {factor.icon === "contract" && (
                  <FileText className="h-4 w-4 stroke-[2.2]" />
                )}
                {factor.icon === "vat" && (
                  <PoundSterling className="h-4 w-4 stroke-[2.2]" />
                )}
                {factor.icon === "support" && (
                  <Headphones className="h-4 w-4 stroke-[2.2]" />
                )}
              </span>

              <div className="min-w-0 leading-snug">
                <h3 className="text-[13px] leading-[1.28] font-bold text-[#081C2E]">
                  {factor.title}
                </h3>
                <p className="mt-1 text-[11px] leading-[1.45] font-normal text-[#5A6A7E]">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom "From request to contract" Timeline Card */}
        <div className="mt-5 rounded-[12px] border border-[#F3E5B0] bg-white p-5 shadow-[0_2px_6px_rgba(8,28,46,0.02)] sm:p-6">
          <h3 className="text-[14px] leading-[1.3] font-bold text-[#081C2E]">
            {QUOTE_FACTORS_DATA.timelineTitle}
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {QUOTE_FACTORS_DATA.timelineSteps.map((item) => (
              <div key={item.step} className="flex flex-col">
                <div className="flex items-center">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${item.badgeClass}`}
                  >
                    {item.step}
                  </span>

                  {item.hasConnector && (
                    <div
                      aria-hidden="true"
                      className="ml-2 hidden h-[1.5px] flex-1 bg-[#F5D033] lg:block"
                    />
                  )}
                </div>

                <h4 className="mt-3 text-[12px] leading-[1.28] font-bold text-[#081C2E]">
                  {item.title}
                </h4>

                <p className="mt-1 max-w-[175px] text-[10.5px] leading-[1.42] font-normal text-[#64748B]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-[#F1E8C6] pt-3">
            <p className="text-[10.5px] leading-[1.42] font-normal text-[#8B6A2B]">
              {QUOTE_FACTORS_DATA.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

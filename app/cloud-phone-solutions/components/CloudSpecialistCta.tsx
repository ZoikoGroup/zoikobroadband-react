import React from "react";
import { ArrowRight } from "lucide-react";

const SPECIALIST_CTA_DATA = {
  headingLine1: "Talk to a business",
  headingLine2Prefix: "specialist about ",
  headingHighlightLine2: "your",
  headingHighlightLine3: "phone setup.",
  subheadingLine1:
    "We'll help you understand your options, check what your business needs",
  subheadingLine2: "and prepare a written quote.",
  primaryCta: {
    label: "Start your consultation",
    href: "/contact-us",
  },
  secondaryCta: {
    label: "Accessible contact options",
    href: "/accessibility-statement",
  },
  salesContactPrefix:
    "Business sales: [Approved business sales number] · Text relay available ",
  salesContactSuffix: "[confirm]",
  leftPhoto: {
    src: "/Images/cloud/10.png",
    alt: "Business professional speaking on a desk phone in a modern office",
  },
  rightPhoto: {
    src: "/Images/cloud/11.png",
    alt: "Woman smiling while looking at a smartphone outdoors",
  },
  yellowCard: {
    titleLine1: "Plain answers, written",
    titleLine2: "quotes.",
    subtitle: "No pressure to switch.",
  },
  bottomCards: [
    {
      id: "business-voip-digital-lines",
      title: "Business VoIP / Digital Lines",
      description: "Replace old copper lines with digital ones.",
      actionText: "Explore digital lines",
      hasArrow: true,
      href: "/digital-lines",
    },
    {
      id: "keep-your-number",
      title: "Keep Your Number",
      description: "How number transfers work.",
      actionText: "Coming soon",
      hasArrow: false,
      href: "/keep-your-phone-number",
    },
    {
      id: "call-features-addons",
      title: "Call Features & Add-ons",
      description: "Extra calling features for your team.",
      actionText: "Coming soon",
      hasArrow: false,
      href: "/digital-lines",
    },
  ],
} as const;

export default function CloudSpecialistCta() {
  return (
    <section
      id="specialist-consultation"
      aria-labelledby="cloud-specialist-cta-heading"
      className="relative w-full overflow-hidden bg-[#05182B] py-12 text-white sm:py-14 lg:py-16"
    >
      {/* Subtle radial navy/teal depth gradient matching the dark banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 52% 28%, #0D2F48 0%, #05182B 58%, #03101D 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Top Row: Left Copy + CTAs | Right Bento Media Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <h2
              id="cloud-specialist-cta-heading"
              className="text-[36px] leading-[1.06] font-extrabold tracking-[-0.025em] text-white sm:text-[44px] lg:text-[46px]"
            >
              <span className="block">{SPECIALIST_CTA_DATA.headingLine1}</span>
              <span className="block">
                {SPECIALIST_CTA_DATA.headingLine2Prefix}
                <span className="text-[#FFD100]">
                  {SPECIALIST_CTA_DATA.headingHighlightLine2}
                </span>
              </span>
              <span className="block text-[#FFD100]">
                {SPECIALIST_CTA_DATA.headingHighlightLine3}
              </span>
            </h2>

            <p className="mt-4 max-w-[520px] text-[13.5px] leading-[1.52] font-normal text-[#C2D0DE] sm:text-[14px]">
              <span className="block">
                {SPECIALIST_CTA_DATA.subheadingLine1}
              </span>
              <span className="block">
                {SPECIALIST_CTA_DATA.subheadingLine2}
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={SPECIALIST_CTA_DATA.primaryCta.href}
                className="inline-flex h-[40px] items-center justify-center gap-2 rounded-[7px] bg-[#FFD100] px-4.5 text-[12.5px] font-bold text-[#05182B] shadow-[0_4px_14px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#FFE047]"
              >
                <span>{SPECIALIST_CTA_DATA.primaryCta.label}</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.4]" />
              </a>

              <a
                href={SPECIALIST_CTA_DATA.secondaryCta.href}
                className="inline-flex h-[40px] items-center justify-center rounded-[7px] border border-[#2B435B] bg-[#0B2239]/85 px-4.5 text-[12.5px] font-semibold text-white transition-colors hover:border-[#4D6B88] hover:bg-[#102F4E]"
              >
                {SPECIALIST_CTA_DATA.secondaryCta.label}
              </a>
            </div>

            {/* Sales & Text Relay Line */}
            <p className="mt-3 text-[11px] leading-[1.4] font-normal text-[#94A6B8]">
              {SPECIALIST_CTA_DATA.salesContactPrefix}
              <span className="underline decoration-[#64788C] underline-offset-2">
                {SPECIALIST_CTA_DATA.salesContactSuffix}
              </span>
            </p>
          </div>

          {/* Right Column: Tall Left Photo + Top-Right Photo + Bottom-Right Yellow Card */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12 lg:col-span-6">
            {/* Tall Left Photo */}
            <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#0E243B] sm:col-span-6">
              <img
                src={SPECIALIST_CTA_DATA.leftPhoto.src}
                alt={SPECIALIST_CTA_DATA.leftPhoto.alt}
                className="h-[220px] w-full object-cover object-[64%_22%] sm:h-[268px]"
              />
            </div>

            {/* Right Stack: Top Photo + Bottom Yellow Card */}
            <div className="flex flex-col gap-3.5 sm:col-span-6">
              <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#0E243B]">
                <img
                  src={SPECIALIST_CTA_DATA.rightPhoto.src}
                  alt={SPECIALIST_CTA_DATA.rightPhoto.alt}
                  className="h-[130px] w-full object-cover object-[62%_24%] sm:h-[130px]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center rounded-[12px] bg-[#FFD100] px-4 py-3.5 text-[#081C2E] shadow-[0_8px_20px_rgba(0,0,0,0.2)] sm:min-h-[124px]">
                <h3 className="text-[14px] leading-[1.2] font-extrabold tracking-[-0.015em] text-[#081C2E]">
                  <span className="block">
                    {SPECIALIST_CTA_DATA.yellowCard.titleLine1}
                  </span>
                  <span className="block">
                    {SPECIALIST_CTA_DATA.yellowCard.titleLine2}
                  </span>
                </h3>
                <p className="mt-1 text-[10.5px] leading-[1.3] font-medium text-[#2A3B4C]">
                  {SPECIALIST_CTA_DATA.yellowCard.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 Dark Translucent Cards */}
        <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-3 lg:gap-4">
          {SPECIALIST_CTA_DATA.bottomCards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className="group flex flex-col justify-between rounded-[10px] border border-[#223B52] bg-[#13293E]/85 px-4 py-3.5 transition-colors hover:border-[#3A5A78] hover:bg-[#18334D]"
            >
              <div>
                <h3 className="text-[12.5px] leading-[1.3] font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-1 text-[11px] leading-[1.4] font-normal text-[#9FB0C2]">
                  {card.description}
                </p>
              </div>

              <div className="mt-2.5 inline-flex items-center gap-1 text-[10.5px] font-bold text-[#FFD100]">
                <span>{card.actionText}</span>
                {card.hasArrow && (
                  <ArrowRight className="h-3 w-3 stroke-[2.4] transition-transform group-hover:translate-x-0.5" />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

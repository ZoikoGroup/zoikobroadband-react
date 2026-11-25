import React from "react";
import { FileText, ArrowRight, Info, Lock } from "lucide-react";

const BROADBAND_HERO_DATA = {
  badgeText: "BUSINESS SERVICES · TAILORED QUOTE",
  headlineLine1: "Find a broadband",
  headlineLine2Prefix: "solution ",
  headlineLine2Highlight: "tailored to",
  headlineLine3Highlight: "your business.",
  description:
    "Tell us what you need for your business locations and services. We'll review your request and explain what can be offered.",
  primaryCta: {
    label: "Start a quote request",
    href: "#start-quote-request",
  },
  secondaryCta: {
    label: "Explore business broadband plans",
    href: "/business-broadband-plans",
  },
  noticeText:
    "Sending a request isn't placing an order, and it isn't a price guarantee.",
  privacyPrefix:
    "We use your information to respond to your enquiry, as described in our ",
  privacyLinkLabel: "Privacy Notice",
  privacyHref: "/privacy-notice",
  image: {
    src: "/Images/req/1.png",
    alt: "Three business colleagues collaborating around a laptop in a modern office",
  },
  howItWorksTitle: "HOW IT WORKS",
  steps: [
    {
      number: "1",
      label: "Share your needs",
      active: true,
    },
    {
      number: "2",
      label: "Specialist review",
      active: false,
    },
    {
      number: "3",
      label: "Quote, if suitable",
      active: false,
    },
  ],
} as const;

export default function BroadbandQuoteHero() {
  return (
    <section
      aria-label="Business broadband tailored quote"
      className="relative w-full overflow-hidden bg-[#05182B] text-white"
    >
      {/* Left radial navy depth gradient matching the design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 22% 34%, #0C2C49 0%, #05182B 58%, #03101D 100%)",
        }}
      />

      {/* Right-side photography clipped inside a large half-circle with a golden-yellow stroke */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto my-6 h-[335px] w-[335px] sm:h-[400px] sm:w-[400px] lg:absolute lg:top-1/2 lg:right-[-84px] lg:my-0 lg:h-[680px] lg:w-[680px] lg:-translate-y-1/2"
      >
        <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-[#FFD100]">
          <img
            src={BROADBAND_HERO_DATA.image.src}
            alt={BROADBAND_HERO_DATA.image.alt}
            className="h-full w-full object-cover object-[58%_22%]"
          />
        </div>
      </div>

      {/* Main 1300px centered container */}
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 pt-8 pb-9 sm:px-8 lg:min-h-[505px] lg:px-10 lg:py-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:min-h-[425px] lg:grid-cols-12 lg:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-6 lg:pr-4">
            {/* Yellow Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#FFD100] px-3 py-1 text-[#05182B]">
              <FileText className="h-3.5 w-3.5 stroke-[2.3]" />
              <span className="text-[10.5px] font-extrabold tracking-[0.06em] uppercase">
                {BROADBAND_HERO_DATA.badgeText}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-3.5 text-[38px] leading-[1.06] font-extrabold tracking-[-0.025em] text-white sm:text-[45px] lg:text-[48px]">
              <span className="block">{BROADBAND_HERO_DATA.headlineLine1}</span>
              <span className="block">
                {BROADBAND_HERO_DATA.headlineLine2Prefix}
                <span className="text-[#FFD100]">
                  {BROADBAND_HERO_DATA.headlineLine2Highlight}
                </span>
              </span>
              <span className="block text-[#FFD100]">
                {BROADBAND_HERO_DATA.headlineLine3Highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[525px] text-[14px] leading-[1.54] font-normal text-[#C2D0DE] sm:text-[14.5px]">
              {BROADBAND_HERO_DATA.description}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              <a
                href={BROADBAND_HERO_DATA.primaryCta.href}
                className="inline-flex h-[41px] items-center justify-center gap-2 rounded-[6px] bg-[#FFD100] px-4.5 text-[12.5px] font-bold text-[#05182B] shadow-[0_4px_12px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#FFE047]"
              >
                <span>{BROADBAND_HERO_DATA.primaryCta.label}</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.4]" />
              </a>

              <a
                href={BROADBAND_HERO_DATA.secondaryCta.href}
                className="inline-flex h-[41px] items-center justify-center rounded-[6px] border border-[#354E68] bg-[#0B2239]/85 px-4.5 text-[12.5px] font-semibold text-white transition-colors hover:border-[#5D7B99] hover:bg-[#102F4E]"
              >
                {BROADBAND_HERO_DATA.secondaryCta.label}
              </a>
            </div>

            {/* Info Notice Box */}
            <div className="mt-4 flex max-w-[535px] items-center gap-2.5 rounded-[6px] border border-[#233C55] bg-[#10263C]/90 px-3.5 py-2.5">
              <Info className="h-4 w-4 shrink-0 text-[#FFD100] stroke-[2.2]" />
              <p className="text-[11.5px] leading-[1.38] font-normal text-[#B8C7D6]">
                {BROADBAND_HERO_DATA.noticeText}
              </p>
            </div>

            {/* Privacy Notice Line */}
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] leading-[1.35] text-[#96A8BA]">
              <Lock className="h-3 w-3 shrink-0 text-[#7E92A6] stroke-[2.2]" />
              <p>
                {BROADBAND_HERO_DATA.privacyPrefix}
                <a
                  href={BROADBAND_HERO_DATA.privacyHref}
                  className="underline decoration-[#7E92A6] underline-offset-2 transition-colors hover:text-white"
                >
                  {BROADBAND_HERO_DATA.privacyLinkLabel}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right Column: Floating "HOW IT WORKS" Card */}
          <div className="relative flex items-end lg:col-span-6 lg:h-[425px]">
            <div className="w-full max-w-[278px] rounded-[10px] border border-[#E6ECF2] bg-white p-4.5 text-[#081C2E] shadow-[0_14px_32px_rgba(0,0,0,0.3)] lg:mt-auto lg:mb-2 lg:ml-[48px]">
              <p className="text-[10px] font-extrabold tracking-[0.08em] text-[#64748B] uppercase">
                {BROADBAND_HERO_DATA.howItWorksTitle}
              </p>

              <ol className="mt-3 flex flex-col gap-2.5">
                {BROADBAND_HERO_DATA.steps.map((step) => (
                  <li key={step.number} className="flex items-center gap-2.5">
                    <span
                      className={
                        step.active
                          ? "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-[11px] font-extrabold text-[#081C2E]"
                          : "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#E8EEF4] text-[11px] font-bold text-[#475569]"
                      }
                    >
                      {step.number}
                    </span>
                    <span className="text-[12px] leading-[1.25] font-bold text-[#081C2E]">
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

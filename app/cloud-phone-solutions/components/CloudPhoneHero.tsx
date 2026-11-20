import React from "react";
import { Phone, ArrowRight, Users, GitFork, Info } from "lucide-react";

const HERO_CONFIG = {
  badgeText: "BUSINESS PHONE & VOICE",
  headlineLine1: "Cloud phone",
  headlineLine2: "solutions for the way",
  headlineHighlight: "your team works.",
  description:
    "Explore business calling options, understand the setup considerations, and speak with a specialist about what fits your team. Features and eligibility are confirmed during your consultation.",
  primaryCta: {
    label: "Discuss your phone setup",
    href: "#discuss-setup",
  },
  secondaryCta: {
    label: "Explore possible capabilities",
    href: "#capabilities",
  },
  noticeText:
    "Review number-transfer, connectivity and emergency-calling requirements before changing an existing service.",
  image: {
    src: "/Images/cloud/1.png",
    alt: "Business professional speaking on a desk phone in a modern office",
  },
  topCallout: {
    title: "Office, home or on the move",
    subtitle: "Desk phones, computers or mobiles*",
  },
  bottomCallout: {
    title: "Calls to the right person",
    subtitle: "Routing options discussed with you*",
  },
} as const;

export default function CloudPhoneHero() {
  return (
    <section
      aria-label="Cloud phone solutions"
      className="relative w-full overflow-hidden bg-[#051B31] text-white"
    >
      {/* Left radial navy depth gradient matching the design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 22% 32%, #0B2D4E 0%, #051B31 58%, #031222 100%)",
        }}
      />

      {/* Right-side photography clipped inside a large half-circle with a golden-yellow stroke */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto my-6 h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] lg:absolute lg:top-1/2 lg:right-[-88px] lg:my-0 lg:h-[640px] lg:w-[640px] lg:-translate-y-1/2"
      >
        <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-[#FFD100]">
          <img
            src={HERO_CONFIG.image.src}
            alt={HERO_CONFIG.image.alt}
            className="h-full w-full object-cover object-[72%_24%]"
          />
        </div>
      </div>

      {/* Main 1300px centered container */}
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 pt-6 pb-8 sm:px-8 lg:min-h-[485px] lg:px-10 lg:py-9">
        <div className="grid grid-cols-1 items-center gap-6 lg:min-h-[413px] lg:grid-cols-12 lg:gap-6">
          {/* Left column: Badge, Headline, Copy, CTAs, Info Banner */}
          <div className="lg:col-span-6 lg:pr-4">
            {/* Yellow Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-[5px] bg-[#FFD100] px-3 py-1.5 text-[#051B31]">
              <Phone className="h-3.5 w-3.5 fill-[#051B31] text-[#051B31]" />
              <span className="text-[11px] font-extrabold tracking-[0.06em] uppercase">
                {HERO_CONFIG.badgeText}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 text-[36px] leading-[1.06] font-extrabold tracking-[-0.025em] text-white sm:text-[44px] lg:text-[47px]">
              <span className="block">{HERO_CONFIG.headlineLine1}</span>
              <span className="block">{HERO_CONFIG.headlineLine2}</span>
              <span className="block text-[#FFD100]">
                {HERO_CONFIG.headlineHighlight}
              </span>
            </h1>

            {/* Supporting Body Copy */}
            <p className="mt-4 max-w-[505px] text-[14px] leading-[1.52] font-normal text-[#C5D2DF] sm:text-[14.5px]">
              {HERO_CONFIG.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              <a
                href={HERO_CONFIG.primaryCta.href}
                className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[7px] bg-[#FFD100] px-5 text-[13px] font-bold text-[#051B31] shadow-[0_4px_14px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#FFE047]"
              >
                <span>{HERO_CONFIG.primaryCta.label}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.4]" />
              </a>

              <a
                href={HERO_CONFIG.secondaryCta.href}
                className="inline-flex h-[42px] items-center justify-center rounded-[7px] border border-[#3B526B] bg-[#0B2239]/80 px-5 text-[13px] font-semibold text-white transition-colors hover:border-[#62809E] hover:bg-[#113150]"
              >
                {HERO_CONFIG.secondaryCta.label}
              </a>
            </div>

            {/* Bottom Informational Notice Bar */}
            <div className="mt-5 flex max-w-[535px] items-center gap-2.5 rounded-[7px] border border-[#223B54] bg-[#122940]/90 px-3.5 py-2.5">
              <Info className="h-4 w-4 shrink-0 text-[#FFD100] stroke-[2]" />
              <p className="text-[11.5px] leading-[1.35] font-normal text-[#B8C7D6]">
                {HERO_CONFIG.noticeText}
              </p>
            </div>
          </div>

          {/* Right column: Floating callout cards positioned along the circular edge */}
          <div className="relative h-[160px] lg:col-span-6 lg:h-[413px]">
            {/* Top-left floating white card */}
            <div className="absolute top-2 left-2 z-20 flex items-center gap-3.5 rounded-[10px] bg-white px-4 py-3 shadow-[0_14px_32px_rgba(0,0,0,0.28)] lg:top-[16px] lg:left-[64px]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] bg-[#FFD100] text-[#051B31]">
                <Users className="h-[18px] w-[18px] stroke-[2.2]" />
              </span>
              <div className="leading-tight">
                <p className="text-[12.5px] font-bold text-[#0F2337]">
                  {HERO_CONFIG.topCallout.title}
                </p>
                <p className="mt-0.5 text-[10.5px] font-normal text-[#5F7082]">
                  {HERO_CONFIG.topCallout.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom-left floating blue card */}
            <div className="absolute bottom-2 left-6 z-20 flex items-center gap-3.5 rounded-[10px] bg-[#1D5B96] px-4 py-3 text-white shadow-[0_14px_32px_rgba(0,0,0,0.35)] lg:bottom-[4px] lg:left-[88px]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] bg-[#2A6FAF] text-[#FFD100]">
                <GitFork className="h-[18px] w-[18px] stroke-[2.2]" />
              </span>
              <div className="leading-tight">
                <p className="text-[12.5px] font-bold text-white">
                  {HERO_CONFIG.bottomCallout.title}
                </p>
                <p className="mt-0.5 text-[10.5px] font-normal text-[#C8DDF0]">
                  {HERO_CONFIG.bottomCallout.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

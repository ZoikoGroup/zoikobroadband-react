"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Zap, Tag, Gift, Sparkle } from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

type Step = {
  number: string;
  title: string;
  text: string;
  icon: IconType;
  accent: string;
  numberBox: string;
  body: string;
  titleColor: string;
  textColor: string;
  iconColor: string;
  highlight: boolean;
};

const steps: readonly Step[] = [
  {
    number: "01",
    title: "Check your address",
    text: "Enter your postcode to see whether FTTP, SoGEA or ADSL is available where you live.",
    icon: MapPin,
    accent: "border-[#E8ECF2]",
    numberBox: "bg-[#C8102E] text-white",
    body: "bg-white",
    titleColor: "text-[#0F2A4A]",
    textColor: "text-[#4B5D75]",
    iconColor: "text-[#12436F]",
    highlight: false,
  },
  {
    number: "02",
    title: "Choose an eligible package",
    text: "Pick the fibre package that suits every person and device in your home.",
    icon: Zap,
    accent: "border-[#FFC800]",
    numberBox: "bg-[#FFC800] text-[#0F2A4A]",
    body: "bg-[#0F2A4A]",
    titleColor: "text-white",
    textColor: "text-[#C9D6E8]",
    iconColor: "text-[#FFC800]",
    highlight: true,
  },
  {
    number: "03",
    title: "Save for 6 months",
    text: "Black Friday pricing applies to the monthly subscription for your first six months, then the standard price applies.",
    icon: Tag,
    accent: "border-[#E8ECF2]",
    numberBox: "bg-[#C8102E] text-white",
    body: "bg-white",
    titleColor: "text-[#0F2A4A]",
    textColor: "text-[#4B5D75]",
    iconColor: "text-[#12436F]",
    highlight: false,
  },
] as const;

export default function SavingSteps() {
  const [postcode, setPostcode] = useState<string>("");

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-8 lg:px-[80px]">
      {/* Heading */}
      <div className="mx-auto flex max-w-[1100px] flex-col items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F2D58A] bg-[#FFF3CF] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#7A5A00]">
          <Tag className="h-3 w-3" strokeWidth={2.5} />
          How your Black Friday saving works
        </span>
        <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight text-[#12436F] sm:text-3xl">
          Three steps to a better connection
        </h2>
        <span className="mt-2 block h-[3px] w-[44px] rounded-full bg-gradient-to-r from-[#C8102E] to-[#FFC800]" />
      </div>

      {/* Steps */}
      <div className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 items-center gap-5 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`flex overflow-hidden rounded-lg border ${step.accent} ${
                step.highlight
                  ? "min-h-[112px] shadow-[0_10px_24px_rgba(15,42,74,0.25)] md:scale-[1.04]"
                  : "min-h-[104px] shadow-[0_4px_14px_rgba(15,42,74,0.08)]"
              }`}
            >
              <div
                className={`flex w-[56px] shrink-0 flex-col items-center justify-center ${step.numberBox}`}
              >
                <span className="text-[8px] font-extrabold uppercase tracking-widest">
                  Step
                </span>
                <span className="text-2xl font-extrabold leading-none">
                  {step.number}
                </span>
              </div>

              <div className={`flex flex-1 flex-col px-4 py-3 ${step.body}`}>
                <Icon className={`h-4 w-4 ${step.iconColor}`} strokeWidth={2} />
                <h3
                  className={`mt-2 text-sm font-bold leading-[18px] ${step.titleColor}`}
                >
                  {step.title}
                </h3>
                <p className={`mt-1 text-xs leading-[16px] ${step.textColor}`}>
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Availability banner */}
      <div className="relative mx-auto mt-16 max-w-[1100px]">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2A4A] via-[#12365E] to-[#12436F] px-4 pb-10 pt-12 shadow-[0_16px_40px_rgba(15,42,74,0.30)] sm:px-10">
          {/* Corner ribbon */}
          <span className="absolute -left-[38px] top-[22px] w-[150px] -rotate-45 bg-[#FFC800] py-[3px] text-center text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#0F2A4A]">
            Black Friday
          </span>

          {/* Decorative rings */}
          <span className="pointer-events-none absolute -right-[40px] top-[40px] hidden h-[190px] w-[190px] rounded-full border border-white/10 md:block" />
          <span className="pointer-events-none absolute -right-[10px] top-[70px] hidden h-[130px] w-[130px] rounded-full border border-white/10 md:block" />

          {/* Decorative dots and dash */}
          <span className="pointer-events-none absolute left-[60px] top-[26px] hidden h-[2px] w-[8px] rotate-[35deg] bg-[#FFC800] md:block" />
          <span className="pointer-events-none absolute right-[60px] top-[50px] hidden h-[5px] w-[5px] rounded-full bg-[#8FA3B8] md:block" />

          {/* Hanging sale tag */}
          <div className="pointer-events-none absolute right-[118px] top-0 hidden md:block">
            <div className="mx-auto h-[20px] w-px bg-[#FFC800]" />
            <div className="flex h-[18px] w-[28px] items-center justify-center rounded-sm bg-[#FFC800] text-[7px] font-extrabold text-[#0F2A4A]">
              SALE
            </div>
          </div>

          <div className="relative mx-auto flex max-w-[620px] flex-col items-center">
            <h3 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Check Your Availability
            </h3>
            <span className="mt-2 block h-[3px] w-[44px] rounded-full bg-gradient-to-r from-[#C8102E] to-[#FFC800]" />

            <p className="mt-4 text-center text-xs text-[#D6E0EE] sm:text-sm">
              Enter your postcode and we&apos;ll show the FTTP, SoGEA or ADSL
              packages and Black Friday prices available at your address.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter your postcode (e.g. SW1A 1AA)"
                className="h-10 w-full rounded-md border-0 bg-white px-4 text-sm text-[#0F2A4A] placeholder:text-[#8A97AA] focus:outline-none focus:ring-2 focus:ring-[#FFC800] sm:max-w-[280px]"
              />
              <a
                href="/check-my-postcode"
                className="flex h-10 items-center justify-center rounded-md bg-[#FFC800] px-6 text-sm font-bold text-[#0F2A4A] shadow-[0_4px_12px_rgba(255,200,0,0.35)] transition-colors hover:bg-[#FFD633]"
              >
                Check availability
              </a>
            </div>

            <p className="mt-4 text-center text-[11px] text-[#B5C3D8]">
              Availability, technology and speeds depend on your address.
            </p>
          </div>

          {/* Gift icon bottom-left */}
          <div className="pointer-events-none absolute bottom-3 left-4 hidden md:block">
            <span className="flex h-[56px] w-[56px] items-center justify-center rounded-md bg-[#FFC800] shadow-[0_6px_14px_rgba(0,0,0,0.25)]">
              <Gift className="h-9 w-9 text-[#C8102E]" strokeWidth={2} />
            </span>
          </div>

          {/* Shopping bag with logo bottom-right */}
          <div className="pointer-events-none absolute bottom-3 right-10 hidden md:block">
            <div className="flex h-[78px] w-[58px] -rotate-6 flex-col items-center justify-between rounded-sm bg-white px-1 pb-1 pt-2 shadow-[0_8px_18px_rgba(0,0,0,0.30)]">
              <Image
                src="/Images/sale/2.png"
                alt="Zoiko Broadband logo"
                width={44}
                height={34}
                className="h-auto w-[44px] object-contain"
              />
              <span className="w-full bg-[#0F2A4A] py-[2px] text-center text-[6px] font-extrabold uppercase tracking-wider text-[#FFC800]">
                Black Friday
              </span>
            </div>
          </div>
        </div>

        <Sparkle
          className="pointer-events-none absolute -top-[10px] right-[22px] hidden h-3 w-3 fill-[#FFC800] text-[#FFC800] md:block"
          strokeWidth={0}
        />
      </div>
    </section>
  );
}

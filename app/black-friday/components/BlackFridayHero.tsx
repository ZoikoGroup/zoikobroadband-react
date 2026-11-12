import Image from "next/image";
import Link from "next/link";
import { MapPin, Tag } from "lucide-react";

const badge = {
  label: "BLACK FRIDAY SALE",
} as const;

const heading = {
  line1: "A better connection",
  line2Prefix: "for ",
  line2Highlight: "every room.",
} as const;

const subtitle = "Selected fibre broadband deals for Black Friday." as const;

const offer = {
  save: "SAVE",
  percent: "25%",
  off: "OFF",
  title: "BLACK FRIDAY OFFER",
  dates: "27–30 NOV",
  description:
    "the monthly subscription charge on eligible fibre packages for your ",
  descriptionBold: "first 6 months",
  exampleLabel: "e.g. Blitz Core 40/10: ",
  examplePrice: "£26.25/mo",
  exampleRest: " for 6 months, then £35.00/mo",
} as const;

const actions = {
  primary: { label: "Check Black Friday Deal", href: "#deals" },
  secondary: { label: "Check availability", href: "/check-my-postcode" },
} as const;

const disclaimer =
  "Eligible fibre packages, subject to availability at your address and approval. Standard monthly price applies after six months" as const;

const topTickerItems = [
  "CYBER MONDAY · 30 NOV · CHECK YOUR ADDRESS",
  "CYBER MONDAY · 30 NOV · CHECK YOUR ADDRESS",
  "CYBER MONDAY · 30 NOV · CHECK YOUR ADDRESS",
] as const;

const bottomTickerItems = [
  "BLACK FRIDAY",
  "27 NOV – 30 NOV 2026",
  "SELECTED FIBRE BROADBAND DEALS",
  "BLACK FRIDAY",
  "27 NOV – 30 NOV 2026",
  "SELECTED FIBRE BROADBAND DEALS",
  "BLACK FRIDAY",
] as const;

export default function BlackFridayHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#12487a] bg-[radial-gradient(circle_at_30%_35%,#1a5a96_0%,#114474_55%,#0c3358_100%)]">
      {/* Decorative subtle diagonal grid & floating sparkles/tags on left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_60%_75%_at_25%_45%,#000_40%,transparent_100%)]"
      />

      {/* Subtle ambient background icons */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-white/15"
        fill="none"
      >
        <g transform="translate(24, 34) rotate(-25)">
          <rect
            x="0"
            y="0"
            width="28"
            height="18"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="7" cy="9" r="2" fill="currentColor" />
        </g>
        <path
          d="M525 82 L528 91 L537 94 L528 97 L525 106 L522 97 L513 94 L522 91 Z"
          fill="currentColor"
          className="text-white/30"
        />
        <path
          d="M56 540 L59 549 L68 552 L59 555 L56 564 L53 555 L44 552 L53 549 Z"
          fill="currentColor"
          className="text-white/25"
        />
        <g transform="translate(570, 565) rotate(32)">
          <rect
            x="0"
            y="0"
            width="30"
            height="20"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="7" cy="10" r="2" fill="currentColor" />
        </g>
      </svg>

      <div className="relative mx-auto flex max-w-[1440px] flex-col lg:min-h-[600px] lg:flex-row lg:items-stretch">
        {/* Left content */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-28 pt-12 sm:px-10 lg:w-[50%] lg:pb-32 lg:pl-[7.5%] lg:pr-4 lg:pt-14">
          {/* Top Pill Badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ffc400]/30 bg-[#0b2948]/90 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#ffc400] shadow-sm">
            <Tag className="h-3.5 w-3.5 text-[#ffc400]" aria-hidden="true" />
            {badge.label}
          </span>

          {/* Main Heading */}
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {heading.line1}
            <br />
            {heading.line2Prefix}
            <span className="text-[#ffc400]">{heading.line2Highlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 text-base font-medium text-white/90 sm:text-[19px]">
            {subtitle}
          </p>

          {/* Offer Card */}
          <div className="mt-7 flex w-full max-w-[540px] items-center">
            {/* Left Red Square Promo Badge */}
            <div className="relative z-10 flex h-[154px] w-[142px] shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#e12543] to-[#b8142e] px-3 text-center text-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] sm:h-[162px] sm:w-[156px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white/95 sm:text-sm">
                {offer.save}
              </span>
              <span className="my-0.5 text-4xl font-black leading-none tracking-tight sm:text-[46px]">
                {offer.percent}
              </span>
              <span className="text-sm font-extrabold uppercase tracking-wider sm:text-base">
                {offer.off}
              </span>
            </div>

            {/* Right White Details Box */}
            <div className="-ml-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-r-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between bg-[#09233e] px-5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-white sm:text-xs">
                <span className="text-[#ffc400]">{offer.title}</span>
                <span>{offer.dates}</span>
              </div>

              <div className="px-5 py-3">
                <p className="text-xs font-semibold leading-snug text-[#0a1f3a] sm:text-[14px]">
                  {offer.description}
                  <span className="font-extrabold text-[#d91c38]">
                    {offer.descriptionBold}
                  </span>
                </p>
              </div>

              <div className="border-t border-[#f3e6b8] bg-[#fdf5d7] px-5 py-2.5">
                <p className="text-xs font-semibold leading-snug text-[#0a1f3a] sm:text-[13px]">
                  <span className="font-bold">{offer.exampleLabel}</span>
                  <span className="font-extrabold text-[#d91c38]">
                    {offer.examplePrice}
                  </span>
                  <span className="font-bold">{offer.exampleRest}</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link
              href={actions.primary.href}
              className="inline-flex h-[54px] min-w-[235px] items-center justify-center rounded-full bg-[#ffc400] px-7 text-[15px] font-extrabold text-[#0a1f3a] shadow-[0_6px_18px_rgba(255,196,0,0.28)] transition hover:bg-[#ffd23d]"
            >
              {actions.primary.label}
            </Link>
            <Link
              href={actions.secondary.href}
              className="inline-flex h-[54px] min-w-[225px] items-center justify-center gap-2 rounded-full border border-white/75 bg-white/[0.04] px-7 text-[15px] font-semibold text-white transition hover:bg-white/15"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {actions.secondary.label}
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 max-w-[500px] text-[11px] leading-relaxed text-white/75 sm:text-xs">
            {disclaimer}
          </p>
        </div>

        {/* Right Large Curved House Graphic Container + Hanging Tags & Gift Tab */}
        <div className="relative flex w-full items-center justify-center lg:w-[50%]">
          <div className="relative h-[440px] w-full overflow-hidden sm:h-[520px] lg:absolute lg:-bottom-12 lg:-right-12 lg:-top-16 lg:h-auto lg:w-[114%] lg:rounded-l-full">
            <Image
              src="/Images/sale/1.png"
              alt="Black Friday fibre broadband deals for every room"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* 1. Hanging Red "DEAL" Box from Top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[24%] top-0 z-20 flex flex-col items-center sm:left-[26%] lg:left-[23%]"
          >
            {/* Hanging String */}
            <div className="h-16 w-[1.5px] bg-white/85 shadow-sm sm:h-20 lg:h-24" />
            {/* Red DEAL Tag */}
            <div className="-mt-1 border-2 border-[#ffc400] bg-[#d6213f] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_6px_16px_rgba(0,0,0,0.45)] sm:px-4 sm:py-2 sm:text-sm">
              DEAL
            </div>
          </div>

          {/* 2. Hanging Yellow "BLACK FRIDAY SALE" Tag from Top Right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-0 z-20 flex flex-col items-center sm:right-[10%] lg:right-[11%]"
          >
            {/* Hanging Yellow String */}
            <div className="h-10 w-[2px] bg-[#ffc400] shadow-sm sm:h-12 lg:h-14" />
            {/* Yellow Tag Body */}
            <div className="relative -mt-1.5 flex w-[112px] flex-col items-center rounded-xl bg-gradient-to-b from-[#ffd426] to-[#f5b400] px-2.5 pb-3 pt-4 text-center shadow-[0_10px_24px_rgba(0,0,0,0.4)] sm:w-[126px] sm:pb-3.5 sm:pt-5">
              {/* Tag Punch Hole */}
              <span className="absolute top-1.5 h-2.5 w-2.5 rounded-full bg-[#1a1a1a] shadow-inner" />
              <span className="mt-1 text-base font-black uppercase leading-[1.05] tracking-tight text-[#111827] sm:text-lg">
                BLACK
                <br />
                FRIDAY
              </span>
              <span className="mt-1.5 inline-block rounded-md bg-[#d6213f] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-sm sm:text-xs">
                SALE
              </span>
            </div>
          </div>

          {/* 3. Bottom Yellow Rounded Pill Bar & Red/Gold Gift Box Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex w-[84%] max-w-[440px] -translate-x-1/2 items-center justify-center sm:bottom-12 lg:bottom-14 lg:left-[47%]"
          >
            {/* Yellow 3D Rounded Bar */}
            <div className="h-11 w-full rounded-full border-b-4 border-[#c99200] bg-gradient-to-b from-[#ffe047] via-[#ffc400] to-[#eab000] shadow-[0_10px_22px_rgba(0,0,0,0.45)] sm:h-12" />

            {/* Red & Gold Gift Box centered on the yellow bar */}
            <div className="absolute -top-5 flex flex-col items-center sm:-top-6">
              {/* Gold Ribbon Bow Loops */}
              <div className="flex items-end justify-center gap-0.5">
                <span className="h-3.5 w-4 -rotate-12 rounded-full border-[3px] border-[#ffd426] bg-transparent shadow-sm sm:h-4 sm:w-4.5" />
                <span className="h-3.5 w-4 rotate-12 rounded-full border-[3px] border-[#ffd426] bg-transparent shadow-sm sm:h-4 sm:w-4.5" />
              </div>

              {/* Gift Box Lid */}
              <div className="relative -mt-0.5 h-3.5 w-[74px] rounded-t-sm bg-[#e5e7eb] shadow-sm sm:h-4 sm:w-[82px]">
                {/* Vertical Gold Ribbon on Lid */}
                <span className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-[#ffc400]" />
              </div>

              {/* Gift Box Base */}
              <div className="relative h-12 w-[66px] rounded-b-md bg-gradient-to-b from-[#e12543] to-[#b8142e] shadow-[0_6px_14px_rgba(0,0,0,0.35)] sm:h-14 sm:w-[74px]">
                {/* Vertical Gold Ribbon on Base */}
                <span className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-[#ffc400]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Intersecting Ticker Ribbons */}
      {/* Secondary Dark Navy Ribbon Behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 bottom-5 z-20 rotate-[1.4deg] overflow-hidden border-y border-white/15 bg-[#081d34] py-2 shadow-md"
      >
        <div className="flex w-full items-center justify-between gap-8 whitespace-nowrap px-6 text-[11px] font-extrabold uppercase tracking-widest text-white/90 sm:text-xs">
          {topTickerItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="text-[#ffc400]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Primary Yellow Ticker Ribbon Front */}
      <div className="absolute -inset-x-6 bottom-2 z-30 -rotate-[1.1deg] overflow-hidden border-y border-[#e0ab00] bg-[#ffc400] py-2.5 shadow-[0_-2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex w-full items-center justify-center gap-4 whitespace-nowrap px-4 text-xs font-black uppercase tracking-wider text-[#09203a] sm:gap-5 sm:text-[13px]">
          {bottomTickerItems.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-4 sm:gap-5"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="text-[11px]">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { ReactElement } from "react";

function GiftIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 80 92"
      className="h-[84px] w-[74px] drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] md:h-[96px] md:w-[84px]"
      aria-hidden="true"
    >
      {/* Bow loops */}
      <path
        d="M40 28 C28 4 8 12 14 24 C18 32 34 30 40 28 Z"
        fill="none"
        stroke="#FFC800"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M40 28 C52 4 72 12 66 24 C62 32 46 30 40 28 Z"
        fill="none"
        stroke="#FFC800"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <rect x="35" y="24" width="10" height="9" rx="2" fill="#FFC800" />

      {/* Lid */}
      <rect x="6" y="32" width="68" height="16" rx="3" fill="#C8102E" />
      <rect x="6" y="32" width="68" height="4" rx="2" fill="#E03550" />

      {/* Box */}
      <rect x="10" y="48" width="60" height="42" rx="3" fill="#B20D28" />
      <rect x="10" y="48" width="30" height="42" rx="3" fill="#C8102E" />

      {/* Ribbon */}
      <rect x="34" y="32" width="12" height="58" fill="#FFC800" />
      <rect x="34" y="32" width="5" height="58" fill="#FFD84D" />
    </svg>
  );
}

export default function BlackFriday() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B2545] via-[#12436F] to-[#0B2545] px-4 pb-20 pt-14 sm:px-8 lg:px-[70px]">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,120,150,0.25),transparent_60%)]" />

      {/* Outlined background watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[90px] font-black uppercase leading-none tracking-tight text-transparent sm:text-[140px] lg:text-[190px]"
        style={{ WebkitTextStroke: "1.5px rgba(255,200,0,0.18)" }}
      >
        Black Friday
      </span>

      {/* Hanging Sale tag */}
      <div className="pointer-events-none absolute right-[38px] top-0 hidden md:block">
        <div className="mx-auto h-[34px] w-[2px] bg-[#FFC800]" />
        <div className="flex h-[30px] w-[58px] items-center justify-center rounded-md bg-[#FFC800] text-xs font-extrabold text-[#0F2A4A] shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
          SALE
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
        <span className="rounded-full bg-[#1B6B3A] px-4 py-[5px] text-[10px] font-extrabold uppercase tracking-wider text-white sm:text-xs">
          Black Friday 27 Nov · Cyber Monday 30 Nov
        </span>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your Black Friday broadband upgrade starts here.
        </h1>

        <p className="mt-5 text-sm text-[#E4ECF7] sm:text-base">
          25% off the monthly subscription on eligible fibre packages for your
          first 6 months.
        </p>

        <p className="mt-3 max-w-[420px] text-xs leading-[18px] text-[#B5C3D8]">
          Eligible fibre packages, subject to availability and approval.
          Standard monthly price applies after six months.
        </p>

        <a
          href="/check-my-postcode"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-[#FFC800] px-6 text-sm font-bold text-[#0F2A4A] shadow-[0_4px_12px_rgba(255,200,0,0.35)] transition-colors hover:bg-[#FFD633]"
        >
          Check availability
        </a>
      </div>

      {/* Gift bottom-left */}
      <div className="pointer-events-none absolute bottom-3 left-6 hidden md:block lg:left-[56px]">
        <GiftIcon />
      </div>

      {/* Shopping bag with logo bottom-right */}
      <div className="pointer-events-none absolute bottom-3 right-6 hidden md:block lg:right-[54px]">
        <div className="relative flex h-[92px] w-[68px] rotate-6 flex-col items-center justify-between rounded-sm bg-white px-1 pb-0 pt-3 shadow-[0_10px_22px_rgba(0,0,0,0.4)]">
          {/* Bag handle */}
          <span className="absolute -top-[10px] left-1/2 h-[14px] w-[24px] -translate-x-1/2 rounded-t-full border-[2px] border-b-0 border-white" />
          <Image
            src="/Images/sale/2.png"
            alt="Zoiko Broadband logo"
            width={52}
            height={40}
            className="h-auto w-[52px] object-contain"
          />
          <span className="w-[calc(100%+8px)] bg-[#0F2A4A] py-[3px] text-center text-[7px] font-extrabold uppercase tracking-wider text-[#FFC800]">
            Black Friday
          </span>
        </div>
      </div>
    </section>
  );
}

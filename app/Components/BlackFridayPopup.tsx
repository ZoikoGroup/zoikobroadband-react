"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, X, ArrowRight, Zap, Router, MapPin } from "lucide-react";

// Content taken from the /black-friday page
const SALE_START = new Date("2026-11-27T00:00:00");
const SALE_END = new Date("2026-12-01T00:00:00"); // end of 30 Nov

const offer = {
  badge: "BLACK FRIDAY SALE",
  line1: "A better connection",
  line2Prefix: "for ",
  line2Highlight: "every room.",
  subtitle: "Selected fibre broadband deals for Black Friday.",
  percent: "25%",
  dates: "27–30 NOV",
  description:
    "the monthly subscription charge on eligible fibre packages for your ",
  descriptionBold: "first 6 months",
  exampleLabel: "e.g. Blitz Core 40/10: ",
  examplePrice: "£26.25/mo",
  exampleRest: " for 6 months, then £35.00/mo",
  disclaimer:
    "Eligible fibre packages, subject to availability at your address and approval. Standard monthly price applies after six months.",
} as const;

const perks = [
  { icon: Zap, text: "Full Fibre up to 1000 Mbps" },
  { icon: Router, text: "Router & installation shown per package" },
  { icon: MapPin, text: "FTTP, SoGEA or ADSL at your postcode" },
] as const;

const tickerItems = [
  "Black Friday",
  "27 Nov – 30 Nov 2026",
  "Selected fibre broadband deals",
  "Cyber Monday · 30 Nov",
] as const;

const OPEN_DELAY_MS = 800;

type TimeLeft = { d: number; h: number; m: number; s: number };

function getCountdown(now: Date): { label: string; t: TimeLeft } | null {
  let target: Date;
  let label: string;
  if (now < SALE_START) {
    target = SALE_START;
    label = "Sale starts in";
  } else if (now < SALE_END) {
    target = SALE_END;
    label = "Offer ends in";
  } else {
    return null;
  }
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    label,
    t: {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff / 3_600_000) % 24),
      m: Math.floor((diff / 60_000) % 60),
      s: Math.floor((diff / 1000) % 60),
    },
  };
}

export default function BlackFridayPopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(
    null
  );
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Open shortly after the home page loads (only while the promotion is live/upcoming)
  useEffect(() => {
    if (!getCountdown(new Date())) return;
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Live countdown
  useEffect(() => {
    if (!open) return;
    const tick = () => setCountdown(getCountdown(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open]);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  }, []);

  // Escape to close, lock background scroll, focus the close button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={`bf-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#04121f]/75 p-4 backdrop-blur-sm ${
        closing ? "bf-out" : ""
      }`}
      onClick={close}
    >
      <style>{`
        @keyframes bfFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes bfFadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes bfPop {
          0% { opacity: 0; transform: translateY(40px) scale(.9) }
          60% { opacity: 1; transform: translateY(-6px) scale(1.02) }
          100% { transform: translateY(0) scale(1) }
        }
        @keyframes bfSwing {
          0%,100% { transform: rotate(-6deg) }
          50% { transform: rotate(6deg) }
        }
        @keyframes bfPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,196,0,.55) }
          70% { box-shadow: 0 0 0 14px rgba(255,196,0,0) }
        }
        @keyframes bfShine {
          0% { transform: translateX(-120%) skewX(-20deg) }
          60%,100% { transform: translateX(260%) skewX(-20deg) }
        }
        @keyframes bfMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes bfTwinkle { 0%,100% { opacity:.2; transform: scale(.8) } 50% { opacity:1; transform: scale(1.15) } }
        .bf-overlay { animation: bfFadeIn .3s ease-out both }
        .bf-overlay.bf-out { animation: bfFadeOut .25s ease-in both }
        .bf-card { animation: bfPop .6s cubic-bezier(.2,.9,.3,1.2) both }
        .bf-swing { transform-origin: top center; animation: bfSwing 3s ease-in-out infinite }
        .bf-pulse { animation: bfPulse 2s ease-out infinite }
        .bf-shine::after {
          content: ""; position: absolute; inset: 0; width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
          animation: bfShine 2.8s ease-in-out infinite;
        }
        .bf-marquee { animation: bfMarquee 18s linear infinite }
        .bf-twinkle { animation: bfTwinkle 2.4s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .bf-overlay, .bf-card, .bf-swing, .bf-pulse, .bf-shine::after, .bf-marquee, .bf-twinkle { animation: none !important }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bf-popup-title"
        onClick={(e) => e.stopPropagation()}
        className="bf-card relative my-auto w-full max-w-[920px] overflow-hidden rounded-3xl bg-[#12487a] bg-[radial-gradient(circle_at_30%_35%,#1a5a96_0%,#114474_55%,#0c3358_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
      >
        {/* Grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_70%_80%_at_30%_40%,#000_40%,transparent_100%)]"
        />

        {/* Close */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={close}
          aria-label="Close Black Friday offer"
          className="absolute right-3 top-3 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0a1f3a] shadow-md transition hover:rotate-90 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc400]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex flex-col md:flex-row">
          {/* Visual side */}
          <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-56 md:h-auto md:w-[40%]">
            <Image
              src="/Images/sale/1.png"
              alt="Black Friday fibre broadband deals for every room"
              fill
              sizes="(min-width: 768px) 370px, 100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c3358]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#114474]" />

            {/* Swinging BLACK FRIDAY tag */}
            <div
              aria-hidden="true"
              className="bf-swing absolute left-6 top-0 z-20 flex flex-col items-center"
            >
              <div className="h-8 w-[2px] bg-[#ffc400] md:h-12" />
              <div className="relative -mt-1 flex w-[92px] flex-col items-center rounded-xl bg-gradient-to-b from-[#ffd426] to-[#f5b400] px-2 pb-2.5 pt-4 text-center shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
                <span className="absolute top-1.5 h-2 w-2 rounded-full bg-[#1a1a1a]" />
                <span className="text-sm font-black uppercase leading-[1.05] text-[#111827]">
                  Black
                  <br />
                  Friday
                </span>
                <span className="mt-1 rounded bg-[#d6213f] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Sale
                </span>
              </div>
            </div>

            {/* 25% OFF burst */}
            <div className="absolute bottom-4 right-4 z-20 md:bottom-8 md:right-auto md:left-6">
              <div className="bf-pulse flex h-24 w-24 rotate-[-10deg] flex-col items-center justify-center rounded-full border-4 border-[#ffc400] bg-gradient-to-b from-[#e12543] to-[#b8142e] text-white shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:h-28 md:w-28">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                  Save
                </span>
                <span className="text-3xl font-black leading-none md:text-4xl">
                  {offer.percent}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Off
                </span>
              </div>
            </div>

            {/* Sparkles */}
            <span aria-hidden="true" className="bf-twinkle absolute right-8 top-10 text-xl text-[#ffc400]">✦</span>
            <span aria-hidden="true" className="bf-twinkle absolute left-1/2 top-1/2 text-sm text-white [animation-delay:.8s]">✦</span>
          </div>

          {/* Content side */}
          <div className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-8 md:py-8 md:pr-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ffc400]/30 bg-[#0b2948]/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#ffc400]">
              <Tag className="h-3.5 w-3.5" aria-hidden="true" />
              {offer.badge} · {offer.dates}
            </span>

            <h2
              id="bf-popup-title"
              className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl"
            >
              {offer.line1}
              <br />
              {offer.line2Prefix}
              <span className="text-[#ffc400]">{offer.line2Highlight}</span>
            </h2>
            <p className="mt-2 text-sm font-medium text-white/85 sm:text-base">
              {offer.subtitle}
            </p>

            {/* Offer box */}
            <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.22)]">
              <div className="px-4 py-3">
                <p className="text-[13px] font-semibold leading-snug text-[#0a1f3a] sm:text-sm">
                  <span className="font-black text-[#d91c38]">
                    {offer.percent} off{" "}
                  </span>
                  {offer.description}
                  <span className="font-extrabold text-[#d91c38]">
                    {offer.descriptionBold}
                  </span>
                </p>
              </div>
              <div className="border-t border-[#f3e6b8] bg-[#fdf5d7] px-4 py-2">
                <p className="text-xs font-semibold text-[#0a1f3a] sm:text-[13px]">
                  <span className="font-bold">{offer.exampleLabel}</span>
                  <span className="font-extrabold text-[#d91c38]">
                    {offer.examplePrice}
                  </span>
                  <span className="font-bold">{offer.exampleRest}</span>
                </p>
              </div>
            </div>

            {/* Countdown */}
            {countdown && (
              <div className="mt-5">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/70">
                  {countdown.label}
                </p>
                <div className="mt-2 flex gap-2" aria-live="off">
                  {(
                    [
                      ["Days", countdown.t.d],
                      ["Hrs", countdown.t.h],
                      ["Min", countdown.t.m],
                      ["Sec", countdown.t.s],
                    ] as const
                  ).map(([unit, val]) => (
                    <div
                      key={unit}
                      className="flex w-14 flex-col items-center rounded-lg border border-white/10 bg-[#081d34] py-1.5 sm:w-16"
                    >
                      <span className="text-xl font-black tabular-nums text-[#ffc400] sm:text-2xl">
                        {String(val).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Perks */}
            <ul className="mt-5 hidden space-y-1.5 sm:block">
              {perks.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-[13px] font-medium text-white/85"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#ffc400]" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/black-friday"
                onClick={close}
                className="bf-shine group relative inline-flex h-[52px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[#ffc400] px-7 text-[15px] font-extrabold text-[#0a1f3a] shadow-[0_6px_18px_rgba(255,196,0,0.35)] transition hover:bg-[#ffd23d]"
              >
                Grab the Black Friday Deal
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={close}
                className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white hover:underline"
              >
                Maybe later
              </button>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-white/55 sm:text-[11px]">
              {offer.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom ticker */}
        <div
          aria-hidden="true"
          className="relative z-20 overflow-hidden border-t border-[#e0ab00] bg-[#ffc400] py-2"
        >
          <div className="bf-marquee flex w-max gap-5 whitespace-nowrap text-[11px] font-black uppercase tracking-wider text-[#09203a] sm:text-xs">
            {/* Items repeated 4x; the marquee scrolls by 50% for a seamless loop */}
            {Array.from({ length: 4 }).flatMap((_, r) =>
              tickerItems.flatMap((item, i) => [
                <span key={`${r}-${i}`}>{item}</span>,
                <span key={`${r}-${i}-s`}>✦</span>,
              ])
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

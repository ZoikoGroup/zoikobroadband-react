"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gauge, FileText, Headphones } from "lucide-react";
import { figtree } from "../../fonts";

const features = [
  { icon: Gauge, label: "Fast fibre connectivity" },
  { icon: FileText, label: "Clear, straightforward billing" },
  { icon: Headphones, label: "Helpful UK-based support" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy-notice" },
  { label: "Terms", href: "/terms-conditions" },
  { label: "Accessibility", href: "/accessibility-statement" },
  { label: "Help", href: "/get-help" },
];

/**
 * Full-screen auth layout: background photo, brand headline on the left and a
 * card on the right. Sized to exactly fill the screen below the fixed header.
 * `children` is the card's content (tabs + form).
 */
export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <section
      aria-labelledby="login-hero-heading"
      // Fills the screen below the fixed 80px header (layout adds pt-20)
      className={`${figtree.className} relative isolate w-full overflow-hidden bg-[#0B1F45] min-h-[calc(100dvh-5rem)] lg:h-[calc(100dvh-5rem)] lg:min-h-[560px]`}
    >
      {/* Background photo */}
      <Image
        src="/Images/login/Broadband_Bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[35%_center]"
      />
      {/* Soft light wash on the left so the headline reads */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-white/55 lg:bg-transparent lg:bg-[radial-gradient(ellipse_45%_60%_at_18%_30%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_45%,rgba(255,255,255,0)_100%)] dark:bg-black/50 lg:dark:bg-[radial-gradient(ellipse_45%_60%_at_18%_30%,rgba(2,6,23,0.85)_0%,rgba(2,6,23,0.5)_50%,rgba(2,6,23,0)_100%)]"
      />

      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col gap-6 px-4 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-6 [@media(max-height:760px)]:lg:py-3">
        {/* LEFT: brand + headline */}
        <div className="flex flex-col lg:max-w-[460px] lg:self-start lg:pt-[2vh]">
          <div className="w-fit rounded-xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
            <Image src="/ZBLogo.svg" alt="Zoiko Broadband" width={120} height={48} className="h-9 w-auto lg:h-11" priority />
          </div>

          <h1
            id="login-hero-heading"
            className="mt-4 text-[32px] font-extrabold leading-[1.05] tracking-tight text-[#0B1F45] sm:text-4xl lg:mt-6 lg:text-[clamp(2.25rem,4.6vh,3.25rem)] dark:text-white"
          >
            Fast. Reliable.
            <br />
            <span className="text-[#1257B8] dark:text-[#63a7db]">Connected.</span>
          </h1>
          <p className="mt-3 max-w-[380px] text-base font-medium text-[#0B1F45]/85 lg:text-lg dark:text-white/85">
            Full fibre broadband and digital lines, built around you.
          </p>

          <ul className="mt-5 hidden gap-6 sm:flex">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex w-[96px] flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-[#1257B8]/10">
                  <Icon aria-hidden className="h-5 w-5 text-[#0B1F45]" strokeWidth={2.2} />
                </span>
                <span className="mt-2 text-xs font-semibold leading-snug text-[#0B1F45] dark:text-white">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: auth card */}
        <div className="flex w-full justify-center lg:h-full lg:w-auto lg:items-center">
          <div className="flex max-h-full w-full max-w-[440px] flex-col rounded-3xl bg-white/95 shadow-[0_20px_60px_rgba(11,31,69,0.25)] ring-1 ring-black/5 backdrop-blur dark:bg-slate-950/95 dark:ring-white/10">
            {children}

            {/* Legal footer */}
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-slate-100 px-4 py-2.5 [@media(max-height:760px)]:py-1.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              {legalLinks.map(({ label, href }) => (
                <span key={href} className="flex items-center gap-2">
                  <Link href={href} className="hover:text-[#0B1F45] hover:underline dark:hover:text-white">
                    {label}
                  </Link>
                  <span aria-hidden>·</span>
                </span>
              ))}
              <span>© {new Date().getFullYear()} Zoiko Broadband</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

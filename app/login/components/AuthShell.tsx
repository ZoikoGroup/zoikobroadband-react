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
 * Full-screen auth layout (matches the Figma "Sign in" frame): background
 * photo with no overlay, brand headline on the left and a white card on the
 * right. Sized to exactly fill the screen below the fixed 80px header.
 * Left-side sizes scale with the viewport (vw, capped by vh) so the
 * proportions stay the same on every desktop size.
 *
 * `tabs` renders above the bordered form panel; `children` goes inside it.
 */
export default function AuthShell({ tabs, children }: { tabs?: ReactNode; children: ReactNode }) {
  return (
    <section
      aria-labelledby="login-hero-heading"
      className={`${figtree.className} relative isolate w-full overflow-hidden bg-[#f4f4f4] text-[#0B1F45] min-h-[calc(100dvh-5rem)] lg:h-[calc(100dvh-5rem)] lg:min-h-[560px]`}
    >
      {/* Background photo — no overlay */}
      <Image
        src="/Images/login/Broadband_Bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />

      <div className="mx-auto flex h-full w-full max-w-[1320px] flex-col gap-6 px-4 py-6 sm:px-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12 lg:px-12 lg:py-[3vh]">
        {/* LEFT: brand + headline */}
        <div className="flex flex-col lg:pt-[2vh] [text-shadow:0_0_14px_rgba(255,255,255,0.95),0_0_4px_rgba(255,255,255,0.9)]">
          <Image
            src="/ZBLogo.svg"
            alt="Zoiko Broadband"
            width={200}
            height={80}
            priority
            className="h-auto w-[140px] lg:w-[min(13vw,22vh,190px)]"
          />

          <h1
            id="login-hero-heading"
            className="mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.02em] text-[#0B1F45] sm:text-5xl lg:mt-[1.5vh] lg:text-[min(4.7vw,8.2vh,72px)]"
          >
            Fast. Reliable.
            <br />
            <span className="text-[#1257B8]">Connected.</span>
          </h1>

          <p className="mt-3 text-lg font-medium leading-snug text-[#0B1F45] sm:text-xl lg:mt-[1.2vh] lg:text-[min(1.95vw,3.4vh,28px)]">
            Full fibre broadband and digital lines,
            <br />
            built around you.
          </p>

          <ul className="mt-5 flex gap-4 lg:mt-[2.2vh] lg:gap-[min(1.6vw,24px)]">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex w-[96px] flex-col items-center text-center lg:w-[min(9vw,16vh,130px)]">
                <span className="flex aspect-square w-12 items-center justify-center rounded-full bg-[#E9EFFA] shadow-sm lg:w-[min(4.6vw,8vh,66px)]">
                  <Icon aria-hidden className="h-1/2 w-1/2 text-[#1D4E9E]" strokeWidth={1.8} />
                </span>
                <span className="mt-2 text-xs font-semibold leading-tight text-[#0B1F45] lg:mt-[0.8vh] lg:text-[max(11px,min(1.15vw,2vh,16px))]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: auth card */}
        <div className="flex w-full justify-center lg:w-auto lg:items-center">
          <div className="flex max-h-full w-full max-w-[460px] flex-col rounded-[22px] bg-white p-2.5 [@media(max-height:760px)]:p-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)] lg:w-[clamp(400px,34vw,470px)] lg:max-w-none">
            {tabs}

            {/* Bordered form panel (scrolls inside only on very short screens) */}
            <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-slate-200 px-5 py-5 [@media(max-height:760px)]:py-2.5 sm:px-6">
              {children}
            </div>

            {/* Legal footer */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 px-2 pb-1 pt-2.5 text-[11px] text-slate-500 [@media(max-height:760px)]:pt-1.5">
              <span className="flex flex-wrap items-center gap-x-2">
                {legalLinks.map(({ label, href }, i) => (
                  <span key={href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>•</span>}
                    <Link href={href} className="hover:text-[#0B1F45] hover:underline">
                      {label}
                    </Link>
                  </span>
                ))}
              </span>
              <span>© {new Date().getFullYear()} Zoiko Broadband</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { AlertTriangle, Info } from "lucide-react";

const SUB_NAV_LINKS = [
  { label: "Safety first", href: "#safety-first" },
  { label: "Check availability", href: "#check-availability" },
  { label: "Plan & price", href: "#plan-and-price" },
  { label: "Your number & handset", href: "#number-and-handset" },
  { label: "Install & switch", href: "#install-and-switch" },
  { label: "Ask us", href: "#ask-about-home-digital-phone" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function HomeDigitalPhoneSafetyAndNav() {
  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased">
      {/* Sticky Horizontal Anchor Navigation Bar */}
      <nav
        aria-label="Page sections"
        className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xs border-b border-gray-200/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start md:justify-between gap-6 sm:gap-8 overflow-x-auto py-4 text-xs sm:text-sm font-bold text-[#0E2F52] whitespace-nowrap">
            {SUB_NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-[#0A3A66] transition-colors py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Safety First & Availability Notices Section */}
      <section
        id="safety-first"
        className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Card 1: Red Safety Warning Banner */}
          <div className="bg-[#FDF2EF] border border-[#F3D1C8] rounded-2xl px-6 py-6 sm:px-8 sm:py-7 flex items-start gap-4 sm:gap-5 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-[#FAE2DC] text-[#9A281E] flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-extrabold text-[#7F1D1D] tracking-tight leading-snug">
                A few important safety points first
              </h2>

              <p className="text-xs sm:text-sm text-[#8C2D23] leading-relaxed">
                A home digital phone needs power and broadband, so it may{" "}
                <strong className="font-bold text-[#7F1D1D]">
                  not work in a power cut
                </strong>{" "}
                — including for 999. Keep a working backup such as a charged
                mobile, and never call 999 to test. If anyone relies on the line
                for a{" "}
                <strong className="font-bold text-[#7F1D1D]">
                  care alarm, telecare or medical alert
                </strong>
                , don&apos;t switch or disconnect anything until it&apos;s
                checked with both your provider and the device supplier. See the{" "}
                <Link
                  href="/emergency-calling-guide"
                  className="font-bold text-[#7F1D1D] underline underline-offset-2 hover:text-[#651515] transition-colors"
                >
                  Emergency Calling Guidance
                </Link>{" "}
                before you switch.
              </p>
            </div>
          </div>

          {/* Card 2: Amber Left-Border Availability & Pricing Banner */}
          <div className="bg-white border border-[#F59E0B]/60 border-l-4 border-l-[#F59E0B] rounded-2xl px-6 py-6 sm:px-8 sm:py-7 flex items-start gap-4 sm:gap-5 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-[#FEF7E6] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0E2F52] tracking-tight leading-snug">
                Availability and price depend on your address
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                A postcode alone doesn&apos;t confirm service. We check your
                exact home before showing what can be offered. Prices include
                VAT and are confirmed for your address — the plans below are an
                illustrative example until you check.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

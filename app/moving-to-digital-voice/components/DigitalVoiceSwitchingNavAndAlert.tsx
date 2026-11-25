import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const SWITCHING_NAV_ANCHORS = [
  { label: "Safety first", href: "#safety-first" },
  { label: "Which path?", href: "#which-path" },
  { label: "Is it genuine?", href: "#is-it-genuine" },
  { label: "Readiness check", href: "#readiness-check" },
  { label: "What to expect", href: "#what-to-expect" },
  { label: "Get help", href: "#get-help" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function DigitalVoiceSwitchingNavAndAlert() {
  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased">
      {/* Sticky Sub-navigation Bar */}
      <nav
        aria-label="Switching guide sections"
        className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-30"
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:justify-around gap-6 overflow-x-auto py-4 no-scrollbar">
            {SWITCHING_NAV_ANCHORS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs sm:text-sm font-bold text-[#0E2F52] hover:text-[#D97706] whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Life-Critical Dependencies Alert Banner */}
      <section
        id="safety-first"
        className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
      >
        <div className="bg-[#FDF4F2] border border-[#F3D5CE] rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          {/* Warning Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#FAE6E1] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
              Before you change anything — check life-critical dependencies
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              If anyone relies on the phone line for a{" "}
              <strong className="font-bold text-[#0E2F52]">
                care alarm, telecare or medical alert
              </strong>
              , for{" "}
              <strong className="font-bold text-[#0E2F52]">
                emergency calls
              </strong>
              , or for{" "}
              <strong className="font-bold text-[#0E2F52]">
                business-critical equipment
              </strong>
              , don&apos;t switch or disconnect anything yet. Get an{" "}
              <Link
                href="#assisted-review"
                className="font-bold text-[#0E2F52] underline decoration-[#0E2F52]/60 hover:decoration-[#0E2F52] transition-colors"
              >
                assisted review
              </Link>{" "}
              first, and tell both your provider and any device supplier. In an
              emergency, call 999 or 112 using a working phone such as a charged
              mobile — never to test.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

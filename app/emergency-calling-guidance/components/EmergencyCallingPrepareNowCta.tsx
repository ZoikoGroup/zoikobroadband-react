import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EmergencyCallingPrepareNowCta() {
  return (
    <section
      id="be-ready"
      className="w-full bg-white text-white font-sans antialiased overflow-x-hidden py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-6 py-14 sm:px-12 sm:py-16 text-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #072A4E 0%, #0A3A66 55%, #072544 100%)",
          }}
        >
          {/* Subtle Decorative Outline Circle on Bottom-Right */}
          <div
            className="pointer-events-none select-none absolute -bottom-24 -right-12 w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-white/10"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Eyebrow Tag */}
            <div className="flex items-center justify-center space-x-2.5 mb-4">
              <span className="h-[2px] w-6 bg-[#F5B82E]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                BE READY
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Prepare now, so you&apos;re
              <br />
              ready later
            </h2>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-200/90 leading-relaxed mb-8">
              Run the quick readiness checks, keep a backup for 999, and sort
              out any care or alarm devices with their providers. In an
              emergency, always call 999 or 112 from a working phone — this page
              can&apos;t do that for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
              <Link
                href="#prepare-outage"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors shadow-sm group"
              >
                <span>Home readiness checks</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#accessible-routes"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Accessible emergency routes</span>
              </Link>
            </div>

            {/* Informational Footnote */}
            <p className="text-[11px] sm:text-xs text-slate-300/80 max-w-md mx-auto leading-relaxed">
              Public information only — not an emergency service, and not a
              claim about any specific line&apos;s status.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

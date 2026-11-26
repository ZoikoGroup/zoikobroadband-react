import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DigitalVoiceGettingReadyCta() {
  return (
    <section
      id="getting-ready"
      className="w-full bg-white text-white font-sans antialiased overflow-x-hidden py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl px-6 py-14 sm:px-12 sm:py-16 overflow-hidden shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #072A4B 0%, #0A3A66 55%, #0D4475 100%)",
          }}
        >
          {/* Subtle Decorative Outline Ring on Bottom Right */}
          <div
            className="pointer-events-none absolute -right-20 -bottom-32 w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-white/10"
            aria-hidden="true"
          />

          {/* Centered CTA Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                GETTING READY?
              </span>
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Switching to digital voice? Get ready safely
            </h2>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed mb-8">
              Run through the readiness checklist, check your handset and
              number, and sort out any alarm or telecare before you switch. If
              you rely on your line for emergencies, talk to us first.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
              <Link
                href="#readiness"
                className="inline-flex items-center justify-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors shadow-sm group"
              >
                <span>Readiness checklist</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/digital-phone-options"
                className="inline-flex items-center justify-center bg-[#0B355C]/80 hover:bg-white/10 text-white border border-white/25 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Find digital phone options</span>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] sm:text-xs text-slate-300/90 leading-relaxed">
              This page is informational — nothing is activated, ordered or
              billed here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

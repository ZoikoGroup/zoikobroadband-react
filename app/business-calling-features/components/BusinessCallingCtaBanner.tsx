import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BusinessCallingCtaBanner() {
  return (
    <section
      id="business-calling-cta"
      aria-label="Request a tailored business calling quote"
      className="w-full bg-white text-white font-sans antialiased overflow-x-hidden py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-6 py-14 sm:px-12 sm:py-16 text-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #072A4E 0%, #0A3A66 55%, #08345F 100%)",
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
                READY TO IMPROVE HOW YOU HANDLE CALLS?
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Tell us what you need,
              <br />
              and we&rsquo;ll confirm and
              <br />
              price it
            </h2>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-200/90 leading-relaxed mb-8 max-w-xl mx-auto">
              Add features to compare, then request a tailored quote. We&apos;ll
              check availability for your account and set out the costs &mdash;
              no activation, no pre-ticked marketing, no surprises.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
              <Link
                href="#all-features"
                className="inline-flex items-center justify-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors shadow-sm group"
              >
                <span>Explore features</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#request-a-quote"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/15 text-white border border-white/30 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Speak to a business specialist</span>
              </Link>
            </div>

            {/* Informational Footnote */}
            <p className="text-[11px] sm:text-xs text-slate-300/80 max-w-md mx-auto leading-relaxed">
              This page is informational &mdash; nothing is activated or billed
              here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

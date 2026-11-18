import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MultiSiteCTA() {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Dark Blue Container Card */}
        <div className="relative rounded-3xl bg-[#0B355F] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl text-center">
          {/* Subtle decorative background arc */}
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-white/10"
            aria-hidden="true"
          />

          {/* Inner Content Wrapper */}
          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Eyebrow Tag */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="h-[2px] w-8 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                READY TO MAP IT OUT?
              </span>
              <span className="h-[2px] w-8 bg-[#F5B82E]" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight mb-4 leading-tight">
              Plan connectivity across all your sites
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8">
              Build your site portfolio and send it to our team, or speak to a
              specialist. We&apos;ll review each location separately and design
              a plan that fits — no nationwide promises, no zero-downtime
              claims, and prices confirmed per site.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link
                href="#plan-my-sites"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors group shadow-xs"
              >
                <span>Plan my sites</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/business-specialist"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Speak to a business specialist</span>
              </Link>
            </div>

            {/* Bottom Footnote */}
            <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
              This page is consultative — availability and prices are confirmed
              separately for each site, and nothing is ordered here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

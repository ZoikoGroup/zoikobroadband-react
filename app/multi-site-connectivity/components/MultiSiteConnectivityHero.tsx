import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building, MapPin, Info, ArrowRight } from "lucide-react";

const PORTFOLIO_SITES = [
  {
    title: "Headquarters",
    status: "Not checked",
  },
  {
    title: "Branch A",
    status: "Not checked",
  },
  {
    title: "Branch B",
    status: "Not checked",
  },
] as const;

export default function MultiSiteConnectivityHero() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0B355F] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/multi/1.jpg"
        alt="Aerial view of commercial office buildings at twilight with illuminated windows"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #0B355F 0%, rgba(11, 53, 95, 0.98) 35%, rgba(11, 53, 95, 0.65) 40%, rgba(11, 53, 95, 0.50) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                BUSINESS CONNECTIVITY
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Connect every site. Plan every detail.
            </h1>

            {/* Description */}
            <p className="text-base text-slate-200 leading-relaxed max-w-lg">
              Tell us where your business operates, what each location needs,
              and which systems cannot go offline. We&apos;ll use the
              information to review available connections and discuss a suitable
              plan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="#plan-sites"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors group"
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

            {/* Bottom Note */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1 text-xs text-slate-200 leading-relaxed">
              <span>
                Availability, design, installation and prices are confirmed
                separately for each site. Need only one location?
              </span>
              
              <Link
                href="/business"
                className="text-[#F5B82E] font-semibold hover:underline shrink-0"
              >
                Explore Business Broadband Plans
              </Link>
            </div>
          </div>

          {/* Right Column: Your site portfolio Card */}
          <div className="lg:col-span-6 lg:pl-6">
            <div className="relative rounded-3xl bg-[#0B355FDB] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Subtle decorative arc */}
              <div
                className="pointer-events-none absolute -bottom-20 -right-10 w-72 h-72 rounded-full border border-white/10"
                aria-hidden="true"
              />

              {/* Card Header */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-white mb-1">
                  Your site portfolio
                </h2>
                <p className="text-xs text-slate-300">
                  An illustrative example — statuses start as &ldquo;Not
                  checked&rdquo;.
                </p>
              </div>

              {/* Portfolio Sites Stack */}
              <div className="space-y-3">
                {PORTFOLIO_SITES.map((site) => (
                  <div
                    key={site.title}
                    className="flex items-center gap-4 rounded-2xl bg-[#092848]/70 border border-white/10 p-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {site.title}
                      </div>
                      <div className="text-xs text-slate-300">
                        {site.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Footnote */}
              <div className="flex items-start gap-2.5 mt-5 pt-4 border-t border-white/10">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Each site is checked on its own — one address tells us nothing
                  about another.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

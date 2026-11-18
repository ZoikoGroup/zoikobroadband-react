import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Info, Wifi, ArrowUp, Clock, Laptop } from "lucide-react";

const WEIGH_UP_ITEMS = [
  {
    icon: Wifi,
    title: "Technology",
    subtitle: "Full Fibre (FTTP) or Part Fibre (SOGEA)",
  },
  {
    icon: ArrowUp,
    title: "Speed",
    subtitle: "Download and upload, with qualifiers",
  },
  {
    icon: Clock,
    title: "Total cost",
    subtitle: "Full-term cost, not just monthly",
  },
  {
    icon: Laptop,
    title: "Setup & contract",
    subtitle: "Equipment, install and term length",
  },
] as const;

export default function BusinessBroadbandHero() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0B355F] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/business/1.jpg"
        alt="Colleagues collaborating at a desk in a modern office with a laptop"
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
                BUSINESS BROADBAND
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight max-w-120 leading-[1.12]">
              Find business broadband for your workplace
            </h1>

            {/* Description */}
            <p className="text-base text-slate-200 leading-relaxed max-w-lg">
              Compare eligible options for your address and find a connection
              that suits how your business works. Business plans depend on your
              address and final eligibility checks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/check-availability"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>Check Business Availability</span>
              </Link>

              <Link
                href="#tailored-quote"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Request a Tailored Quote</span>
              </Link>
            </div>

            {/* Bottom Note */}
            <div className="flex items-center gap-2.5 pt-1">
              <Info className="w-4 h-4 text-[#F5B82E] shrink-0" />
              <p className="text-xs text-slate-200 leading-relaxed">
                Prices, speeds and availability are confirmed for your exact
                address.
              </p>
            </div>
          </div>

          {/* Right Column: What to weigh up Card */}
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
                  What to weigh up
                </h2>
                <p className="text-xs text-slate-300">
                  The same details, side by side — not just the headline price.
                </p>
              </div>

              {/* Weigh Up Stack */}
              <div className="space-y-3">
                {WEIGH_UP_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl bg-[#092848]/70 border border-white/10 p-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-300">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer Footnote */}
              <div className="flex items-start gap-2.5 mt-5 pt-4 border-t border-white/10">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Which plans appear depends on what&apos;s serviceable at your
                  property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

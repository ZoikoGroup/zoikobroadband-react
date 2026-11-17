import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Info,
  Building2,
  Server,
  Cable,
  Router,
  ArrowDown,
} from "lucide-react";

const PART_FIBRE_STEPS = [
  {
    icon: Building2,
    title: "Exchange / network",
    subtitle: "Fibre carries the service",
  },
  {
    icon: Server,
    title: "Street cabinet",
    subtitle: "Fibre reaches here",
  },
  {
    icon: Cable,
    title: "Copper line",
    subtitle: "Final section to your home",
  },
  {
    icon: Router,
    title: "Your router",
    subtitle: "Serves your devices",
  },
] as const;

export default function PartFibreHero() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0B355F] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/part/1.jpg"
        alt="Street with terraced houses showing Part Fibre broadband connection path"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #0B355F 0%, rgba(11, 53, 95, 0.98) 49%, rgba(11, 53, 95, 0.65) 50%, rgba(11, 53, 95, 0.50) 100%)",
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
                HOME BROADBAND
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Part Fibre Broadband (SOGEA)
            </h1>

            {/* Description */}
            <p className="text-base text-slate-200 leading-relaxed max-w-lg">
              Part fibre broadband uses fibre connectivity to a street cabinet
              and an existing copper connection for the final section to your
              property. Plans and performance depend on your address.
            </p>

            {/* Callout Box */}
            <div className="rounded-2xl bg-[#0B355FEB] border border-white/15 p-4 flex items-start gap-3.5 max-w-lg">
              <div className="w-8 h-8 rounded-xl bg-[#F5B82E]/20 text-[#F5B82E] flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                SOGEA is a broadband access service and doesn&apos;t itself
                provide traditional landline calling. Voice options, if
                available, are separate.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/check-availability"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>Check Availability</span>
              </Link>

              <Link
                href="/full-fibre"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Compare with Full Fibre</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Connection Flow Card */}
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
                  How Part Fibre connects
                </h2>
                <p className="text-xs text-slate-300">
                  Illustrative — fibre to the cabinet, copper for the final
                  stretch.
                </p>
              </div>

              {/* Connection Steps Stack */}
              <div className="space-y-2">
                {PART_FIBRE_STEPS.map((step, index) => {
                  const IconComponent = step.icon;
                  const isLast = index === PART_FIBRE_STEPS.length - 1;
                  return (
                    <React.Fragment key={step.title}>
                      <div className="flex items-center gap-4 rounded-2xl bg-[#092848]/70 border border-white/10 p-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">
                            {step.title}
                          </div>
                          <div className="text-xs text-slate-300">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                      {!isLast && (
                        <div className="flex justify-center my-0.5">
                          <ArrowDown className="w-3.5 h-3.5 text-slate-400/80" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Card Footer Footnote */}
              <div className="flex items-start gap-2.5 mt-5 pt-4 border-t border-white/10">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Full Fibre (FTTP) runs fibre all the way to your property
                  instead of using a copper segment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

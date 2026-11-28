import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, AlertTriangle, Info } from "lucide-react";

const SETUP_STAGES = [
  {
    number: "1",
    title: "Order accepted",
    subtitle: "Your setup is being arranged",
  },
  {
    number: "2",
    title: "Installation",
    subtitle: "Self-setup, engineer or assisted",
  },
  {
    number: "3",
    title: "Provisioning",
    subtitle: "The service is set up on the network",
  },
  {
    number: "4",
    title: "Activation",
    subtitle: "Verified with an ordinary call",
  },
] as const;

export default function InstallationAndSetupHero() {
  return (
    <section className="relative w-full min-h-[650px] bg-[#0B2545] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/setup/1.png"
        alt="Technician configuring digital voice installation on a laptop with holographic dashboards"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Deep Navy Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11, 37, 69, 0.94) 0%, rgba(11, 37, 69, 0.86) 52%, rgba(15, 48, 92, 0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Copy, Dual CTAs & Safety Note */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                DIGITAL LINES &bull; SWITCHING &amp; SUPPORT
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
              Installation &amp; Setup
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Understand what to prepare, how to set up your digital voice, and
              how to check it&apos;s working — safely. Start with the safety
              points, then follow the guidance that fits your setup.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="#setup-steps"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors group shadow-md"
              >
                <span>Find my setup steps</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#installation-help"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/15 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Get installation help</span>
              </Link>
            </div>

            {/* Safety Warning Footnote */}
            <div className="flex items-start gap-2.5 pt-1 max-w-lg text-xs text-slate-300 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-[#F5B82E] shrink-0 mt-0.5" />
              <p>
                If you rely on your line for a care alarm or emergencies, read
                the safety panel first and get an assisted review before setting
                anything up.
              </p>
            </div>
          </div>

          {/* Right Column: Translucent Glassmorphic 4-Stage Flow Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E2F52]/45 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-white mb-1">
                  From order to a working phone
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Each stage is confirmed — not assumed.
                </p>
              </div>

              {/* Numbered 4-Stage Flow */}
              <div className="space-y-1.5">
                {SETUP_STAGES.map((stage, index) => {
                  const isLast = index === SETUP_STAGES.length - 1;

                  return (
                    <React.Fragment key={stage.number}>
                      <div className="bg-[#0B2545]/75 border border-white/10 rounded-2xl px-4 py-3.5 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#F5B82E] text-[#0E2F52] font-extrabold text-sm flex items-center justify-center shrink-0">
                          {stage.number}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white leading-snug">
                            {stage.title}
                          </div>
                          <div className="text-xs text-slate-300 mt-0.5">
                            {stage.subtitle}
                          </div>
                        </div>
                      </div>

                      {!isLast && (
                        <div className="pl-6 py-0.5">
                          <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Card Bottom Note */}
              <div className="flex items-start gap-2 mt-5 pt-4 border-t border-white/10 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                <span>
                  A dial tone isn&apos;t proof everything works — and ticking a
                  box doesn&apos;t confirm live activation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Phone,
  Monitor,
  Globe,
  Info,
} from "lucide-react";

const DIGITAL_PHONE_DEPENDENCIES = [
  {
    icon: Phone,
    title: "Your phone",
    subtitle: "Handset or app",
  },
  {
    icon: Monitor,
    title: "Router / adapter",
    subtitle: "Needs mains power",
  },
  {
    icon: Globe,
    title: "The network",
    subtitle: "Needs broadband",
  },
] as const;

export default function EmergencyCallingGuidanceHero() {
  return (
    <section className="relative w-full min-h-[640px] bg-[#0B2545] text-white font-sans antialiased overflow-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/calling/1.jpg"
        alt="Woman making a call outdoors with a mobile phone"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Deep Navy Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11, 37, 69, 0.94) 0%, rgba(11, 37, 69, 0.85) 52%, rgba(15, 48, 92, 0.68) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Decorative Outline Circle on Bottom-Right */}
      <div
        className="pointer-events-none select-none absolute -bottom-28 -right-12 w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-white/15 z-0"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Copy & Dual CTAs */}
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
              Emergency Calling
              <br />
              Guidance
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              How to reach the emergency services on a digital phone, what to do
              in a power cut or outage, and how to be ready. This is information
              only — it is not an emergency service, and it can&apos;t contact
              999 for you.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="#prepare-outage"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors group shadow-md"
              >
                <span>Prepare for an outage</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#accessible-routes"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/15 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Accessible emergency routes</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Translucent Glassmorphic Dependency Flow Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E2F52]/45 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-white mb-1">
                  Why a digital phone can fail
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  It depends on power and broadband.
                </p>
              </div>

              {/* 3-Step Dependency Chain */}
              <div className="space-y-1.5">
                {DIGITAL_PHONE_DEPENDENCIES.map((item, index) => {
                  const IconComponent = item.icon;
                  const isLast =
                    index === DIGITAL_PHONE_DEPENDENCIES.length - 1;

                  return (
                    <React.Fragment key={item.title}>
                      <div className="bg-[#0B2545]/75 border border-white/10 rounded-2xl px-4 py-3.5 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white leading-snug">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-300 mt-0.5">
                            {item.subtitle}
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
                  If the power or broadband is down, the phone may not work — so
                  keep a backup for 999.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

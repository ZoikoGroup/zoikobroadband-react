import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  AlertTriangle,
  Phone,
  Monitor,
  Globe,
  Info,
} from "lucide-react";

const HOME_PHONE_STEPS = [
  {
    icon: Phone,
    title: "Your phone",
    subtitle: "Often your existing handset",
  },
  {
    icon: Monitor,
    title: "Your router",
    subtitle: "Over your broadband",
  },
  {
    icon: Globe,
    title: "The network",
    subtitle: "Carries the call",
  },
] as const;

export default function HomeDigitalPhoneHero() {
  return (
    <section className="relative w-full min-h-[640px] bg-[#0B2545] text-white font-sans antialiased overflow-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/home/1.png"
        alt="Smartphone displaying digital communications and network interface"
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
          {/* Left Column: Eyebrow, Heading, Copy, Dual CTAs & Safety Note */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                DIGITAL LINES &bull; HOME PHONE &amp; VOICE
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
              Home Digital Phone
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              A home phone that works over your broadband instead of a
              traditional line. Check what&apos;s available at your address,
              keep your number with a porting check, and understand the safety
              points before you switch. Prices include VAT.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="#check-availability"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-md"
              >
                <MapPin className="w-4 h-4 mr-2 stroke-[2.2]" />
                <span>Check Availability</span>
              </Link>

              <Link
                href="#ask-about-home-digital-phone"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/15 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Ask about Home Digital Phone</span>
              </Link>
            </div>

            {/* Power Cut & 999 Safety Footnote */}
            <div className="flex items-start gap-2.5 pt-1 text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-slate-200 shrink-0 mt-0.5" />
              <span>
                A digital phone needs power and broadband, so it may not work in
                a power cut. Keep a backup for 999, and read the safety points
                below.
              </span>
            </div>
          </div>

          {/* Right Column: Translucent Glassmorphic Flow Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E2F52]/45 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-white mb-1">
                  How a home digital phone works
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Calls over your broadband, not a copper line.
                </p>
              </div>

              {/* 3-Step Connection Chain */}
              <div className="space-y-4">
                {HOME_PHONE_STEPS.map((item) => {
                  const IconComponent = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="bg-[#0B2545]/75 border border-white/10 rounded-2xl px-4 py-3.5 flex items-center gap-4"
                    >
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
                  );
                })}
              </div>

              {/* Card Bottom Note */}
              <div className="flex items-start gap-2 mt-5 pt-4 border-t border-white/10 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                <span>
                  Your existing handset usually plugs into the router or an
                  adapter — not the old wall socket.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  Phone,
  Router,
  Globe,
  Info,
} from "lucide-react";

const VOICE_FLOW_STEPS = [
  {
    icon: Phone,
    title: "Your phone",
    subtitle: "A handset or an app",
  },
  {
    icon: Router,
    title: "Your router",
    subtitle: "Over your broadband",
  },
  {
    icon: Globe,
    title: "The network",
    subtitle: "Carries the call",
  },
] as const;

export default function DigitalVoiceHero() {
  return (
    <section className="relative w-full min-h-[640px] bg-[#0B2545] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/digital/1.jpg"
        alt="Person wearing a headset speaking on a digital voice call at a desk"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Deep Navy Linear Gradient Overlay matching design */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #0B2545 0%, rgba(11, 37, 69, 0.94) 48%, rgba(19, 56, 107, 0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Description, CTAs & Power/999 Warning */}
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
              How digital voice works
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Digital voice (sometimes called VoIP) carries your phone calls
              over your broadband instead of a traditional phone line.
              Here&apos;s how it fits together, what to check, and the safety
              points that matter before you switch.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-7 py-4 rounded-xl transition-colors group shadow-md"
              >
                <span>See how it works</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#readiness-checklist"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/35 font-semibold text-sm px-7 py-4 rounded-xl transition-colors"
              >
                <span>Readiness checklist</span>
              </Link>
            </div>

            {/* Safety Warning Footnote */}
            <div className="flex items-start gap-2.5 pt-2 max-w-lg text-xs text-slate-300 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-[#F5B82E] shrink-0 mt-0.5" />
              <p>
                Digital voice needs power and broadband, so it may not work in a
                power cut. Keep a backup for 999 calls, and never call 999 to
                test.
              </p>
            </div>
          </div>

          {/* Right Column: Translucent Glassmorphic Flow Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E2F52]/55 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-white mb-1">
                  The quick answer
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Digital voice in one sentence.
                </p>
              </div>

              {/* Vertical Step Flow */}
              <div className="space-y-2.5">
                {VOICE_FLOW_STEPS.map((step, index) => {
                  const IconComponent = step.icon;
                  const isLast = index === VOICE_FLOW_STEPS.length - 1;

                  return (
                    <React.Fragment key={step.title}>
                      <div className="bg-[#0B2545]/75 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white leading-snug">
                            {step.title}
                          </div>
                          <div className="text-xs text-slate-300 mt-0.5">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>

                      {!isLast && (
                        <div className="pl-7 py-0.5">
                          <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Card Bottom Note */}
              <div className="flex items-center gap-2 mt-6 pt-5 border-t border-white/10 text-[11px] sm:text-xs text-slate-300">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>
                  Calls travel as data over your broadband — so your connection
                  and power matter.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

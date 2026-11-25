import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, AlertTriangle, Info } from "lucide-react";

const SWITCH_MOVE_STEPS = [
  {
    number: "1",
    title: "Prepare",
    subtitle: "Check readiness and dependencies",
  },
  {
    number: "2",
    title: "Change",
    subtitle: "The move happens, when it's confirmed",
  },
  {
    number: "3",
    title: "Verify",
    subtitle: "Check calls work — with an ordinary number",
  },
] as const;

export default function DigitalVoiceSwitchingHero() {
  return (
    <section className="relative w-full min-h-[620px] bg-[#0B2545] text-white font-sans antialiased overflow-x-hidden flex items-center">
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
            "linear-gradient(90deg, #0B2545 0%, rgba(11, 37, 69, 0.94) 50%, rgba(15, 48, 92, 0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Copy, CTA & Safety Note */}
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
              Switching safely to digital voice
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Traditional phone lines are being retired, and calls are moving to
              digital voice over broadband. This guide helps you get ready
              safely — at your own pace, before anything changes. It&apos;s a
              preparation guide, not an order.
            </p>

            {/* Primary CTA Button */}
            <div className="pt-1">
              <Link
                href="#readiness"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-7 py-4 rounded-xl transition-colors group shadow-md"
              >
                <span>Check my readiness</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Safety Warning Footnote */}
            <div className="flex items-start gap-2.5 pt-1 max-w-lg text-xs text-slate-300 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-[#F5B82E] shrink-0 mt-0.5" />
              <p>
                Use a care alarm, or rely on your landline for emergencies? Read
                the safety panel first and get an assisted review before
                anything changes.
              </p>
            </div>
          </div>

          {/* Right Column: Translucent Glassmorphic 3-Step Flow Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E2F52]/55 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-white mb-1">
                  How the move works
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Prepare first, change second, verify last.
                </p>
              </div>

              {/* Numbered Step Flow */}
              <div className="space-y-2">
                {SWITCH_MOVE_STEPS.map((step, index) => {
                  const isLast = index === SWITCH_MOVE_STEPS.length - 1;

                  return (
                    <React.Fragment key={step.number}>
                      <div className="bg-[#0B2545]/75 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#F5B82E] text-[#0E2F52] font-extrabold text-sm flex items-center justify-center shrink-0">
                          {step.number}
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
                        <div className="pl-6.5 py-0.5">
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
                  Nothing changes until it&apos;s confirmed — and you can
                  prepare without signing in.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

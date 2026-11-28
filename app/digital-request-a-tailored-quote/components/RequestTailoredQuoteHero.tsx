import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, Info } from "lucide-react";

interface QuoteStepItem {
  readonly stepNumber: string;
  readonly title: string;
  readonly subtitle: string;
}

const HOW_A_QUOTE_WORKS_STEPS: readonly QuoteStepItem[] = [
  {
    stepNumber: "1",
    title: "Share your needs",
    subtitle: "A short, guided form",
  },
  {
    stepNumber: "2",
    title: "Specialist review",
    subtitle: "We check what fits your setup",
  },
  {
    stepNumber: "3",
    title: "Quote, if suitable",
    subtitle: "With clear pricing and terms",
  },
] as const;

export default function RequestTailoredQuoteHero() {
  return (
    <section className="relative w-full min-h-[640px] bg-[#0B2545] text-white font-sans antialiased overflow-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/quote/1.png"
        alt="Business specialist presenting communications strategy to colleagues in a meeting room"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Deep Navy Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11, 37, 69, 0.94) 0%, rgba(11, 37, 69, 0.85) 52%, rgba(15, 48, 92, 0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Copy, Dual CTAs & Non-Order Footnote */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                DIGITAL LINES &bull; BUSINESS VOICE
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
              Request a tailored
              <br />
              quote
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Tell us how your business uses the phone and what you need. A
              specialist reviews your requirements and prepares a quote if
              it&apos;s a good fit &mdash; around your numbers, sites and the
              things that must keep working. Nothing is ordered or activated
              here.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="#start-quote-request"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-md group"
              >
                <span>Start a quote request</span>
                <ArrowRight className="w-4 h-4 ml-2 stroke-[2.2] transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#speak-to-a-specialist"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/15 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Speak to a specialist</span>
              </Link>
            </div>

            {/* Non-Order & No-Promise Disclosure Note */}
            <div className="flex items-start gap-2.5 pt-1 text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
              <Info className="w-4 h-4 text-slate-200 shrink-0 mt-0.5" />
              <span>
                This is a request, not an order. We don&apos;t promise a price,
                a feature set or a go-live date here &mdash; and we don&apos;t
                migrate anything until it&apos;s reviewed with you.
              </span>
            </div>
          </div>

          {/* Right Column: Translucent Glassmorphic 3-Step Quote Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E2F52]/45 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-white mb-1">
                  How a quote works
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Three simple steps.
                </p>
              </div>

              {/* 3-Step Flow with Downward Arrows */}
              <div>
                {HOW_A_QUOTE_WORKS_STEPS.map((step, index) => (
                  <React.Fragment key={step.stepNumber}>
                    <div className="bg-[#0B2545]/75 border border-white/10 rounded-2xl px-4 py-3.5 flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#F5B82E] text-[#0E2F52] font-extrabold text-sm flex items-center justify-center shrink-0">
                        {step.stepNumber}
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

                    {index < HOW_A_QUOTE_WORKS_STEPS.length - 1 && (
                      <div
                        className="py-1.5 pl-7 text-slate-300/80"
                        aria-hidden="true"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Card Bottom Note */}
              <div className="flex items-start gap-2 mt-5 pt-4 border-t border-white/10 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                <span>
                  You can go back and edit any answer, and we only use your
                  details to respond.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

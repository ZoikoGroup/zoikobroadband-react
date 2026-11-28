import React from "react";

interface QuoteProcessStep {
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
}

const QUOTE_PROCESS_STEPS: readonly QuoteProcessStep[] = [
  {
    stepNumber: "1",
    title: "Share your needs",
    description:
      "A few questions about your calls, numbers, sites and dependencies.",
  },
  {
    stepNumber: "2",
    title: "Specialist review",
    description:
      "We check what\u2019s available and suitable for your business \u2014 including any safety dependencies.",
  },
  {
    stepNumber: "3",
    title: "Quote, if suitable",
    description:
      "If it\u2019s a fit, we prepare a quote with clear pricing, VAT basis and terms. If it isn\u2019t, we\u2019ll say so.",
  },
] as const;

export default function RequestQuoteHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HOW IT WORKS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Share your needs, we review, then quote
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            An honest, no-obligation process. Sharing your needs doesn&apos;t
            commit you to anything.
          </p>
        </div>

        {/* 3-Step Horizontal Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {QUOTE_PROCESS_STEPS.map((step, index) => (
            <div
              key={step.stepNumber}
              className="relative flex flex-col items-center text-center px-3"
            >
              {/* Connecting Horizontal Line on Desktop */}
              {index < QUOTE_PROCESS_STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-[calc(50%+34px)] w-[calc(100%-44px)] h-[1.5px] bg-[#CBD5E1]"
                  aria-hidden="true"
                />
              )}

              {/* Numbered Navy Badge with Soft Cream Ring */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-[#073763] text-white font-extrabold text-sm flex items-center justify-center ring-[5px] ring-[#FEF7E6] mb-5 shadow-2xs">
                {step.stepNumber}
              </div>

              {/* Step Title */}
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

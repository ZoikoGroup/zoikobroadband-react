import React from "react";
import { Info } from "lucide-react";

const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    title: "Discover",
    description: "You list your sites and what each one needs.",
  },
  {
    step: "2",
    title: "Check",
    description: "We check availability at each premises, separately.",
  },
  {
    step: "3",
    title: "Design",
    description: "We propose a suitable design across your sites.",
  },
  {
    step: "4",
    title: "Quote",
    description: "You get costs, per site, set out clearly.",
  },
  {
    step: "5",
    title: "Plan rollout",
    description: "We agree an order and a realistic rollout.",
  },
] as const;

export default function MultiSiteHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HOW IT WORKS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            From a list of sites to a plan
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            An honest view of the stages. Each one is subject to review —
            nothing is scheduled or guaranteed up front.
          </p>
        </div>

        {/* 5-Step Horizontal Flow */}
        <div className="relative mb-12">
          {/* Connecting Line (Desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-blue-200 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center bg-white sm:bg-transparent border sm:border-0 border-gray-200/80 rounded-2xl p-6 sm:p-0 shadow-xs sm:shadow-none"
              >
                {/* Step Circle */}
                <div className="w-20 h-20 rounded-full bg-[#0A3A66] text-[#FFFFFF] font-extrabold text-2xl flex items-center justify-center mb-5 shadow-md ring-4 ring-white">
                  {item.step}
                </div>

                {/* Step Title */}
                <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-gray-600 leading-relaxed max-w-[200px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="max-w-2xl mx-auto rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-3 text-center">
          <Info className="w-4 h-4 text-[#D97706] shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Every stage is subject to review — nothing is scheduled, priced or
            guaranteed until it&apos;s confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}

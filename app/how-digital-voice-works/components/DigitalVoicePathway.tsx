import React from "react";

const PATHWAY_STEPS = [
  {
    number: "1",
    title: "Your phone",
    description: "A handset or an app makes and takes the call.",
  },
  {
    number: "2",
    title: "Compatible connection",
    description:
      "A supported handset, an adapter, or an app connects to your service.",
  },
  {
    number: "3",
    title: "Router or ONT",
    description:
      "The call runs over your broadband via your router (and an ONT on full fibre).",
  },
  {
    number: "4",
    title: "The network",
    description: "The provider network carries the call to the other person.",
  },
] as const;

export default function DigitalVoicePathway() {
  return (
    <section
      id="the-pathway"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              THE PATHWAY
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            The four parts of a digital voice call
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A simple, ordered view. The exact equipment depends on your service.
          </p>
        </div>

        {/* 4-Step Horizontal Connected Timeline */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Desktop Connecting Horizontal Line */}
          <div
            className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-[1.5px] bg-[#DCE6F1] z-0"
            aria-hidden="true"
          />

          {PATHWAY_STEPS.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center px-2"
            >
              {/* Numbered Navy Circle with Cream Halo Ring */}
              <div className="w-12 h-12 rounded-full bg-[#0A3A66] text-white font-extrabold text-sm flex items-center justify-center ring-[6px] ring-[#FEF7E6] mb-5 shadow-xs">
                {step.number}
              </div>

              <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[230px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

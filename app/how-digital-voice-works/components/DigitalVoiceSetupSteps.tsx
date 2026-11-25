import React from "react";

const SETUP_STEPS = [
  {
    number: "1",
    title: "Confirm it's active",
    description:
      "Check your service is activated before expecting a dial tone.",
  },
  {
    number: "2",
    title: "Connect the phone",
    description:
      "Plug the phone into the router or adapter as your guide shows.",
  },
  {
    number: "3",
    title: "Check for a dial tone",
    description: "Lift the handset and listen for a dial tone.",
  },
  {
    number: "4",
    title: "Test with an ordinary call",
    description: "Call a normal, non-emergency number. Never call 999 to test.",
  },
] as const;

export default function DigitalVoiceSetupSteps() {
  return (
    <section
      id="connect-and-test"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              CONNECT &amp; TEST
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Getting set up, in order
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Follow the guide supplied for your equipment. These are the general
            steps — the detail depends on your service.
          </p>
        </div>

        {/* Ordered Vertical Step List */}
        <div className="space-y-6">
          {SETUP_STEPS.map((step) => (
            <div key={step.number} className="space-y-1">
              <div className="text-xs font-semibold text-gray-500">
                {step.number}
              </div>
              <h3 className="font-extrabold text-base text-[#0E2F52] leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

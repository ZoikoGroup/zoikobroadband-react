"use client";

import React from "react";

interface HowItWorksStepCard {
  readonly stepNumber: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const HOW_IT_WORKS_STEPS: readonly HowItWorksStepCard[] = [
  {
    stepNumber: "1",
    id: "you-enquire",
    title: "You enquire",
    description: "Tell us what you need. It takes a couple of minutes.",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of a wooden desk with a laptop, glasses, coffee cup and plant",
  },
  {
    stepNumber: "2",
    id: "a-specialist-reviews-it",
    title: "A specialist reviews it",
    description: "We look at your needs and, if needed, your premises.",
    imageSrc: "/Images/onb/10.png",
    imageAlt:
      "Specialist advisor wearing a headset smiling at a computer workstation",
  },
  {
    stepNumber: "3",
    id: "options-or-a-quote-if-eligible",
    title: "Options or a quote, if eligible",
    description: "Personalised options, then a quote if your premises qualify.",
    imageSrc: "/Images/onb/11.png",
    imageAlt:
      "Three colleagues collaborating over a laptop during a service review",
  },
];

export interface SpecialistHowItWorksProps {
  readonly onSelectStep?: (stepId: string) => void;
}

export default function SpecialistHowItWorks({
  onSelectStep,
}: SpecialistHowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="w-full bg-[#FFF8E1] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              04
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              HOW IT WORKS
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Three honest steps.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Nothing is ordered until you choose to go ahead with a confirmed
            offer.
          </p>
        </div>

        {/* 3-Column Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article
              key={step.id}
              onClick={onSelectStep ? () => onSelectStep(step.id) : undefined}
              className={`bg-white rounded-[18px] border border-[#F3E5B5] overflow-hidden shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col ${
                onSelectStep
                  ? "cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
                  : ""
              }`}
            >
              {/* Top Photo with Step Number Badge */}
              <div className="relative w-full h-[155px] sm:h-[190px] bg-[#1E293B] overflow-hidden">
                <img
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  className="w-full h-full object-cover object-[50%_20%]"
                />

                <span className="absolute top-3.5 left-3.5 w-6 h-6 rounded-[6px] bg-[#FFC119] text-[#0B2241] text-[11.5px] font-extrabold inline-flex items-center justify-center shadow-xs">
                  {step.stepNumber}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-[#0B2241] text-[16px] font-extrabold leading-[1.3] mb-1.5">
                  {step.title}
                </h3>

                <p className="text-[#64748B] text-[12px] leading-[1.55]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

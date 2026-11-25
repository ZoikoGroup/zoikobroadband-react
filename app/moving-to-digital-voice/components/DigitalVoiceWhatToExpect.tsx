import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

const JOURNEY_STEPS = [
  {
    number: "1",
    title: "Prepare",
    description:
      "Check readiness, number, equipment and any dependencies. Keep your current service.",
  },
  {
    number: "2",
    title: "Change",
    description:
      "The move happens on the confirmed date. Follow the guide for your equipment.",
  },
  {
    number: "3",
    title: "Verify",
    description:
      "Check a dial tone and make an ordinary (non-999) call. If something's wrong, get help.",
  },
] as const;

export default function DigitalVoiceWhatToExpect() {
  return (
    <section
      id="what-to-expect"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              WHAT TO EXPECT
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            From preparation to a working phone
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A simple view of the journey. A date is only set once your move is
            confirmed.
          </p>
        </div>

        {/* 3-Step Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {JOURNEY_STEPS.map((step, index) => {
            const isLast = index === JOURNEY_STEPS.length - 1;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                {/* Number Circle + Connecting Horizontal Line */}
                <div className="w-full flex items-center justify-center mb-5">
                  <div
                    className={`hidden md:block h-[1px] flex-1 transition-colors ${
                      index === 0 ? "bg-transparent" : "bg-slate-200"
                    }`}
                  />

                  <div className="w-11 h-11 rounded-full bg-[#0A3A66] text-white font-extrabold text-sm flex items-center justify-center ring-4 ring-[#FEF3C7]/80 shrink-0 mx-3">
                    {step.number}
                  </div>

                  <div
                    className={`hidden md:block h-[1px] flex-1 transition-colors ${
                      isLast ? "bg-transparent" : "bg-slate-200"
                    }`}
                  />
                </div>

                {/* Step Title & Description */}
                <h3 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#F4F9FF] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
                If something&apos;s delayed or not working
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Don&apos;t cancel your existing service on an unconfirmed
                result. Use{" "}
                <Link
                  href="/help-and-troubleshooting"
                  className="text-[#0A3A66] font-medium hover:underline transition-colors"
                >
                  Help &amp; Troubleshooting
                </Link>{" "}
                for safe checks, and contact support if it&apos;s unclear — a
                self-reported &ldquo;it works now&rdquo; doesn&apos;t close a
                case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

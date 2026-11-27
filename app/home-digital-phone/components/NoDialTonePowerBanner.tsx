import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";

export default function NoDialTonePowerBanner() {
  return (
    <section
      id="no-dial-tone-banner"
      aria-label="No dial tone or power problem guidance"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#F4F9FF] border border-gray-200/90 rounded-2xl px-6 py-5 sm:px-7 sm:py-6 flex items-start gap-4 sm:gap-5 shadow-2xs">
          {/* Wrench Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
            <Wrench className="w-4.5 h-4.5 stroke-[2]" />
          </div>

          {/* Guidance Copy */}
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0E2F52] tracking-tight leading-snug">
              No dial tone or a power problem?
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              For an emergency, call 999 from a working phone &mdash; never to
              test. For a non-urgent fault, use{" "}
              <Link
                href="/help-and-troubleshooting"
                className="font-semibold text-[#0A3A66] underline underline-offset-2 hover:text-[#0E2F52] transition-colors"
              >
                Help &amp; Troubleshooting
              </Link>{" "}
              for safe checks, and see{" "}
              <Link
                href="/emergency-calling-guide"
                className="font-semibold text-[#0A3A66] underline underline-offset-2 hover:text-[#0E2F52] transition-colors"
              >
                Emergency Calling Guidance
              </Link>{" "}
              for power-cut and 999 advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

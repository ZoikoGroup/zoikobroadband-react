import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";

export default function DigitalVoiceTroubleshootingBanner() {
  return (
    <section
      id="troubleshooting"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#F4F9FF] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-2xs">
          {/* Wrench Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
            <Wrench className="w-4 h-4 stroke-[2]" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
              Something not working?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              If you&apos;ve lost dial tone, have no internet, or think a cable
              is in the wrong port, use the step-by-step guide — it screens for
              safety first.{" "}
              <Link
                href="/help-and-troubleshooting"
                className="text-[#0A3A66] font-semibold underline decoration-[#0A3A66]/40 hover:decoration-[#0A3A66] transition-colors"
              >
                Go to Help &amp; Troubleshooting
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { PhoneCall, Router } from "lucide-react";

export default function TraditionalVsDigitalCalling() {
  return (
    <section
      id="the-basics"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              THE BASICS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Traditional vs digital calling
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Most of calling feels the same. The change is what the call travels
            over — and what it depends on.
          </p>
        </div>

        {/* Stacked Comparison Cards */}
        <div className="space-y-4">
          {/* Card 1: Traditional line (old) */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
              <PhoneCall className="w-4 h-4 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
                Traditional line (old)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Calls travel over a dedicated analogue phone line. These
                services (PSTN) are being retired across the UK.
              </p>
            </div>
          </div>

          {/* Card 2: Digital voice (new) */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
              <Router className="w-4 h-4 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
                Digital voice (new)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Calls travel over your broadband, usually through your router.
                It needs power and broadband — so a backup matters for
                emergencies.{" "}
                <Link
                  href="/digital-voice"
                  className="text-[#0A3A66] font-medium hover:underline transition-colors"
                >
                  How digital voice works
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

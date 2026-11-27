import React from "react";
import { AlertTriangle } from "lucide-react";

export default function VoiceAvailabilityAndEmergencyCallsBanner() {
  return (
    <section
      id="voice-continuity"
      aria-label="Voice availability and emergency calls guidance"
      className="w-full bg-[#FFFFFF] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#F4F9FF] border border-gray-200/90 rounded-2xl px-6 py-5 sm:px-7 sm:py-6 flex items-start gap-4 sm:gap-5 shadow-2xs">
          {/* Alert Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4.5 h-4.5 stroke-[2]" />
          </div>

          {/* Continuity & Emergency Disclosure Copy */}
          <div className="space-y-1.5">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0E2F52] tracking-tight leading-snug">
              Voice availability and emergency calls
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Digital business voice usually needs working broadband and power,
              so it may not work during a power cut or broadband outage. Plan a
              backup for emergency (999) calls, and tell us before you switch if
              anyone relies on a phone line, care alarm or telecare device so we
              can talk through continuity. We won&apos;t promise uninterrupted
              service or an unverified fallback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

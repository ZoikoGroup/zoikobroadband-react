import React from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function PartFibrePhoneVoice() {
  return (
    <section
      id="phone-voice"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Notice Card */}
        <div className="relative bg-[#FFFBEB]/60 border border-[#F0B429] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 stroke-[1.75]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg text-[#0E2F52] mb-2">
                About phone calling on SOGEA
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                SOGEA provides broadband access; traditional telephone calling
                isn&apos;t included as a standard analogue-line service. If you
                need a home phone, a digital voice option may be available
                separately — keeping your number depends on eligibility and
                isn&apos;t guaranteed. If you rely on a phone line, care alarm
                or telecare device, check continuity and power-cut options
                before you switch.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/digital-lines"
                  className="inline-flex items-center justify-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors group"
                >
                  <span>Explore Digital Lines</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/support"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#0E2F52] border border-gray-200 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
                >
                  Talk to support about phone needs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

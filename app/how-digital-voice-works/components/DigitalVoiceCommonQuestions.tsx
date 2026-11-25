import React from "react";
import Link from "next/link";
import { Phone, AlignLeft, Wifi } from "lucide-react";

export default function DigitalVoiceCommonQuestions() {
  return (
    <section
      id="common-questions"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              COMMON QUESTIONS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Handset, number and full fibre
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Three things people ask most. Honest answers, with where to go next.
          </p>
        </div>

        {/* 3-Column Questions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                <Phone className="w-5 h-5 stroke-[2]" />
              </div>

              <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                Can I keep my handset?
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Many standard phones still work, connected to the router or an
                adapter. Some older or specialist phones may not — check before
                assuming.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                <AlignLeft className="w-5 h-5 stroke-[2]" />
              </div>

              <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                Can I keep my number?
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Often, yes — subject to eligibility and a porting check. It
                isn&apos;t automatic. See{" "}
                <Link
                  href="/keep-your-number"
                  className="text-[#0A3A66] font-semibold underline decoration-[#0A3A66]/40 hover:decoration-[#0A3A66] transition-colors"
                >
                  Keep Your Number
                </Link>{" "}
                for how it works.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                <Wifi className="w-5 h-5 stroke-[2]" />
              </div>

              <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                Do I need full fibre?
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Not necessarily — digital voice can work on part fibre (SOGEA)
                too, where available. What you can get depends on your address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Clock, ShieldCheck, AlertTriangle } from "lucide-react";

const GENUINE_CARDS = [
  {
    icon: Clock,
    title: "No need to rush",
    description:
      "Retirement is phased. A genuine move is planned with notice — you don\u2019t have to act on a sudden \u201cdeadline\u201d.",
  },
  {
    icon: ShieldCheck,
    title: "Verify any notice",
    description:
      "Check a notice is really from your provider, using details you already have — not a link or number in the message itself.",
  },
  {
    icon: AlertTriangle,
    title: "Don\u2019t share secrets",
    description:
      "We\u2019ll never ask for passwords or full card details to \u201ckeep your phone working\u201d. If a message pressures you, stop and check.",
  },
] as const;

export default function TimingNoticesAndScams() {
  return (
    <section
      id="is-it-genuine"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              IS IT GENUINE?
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Timing, notices and avoiding scams
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The switch-off is happening in phases, so there&apos;s usually no
            need to rush. Fake &ldquo;urgent&rdquo; messages are common — always
            verify before acting.
          </p>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GENUINE_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Smartphone, BatteryCharging, Shield } from "lucide-react";

const BACKUP_OPTION_CARDS = [
  {
    icon: Smartphone,
    title: "A charged mobile",
    description:
      "The simplest backup. Keep it charged and check it has signal where you live \u2014 some areas have little or no mobile coverage.",
  },
  {
    icon: BatteryCharging,
    title: "Battery backup",
    description:
      "Some people may be eligible for a backup unit that keeps a phone working for a limited time in a power cut. It\u2019s time-limited and not guaranteed \u2014 eligibility and the exact equipment are confirmed with your provider.",
  },
  {
    icon: Shield,
    title: "Tell us if you rely on your line",
    description:
      "If you depend on your landline for emergencies, let your provider know so they can discuss suitable options. Don\u2019t assume a backup is already installed.",
  },
] as const;

export default function HowToStayReachableBackups() {
  return (
    <section
      id="backups"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              BACKUPS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How to stay reachable
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A backup for emergencies is the single most important thing. Options
            vary — here&apos;s the honest picture.
          </p>
        </div>

        {/* 3-Column Backups Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BACKUP_OPTION_CARDS.map((card) => {
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

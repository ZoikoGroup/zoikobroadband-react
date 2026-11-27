import React from "react";
import { Power, WifiOff } from "lucide-react";

const OUTAGE_SCENARIOS = [
  {
    icon: Power,
    title: "Power cut",
    description:
      "If the mains is off, your router usually is too \u2014 so the phone won\u2019t work. Use a charged mobile for calls, including 999. Any battery backup (if you have one) is limited and isn\u2019t guaranteed.",
  },
  {
    icon: WifiOff,
    title: "Broadband outage",
    description:
      "If the power is on but there\u2019s no internet, calls may still fail. Use a mobile for emergencies, and check the safe steps in Help & Troubleshooting for non-urgent issues.",
  },
] as const;

export default function PowerCutsAndOutagesSection() {
  return (
    <section
      id="when-it-can-fail"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              WHEN IT CAN FAIL
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Power cuts and broadband outages
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A digital phone needs mains power and working broadband. Here&apos;s
            how to tell what&apos;s happening, and what to do.
          </p>
        </div>

        {/* 2-Column Outage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OUTAGE_SCENARIOS.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
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

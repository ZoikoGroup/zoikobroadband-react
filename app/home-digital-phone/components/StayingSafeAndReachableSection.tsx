import React from "react";
import { AlertTriangle, Info } from "lucide-react";

interface SafetyNoticeCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const SAFETY_NOTICE_CARDS: readonly SafetyNoticeCard[] = [
  {
    id: "power-cuts-and-999",
    icon: AlertTriangle,
    title: "Power cuts and 999",
    description:
      "A digital home phone needs power and broadband, so it may not work in a power cut or outage \u2014 including for emergency calls. Keep a backup such as a charged mobile, and check it has signal where you live. If you depend on your landline for emergencies, tell us so we can discuss options \u2014 don\u2019t assume a battery backup is installed, and never call 999 to test.",
  },
  {
    id: "care-alarms-telecare-devices",
    icon: Info,
    title: "Care alarms, telecare and connected devices",
    description:
      "Care alarms, telecare, medical alerts and some security systems can depend on the phone line \u2014 and a dial tone doesn\u2019t prove they still work. Before switching, tell both your landline provider and the device supplier, and arrange a safe check. Don\u2019t disconnect a care device to test or switch.",
  },
] as const;

export default function StayingSafeAndReachableSection() {
  return (
    <section
      id="power-and-emergencies"
      aria-label="Staying safe and reachable before switching to a digital home phone"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              POWER &amp; EMERGENCIES
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Staying safe and reachable
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The most important things to know before you rely on a digital home
            phone.
          </p>
        </div>

        {/* Stacked Warm Amber Safety Advisory Banners */}
        <div className="space-y-4">
          {SAFETY_NOTICE_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-6 py-5 sm:px-7 sm:py-6 flex items-start gap-4 sm:gap-5 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-[#3D2E0E] tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C4618] leading-relaxed">
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

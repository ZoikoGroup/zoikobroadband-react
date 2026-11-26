import React from "react";
import { AlertTriangle, Info, Shield, Smartphone, User } from "lucide-react";

const EMERGENCY_CARDS = [
  {
    icon: Shield,
    title: "Is a backup right for you?",
    description:
      "If anyone at home relies on the phone for emergencies, ask your provider about backup options and whether you're eligible.",
  },
  {
    icon: Smartphone,
    title: "Keep a mobile charged",
    description:
      "A charged mobile is a sensible backup for emergencies — but check it has signal where you live.",
  },
  {
    icon: User,
    title: "Accessibility",
    description:
      "Need information in another format, or help with installation? Ask — accessible support and alternative formats are available.",
  },
] as const;

export default function DigitalVoicePowerAndEmergency() {
  return (
    <section
      id="power-emergency"
      className="w-full bg-[#F8FAFC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Top Full-Width Notice 1: Power cuts and emergency (999 / 112) calls */}
        <div className="bg-[#F4F9FF] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-slate-200/80 text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <AlertTriangle className="w-4 h-4 stroke-[2]" />
          </div>

          <div>
            <h3 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
              Power cuts and emergency (999 / 112) calls
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Digital voice needs power and broadband, so it may not work during
              a power cut or outage — and that includes calls to 999. Keep a
              backup such as a charged mobile, and remember a mobile may not
              have signal everywhere. Never call 999 or 112 to test your line.
              If you rely on your landline for emergencies, tell your provider
              so they can discuss safety options — don&apos;t assume a battery
              backup is installed.
            </p>
          </div>
        </div>

        {/* Top Full-Width Notice 2: Telecare, alarms and other connected devices */}
        <div className="bg-[#F4F9FF] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-slate-200/80 text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <Info className="w-4 h-4 stroke-[2]" />
          </div>

          <div>
            <h3 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
              Telecare, alarms and other connected devices
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Care alarms, telecare, medical alerts, lifts and some security
              systems can depend on the old phone line. Before switching, tell{" "}
              <strong className="font-bold text-[#0E2F52]">both</strong> your
              landline provider{" "}
              <strong className="font-bold text-[#0E2F52]">and</strong> the
              device supplier or monitoring company, and confirm a safe
              approach. Don&apos;t disconnect a care device to test or switch.
            </p>
          </div>
        </div>

        {/* Bottom 3-Column White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          {EMERGENCY_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs"
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

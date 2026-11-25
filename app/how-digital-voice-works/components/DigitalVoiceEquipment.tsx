import React from "react";
import { PhoneCall, Router, Smartphone, AlertTriangle } from "lucide-react";

const CONNECTION_OPTIONS = [
  {
    icon: PhoneCall,
    title: "Handset via the router",
    description:
      "Many existing phones plug into the router (or an adapter) and work much as before.",
  },
  {
    icon: Router,
    title: "Adapter (ATA)",
    description:
      "A small adapter can connect a standard phone to a digital service, where offered.",
  },
  {
    icon: Smartphone,
    title: "App on a device",
    description:
      "Some services let you make and take calls from a computer or a mobile app, where supported.",
  },
] as const;

export default function DigitalVoiceEquipment() {
  return (
    <section
      id="equipment"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              EQUIPMENT
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How your phone connects
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            There&apos;s usually more than one way to use digital voice. Which
            applies depends on your service and equipment.
          </p>
        </div>

        {/* 3-Column Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {CONNECTION_OPTIONS.map((option) => {
            const IconComponent = option.icon;

            return (
              <div
                key={option.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {option.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Amber Warning Callout */}
        <div className="bg-[#FFFDF5] border border-[#F59E0B]/40 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0E2F52] mb-1">
              Don&apos;t plug into the old wall socket
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              With digital voice, your phone connects to the router or adapter —
              not the old telephone wall socket or a test socket. Use the guide
              supplied for your equipment, and don&apos;t rewire anything.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { MapPin, Calendar } from "lucide-react";

const LOCATION_CARDS = [
  {
    icon: MapPin,
    title: "Always state where you are",
    description:
      "In any emergency call, say your actual location clearly — don\u2019t rely on an address being known automatically. This matters most if you\u2019re away from home or moving around.",
  },
  {
    icon: Calendar,
    title: "Keep your registered address current",
    description:
      "If you move, update the address held for your line through your provider, so the details on record stay accurate. We handle any address change through the proper, verified process.",
  },
] as const;

export default function EmergencyLocationSection() {
  return (
    <section
      id="your-location"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              YOUR LOCATION
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Where the emergency services think you are
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            On a digital phone you can call from anywhere with internet, so the
            address held for your line may not be where you actually are.
          </p>
        </div>

        {/* 2-Column Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATION_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs"
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

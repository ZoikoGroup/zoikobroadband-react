import React from "react";
import { Smartphone, Monitor, Wifi, Shield } from "lucide-react";

interface CompatibilityCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const COMPATIBILITY_CARDS: readonly CompatibilityCard[] = [
  {
    id: "phones-and-handsets",
    icon: Smartphone,
    title: "Phones & handsets",
    description:
      "Some capabilities need a compatible handset or the right firmware.",
  },
  {
    id: "apps-and-softphone",
    icon: Monitor,
    title: "Apps & softphone",
    description:
      "Softphone and mobile features depend on the OS, device and sign-in.",
  },
  {
    id: "network",
    icon: Wifi,
    title: "Network",
    description:
      "Voice quality and some features depend on your broadband and local network.",
  },
  {
    id: "headsets-and-accessories",
    icon: Shield,
    title: "Headsets & accessories",
    description:
      "Accessory support varies \u2014 we\u2019ll flag anything specific your setup needs.",
  },
] as const;

export default function DevicesAndServiceCompatibilitySection() {
  return (
    <section
      id="compatibility"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              COMPATIBILITY
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Devices and service compatibility
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Features can depend on your phones, apps, network and the service
            you&apos;re on. We check compatibility before setting anything up.
          </p>
        </div>

        {/* 4-Column Compatibility Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPATIBILITY_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-2xs"
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

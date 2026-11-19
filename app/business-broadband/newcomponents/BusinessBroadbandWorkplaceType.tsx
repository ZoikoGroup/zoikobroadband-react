"use client";

import React, { useState } from "react";
import { User, Building2, Store, Building } from "lucide-react";

interface WorkplaceOption {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const WORKPLACE_OPTIONS: WorkplaceOption[] = [
  {
    id: "sole-trader",
    icon: User,
    title: "Sole trader",
    description:
      "Working from home or on the move, where reliable everyday connectivity matters most.",
  },
  {
    id: "small-office",
    icon: Building2,
    title: "Small office",
    description:
      "A team sharing the connection for calls, cloud apps and day-to-day work.",
  },
  {
    id: "retail-hospitality",
    icon: Store,
    title: "Retail & hospitality",
    description:
      "Card payments, bookings and guest Wi-Fi that need to keep running through the day.",
  },
  {
    id: "multi-site",
    icon: Building,
    title: "Multi-site",
    description:
      "Several locations to connect consistently — a tailored quote is often the best route.",
  },
];

export default function BusinessBroadbandWorkplaceType() {
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | null>(
    null,
  );

  return (
    <section
      id="your-business"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              YOUR BUSINESS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What kind of workplace are you connecting?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Pick the closest fit to tailor the guidance. This doesn&apos;t
            change which plans you&apos;re eligible for — your address and final
            checks decide that.
          </p>
        </div>

        {/* 4-Column Selectable Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKPLACE_OPTIONS.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedWorkplace === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setSelectedWorkplace((prev) =>
                    prev === option.id ? null : option.id,
                  )
                }
                aria-pressed={isSelected}
                className={`text-center rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-start transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#FFFBEB]/60 border-[#F59E0B] ring-2 ring-[#F59E0B]/40 shadow-sm"
                    : "bg-white border-[#F0B429]/80 hover:border-[#F59E0B] hover:shadow-xs"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#0E2F52] flex items-center justify-center mb-3 shrink-0">
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                  {option.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

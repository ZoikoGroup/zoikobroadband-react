"use client";

import React, { useState } from "react";
import { Home, Building2, BarChart3, HelpCircle } from "lucide-react";

interface LocationOption {
  id: string;
  numberLabel: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const LOCATION_OPTIONS: LocationOption[] = [
  {
    id: "one-site",
    numberLabel: "1",
    icon: Home,
    title: "Just one site",
    description: "A single location — a standard business broadband order.",
  },
  {
    id: "2-5-sites",
    numberLabel: "2+",
    icon: Building2,
    title: "2–5 sites",
    description: "A small estate to plan and connect consistently.",
  },
  {
    id: "6-plus-sites",
    numberLabel: "6+",
    icon: BarChart3,
    title: "6 or more",
    description: "A larger estate — our specialists plan these with you.",
  },
  {
    id: "not-sure",
    numberLabel: "?",
    icon: HelpCircle,
    title: "Not sure yet",
    description: "Still mapping it out — we can help you scope it.",
  },
];

export default function MultiSiteLocations() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <section
      id="how-many-sites"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HOW MANY SITES?
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How many locations do you need to connect?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            This points you to the right path. One site is a standard business
            order; two or more is where multi-site planning helps.
          </p>
        </div>

        {/* 4-Column Selectable Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOCATION_OPTIONS.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setSelectedOption((prev) =>
                    prev === option.id ? null : option.id,
                  )
                }
                aria-pressed={isSelected}
                className={`relative text-left rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer border overflow-hidden ${
                  isSelected
                    ? "bg-[#FFFBEB]/60 border-[#F59E0B] ring-2 ring-[#F59E0B]/40 shadow-sm"
                    : "bg-white border-gray-200/90 hover:border-[#F59E0B] hover:shadow-xs"
                }`}
              >
                {/* Background Large Number Watermark */}
                <span
                  className="absolute right-4 top-2 text-7xl font-extrabold text-gray-100 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {option.numberLabel}
                </span>

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#0E2F52] flex items-center justify-center mb-6 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                    {option.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {option.description}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-[#0E2F52]">
                    Choose
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-[#0A3A66] bg-[#0A3A66]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

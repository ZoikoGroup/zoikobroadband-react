"use client";

import React, { useState } from "react";
import { Check, Printer } from "lucide-react";

const BUSINESS_READINESS_ITEMS = [
  {
    id: "site-backup-999",
    title: "Each site has a backup way to call 999",
    subtitle:
      "Not just the digital phone — a mobile with signal, for every location.",
  },
  {
    id: "line-dependent-equipment",
    title: "Line-dependent equipment is checked",
    subtitle:
      "Lifts, alarms, door entry and card machines confirmed with their suppliers.",
  },
  {
    id: "remote-staff-location",
    title: "Remote staff know their location matters",
    subtitle:
      "They state their actual location on any emergency call, wherever they\u2019re working.",
  },
  {
    id: "emergency-access-owner",
    title: "Someone owns emergency access & continuity",
    subtitle: "A named person checks readiness and knows who to contact.",
  },
] as const;

export default function BusinessReadinessChecklist() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = BUSINESS_READINESS_ITEMS.filter(
    (item) => checkedIds[item.id],
  ).length;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section
      id="business-readiness"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              BUSINESS READINESS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            For business and remote working
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Extra points for sites, remote staff and line-dependent equipment.
            Again, this is a self-check — print it for your team.
          </p>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3.5 mb-6">
          {BUSINESS_READINESS_ITEMS.map((item) => {
            const isChecked = Boolean(checkedIds[item.id]);

            return (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left rounded-2xl px-5 py-4.5 border flex items-start gap-4 transition-all cursor-pointer shadow-2xs ${
                  isChecked
                    ? "bg-white border-[#0A3A66]/55"
                    : "bg-white border-gray-200/90 hover:border-gray-300"
                }`}
              >
                {/* Checkbox Square */}
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </span>

                {/* Text Content */}
                <div>
                  <div className="font-bold text-sm sm:text-[15px] text-[#0E2F52] leading-snug">
                    {item.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Progress & Print Action Row */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            {completedCount} of {BUSINESS_READINESS_ITEMS.length} ready
          </span>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 hover:border-gray-300 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#0E2F52]" />
            <span>Print business checklist</span>
          </button>
        </div>
      </div>
    </section>
  );
}

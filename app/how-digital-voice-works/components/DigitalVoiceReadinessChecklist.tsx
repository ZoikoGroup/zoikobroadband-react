"use client";

import React, { useState } from "react";
import { Check, Printer } from "lucide-react";

const CHECKLIST_ITEMS = [
  {
    id: "power-broadband",
    title: "I know digital voice needs power and broadband",
    description: "It may not work in a power cut or outage.",
  },
  {
    id: "emergency-backup",
    title: "I have a backup for emergency calls",
    description: "A charged mobile — and I've checked it has signal here.",
  },
  {
    id: "care-devices",
    title: "I've checked any care alarm, telecare or connected devices",
    description:
      "Told both the landline provider and the device supplier, if anything relies on the line.",
  },
  {
    id: "handset-number",
    title: "I've checked my handset and my number",
    description:
      "Whether my phone will work, and whether I want to keep my number (a porting check).",
  },
  {
    id: "follow-guide",
    title: "I'll follow the guide for my equipment",
    description:
      "Connect to the router or adapter — not the old wall socket — and test with an ordinary call.",
  },
] as const;

export default function DigitalVoiceReadinessChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section
      id="readiness"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              READINESS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Your readiness checklist
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A quick self-check before you switch to digital voice. Nothing here
            is saved to an account — tick items off or print the list.
          </p>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? "bg-[#F8FAFC] border-[#0A3A66]/40 shadow-2xs"
                    : "bg-white border-gray-200/90 hover:border-gray-300 shadow-2xs"
                }`}
              >
                {/* Custom Checkbox */}
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </span>

                {/* Text Content */}
                <div>
                  <div className="font-extrabold text-sm sm:text-[15px] text-[#0E2F52] leading-snug">
                    {item.title}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Progress & Print Button */}
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {checkedIds.length} of {CHECKLIST_ITEMS.length} ready
          </span>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-300 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 stroke-[2]" />
            <span>Print this checklist</span>
          </button>
        </div>
      </div>
    </section>
  );
}

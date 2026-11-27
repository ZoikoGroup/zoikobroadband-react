"use client";

import React, { useState } from "react";
import { Check, Printer } from "lucide-react";

interface SetupStep {
  stepNumber: string;
  title: string;
  description: string;
}

interface SetupChecklistItem {
  id: string;
  title: string;
  subtitle: string;
}

const SETUP_STEPS: readonly SetupStep[] = [
  {
    stepNumber: "1",
    title: "Check availability",
    description: "Confirm Home Digital Phone can be offered at your address.",
  },
  {
    stepNumber: "2",
    title: "Confirm your order",
    description: "We confirm the plan, price and any number transfer check.",
  },
  {
    stepNumber: "3",
    title: "Connect your phone",
    description:
      "Plug your handset into the router or an adapter \u2014 follow the supplied guide.",
  },
  {
    stepNumber: "4",
    title: "Verify with a call",
    description: "Test with an ordinary (non-999) call once it\u2019s active.",
  },
] as const;

const SETUP_CHECKLIST_ITEMS: readonly SetupChecklistItem[] = [
  {
    id: "backup-emergency-calls",
    title: "I have a backup for emergency calls",
    subtitle: "A charged mobile \u2014 checked it has signal here.",
  },
  {
    id: "checked-care-alarm-devices",
    title: "I\u2019ve checked any care or alarm devices",
    subtitle: "With both the device and landline providers.",
  },
  {
    id: "decided-about-number",
    title: "I\u2019ve decided about my number",
    subtitle: "Keep it (porting check) or take a new one.",
  },
  {
    id: "follow-device-guide",
    title: "I\u2019ll follow my device guide",
    subtitle:
      "Connect to the router or adapter, not the old wall socket \u2014 and won\u2019t rewire.",
  },
] as const;

export default function GettingSetUpSection() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = SETUP_CHECKLIST_ITEMS.filter(
    (item) => checkedIds[item.id],
  ).length;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section
      id="install-and-switch"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              INSTALL &amp; SWITCH
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Getting set up
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Usually a simple self-setup. These are the general steps and a quick
            checklist — nothing is saved to an account.
          </p>
        </div>

        {/* 4-Step Setup Grid (3 across on desktop, wrapping cleanly to step 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {SETUP_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="w-7 h-7 rounded-md bg-[#0A3A66] text-white font-bold text-xs flex items-center justify-center mb-4 shrink-0">
                  {step.stepNumber}
                </div>

                <h3 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Setup Checklist & Print Action */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3.5 mb-6">
            {SETUP_CHECKLIST_ITEMS.map((item) => {
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
              {completedCount} of {SETUP_CHECKLIST_ITEMS.length} ready
            </span>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 hover:border-gray-300 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#0E2F52]" />
              <span>Print this checklist</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

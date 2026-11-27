"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  PhoneOff,
  Check,
} from "lucide-react";

type SafetyChoice = "no-critical" | "yes-or-unsure" | null;

const PREPARATION_CHECKLIST_ITEMS = [
  {
    id: "broadband-working",
    label: "Broadband is active and working where your router sits",
  },
  {
    id: "power-socket",
    label: "Free mains power socket available near your router",
  },
  {
    id: "handset-checked",
    label: "Handset or adapter checked and ready to connect to the router",
  },
  {
    id: "backup-phone",
    label: "Charged mobile or backup phone available for emergencies",
  },
] as const;

export default function PrepareSafetyCheckSection() {
  const [selectedChoice, setSelectedChoice] = useState<SafetyChoice>(null);
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleChecklistItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="prepare"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PREPARE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Get ready, safely
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            First a quick safety check — then your preparation checklist. If
            anything critical relies on the line, we&apos;ll hold the steps and
            route you to help.
          </p>
        </div>

        {/* Main Safety Check Card */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-9 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52] mb-1.5 leading-snug">
              Does anyone rely on this line for care or safety?
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              For example a care alarm, telecare, medical alert, lift line or a
              payment device.
            </p>

            {/* Two-Column Radio Option Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              role="radiogroup"
              aria-label="Does anyone rely on this line for care or safety?"
            >
              {/* Option 1: No — none of these */}
              <button
                type="button"
                role="radio"
                aria-checked={selectedChoice === "no-critical"}
                onClick={() => setSelectedChoice("no-critical")}
                className={`w-full text-left rounded-2xl px-5 py-4 border flex items-center gap-3.5 transition-all cursor-pointer ${
                  selectedChoice === "no-critical"
                    ? "bg-[#F8FAFC] border-[#0A3A66] shadow-2xs"
                    : "bg-white border-gray-200/90 hover:border-gray-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    selectedChoice === "no-critical"
                      ? "border-[#0A3A66]"
                      : "border-slate-300"
                  }`}
                >
                  {selectedChoice === "no-critical" && (
                    <span className="w-2 h-2 rounded-full bg-[#0A3A66]" />
                  )}
                </span>

                <span className="text-xs sm:text-sm font-bold text-[#0E2F52]">
                  No — none of these
                </span>
              </button>

              {/* Option 2: Yes, or I'm not sure */}
              <button
                type="button"
                role="radio"
                aria-checked={selectedChoice === "yes-or-unsure"}
                onClick={() => setSelectedChoice("yes-or-unsure")}
                className={`w-full text-left rounded-2xl px-5 py-4 border flex items-center gap-3.5 transition-all cursor-pointer ${
                  selectedChoice === "yes-or-unsure"
                    ? "bg-[#FDF4F2] border-[#C2410C]/70 shadow-2xs"
                    : "bg-white border-gray-200/90 hover:border-gray-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    selectedChoice === "yes-or-unsure"
                      ? "border-[#C2410C]"
                      : "border-slate-300"
                  }`}
                >
                  {selectedChoice === "yes-or-unsure" && (
                    <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
                  )}
                </span>

                <span className="text-xs sm:text-sm font-bold text-[#0E2F52]">
                  Yes, or I&apos;m not sure
                </span>
              </button>
            </div>
          </div>

          {/* Conditional Route 1: Standard Preparation Checklist */}
          {selectedChoice === "no-critical" && (
            <div className="mt-7 pt-7 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0A3A66] shrink-0" />
                <h4 className="font-extrabold text-sm sm:text-base text-[#0E2F52]">
                  Your preparation checklist
                </h4>
              </div>

              <div className="space-y-2.5">
                {PREPARATION_CHECKLIST_ITEMS.map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`w-full text-left rounded-xl px-4 py-3.5 border flex items-center gap-3 transition-colors cursor-pointer ${
                        isChecked
                          ? "bg-[#F8FAFC] border-[#0A3A66]/50"
                          : "bg-white border-gray-200/90 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                          isChecked
                            ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>

                      <span className="text-xs sm:text-sm font-medium text-[#0E2F52]">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conditional Route 2: Hold Steps & Route to Assisted Review */}
          {selectedChoice === "yes-or-unsure" && (
            <div className="mt-7 pt-7 border-t border-gray-100">
              <div className="bg-[#FDF4F2] border border-[#F3D5CE] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAE6E1] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#0E2F52] mb-1">
                      Setup steps held — get an assisted review first
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Don&apos;t disconnect your existing line or equipment yet.
                      Speak with both your provider and your device supplier so
                      we can arrange a supported setup.
                    </p>
                  </div>
                </div>

                <Link
                  href="#get-help"
                  className="inline-flex items-center justify-center bg-[#0A3A66] hover:bg-[#082D4F] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shrink-0 group"
                >
                  <PhoneOff className="w-4 h-4 mr-2" />
                  <span>Request assisted review</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

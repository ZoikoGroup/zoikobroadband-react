"use client";

import React, { useState } from "react";
import { Check, Printer } from "lucide-react";

const CHECKLIST_ITEMS = [
  {
    id: "new-address",
    title: "Your new address and postcode",
    description:
      "The exact property you're moving to, so availability can be checked.",
  },
  {
    id: "moving-date",
    title: "Your approximate moving date",
    description:
      "A planned date helps you prepare — it isn't a booked installation.",
  },
  {
    id: "account-signin",
    title: "Your account sign-in (if you're a customer)",
    description: "To review your agreement and any supported move options.",
  },
  {
    id: "broadband-phone",
    title: "Your broadband & phone needs",
    description:
      "How your household uses the internet, and any home phone or number to consider.",
  },
  {
    id: "equipment-devices",
    title: "Equipment & essential devices",
    description:
      "Your router, plus any alarm, telecare or assistive device that may need checking.",
  },
] as const;

export default function YourMovingChecklist() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = CHECKLIST_ITEMS.filter(
    (item) => checkedIds[item.id],
  ).length;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section
      id="checklist"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              BEFORE YOU MOVE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Your moving checklist
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Gather these before you check or call — it makes everything quicker.
            Nothing here is saved to an account; you can tick items off or print
            the list.
          </p>
        </div>

        {/* Checklist Container */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 mb-6">
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = Boolean(checkedIds[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-pressed={isChecked}
                  className={`w-full text-left rounded-2xl border p-5 flex items-start gap-4 transition-all cursor-pointer ${
                    isChecked
                      ? "bg-slate-50/80 border-[#0A3A66]/40"
                      : "bg-white border-gray-200/90 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {isChecked && (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm sm:text-base mb-1 transition-colors ${
                        isChecked
                          ? "text-[#0E2F52]/70 line-through"
                          : "text-[#0E2F52]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Progress & Print Row */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              {completedCount} of {CHECKLIST_ITEMS.length} ready
            </span>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-2 stroke-[2]" />
              <span>Print this checklist</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const CHECKLIST_ITEMS = [
  {
    id: "appointment",
    title: "Check your appointment",
    description:
      "Use the date and time shown in your confirmed order. If none is shown, we'll confirm whether a visit is required.",
  },
  {
    id: "access",
    title: "Someone available to give access",
    description:
      "Make sure the person responsible for access can be there during a scheduled visit.",
  },
  {
    id: "location",
    title: "Plan your equipment location",
    description:
      "Think about where your router and any ONT can sit near a suitable power outlet. Final position is subject to engineer advice.",
  },
  {
    id: "clear-access",
    title: "Clear safe access",
    description:
      "Ensure safe access to relevant entry points, sockets and equipment areas.",
  },
  {
    id: "permissions",
    title: "Check permissions if you rent",
    description:
      "If you rent or live in a managed property, check whether permission is needed for any work.",
  },
  {
    id: "alarms",
    title: "Tell us about alarms or care devices",
    description:
      "Let us know if you use a care alarm, medical alert, security alarm or phone service that could be affected.",
  },
  {
    id: "existing-service",
    title: "Keep your existing service until told otherwise",
    description:
      "Keep your current setup available until your confirmed switch or activation guidance says to change.",
  },
] as const;

export default function PreparingForEngineer() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="engineer-visit"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              ENGINEER VISIT
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Preparing for an engineer
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            If your order needs a visit, a little preparation helps it go
            smoothly. Tick these off as you go — nothing here is saved to an
            account.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Checklist */}
          <div className="lg:col-span-8 space-y-3">
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

          {/* Right Column: Support Action Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="rounded-3xl bg-[#0A3A66] p-7 sm:p-8 text-white shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2.5">
                Need to change your appointment?
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6">
                To change a confirmed appointment, use Track Your Order or
                contact support. If more work is needed, we&apos;ll explain the
                next steps through your order updates.
              </p>

              <div className="space-y-3">
                <Link
                  href="/track-order"
                  className="w-full inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3.5 rounded-xl transition-colors group"
                >
                  <span>Track Your Order</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact-support"
                  className="w-full inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/25 font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

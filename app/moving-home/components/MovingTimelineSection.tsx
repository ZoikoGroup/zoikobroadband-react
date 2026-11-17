"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";

const TIMELINE_STEPS = [
  {
    number: "1",
    title: "Verify your address",
    description:
      "Confirm the exact property you're moving to and what's serviceable there.",
  },
  {
    number: "2",
    title: "Review eligible products",
    description: "See the plans and technology available at the new address.",
  },
  {
    number: "3",
    title: "Confirm next steps",
    description:
      "Sort out the move through your account or support, where supported.",
  },
  {
    number: "4",
    title: "Install or activate",
    description:
      "If a visit or activation is needed, it's confirmed through your order.",
  },
] as const;

export default function MovingTimelineSection() {
  const [plannedDate, setPlannedDate] = useState("");

  return (
    <section
      id="timeline"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              TIMELINE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Plan your broadband around your moving date
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A planned date helps you prepare. It&apos;s not a confirmed
            installation — any appointment or activation is confirmed
            separately.
          </p>
        </div>

        {/* 4-Column Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {TIMELINE_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-start shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3A66] text-white font-bold text-sm flex items-center justify-center mb-5 shrink-0">
                {step.number}
              </div>
              <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Planned Moving Date Card */}
        <div className="max-w-lg mx-auto bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_12px_#0000001A]">
          <label
            htmlFor="planned-moving-date"
            className="block text-sm font-bold text-[#0E2F52] mb-2.5"
          >
            Planned moving date (optional)
          </label>

          <input
            id="planned-moving-date"
            type="date"
            value={plannedDate}
            onChange={(e) => setPlannedDate(e.target.value)}
            className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent mb-3"
          />

          <div className="flex items-start gap-2.5 text-gray-500">
            <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              Add a planned date to help you prepare. We won&apos;t treat this
              as a booked appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

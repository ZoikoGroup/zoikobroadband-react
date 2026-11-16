"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

const OPTIONS = [
  {
    title: "Usually just me",
    subtitle: "One connection at a time",
  },
  {
    title: "2 people",
    subtitle: "Occasional overlap",
  },
  {
    title: "3–4 people",
    subtitle: "Regular overlap in the evening",
  },
  {
    title: "5 or more",
    subtitle: "Lots happening at once",
  },
  {
    title: "Not sure",
    subtitle: "We'll keep the guidance broad",
  },
] as const;

export default function SpeedFinder() {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#0f172a] font-sans antialiased overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
            <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase">
              SPEED FINDER
            </span>
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            Answer a few quick questions
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Takes about a minute. There are no wrong answers, you can change
            anything, and you never have to sign in.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Question Card */}
          <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2">
                <span>Step 1 of 5</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#f59e0b] h-full w-1/5 rounded-full"></div>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#0f172a] mb-1">
                How many people usually use the internet at the same time?
              </h2>
              <p className="text-sm text-gray-600">
                Think about simultaneous use, not the number of devices or
                people in the home.
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {OPTIONS.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#0A3A66] bg-[#F5F8FC] ring-1 ring-[#0A3A66]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#0f172a] mb-0.5">
                        {opt.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {opt.subtitle}
                      </div>
                    </div>
                    <div>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#0f172a] fill-[#0f172a] text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Link
                href="#reset"
                className="text-sm font-semibold text-gray-600 hover:text-[#0f172a]"
              >
                Reset
              </Link>
              <button
                type="button"
                className="bg-[#0A3A66] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center space-x-2"
              >
                <span>Continue</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Sidebar Summary Card */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs lg:sticky lg:top-8">
            <h3 className="font-bold text-sm text-[#0f172a] mb-1">
              Your answers
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Nothing is saved to an account. Change any answer at any
              time.
            </p>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs">
                  People at once
                </span>
                <span className="font-medium text-xs text-[#0f172a]">
                  {OPTIONS[selectedOption].title}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs">
                  Activities
                </span>
                <span className="text-xs text-gray-400 italic">
                  Not answered yet
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs">Overlap</span>
                <span className="text-xs text-gray-400 italic">
                  Not answered yet
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs">
                  Uploads & calls
                </span>
                <span className="text-xs text-gray-400 italic">
                  Not answered yet
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-xs">Priority</span>
                <span className="text-xs text-gray-400 italic">
                  Not answered yet
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Guidance is based on your answers only. Packages, speeds and
                prices depend on your exact address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

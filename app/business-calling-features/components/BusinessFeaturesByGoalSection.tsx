"use client";

import React, { useState } from "react";
import {
  AlignJustify,
  Headphones,
  CornerDownRight,
  Clock,
  Shield,
  BarChart2,
} from "lucide-react";

export type FeatureGoalId =
  | "all"
  | "answer-greet"
  | "route"
  | "out-of-hours"
  | "privacy-control"
  | "insights-records";

interface GoalOption {
  id: FeatureGoalId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const GOAL_OPTIONS: readonly GoalOption[] = [
  {
    id: "all",
    label: "All features",
    icon: AlignJustify,
  },
  {
    id: "answer-greet",
    label: "Answer & greet callers",
    icon: Headphones,
  },
  {
    id: "route",
    label: "Route to the right place",
    icon: CornerDownRight,
  },
  {
    id: "out-of-hours",
    label: "Out-of-hours cover",
    icon: Clock,
  },
  {
    id: "privacy-control",
    label: "Privacy & control",
    icon: Shield,
  },
  {
    id: "insights-records",
    label: "Insights & records",
    icon: BarChart2,
  },
] as const;

interface BusinessFeaturesByGoalSectionProps {
  selectedGoal?: FeatureGoalId;
  onSelectGoal?: (goal: FeatureGoalId) => void;
}

export default function BusinessFeaturesByGoalSection({
  selectedGoal,
  onSelectGoal,
}: BusinessFeaturesByGoalSectionProps) {
  const [internalGoal, setInternalGoal] = useState<FeatureGoalId>("all");
  const activeGoal = selectedGoal ?? internalGoal;

  const handleSelect = (goal: FeatureGoalId) => {
    setInternalGoal(goal);
    onSelectGoal?.(goal);
  };

  return (
    <section
      id="by-goal"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              BY GOAL
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What do you want calls to do?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Pick a goal to narrow the catalogue. This maps to approved
            categories &mdash; it doesn&apos;t recommend a specific feature or
            imply it&apos;s available to you.
          </p>
        </div>

        {/* 6-Card Goal Filter Grid */}
        <div
          role="radiogroup"
          aria-label="Filter business calling features by goal"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {GOAL_OPTIONS.map((goal) => {
            const IconComponent = goal.icon;
            const isSelected = activeGoal === goal.id;

            return (
              <button
                key={goal.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(goal.id)}
                className={`rounded-2xl px-4 py-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#F0F5FA] border-[1.5px] border-[#0A3A66] shadow-2xs"
                    : "bg-white border border-gray-200/90 hover:border-gray-300 shadow-2xs"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 transition-colors ${
                    isSelected
                      ? "bg-[#0A3A66] text-white"
                      : "bg-[#EFF6FF] text-[#0E2F52]"
                  }`}
                >
                  <IconComponent className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                <span className="text-xs sm:text-[13px] font-bold text-[#0E2F52] leading-snug">
                  {goal.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

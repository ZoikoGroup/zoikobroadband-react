"use client";
import { Selections } from "../sections/Wizard";
import { useState } from "react";

interface Props {
  selections: Selections;
  update: (key: keyof Selections, value: string | string[] | null) => void;
}

const DURATIONS = ["60 Months", "36 Months", "24 Months", "12 Months"];

const PLANS = [
  {
    id: "essential",
    name: "Essential Line",
    popular: false,
    prices: {
      60: 10.91,
      36: 12.0,
      24: 13.09,
      12: 14.18,
    },
    features: [
      "Unlimited UK landline calls",
      "Voicemail",
      "Caller ID",
      "Call waiting",
      "Call forwarding",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited Talk Line",
    popular: true,
    prices: {
      60: 18.95,
      36: 20.85,
      24: 22.74,
      12: 24.64,
    },
    features: [
      "Unlimited landline + mobile calls",
      "Voicemail-to-email",
      "Caller ID & call waiting",
      "Call forwarding & blocking",
      "Three-way calling",
    ],
  },
  {
    id: "business",
    name: "Business Pro Line",
    popular: false,
    prices: {
      60: 29.99,
      36: 32.99,
      24: 35.99,
      12: 38.99,
    },
    features: [
      "Multi-line capable",
      "Call recording",
      "Call queues & IVR",
      "UK 24/7 support",
      "Advanced analytics",
    ],
  },
];
export default function ChoosePlan({ selections, update }: Props) {

  // const durationMonths = parseInt(
  //   (selections.duration ?? "60 Months").split(" ")[0],
  //   10
  // ) as 60 | 36 | 24 | 12;
  //Fix — define a lookup map instead
const durationMap: Record<string, 60 | 36 | 24 | 12> = {
  "60 Months": 60,
  "36 Months": 36,
  "24 Months": 24,
  "12 Months": 12,
};

const durationMonths = durationMap[selections.duration ?? "60 Months"] ?? 60;

 console.log("duration state:", selections.duration, "→ months:", durationMonths);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Choose Your Plan
      </h2>

      {/* ── Duration Tabs ──────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => update("duration", d)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${selections.duration === d
              ? "bg-[#F6C140] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* ── Plan Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative dark:bg-gray-800 border-2 rounded-xl px-6 py-8 flex flex-col transition ${selections.plan === plan.id
              ? "border-green-500 shadow-lg"
              : plan.popular
                ? "border-[#F6C140]"
                : "border-gray-200 hover:border-gray-300"
              }`}
          >
            {/* Most Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-5 left-3/5 -translate-x-1/2">
                <span className="bg-[#F6C140] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Name */}
            <h3 className="text-lg md:text-2xl font-bold text-[#10446C] dark:text-white mb-1">{plan.name}</h3>

            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                £{plan.prices[durationMonths].toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 dark:text-white ml-1">/month</span>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2 mb-6 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm md:text-base text-gray-600 dark:text-white">
                  <svg
                    className="w-4 h-4 text-[#F6C140] mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Select Button */}
            <button
              onClick={() => update("plan", plan.id)}
              className="w-full py-2 rounded-md text-sm font-semibold bg-[#F6C140] text-white hover:bg-[#e0ad30] transition"
            >
              {selections.plan === plan.id ? "Selected ✓" : "Select Plan"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
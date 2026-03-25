"use client";

import { useState } from "react";
import ChoosePlan from "../steps/ChoosePlan";
import NumbersAndPorting from "../steps/NumbersAndPorting";
import Equipment from "../steps/Equipment";
import AddOns from "../steps/AddOns";
import ChargeChanges from "../steps/ChargeChanges";
import Checkout from "../steps/Checkout";

// ── Step Labels ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Choose Plan" },
  { id: 2, label: "Numbers & Porting" },
  { id: 3, label: "Equipment" },
  { id: 4, label: "Add-ons" },
  { id: 5, label: "Charge Changes" },
  { id: 6, label: "Checkout" },
];

// -- Shared Selections Type --
export interface Selections {
  plan: string | null;
  duration: string;
  numberOption: string | null;
  numberSubAllocation: string | null;
  numberImport: string | null;
  equipment: string[];
  addons: string[];
  chargeChanges: string[];
}

export default function Wizard() {
  const [step, setStep] = useState(1);

  const [selections, setSelections] = useState<Selections>({
    plan: null,
    duration: "60 Months",
    numberOption: null,
    numberSubAllocation: null,
    numberImport: null,
    equipment: [],
    addons: [],
    chargeChanges: [],
  });

  const update = (key: keyof Selections, value: string | string[] | null) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      {/*  Progress Bar  */}
      <div className="w-full max-w-4xl mx-auto mb-12 px-4">
        {/* Stepper Row */}
        <div className="flex items-center justify-between">
          {STEPS.map((s, index) => (
            <div key={s.id} className="flex items-center w-full">
              {/* Circle + Label Wrapper */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2
            ${
              s.id <= step
                ? "bg-[#F6C140] border-[#F6C140] text-white"
                : "bg-gray-200 border-gray-300 text-gray-500"
            }`}
                >
                  {s.id < step ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>

                {/* Label */}
                <span
                  className={`hidden md:block mt-3 text-xs text-center w-20
            ${
              s.id === step ? "text-[#F6C140] font-semibold" : "text-gray-500"
            }`}
                >
                  {s.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2
            ${s.id < step ? "bg-[#F6C140]" : "bg-gray-300"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Label */}
        <div className="md:hidden mt-4 text-center">
          <span className="text-sm text-[#F6C140] font-semibold">
            Step {step} of {STEPS.length}: {STEPS[step - 1].label}
          </span>
        </div>
      </div>

      {/* ── Step Content ──────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto">

        {step === 1 && (
          <ChoosePlan
            selections={selections}
            update={update}
          />
        )}
        {step === 2 && (
          <NumbersAndPorting
            selections={selections}
            update={update}
          />
        )}
        {step === 3 && (
          <Equipment
            selections={selections}
            update={update}
          />
        )}
        {step === 4 && (
          <AddOns
            selections={selections}
            update={update}
          />
        )}
        {step === 5 && (
          <ChargeChanges
            selections={selections}
            update={update}
          />
        )}
        {step === 6 && (
          <Checkout
            selections={selections}
          />
        )}

      </div>

      {/* ── Back / Continue Buttons ───────────────────────────────── */}
      <div className="max-w-4xl mx-auto mt-8 flex gap-3">
        {step > 1 && (
          <button
            onClick={goBack}
            className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Back
          </button>
        )}
        <button
          onClick={goNext}
          className="bg-[#F6C140] text-white px-8 py-2 rounded-md text-sm font-semibold hover:bg-[#e0ad30] transition"
        >
          {step === STEPS.length
            ? "Finish"
            : step === 4
              ? "Proceed to Checkout"
              : "Continue"}
        </button>
      </div>
    </div>
  );
}

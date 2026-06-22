"use client";

import { useState } from "react";
import ChoosePlan from "../steps/ChoosePlan";
import NumbersAndPorting from "../steps/NumbersAndPorting";
import Equipment from "../steps/Equipment";
import AddOns from "../steps/AddOns";
import ChargeChanges from "../steps/ChargeChanges";
import Checkout from "../steps/Checkout";
import toast from "react-hot-toast";

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
  plan_summary?: object;
  equipment_summary?: object[];
  addons_summary?: object[];
  charge_changes_summary?: object[];
  monthly_total?: number;
  one_off_total?: number;
  total_due_today?: number;
}

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selections, setSelections] = useState<Selections>({
    plan: null,
    duration: "60 Months",
    numberOption: null,
    numberSubAllocation: null,
    numberImport: null,
    equipment: [],
    addons: [],
    chargeChanges: [],
    plan_summary: [],
    equipment_summary: [],
    addons_summary: [],
    charge_changes_summary: [],
    monthly_total: 0,
    one_off_total: 0,
    total_due_today: 0,
  });


  const handleSubmit = async () => {
    const payload = {
      plan: selections.plan,
      duration: selections.duration,

      number_option: selections.numberOption,
      number_sub_allocation: selections.numberSubAllocation,
      number_import: selections.numberImport,

      equipment: selections.equipment,
      addons: selections.addons,
      charge_changes: selections.chargeChanges,
      plan_summary: selections.plan_summary,
      equipment_summary: selections.equipment_summary,
      addons_summary: selections.addons_summary,
      charge_changes_summary: selections.charge_changes_summary,
      monthly_total: Number(selections.monthly_total?.toFixed(2) ?? 0),
      one_off_total: Number(selections.one_off_total?.toFixed(2) ?? 0),
      total_due_today: Number(selections.total_due_today?.toFixed(2) ?? 0),
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/digital-lines/digital-line-order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || "Failed to submit order");
      // }
      const data = await response.json();

      console.log("Response:", data);

      if (!response.ok) {
        console.error("Backend Error:", data);
        throw new Error(JSON.stringify(data));
      }

      toast.success("Order submitted successfully!");
      setSelections({
        plan: null,
        duration: "60 Months",
        numberOption: null,
        numberSubAllocation: null,
        numberImport: null,
        equipment: [],
        addons: [],
        chargeChanges: [],
        plan_summary: [],
        equipment_summary: [],
        addons_summary: [],
        charge_changes_summary: [],
        monthly_total: 0,
        one_off_total: 0,
        total_due_today: 0,
      });

      setStep(1);

      console.log(data);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const update = (key: keyof Selections, value: string | string[] | null) => {
  //   setSelections((prev) => ({ ...prev, [key]: value }));
  // };
  const update = (
    key: keyof Selections,
    value: string | string[] | number | object | object[] | null
  ) => {
    setSelections((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300 px-4 py-8">

      {/* ── Progress Bar ───────────────────────────── */}
      <div className="w-full max-w-4xl mx-auto mb-12 px-4">
        <div className="flex items-center justify-between">

          {STEPS.map((s, index) => (
            <div key={s.id} className="flex items-center w-full">

              {/* Step */}
              <div className="flex flex-col items-center">

                {/* Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                  ${s.id <= step
                      ? "bg-[#F6C140] border-[#F6C140] text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300"
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
                  ${s.id === step
                      ? "text-[#F6C140] font-semibold"
                      : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                  {s.label}
                </span>
              </div>

              {/* Connector */}
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors duration-300
                  ${s.id < step
                      ? "bg-[#F6C140]"
                      : "bg-gray-300 dark:bg-gray-600"
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Label */}
        <div className="md:hidden mt-4 text-center">
          <span className="text-sm font-semibold text-[#F6C140] dark:text-yellow-400">
            Step {step} of {STEPS.length}: {STEPS[step - 1].label}
          </span>
        </div>
      </div>

      {/* ── Step Content ───────────────────────────── */}
      <div className="max-w-4xl mx-auto">

        {step === 1 && <ChoosePlan selections={selections} update={update} />}
        {step === 2 && <NumbersAndPorting selections={selections} update={update} />}
        {step === 3 && <Equipment selections={selections} update={update} />}
        {step === 4 && <AddOns selections={selections} update={update} />}
        {step === 5 && <ChargeChanges selections={selections} update={update} />}
        {step === 6 && <Checkout selections={selections} update={update} />}

      </div>

      {/* ── Navigation Buttons ─────────────────────── */}
      <div className="max-w-4xl mx-auto mt-8 flex gap-3">

        {step > 1 && (
          <button
            onClick={goBack}
            className="border border-gray-300 dark:border-gray-600 px-6 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-black transition"
          >
            Back
          </button>
        )}

        <button
          onClick={step === STEPS.length ? handleSubmit : goNext}
          className="bg-[#F6C140] text-gray-900 dark:text-black px-8 py-2 rounded-md text-sm font-semibold hover:bg-[#e0ad30] transition"
        >
          {step === STEPS.length
            ? loading
              ? "Submitting..."
              : "Confirm Order"
            : step === 5
              ? "Proceed to Checkout"
              : "Continue"}
        </button>

      </div>
    </div>
  );
}

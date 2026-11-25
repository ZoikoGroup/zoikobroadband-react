"use client";

import React, { useState } from "react";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

type AnswerKey =
  | "currentLine"
  | "lifeCritical"
  | "broadbandPower"
  | "handsetCheck"
  | "numberPorting"
  | "moveType";

interface QuestionOption {
  id: string;
  label: string;
  hint?: string;
}

interface WizardStep {
  key: AnswerKey;
  question: string;
  helper: string;
  options: readonly QuestionOption[];
}

const WIZARD_STEPS: readonly WizardStep[] = [
  {
    key: "currentLine",
    question: "What do you have today?",
    helper: 'Pick the closest. "Not sure" is fine.',
    options: [
      { id: "analogue", label: "A traditional analogue line" },
      { id: "digital", label: "Already digital / VoIP" },
      { id: "not-sure", label: "Not sure" },
    ],
  },
  {
    key: "lifeCritical",
    question:
      "Do you rely on the line for care alarms, telecare or emergencies?",
    helper:
      "If yes, get an assisted review and speak with your device supplier before switching.",
    options: [
      {
        id: "yes",
        label:
          "Yes — care alarm, telecare, medical alert or emergency reliance",
      },
      { id: "no", label: "No — standard home or office calling only" },
      { id: "unsure", label: "Not sure — need to check connected devices" },
    ],
  },
  {
    key: "broadbandPower",
    question:
      "Do you have working broadband and a backup option during power cuts?",
    helper:
      "Digital voice needs power and broadband, and may not work in an outage.",
    options: [
      {
        id: "ready",
        label: "Yes — broadband works and I have a charged mobile or backup",
      },
      {
        id: "partial",
        label: "Broadband works, but I still need a reliable backup plan",
      },
      { id: "no-broadband", label: "No active broadband yet or unsure" },
    ],
  },
  {
    key: "handsetCheck",
    question: "Have you checked how your phone or handset will connect?",
    helper:
      "Most handsets connect via the router or an adapter — not the old wall socket.",
    options: [
      { id: "checked", label: "Yes — I know how my handset or app connects" },
      {
        id: "need-check",
        label: "Not yet — I need to check my handset or specialist phone",
      },
    ],
  },
  {
    key: "numberPorting",
    question: "Do you want to keep your existing phone number?",
    helper:
      "Keeping your number usually requires a porting check before cancelling anything.",
    options: [
      { id: "keep-number", label: "Yes — I want to keep my current number" },
      { id: "new-number", label: "No — a new number or no landline needed" },
      { id: "check-later", label: "Not sure yet" },
    ],
  },
  {
    key: "moveType",
    question: "Which describes your move best?",
    helper: "This helps you follow the right steps without rushing.",
    options: [
      { id: "migrating", label: "My current provider is migrating my line" },
      { id: "switching", label: "I am switching to a new provider" },
      { id: "exploring", label: "Just preparing and exploring options" },
    ],
  },
] as const;

export default function DigitalVoiceReadinessCheckWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<Record<AnswerKey, string>>>(
    {},
  );
  const [completed, setCompleted] = useState<boolean>(false);

  const totalSteps = WIZARD_STEPS.length;
  const currentStep = WIZARD_STEPS[currentStepIndex];
  const selectedOptionId = answers[currentStep.key] ?? null;

  const progressPercent = completed
    ? 100
    : Math.round(
        ((currentStepIndex + (selectedOptionId ? 0.5 : 0.15)) / totalSteps) *
          100,
      );

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep.key]: optionId,
    }));
  };

  const handleContinue = () => {
    if (!selectedOptionId) return;

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setCompleted(false);
  };

  return (
    <section
      id="readiness-check"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              READINESS CHECK
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Are you ready to move?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A short, no-obligation self-check. It doesn&apos;t place an order,
            ask for an account, or share anything — it just shows what&apos;s
            ready and what to sort out. You can go back and change any answer.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl shadow-sm overflow-hidden">
          {/* Top Progress Bar Row */}
          <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center justify-between gap-6">
            <span className="text-xs sm:text-sm font-bold text-[#0E2F52] shrink-0">
              {completed
                ? `Completed ${totalSteps} of ${totalSteps}`
                : `Step ${currentStepIndex + 1} of ${totalSteps}`}
            </span>

            <div
              className="w-40 sm:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={totalSteps}
              aria-valuenow={completed ? totalSteps : currentStepIndex + 1}
            >
              <div
                className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card Body */}
          {!completed ? (
            <div className="px-6 sm:px-8 pt-7 pb-6">
              {/* Highlighted Question Bar */}
              <div className="border border-[#F59E0B]/70 rounded-xl px-4 py-2.5 bg-white mb-2">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0E2F52] leading-snug">
                  {currentStep.question}
                </h3>
              </div>

              {/* Helper Caption */}
              <p className="text-xs text-gray-500 mb-6 px-0.5">
                {currentStep.helper}
              </p>

              {/* Radio Options List */}
              <div
                className="space-y-3"
                role="radiogroup"
                aria-label={currentStep.question}
              >
                {currentStep.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left rounded-xl px-5 py-4 border transition-all flex items-center gap-3.5 cursor-pointer ${
                        isSelected
                          ? "bg-[#F8FAFC] border-[#0A3A66] shadow-2xs"
                          : "bg-white border-gray-200/90 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-[#0A3A66] border-[4.5px]"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-medium text-[#0E2F52]">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="px-6 sm:px-8 py-8 space-y-5">
              <div className="flex items-start gap-3.5 bg-[#F8FAFC] border border-gray-200/80 rounded-xl p-5">
                <CheckCircle2 className="w-5 h-5 text-[#0A3A66] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-1">
                    Your self-check summary is ready
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Nothing was submitted or saved. Review your answers below or
                    step back to adjust any choice before you switch.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 border border-gray-200/80 rounded-xl px-5">
                {WIZARD_STEPS.map((step, idx) => {
                  const chosenId = answers[step.key];
                  const chosenLabel =
                    step.options.find((opt) => opt.id === chosenId)?.label ??
                    "Not answered";

                  return (
                    <div
                      key={step.key}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm"
                    >
                      <div>
                        <span className="font-bold text-[#0E2F52]">
                          {idx + 1}. {step.question}
                        </span>
                        <p className="text-gray-600 mt-0.5">{chosenLabel}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCompleted(false);
                          setCurrentStepIndex(idx);
                        }}
                        className="text-xs font-bold text-[#0A3A66] hover:underline self-start sm:self-center shrink-0 cursor-pointer"
                      >
                        Edit answer
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Card Footer */}
          <div className="px-6 sm:px-8 py-5 border-t border-gray-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleStartOver}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0E2F52] hover:text-[#0A3A66] transition-colors cursor-pointer"
            >
              {completed && <RotateCcw className="w-3.5 h-3.5" />}
              <span>Start over</span>
            </button>

            <div className="flex items-center gap-3">
              {!completed && currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                  className="text-xs sm:text-sm font-bold text-gray-600 hover:text-[#0E2F52] px-4 py-2.5 rounded-xl border border-gray-200 transition-colors cursor-pointer"
                >
                  Back
                </button>
              )}

              {!completed ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selectedOptionId}
                  className={`inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors ${
                    selectedOptionId
                      ? "bg-[#082B4E] hover:bg-[#0B3A68] text-white cursor-pointer shadow-xs"
                      : "bg-[#082B4E]/45 text-white/80 cursor-not-allowed"
                  }`}
                >
                  <span>
                    {currentStepIndex === totalSteps - 1
                      ? "See summary"
                      : "Continue"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="inline-flex items-center justify-center gap-2 bg-[#082B4E] hover:bg-[#0B3A68] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <span>Check again</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

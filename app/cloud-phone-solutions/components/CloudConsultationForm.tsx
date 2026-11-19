"use client";

import React, { useState } from "react";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";

const CONSULTATION_STEPS = [
  { step: 1, id: "goal", label: "Your goal" },
  { step: 2, id: "business", label: "Your business" },
  { step: 3, id: "current-phones", label: "Current phones" },
  { step: 4, id: "calls-devices", label: "Calls & devices" },
  { step: 5, id: "safety", label: "Safety" },
  { step: 6, id: "contact", label: "Contact" },
  { step: 7, id: "review", label: "Review" },
] as const;

const GOAL_OPTIONS = [
  { id: "new-setup", label: "New phone setup" },
  { id: "replace-old-lines", label: "Replace old phone lines" },
  { id: "improve-call-handling", label: "Improve call handling" },
  { id: "multiple-locations", label: "Multiple locations" },
  { id: "not-sure-yet", label: "Not sure yet" },
] as const;

const BUSINESS_SIZES = [
  { id: "1-5", label: "1–5 team members" },
  { id: "6-20", label: "6–20 team members" },
  { id: "21-50", label: "21–50 team members" },
  { id: "50+", label: "50+ team members" },
] as const;

const CURRENT_PHONE_OPTIONS = [
  { id: "landline-pstn", label: "Traditional landline / copper lines" },
  { id: "existing-voip", label: "Existing VoIP or cloud phone" },
  { id: "mobiles-only", label: "Mobile phones only" },
  { id: "no-current-system", label: "Starting fresh / no current system" },
] as const;

const DEVICE_PREFERENCES = [
  { id: "desk-phones", label: "IP desk phones" },
  { id: "computers", label: "Computers (desktop / laptop app)" },
  { id: "mobiles", label: "Mobile app" },
  { id: "auto-attendant", label: "Greeting menu & call routing" },
] as const;

const SAFETY_CHECKS = [
  { id: "broadband-ready", label: "Business broadband available" },
  { id: "power-backup", label: "Power backup or mobile fallback considered" },
  {
    id: "special-lines",
    label: "Alarms, lift lines, card machines or fax checked",
  },
  {
    id: "remote-locations",
    label: "Emergency address updates for remote staff noted",
  },
] as const;

export default function CloudConsultationForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [currentPhone, setCurrentPhone] = useState<string>("");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [selectedSafety, setSelectedSafety] = useState<string[]>([]);
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const totalSteps = CONSULTATION_STEPS.length;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const toggleArrayValue = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value],
    );
  };

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (submitted) {
      setSubmitted(false);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <section
      id="discuss-setup"
      aria-labelledby="cloud-consultation-heading"
      className="w-full bg-[#F7F9FB] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            GUIDED CONSULTATION
          </span>
        </div>

        {/* Heading */}
        <h2
          id="cloud-consultation-heading"
          className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
        >
          Tell us about your phone needs.
        </h2>

        {/* Subheading */}
        <p className="mt-2.5 max-w-[680px] text-[13px] leading-[1.5] font-normal text-[#475569] sm:text-[13.5px]">
          Around three minutes. We use your answers to prepare for a
          conversation with a business specialist. This{" "}
          <strong className="font-bold text-[#081C2E]">isn&apos;t</strong> an
          order or a quote.
        </p>

        {/* Main Consultation Layout */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          {/* Left Dark Sidebar: YOUR PROGRESS */}
          <aside
            aria-label="Consultation progress"
            className="flex flex-col justify-between rounded-[14px] bg-[#061A2E] p-5 text-white shadow-[0_12px_28px_rgba(6,26,46,0.14)] lg:col-span-3"
          >
            <div>
              <p className="text-[9.5px] font-extrabold tracking-[0.12em] text-[#FFD100] uppercase">
                YOUR PROGRESS
              </p>

              <ol className="mt-4 flex flex-col gap-2">
                {CONSULTATION_STEPS.map((item) => {
                  const isActive = item.step === currentStep && !submitted;
                  const isCompleted = item.step < currentStep || submitted;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setCurrentStep(item.step);
                        }}
                        aria-current={isActive ? "step" : undefined}
                        className={
                          isActive
                            ? "flex w-full items-center gap-3 rounded-[8px] bg-[#182E44] px-2.5 py-2 text-left transition-colors"
                            : "flex w-full items-center gap-3 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-white/[0.05]"
                        }
                      >
                        <span
                          className={
                            isActive
                              ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-[11px] font-extrabold text-[#061A2E]"
                              : isCompleted
                                ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A54] text-[11px] font-bold text-[#FFD100]"
                                : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#172B40] text-[11px] font-bold text-[#94A3B8]"
                          }
                        >
                          {item.step}
                        </span>

                        <span
                          className={
                            isActive
                              ? "text-[12px] font-bold text-white"
                              : "text-[12px] font-medium text-[#CBD5E1]"
                          }
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-8 border-t border-white/10 pt-3">
              <div className="mb-2 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#FFD100] transition-all duration-200"
                  style={{ width: `${submitted ? 100 : progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] leading-[1.4] font-normal text-[#94A3B8]">
                Your answers stay in this browser tab until you send them.
              </p>
            </div>
          </aside>

          {/* Right White Question Card */}
          <div className="flex min-h-[340px] flex-col justify-between rounded-[14px] border border-[#E6ECF2] bg-white p-6 shadow-[0_8px_24px_rgba(8,28,46,0.04)] sm:p-7 lg:col-span-9">
            {submitted ? (
              <div className="flex flex-1 flex-col justify-center py-6">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD100] text-[#061A2E]">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </div>
                <h3 className="mt-3 text-[18px] font-bold text-[#081C2E]">
                  Consultation summary ready
                </h3>
                <p className="mt-1.5 max-w-[540px] text-[12.5px] leading-[1.5] text-[#475569]">
                  Your notes are prepared for a specialist conversation. Nothing
                  has been ordered or quoted.
                </p>
                <div className="mt-4 rounded-[8px] border border-[#E6ECF2] bg-[#F8FAFC] p-4 text-[12px] text-[#334155]">
                  <p>
                    <strong className="font-bold text-[#081C2E]">
                      Main goal:
                    </strong>{" "}
                    {GOAL_OPTIONS.find((g) => g.id === selectedGoal)?.label ||
                      "Not selected"}
                  </p>
                  <p className="mt-1">
                    <strong className="font-bold text-[#081C2E]">
                      Business / team:
                    </strong>{" "}
                    {businessName || "Not provided"}
                    {teamSize
                      ? ` (${BUSINESS_SIZES.find((s) => s.id === teamSize)?.label})`
                      : ""}
                  </p>
                  <p className="mt-1">
                    <strong className="font-bold text-[#081C2E]">
                      Contact:
                    </strong>{" "}
                    {contactName || "Not provided"}
                    {contactEmail ? ` — ${contactEmail}` : ""}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {/* Step Header Row */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    {currentStep === 1 && "What’s your main goal?"}
                    {currentStep === 2 && "Tell us about your business"}
                    {currentStep === 3 && "What do you use for phones today?"}
                    {currentStep === 4 &&
                      "Which calls and devices matter most?"}
                    {currentStep === 5 &&
                      "Connectivity, power and safety notes"}
                    {currentStep === 6 && "How should a specialist reach you?"}
                    {currentStep === 7 && "Review your answers"}
                  </h3>
                  <span className="shrink-0 text-[11px] font-semibold text-[#64748B]">
                    Step {currentStep} of {totalSteps}
                  </span>
                </div>

                {/* Step 1: Main Goal (matches screenshot default state) */}
                {currentStep === 1 && (
                  <div className="mt-3.5">
                    <p className="text-[11.5px] leading-[1.25] font-bold text-[#081C2E]">
                      <span className="block">Choose</span>
                      <span className="block">one</span>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {GOAL_OPTIONS.map((option) => {
                        const isSelected = selectedGoal === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedGoal(option.id)}
                            className={
                              isSelected
                                ? "inline-flex h-[38px] items-center gap-2 rounded-[7px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11.5px] font-bold text-white transition-colors"
                                : "inline-flex h-[38px] items-center gap-2 rounded-[7px] border border-[#DCE3EB] bg-white px-3.5 text-[11.5px] font-semibold text-[#1E293B] transition-colors hover:border-[#94A3B8] hover:bg-[#F8FAFC]"
                            }
                          >
                            <span
                              className={
                                isSelected
                                  ? "flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#FFD100] bg-[#FFD100]"
                                  : "flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#CBD5E1]"
                              }
                            >
                              {isSelected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#061A2E]" />
                              )}
                            </span>
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Business */}
                {currentStep === 2 && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="consult-business-name"
                        className="block text-[12px] font-bold text-[#081C2E]"
                      >
                        Business name
                      </label>
                      <input
                        id="consult-business-name"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Northgate Studio Ltd"
                        className="mt-1.5 h-[38px] w-full max-w-[380px] rounded-[7px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#081C2E]">
                        Team size
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2.5">
                        {BUSINESS_SIZES.map((size) => {
                          const active = teamSize === size.id;
                          return (
                            <button
                              key={size.id}
                              type="button"
                              onClick={() => setTeamSize(size.id)}
                              className={
                                active
                                  ? "inline-flex h-[36px] items-center rounded-[7px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11.5px] font-bold text-white"
                                  : "inline-flex h-[36px] items-center rounded-[7px] border border-[#DCE3EB] bg-white px-3.5 text-[11.5px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                              }
                            >
                              {size.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Current phones */}
                {currentStep === 3 && (
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {CURRENT_PHONE_OPTIONS.map((opt) => {
                      const active = currentPhone === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCurrentPhone(opt.id)}
                          className={
                            active
                              ? "inline-flex h-[38px] items-center rounded-[7px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11.5px] font-bold text-white"
                              : "inline-flex h-[38px] items-center rounded-[7px] border border-[#DCE3EB] bg-white px-3.5 text-[11.5px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 4: Calls & devices */}
                {currentStep === 4 && (
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {DEVICE_PREFERENCES.map((dev) => {
                      const active = selectedDevices.includes(dev.id);
                      return (
                        <button
                          key={dev.id}
                          type="button"
                          onClick={() =>
                            toggleArrayValue(
                              dev.id,
                              selectedDevices,
                              setSelectedDevices,
                            )
                          }
                          className={
                            active
                              ? "inline-flex h-[38px] items-center rounded-[7px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11.5px] font-bold text-white"
                              : "inline-flex h-[38px] items-center rounded-[7px] border border-[#DCE3EB] bg-white px-3.5 text-[11.5px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                          }
                        >
                          {dev.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 5: Safety */}
                {currentStep === 5 && (
                  <div className="mt-4 flex flex-col gap-2.5">
                    {SAFETY_CHECKS.map((item) => {
                      const checked = selectedSafety.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#1E293B]"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleArrayValue(
                                item.id,
                                selectedSafety,
                                setSelectedSafety,
                              )
                            }
                            className="h-3.5 w-3.5 rounded-[3px] border border-[#CBD5E1] accent-[#061A2E]"
                          />
                          <span>{item.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Step 6: Contact */}
                {currentStep === 6 && (
                  <div className="mt-4 grid max-w-[540px] grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="consult-name"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Your name
                      </label>
                      <input
                        id="consult-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Full name"
                        className="mt-1 h-[36px] w-full rounded-[7px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="consult-email"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Work email
                      </label>
                      <input
                        id="consult-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@company.co.uk"
                        className="mt-1 h-[36px] w-full rounded-[7px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="consult-phone"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Phone number (optional)
                      </label>
                      <input
                        id="consult-phone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="020 7946 0192"
                        className="mt-1 h-[36px] w-full max-w-[260px] rounded-[7px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 7: Review */}
                {currentStep === 7 && (
                  <div className="mt-4 rounded-[8px] border border-[#E6ECF2] bg-[#F8FAFC] p-4 text-[12px] leading-[1.6] text-[#334155]">
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Goal:
                      </strong>{" "}
                      {GOAL_OPTIONS.find((g) => g.id === selectedGoal)?.label ||
                        "Not selected"}
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Business:
                      </strong>{" "}
                      {businessName || "Not provided"} (
                      {BUSINESS_SIZES.find((s) => s.id === teamSize)?.label ||
                        "Size not set"}
                      )
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Current setup:
                      </strong>{" "}
                      {CURRENT_PHONE_OPTIONS.find((p) => p.id === currentPhone)
                        ?.label || "Not selected"}
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Contact:
                      </strong>{" "}
                      {contactName || "Not provided"} (
                      {contactEmail || "Email not provided"})
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Divider & Navigation Buttons */}
            <div className="mt-10 flex items-center justify-between border-t border-[#E6ECF2] pt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 && !submitted}
                className={
                  currentStep === 1 && !submitted
                    ? "inline-flex h-[36px] cursor-not-allowed items-center gap-1.5 rounded-[7px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 text-[11.5px] font-semibold text-[#CBD5E1]"
                    : "inline-flex h-[36px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#CBD5E1] bg-white px-3.5 text-[11.5px] font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                }
              >
                <ChevronLeft className="h-3.5 w-3.5 stroke-[2.2]" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-[7px] bg-[#FFD100] px-5 text-[12px] font-bold text-[#081C2E] shadow-[0_3px_10px_rgba(255,209,0,0.25)] transition-colors hover:bg-[#FFE047]"
              >
                <span>
                  {currentStep === totalSteps && !submitted
                    ? "Submit"
                    : "Continue"}
                </span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

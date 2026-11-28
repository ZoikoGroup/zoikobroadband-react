"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface InterestOption {
  readonly id: string;
  readonly label: string;
}

const INTEREST_OPTIONS: readonly InterestOption[] = [
  { id: "business-calling-features", label: "Business calling features" },
  { id: "cloud-phone", label: "Cloud phone" },
  { id: "keep-a-number", label: "Keep a number" },
  { id: "multi-site", label: "Multi-site" },
  { id: "something-else", label: "Something else" },
] as const;

const TEAM_SIZE_OPTIONS = [
  "1–5 users",
  "6–15 users",
  "16–50 users",
  "51+ users",
] as const;

const SITE_COUNT_OPTIONS = [
  "Single site",
  "2–5 sites",
  "6+ sites",
  "Remote / hybrid team",
] as const;

const CALL_HANDLING_OPTIONS = [
  "Call routing & time-of-day schedules",
  "Auto attendant / IVR keypad menu",
  "Call queues & hunt groups",
  "Voicemail & call transfer",
  "Call recording (subject to compliance review)",
  "Softphone / mobile app access",
] as const;

const NUMBER_OPTIONS = [
  "Keep existing geographic or non-geographic numbers",
  "Request new UK business numbers",
  "Mix of existing and new numbers",
  "Not sure yet — discuss with a specialist",
] as const;

const CONTINUITY_OPTIONS = [
  "Care alarm, telecare or lift/emergency line",
  "Payment terminal, franking machine or alarm panel",
  "Critical out-of-hours / 999 continuity dependency",
  "None of these apply",
] as const;

const TIMELINE_OPTIONS = [
  "Just exploring options",
  "Within the next 1–3 months",
  "3–6 months away",
  "Linked to an upcoming contract renewal or move",
] as const;

interface WizardState {
  interests: string[];
  teamSize: string;
  siteCount: string;
  callHandling: string[];
  numbers: string;
  continuity: string[];
  timeline: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  agreedToContact: boolean;
}

const INITIAL_WIZARD_STATE: WizardState = {
  interests: [],
  teamSize: "",
  siteCount: "",
  callHandling: [],
  numbers: "",
  continuity: [],
  timeline: "",
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  notes: "",
  agreedToContact: false,
};

const TOTAL_STEPS = 8;

export default function GuidedQuoteRequestWizard() {
  const [step, setStep] = useState<number>(1);
  const [formState, setFormState] = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receiptRef, setReceiptRef] = useState<string | null>(null);

  const toggleMultiOption = (
    field: "interests" | "callHandling" | "continuity",
    value: string,
  ) => {
    setFormState((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      };
    });
    if (errorMessage) setErrorMessage(null);
  };

  const setSingleOption = (
    field:
      | "teamSize"
      | "siteCount"
      | "numbers"
      | "timeline"
      | "companyName"
      | "contactName"
      | "email"
      | "phone"
      | "notes",
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleStartOver = () => {
    setFormState(INITIAL_WIZARD_STATE);
    setStep(1);
    setErrorMessage(null);
    setReceiptRef(null);
  };

  const handleContinue = () => {
    setErrorMessage(null);

    if (step === 1 && formState.interests.length === 0) {
      setErrorMessage("Please select at least one area you are interested in.");
      return;
    }

    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (
      !formState.companyName.trim() ||
      !formState.contactName.trim() ||
      !formState.email.trim()
    ) {
      setErrorMessage(
        "Please enter your company name, contact name, and email address.",
      );
      return;
    }

    if (!formState.agreedToContact) {
      setErrorMessage(
        "Please tick the box to confirm you agree to be contacted about this enquiry.",
      );
      return;
    }

    const slug =
      formState.companyName
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 4) || "BIZ";
    const ref = `ZKQ-${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceiptRef(ref);
  };

  const progressPercentage = (step / TOTAL_STEPS) * 100;

  return (
    <section
      id="start-your-request"
      aria-label="Guided business quote request form"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              YOUR REQUEST
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Tell us what you need
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A short, guided request. Nothing is ordered or activated &mdash; at
            the end you&apos;ll get a reference and a specialist will follow up.
            You can go back and edit any answer.
          </p>
        </div>

        {/* Multi-Step Wizard Card */}
        <div className="bg-white border border-gray-200/90 rounded-3xl shadow-sm overflow-hidden">
          {/* Top Progress Header */}
          <div className="px-6 sm:px-8 py-4 border-b border-gray-100 flex items-center justify-between gap-6">
            <span className="text-xs font-bold text-[#0E2F52] shrink-0">
              Step {step} of {TOTAL_STEPS}
            </span>

            <div
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
              aria-label={`Step ${step} of ${TOTAL_STEPS}`}
              className="w-44 sm:w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Step Body */}
          <div className="px-6 sm:px-8 py-7 sm:py-8">
            {receiptRef ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-[#FEF9EC] border border-[#F5E2B8] rounded-2xl p-6 text-[#3D2E0E] space-y-3"
              >
                <div className="text-base font-extrabold text-[#0E2F52]">
                  Quote request submitted ({receiptRef})
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Nothing has been ordered or activated. A specialist will
                  review your requirements and follow up at{" "}
                  <span className="font-bold">{formState.email}</span>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="inline-flex items-center justify-center bg-[#073763] hover:bg-[#0E2F52] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Start another request
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        What are you interested in?
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      Select everything that applies.
                    </p>

                    <div
                      role="group"
                      aria-label="What are you interested in?"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                    >
                      {INTEREST_OPTIONS.map((option) => {
                        const isChecked = formState.interests.includes(
                          option.label,
                        );

                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() =>
                              toggleMultiOption("interests", option.label)
                            }
                            className={`w-full rounded-xl px-4 py-3.5 flex items-center gap-3.5 text-left transition-all cursor-pointer ${
                              isChecked
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            <span
                              className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                isChecked
                                  ? "bg-[#073763] border-[#073763] text-white"
                                  : "bg-white border-slate-300"
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </span>

                            <span className="text-xs sm:text-sm font-bold text-[#0E2F52]">
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        How many people use the phone?
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      An approximate headcount helps us check seat and plan
                      options.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {TEAM_SIZE_OPTIONS.map((option) => {
                        const isSelected = formState.teamSize === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSingleOption("teamSize", option)}
                            className={`w-full rounded-xl px-4 py-3.5 text-left text-xs sm:text-sm font-bold text-[#0E2F52] transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        How many locations or sites do you have?
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      Choose the setup closest to how your team works.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {SITE_COUNT_OPTIONS.map((option) => {
                        const isSelected = formState.siteCount === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSingleOption("siteCount", option)}
                            className={`w-full rounded-xl px-4 py-3.5 text-left text-xs sm:text-sm font-bold text-[#0E2F52] transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        Which call handling capabilities matter most?
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      Select any features you want us to verify for your
                      account.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {CALL_HANDLING_OPTIONS.map((option) => {
                        const isChecked =
                          formState.callHandling.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() =>
                              toggleMultiOption("callHandling", option)
                            }
                            className={`w-full rounded-xl px-4 py-3.5 flex items-center gap-3.5 text-left transition-all cursor-pointer ${
                              isChecked
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            <span
                              className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? "bg-[#073763] border-[#073763] text-white"
                                  : "bg-white border-slate-300"
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#0E2F52]">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        What do you need for phone numbers?
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      Number porting and allocation depend on line type and
                      eligibility.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {NUMBER_OPTIONS.map((option) => {
                        const isSelected = formState.numbers === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSingleOption("numbers", option)}
                            className={`w-full rounded-xl px-4 py-3.5 text-left text-xs sm:text-sm font-bold text-[#0E2F52] transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 6 */}
                {step === 6 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        Are there any lines or devices that must keep working?
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      Tell us about safety or specialist equipment so we can
                      review continuity requirements.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {CONTINUITY_OPTIONS.map((option) => {
                        const isChecked = formState.continuity.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() =>
                              toggleMultiOption("continuity", option)
                            }
                            className={`w-full rounded-xl px-4 py-3.5 flex items-center gap-3.5 text-left transition-all cursor-pointer ${
                              isChecked
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            <span
                              className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? "bg-[#073763] border-[#073763] text-white"
                                  : "bg-white border-slate-300"
                              }`}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#0E2F52]">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 7 */}
                {step === 7 && (
                  <div>
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        When are you looking to review options?
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      We don&apos;t promise a go-live date here &mdash; this
                      helps our specialist plan your review.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {TIMELINE_OPTIONS.map((option) => {
                        const isSelected = formState.timeline === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSingleOption("timeline", option)}
                            className={`w-full rounded-xl px-4 py-3.5 text-left text-xs sm:text-sm font-bold text-[#0E2F52] transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#F0F5FA] border-[1.5px] border-[#073763]"
                                : "bg-white border border-gray-200/90 hover:border-gray-300"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 8 */}
                {step === 8 && (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    <div className="border-[1.5px] border-[#F5B82E] rounded-xl px-4 py-2.5 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0E2F52]">
                        Where should we send your tailored quote?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="wizard-company"
                          className="block text-xs font-bold text-[#0E2F52] mb-1.5"
                        >
                          Company name
                        </label>
                        <input
                          id="wizard-company"
                          type="text"
                          value={formState.companyName}
                          onChange={(e) =>
                            setSingleOption("companyName", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-[#0E2F52] focus:outline-none focus:ring-2 focus:ring-[#073763]/20 focus:border-[#073763]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-contact"
                          className="block text-xs font-bold text-[#0E2F52] mb-1.5"
                        >
                          Contact name
                        </label>
                        <input
                          id="wizard-contact"
                          type="text"
                          value={formState.contactName}
                          onChange={(e) =>
                            setSingleOption("contactName", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-[#0E2F52] focus:outline-none focus:ring-2 focus:ring-[#073763]/20 focus:border-[#073763]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="wizard-email"
                          className="block text-xs font-bold text-[#0E2F52] mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          id="wizard-email"
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setSingleOption("email", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-[#0E2F52] focus:outline-none focus:ring-2 focus:ring-[#073763]/20 focus:border-[#073763]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-phone"
                          className="block text-xs font-bold text-[#0E2F52] mb-1.5"
                        >
                          Phone{" "}
                          <span className="font-normal text-gray-400">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="wizard-phone"
                          type="tel"
                          value={formState.phone}
                          onChange={(e) =>
                            setSingleOption("phone", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-[#0E2F52] focus:outline-none focus:ring-2 focus:ring-[#073763]/20 focus:border-[#073763]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-notes"
                        className="block text-xs font-bold text-[#0E2F52] mb-1.5"
                      >
                        Anything else we should know?{" "}
                        <span className="font-normal text-gray-400">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="wizard-notes"
                        rows={3}
                        value={formState.notes}
                        onChange={(e) =>
                          setSingleOption("notes", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-[#0E2F52] focus:outline-none focus:ring-2 focus:ring-[#073763]/20 focus:border-[#073763]"
                      />
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl px-4 py-3">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={formState.agreedToContact}
                        onClick={() => {
                          setFormState((prev) => ({
                            ...prev,
                            agreedToContact: !prev.agreedToContact,
                          }));
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full flex items-start gap-3 text-left cursor-pointer"
                      >
                        <span
                          className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                            formState.agreedToContact
                              ? "bg-[#073763] border-[#073763] text-white"
                              : "bg-white border-slate-300"
                          }`}
                        >
                          {formState.agreedToContact && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </span>
                        <span className="text-xs leading-relaxed">
                          <span className="block font-bold text-[#0E2F52]">
                            I agree to be contacted about this enquiry
                          </span>
                          <span className="block text-gray-500 mt-0.5">
                            We&apos;ll use your details to respond to this
                            request, in line with our{" "}
                            <Link
                              href="/privacy-notice"
                              onClick={(e) => e.stopPropagation()}
                              className="underline underline-offset-2 hover:text-[#0E2F52]"
                            >
                              Privacy Notice
                            </Link>
                            . This box is not pre-ticked.
                          </span>
                        </span>
                      </button>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer group"
                      >
                        <span>Submit quote request</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}

                {errorMessage && (
                  <p
                    role="alert"
                    className="mt-4 text-xs sm:text-sm font-medium text-[#7F1D1D] bg-[#FDF2EF] border border-[#F3D1C8] rounded-xl px-4 py-2.5"
                  >
                    {errorMessage}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Bottom Navigation Footer */}
          {!receiptRef && (
            <div className="px-6 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="text-xs sm:text-sm font-bold text-[#0E2F52] hover:text-[#073763] transition-colors cursor-pointer"
                >
                  Start over
                </button>

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setStep((prev) => prev - 1);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#0E2F52] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                )}
              </div>

              {step < TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center justify-center gap-2 bg-[#073763] hover:bg-[#0E2F52] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer group"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

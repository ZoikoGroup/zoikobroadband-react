"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

interface EnquiryFormState {
  name: string;
  email: string;
  postcode: string;
  phone: string;
  question: string;
  agreedToContact: boolean;
}

const INITIAL_FORM_STATE: EnquiryFormState = {
  name: "",
  email: "",
  postcode: "",
  phone: "",
  question: "",
  agreedToContact: false,
};

export default function AskAboutHomeDigitalPhoneForm() {
  const [formState, setFormState] =
    useState<EnquiryFormState>(INITIAL_FORM_STATE);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [receiptRef, setReceiptRef] = useState<string | null>(null);

  const handleFieldChange = (
    field: keyof EnquiryFormState,
    value: string | boolean,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (feedbackMessage) {
      setFeedbackMessage(null);
      setIsError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedPostcode = formState.postcode.trim().toUpperCase();

    if (!trimmedName || !trimmedEmail || !trimmedPostcode) {
      setIsError(true);
      setReceiptRef(null);
      setFeedbackMessage(
        "Please enter your name, email address, and UK postcode so our team can respond.",
      );
      return;
    }

    if (!formState.agreedToContact) {
      setIsError(true);
      setReceiptRef(null);
      setFeedbackMessage(
        "Please tick the box to confirm you agree to be contacted about this enquiry.",
      );
      return;
    }

    const generatedRef = `ZKDV-${trimmedPostcode.replace(/\s+/g, "").slice(0, 6) || "UK"}-${Math.floor(1000 + Math.random() * 9000)}`;

    setIsError(false);
    setReceiptRef(generatedRef);
    setFeedbackMessage(
      `Enquiry recorded (${generatedRef}). No order has been placed — our UK-based team will follow up by email at ${trimmedEmail}.`,
    );
    setFormState(INITIAL_FORM_STATE);
  };

  return (
    <section
      id="ask-about-home-digital-phone"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              ASK US
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Ask about Home Digital Phone
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Not sure what fits, or want help with the switch? Send a quick
            enquiry and our UK-based team will get back to you. Nothing is
            ordered here, and there&apos;s no pre-ticked marketing opt-in.
          </p>
        </div>

        {/* Enquiry Form Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Row 1: Your name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="enquiry-name"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Your name
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-email"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Email
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Postcode & Phone (optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="enquiry-postcode"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Postcode
                </label>
                <input
                  id="enquiry-postcode"
                  type="text"
                  value={formState.postcode}
                  onChange={(e) =>
                    handleFieldChange("postcode", e.target.value)
                  }
                  autoComplete="postal-code"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Phone{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>
            </div>

            {/* Row 3: What would you like to know? (optional) */}
            <div>
              <label
                htmlFor="enquiry-question"
                className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
              >
                What would you like to know?{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                id="enquiry-question"
                rows={4}
                value={formState.question}
                onChange={(e) => handleFieldChange("question", e.target.value)}
                placeholder="e.g. keep my number, I have a care alarm, do I need full fibre..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors resize-y"
              />
            </div>

            {/* Row 4: Consent Box (Unchecked by Default) */}
            <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl px-4 py-3.5">
              <button
                type="button"
                role="checkbox"
                aria-checked={formState.agreedToContact}
                onClick={() =>
                  handleFieldChange(
                    "agreedToContact",
                    !formState.agreedToContact,
                  )
                }
                className="w-full flex items-start gap-3 text-left cursor-pointer"
              >
                <span
                  className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    formState.agreedToContact
                      ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {formState.agreedToContact && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </span>

                <span className="text-xs sm:text-[13px] leading-relaxed">
                  <span className="block font-bold text-[#0E2F52]">
                    I agree to be contacted about this enquiry
                  </span>
                  <span className="block text-gray-500 mt-0.5">
                    We&apos;ll use your details to respond, in line with our{" "}
                    <Link
                      href="/privacy-notice"
                      onClick={(e) => e.stopPropagation()}
                      className="underline underline-offset-2 hover:text-[#0E2F52] transition-colors"
                    >
                      Privacy Notice
                    </Link>
                    . This box is not pre-ticked.
                  </span>
                </span>
              </button>
            </div>

            {/* Row 5: Submit Button & Receipt Note */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors shadow-2xs cursor-pointer group"
              >
                <span>Send my enquiry</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-[11px] sm:text-xs text-gray-400">
                We&apos;ll send a receipt reference and follow up by email.
              </span>
            </div>

            {/* Validation or Receipt Feedback */}
            {feedbackMessage && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed border ${
                  isError
                    ? "bg-[#FDF2EF] border-[#F3D1C8] text-[#7F1D1D]"
                    : "bg-[#FEF9EC] border-[#F5E2B8] text-[#3D2E0E]"
                }`}
              >
                {feedbackMessage}
                {receiptRef && (
                  <span className="block text-[11px] text-[#5C4618] mt-1">
                    Reference ID: {receiptRef}
                  </span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

interface QuoteFormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  agreedToContact: boolean;
}

const INITIAL_QUOTE_FORM_STATE: QuoteFormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  notes: "",
  agreedToContact: false,
};

interface RequestTailoredQuoteSectionProps {
  selectedFeatures?: string[];
  onRemoveFeature?: (featureTitle: string) => void;
}

export default function RequestTailoredQuoteSection({
  selectedFeatures = [],
  onRemoveFeature,
}: RequestTailoredQuoteSectionProps) {
  const [formState, setFormState] = useState<QuoteFormState>(
    INITIAL_QUOTE_FORM_STATE,
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [receiptRef, setReceiptRef] = useState<string | null>(null);

  const handleFieldChange = (
    field: keyof QuoteFormState,
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

    const trimmedCompany = formState.companyName.trim();
    const trimmedContact = formState.contactName.trim();
    const trimmedEmail = formState.email.trim();

    if (!trimmedCompany || !trimmedContact || !trimmedEmail) {
      setIsError(true);
      setReceiptRef(null);
      setFeedbackMessage(
        "Please enter your company name, contact name, and email address so our team can confirm availability and pricing.",
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

    const companySlug =
      trimmedCompany
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 4) || "BIZ";
    const generatedRef = `ZKBV-${companySlug}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    setIsError(false);
    setReceiptRef(generatedRef);
    setFeedbackMessage(
      `Quote request recorded (${generatedRef}). Nothing has been activated — our UK-based business team will verify your account scope and follow up at ${trimmedEmail}.`,
    );
    setFormState(INITIAL_QUOTE_FORM_STATE);
  };

  return (
    <section
      id="request-a-quote"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              REVIEW &amp; REQUEST
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Ask us to confirm and price these
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Add features to compare, then request a tailored quote. We&apos;ll
            check what&apos;s available for your account and set out the costs
            &mdash; nothing is activated from this page, and there&apos;s no
            pre-ticked marketing opt-in.
          </p>
        </div>

        {/* Quote Request Form Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
          {/* Selected Features Summary Box */}
          <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl px-4 py-3.5 mb-6">
            <div className="text-xs font-bold text-[#0E2F52] mb-1">
              Features you&apos;re interested in
            </div>

            {selectedFeatures.length === 0 ? (
              <p className="text-xs text-gray-500">
                None selected yet &mdash; tick &ldquo;Add to compare&rdquo; on
                any feature above.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-2 pt-1.5">
                {selectedFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-[#0E2F52] text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    <span>{feature}</span>
                    {onRemoveFeature && (
                      <button
                        type="button"
                        onClick={() => onRemoveFeature(feature)}
                        aria-label={`Remove ${feature}`}
                        className="text-gray-400 hover:text-[#0E2F52] cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Row 1: Company name & Contact name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="quote-company-name"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Company name
                </label>
                <input
                  id="quote-company-name"
                  type="text"
                  value={formState.companyName}
                  onChange={(e) =>
                    handleFieldChange("companyName", e.target.value)
                  }
                  autoComplete="organization"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="quote-contact-name"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Contact name
                </label>
                <input
                  id="quote-contact-name"
                  type="text"
                  value={formState.contactName}
                  onChange={(e) =>
                    handleFieldChange("contactName", e.target.value)
                  }
                  autoComplete="name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone (optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="quote-email"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Email
                </label>
                <input
                  id="quote-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="quote-phone"
                  className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
                >
                  Phone{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Anything else we should know? (optional) */}
            <div>
              <label
                htmlFor="quote-notes"
                className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
              >
                Anything else we should know?{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                id="quote-notes"
                rows={4}
                value={formState.notes}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
                placeholder="e.g. 8 users, out-of-hours routing, recording for the sales team..."
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
                    We&apos;ll use your details to respond to this request, in
                    line with our{" "}
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
                <span>Request a tailored quote</span>
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

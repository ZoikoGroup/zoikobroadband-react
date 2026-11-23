"use client";

import React, { useEffect, useState } from "react";
import { Phone, Mail, ArrowRight, Check } from "lucide-react";

type EnquiryAboutOption =
  | "New business enquiry"
  | "I'm an existing customer with a fault or billing issue";

type ReplyPreferenceOption = "Call me" | "Email me";

const TOPIC_OPTIONS: readonly string[] = [
  "Business broadband & full fibre",
  "Static IP & networking",
  "Digital phone lines & voice",
  "Several premises & continuity",
  "Not sure what you need?",
];

const BUSINESS_SIZE_OPTIONS: readonly string[] = [
  "Sole trader (1)",
  "Small (2–10)",
  "Medium (11–50)",
  "Larger (50+)",
];

const PREFERRED_TIME_OPTIONS: readonly string[] = [
  "No preference",
  "Morning (9am–12pm)",
  "Afternoon (12pm–5pm)",
  "Late afternoon / end of day",
];

export interface EnquiryFormValues {
  readonly about: EnquiryAboutOption;
  readonly replyPreference: ReplyPreferenceOption;
  readonly fullName: string;
  readonly businessName: string;
  readonly isSoleTrader: boolean;
  readonly email: string;
  readonly contactNumber: string;
  readonly topic: string;
  readonly businessSize: string;
  readonly postcode: string;
  readonly preferredTime: string;
  readonly details: string;
  readonly accessibilityNeeds: string;
  readonly marketingOptIn: boolean;
}

export interface SpecialistYourEnquiryProps {
  readonly selectedTopic?: string | null;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly privacyHref?: string;
  readonly phoneNumberLabel?: string;
  readonly phoneHref?: string;
  readonly onSubmitEnquiry?: (values: EnquiryFormValues) => void;
}

export default function SpecialistYourEnquiry({
  selectedTopic,
  imageSrc = "/Images/mng/3.png",
  imageAlt = "Business advisor smiling in a modern office while holding a smartphone",
  privacyHref = "#privacy-notice",
  phoneNumberLabel = "+44 20 7164 6399",
  phoneHref = "tel:+442071646399",
  onSubmitEnquiry,
}: SpecialistYourEnquiryProps) {
  const [about, setAbout] = useState<EnquiryAboutOption>(
    "New business enquiry",
  );
  const [replyPreference, setReplyPreference] =
    useState<ReplyPreferenceOption>("Call me");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSoleTrader, setIsSoleTrader] = useState(false);
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [topic, setTopic] = useState(selectedTopic ?? "");
  const [businessSize, setBusinessSize] = useState("");
  const [postcode, setPostcode] = useState("");
  const [preferredTime, setPreferredTime] = useState("No preference");
  const [details, setDetails] = useState("");
  const [accessibilityNeeds, setAccessibilityNeeds] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [validationErrors, setValidationErrors] = useState<readonly string[]>(
    [],
  );
  const [submittedValues, setSubmittedValues] =
    useState<EnquiryFormValues | null>(null);

  useEffect(() => {
    if (selectedTopic) {
      setTopic(selectedTopic);
    }
  }, [selectedTopic]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: string[] = [];

    if (!fullName.trim()) {
      errors.push("Enter your name.");
    }

    if (!isSoleTrader && !businessName.trim()) {
      errors.push("Enter a business name or tick 'I'm a sole trader'.");
    }

    if (!topic.trim()) {
      errors.push("Choose what you'd like to discuss.");
    }

    if (replyPreference === "Call me" && !contactNumber.trim()) {
      errors.push("Enter a contact number so we can call you.");
    }

    if (replyPreference === "Email me" && !email.trim()) {
      errors.push("Enter an email address so we can email you.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setSubmittedValues(null);
      return;
    }

    setValidationErrors([]);

    const payload: EnquiryFormValues = {
      about,
      replyPreference,
      fullName: fullName.trim(),
      businessName: businessName.trim(),
      isSoleTrader,
      email: email.trim(),
      contactNumber: contactNumber.trim(),
      topic: topic.trim(),
      businessSize,
      postcode: postcode.trim(),
      preferredTime,
      details: details.trim(),
      accessibilityNeeds: accessibilityNeeds.trim(),
      marketingOptIn,
    };

    setSubmittedValues(payload);
    onSubmitEnquiry?.(payload);
  };

  return (
    <section
      id="your-enquiry"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              03
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              YOUR ENQUIRY
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3 max-w-[600px]">
            Request a callback or send an enquiry.
          </h2>

          <p className="text-[#475569] text-[14px] leading-[1.55]">
            Fields marked <span className="text-[#DC2626] font-bold">*</span>{" "}
            are required. It&apos;s free, there&apos;s no obligation, and it
            doesn&apos;t place an order.
          </p>
        </div>

        {/* Main 2-Column Layout: Left Enquiry Form Card + Right Advisor Photo & Topic Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Card */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-8 bg-white rounded-[20px] border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_8px_24px_rgba(11,34,65,0.05)] space-y-5"
          >
            {/* What's this about? */}
            <div>
              <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2.5">
                What&apos;s this about?{" "}
                <span className="text-[#DC2626]" aria-hidden="true">
                  *
                </span>
              </p>

              <div
                role="radiogroup"
                aria-label="What's this about?"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {(
                  [
                    "New business enquiry",
                    "I'm an existing customer with a fault or billing issue",
                  ] as const
                ).map((option) => {
                  const isSelected = about === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setAbout(option)}
                      className={`min-h-[46px] px-4 py-2 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241] shadow-[0_2px_8px_rgba(11,34,65,0.06)]"
                          : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-[#061A33] bg-[#061A33]"
                            : "border-[#CBD5E1] bg-white"
                        }`}
                      >
                        {isSelected ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC119]" />
                        ) : null}
                      </span>
                      <span className="text-[12px] font-bold leading-snug">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Validation Summary Banner */}
            {validationErrors.length > 0 ? (
              <div
                role="alert"
                className="rounded-[10px] bg-[#FEF2F2] border border-[#F87171] px-4 py-3 text-[#991B1B]"
              >
                <p className="text-[12.5px] font-extrabold mb-1">
                  Please check the following:
                </p>
                <ul className="list-disc pl-5 space-y-0.5 text-[12px] font-medium">
                  {validationErrors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Submitted Confirmation Banner */}
            {submittedValues ? (
              <div
                role="status"
                className="rounded-[10px] bg-[#ECFDF5] border border-[#34D399] px-4 py-3 text-[#065F46]"
              >
                <p className="text-[12.5px] font-extrabold mb-0.5">
                  Enquiry prepared in session
                </p>
                <p className="text-[12px]">
                  Topic:{" "}
                  <span className="font-bold">{submittedValues.topic}</span>{" "}
                  &middot; Preferred reply:{" "}
                  <span className="font-bold">
                    {submittedValues.replyPreference}
                  </span>
                </p>
              </div>
            ) : null}

            {/* How would you like us to reply? */}
            <div>
              <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2">
                How would you like us to reply?{" "}
                <span className="text-[#DC2626]" aria-hidden="true">
                  *
                </span>
              </p>

              <div className="inline-flex flex-wrap items-center gap-2.5">
                {(["Call me", "Email me"] as const).map((pref) => {
                  const isSelected = replyPreference === pref;
                  const Icon = pref === "Call me" ? Phone : Mail;
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setReplyPreference(pref)}
                      className={`inline-flex items-center gap-2 px-4 h-[38px] rounded-[8px] border text-[12px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061A33] border-[#061A33] text-white shadow-2xs"
                          : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isSelected ? "text-[#FFC119]" : "text-[#0B2241]"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{pref}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Your name + Business name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enquiry-name"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Your name{" "}
                  <span className="text-[#DC2626]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-business-name"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1"
                >
                  Business name
                </label>
                <p className="text-[#64748B] text-[10.5px] mb-1.5">
                  Required unless you&apos;re a sole trader.
                </p>
                <input
                  id="enquiry-business-name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />

                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isSoleTrader}
                    onChange={(e) => setIsSoleTrader(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center ${
                      isSoleTrader
                        ? "bg-[#061A33] border-[#061A33] text-[#FFC119]"
                        : "bg-white border-[#CBD5E1]"
                    }`}
                  >
                    {isSoleTrader ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : null}
                  </span>
                  <span className="text-[#334155] text-[11px] font-medium">
                    I&apos;m a sole trader
                  </span>
                </label>
              </div>
            </div>

            {/* Email address + Contact number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enquiry-email"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Email address{" "}
                  <span className="text-[#64748B] font-normal">(optional)</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.co.uk"
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Contact number{" "}
                  <span className="text-[#64748B] font-normal">(optional)</span>
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="e.g. 020 7946 0000 or +44..."
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>
            </div>

            {/* I'd like to discuss + Business size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enquiry-topic"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  I&apos;d like to discuss{" "}
                  <span className="text-[#DC2626]" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="enquiry-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0B2241] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                >
                  <option value="">Choose a topic</option>
                  {TOPIC_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="enquiry-size"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Business size{" "}
                  <span className="text-[#64748B] font-normal">(optional)</span>
                </label>
                <select
                  id="enquiry-size"
                  value={businessSize}
                  onChange={(e) => setBusinessSize(e.target.value)}
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0B2241] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                >
                  <option value="">Choose</option>
                  {BUSINESS_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business postcode + Preferred time to talk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enquiry-postcode"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Business postcode{" "}
                  <span className="text-[#64748B] font-normal">(optional)</span>
                </label>
                <input
                  id="enquiry-postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. EC1A 1BB"
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
                <p className="text-[#64748B] text-[10.5px] mt-1">
                  Not sure? You can still send your enquiry.
                </p>
              </div>

              <div>
                <label
                  htmlFor="enquiry-preferred-time"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Preferred time to talk{" "}
                  <span className="text-[#64748B] font-normal">(optional)</span>
                </label>
                <select
                  id="enquiry-preferred-time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0B2241] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                >
                  {PREFERRED_TIME_OPTIONS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[#64748B] text-[10.5px] mt-1">
                  A preference, not a booked appointment.
                </p>
              </div>
            </div>

            {/* Tell us what you need */}
            <div>
              <label
                htmlFor="enquiry-details"
                className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
              >
                Tell us what you need{" "}
                <span className="text-[#64748B] font-normal">(optional)</span>
              </label>
              <textarea
                id="enquiry-details"
                rows={4}
                maxLength={1000}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. two sites, current provider, target date. Please don't include passwords."
                className="w-full p-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
              />
              <div className="flex items-center justify-between gap-2 text-[10.5px] text-[#64748B] mt-1">
                <span>
                  Include number of sites, current provider or target date if
                  relevant.
                </span>
                <span className="shrink-0">{details.length} / 1,000</span>
              </div>
            </div>

            {/* Contact or accessibility needs */}
            <div>
              <label
                htmlFor="enquiry-accessibility"
                className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
              >
                Contact or accessibility needs{" "}
                <span className="text-[#64748B] font-normal">(optional)</span>
              </label>
              <input
                id="enquiry-accessibility"
                type="text"
                value={accessibilityNeeds}
                onChange={(e) => setAccessibilityNeeds(e.target.value)}
                placeholder="e.g. please email rather than call"
                className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
              />
            </div>

            {/* Privacy Notice Callout */}
            <div className="rounded-[10px] bg-[#F1F5F9] px-4 py-3 text-[11px] text-[#475569] leading-[1.5]">
              We&apos;ll use the details you provide to contact you about your
              business enquiry. This does not place an order. You can read how
              we use and protect your information in our{" "}
              <a
                href={privacyHref}
                className="text-[#0B2241] font-bold underline hover:text-[#1963DD]"
              >
                Privacy Notice
              </a>
              .
            </div>

            {/* Optional Marketing Opt-in */}
            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 ${
                  marketingOptIn
                    ? "bg-[#061A33] border-[#061A33] text-[#FFC119]"
                    : "bg-white border-[#CBD5E1]"
                }`}
              >
                {marketingOptIn ? (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                ) : null}
              </span>
              <span className="text-[#475569] text-[11px] font-medium">
                Optional: send me news and offers from Zoiko Broadband. This
                doesn&apos;t affect your enquiry.
              </span>
            </label>

            {/* Submit CTA & Direct Phone Link */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 h-[42px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12.5px] font-extrabold transition-colors cursor-pointer shadow-[0_3px_10px_rgba(255,193,25,0.28)]"
              >
                <span>Request a callback</span>
                <ArrowRight
                  className="w-3.5 h-3.5 stroke-[2.3]"
                  aria-hidden="true"
                />
              </button>

              <p className="text-[#475569] text-[11.5px] font-medium">
                Or call{" "}
                <a
                  href={phoneHref}
                  className="text-[#0B2241] font-extrabold underline hover:text-[#1963DD]"
                >
                  {phoneNumberLabel}
                </a>
              </p>
            </div>
          </form>

          {/* Right Sidebar: Advisor Photo + "YOUR TOPIC" Dark Card + 3 Assurance Pills */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="w-full h-[185px] sm:h-[200px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_20px_rgba(11,34,65,0.08)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>

            <div className="bg-[#061A33] rounded-[16px] p-5 text-white shadow-[0_8px_22px_rgba(6,26,51,0.14)]">
              <p className="text-[#FFC119] text-[10px] font-extrabold tracking-[0.12em] uppercase mb-1.5">
                YOUR TOPIC
              </p>

              <h3 className="text-white text-[16px] font-extrabold leading-[1.3] mb-1">
                {topic || "Not chosen yet"}
              </h3>

              <p className="text-[#94A3B8] text-[11.5px] leading-[1.45]">
                {topic
                  ? "Selected for your business enquiry below."
                  : "Tap a question in the hero or a topic above to fill this in."}
              </p>
            </div>

            <div className="bg-[#F1F5F9] rounded-[16px] p-4.5 space-y-3 border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#FFC119] text-[#0B2241] text-[10.5px] font-extrabold inline-flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="text-[#334155] text-[11.5px] font-semibold leading-[1.35]">
                  No payment or card details, ever.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#FFC119] text-[#0B2241] text-[10.5px] font-extrabold inline-flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="text-[#334155] text-[11.5px] font-semibold leading-[1.35]">
                  No credit check on this page.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#FFC119] text-[#0B2241] text-[10.5px] font-extrabold inline-flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-[#334155] text-[11.5px] font-semibold leading-[1.35]">
                  We reply during approved business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";

const QUOTE_WIZARD_STEPS = [
  { step: 1, id: "request-type", label: "Request type" },
  { step: 2, id: "your-business", label: "Your business" },
  { step: 3, id: "contact", label: "Contact" },
  { step: 4, id: "services", label: "Services" },
  { step: 5, id: "sites", label: "Sites" },
  { step: 6, id: "postcodes", label: "Postcodes" },
  { step: 7, id: "usage", label: "Usage" },
  { step: 8, id: "existing-services", label: "Existing services" },
  { step: 9, id: "timing-budget", label: "Timing & budget" },
  { step: 10, id: "other-details", label: "Other details" },
  { step: 11, id: "review", label: "Review" },
  { step: 12, id: "receipt", label: "Receipt" },
] as const;

const REQUEST_TYPE_OPTIONS = [
  { id: "new-connection", label: "New connection" },
  { id: "switching-provider", label: "Switching provider" },
  { id: "moving-premises", label: "Moving premises" },
  { id: "adding-locations", label: "Adding locations" },
  { id: "not-sure-yet", label: "Not sure yet" },
] as const;

const SERVICE_OPTIONS = [
  { id: "business-broadband", label: "Business broadband" },
  { id: "business-voip-cloud-phone", label: "Business VoIP / Cloud phone" },
  { id: "cyber-security", label: "Cyber security & protection" },
  { id: "managed-services", label: "Managed services" },
  { id: "not-sure-services", label: "Not sure yet" },
] as const;

const SITE_COUNT_OPTIONS = [
  { id: "1-site", label: "1 site" },
  { id: "2-5-sites", label: "2–5 sites" },
  { id: "6-20-sites", label: "6–20 sites" },
  { id: "20+-sites", label: "20+ sites" },
] as const;

const USAGE_PROFILES = [
  { id: "everyday-office", label: "Everyday office & cloud apps" },
  { id: "high-bandwidth-media", label: "High bandwidth / large files / video" },
  { id: "guest-customer-wifi", label: "Customer or guest Wi-Fi" },
  { id: "voice-heavy", label: "Voice & call-handling heavy" },
] as const;

const EXISTING_SERVICE_OPTIONS = [
  { id: "current-broadband", label: "Existing business broadband" },
  { id: "current-phone-numbers", label: "Phone numbers to keep" },
  {
    id: "alarms-card-lines",
    label: "Alarms, lift lines, card machines or fax",
  },
  { id: "none-or-unsure", label: "None / not sure" },
] as const;

const TIMING_OPTIONS = [
  { id: "asap", label: "As soon as possible" },
  { id: "within-1-3-months", label: "Within 1–3 months" },
  { id: "3-plus-months", label: "3+ months / planning ahead" },
  { id: "not-sure-timing", label: "Not sure yet" },
] as const;

const BUDGET_OPTIONS = [
  { id: "under-100", label: "Under £100 / mo (optional)" },
  { id: "100-300", label: "£100–£300 / mo" },
  { id: "300-750", label: "£300–£750 / mo" },
  { id: "750-plus", label: "£750+ / mo" },
  { id: "prefer-not-say", label: "Prefer not to say" },
] as const;

const SPECIALIST_CARD_DATA = {
  imageSrc: "/Images/req/3.png",
  imageAlt: "Specialist wearing a headset smiling at a computer monitor",
  title: "Prefer to talk?",
  description:
    "Business sales: [Approved business sales number]. Accessible alternatives available.",
} as const;

export default function QuoteRequestWizard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [requestType, setRequestType] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [siteCount, setSiteCount] = useState<string>("");
  const [postcodes, setPostcodes] = useState<string>("");
  const [selectedUsage, setSelectedUsage] = useState<string[]>([]);
  const [selectedExisting, setSelectedExisting] = useState<string[]>([]);
  const [timing, setTiming] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [otherNotes, setOtherNotes] = useState<string>("");

  const totalSteps = QUOTE_WIZARD_STEPS.length;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const toggleMulti = (
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
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <section
      id="start-quote-request"
      aria-labelledby="quote-request-wizard-heading"
      className="w-full bg-[#FFFFFF] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Top Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            QUOTE REQUEST
          </span>
        </div>

        {/* Main Heading */}
        <h2
          id="quote-request-wizard-heading"
          className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
        >
          Tell us what your business needs.
        </h2>

        {/* Subheading */}
        <p className="mt-2 text-[13px] leading-[1.5] font-normal text-[#475569] sm:text-[13.5px]">
          One topic at a time. Your answers stay on this page until you send
          them.
        </p>

        {/* Main Two-Column Wizard Grid */}
        <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          {/* Left Column: Dark Stepper Rail + "Prefer to talk?" Card */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <aside
              aria-label="Quote request steps"
              className="rounded-[14px] bg-[#061A2E] p-4 text-white shadow-[0_12px_28px_rgba(6,26,46,0.14)]"
            >
              <p className="px-1.5 text-[9.5px] font-extrabold tracking-[0.1em] text-[#FFD100] uppercase">
                STEP {currentStep} OF {totalSteps}
              </p>

              <div className="mt-2.5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#FFD100] transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <ol className="mt-3.5 flex flex-col gap-1">
                {QUOTE_WIZARD_STEPS.map((item) => {
                  const isActive = item.step === currentStep;
                  const isCompleted = item.step < currentStep;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(item.step)}
                        aria-current={isActive ? "step" : undefined}
                        className={
                          isActive
                            ? "flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] bg-[#182E44] px-2 py-1.5 text-left transition-colors"
                            : "flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] px-2 py-1.5 text-left transition-colors hover:bg-white/[0.05]"
                        }
                      >
                        <span
                          className={
                            isActive
                              ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-[10px] font-extrabold text-[#061A2E]"
                              : isCompleted
                                ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A54] text-[10px] font-bold text-[#FFD100]"
                                : "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#172B40] text-[10px] font-bold text-[#94A3B8]"
                          }
                        >
                          {item.step}
                        </span>

                        <span
                          className={
                            isActive
                              ? "truncate text-[11px] font-bold text-white"
                              : "truncate text-[11px] font-medium text-[#CBD5E1]"
                          }
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </aside>

            {/* Bottom Left Specialist Card */}
            <div className="overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-white shadow-[0_4px_14px_rgba(8,28,46,0.04)]">
              <div className="h-[106px] w-full overflow-hidden bg-[#1D2430]">
                <img
                  src={SPECIALIST_CARD_DATA.imageSrc}
                  alt={SPECIALIST_CARD_DATA.imageAlt}
                  className="h-full w-full object-cover object-[56%_22%]"
                />
              </div>

              <div className="p-3.5">
                <h3 className="text-[11.5px] leading-[1.3] font-bold text-[#081C2E]">
                  {SPECIALIST_CARD_DATA.title}
                </h3>
                <p className="mt-1 text-[10px] leading-[1.42] font-normal text-[#64748B]">
                  {SPECIALIST_CARD_DATA.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Main Interactive Question Card */}
          <div className="flex min-h-[420px] flex-col justify-between rounded-[14px] border border-[#E6ECF2] bg-white p-6 shadow-[0_8px_24px_rgba(8,28,46,0.04)] sm:p-7 lg:col-span-9">
            <div>
              {/* Step Counter Eyebrow */}
              <p className="text-[9.5px] font-extrabold tracking-[0.08em] text-[#1D5B96] uppercase">
                STEP {currentStep} OF {totalSteps}
              </p>

              {/* Step 1: Request type */}
              {currentStep === 1 && (
                <div className="mt-1.5">
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    What would you like to do?
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-[1.45] font-normal text-[#64748B]">
                    This helps us send your request to the right specialist.
                  </p>

                  <p className="mt-4 text-[11px] leading-[1.25] font-bold text-[#081C2E]">
                    <span className="block">Choose</span>
                    <span className="block">one</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {REQUEST_TYPE_OPTIONS.map((option) => {
                      const isSelected = requestType === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setRequestType(option.id)}
                          className={
                            isSelected
                              ? "inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11px] font-bold text-white transition-colors"
                              : "inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-[6px] border border-[#DCE3EB] bg-white px-3.5 text-[11px] font-semibold text-[#1E293B] transition-colors hover:border-[#94A3B8] hover:bg-[#F8FAFC]"
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

              {/* Step 2: Your business */}
              {currentStep === 2 && (
                <div className="mt-1.5 space-y-4">
                  <div>
                    <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                      Tell us about your business
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                      Share your organisation name and role so we have context.
                    </p>
                  </div>

                  <div className="grid max-w-[520px] grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="req-business-name"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Business name
                      </label>
                      <input
                        id="req-business-name"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Severn & Co Ltd"
                        className="mt-1.5 h-[36px] w-full rounded-[6px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="req-user-role"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Your role (optional)
                      </label>
                      <input
                        id="req-user-role"
                        type="text"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        placeholder="e.g. Operations Manager"
                        className="mt-1.5 h-[36px] w-full rounded-[6px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {currentStep === 3 && (
                <div className="mt-1.5 space-y-4">
                  <div>
                    <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                      Who should we follow up with?
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                      We use your details solely to respond to this enquiry.
                    </p>
                  </div>

                  <div className="grid max-w-[540px] grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="req-contact-name"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Full name
                      </label>
                      <input
                        id="req-contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1.5 h-[36px] w-full rounded-[6px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="req-contact-email"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Work email
                      </label>
                      <input
                        id="req-contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@business.co.uk"
                        className="mt-1.5 h-[36px] w-full rounded-[6px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="req-contact-phone"
                        className="block text-[11.5px] font-bold text-[#081C2E]"
                      >
                        Phone number (optional)
                      </label>
                      <input
                        id="req-contact-phone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="0117 496 0190"
                        className="mt-1.5 h-[36px] w-full max-w-[250px] rounded-[6px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Services */}
              {currentStep === 4 && (
                <div className="mt-1.5">
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    Which services are you interested in?
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                    Select all that apply, or choose Not sure yet.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {SERVICE_OPTIONS.map((opt) => {
                      const active = selectedServices.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            toggleMulti(
                              opt.id,
                              selectedServices,
                              setSelectedServices,
                            )
                          }
                          className={
                            active
                              ? "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11px] font-bold text-white"
                              : "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#DCE3EB] bg-white px-3.5 text-[11px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Sites */}
              {currentStep === 5 && (
                <div className="mt-1.5">
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    How many business locations are involved?
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                    We assess availability and requirements site by site.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {SITE_COUNT_OPTIONS.map((opt) => {
                      const active = siteCount === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSiteCount(opt.id)}
                          className={
                            active
                              ? "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11px] font-bold text-white"
                              : "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#DCE3EB] bg-white px-3.5 text-[11px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 6: Postcodes */}
              {currentStep === 6 && (
                <div className="mt-1.5 space-y-3">
                  <div>
                    <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                      Site postcodes (if you have them handy)
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                      Optional — you can skip this if you do not have postcodes
                      yet.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={postcodes}
                    onChange={(e) => setPostcodes(e.target.value)}
                    placeholder="e.g. BS1 4DJ, SW1A 1AA"
                    className="h-[36px] w-full max-w-[380px] rounded-[6px] border border-[#DCE3EB] px-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                  />
                </div>
              )}

              {/* Step 7: Usage */}
              {currentStep === 7 && (
                <div className="mt-1.5">
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    How does your team use connectivity and calls?
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                    Select any that describe your typical day.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {USAGE_PROFILES.map((opt) => {
                      const active = selectedUsage.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            toggleMulti(opt.id, selectedUsage, setSelectedUsage)
                          }
                          className={
                            active
                              ? "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11px] font-bold text-white"
                              : "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#DCE3EB] bg-white px-3.5 text-[11px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 8: Existing services */}
              {currentStep === 8 && (
                <div className="mt-1.5">
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    What existing services or lines do you have?
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                    Helps identify number transfers or connected-device checks.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {EXISTING_SERVICE_OPTIONS.map((opt) => {
                      const active = selectedExisting.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            toggleMulti(
                              opt.id,
                              selectedExisting,
                              setSelectedExisting,
                            )
                          }
                          className={
                            active
                              ? "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3.5 text-[11px] font-bold text-white"
                              : "inline-flex h-[34px] cursor-pointer items-center rounded-[6px] border border-[#DCE3EB] bg-white px-3.5 text-[11px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 9: Timing & budget */}
              {currentStep === 9 && (
                <div className="mt-1.5 space-y-4">
                  <div>
                    <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                      Timing and optional budget guide
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                      Budget is optional and does not commit you to anything.
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-[#081C2E]">
                      Target timing
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TIMING_OPTIONS.map((opt) => {
                        const active = timing === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setTiming(opt.id)}
                            className={
                              active
                                ? "inline-flex h-[32px] cursor-pointer items-center rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3 text-[11px] font-bold text-white"
                                : "inline-flex h-[32px] cursor-pointer items-center rounded-[6px] border border-[#DCE3EB] bg-white px-3 text-[11px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                            }
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-[#081C2E]">
                      Budget range (optional)
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {BUDGET_OPTIONS.map((opt) => {
                        const active = budget === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setBudget(opt.id)}
                            className={
                              active
                                ? "inline-flex h-[32px] cursor-pointer items-center rounded-[6px] border border-[#061A2E] bg-[#061A2E] px-3 text-[11px] font-bold text-white"
                                : "inline-flex h-[32px] cursor-pointer items-center rounded-[6px] border border-[#DCE3EB] bg-white px-3 text-[11px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC]"
                            }
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 10: Other details */}
              {currentStep === 10 && (
                <div className="mt-1.5 space-y-3">
                  <div>
                    <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                      Anything else a specialist should know?
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                      Please do not include passwords, router settings, IP
                      configs or payment details.
                    </p>
                  </div>
                  <textarea
                    rows={4}
                    value={otherNotes}
                    onChange={(e) => setOtherNotes(e.target.value)}
                    placeholder="Share context about your sites, hours or questions..."
                    className="w-full max-w-[540px] rounded-[7px] border border-[#DCE3EB] p-3 text-[12px] text-[#081C2E] focus:border-[#061A2E] focus:outline-none"
                  />
                </div>
              )}

              {/* Step 11: Review */}
              {currentStep === 11 && (
                <div className="mt-1.5 space-y-3">
                  <div>
                    <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                      Review your request details
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-[1.45] text-[#64748B]">
                      Check your answers before moving to receipt confirmation.
                    </p>
                  </div>

                  <div className="rounded-[8px] border border-[#E6ECF2] bg-[#F8FAFC] p-4 text-[11.5px] leading-[1.6] text-[#334155]">
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Request type:
                      </strong>{" "}
                      {REQUEST_TYPE_OPTIONS.find((r) => r.id === requestType)
                        ?.label || "Not selected"}
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Business:
                      </strong>{" "}
                      {businessName || "Not provided"}
                      {userRole ? ` (${userRole})` : ""}
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Contact:
                      </strong>{" "}
                      {contactName || "Not provided"}
                      {contactEmail ? ` — ${contactEmail}` : ""}
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Sites:
                      </strong>{" "}
                      {SITE_COUNT_OPTIONS.find((s) => s.id === siteCount)
                        ?.label || "Not selected"}
                      {postcodes ? ` (${postcodes})` : ""}
                    </p>
                    <p>
                      <strong className="font-bold text-[#081C2E]">
                        Timing:
                      </strong>{" "}
                      {TIMING_OPTIONS.find((t) => t.id === timing)?.label ||
                        "Not selected"}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 12: Receipt */}
              {currentStep === 12 && (
                <div className="mt-1.5 space-y-3">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD100] text-[#061A2E]">
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-[17px] leading-[1.3] font-bold text-[#081C2E] sm:text-[18px]">
                    Request summary & receipt
                  </h3>
                  <p className="max-w-[540px] text-[11.5px] leading-[1.5] text-[#475569]">
                    Your request details are ready for specialist review.
                    Sending a request is not placing an order or a price
                    guarantee.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Divider & Navigation Row */}
            <div className="mt-10 flex items-center justify-between border-t border-[#E6ECF2] pt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={
                  currentStep === 1
                    ? "inline-flex h-[34px] cursor-not-allowed items-center gap-1.5 rounded-[6px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 text-[11px] font-semibold text-[#CBD5E1]"
                    : "inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[6px] border border-[#CBD5E1] bg-white px-3.5 text-[11px] font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                }
              >
                <ChevronLeft className="h-3.5 w-3.5 stroke-[2.2]" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex h-[36px] cursor-pointer items-center gap-2 rounded-[6px] bg-[#FFD100] px-4.5 text-[11.5px] font-bold text-[#081C2E] shadow-[0_3px_10px_rgba(255,209,0,0.25)] transition-colors hover:bg-[#FFE047]"
              >
                <span>
                  {currentStep === totalSteps ? "Finish" : "Continue"}
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

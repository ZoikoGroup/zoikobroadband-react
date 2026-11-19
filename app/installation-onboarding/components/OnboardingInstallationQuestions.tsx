"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";

interface InstallationFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const INSTALLATION_FAQ_ITEMS: readonly InstallationFaqItem[] = [
  {
    id: "keep-working-during-installation",
    question: "Can my team keep working during installation?",
    answer:
      "Usually, yes, though there may be a short interruption. Keep your current service running until your new one is tested.",
  },
  {
    id: "who-needs-to-be-there",
    question: "Who needs to be there?",
    answer:
      "An authorised site contact who can provide building access, show where equipment should go and make practical decisions on the day.",
  },
  {
    id: "do-i-need-landlord-permission",
    question: "Do I need landlord permission?",
    answer:
      "Some leased or shared premises need landlord or building owner approval before work or wayleaves can go ahead. We'll flag if approval is needed.",
  },
  {
    id: "will-engineer-need-to-drill",
    question: "Will an engineer need to drill?",
    answer:
      "Not every site needs drilling, particularly where existing ducting, sockets or fibre boxes are already in place. Where cabling or wall entry is needed, it's checked on site.",
  },
  {
    id: "when-will-service-be-live",
    question: "When will my service be live?",
    answer:
      "Your service is live only once installation, network activation and testing are complete and confirmed—not just when equipment arrives or is fitted.",
  },
  {
    id: "what-if-appointment-is-missed",
    question: "What if an appointment is missed?",
    answer:
      "We'll contact you to arrange a new visit. Your current status stays in place until a replacement appointment is confirmed.",
  },
  {
    id: "are-there-installation-charges",
    question: "Are there installation charges?",
    answer:
      "Charges depend on your order, service type and premises. Any applicable charges or extra works are set out before you agree.",
  },
  {
    id: "can-i-track-my-installation",
    question: "Can I track my installation?",
    answer:
      "Yes. Once you sign in to your account, you can view stage progress, who is acting next and when your status was last checked.",
  },
];

export default function OnboardingInstallationQuestions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(
    "keep-working-during-installation",
  );

  const filteredQuestions = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return INSTALLATION_FAQ_ITEMS;
    }
    return INSTALLATION_FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(trimmed) ||
        item.answer.toLowerCase().includes(trimmed),
    );
  }, [searchQuery]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="installation-questions"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Eyebrow, Heading, Search Input & Office Photo */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                12
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                QUESTIONS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-[390px]">
              Installation questions, answered.
            </h2>

            {/* Search Input */}
            <div className="relative mb-6">
              <label htmlFor="installation-faq-search" className="sr-only">
                Search installation questions
              </label>
              <Search
                className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="installation-faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search, e.g. landlord"
                className="w-full h-[44px] pl-10 pr-4 rounded-[10px] border border-[#CBD5E1] bg-white text-[#0B2241] placeholder:text-[#94A3B8] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-colors"
              />
            </div>

            {/* Office Image */}
            <div className="w-full aspect-[16/10.5] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_24px_rgba(11,34,65,0.08)]">
              <img
                src="/Images/onb/13.png"
                alt="Team member speaking on the phone at a desk in a busy office"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Expandable FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-[12px] transition-colors ${
                      isOpen
                        ? "bg-[#FFFDF5] border border-[#F5D97E]"
                        : "bg-white border border-[#E2E8F0]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-[#0B2241] text-[13.5px] font-bold leading-[1.35]">
                        {item.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-[#FFC119] text-[#0B2241]"
                            : "bg-[#FEF6D8] text-[#0B2241]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        )}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="px-5 pb-4 pt-0.5 pr-12">
                        <p className="text-[#64748B] text-[12.5px] leading-[1.55]">
                          {item.answer}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <div className="rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-center">
                <p className="text-[#0B2241] text-[13.5px] font-bold mb-1">
                  No matching questions found
                </p>
                <p className="text-[#64748B] text-[12.5px]">
                  Try searching for another term like &ldquo;landlord&rdquo;,
                  &ldquo;appointment&rdquo;, &ldquo;charges&rdquo; or
                  &ldquo;live&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

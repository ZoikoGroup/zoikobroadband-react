"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";

interface SupportFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const SUPPORT_FAQ_ITEMS: readonly SupportFaqItem[] = [
  {
    id: "how-do-i-report-a-fault",
    question: "How do I report a fault?",
    answer:
      "Use the fault form on this page, or call business support. You'll get a case reference once we confirm we've received it.",
  },
  {
    id: "how-long-will-a-repair-take",
    question: "How long will a repair take?",
    answer:
      "Repair or restoration times depend on your product, contract terms, site access, and whether third-party or network dependencies are involved.",
  },
  {
    id: "is-24-7-support-included",
    question: "Is 24/7 support included?",
    answer:
      "Support hours vary by plan and agreement—never assume 24/7 cover unless it is explicitly confirmed in your contract.",
  },
  {
    id: "whats-the-difference-between-response-and-repair-time",
    question: "What's the difference between response and repair time?",
    answer:
      "Response time is when we acknowledge and start investigating within your service hours, whereas repair or restoration time refers to bringing service back as set out in your terms.",
  },
  {
    id: "am-i-owed-a-service-credit",
    question: "Am I owed a service credit?",
    answer:
      "Service credits are not automatic—they depend on your written agreement, qualifying conditions, and how to request them under your contract.",
  },
  {
    id: "is-escalating-the-same-as-complaining",
    question: "Is escalating the same as complaining?",
    answer:
      "No. Escalating asks for more attention within your support case, while a formal complaint is a separate route with its own receipt and stages.",
  },
  {
    id: "can-i-use-adr",
    question: "Can I use ADR?",
    answer:
      "Independent ADR may be available for eligible small businesses once a complaint has gone through the required process or reached deadlock—eligibility is confirmed with you.",
  },
  {
    id: "what-if-my-fault-comes-back",
    question: "What if my fault comes back?",
    answer:
      "When a fault is marked resolved, you can confirm it's working or reopen the case with new details so we can continue looking into it.",
  },
];

export interface SupportQuestionsAnsweredProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
}

export default function SupportQuestionsAnswered({
  imageSrc = "/Images/onb/12.png",
  imageAlt = "Support advisor wearing a headset smiling at a computer workstation",
}: SupportQuestionsAnsweredProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(
    "how-do-i-report-a-fault",
  );

  const filteredQuestions = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return SUPPORT_FAQ_ITEMS;
    }
    return SUPPORT_FAQ_ITEMS.filter(
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
      id="support-questions-answered"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Step Badge, Heading, Search Input & Support Photo */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                11
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                QUESTIONS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-[500px]">
              Support questions, answered.
            </h2>

            {/* Search Input */}
            <div className="relative mb-6">
              <label htmlFor="support-faq-search" className="sr-only">
                Search support questions
              </label>
              <Search
                className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="support-faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search, e.g. complaint"
                className="w-full h-[44px] pl-10 pr-4 rounded-[10px] border border-[#E2E8F0] bg-white text-[#0B2241] placeholder:text-[#94A3B8] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-colors"
              />
            </div>

            {/* Support Advisor Photo */}
            <div className="w-full aspect-[16/10.5] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_24px_rgba(11,34,65,0.08)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
          </div>

          {/* Right Column: Expandable Support FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-[12px] transition-colors ${
                      isOpen
                        ? "bg-white border border-[#F5D97E] shadow-[0_4px_14px_rgba(11,34,65,0.03)]"
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
              <div className="rounded-[12px] border border-[#E2E8F0] bg-white p-6 text-center">
                <p className="text-[#0B2241] text-[13.5px] font-bold mb-1">
                  No matching questions found
                </p>
                <p className="text-[#64748B] text-[12.5px]">
                  Try searching for another term like &ldquo;complaint&rdquo;,
                  &ldquo;repair&rdquo;, &ldquo;credit&rdquo; or
                  &ldquo;ADR&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

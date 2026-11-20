"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";

interface ManagedFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const MANAGED_FAQ_ITEMS: readonly ManagedFaqItem[] = [
  {
    id: "what-is-a-managed-service",
    question: "What is a managed service?",
    answer:
      "A service where agreed parts of your network or estate are looked after for you, with clear ownership written into a contract.",
  },
  {
    id: "is-it-the-same-as-business-support",
    question: "Is it the same as business support?",
    answer:
      "No. Business support focuses on help when something goes wrong under agreed support terms, whereas a managed service covers ongoing care and operational tasks defined in your scope.",
  },
  {
    id: "which-services-can-you-manage",
    question: "Which services can you manage?",
    answer:
      "Areas discussed in a scope review—such as connectivity, voice, operations, security and governance—depend on what is verified and formally agreed in your contract.",
  },
  {
    id: "do-you-monitor-24-7",
    question: "Do you monitor 24/7?",
    answer:
      "Monitoring arrangements depend on what is verified and written into your service agreement—we never assume 24/7 or proactive monitoring unless confirmed.",
  },
  {
    id: "who-can-access-our-systems",
    question: "Who can access our systems?",
    answer:
      "Only authorised personnel or named third parties approved under least-privilege access rules, with logged activity and clear removal procedures.",
  },
  {
    id: "what-happens-to-our-data",
    question: "What happens to our data?",
    answer:
      "Service and operational data is handled under your contract, privacy notices and data terms, including clear rules for retention and exit.",
  },
  {
    id: "how-much-does-it-cost",
    question: "How much does it cost?",
    answer:
      "Costs depend on your scope, sites, estate size, support level and any separate works or add-ons—set out clearly before you agree.",
  },
  {
    id: "what-if-we-want-to-leave",
    question: "What if we want to leave?",
    answer:
      "Exit steps, notice periods, access removal and how data is returned or deleted are planned ahead and governed by your agreement.",
  },
];

export interface ManagedServicesQuestionsProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
}

export default function ManagedServicesQuestions({
  imageSrc = "/Images/mng/5.png",
  imageAlt = "Three colleagues reviewing service details together on a laptop",
}: ManagedServicesQuestionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(
    "what-is-a-managed-service",
  );

  const filteredQuestions = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return MANAGED_FAQ_ITEMS;
    }
    return MANAGED_FAQ_ITEMS.filter(
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
      id="managed-services-questions"
      className="w-full bg-[#FFF8E1] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Step Badge, Heading, Search Input & Team Photo */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                09
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                QUESTIONS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-[390px]">
              Managed services, answered.
            </h2>

            {/* Search Input */}
            <div className="relative mb-6">
              <label htmlFor="managed-faq-search" className="sr-only">
                Search managed service questions
              </label>
              <Search
                className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="managed-faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search, e.g. exit"
                className="w-full h-[44px] pl-10 pr-4 rounded-[10px] border border-[#E5D8A5] bg-white text-[#0B2241] placeholder:text-[#94A3B8] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-colors"
              />
            </div>

            {/* Team Image */}
            <div className="w-full aspect-[16/10.5] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_24px_rgba(11,34,65,0.08)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-[50%_20%]"
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
                        ? "bg-white border border-[#F5D97E] shadow-[0_4px_14px_rgba(11,34,65,0.03)]"
                        : "bg-white border border-[#F1E5B8]"
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
              <div className="rounded-[12px] border border-[#F1E5B8] bg-white p-6 text-center">
                <p className="text-[#0B2241] text-[13.5px] font-bold mb-1">
                  No matching questions found
                </p>
                <p className="text-[#64748B] text-[12.5px]">
                  Try searching for another term like &ldquo;exit&rdquo;,
                  &ldquo;access&rdquo;, &ldquo;data&rdquo; or
                  &ldquo;support&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

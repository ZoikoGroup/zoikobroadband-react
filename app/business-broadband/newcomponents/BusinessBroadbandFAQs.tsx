"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, ArrowRight } from "lucide-react";

const BUSINESS_FAQ_ITEMS = [
  {
    question: "Is business broadband available at my address?",
    answer:
      "It depends on the connection at your exact premises. Enter your postcode and choose your business address to see eligible plans — availability varies by location, so a postcode alone isn’t enough.",
  },
  {
    question:
      "What’s the difference between full fibre and part fibre for business?",
    answer:
      "Full fibre (FTTP) brings a dedicated fibre optic line directly to your business premises for maximum speeds and reliability. Part fibre (SOGEA) uses fibre to the cabinet and a copper pair for the final connection to your building.",
  },
  {
    question: "Are prices shown with or without VAT?",
    answer:
      "Business plan prices are displayed excluding VAT and on the same basis across all options so you can compare like with like accurately.",
  },
  {
    question: "Can I get a static IP address?",
    answer:
      "Yes, static IP options are available on selected business plans or as an add-on depending on your chosen package and network availability.",
  },
  {
    question: "What are the setup and installation steps?",
    answer:
      "Setup depends on your premises and whether an engineer visit is required for full fibre or SOGEA activation. We coordinate pre-order readiness and equipment delivery clearly.",
  },
  {
    question: "What contract terms and support apply?",
    answer:
      "Business plans typically feature 24-month terms with dedicated UK-based support channels and response commitments tailored to your service level.",
  },
] as const;

export default function BusinessBroadbandFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HELP &amp; ANSWERS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight leading-tight">
            Business broadband, answered
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: CTA Card & Image */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            {/* Dark Blue Card */}
            <div className="relative rounded-3xl bg-[#0A3A66] p-8 text-white overflow-hidden shadow-lg">
              <div
                className="pointer-events-none absolute -top-16 -right-12 w-52 h-52 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold text-white mb-2.5 relative z-10">
                Not sure where to start?
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6 relative z-10">
                Check your address to see the plans you can actually get, then
                compare up to three side by side. Checking never creates an
                order.
              </p>
              <Link
                href="#your-address"
                className="relative z-10 inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3 rounded-xl transition-colors group"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image Card */}
            <div className="relative w-full h-[300px] sm:h-[340px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/Images/business/2.png"
                alt="Business owners reviewing broadband plans together on a laptop at a wooden table with boxes in the background"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {BUSINESS_FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`relative bg-white border rounded-2xl transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#F0B429] ring-1 ring-[#F0B429] border-l-4 shadow-xs"
                      : "border-gray-200/90 hover:border-gray-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0E2F52]">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#0A3A66] text-white"
                          : "bg-[#EFF6FF] text-[#0E2F52]"
                      }`}
                    >
                      {isOpen ? (
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

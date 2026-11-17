"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, ArrowRight } from "lucide-react";

const PART_FIBRE_FAQ_ITEMS = [
  {
    question: "What is SOGEA broadband?",
    answer:
      "SOGEA (Part Fibre) uses fibre to a local street cabinet and an existing copper connection for the final section to your property. It provides broadband access without a traditional analogue phone line.",
  },
  {
    question: "Is Part Fibre the same as Full Fibre?",
    answer:
      "No. Part Fibre uses a copper segment for the final stretch to your property, whereas Full Fibre (FTTP) runs fibre all the way inside your premises for higher maximum speeds.",
  },
  {
    question: "Does SOGEA need a landline phone service?",
    answer:
      "No, SOGEA provides standalone broadband access without requiring a traditional phone line. If you need voice calling, digital voice services can be added separately.",
  },
  {
    question: "How are speeds estimated?",
    answer:
      "Speeds are estimated based on your exact property location, line length from the street cabinet, and copper quality. Real-world speeds may vary.",
  },
  {
    question: "How do I check SOGEA at my address?",
    answer:
      "Enter your UK postcode at the top of the page and select your exact address to see live availability, confirmed speeds, and pricing for your property.",
  },
] as const;

export default function PartFibreFAQs() {
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
            Part Fibre (SOGEA) FAQs
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
                Is SOGEA right for your home?
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6 relative z-10">
                Check your address to see whether Part Fibre is available and
                what Full Fibre options exist too. Checking never creates an
                order.
              </p>
              <Link
                href="#check-availability"
                className="relative z-10 inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3 rounded-xl transition-colors group"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image Card */}
            <div className="relative w-full h-[300px] sm:h-[340px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/Images/part/2.png"
                alt="Woman working on a laptop at a table in a bright room"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {PART_FIBRE_FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`relative bg-white border rounded-2xl transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#F0B429] border-l-4 ring-1 ring-[#F0B429] shadow-xs"
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

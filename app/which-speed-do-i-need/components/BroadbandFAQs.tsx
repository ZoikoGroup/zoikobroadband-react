"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Which broadband speed do I need?",
    answer:
      "It depends on how many people use the internet at once and what they do — streaming, video calls, gaming or uploading large files. Rather than counting devices, think about what happens at the same time. Use the speed finder above for tailored guidance, then check what is available at your address.",
  },
  {
    question: "What is the difference between download and upload speed?",
    answer:
      "Download speed measures how quickly your devices receive data from the internet, such as loading web pages, streaming video, or downloading files. Upload speed measures how quickly your devices send data to the internet, which is crucial for smooth video calls, cloud backups, and sending large files.",
  },
  {
    question: "Does my Wi-Fi affect my speed?",
    answer:
      "Yes. While your line speed is the speed reaching your home router, your actual Wi-Fi speed can be reduced by thick walls, distance from the router, electronic interference, and how many devices are connected simultaneously. Testing via a wired Ethernet cable gives the clearest reading of your true line speed.",
  },
  {
    question: "Can I get Zoiko Broadband at my address?",
    answer:
      "Broadband availability and top speeds depend on the network infrastructure installed at your specific property. You can use our postcode and address checker to see the exact packages, estimated speeds, and pricing available at your home.",
  },
  {
    question:
      "What is the difference between full fibre (FTTP) and part fibre (SOGEA)?",
    answer:
      "Full fibre (FTTP — Fibre to the Premises) delivers fibre-optic cables directly into your home for faster, more reliable speeds. Part fibre (SOGEA — Single Order Generic Ethernet Access) uses fibre to the street cabinet and traditional copper wiring for the final stretch into your property.",
  },
  {
    question: "How do I switch my broadband to Zoiko?",
    answer:
      "Switching is straightforward. Once you check your address and choose your package, our team handles the transfer process with your existing provider through the One Touch Switch system—keeping downtime to a minimum and guiding you every step of the way.",
  },
] as const;

export default function BroadbandFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
            <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase">
              HELP & ANSWERS
            </span>
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
          </div>
          <h1 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-4 leading-tight">
            Common questions about broadband speed
          </h1>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Support Card & Image */}
          <div className="lg:col-span-5 space-y-8">
            {/* Help Card */}
            <div className="bg-[#0A3A66] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
              <h3 className="text-xl font-bold mb-3">Still have a question?</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                Our UK-based team can help you understand your options before
                and after you join.
              </p>
              <Link
                href="/help-centre"
                className="inline-flex items-center justify-center bg-[#f59e0b] hover:bg-amber-500 text-[#0E2F52] font-bold text-sm px-5 py-3 rounded-xl transition-colors group"
              >
                <span>Visit the Help Centre</span>
                <span className="ml-1.5 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Illustration / Image */}
            <div className="relative w-full h-[320px] sm:h-[360px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/Images/speed/2.png"
                alt="Woman using laptop and broadband router"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`bg-white border rounded-3xl transition-all ${
                    isOpen
                      ? "border-[#f59e0b] ring-1 ring-[#f59e0b]/50 shadow-sm"
                      : "border-gray-200/80 hover:border-gray-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <span className="font-bold text-base text-[#0E2F52] pr-4">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#0E2F52] text-white"
                          : "bg-gray-100 text-[#0E2F52]"
                      }`}
                    >
                      {isOpen ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

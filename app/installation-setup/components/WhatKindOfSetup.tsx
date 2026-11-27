import React from "react";
import Link from "next/link";
import { Home, ArrowUp, Clock } from "lucide-react";

const SETUP_TYPE_CARDS = [
  {
    icon: Home,
    title: "Home or business",
    description:
      "Home setups are usually simpler; business setups may involve extensions, equipment or multiple sites. Pick the one that fits.",
  },
  {
    icon: ArrowUp,
    title: "New, migrating or installed",
    description:
      "Setting up for the first time, moving from a traditional line, or already installed and checking it works \u2014 the next steps differ.",
  },
  {
    icon: Clock,
    title: "Already have an order?",
    description:
      "Check your installation status in your account \u2014 we won\u2019t look up order details from this page.",
    linkLabel: "Sign in to check status",
    linkHref: "/login",
  },
] as const;

export default function WhatKindOfSetup() {
  return (
    <section
      id="your-setup"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              YOUR SETUP
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What kind of setup is this?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The steps differ by place and stage. This is to point you the right
            way — it doesn&apos;t look up your account.
          </p>
        </div>

        {/* 3-Column Setup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SETUP_TYPE_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {card.description}
                    {"linkLabel" in card && card.linkLabel && card.linkHref && (
                      <>
                        {" "}
                        <Link
                          href={card.linkHref}
                          className="text-[#0A3A66] font-medium hover:underline transition-colors"
                        >
                          {card.linkLabel}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

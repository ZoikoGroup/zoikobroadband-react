"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function OnboardingHero() {
  return (
    <section className="w-full bg-[#061A33] py-14 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Copy & Actions Column */}
          <div className="lg:col-span-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#0F2A4A] border border-white/10 rounded-full pl-2 pr-3.5 py-1 mb-5">
              <span className="w-[18px] h-[18px] rounded-full bg-[#FFC119] text-[#0B2241] flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2.5L9.6 6.2L13.5 6.6L10.5 9.2L11.4 13.1L8 11L4.6 13.1L5.5 9.2L2.5 6.6L6.4 6.2L8 2.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="text-[#CBD5E1] text-[10.5px] font-bold tracking-[0.12em] uppercase">
                BUSINESS SERVICES · 01
              </span>
            </div>

            {/* Eyebrow */}
            <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3.5">
              INSTALLATION &amp; ONBOARDING
            </p>

            {/* Main Display Heading */}
            <h1 className="text-white text-[38px] sm:text-[46px] lg:text-[48px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-[520px]">
              Know what happens before your business broadband goes live.
            </h1>

            {/* Subtitle */}
            <p className="text-[#CBD5E1] text-[15px] leading-[1.6] max-w-[500px] mb-8">
              From preparing your site to confirming service activation, see the
              typical steps and what may be required for your premises.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 h-[44px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[13.5px] font-bold transition-colors"
              >
                <span>Review installation steps</span>
                <ArrowRight
                  className="w-4 h-4 stroke-[2.2]"
                  aria-hidden="true"
                />
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-transparent hover:bg-white/5 border border-white/35 text-white text-[13.5px] font-bold transition-colors"
              >
                Check business availability
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[16/10.5] rounded-[20px] overflow-hidden bg-[#1E293B] shadow-[0_16px_38px_rgba(0,0,0,0.28)]">
              <img
                src="/Images/onb/1.png"
                alt="Overhead view of hands holding a white wireless router over a wooden desk with tablet, smartphone, camera and tea"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

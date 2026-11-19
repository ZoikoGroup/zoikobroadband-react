"use client";

import React, { useState } from "react";
import { Activity, MapPin, Check } from "lucide-react";

export default function BusinessFibreHero() {
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full font-sans antialiased">
      {/* Upper Dark Navy Section */}
      <div className="bg-[#0B2241] pt-11 pb-24 md:pt-14 md:pb-28 relative overflow-x-clip">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6 relative z-10 pt-1">
              <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3.5">
                BUSINESS CONNECTIVITY
              </p>

              <h1 className="text-white text-[42px] sm:text-[48px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5">
                <span className="block">Business Full Fibre</span>
                <span className="inline-block bg-[#FFC119] text-[#0B2241] px-3 py-0.5 rounded-[8px] -rotate-[1.5deg] mt-1.5 shadow-sm">
                  (FTTP)
                </span>
              </h1>

              <p className="text-[#D8E1EC] text-[16.5px] leading-[1.55] max-w-[470px] mb-8">
                Check whether full fibre is available at your business address
                and review suitable options.
              </p>

              {/* Postcode Search Card */}
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[16px] p-6 sm:p-7 shadow-[0_14px_30px_rgba(0,0,0,0.18)] max-w-[520px] mb-5"
              >
                <label
                  htmlFor="business-postcode"
                  className="block text-[#0B2241] text-[13px] font-bold mb-2"
                >
                  Business postcode
                </label>

                <input
                  id="business-postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full h-[46px] px-4 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[15px] focus:outline-none focus:border-[#1D63DC] focus:ring-2 focus:ring-[#1D63DC]/20 transition-all"
                />

                <p className="text-[#64748B] text-[12px] mt-2 mb-4">
                  Enter the postcode for the site you want to connect.
                </p>

                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#FFC119] hover:bg-[#F5B60A] active:scale-[0.99] text-[#0B2241] text-[14.5px] font-bold rounded-[8px] transition-all cursor-pointer"
                >
                  Check Availability
                </button>
              </form>

              {/* Secondary CTA Link */}
              <div className="mb-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] border border-[#8FA3BF]/60 hover:border-white text-white text-[14px] font-semibold transition-colors"
                >
                  Speak to a Business Specialist
                </a>
              </div>

              <p className="text-[#8FA3BF] text-[12px]">
                Availability depends on your premises and final eligibility
                checks.
              </p>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end pt-2 lg:pt-6">
              <div className="relative w-full max-w-[465px]">
                {/* Top-Left Green Circle */}
                <div
                  aria-hidden="true"
                  className="w-[80px] h-[80px] rounded-full bg-[#24D694] absolute -top-10 -left-16 z-0 hidden sm:block"
                />

                {/* Offset Royal Blue Card Backing */}
                <div
                  aria-hidden="true"
                  className="w-full h-full bg-[#1963DD] rounded-[24px] absolute top-5 left-5 z-0"
                />

                {/* Main Image Container */}
                <div className="relative z-10 rounded-[22px] border-[2px] border-white/95 overflow-hidden bg-[#1E293B] shadow-2xl aspect-[1/1.02]">
                  <img
                    src="/Images/fttp/1.png"
                    alt="Business Full Fibre office connectivity"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Floating Pill: Fibre in */}
                <div className="absolute top-6 -left-5 sm:-left-6 z-20 bg-white rounded-full px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.16)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFC119]" />
                  <span className="text-[#0B2241] text-[12px] font-bold leading-none">
                    Fibre in
                  </span>
                </div>

                {/* Floating Pill: ONT */}
                <div className="absolute top-[37%] -right-3 sm:-right-4 z-20 bg-white rounded-full px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.16)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#24D694]" />
                  <span className="text-[#0B2241] text-[12px] font-bold leading-none">
                    ONT
                  </span>
                </div>

                {/* Floating Pill: Router */}
                <div className="absolute -bottom-3.5 left-5 sm:left-6 z-20 bg-white rounded-full px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.16)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF885B]" />
                  <span className="text-[#0B2241] text-[12px] font-bold leading-none">
                    Router
                  </span>
                </div>

                {/* Decorative Coral Pill Below Image */}
                <div
                  aria-hidden="true"
                  className="w-[126px] h-[24px] rounded-full bg-[#FF885B] absolute -bottom-16 -left-4 z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Light Feature Cards Section */}
      <div className="bg-[#FAFBFD]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Amber */}
            <div className="bg-[#FFC119] rounded-[14px] p-5 sm:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center shrink-0 mt-0.5">
                <Activity
                  className="w-4 h-4 text-[#0B2241]"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h2 className="text-[#0B2241] text-[14.5px] font-bold leading-[1.3] mb-1.5">
                  Fibre to your premises
                </h2>
                <p className="text-[#0B2241]/85 text-[12.5px] leading-[1.45]">
                  A fibre connection that reaches your building.
                </p>
              </div>
            </div>

            {/* Card 2: Mint Green */}
            <div className="bg-[#24D694] rounded-[14px] p-5 sm:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-[#0B2241]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="9" width="16" height="6" rx="3" />
                </svg>
              </div>
              <div>
                <h2 className="text-[#0B2241] text-[14.5px] font-bold leading-[1.3] mb-1.5">
                  ONT plus router
                </h2>
                <p className="text-[#0B2241]/85 text-[12.5px] leading-[1.45]">
                  Equipment inclusions confirmed per offer.
                </p>
              </div>
            </div>

            {/* Card 3: Sky Blue */}
            <div className="bg-[#88B8FF] rounded-[14px] p-5 sm:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#0B2241]" strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="text-[#0B2241] text-[14.5px] font-bold leading-[1.3] mb-1.5">
                  Address-specific
                </h2>
                <p className="text-[#0B2241]/85 text-[12.5px] leading-[1.45]">
                  Results apply to the exact premises you select.
                </p>
              </div>
            </div>

            {/* Card 4: Coral Orange */}
            <div className="bg-[#FF885B] rounded-[14px] p-5 sm:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-[#0B2241]" strokeWidth={2.4} />
              </div>
              <div>
                <h2 className="text-[#0B2241] text-[14.5px] font-bold leading-[1.3] mb-1.5">
                  Costs before you commit
                </h2>
                <p className="text-[#0B2241]/85 text-[12.5px] leading-[1.45]">
                  Price, VAT basis and term shown before you select.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

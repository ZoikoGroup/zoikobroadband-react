"use client";

import React from "react";

export default function CyberSuspectedIncident() {
  return (
    <section className="w-full bg-[#FF885B] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6">
            <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              SUSPECTED INCIDENT
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-4">
              Need help right now?
            </h2>

            <p className="text-[#0B2241]/85 text-[15px] leading-[1.6] max-w-[470px] mb-7">
              Use the support route, not the sales form. Never send passwords,
              logs or sensitive files through a web form. No round-the-clock
              response is promised unless confirmed in your contract.
            </p>

            {/* Stacked Action Buttons */}
            <div className="flex flex-col items-start gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-[#0B2241] hover:bg-[#143563] text-white text-[13.5px] font-bold transition-colors"
              >
                See safe immediate guidance
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-white hover:bg-[#F8FAFC] border border-[#0B2241] text-[#0B2241] text-[13.5px] font-bold transition-colors"
              >
                Business support channels
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] aspect-[16/9.5] rounded-[18px] overflow-hidden bg-[#E2E8F0]">
              <img
                src="/Images/cyber/9.png"
                alt="Hands holding a wireless router over an office desk with laptops"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[18px] border-[1.5px] border-dashed border-[#4B7FD6]/80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";

export default function SupportSlas() {
  return (
    <section className="w-full bg-[#0B2241] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Image Column */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden bg-[#1E293B]">
              <img
                src="/Images/fttp/7.png"
                alt="Connecting router and cables for business support setup"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[18px] border-[1.5px] border-dashed border-[#4B7FD6]/80"
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-6">
            <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              SUPPORT &amp; SLAS
            </p>

            <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-4 max-w-[440px]">
              Support you can rely on, stated plainly
            </h2>

            <p className="text-[#CBD5E1] text-[15px] leading-[1.6] max-w-[460px] mb-7">
              Support channels, hours and any service commitments are shown only
              when they are confirmed for your plan. Where something is not
              confirmed, we say so.
            </p>

            <a
              href="/business-support"
              className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-white text-[13.5px] font-bold transition-colors"
            >
              Business Support &amp; SLAs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

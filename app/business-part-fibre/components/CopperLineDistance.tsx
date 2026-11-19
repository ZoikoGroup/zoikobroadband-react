"use client";

import React from "react";

export default function CopperLineDistance() {
  return (
    <section className="w-full bg-[#E6EEFC] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Chart Card Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="w-full max-w-[540px] bg-[#FAFBFD] rounded-[20px] p-6 sm:p-8 shadow-[0_6px_24px_rgba(11,34,65,0.04)] border border-white/80">
              <div className="w-full overflow-x-auto">
                <svg
                  viewBox="0 0 460 190"
                  className="w-full h-auto min-w-[340px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Graph showing speed decreasing over a longer copper line"
                >
                  {/* Y-axis label: Speed */}
                  <text
                    x="18"
                    y="92"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="sans-serif"
                    transform="rotate(-90 18 92)"
                  >
                    Speed
                  </text>

                  {/* Vertical Axis */}
                  <line
                    x1="44"
                    y1="22"
                    x2="44"
                    y2="152"
                    stroke="#0B2241"
                    strokeWidth="1.6"
                  />

                  {/* Horizontal Axis */}
                  <line
                    x1="44"
                    y1="152"
                    x2="436"
                    y2="152"
                    stroke="#0B2241"
                    strokeWidth="1.6"
                  />

                  {/* Descending Coral Curve */}
                  <path
                    d="M 44 46 C 145 55, 255 96, 434 143"
                    stroke="#FF885B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Point 1: Mint Green */}
                  <circle cx="96" cy="52" r="6.5" fill="#24D694" />

                  {/* Point 2: Amber Yellow */}
                  <circle cx="222" cy="84" r="6.5" fill="#FFC119" />

                  {/* Point 3: Royal Blue */}
                  <circle cx="384" cy="130" r="6.5" fill="#1963DD" />

                  {/* X-axis label: Longer copper line */}
                  <text
                    x="240"
                    y="176"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    Longer copper line
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Copy Column */}
          <div className="lg:col-span-6">
            <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              COPPER LINE AND DISTANCE
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] mb-4 max-w-[440px]">
              Your line matters more than the label
            </h2>

            <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[500px]">
              With copper, speeds generally fall the farther your premises are
              from the cabinet and can vary by line quality. Any speed shown is
              an estimate for your address, never a guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

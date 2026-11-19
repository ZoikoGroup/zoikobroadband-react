"use client";

import React from "react";

export default function WhatIsSogea() {
  return (
    <section className="w-full bg-[#FDF1C7] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-6 pt-1">
            <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              HOW IT WORKS
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[38px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-5">
              What is Part Fibre (SOGEA)?
            </h2>

            <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[515px] mb-5">
              SOGEA stands for Single Order Generic Ethernet Access. It delivers
              broadband without a separate traditional phone line. Fibre runs to
              a street cabinet, and the remaining link to your premises uses
              existing copper.
            </p>

            <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[515px] mb-7">
              It is different from Full Fibre (FTTP), where fibre reaches the
              premises. If FTTP is available at your site, you can compare both.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#"
                aria-label="Business Full Fibre (FTTP)"
                className="inline-flex items-center justify-center px-6 h-[44px] bg-[#0B2241] hover:bg-[#143563] text-[#0B2241]/0 select-none text-[13.5px] font-bold rounded-[8px] transition-colors"
              >
                Business Full Fibre (FTTP)
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center px-6 h-[44px] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[13.5px] font-bold rounded-[8px] border border-[#0B2241] transition-colors"
              >
                Business Broadband Plans
              </a>
            </div>
          </div>

          {/* Right Schematic Card Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[540px] bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_6px_24px_rgba(11,34,65,0.04)] border border-[#E2E8F0]/80">
              {/* Schematic Vector Diagram */}
              <div className="w-full overflow-x-auto">
                <svg
                  viewBox="0 0 470 165"
                  className="w-full h-auto min-w-[360px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="SOGEA Network via Fibre to Cabinet and Copper to Premises schematic diagram"
                >
                  {/* Top Labels: Fibre & Copper */}
                  <text
                    x="130"
                    y="28"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    Fibre
                  </text>

                  <text
                    x="306"
                    y="45"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    Copper
                  </text>

                  {/* Dotted Mint Green Connector: Network to Cabinet */}
                  <line
                    x1="92"
                    y1="82"
                    x2="168"
                    y2="82"
                    stroke="#24D694"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="1 9"
                  />

                  {/* Wavy Coral Orange Connector: Cabinet to Premises */}
                  <path
                    d="M 232 82 C 254 58, 276 58, 298 82 C 320 106, 342 106, 364 82"
                    stroke="#FF885B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Network Box */}
                  <rect
                    x="14"
                    y="55"
                    width="78"
                    height="54"
                    rx="9"
                    fill="#0B2241"
                  />
                  <text
                    x="53"
                    y="86"
                    textAnchor="middle"
                    fill="#FFC119"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    Network
                  </text>

                  {/* Cabinet Box */}
                  <rect
                    x="168"
                    y="43"
                    width="64"
                    height="78"
                    rx="9"
                    fill="#24D694"
                  />
                  <text
                    x="200"
                    y="86"
                    textAnchor="middle"
                    fill="#0B2241"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    Cabinet
                  </text>

                  {/* Premises Box */}
                  <rect
                    x="364"
                    y="49"
                    width="88"
                    height="66"
                    rx="9"
                    fill="#FFC119"
                  />
                  <text
                    x="408"
                    y="86"
                    textAnchor="middle"
                    fill="#0B2241"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    Premises
                  </text>
                </svg>
              </div>

              <p className="text-center text-[#64748B] text-[12px] mt-3">
                Generic schematic, not a specific equipment model
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

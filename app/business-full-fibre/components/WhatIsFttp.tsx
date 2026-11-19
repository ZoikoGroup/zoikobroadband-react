"use client";

import React from "react";

export default function WhatIsFttp() {
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
              What is full fibre to the premises?
            </h2>

            <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[495px] mb-5">
              With FTTP, a fibre optic connection reaches your premises.
              Equipment commonly includes an ONT, which connects to a router
              that serves your office network.
            </p>

            <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[495px] mb-7">
              FTTP is different from Part Fibre (SOGEA) and from a leased line,
              which is a separate class of connectivity with its own product
              details.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 h-[44px] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[13.5px] font-bold rounded-[8px] border border-[#0B2241] transition-colors"
              >
                Part Fibre (SOGEA)
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center px-5 h-[44px] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[13.5px] font-bold rounded-[8px] border border-[#0B2241] transition-colors"
              >
                Static IP Options
              </a>
            </div>
          </div>

          {/* Right Schematic Card Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[540px] bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_6px_24px_rgba(11,34,65,0.04)] border border-[#E2E8F0]/80">
              {/* Schematic Vector Diagram */}
              <div className="w-full overflow-x-auto">
                <svg
                  viewBox="0 0 470 156"
                  className="w-full h-auto min-w-[360px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="FTTP Network to ONT to Router schematic diagram"
                >
                  {/* Dotted Blue Connector: Network to ONT */}
                  <line
                    x1="86"
                    y1="78"
                    x2="152"
                    y2="78"
                    stroke="#1963DD"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="1 8"
                  />

                  {/* Solid Dark Connector: ONT to Router */}
                  <line
                    x1="226"
                    y1="78"
                    x2="262"
                    y2="78"
                    stroke="#0B2241"
                    strokeWidth="2.2"
                  />

                  {/* Branch Lines: Router to 3 Endpoint Boxes */}
                  <line
                    x1="336"
                    y1="78"
                    x2="364"
                    y2="78"
                    stroke="#0B2241"
                    strokeWidth="2"
                  />
                  <line
                    x1="364"
                    y1="78"
                    x2="394"
                    y2="34"
                    stroke="#0B2241"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="364"
                    y1="78"
                    x2="394"
                    y2="78"
                    stroke="#0B2241"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="364"
                    y1="78"
                    x2="394"
                    y2="122"
                    stroke="#0B2241"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Network Box */}
                  <rect
                    x="12"
                    y="49"
                    width="74"
                    height="58"
                    rx="9"
                    fill="#0B2241"
                  />
                  <text
                    x="49"
                    y="82"
                    textAnchor="middle"
                    fill="#FFC119"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    Network
                  </text>

                  {/* ONT Box */}
                  <rect
                    x="152"
                    y="49"
                    width="74"
                    height="58"
                    rx="9"
                    fill="#1963DD"
                  />
                  <text
                    x="189"
                    y="82"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    ONT
                  </text>

                  {/* Router Box */}
                  <rect
                    x="262"
                    y="49"
                    width="74"
                    height="58"
                    rx="9"
                    fill="#FFC119"
                  />
                  <text
                    x="299"
                    y="82"
                    textAnchor="middle"
                    fill="#0B2241"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    Router
                  </text>

                  {/* Right Endpoint Box 1 */}
                  <rect
                    x="394"
                    y="19"
                    width="64"
                    height="30"
                    rx="6"
                    fill="#EBF1FA"
                    stroke="#0B2241"
                    strokeWidth="1.5"
                  />

                  {/* Right Endpoint Box 2 */}
                  <rect
                    x="394"
                    y="63"
                    width="64"
                    height="30"
                    rx="6"
                    fill="#EBF1FA"
                    stroke="#0B2241"
                    strokeWidth="1.5"
                  />

                  {/* Right Endpoint Box 3 */}
                  <rect
                    x="394"
                    y="107"
                    width="64"
                    height="30"
                    rx="6"
                    fill="#EBF1FA"
                    stroke="#0B2241"
                    strokeWidth="1.5"
                  />
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

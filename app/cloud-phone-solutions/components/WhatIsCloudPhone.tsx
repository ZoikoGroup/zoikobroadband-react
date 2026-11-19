import React from "react";
import { AlertTriangle, Cloud, PhoneCall, ArrowLeftRight } from "lucide-react";

const SECTION_DATA = {
  badge: "THE BASICS",
  headingLine1: "What is a cloud phone",
  headingLine2: "solution?",
  description:
    "A cloud phone solution lets your team make and receive business calls over the internet, on desk phones, computers or mobiles, managed online instead of through on-site equipment.",
  warningPrefix: "It depends on your internet connection and power.",
  warningBody:
    " If either fails, calls may not work, including emergency calls, unless a backup has been arranged and confirmed with you.",
  diagramCaption:
    "A simplified example of how calls flow. Your actual setup is designed with you.",
  cards: [
    {
      id: "cloud-phone-system",
      icon: "cloud",
      title: "Cloud phone system",
      description:
        "Your business phone system runs on a provider's servers instead of a box in your office. Calls travel over your internet connection.",
    },
    {
      id: "voip",
      icon: "phone",
      title: "VoIP",
      description:
        "The technology that carries voice calls over the internet. A cloud phone system uses VoIP.",
    },
    {
      id: "digital-line",
      icon: "transfer",
      title: "Digital line",
      description:
        "A single phone line delivered digitally, often replacing an old copper (PSTN) line. Simpler than a full cloud phone system.",
    },
  ],
} as const;

export default function WhatIsCloudPhone() {
  return (
    <section
      aria-labelledby="what-is-cloud-phone-heading"
      className="w-full bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Top Two-Column Area: Left Copy + Warning | Right Call Flow Diagram */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {SECTION_DATA.badge}
              </span>
            </div>

            <h2
              id="what-is-cloud-phone-heading"
              className="mt-3.5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[42px] lg:text-[44px]"
            >
              <span className="block">{SECTION_DATA.headingLine1}</span>
              <span className="block">{SECTION_DATA.headingLine2}</span>
            </h2>

            <p className="mt-4 max-w-[540px] text-[14px] leading-[1.58] font-normal text-[#475569] sm:text-[14.5px]">
              {SECTION_DATA.description}
            </p>

            {/* Amber Warning Callout */}
            <div
              role="note"
              className="mt-5 flex max-w-[545px] items-start gap-2.5 rounded-[8px] border border-[#F5E09B] bg-[#FFFBEB] px-4 py-3.5"
            >
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B48219] stroke-[2.2]" />
              <p className="text-[12.5px] leading-[1.5] text-[#6B5319]">
                <strong className="font-bold text-[#5A4310]">
                  {SECTION_DATA.warningPrefix}
                </strong>
                {SECTION_DATA.warningBody}
              </p>
            </div>
          </div>

          {/* Right Column: Simplified Call Flow Diagram Box */}
          <div className="lg:col-span-6">
            <div className="rounded-[12px] border border-[#E6ECF2] bg-[#F4F7FA] p-5 sm:p-6">
              <div className="relative mx-auto max-w-[540px] py-2">
                <div className="grid grid-cols-12 items-center gap-2 sm:gap-3">
                  {/* Left Endpoints Column */}
                  <div className="col-span-4 flex flex-col gap-3.5">
                    <div className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11px] font-bold text-[#0F2337] shadow-[0_1px_2px_rgba(15,35,55,0.04)] sm:text-[11.5px]">
                      Desk phones
                    </div>
                    <div className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11px] font-bold text-[#0F2337] shadow-[0_1px_2px_rgba(15,35,55,0.04)] sm:text-[11.5px]">
                      Computers
                    </div>
                    <div className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11px] font-bold text-[#0F2337] shadow-[0_1px_2px_rgba(15,35,55,0.04)] sm:text-[11.5px]">
                      Mobiles
                    </div>
                  </div>

                  {/* Connector Lines: Endpoints -> Business Internet */}
                  <div className="col-span-2 flex h-[142px] items-center justify-center">
                    <svg
                      viewBox="0 0 80 142"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 19C26 19 22 71 54 71"
                        stroke="#1E4E79"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                      <line
                        x1="0"
                        y1="71"
                        x2="54"
                        y2="71"
                        stroke="#1E4E79"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 123C26 123 22 71 54 71"
                        stroke="#1E4E79"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Center Navy Box: Business Internet + Right Connector + Cloud + Public Network */}
                  <div className="col-span-6 flex flex-col items-center">
                    <div className="flex w-full items-center">
                      <div className="flex h-[68px] w-[104px] shrink-0 flex-col items-center justify-center rounded-[8px] bg-[#164A75] px-2 text-center text-[11px] leading-[1.25] font-bold text-white shadow-[0_4px_10px_rgba(22,74,117,0.18)] sm:w-[114px] sm:text-[11.5px]">
                        <span>Business</span>
                        <span>internet</span>
                      </div>

                      {/* Horizontal connector from Business internet to Cloud */}
                      <svg
                        viewBox="0 0 36 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[16px] w-7 shrink-0 sm:w-9"
                        aria-hidden="true"
                      >
                        <line
                          x1="0"
                          y1="8"
                          x2="36"
                          y2="8"
                          stroke="#1E4E79"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Yellow Cloud Shape: Cloud phone system */}
                      <div className="relative flex h-[74px] flex-1 items-center justify-center">
                        <svg
                          viewBox="0 0 132 76"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-full w-full"
                          aria-hidden="true"
                        >
                          <path
                            d="M33 66H98C113.464 66 126 53.464 126 38C126 23.385 114.812 11.384 100.51 10.115C95.443 4.022 87.848 0 79.333 0C67.749 0 58.027 7.105 53.952 17.169C50.742 15.774 47.197 15 43.474 15C29.404 15 18 26.404 18 40.474C18 41.351 18.044 42.218 18.131 43.073C11.984 45.207 7.5 51.057 7.5 57.947C7.5 62.394 9.373 66 14 66H33Z"
                            fill="#FFD100"
                          />
                        </svg>
                        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-2 text-center text-[10.5px] leading-[1.2] font-extrabold text-[#081C2E] sm:text-[11px]">
                          <span>Cloud phone</span>
                          <span>system</span>
                        </span>
                      </div>
                    </div>

                    {/* Angled connector from Cloud down to Public phone network */}
                    <div className="flex w-full justify-end pr-6 sm:pr-8">
                      <svg
                        viewBox="0 0 28 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-6"
                        aria-hidden="true"
                      >
                        <line
                          x1="6"
                          y1="2"
                          x2="22"
                          y2="30"
                          stroke="#1E4E79"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Bottom Dark Pill: Public phone network */}
                    <div className="flex w-full justify-end">
                      <div className="flex h-[34px] w-[142px] items-center justify-center rounded-[6px] bg-[#061A2E] px-3 text-[10.5px] font-bold text-white sm:w-[154px] sm:text-[11px]">
                        Public phone network
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[10.5px] leading-[1.4] font-normal text-[#64748B]">
                {SECTION_DATA.diagramCaption}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom 3-Card Row */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {SECTION_DATA.cards.map((card) => (
            <div
              key={card.id}
              className="rounded-[10px] border border-[#E6ECF2] bg-white p-5 shadow-[0_1px_3px_rgba(15,35,55,0.02)]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#EEF3F8] text-[#1D4ED8]">
                {card.icon === "cloud" && (
                  <Cloud className="h-4 w-4 text-[#1E5B8A] stroke-[2]" />
                )}
                {card.icon === "phone" && (
                  <PhoneCall className="h-4 w-4 text-[#1E5B8A] stroke-[2]" />
                )}
                {card.icon === "transfer" && (
                  <ArrowLeftRight className="h-4 w-4 text-[#1E5B8A] stroke-[2]" />
                )}
              </div>

              <h3 className="mt-3.5 text-[14.5px] leading-[1.3] font-bold text-[#081C2E]">
                {card.title}
              </h3>

              <p className="mt-1.5 text-[12px] leading-[1.52] font-normal text-[#5A6A7E]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

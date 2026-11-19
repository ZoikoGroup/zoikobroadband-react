"use client";

import React from "react";

interface GuidanceStep {
  readonly number: number;
  readonly title: string;
  readonly description: string;
}

const GUIDANCE_STEPS = [
  {
    number: 1,
    title: "Protect accounts",
    description:
      "Use multi-factor sign-in or passkeys and give people only the access they need.",
  },
  {
    number: 2,
    title: "Secure the network",
    description:
      "Keep a firewall on, separate guest Wi-Fi and change default settings.",
  },
  {
    number: 3,
    title: "Update devices",
    description: "Apply updates promptly and use malware protection.",
  },
  {
    number: 4,
    title: "Back up and test",
    description:
      "Keep backups apart from your main systems and test restoring them.",
  },
] as const satisfies readonly GuidanceStep[];

export default function CyberPracticalGuidance() {
  return (
    <section className="w-full bg-[#DCF6EA] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Numbered Guidance Steps */}
          <div className="lg:col-span-6">
            <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              PRACTICAL GUIDANCE
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] mb-4 max-w-[430px]">
              Simple steps that help, whatever you buy
            </h2>

            <p className="text-[#334155] text-[15px] leading-[1.55] max-w-[460px] mb-8">
              General good practice for small organizations. It is guidance, not
              a Zoiko service.
            </p>

            <ol className="divide-y divide-[#0B2241]/10 max-w-[490px]">
              {GUIDANCE_STEPS.map((step, index) => (
                <li
                  key={step.number}
                  className={`flex items-start gap-4 ${
                    index === 0
                      ? "pb-5"
                      : index === GUIDANCE_STEPS.length - 1
                        ? "pt-5"
                        : "py-5"
                  }`}
                >
                  <span className="w-[30px] h-[30px] rounded-full bg-[#FFC119] text-[#0B2241] text-[12.5px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#475569] text-[13.5px] leading-[1.5]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right Column: Router Setup Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] aspect-[1/1.02] rounded-[20px] overflow-hidden bg-[#E2E8F0] shadow-[0_10px_28px_rgba(11,34,65,0.06)]">
              <img
                src="/Images/cyber/7.png"
                alt="Connecting network cable into a wireless router"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[20px] border-[1.5px] border-dashed border-[#4B7FD6]/75"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

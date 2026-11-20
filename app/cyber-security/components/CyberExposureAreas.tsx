"use client";

import React from "react";

interface ExposureArea {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const EXPOSURE_AREAS = [
  {
    id: "accounts",
    title: "Accounts",
    description: "Weak or reused passwords and missing multi-factor sign-in.",
    imageSrc: "/Images/cyber/3.png",
    imageAlt: "Business user working at desk representing account security",
  },
  {
    id: "devices",
    title: "Devices",
    description: "Out-of-date laptops, phones and unmanaged equipment.",
    imageSrc: "/Images/cyber/4.png",
    imageAlt: "Laptop, smartphone and tablet representing business devices",
  },
  {
    id: "network",
    title: "Network",
    description: "Routers, Wi-Fi and open access that was never reviewed.",
    imageSrc: "/Images/cyber/5.png",
    imageAlt: "Connected network nodes over city skyline",
  },
  {
    id: "people",
    title: "People",
    description: "Phishing and scams that look like everyday messages.",
    imageSrc: "/Images/cyber/6.png",
    imageAlt: "Team members looking at mobile device together",
  },
] as const satisfies readonly ExposureArea[];

export default function CyberExposureAreas() {
  return (
    <section className="w-full bg-[#FDF1C7] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            WHERE BUSINESSES ARE EXPOSED
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            Four areas to look at first
          </h2>

          <p className="text-[#475569] text-[15.5px] leading-[1.55] max-w-[540px]">
            Most small-business risk sits in a few familiar places. Start with
            the one that worries you most.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {EXPOSURE_AREAS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[18px] p-4 sm:p-5 shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col"
            >
              <div className="relative w-full aspect-[16/11] rounded-[12px] overflow-hidden bg-[#E2E8F0] mb-5">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[12px] border-[1.5px] border-dashed border-[#4B7FD6]/75"
                />
              </div>

              <h3 className="text-[#0B2241] text-[16.5px] font-bold leading-[1.3] mb-2">
                {item.title}
              </h3>

              <p className="text-[#64748B] text-[13.5px] leading-[1.55]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

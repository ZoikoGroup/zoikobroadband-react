"use client";

import React from "react";

interface FitCardItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const FIT_ITEMS = [
  {
    id: "everyday-cloud-work",
    title: "Everyday cloud work",
    description: "Email, web apps and shared documents for small teams.",
    imageSrc: "/Images/sogea/2.png",
    imageAlt: "Everyday cloud work on laptop with cloud and email icons",
  },
  {
    id: "video-meetings",
    title: "Video meetings",
    description: "Calls and screen sharing, where upload speed also counts.",
    imageSrc: "/Images/sogea/3.png",
    imageAlt: "Team participating in video meeting on wall display",
  },
  {
    id: "single-site-offices",
    title: "Single-site offices",
    description: "One premises with a standard line and router.",
    imageSrc: "/Images/sogea/4.png",
    imageAlt: "Single-site office workspace with meeting room and pods",
  },
] as const satisfies readonly FitCardItem[];

export default function WherePartFibreFits() {
  return (
    <section className="w-full bg-[#1963DD] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            IS IT RIGHT FOR YOU?
          </p>

          <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            Where Part Fibre can fit
          </h2>

          <p className="text-[#DCE8FF] text-[15.5px] leading-[1.55] max-w-[590px]">
            Examples only. Real performance depends on your copper line,
            equipment and the plan available at your address.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {FIT_ITEMS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[18px] p-4 sm:p-5 shadow-[0_10px_28px_rgba(11,34,65,0.14)] flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#E2E8F0] mb-5">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[12px] border-[1.5px] border-dashed border-[#4B7FD6]/70"
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

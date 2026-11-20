"use client";

import React from "react";

interface UseCaseItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const USE_CASES = [
  {
    id: "cloud-collaboration",
    title: "Cloud collaboration",
    description: "Shared documents, cloud tools and team video meetings.",
    imageSrc: "/Images/fttp/2.png",
    imageAlt: "Cloud collaboration across team devices",
  },
  {
    id: "larger-file-transfers",
    title: "Larger file transfers",
    description:
      "Sending and backing up bigger files, where upload matters too.",
    imageSrc: "/Images/fttp/3.png",
    imageAlt: "Larger file transfers and data upload progress",
  },
  {
    id: "connected-office",
    title: "Connected office",
    description: "Many devices, systems and tills working on one site.",
    imageSrc: "/Images/fttp/4.png",
    imageAlt: "Connected office team working together",
  },
] as const satisfies readonly UseCaseItem[];

export default function EverydayBusinessUse() {
  return (
    <section className="w-full bg-[#1963DD] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            BUILT AROUND HOW YOU WORK
          </p>

          <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            Everyday business use
          </h2>

          <p className="text-[#DCE8FF] text-[15.5px] leading-[1.55] max-w-[560px]">
            Examples of where a fibre connection can help. Performance depends
            on your plan, equipment and setup.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {USE_CASES.map((item) => (
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

              <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-2">
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

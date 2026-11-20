"use client";

import React from "react";

interface BeforeVisitItem {
  readonly id: string;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const BEFORE_VISIT_ITEMS = [
  {
    id: "permissions-wayleaves",
    badge: "May be needed",
    title: "Permissions & wayleaves",
    description:
      "If your landlord or building owner must approve work, we'll tell you who needs to agree. Your answer can't replace their permission.",
    imageSrc: "/Images/onb/4.png",
    imageAlt: "City skyline with bridge and modern glass tower at dusk",
  },
  {
    id: "surveys",
    badge: "May be needed",
    title: "Surveys",
    description:
      "Some sites need an engineering survey before installation. A survey is a separate visit, and its outcome may change the plan.",
    imageSrc: "/Images/onb/5.png",
    imageAlt: "Colleague speaking on the phone at a desk in a busy office",
  },
  {
    id: "appointments",
    badge: "Only once confirmed",
    title: "Appointments",
    description:
      "A visit is only booked once it's confirmed. Until then, you'll see \"pending\", never a made-up date.",
    imageSrc: "/Images/onb/6.png",
    imageAlt: "Team members reviewing details together on a laptop",
  },
] as const satisfies readonly BeforeVisitItem[];

export default function OnboardingBeforeVisit() {
  return (
    <section
      id="before-the-visit"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              04
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              BEFORE THE VISIT
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[42px] font-extrabold leading-[1.13] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Permissions, surveys and appointments.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            What may happen before an engineer arrives, and how you&apos;ll
            know.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BEFORE_VISIT_ITEMS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[18px] overflow-hidden border border-[#E2E8F0] shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col"
            >
              {/* Card Image + Status Pill */}
              <div className="relative w-full h-[185px] sm:h-[200px] bg-[#1E293B] overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-3.5 left-3.5 inline-flex items-center px-3 py-1 rounded-full bg-[#FFC119] text-[#0B2241] text-[10.5px] font-extrabold leading-none shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-[#0B2241] text-[16.5px] font-bold leading-[1.3] mb-2">
                  {item.title}
                </h3>

                <p className="text-[#64748B] text-[13px] leading-[1.55]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

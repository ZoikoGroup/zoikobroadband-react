"use client";

import React from "react";

interface SolutionCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly href: string;
}

const RELATED_SOLUTIONS = [
  {
    id: "static-ip-options",
    title: "Static IP Options",
    description: "For remote access and hosted systems.",
    imageSrc: "/Images/fttp/8.png",
    imageAlt: "Code on screen representing Static IP Options",
    href: "/business-broadband",
  },
  {
    id: "multi-site-connectivity",
    title: "Multi-site Connectivity",
    description: "Coordinate several premises.",
    imageSrc: "/Images/fttp/9.png",
    imageAlt: "Network switch ports for Multi-site Connectivity",
    href: "/multi-site-connectivity",
  },
  {
    id: "business-voip",
    title: "Business VoIP",
    description: "Review voice separately from broadband.",
    imageSrc: "/Images/fttp/10.png",
    imageAlt: "Business VoIP call in office",
    href: "/digital-lines",
  },
  {
    id: "installation-onboarding",
    title: "Installation & Onboarding",
    description: "What to prepare before install.",
    imageSrc: "/Images/fttp/11.png",
    imageAlt: "Configuring wireless router for Installation and Onboarding",
    href: "/installation-onboarding",
  },
] as const satisfies readonly SolutionCard[];

export default function RelatedSolutions() {
  return (
    <section className="w-full bg-[#FFE3D3] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            RELATED SOLUTIONS
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] max-w-3xl mb-3">
            Pair fibre with what your business needs
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55]">
            Each is a separate service with its own eligibility and pricing.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {RELATED_SOLUTIONS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[18px] p-4 sm:p-5 shadow-[0_6px_20px_rgba(11,34,65,0.05)] flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#E2E8F0] mb-4">
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

                <h3 className="text-[#0B2241] text-[16px] font-bold leading-[1.3] mb-1.5">
                  {item.title}
                </h3>

                <p className="text-[#64748B] text-[13px] leading-[1.5] mb-5">
                  {item.description}
                </p>
              </div>

              <div>
                <a
                  href={item.href}
                  className="inline-flex items-center justify-center px-5 h-[38px] rounded-[7px] border border-[#0B2241] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[13px] font-bold transition-colors"
                >
                  Explore
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

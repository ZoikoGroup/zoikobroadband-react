import React from "react";
import { ArrowRight } from "lucide-react";

const KEEP_EXPLORING_DATA = {
  badge: "KEEP EXPLORING",
  heading: "Not ready to request a quote?",
  subheading: "Browse our business services. No details needed.",
  primaryCta: {
    label: "Start a quote request",
    href: "#start-quote-request",
  },
  cards: [
    {
      id: "business-broadband-plans",
      imageSrc: "/Images/req/10.png",
      imageAlt:
        "Wireless router with dual antennas and person working with laptop in the background",
      imagePosition: "object-center",
      title: "Business broadband plans",
      description: "Compare connections for your business.",
      actionLabel: "Explore",
      href: "#business-broadband-plans",
    },
    {
      id: "business-phone-voice",
      imageSrc: "/Images/req/11.png",
      imageAlt: "Modern IP desk phone with handset and keypad on a desk",
      imagePosition: "object-center",
      title: "Business phone & voice",
      description: "Digital lines and cloud phone options.",
      actionLabel: "Explore",
      href: "#business-phone-voice",
    },
    {
      id: "managed-services",
      imageSrc: "/Images/req/12.png",
      imageAlt:
        "Laptop, smartphone, and wireless headphones arranged on a desk",
      imagePosition: "object-center",
      title: "Managed services",
      description: "Let us look after your network and devices.",
      actionLabel: "Explore",
      href: "#managed-services",
    },
  ],
} as const;

export default function KeepExploringSection() {
  return (
    <section
      id="keep-exploring"
      aria-labelledby="keep-exploring-heading"
      className="relative w-full overflow-hidden bg-[#05182B] py-12 text-white sm:py-14 lg:py-16"
    >
      {/* Subtle radial navy/teal glow matching the dark design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 52% 24%, #0D2E48 0%, #05182B 60%, #03101D 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Top Row: Left Badge + Heading + Subheading | Right Yellow Button */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {KEEP_EXPLORING_DATA.badge}
              </span>
            </div>

            <h2
              id="keep-exploring-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-white sm:text-[40px] lg:text-[42px]"
            >
              {KEEP_EXPLORING_DATA.heading}
            </h2>

            <p className="mt-2.5 text-[13px] leading-[1.5] font-normal text-[#C2D0DE] sm:text-[13.5px]">
              {KEEP_EXPLORING_DATA.subheading}
            </p>
          </div>

          <a
            href={KEEP_EXPLORING_DATA.primaryCta.href}
            className="inline-flex h-[40px] w-fit shrink-0 items-center justify-center gap-2 rounded-[7px] bg-[#FFD100] px-4.5 text-[12px] font-bold text-[#05182B] shadow-[0_4px_14px_rgba(0,0,0,0.24)] transition-colors hover:bg-[#FFE047]"
          >
            <span>{KEEP_EXPLORING_DATA.primaryCta.label}</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.4]" />
          </a>
        </div>

        {/* 3-Column Service Cards */}
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {KEEP_EXPLORING_DATA.cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-[12px] border border-[#223C54] bg-[#11263B]/90 shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-colors hover:border-[#3B5B78] hover:bg-[#152F48]"
            >
              {/* Top Image */}
              <div className="h-[178px] w-full overflow-hidden bg-[#17202E] sm:h-[188px]">
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className={`h-full w-full object-cover ${card.imagePosition} transition-transform duration-300 group-hover:scale-[1.02]`}
                />
              </div>

              {/* Bottom Dark Slate Body */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="text-[13.5px] leading-[1.3] font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-[1.45] font-normal text-[#A4B5C6]">
                    {card.description}
                  </p>
                </div>

                <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD100]">
                  <span>{card.actionLabel}</span>
                  <ArrowRight className="h-3 w-3 stroke-[2.4] transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

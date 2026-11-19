import React from "react";
import { Phone, Laptop, Smartphone } from "lucide-react";

const DEVICES_DATA = {
  badge: "DEVICES",
  headingLine1: "Take calls on the devices your team",
  headingLine2: "uses.",
  subheading:
    "Compatibility is checked for your devices during consultation. We don’t assume any handset or app works.",
  cards: [
    {
      id: "desk-phones",
      icon: "desk-phone",
      imageSrc: "/Images/cloud/2.png",
      imageAlt: "Business IP desk phone with handset and keypad on desk",
      imagePosition: "object-center",
      title: "Desk phones",
      description:
        "For reception and shared desks. We check which handsets work before you buy anything.",
      pillLabel: "Compatibility checked with you",
      href: "#compatibility-desk-phones",
    },
    {
      id: "computers",
      icon: "computer",
      imageSrc: "/Images/cloud/3.png",
      imageAlt:
        "Laptop, smartphone, tablet and headphones for computer calling",
      imagePosition: "object-center",
      title: "Computers",
      description:
        "A softphone app on your laptop or desktop, if supported for your setup.",
      pillLabel: "Compatibility checked with you",
      href: "#compatibility-computers",
    },
    {
      id: "mobiles",
      icon: "mobile",
      imageSrc: "/Images/cloud/4.png",
      imageAlt:
        "Woman checking a smartphone while walking outdoors in the city",
      imagePosition: "object-[65%_22%]",
      title: "Mobiles",
      description:
        "Take business calls on the move, if a supported mobile app is confirmed for you.",
      pillLabel: "Compatibility checked with you",
      href: "#compatibility-mobiles",
    },
  ],
} as const;

export default function CloudDevices() {
  return (
    <section
      id="devices"
      aria-labelledby="cloud-devices-heading"
      className="w-full bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            {DEVICES_DATA.badge}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="cloud-devices-heading"
          className="mt-3.5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[42px] lg:text-[44px]"
        >
          <span className="block">{DEVICES_DATA.headingLine1}</span>
          <span className="block">{DEVICES_DATA.headingLine2}</span>
        </h2>

        {/* Subheading */}
        <p className="mt-3 max-w-[740px] text-[13.5px] leading-[1.52] font-normal text-[#475569] sm:text-[14px]">
          {DEVICES_DATA.subheading}
        </p>

        {/* 3-Column Device Cards Grid */}
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {DEVICES_DATA.cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-white shadow-[0_2px_8px_rgba(8,28,46,0.03)]"
            >
              {/* Top Media Container with Yellow Icon Badge */}
              <div className="relative h-[182px] w-full overflow-hidden bg-[#EEF3F8] sm:h-[192px]">
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className={`h-full w-full object-cover ${card.imagePosition}`}
                />

                {/* Bottom-Left Yellow Square Icon Badge */}
                <span className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#FFD100] text-[#081C2E] shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
                  {card.icon === "desk-phone" && (
                    <Phone className="h-4 w-4 stroke-[2.2]" />
                  )}
                  {card.icon === "computer" && (
                    <Laptop className="h-4 w-4 stroke-[2.2]" />
                  )}
                  {card.icon === "mobile" && (
                    <Smartphone className="h-4 w-4 stroke-[2.2]" />
                  )}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-[14.5px] leading-[1.3] font-bold text-[#081C2E]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-[1.52] font-normal text-[#5A6A7E]">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href={card.href}
                    className="inline-flex items-center rounded-[5px] bg-[#EBF3FA] px-2.5 py-1 text-[10.5px] font-semibold text-[#1D5B96] transition-colors hover:bg-[#DCEAF7]"
                  >
                    {card.pillLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

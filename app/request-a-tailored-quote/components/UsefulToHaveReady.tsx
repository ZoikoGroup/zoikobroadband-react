import React from "react";
import {
  Building2,
  MapPin,
  Wifi,
  Users,
  Phone,
  Calendar,
  Lock,
} from "lucide-react";

const USEFUL_READY_DATA = {
  badge: "BEFORE YOU START",
  heading: "What’s useful to have ready.",
  subheading:
    'You can skip anything you don’t know. "Not sure" is always an option.',
  photos: {
    tallLeft: {
      src: "/Images/req/5.png",
      alt: "Business professional speaking on a desk phone while working at a laptop",
    },
    topRight: {
      src: "/Images/req/6.png",
      alt: "Dual-antenna wireless router with person working on laptop in the background",
    },
    bottomRight: {
      src: "/Images/req/7.png",
      alt: "Modern IP desk phone with handset and keypad",
    },
  },
  cards: [
    {
      id: "your-business",
      icon: "business",
      title: "Your business",
      description: "Business name and your role.",
    },
    {
      id: "your-sites",
      icon: "sites",
      title: "Your sites",
      description: "How many locations, and postcodes if you have them.",
    },
    {
      id: "services",
      icon: "services",
      title: "Services",
      description: "Broadband, voice, security or not sure yet.",
    },
    {
      id: "how-you-work",
      icon: "work",
      title: "How you work",
      description: "Roughly how many people and what they do online.",
    },
    {
      id: "phones-devices",
      icon: "phones",
      title: "Phones & devices",
      description: "Numbers to keep, card machines, alarms or telecare.",
    },
    {
      id: "timing-budget",
      icon: "timing",
      title: "Timing & budget",
      description: "When you'd like to start. Budget is optional.",
    },
  ],
  securityNote:
    "Never include passwords, router settings, IP configurations or payment details. We'll never ask for them in this form.",
} as const;

export default function UsefulToHaveReady() {
  return (
    <section
      id="before-you-start"
      aria-labelledby="useful-to-have-ready-heading"
      className="w-full bg-[#F4F7FA] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Tall Photo + Two Stacked Right Photos */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12 lg:col-span-6">
            {/* Tall Left Photo */}
            <div className="overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-[#E8EEF4] shadow-[0_6px_18px_rgba(8,28,46,0.05)] sm:col-span-6">
              <img
                src={USEFUL_READY_DATA.photos.tallLeft.src}
                alt={USEFUL_READY_DATA.photos.tallLeft.alt}
                className="h-[250px] w-full object-cover object-[64%_22%] sm:h-[346px]"
              />
            </div>

            {/* Right Stack: Top Router Photo + Bottom Desk Phone Photo */}
            <div className="flex flex-col gap-3.5 sm:col-span-6">
              <div className="overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-[#131826] shadow-[0_6px_18px_rgba(8,28,46,0.05)]">
                <img
                  src={USEFUL_READY_DATA.photos.topRight.src}
                  alt={USEFUL_READY_DATA.photos.topRight.alt}
                  className="h-[160px] w-full object-cover object-center sm:h-[166px]"
                />
              </div>

              <div className="overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-[#18202C] shadow-[0_6px_18px_rgba(8,28,46,0.05)]">
                <img
                  src={USEFUL_READY_DATA.photos.bottomRight.src}
                  alt={USEFUL_READY_DATA.photos.bottomRight.alt}
                  className="h-[160px] w-full object-cover object-center sm:h-[166px]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Badge, Heading, Subheading, 2x3 Grid, Warm Warning Note */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {USEFUL_READY_DATA.badge}
              </span>
            </div>

            {/* Heading */}
            <h2
              id="useful-to-have-ready-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[38px]"
            >
              {USEFUL_READY_DATA.heading}
            </h2>

            {/* Subheading */}
            <p className="mt-2.5 text-[13px] leading-[1.5] font-normal text-[#475569] sm:text-[13.5px]">
              {USEFUL_READY_DATA.subheading}
            </p>

            {/* 2x3 Feature Cards Grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {USEFUL_READY_DATA.cards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-start gap-3 rounded-[9px] border border-[#E6ECF2] bg-white p-3.5 shadow-[0_1px_3px_rgba(8,28,46,0.02)]"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-[#FFD100] text-[#081C2E]">
                    {card.icon === "business" && (
                      <Building2 className="h-3.5 w-3.5 stroke-[2.2]" />
                    )}
                    {card.icon === "sites" && (
                      <MapPin className="h-3.5 w-3.5 stroke-[2.2]" />
                    )}
                    {card.icon === "services" && (
                      <Wifi className="h-3.5 w-3.5 stroke-[2.2]" />
                    )}
                    {card.icon === "work" && (
                      <Users className="h-3.5 w-3.5 stroke-[2.2]" />
                    )}
                    {card.icon === "phones" && (
                      <Phone className="h-3.5 w-3.5 stroke-[2.2]" />
                    )}
                    {card.icon === "timing" && (
                      <Calendar className="h-3.5 w-3.5 stroke-[2.2]" />
                    )}
                  </span>

                  <div className="min-w-0 leading-snug">
                    <h3 className="text-[12.5px] leading-[1.25] font-bold text-[#081C2E]">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-[1.4] font-normal text-[#5A6A7E]">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Warm Cream Security Banner */}
            <div className="mt-3.5 flex items-start gap-2.5 rounded-[8px] border border-[#F3E2A6] bg-[#FFFBEB] px-3.5 py-2.5">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8B6A2B] stroke-[2.2]" />
              <p className="text-[10.5px] leading-[1.42] font-normal text-[#785A22]">
                {USEFUL_READY_DATA.securityNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

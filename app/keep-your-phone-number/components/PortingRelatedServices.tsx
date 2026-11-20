"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface RelatedServiceCard {
  readonly id: string;
  readonly title: string;
  readonly status: "active" | "coming-soon";
  readonly actionLabel: string;
  readonly href?: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly imagePositionClass?: string;
}

const RELATED_SERVICES: readonly RelatedServiceCard[] = [
  {
    id: "home-digital-phone",
    title: "Home Digital Phone",
    status: "active",
    actionLabel: "Explore",
    href: "#home-digital-phone",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router with a person working in the background",
    imagePositionClass: "object-center",
  },
  {
    id: "business-voip",
    title: "Business VoIP",
    status: "active",
    actionLabel: "Explore",
    href: "#business-voip",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Business advisor speaking on the phone at a desk in an office",
    imagePositionClass: "object-[50%_20%]",
  },
  {
    id: "moving-to-digital-voice",
    title: "Moving to Digital Voice",
    status: "coming-soon",
    actionLabel: "Coming soon",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of a wooden desk with a laptop, glasses, coffee and small plant",
    imagePositionClass: "object-center",
  },
  {
    id: "emergency-calling-guidance",
    title: "Emergency Calling Guidance",
    status: "coming-soon",
    actionLabel: "Coming soon",
    imageSrc: "/Images/speak/1.jpg",
    imageAlt:
      "Support specialist wearing a headset smiling at a computer workstation",
    imagePositionClass: "object-[50%_18%]",
  },
  {
    id: "help-and-troubleshooting",
    title: "Help & Troubleshooting",
    status: "coming-soon",
    actionLabel: "Coming soon",
    imageSrc: "/Images/onb/12.png",
    imageAlt:
      "Support specialist wearing a headset at a workstation ready to assist",
    imagePositionClass: "object-[55%_18%]",
  },
];

export interface PortingRelatedServicesProps {
  readonly onSelectService?: (service: RelatedServiceCard) => void;
}

export default function PortingRelatedServices({
  onSelectService,
}: PortingRelatedServicesProps) {
  return (
    <section
      id="related-services"
      className="w-full bg-white py-10 md:py-12 font-sans antialiased"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <h2 className="mb-5 text-[20px] sm:text-[22px] font-extrabold leading-[1.2] tracking-[-0.015em] text-[#0B2241]">
          Related services
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {RELATED_SERVICES.map((service) => {
            const isActive = service.status === "active" && service.href;

            const cardContent = (
              <>
                <img
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  className={`absolute inset-0 h-full w-full object-cover ${
                    service.imagePositionClass ?? "object-[50%_20%]"
                  } transition-transform duration-300 group-hover:scale-[1.03]`}
                />

                {/* Soft dark gradient over the bottom for readable white/gold text */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                />

                <div className="relative z-10 flex h-full flex-col justify-end p-4 text-left">
                  <h3 className="mb-1 text-[14px] font-extrabold leading-[1.22] text-white">
                    {service.title}
                  </h3>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-bold leading-none text-[#FFC119] transition-colors group-hover:text-[#FFD35A]">
                      <span>{service.actionLabel}</span>
                      <ArrowRight
                        className="h-3 w-3 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold leading-none text-white/85">
                      {service.actionLabel}
                    </span>
                  )}
                </div>
              </>
            );

            if (isActive) {
              return (
                <a
                  key={service.id}
                  href={service.href}
                  onClick={() => onSelectService?.(service)}
                  className="group relative flex h-[210px] flex-col justify-end overflow-hidden rounded-[14px] shadow-[0_6px_18px_rgba(11,34,65,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={service.id}
                role="group"
                aria-label={`${service.title} - ${service.actionLabel}`}
                onClick={() => onSelectService?.(service)}
                className={`group relative flex h-[210px] flex-col justify-end overflow-hidden rounded-[14px] shadow-[0_6px_16px_rgba(11,34,65,0.06)] ${
                  onSelectService ? "cursor-pointer" : ""
                }`}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface SupportMoreServiceCard {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const SUPPORT_MORE_SERVICES: readonly SupportMoreServiceCard[] = [
  {
    id: "installation-and-onboarding",
    title: "Installation & Onboarding",
    href: "#installation-and-onboarding",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router in a workspace with a person working in the background",
  },
  {
    id: "cyber-security-and-protection",
    title: "Cyber Security & Protection",
    href: "#cyber-security-and-protection",
    imageSrc: "/Images/onb/7.png",
    imageAlt:
      "Laptop, tablet, smartphone and wireless headphones displaying vibrant screen graphics",
  },
  {
    id: "managed-services",
    title: "Managed Services",
    href: "#managed-services",
    imageSrc: "/Images/mng/1.png",
    imageAlt:
      "Three colleagues collaborating closely over a laptop in an office",
  },
  {
    id: "request-a-tailored-quote",
    title: "Request a Tailored Quote",
    href: "#request-a-scope-review",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Team member speaking on the phone at a desk in a busy office",
  },
];

export interface SupportMoreBusinessServicesProps {
  readonly onSelectService?: (serviceId: string) => void;
}

export default function SupportMoreBusinessServices({
  onSelectService,
}: SupportMoreBusinessServicesProps) {
  return (
    <section
      id="support-more-business-services"
      className="w-full bg-white py-14 md:py-16 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <h2 className="text-[#0B2241] text-[22px] sm:text-[26px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-6">
          More business services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SUPPORT_MORE_SERVICES.map((service) => (
            <a
              key={service.id}
              href={service.href}
              onClick={() => onSelectService?.(service.id)}
              className="group relative block w-full h-[145px] sm:h-[180px] rounded-[16px] overflow-hidden bg-[#061A33] shadow-[0_6px_20px_rgba(11,34,65,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
            >
              <img
                src={service.imageSrc}
                alt={service.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%] transition-transform duration-300 group-hover:scale-[1.03]"
              />

              {/* Dark gradient scrim for legibility over photos */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A33] via-[#061A33]/65 to-[#061A33]/15"
              />

              {/* Bottom Left Title & Explore Action */}
              <div className="relative z-10 h-full p-4 flex flex-col justify-end">
                <h3 className="text-white text-[14px] font-bold leading-[1.3] mb-1 drop-shadow-xs">
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[#FFC119] group-hover:text-[#FFD35A] text-[11.5px] font-bold leading-none transition-colors">
                  <span>Explore</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

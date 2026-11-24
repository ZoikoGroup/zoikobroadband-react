"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface MoreBusinessServiceCard {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

const MORE_BUSINESS_SERVICES: readonly MoreBusinessServiceCard[] = [
  {
    id: "installation-and-onboarding",
    title: "Installation & Onboarding",
    href: "/installation-onboarding",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router in a workspace with a person working in the background",
  },
  {
    id: "business-support-and-slas",
    title: "Business Support & SLAs",
    href: "/business-support",
    imageSrc: "/Images/onb/12.png",
    imageAlt: "Support advisor wearing a headset smiling at a computer monitor",
  },
  {
    id: "cyber-security-and-protection",
    title: "Cyber Security & Protection",
    href: "/cyber-security",
    imageSrc: "/Images/onb/7.png",
    imageAlt:
      "Laptop, tablet, smartphone and wireless headphones displaying vibrant screen graphics",
  },
  {
    id: "request-a-tailored-quote",
    title: "Request a Tailored Quote",
    href: "/request-a-tailored-quote",
    imageSrc: "/Images/onb/17.png",
    imageAlt: "City skyline with bridge and glass tower at dusk",
  },
];

export interface ManagedMoreBusinessServicesProps {
  readonly onSelectService?: (serviceId: string) => void;
}

export default function ManagedMoreBusinessServices({
  onSelectService,
}: ManagedMoreBusinessServicesProps) {
  return (
    <section
      id="more-business-services"
      className="w-full bg-white py-14 md:py-16 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <h2 className="text-[#0B2241] text-[22px] sm:text-[26px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-6">
          More business services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MORE_BUSINESS_SERVICES.map((service) => (
            <a
              key={service.id}
              href={service.href}
              onClick={() => onSelectService?.(service.id)}
              className="group relative block w-full h-[145px] sm:h-[205px] rounded-[16px] overflow-hidden bg-[#061A33] shadow-[0_6px_20px_rgba(11,34,65,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
            >
              <img
                src={service.imageSrc}
                alt={service.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
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

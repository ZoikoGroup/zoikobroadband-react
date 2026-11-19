"use client";

import React from "react";
import {
  Wifi,
  Phone,
  Wrench,
  Shield,
  TrendingUp,
  Users,
  Info,
} from "lucide-react";

type ServiceAreaIconKey =
  | "connectivity"
  | "voice"
  | "operations"
  | "security"
  | "governance"
  | "situation";

interface ServiceAreaTile {
  readonly id: string;
  readonly title: string;
  readonly tags: readonly string[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly iconKey: ServiceAreaIconKey;
  readonly gridSpanClass: string;
}

const POSSIBLE_SERVICE_AREAS: readonly ServiceAreaTile[] = [
  {
    id: "connectivity",
    title: "Connectivity",
    tags: [
      "Managed broadband & router",
      "Managed Wi-Fi",
      "Multi-site links",
      "Performance visibility",
    ],
    imageSrc: "/Images/onb/3.png",
    imageAlt:
      "Dual-antenna wireless router in a modern workspace with person working in background",
    iconKey: "connectivity",
    gridSpanClass: "lg:col-span-5",
  },
  {
    id: "voice",
    title: "Voice",
    tags: ["Managed voice coordination", "Number & emergency-call boundaries"],
    imageSrc: "/Images/onb/15.png",
    imageAlt: "Business desk telephone with display screen in an office",
    iconKey: "voice",
    gridSpanClass: "lg:col-span-4",
  },
  {
    id: "operations",
    title: "Operations",
    tags: [
      "Change coordination",
      "Incident coordination",
      "Configuration management",
      "Hardware lifecycle",
    ],
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of wooden desk with laptop, glasses, coffee and small plant",
    iconKey: "operations",
    gridSpanClass: "lg:col-span-3",
  },
  {
    id: "security",
    title: "Security",
    tags: ["Firewall & edge security", "Identity & access help"],
    imageSrc: "/Images/onb/7.png",
    imageAlt:
      "Laptop, tablet, smartphone and wireless headphones with vibrant screen display",
    iconKey: "security",
    gridSpanClass: "lg:col-span-3",
  },
  {
    id: "projects-governance",
    title: "Projects & governance",
    tags: [
      "Site commissioning",
      "Supplier coordination",
      "Service reviews",
      "Recovery planning",
      "Network consultation",
    ],
    imageSrc: "/Images/onb/4.png",
    imageAlt: "City skyline with bridge and modern glass tower at dusk",
    iconKey: "governance",
    gridSpanClass: "lg:col-span-6",
  },
  {
    id: "your-situation",
    title: "Your situation",
    tags: [
      "New site",
      "Existing network",
      "Multiple sites",
      "Security review",
      "Not sure",
    ],
    imageSrc: "/Images/onb/5.png",
    imageAlt: "Team member speaking on the phone at a desk in a busy office",
    iconKey: "situation",
    gridSpanClass: "lg:col-span-3",
  },
];

function renderAreaIcon(iconKey: ServiceAreaIconKey) {
  switch (iconKey) {
    case "connectivity":
      return (
        <Wifi
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "voice":
      return (
        <Phone
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "operations":
      return (
        <Wrench
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "security":
      return (
        <Shield
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "governance":
      return (
        <TrendingUp
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "situation":
      return (
        <Users
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
  }
}

export interface OnboardingPossibleServiceAreasProps {
  readonly onSelectArea?: (areaId: string) => void;
}

export default function OnboardingPossibleServiceAreas({
  onSelectArea,
}: OnboardingPossibleServiceAreasProps) {
  return (
    <section
      id="possible-service-areas"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Header Row + Status Pill */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-9">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                02
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                POSSIBLE SERVICE AREAS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
              What could be managed for your business.
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
              Areas we can discuss in a scope review. They aren&apos;t published
              Zoiko products until each one is approved.
            </p>
          </div>

          <div className="shrink-0 self-start lg:self-end">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-[#0B2241] text-[11px] font-bold leading-none shadow-2xs">
              <Info
                className="w-3.5 h-3.5 text-[#92400E] shrink-0"
                aria-hidden="true"
              />
              <span>Not yet published as products</span>
            </span>
          </div>
        </div>

        {/* 2-Row Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {POSSIBLE_SERVICE_AREAS.map((area) => (
            <div
              key={area.id}
              onClick={() => onSelectArea?.(area.id)}
              role={onSelectArea ? "button" : undefined}
              tabIndex={onSelectArea ? 0 : undefined}
              onKeyDown={
                onSelectArea
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectArea(area.id);
                      }
                    }
                  : undefined
              }
              className={`group relative min-h-[210px] sm:min-h-[225px] rounded-[18px] overflow-hidden bg-[#061A33] shadow-[0_8px_22px_rgba(11,34,65,0.08)] flex flex-col justify-between p-5 sm:p-6 ${
                area.gridSpanClass
              } ${
                onSelectArea
                  ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
                  : ""
              }`}
            >
              <img
                src={area.imageSrc}
                alt={area.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />

              {/* Dark gradient scrim for legibility over photos */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A33]/95 via-[#061A33]/65 to-[#061A33]/35"
              />

              {/* Top Gold Icon Badge */}
              <div className="relative z-10">
                <span className="w-8 h-8 rounded-[8px] bg-[#FFC119] inline-flex items-center justify-center shadow-xs">
                  {renderAreaIcon(area.iconKey)}
                </span>
              </div>

              {/* Bottom Title & Pill Tags */}
              <div className="relative z-10 pt-6">
                <h3 className="text-white text-[17px] font-extrabold leading-[1.25] mb-2.5 drop-shadow-xs">
                  {area.title}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#0F2744]/85 border border-white/15 text-[#E2E8F0] text-[10.5px] font-semibold leading-none backdrop-blur-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

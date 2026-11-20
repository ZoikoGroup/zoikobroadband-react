"use client";

import React from "react";
import {
  AlertTriangle,
  ArrowRightLeft,
  ShieldAlert,
  PhoneOff,
  Scale,
  ArrowRight,
} from "lucide-react";

type TrickyMomentIconKey =
  | "cancelled"
  | "rejected"
  | "unexpected"
  | "calls-failing"
  | "complain";

interface TrickyMomentCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly iconKey: TrickyMomentIconKey;
  readonly badgeBgClass: string;
  readonly badgeIconClass: string;
}

const TRICKY_MOMENT_CARDS: readonly TrickyMomentCard[] = [
  {
    id: "already-cancelled-old-service",
    title: "Already cancelled your old service?",
    description:
      "Contact us promptly. You may be able to keep your number for a limited time. We'll check what's possible but can't promise recovery.",
    ctaLabel: "Get help",
    href: "#check-my-transfer-path",
    imageSrc: "/Images/speak/1.jpg",
    imageAlt:
      "Support specialist wearing a headset smiling at a computer workstation",
    iconKey: "cancelled",
    badgeBgClass: "bg-[#B91C1C]",
    badgeIconClass: "text-white",
  },
  {
    id: "transfer-rejected-or-delayed",
    title: "Transfer rejected or delayed",
    description:
      "We'll explain why, without sharing anyone else's details, and tell you what to do next.",
    ctaLabel: "Get help",
    href: "#check-my-transfer-path",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Team member speaking on the phone at a desk in a busy office",
    iconKey: "rejected",
    badgeBgClass: "bg-[#061A33]",
    badgeIconClass: "text-[#FFC119]",
  },
  {
    id: "unexpected-switch-or-ownership-issue",
    title: "Unexpected switch or ownership issue",
    description:
      "Get help if your number moved without your agreement, or ownership is disputed.",
    ctaLabel: "Get help",
    href: "#check-my-transfer-path",
    imageSrc: "/Images/keep/1.png",
    imageAlt:
      "Person smiling while looking at a mobile phone outdoors on a city street",
    iconKey: "unexpected",
    badgeBgClass: "bg-[#061A33]",
    badgeIconClass: "text-[#FFC119]",
  },
  {
    id: "calls-not-working-after-the-switch",
    title: "Calls not working after the switch",
    description:
      "This is a service issue, not a transfer problem. Contact support so we can restore calls.",
    ctaLabel: "Get help",
    href: "#service-status",
    imageSrc: "/Images/onb/15.png",
    imageAlt: "Modern VoIP desk phone with illuminated display on a desk",
    iconKey: "calls-failing",
    badgeBgClass: "bg-[#061A33]",
    badgeIconClass: "text-[#FFC119]",
  },
  {
    id: "want-to-complain",
    title: "Want to complain?",
    description:
      "Use our complaints process. If eligible, independent dispute resolution may also be available.",
    ctaLabel: "Get help",
    href: "#complaints-and-adr",
    imageSrc: "/Images/mng/1.png",
    imageAlt: "Three colleagues collaborating over a laptop in a modern office",
    iconKey: "complain",
    badgeBgClass: "bg-[#061A33]",
    badgeIconClass: "text-[#FFC119]",
  },
];

function renderTrickyMomentIcon(
  iconKey: TrickyMomentIconKey,
  iconClassName: string,
) {
  switch (iconKey) {
    case "cancelled":
      return (
        <AlertTriangle
          className={`w-3.5 h-3.5 stroke-[2.2] ${iconClassName}`}
          aria-hidden="true"
        />
      );
    case "rejected":
      return (
        <ArrowRightLeft
          className={`w-3.5 h-3.5 stroke-[2.2] ${iconClassName}`}
          aria-hidden="true"
        />
      );
    case "unexpected":
      return (
        <ShieldAlert
          className={`w-3.5 h-3.5 stroke-[2.2] ${iconClassName}`}
          aria-hidden="true"
        />
      );
    case "calls-failing":
      return (
        <PhoneOff
          className={`w-3.5 h-3.5 stroke-[2.2] ${iconClassName}`}
          aria-hidden="true"
        />
      );
    case "complain":
      return (
        <Scale
          className={`w-3.5 h-3.5 stroke-[2.2] ${iconClassName}`}
          aria-hidden="true"
        />
      );
  }
}

export interface PortingHelpForTrickyMomentsProps {
  readonly bannerImageSrc?: string;
  readonly bannerImageAlt?: string;
  readonly bannerDescription?: string;
  readonly contactHref?: string;
  readonly onSelectMoment?: (momentId: string) => void;
  readonly onContactTeam?: () => void;
}

export default function PortingHelpForTrickyMoments({
  bannerImageSrc = "/Images/onb/12.png",
  bannerImageAlt = "Specialist advisor wearing a headset smiling at a workstation",
  bannerDescription = "Talk through your number, connected devices or a complex transfer. [Approved contact route and hours]",
  contactHref = "#your-enquiry",
  onSelectMoment,
  onContactTeam,
}: PortingHelpForTrickyMomentsProps) {
  return (
    <section
      id="help-for-the-tricky-moments"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              08
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              WHEN THINGS DON&apos;T GO TO PLAN
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Help for the tricky moments.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[580px]">
            Each of these has its own route, so you reach the right team
            quickly.
          </p>
        </div>

        {/* 5-Column Tricky Scenario Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {TRICKY_MOMENT_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.href}
              onClick={() => onSelectMoment?.(card.id)}
              className="group bg-[#F4F7FA] hover:bg-[#F8FAFC] rounded-[16px] border border-[#E2E8F0] hover:border-[#CBD5E1] overflow-hidden shadow-[0_6px_18px_rgba(11,34,65,0.04)] transition-all flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
            >
              {/* Top Image with Overlapping Icon Badge */}
              <div className="relative w-full h-[125px] sm:h-[135px] bg-[#1E293B]">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-[50%_20%] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <span
                  className={`absolute left-3.5 -bottom-3.5 z-10 w-7 h-7 rounded-[7px] ${card.badgeBgClass} inline-flex items-center justify-center shadow-[0_4px_10px_rgba(11,34,65,0.18)]`}
                >
                  {renderTrickyMomentIcon(card.iconKey, card.badgeIconClass)}
                </span>
              </div>

              {/* Card Body & Bottom Action Link */}
              <div className="pt-6 px-4 pb-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[#0B2241] text-[13.5px] font-extrabold leading-[1.3] mb-1.5">
                    {card.title}
                  </h3>

                  <p className="text-[#64748B] text-[11px] leading-[1.5] mb-4">
                    {card.description}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-[#0B2241] group-hover:text-[#1963DD] text-[11.5px] font-bold leading-none transition-colors">
                  <span>{card.ctaLabel}</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Dark Split Banner: "Speak to our team" */}
        <div className="rounded-[20px] bg-gradient-to-r from-[#061A33] via-[#0B2241] to-[#123564] overflow-hidden shadow-[0_12px_28px_rgba(6,26,51,0.18)] grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-2 relative min-h-[175px] md:min-h-[190px] bg-[#1E293B] overflow-hidden">
            <img
              src={bannerImageSrc}
              alt={bannerImageAlt}
              className="w-full h-full object-cover object-[50%_20%]"
            />
          </div>

          <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="text-white text-[18px] sm:text-[20px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-1.5">
              Speak to our team
            </h3>

            <p className="text-[#CBD5E1] text-[12px] leading-[1.55] mb-4 max-w-[540px]">
              {bannerDescription}
            </p>

            <div>
              <a
                href={contactHref}
                onClick={() => onContactTeam?.()}
                className="inline-flex items-center justify-center gap-2 px-4.5 h-[38px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12px] font-extrabold transition-colors shadow-[0_3px_10px_rgba(255,193,25,0.25)]"
              >
                <span>Contact us</span>
                <ArrowRight
                  className="w-3.5 h-3.5 stroke-[2.3]"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

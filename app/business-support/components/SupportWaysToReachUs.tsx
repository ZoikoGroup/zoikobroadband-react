"use client";

import React from "react";
import { Phone, FileText, Lock, Users } from "lucide-react";

type SupportChannelIconKey =
  | "phone"
  | "online-fault-form"
  | "account-portal"
  | "accessible-support";

interface SupportChannelCard {
  readonly id: string;
  readonly title: string;
  readonly primaryLine: string;
  readonly secondaryLine: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly iconKey: SupportChannelIconKey;
}

const SUPPORT_CHANNELS: readonly SupportChannelCard[] = [
  {
    id: "phone",
    title: "Phone",
    primaryLine: "[Approved support number]",
    secondaryLine: "Hours: [approved hours for your care level]",
    href: "#phone-support",
    imageSrc: "/Images/onb/13.png",
    imageAlt: "Team member speaking on the phone at a desk in a busy office",
    iconKey: "phone",
  },
  {
    id: "online-fault-form",
    title: "Online fault form",
    primaryLine: "Report a fault on this page",
    secondaryLine: "Saved only once we confirm we received it",
    href: "#report-a-fault",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of wooden desk with laptop, glasses, coffee and small plant",
    iconKey: "online-fault-form",
  },
  {
    id: "account-portal",
    title: "Account portal",
    primaryLine: "Sign in to view your cases",
    secondaryLine: "Available once your account is linked",
    href: "#your-cases",
    imageSrc: "/Images/onb/7.png",
    imageAlt:
      "Laptop, tablet, smartphone and wireless headphones with vibrant screen graphics",
    iconKey: "account-portal",
  },
  {
    id: "accessible-support",
    title: "Accessible support",
    primaryLine: "Text relay, email or large print",
    secondaryLine: "Ask for the format that works for you",
    href: "#accessible-support",
    imageSrc: "/Images/onb/12.png",
    imageAlt:
      "Support advisor wearing a headset smiling at a computer workstation",
    iconKey: "accessible-support",
  },
];

function renderChannelIcon(iconKey: SupportChannelIconKey) {
  switch (iconKey) {
    case "phone":
      return (
        <Phone
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "online-fault-form":
      return (
        <FileText
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "account-portal":
      return (
        <Lock
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "accessible-support":
      return (
        <Users
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
  }
}

export interface SupportWaysToReachUsProps {
  readonly supportPhonePlaceholder?: string;
  readonly supportHoursPlaceholder?: string;
  readonly onSelectChannel?: (channelId: string) => void;
}

export default function SupportWaysToReachUs({
  supportPhonePlaceholder,
  supportHoursPlaceholder,
  onSelectChannel,
}: SupportWaysToReachUsProps) {
  const channels = SUPPORT_CHANNELS.map((channel) => {
    if (channel.id !== "phone") {
      return channel;
    }

    return {
      ...channel,
      primaryLine: supportPhonePlaceholder ?? channel.primaryLine,
      secondaryLine: supportHoursPlaceholder
        ? `Hours: ${supportHoursPlaceholder}`
        : channel.secondaryLine,
    };
  });

  return (
    <section
      id="ways-to-reach-us"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              06
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              WAYS TO REACH US
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Choose the support channel that suits you.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Only verified channels are listed. Hours depend on your product and
            contract.
          </p>
        </div>

        {/* 4-Column Support Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              onClick={() => onSelectChannel?.(channel.id)}
              className="group bg-white rounded-[18px] border border-[#E2E8F0] hover:border-[#CBD5E1] overflow-hidden shadow-[0_6px_20px_rgba(11,34,65,0.04)] hover:shadow-[0_10px_24px_rgba(11,34,65,0.08)] transition-all flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
            >
              {/* Top Photo with Overlapping Gold Icon Badge */}
              <div className="relative w-full h-[145px] sm:h-[155px] bg-[#1E293B]">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={channel.imageSrc}
                    alt={channel.imageAlt}
                    className="w-full h-full object-cover object-[50%_20%] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Subtle bottom edge gradient */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#061A33]/35 to-transparent"
                />

                <span className="absolute left-4 -bottom-4 z-10 w-8 h-8 rounded-[8px] bg-[#FFC119] inline-flex items-center justify-center shadow-[0_4px_10px_rgba(11,34,65,0.16)]">
                  {renderChannelIcon(channel.iconKey)}
                </span>
              </div>

              {/* Card Body */}
              <div className="pt-7 px-5 pb-5 flex-1 flex flex-col">
                <h3 className="text-[#0B2241] text-[14.5px] font-extrabold leading-[1.3] mb-1">
                  {channel.title}
                </h3>

                <p className="text-[#334155] text-[12px] font-bold leading-[1.45] mb-1">
                  {channel.primaryLine}
                </p>

                <p className="text-[#64748B] text-[11px] leading-[1.45]">
                  {channel.secondaryLine}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

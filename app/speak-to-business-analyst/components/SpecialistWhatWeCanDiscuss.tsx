"use client";

import React from "react";
import { Wifi, Globe, Phone, Building2, Users, ArrowRight } from "lucide-react";

type DiscussionIconKey =
  | "broadband"
  | "networking"
  | "voice"
  | "premises"
  | "guidance";

interface DiscussionTopicCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly iconKey: DiscussionIconKey;
}

const DISCUSSION_TOPICS: readonly DiscussionTopicCard[] = [
  {
    id: "business-broadband-and-full-fibre",
    title: "Business broadband & full fibre",
    description: "Subject to what's available at your premises.",
    ctaLabel: "Ask about this",
    href: "#request-a-scope-review",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router in a workspace with a person working in the background",
    iconKey: "broadband",
  },
  {
    id: "static-ip-and-networking",
    title: "Static IP & networking",
    description: "Options and any charges confirmed with you.",
    ctaLabel: "Ask about this",
    href: "#request-a-scope-review",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of wooden desk with laptop, glasses, coffee and small plant",
    iconKey: "networking",
  },
  {
    id: "digital-phone-lines-and-voice",
    title: "Digital phone lines & voice",
    description: "Compatibility and number transfers assessed.",
    ctaLabel: "Ask about this",
    href: "#request-a-scope-review",
    imageSrc: "/Images/onb/15.png",
    imageAlt: "Modern VoIP desk phone with illuminated display on a desk",
    iconKey: "voice",
  },
  {
    id: "several-premises-and-continuity",
    title: "Several premises & continuity",
    description: "A consultation for branches, not a fixed quote.",
    ctaLabel: "Ask about this",
    href: "#request-a-scope-review",
    imageSrc: "/Images/onb/17.png",
    imageAlt:
      "City skyline with river bridge and glass tower illuminated at dusk",
    iconKey: "premises",
  },
  {
    id: "not-sure-what-you-need",
    title: "Not sure what you need?",
    description: "Plain-English advice, without the jargon.",
    ctaLabel: "Ask about this",
    href: "#request-a-scope-review",
    imageSrc: "/Images/onb/12.png",
    imageAlt:
      "Support specialist wearing a headset smiling at a computer workstation",
    iconKey: "guidance",
  },
];

function renderTopicIcon(iconKey: DiscussionIconKey) {
  switch (iconKey) {
    case "broadband":
      return (
        <Wifi
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "networking":
      return (
        <Globe
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
    case "premises":
      return (
        <Building2
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "guidance":
      return (
        <Users
          className="w-4 h-4 text-[#0B2241] stroke-[2.2]"
          aria-hidden="true"
        />
      );
  }
}

export interface SpecialistWhatWeCanDiscussProps {
  readonly onSelectTopic?: (topicId: string) => void;
}

export default function SpecialistWhatWeCanDiscuss({
  onSelectTopic,
}: SpecialistWhatWeCanDiscussProps) {
  return (
    <section
      id="what-we-can-discuss"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              02
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              WHAT WE CAN DISCUSS
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[660px]">
            Talk through what your business needs.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            These are conversations, not a product catalogue. Everything is
            confirmed for your premises before any offer.
          </p>
        </div>

        {/* 5-Column Discussion Topic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DISCUSSION_TOPICS.map((topic) => (
            <a
              key={topic.id}
              href={topic.href}
              onClick={() => onSelectTopic?.(topic.id)}
              className="group bg-white rounded-[18px] border border-[#E2E8F0] hover:border-[#CBD5E1] overflow-hidden shadow-[0_6px_20px_rgba(11,34,65,0.04)] hover:shadow-[0_10px_24px_rgba(11,34,65,0.08)] transition-all flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1963DD] focus-visible:ring-offset-2"
            >
              {/* Top Image with Overlapping Gold Icon Badge */}
              <div className="relative w-full h-[145px] sm:h-[155px] bg-[#1E293B]">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={topic.imageSrc}
                    alt={topic.imageAlt}
                    className="w-full h-full object-cover object-[50%_20%] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Subtle bottom gradient for badge contrast */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#061A33]/35 to-transparent"
                />

                <span className="absolute left-4 -bottom-4 z-10 w-8 h-8 rounded-[8px] bg-[#FFC119] inline-flex items-center justify-center shadow-[0_4px_10px_rgba(11,34,65,0.16)]">
                  {renderTopicIcon(topic.iconKey)}
                </span>
              </div>

              {/* Card Body & Bottom Action Link */}
              <div className="pt-7 px-4 sm:px-5 pb-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[#0B2241] text-[14.5px] font-extrabold leading-[1.28] mb-1.5">
                    {topic.title}
                  </h3>

                  <p className="text-[#64748B] text-[11.5px] leading-[1.5] mb-4">
                    {topic.description}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-[#0B2241] group-hover:text-[#1963DD] text-[11.5px] font-bold leading-none transition-colors">
                  <span>{topic.ctaLabel}</span>
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

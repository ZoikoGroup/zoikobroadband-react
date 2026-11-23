"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";

export interface SpecialistReadyToTalkCtaProps {
  readonly callbackHref?: string;
  readonly callHref?: string;
  readonly availabilityHref?: string;
  readonly primaryImageSrc?: string;
  readonly primaryImageAlt?: string;
  readonly topRightImageSrc?: string;
  readonly topRightImageAlt?: string;
  readonly bottomRightImageSrc?: string;
  readonly bottomRightImageAlt?: string;
  readonly onRequestCallback?: () => void;
  readonly onCallTeam?: () => void;
  readonly onCheckAvailability?: () => void;
}

export default function SpecialistReadyToTalkCta({
  callbackHref = "#your-enquiry",
  callHref = "tel:+442071646399",
  availabilityHref = "#check-business-availability",
  primaryImageSrc = "/Images/onb/13.png",
  primaryImageAlt = "Specialist speaking on the phone at a desk in a bright office",
  topRightImageSrc = "/Images/speak/3.png",
  topRightImageAlt = "Fresh colourful produce displayed in a retail shop",
  bottomRightImageSrc = "/Images/onb/14.png",
  bottomRightImageAlt = "Dual-antenna wireless router in a workspace with a person working in the background",
  onRequestCallback,
  onCallTeam,
  onCheckAvailability,
}: SpecialistReadyToTalkCtaProps) {
  return (
    <section
      id="ready-to-talk-cta"
      className="w-full bg-white py-12 md:py-16 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="rounded-[24px] bg-gradient-to-r from-[#061A33] via-[#0B2241] to-[#123564] p-7 sm:p-10 lg:p-12 shadow-[0_14px_34px_rgba(6,26,51,0.18)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center overflow-hidden">
          {/* Left Copy & Actions */}
          <div className="lg:col-span-6">
            <h2 className="text-white text-[34px] sm:text-[42px] lg:text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em] mb-4 max-w-[500px]">
              Ready to talk about{" "}
              <span className="text-[#FFC119]">your business?</span>
            </h2>

            <p className="text-[#CBD5E1] text-[14.5px] leading-[1.55] mb-7 max-w-[420px]">
              Free, no obligation, and no payment details. Just a conversation
              with a specialist.
            </p>

            {/* Primary & Secondary Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5">
              <a
                href={callbackHref}
                onClick={() => onRequestCallback?.()}
                className="inline-flex items-center justify-center gap-2 px-5 h-[44px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12.5px] font-extrabold transition-colors shadow-[0_4px_14px_rgba(255,193,25,0.28)]"
              >
                <span>Request a callback</span>
                <ArrowRight
                  className="w-3.5 h-3.5 stroke-[2.3]"
                  aria-hidden="true"
                />
              </a>

              <a
                href={callHref}
                onClick={() => onCallTeam?.()}
                className="inline-flex items-center justify-center gap-2 px-5 h-[44px] rounded-[8px] border border-white/65 hover:border-white hover:bg-white/10 text-white text-[12.5px] font-bold transition-colors"
              >
                <Phone
                  className="w-3.5 h-3.5 stroke-[2.2]"
                  aria-hidden="true"
                />
                <span>Call our UK team</span>
              </a>
            </div>

            {/* Bottom Text Link */}
            <div>
              <a
                href={availabilityHref}
                onClick={() => onCheckAvailability?.()}
                className="inline-block text-white hover:text-[#FFC119] text-[12px] font-bold underline underline-offset-4 transition-colors"
              >
                Check business availability
              </a>
            </div>
          </div>

          {/* Right Asymmetric 3-Photo Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Tall Left Photo */}
            <div className="sm:col-span-6 h-[240px] sm:h-[290px] rounded-[16px] overflow-hidden bg-[#1E293B] shadow-[0_8px_20px_rgba(0,0,0,0.22)]">
              <img
                src={primaryImageSrc}
                alt={primaryImageAlt}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Stacked Right 2 Photos */}
            <div className="sm:col-span-6 flex flex-col gap-3.5">
              <div className="h-[135px] sm:h-[138px] rounded-[16px] overflow-hidden bg-[#1E293B] shadow-[0_8px_20px_rgba(0,0,0,0.22)]">
                <img
                  src={topRightImageSrc}
                  alt={topRightImageAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="h-[135px] sm:h-[138px] rounded-[16px] overflow-hidden bg-[#1E293B] shadow-[0_8px_20px_rgba(0,0,0,0.22)]">
                <img
                  src={bottomRightImageSrc}
                  alt={bottomRightImageAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

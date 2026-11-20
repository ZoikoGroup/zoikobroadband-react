"use client";

import React from "react";
import { HelpCircle } from "lucide-react";

export interface SupportServiceStatusProps {
  readonly checkedTime?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly safeChecksHref?: string;
  readonly reportFaultHref?: string;
  readonly onTrySafeChecks?: () => void;
  readonly onReportFault?: () => void;
}

export default function SupportServiceStatus({
  checkedTime = "11:32",
  imageSrc = "/Images/mng/6.png",
  imageAlt = "City skyline with bridge and tall glass tower illuminated at dusk",
  safeChecksHref = "#safe-checks",
  reportFaultHref = "#report-a-fault",
  onTrySafeChecks,
  onReportFault,
}: SupportServiceStatusProps) {
  return (
    <section
      id="service-status"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Eyebrow, Heading, Status Card & Privacy Note */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                01
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                SERVICE STATUS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[460px]">
              Is something wrong on our side?
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[500px] mb-6">
              We only show incidents that our systems have confirmed, with the
              time they were checked.
            </p>

            {/* Unconfirmed Status Card */}
            <div className="rounded-[18px] border border-[#CBD5E1] bg-white overflow-hidden shadow-[0_4px_16px_rgba(11,34,65,0.04)] mb-3.5">
              {/* Top Status Banner */}
              <div className="bg-[#EEF2F6] px-5 py-4 flex items-center gap-3.5 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-[10px] bg-[#475569] flex items-center justify-center shrink-0">
                  <HelpCircle
                    className="w-5 h-5 text-white stroke-[2.2]"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[#0B2241] text-[14.5px] font-extrabold leading-[1.3]">
                    We can&apos;t confirm network status here
                  </h3>
                  <p className="text-[#475569] text-[12px] leading-[1.4] mt-0.5">
                    No status source connected &middot; checked {checkedTime}
                  </p>
                </div>
              </div>

              {/* Guidance Copy & Action Buttons */}
              <div className="p-5">
                <p className="text-[#334155] text-[13px] leading-[1.55] mb-5">
                  If your service isn&apos;t working, try the safe checks or
                  report a fault. We&apos;ll check for known issues when you
                  contact us.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={safeChecksHref}
                    onClick={() => onTrySafeChecks?.()}
                    className="inline-flex items-center justify-center px-5 h-[40px] rounded-[8px] border border-[#0B2241] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[12.5px] font-bold transition-colors"
                  >
                    Try safe checks
                  </a>

                  <a
                    href={reportFaultHref}
                    onClick={() => onReportFault?.()}
                    className="inline-flex items-center justify-center px-5 h-[40px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12.5px] font-bold transition-colors shadow-[0_2px_8px_rgba(255,193,25,0.25)]"
                  >
                    Report a fault
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[#64748B] text-[11px] leading-[1.45]">
              We never show other customers&apos; details, or a live count of
              outages.
            </p>
          </div>

          {/* Right Column: Skyline Photo with Bottom Quote Pill */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[370px] rounded-[20px] overflow-hidden bg-[#061A33] shadow-[0_10px_28px_rgba(11,34,65,0.12)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Dark gradient scrim for legibility over skyline */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A33]/85 via-[#061A33]/25 to-transparent"
              />

              <div className="relative z-10 h-full p-4 flex items-end">
                <div className="w-full rounded-[12px] bg-[#0B2241]/85 backdrop-blur-sm border border-white/15 px-4 py-3 shadow-[0_8px_20px_rgba(6,26,51,0.35)]">
                  <p className="text-white text-[12px] font-semibold leading-[1.45]">
                    &ldquo;Unknown&rdquo; never means &ldquo;all clear&rdquo;.
                    If we can&apos;t confirm status here, we say so.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";

interface ResultBadge {
  readonly label: string;
  readonly bgClass: string;
  readonly textClass: string;
}

interface BroadbandPlan {
  readonly id: string;
  readonly downloadSpeed: string;
  readonly price: string;
  readonly billingPeriod: string;
  readonly progressPercent: number;
  readonly name: string;
  readonly uploadSpeed: string;
  readonly devices: string;
  readonly contract: string;
  readonly buttonVariant: "dark" | "amber";
  readonly featured: boolean;
}

const POSSIBLE_RESULTS = [
  {
    label: "Eligible",
    bgClass: "bg-[#E8F0FE]",
    textClass: "text-[#1963DD]",
  },
  {
    label: "Manual review",
    bgClass: "bg-[#FEF3C7]",
    textClass: "text-[#92400E]",
  },
  {
    label: "Result out of date",
    bgClass: "bg-[#FEF9C3]",
    textClass: "text-[#854D0E]",
  },
  {
    label: "Not eligible",
    bgClass: "bg-[#E8F0FE]",
    textClass: "text-[#1963DD]",
  },
  {
    label: "Check failed",
    bgClass: "bg-[#FEF3C7]",
    textClass: "text-[#92400E]",
  },
] as const satisfies readonly ResultBadge[];

const BROADBAND_PLANS = [
  {
    id: "ultra-boost",
    downloadSpeed: "152Mbps",
    price: "£46.99",
    billingPeriod: "a month",
    progressPercent: 42,
    name: "Ultra Boost",
    uploadSpeed: "28Mbps",
    devices: "5–8",
    contract: "12 months",
    buttonVariant: "dark",
    featured: false,
  },
  {
    id: "rocket-pro",
    downloadSpeed: "209Mbps",
    price: "£49.99",
    billingPeriod: "a month",
    progressPercent: 52,
    name: "Rocket Pro",
    uploadSpeed: "28Mbps",
    devices: "5–8",
    contract: "12 months",
    buttonVariant: "amber",
    featured: true,
  },
] as const satisfies readonly BroadbandPlan[];

export default function SogeaAddressOptions() {
  return (
    <section className="w-full bg-[#DCF6EA] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-8">
          <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-2.5">
            YOUR RESULTS
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3">
            See the options at your address
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            Offers appear only when Part Fibre can be ordered at the premises
            you select.
          </p>
        </div>

        {/* Possible Results Status Bar */}
        <div className="bg-white rounded-[14px] px-5 py-3.5 mb-7 shadow-[0_4px_16px_rgba(11,34,65,0.04)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#0B2241] text-[12.5px] font-bold mr-1">
              Possible results:
            </span>
            {POSSIBLE_RESULTS.map((badge) => (
              <span
                key={badge.label}
                className={`${badge.bgClass} ${badge.textClass} text-[11px] font-semibold px-2.5 py-1 rounded-[5px] leading-none`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          <a
            href="#"
            aria-label="Check Availability"
            className="inline-flex items-center justify-center bg-[#0B2241] hover:bg-[#143563] text-[#0B2241]/0 select-none text-[12.5px] font-bold px-6 h-[38px] rounded-[7px] transition-colors shrink-0 self-start lg:self-auto"
          >
            Check Availability
          </a>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Plan Cards (2 columns on lg) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BROADBAND_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-[18px] p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  plan.featured
                    ? "border-[1.5px] border-[#4A90E2] shadow-[0_10px_28px_rgba(25,99,221,0.1)]"
                    : "border border-transparent shadow-[0_6px_20px_rgba(11,34,65,0.05)]"
                }`}
              >
                <div>
                  {/* Speed & Price Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[#0B2241] text-[26px] sm:text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em]">
                        {plan.downloadSpeed}
                      </div>
                      <div className="text-[#64748B] text-[12px] mt-0.5">
                        download speed
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[#0B2241] text-[26px] sm:text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em]">
                        {plan.price}
                      </div>
                      <div className="text-[#64748B] text-[12px] mt-0.5">
                        {plan.billingPeriod}
                      </div>
                    </div>
                  </div>

                  {/* Speed Progress Bar */}
                  <div className="w-full h-[5px] bg-[#E2E8F0] rounded-full overflow-hidden my-5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1963DD] to-[#FFC119]"
                      style={{ width: `${plan.progressPercent}%` }}
                    />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-[#0B2241] text-[18px] font-bold pb-4 border-b border-[#E2E8F0]">
                    {plan.name}
                  </h3>

                  {/* Specs List */}
                  <dl className="py-4 space-y-2.5 text-[13px]">
                    <div className="flex items-center justify-between">
                      <dt className="text-[#64748B]">Upload</dt>
                      <dd className="text-[#0B2241] font-bold">
                        {plan.uploadSpeed}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-[#64748B]">Devices</dt>
                      <dd className="text-[#0B2241] font-bold">
                        {plan.devices}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-[#64748B]">Contract</dt>
                      <dd className="text-[#0B2241] font-bold">
                        {plan.contract}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Action Button */}
                <a
                  href="#"
                  aria-label={`Check availability for ${plan.name}`}
                  className={`mt-2 w-full h-[44px] rounded-[8px] text-[13.5px] font-bold inline-flex items-center justify-center transition-colors ${
                    plan.buttonVariant === "amber"
                      ? "bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241]"
                      : "bg-[#0B2241] hover:bg-[#143563] text-[#0B2241]/0 select-none"
                  }`}
                >
                  Check availability
                </a>
              </div>
            ))}
          </div>

          {/* Right Specialist Card */}
          <div className="lg:col-span-4 bg-white rounded-[18px] p-6 sm:p-7 shadow-[0_6px_20px_rgba(11,34,65,0.05)] flex flex-col justify-between">
            <div>
              <h3 className="text-[#0B2241] text-[20px] font-extrabold leading-[1.25] mb-3">
                Need something different?
              </h3>

              <p className="text-[#64748B] text-[13.5px] leading-[1.55] mb-5">
                If full fibre is not orderable at your address, or you have
                several sites, a specialist can help.
              </p>

              <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#E2E8F0] mb-6">
                <img
                  src="/Images/fttp/5.png"
                  alt="Business connectivity specialist reviewing options"
                  className="w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[12px] border-[1.5px] border-dashed border-[#4B7FD6]/75"
                />
              </div>
            </div>

            <a
              href="#"
              className="w-full h-[44px] rounded-[8px] border border-[#0B2241] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[13.5px] font-bold inline-flex items-center justify-center transition-colors"
            >
              Speak to a Business Specialist
            </a>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-[#64748B] text-[12px] mt-6">
          No SOGEA plans, prices or speeds have been supplied. Every{" "}
          <span className="inline-block bg-[#E2E8F0] text-[#0B2241] font-bold text-[11px] px-1.5 py-0.5 rounded-[4px] mx-0.5">
            [verified]
          </span>{" "}
          value is bound to the live source after your address check.
        </p>
      </div>
    </section>
  );
}

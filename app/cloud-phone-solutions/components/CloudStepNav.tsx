import React from "react";

const STEP_ITEMS = [
  {
    step: "01",
    title: "Business VoIP / Digital Lines",
    subtitle: "Explore digital lines",
    href: "#business-voip-digital-lines",
    active: false,
  },
  {
    step: "02",
    title: "Cloud Phone Solutions",
    subtitle: "You're here",
    href: "#cloud-phone-solutions",
    active: true,
  },
  {
    step: "03",
    title: "Keep Your Number",
    subtitle: "Coming soon",
    href: "#keep-your-number",
    active: false,
  },
  {
    step: "04",
    title: "Call Features & Add-ons",
    subtitle: "Coming soon",
    href: "#call-features-addons",
    active: false,
  },
] as const;

export default function CloudStepNav() {
  return (
    <nav
      aria-label="Cloud phone journey steps"
      className="w-full bg-[#F7F9FB] py-3"
    >
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {STEP_ITEMS.map((item) =>
            item.active ? (
              <a
                key={item.step}
                href={item.href}
                aria-current="step"
                className="flex min-h-[60px] items-center gap-3.5 rounded-[10px] border border-[#FFD100] bg-[#061B31] px-4 py-2.5 text-white shadow-[0_8px_20px_rgba(6,27,49,0.16)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span className="shrink-0 text-[13px] leading-none font-extrabold tracking-[0.02em] text-[#FFD100]">
                  {item.step}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[13px] leading-[1.2] font-bold text-white">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] leading-[1.2] font-normal text-[#A6B7C8]">
                    {item.subtitle}
                  </span>
                </span>
              </a>
            ) : (
              <a
                key={item.step}
                href={item.href}
                className="flex min-h-[60px] items-center gap-3.5 rounded-[10px] border border-[#E5EAF0] bg-white px-4 py-2.5 text-[#0F2337] shadow-[0_2px_6px_rgba(15,35,55,0.03)] transition-colors duration-150 hover:border-[#CBD5E1] hover:bg-[#FCFDFE]"
              >
                <span className="shrink-0 text-[13px] leading-none font-extrabold tracking-[0.02em] text-[#2B5B84]">
                  {item.step}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[13px] leading-[1.2] font-bold text-[#102438]">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] leading-[1.2] font-normal text-[#7B8A9B]">
                    {item.subtitle}
                  </span>
                </span>
              </a>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}

import React from "react";

const SERVICE_STEPS = [
  {
    step: "01",
    title: "Installation & Onboarding",
    href: "#installation-onboarding",
    active: false,
  },
  {
    step: "02",
    title: "Business Support & SLAs",
    href: "#business-support-slas",
    active: false,
  },
  {
    step: "03",
    title: "Cyber Security & Protection",
    href: "#cyber-security-protection",
    active: false,
  },
  {
    step: "04",
    title: "Managed Services",
    href: "#managed-services",
    active: false,
  },
  {
    step: "05",
    title: "Request a Tailored Quote",
    href: "#start-quote-request",
    active: true,
  },
] as const;

export default function BusinessServicesStepNav() {
  return (
    <nav
      aria-label="Business services journey steps"
      className="w-full bg-[#F7F9FB] py-3"
    >
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {SERVICE_STEPS.map((item) =>
            item.active ? (
              <a
                key={item.step}
                href={item.href}
                aria-current="step"
                className="flex min-h-[48px] items-center gap-2.5 rounded-[8px] border border-[#FFD100] bg-[#061B31] px-3.5 py-2.5 text-white shadow-[0_8px_20px_rgba(6,27,49,0.16)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span className="shrink-0 text-[12px] leading-none font-extrabold tracking-[0.02em] text-[#FFD100]">
                  {item.step}
                </span>
                <span className="min-w-0 truncate text-[12px] leading-[1.2] font-bold text-white">
                  {item.title}
                </span>
              </a>
            ) : (
              <a
                key={item.step}
                href={item.href}
                className="flex min-h-[48px] items-center gap-2.5 rounded-[8px] border border-[#E5EAF0] bg-white px-3.5 py-2.5 text-[#0F2337] shadow-[0_2px_6px_rgba(15,35,55,0.03)] transition-colors duration-150 hover:border-[#CBD5E1] hover:bg-[#FCFDFE]"
              >
                <span className="shrink-0 text-[12px] leading-none font-extrabold tracking-[0.02em] text-[#1D5B96]">
                  {item.step}
                </span>
                <span className="min-w-0 truncate text-[12px] leading-[1.2] font-bold text-[#102438]">
                  {item.title}
                </span>
              </a>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}

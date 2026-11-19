import React from "react";
import { Tag, Phone, Laptop, Wrench, FileText, Headphones } from "lucide-react";

const QUOTE_SECTION_DATA = {
  badge: "CLEAR PRICING",
  heading: "What your quote will show.",
  subheadingLine1:
    "We don’t publish package prices for cloud phone yet. Your written quote",
  subheadingLine2: "itemises every cost, so nothing is hidden.",
  image: {
    src: "/Images/cloud/7.png",
    alt: "Smiling business professional standing in front of glass wall with sticky notes",
  },
  items: [
    {
      id: "licences-or-seats",
      icon: "tag",
      title: "Licences or seats",
      description:
        "Per user or per line, monthly or annual, with or without VAT.",
      pillLabel: "In your written quote",
      href: "#quote-licences-or-seats",
    },
    {
      id: "call-allowances",
      icon: "phone",
      title: "Call allowances",
      description: "What’s included for UK, mobile and international calls.",
      pillLabel: "In your written quote",
      href: "#quote-call-allowances",
    },
    {
      id: "hardware",
      icon: "hardware",
      title: "Hardware",
      description: "Buy, rent or bring your own, plus any delivery.",
      pillLabel: "In your written quote",
      href: "#quote-hardware",
    },
    {
      id: "setup-migration",
      icon: "setup",
      title: "Set-up & migration",
      description: "Installation, onboarding and number transfer costs.",
      pillLabel: "In your written quote",
      href: "#quote-setup-migration",
    },
    {
      id: "minimum-term",
      icon: "term",
      title: "Minimum term",
      description: "Contract length, renewal and how to cancel.",
      pillLabel: "In your written quote",
      href: "#quote-minimum-term",
    },
    {
      id: "support-service-levels",
      icon: "support",
      title: "Support & service levels",
      description:
        "Only the support hours and service levels we can confirm in writing.",
      pillLabel: "In your written quote",
      href: "#quote-support-service-levels",
    },
  ],
  disclaimer:
    "A quote isn't an order. Nothing is set up, ported or charged until you sign an agreement.",
} as const;

export default function CloudQuoteBreakdown() {
  return (
    <section
      id="clear-pricing"
      aria-labelledby="cloud-quote-heading"
      className="w-full bg-[#FFFBEB] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Badge, Heading, Copy, Rounded Photo */}
          <div className="flex flex-col lg:col-span-5">
            <div className="inline-flex w-fit items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {QUOTE_SECTION_DATA.badge}
              </span>
            </div>

            <h2
              id="cloud-quote-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
            >
              {QUOTE_SECTION_DATA.heading}
            </h2>

            <p className="mt-3 max-w-[470px] text-[13px] leading-[1.5] font-normal text-[#475569] sm:text-[13.5px]">
              <span className="block">
                {QUOTE_SECTION_DATA.subheadingLine1}
              </span>
              <span className="block">
                {QUOTE_SECTION_DATA.subheadingLine2}
              </span>
            </p>

            <div className="mt-6 overflow-hidden rounded-[14px] border border-[#F1E2A8] bg-[#E8EEF4] shadow-[0_6px_18px_rgba(8,28,46,0.06)]">
              <img
                src={QUOTE_SECTION_DATA.image.src}
                alt={QUOTE_SECTION_DATA.image.alt}
                className="h-[245px] w-full object-cover object-[58%_22%] sm:h-[285px] lg:h-[310px]"
              />
            </div>
          </div>

          {/* Right Column: 2x3 Grid of Quote Cards + Dashed Disclaimer Box */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {QUOTE_SECTION_DATA.items.map((item) => (
                <div
                  key={item.id}
                  className="flex min-h-[144px] flex-col justify-between rounded-[12px] border border-[#F3E5B0] bg-white p-4 shadow-[0_1px_3px_rgba(8,28,46,0.02)]"
                >
                  <div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#FFD100] text-[#081C2E]">
                      {item.icon === "tag" && (
                        <Tag className="h-3.5 w-3.5 stroke-[2.2]" />
                      )}
                      {item.icon === "phone" && (
                        <Phone className="h-3.5 w-3.5 stroke-[2.2]" />
                      )}
                      {item.icon === "hardware" && (
                        <Laptop className="h-3.5 w-3.5 stroke-[2.2]" />
                      )}
                      {item.icon === "setup" && (
                        <Wrench className="h-3.5 w-3.5 stroke-[2.2]" />
                      )}
                      {item.icon === "term" && (
                        <FileText className="h-3.5 w-3.5 stroke-[2.2]" />
                      )}
                      {item.icon === "support" && (
                        <Headphones className="h-3.5 w-3.5 stroke-[2.2]" />
                      )}
                    </div>

                    <h3 className="mt-3 text-[13.5px] leading-[1.3] font-bold text-[#081C2E]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[11.5px] leading-[1.45] font-normal text-[#5A6A7E]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3">
                    <a
                      href={item.href}
                      className="inline-flex items-center rounded-[5px] bg-[#EBF3FA] px-2.5 py-1 text-[10.5px] font-semibold text-[#1D5B96] transition-colors hover:bg-[#DCEAF7]"
                    >
                      {item.pillLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Dashed Disclaimer Box */}
            <div className="mt-4 rounded-[10px] border border-dashed border-[#E5C97B] bg-[#FFFDF5] px-4 py-3">
              <p className="text-[11px] leading-[1.42] font-normal text-[#8B6A2B]">
                {QUOTE_SECTION_DATA.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

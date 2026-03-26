import React from "react";

const Items = [
  "HD Voice",
  "PSTN Switch-Off Ready",
  "UK Support",
  "Ofcom Compliant",
  "Easy Setup",
];
export default function DigitalLinesHero() {
  return (
    <>
      <section
        aria-labelledby="digital-lines-heading"
        className="w-full bg-[#10446C] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-5xl mx-auto text-center text-white dark:text-gray-100">
          {/* Heading */}
          <h2
            id="digital-lines-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Future-Proof Digital Phone Lines for Homes & Businesses.
          </h2>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Crystal-clear voice, 20+ smart features, and complete readiness for
            the UK PSTN switch- off. Flexible terms and transparent pricing from
            Zoiko Broadband.
          </p>

          <ul className="flex flex-wrap gap-5 justify-center mt-8" role="list">
            {Items.map((item) => ( 
              <li key={item}>
                <span
                  className="  font-medium md:font-semibold  text-gray-400 text-sm md:text-base px-3 py-2 
                dark:bg-gray-700 dark:text-gray-300"
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

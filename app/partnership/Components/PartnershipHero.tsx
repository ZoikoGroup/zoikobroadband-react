import React from "react";

export default function PartnershipHero() {
  return (
    <>
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8 lg:py-22">
        <div className="max-w-6xl mx-auto text-white text-center">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight">
            Partnerships That Power Zoiko Broadband
          </h1>
          {/* Description */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed md:leading-9 max-w-4xl mx-auto">
            Our service is built on strong partnerships with Tier-1 network
            providers, technology leaders, and regulators. These affiliations
            ensure customers receive broadband that is fast, compliant, and
            future- ready.
          </p>
        </div>
      </section>
    </>
  );
}

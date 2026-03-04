import Link from "next/link";
import React from "react";

export default function ZoikoGroupHero() {
  return (
    <>
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8 lg:py-22">
        <div className="max-w-6xl mx-auto text-white text-center">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight">
            Stronger Together – Powered by Zoiko Group
          </h1>
          {/* Description */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed md:leading-9 max-w-5xl mx-auto">
            Zoiko Broadband is part of Zoiko Telecom Ltd, a UK-registered
            company and subsidiary of Zoiko Group Inc. This connection ensures
            the financial stability, innovation, and governance expected from a
            global enterprise — all channelled into delivering fast, reliable
            broadband for your home or business.
          </p>
        </div>
        <Link href={"about-us"}>
          <div className="mt-8 bg-[#f5c241] text-black font-semibold px-6 py-4 rounded-4xl max-w-fit mx-auto">
            Learn More About Zoiko Group
          </div>
        </Link>
      </section>
    </>
  );
}

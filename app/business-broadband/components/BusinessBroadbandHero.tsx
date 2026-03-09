import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BusinessBroadbandHero() {
  return (
    <>
      <section
        aria-labelledby="business-broadband-heading"
        className="bg-[#10446C] text-white w-full py-8 lg:py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center">
              <h2
                id="business-broadband-heading"
                className="text-[#F5C241] font-bold text-2xl sm:text-3xl lg:text-[40px] leading-relaxed mb-4 max-w-xl"
              >
                Business Broadband That Works as Hard as You Do
              </h2>

              <p className="text-lg sm:text-xl text-blue-200 max-w-xl mb-4">
                High-performance fibre designed for UK businesses of all sizes.
              </p>

              <p className="text-base sm:text-lg text-white max-w-2xl mb-8">
                From micro-businesses to multi-site operations, Zoiko Broadband
                provides robust, business-ready connectivity solutions. We
                deliver fast speeds, enhanced upload capacity, and service
                reliability that keeps your business online and competitive.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#10446C] transition"
                >
                  Get Custom Quote
                </Link>

                <Link
                  href="/why-zoiko"
                  className="bg-white text-[#10446C] px-6 py-3 rounded-lg font-semibold hover:bg-[#eab530] transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE + STATS */}
            <div className="relative">
              <Image
                src="/Images/BusinessBroadband/BB-hero.webp"
                alt="Zoiko business broadband team"
                width={400}
                height={200}
                priority
                className="w-full h-auto object-cover rounded-xl"
              />

              {/* Stats Overlay */}
              {/* <div className="absolute bottom-4 left-4 grid grid-cols-2 gap-3 bg-[#1b4f73]/90 p-4 rounded-xl backdrop-blur">

          {stats.map((item) => (

            <div
              key={item.label}
              className="text-center text-white"
            >
              <p className="text-lg font-bold">
                {item.value}
              </p>

              <p className="text-xs text-blue-200">
                {item.label}
              </p>
            </div>

          ))}

        </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

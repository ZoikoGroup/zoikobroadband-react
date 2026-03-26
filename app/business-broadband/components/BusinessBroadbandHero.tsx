import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BusinessBroadbandHero() {
  return (
    <section
      aria-labelledby="business-broadband-heading"
      className="bg-[#10446C] dark:bg-gray-950 text-white w-full py-8 lg:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <h1
              id="business-broadband-heading"
              className="text-[#F5C241] font-bold text-2xl sm:text-3xl lg:text-[40px] leading-relaxed mb-4 max-w-xl"
            >
              Business Broadband That Works as Hard as You Do
            </h1>

            <p className="text-lg sm:text-xl text-blue-200 dark:text-blue-300 max-w-xl mb-4">
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

          {/* RIGHT IMAGE */}
          <div className="relative">
            <Image
              src="/Images/BusinessBroadband/BB-hero.webp"
              alt="Zoiko business broadband team"
              width={800}
              height={500}
              priority
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
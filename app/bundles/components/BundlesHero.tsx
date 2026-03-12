import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BundlesHero() {
  return (
    <>
      <section
        aria-labelledby="bundle-services"
        className="bg-[#10446C] text-white w-full py-12"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center">
              <h2
                id="bundle-services"
                className="font-bold text-2xl sm:text-3xl md:text-5xl leading-tight mb-4"
              >
                More Services <br />
                Bigger Savings
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mb-6">
                Bundle Zoiko Broadband, Digital Lines, and Entertainment to save
                up to 30%.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/bundle"
                  className="bg-white text-[#10446C] px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition"
                >
                  Build Your Bundle
                </Link>

                <Link
                  href="/plans"
                  className="bg-[#F6C140] text-[#10446C] px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#eab530] transition"
                >
                  See All Plans
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE GRID */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="row-span-2">
                <Image
                  src="/Images/Bundles/bundle-hero1.png"
                  alt="Customer using Zoiko services"
                  width={500}
                  height={600}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Top small */}
              <Image
                src="/Images/Bundles/bundle-hero2.png"
                alt="Laptop workspace with broadband equipment"
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Bottom small */}
              <Image
                src="/Images/Bundles/bundle-hero3.png"
                alt="5G connectivity illustration"
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

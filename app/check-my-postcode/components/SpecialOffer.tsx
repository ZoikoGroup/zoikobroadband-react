import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SpecialOffer() {
  return (
    <>
      <section aria-labelledby="offer-heading" className="w-full bg-gray-50 ">
        <div className="">
          <div className="relative overflow-hidden shadow-xl">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-[#2F5BFF] via-[#1E5EA8] to-[#0D3E63]" />

            {/* Wave Layer */}
            <div className="absolute inset-0 bg-[url('/Images/Whyzoiko/wave.png')] bg-cover bg-center opacity-60 mix-blend-screen" />

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.35),transparent_55%)]" />

            {/* Content */}
            <div className="relative flex flex-col items-center text-center gap-8 px-6 py-14 lg:py-16 text-white">
              {/* Offer Badge */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src="/Images/Checkmypost/Star.png"
                    alt=""
                    aria-hidden="true"
                    width={112}
                    height={112}
                    className="object-contain"
                  />

                  <span className="absolute text-sm font-bold text-gray-900">
                    Special <br /> Offer
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h2
                id="offer-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
              >
                Unlimited Access to Internet
              </h2>

              <div className="flex items-center justify-center gap-3 text-white/90">
                <Image
                  src="/Images/Checkmypost/wifi.png"
                  alt=""
                  aria-hidden="true"
                  width={26}
                  height={26}
                  className="w-6 h-6 sm:w-6 sm:h-6 object-contain"
                />
                <p className="text-base sm:text-lg leading-relaxed">
                  Free WiFi router included
                </p>
              </div>

              {/* CTA Button */}
              <Link
                href="/fibre-packages"
                className="inline-flex items-center justify-center bg-white text-[#10446C] font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Buy Plan Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

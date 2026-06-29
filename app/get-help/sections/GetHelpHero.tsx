import React from "react";
import Link from "next/link";

export default function GetHelpHero() {
  return (
    <>
      <section
        aria-labelledby="get-help-heading"
        className="w-full bg-[#10446C] dark:bg-gray-950 dark-text-white py-16 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-5xl mx-auto text-white text-center">
          {/* Heading */}
          <h1
            id="get-help-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Need help with your broadband? We've got you covered.
          </h1>

          <p className="mt-4 text-base md:text-xl font-semibold text-white/90 max-w-4xl mx-auto  ">
            From setup to troubleshooting, get quick answers and real-time
            support — all in one place.
          </p>

          {/* Buttons */}
          <div className="max-w-xl mx-auto px-6 py-6 mt-8">
            <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
              <Link
                href="https://tawk.to/chat/68c5379a0a06ff1929296dd0/1j5162dnk"
                className="bg-[#F6C140] dark:bg-white text-[#10446C] px-6 py-3 rounded-md font-semibold text-center hover:bg-[#eab530] transition"
              >
                Start Live Chat
              </Link>
              <Link
                href="/setup-installation"
                className="bg-white text-[#10446C] px-6 py-3 rounded-md font-semibold text-center hover:bg-gray-100 transition"
              >
                Check Setup Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full bg-[#10B981] dark:bg-gray-900 dark:text-white flex flex-col md:flex-row gap-5 justify-center items-center py-4">
        <p className="text-center text-white py-2 text-base md:text-lg font-normal">
          No known service issues in your area
        </p>
        <Link
          href="tel:+442071646399"
          className="border-2 border-[#F6C140] text-[#10446C] dark:bg-white dark:border-none px-5 py-3 rounded-md font-semibold text-center hover:bg-[#F6C140] transition"
        >
          Request a callback
        </Link>
      </div>
    </>
  );
}

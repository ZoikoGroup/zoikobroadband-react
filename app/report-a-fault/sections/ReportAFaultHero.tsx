import React from "react";
import Link from "next/link";

export default function ReportAFaultHero() {
  return (
    <>
      <section
        aria-labelledby="report-a-issue-heading"
        className="w-full bg-[#10446C] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-5xl mx-auto text-center text-white dark:text-gray-100">
          {/* Heading */}
          <h2
            id="report-a-issue-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Having Broadband Issues? We're On It.
          </h2>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Tell us what's gone wrong and we'll either fix it remotely or get
            you connected to an expert — fast.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="#"
              className="bg-white text-[#10446C] dark:bg-gray-200 dark:text-gray-900 px-6 py-4 rounded-md font-semibold text-sm md:text-base hover:bg-gray-100 transition"
            >
              Start Fault Report
            </Link>

            <Link
              href="/contact-us"
              rel="noopener noreferrer"
              aria-label="Get help with billing issues"
              className="border border-white dark:border-gray-400 text-white dark:text-gray-200 px-6 py-4 rounded-md font-semibold text-sm md:text-base hover:bg-white hover:text-[#10446C] dark:hover:bg-gray-200 dark:hover:text-black transition"
            >
              Run a Quick Line Check
            </Link>
          </div>
        </div>
      </section>

      {/* Check your postcode */}
      <section className="w-full bg-[#F4F8FC] dark:bg-gray-800 py-20 px-4 transition-colors duration-300">
  <div className="max-w-3xl mx-auto flex flex-col justify-center items-center">
    {/* Card */}
    <div className="w-full text-center border border-gray-200 dark:border-gray-800 p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
      {/* Text */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#10446C] dark:text-blue-400">
        Check Service Status in Your Area
      </h2>

      {/* Form */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter your postcode (e.g. SW1A 1AA)"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 dark:text-white 
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#F5C241] transition-all"
        />

        <button
          className="px-6 py-4 rounded-xl bg-[#F5C241] text-[#10446C] 
                     font-bold hover:bg-[#E6B93A] active:scale-95 transition-all shadow-md"
        >
          Check Status
        </button>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

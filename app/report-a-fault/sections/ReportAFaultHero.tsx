import React from "react";
import Link from "next/link";

export default function ReportAFaultHero() {
  return (
    <>
      <section
        aria-labelledby="report-a-issue-heading"
        className="w-full bg-[#10446C] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
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
    </>
  );
}

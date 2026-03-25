"use client";
import Link from "next/link";
import { useState } from "react";
const DURATIONS = [
  "All Packages",
  "SOGEA",
  "Full Fibre (FTTP)",
  "Business Ready",
];

export default function AllPlansHero() {
  const [selected, setSelected] = useState<string>("All Packages");
  return (
    <>
      <section
        aria-labelledby="broadband-heading"
        className="w-full bg-[#10446C] dark:bg-blue-950 py-14 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Heading */}
          <h2
            id="broadband-heading"
            className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight"
          >
            Explore Our Home Broadband Packages
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-lg md:text-2xl font-semibold text-white/90">
            From everyday browsing to gigabit power - there's a Zoiko plan for
            everyone.
          </p>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            At Zoiko Broadband, we offer a range of full fibre and SOGEA
            broadband packages designed to suit every lifestyle, household size,
            and digital need. Whether you're after basic connectivity or
            ultra-high-speed performance, all our plans come with clear pricing,{" "}
            <span className="text-[#F6C140] font-medium">UK-based support</span>
            , and future-ready fibre.
          </p>

          {/* CTA Card */}
          <div className="mt-8 max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 ">
            <h3 className="text-base md:text-lg font-semibold text-white">
              Check availability at your address
            </h3>

            <Link
              href="/check-my-postcode"
              aria-label="Check broadband availability"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl border border-white
        text-white font-semibold text-sm
        hover:bg-white hover:text-[#10446C]
        transition"
            >
              Check Now
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="py-4">
        <div className="flex justify-center items-center gap-2 min-h-20 p-6 flex-wrap">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setSelected(d)}
              className={`px-4 py-2 rounded-xl text-base font-medium transition 
                ${
                  selected === d
                    ? "bg-[#10446C] text-white"
                    : "bg-gray-100 border border-gray-800 text-gray-500 hover:bg-gray-200"
                }
            `}
            >
              {d}
            </button>
          ))}
        </div>
      </section> */}
    </>
  );
}

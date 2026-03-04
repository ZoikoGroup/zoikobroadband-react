import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      {/* Ofcom-speed-commitment hero section... */}
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Broadband Speeds You Can Count On
          </h1>
          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            We're committed to transparency. Here's what you can expect when it
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            comes to your broadband speed — before and after you sign up.
          </p>
        </div>
      </section>

      {/* Speed Commitment Summary... */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-18">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Speed Commitment Summary
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Advertised Speeds
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  Average download/upload speeds per plan (e.g., "67 Mbps")
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Speeds Ranges
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  e.g., "Typical range: 55–74 Mbps (peak 8–10 PM)"
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Minimum Guaranteed Speed
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  Confirmed pre-checkout.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Upload Speeds
                </h2>
                <p className="mt-3 mb-3 text-base  text-gray-700">
                  Always displayed clearly.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Technology Notes
                </h2>
                <p className="mt-3 mb-3 text-base  text-gray-700">
                  Differences for FTTC, FTTP, ADSL .
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Peak-Time Speeds
                </h2>
                <p className="mt-3 mb-3 text-base  text-gray-700">
                  Backed by real performance data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll See During Sign-Up */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-4">
            What You'll See During Sign-Up
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">Address Checker:</span>{" "}
            <span className="font-normal">Shows predicted speed range</span>
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">
              Minimum Speed Disclosure:
            </span>{" "}
            <span className="font-normal">Confirmed before checkout</span>
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">Confirmation:</span>{" "}
            <span className="font-normal">
              Included in contract summary and welcome email
            </span>
          </p>
        </div>
        <div className="mt-8 bg-[#0C3A5A] text-white font-semibold px-6 md:px-8 py-4 rounded-xl  shadow-sm max-w-fit mx-auto">
          <Link href="/speed-check">Run a Speed Check at Your Address</Link>
        </div>
      </section>

      {/* After You're Connected — Your Rights */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-18">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            After You're Connected — Your Rights
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Highlight Item */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-black">
                  Speed below guarantee:
                </span>{" "}
                Contact support for troubleshooting
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-black">
                  No improvement after 30 days:
                </span>{" "}
                Right to exit contract without penalty
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-black">Applies to:</span>{" "}
                All residential fixed-line customers
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-[#0C3A5A] text-white font-semibold px-8 py-4 rounded-xl  shadow-sm max-w-fit mx-auto">
          <Link href="/report-speed-issue">Report a Speed Issue</Link>
        </div>
      </section>

      {/* How We Measure Speeds */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-4">
            How We Measure Speeds
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">
              Measured at the router
            </span>{" "}
            <span className="font-normal">(not the device)</span>
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">Speeds vary</span>{" "}
            <span className="font-normal">with home setup/Wi-Fi</span>
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">Wired connection</span>{" "}
            <span className="font-normal">provides best accuracy</span>
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold text-gray-800">Speed tests</span>{" "}
            <span className="font-normal">use Ofcom-approved tools</span>
          </p>
        </div>
      </section>

      {/* Ofcom Voluntary Code — Our Compliance */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-18">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Ofcom Voluntary Code — Our Compliance
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Transparency
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  Predicted speeds shown at sign-up
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Accountability
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  Your right to exit clearly explained
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Support
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  Proactive speed troubleshooting
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Fairness
                </h2>
                <p className="mt-3 mb-3 text-base  text-gray-700">
                  Realistic speed advertising
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

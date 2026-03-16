
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="dark:text-white">

      {/* Hero section */}
      <section className="w-full bg-[#10446C] dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Broadband Speeds You Can Count On
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            We're committed to transparency. Here's what you can expect when it
          </p>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            comes to your broadband speed — before and after you sign up.
          </p>

        </div>
      </section>


      {/* Speed Commitment Summary */}
      <section className="w-full bg-[#f9f9f9] dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-18">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl sm:text-2xl font-semibold text-[#10446C] dark:text-white mb-8">
            Speed Commitment Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "Advertised Speeds",
                text: 'Average download/upload speeds per plan (e.g., "67 Mbps")',
              },
              {
                title: "Speeds Ranges",
                text: "Typical range: 55–74 Mbps (peak 8–10 PM)",
              },
              {
                title: "Minimum Guaranteed Speed",
                text: "Confirmed pre-checkout.",
              },
              {
                title: "Upload Speeds",
                text: "Always displayed clearly.",
              },
              {
                title: "Technology Notes",
                text: "Differences for FTTC, FTTP, ADSL.",
              },
              {
                title: "Peak-Time Speeds",
                text: "Backed by real performance data.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border-l-4 border-amber-400 dark:border-amber-500"
              >
                <h2 className="font-semibold text-2xl text-[#10446C] dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-3 text-base text-gray-700 dark:text-gray-300">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* What You'll See During Sign-Up */}
      <section className="w-full bg-white dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] dark:text-white mb-4">
            What You'll See During Sign-Up
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-bold">Address Checker:</span> Shows predicted speed range
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-bold">Minimum Speed Disclosure:</span> Confirmed before checkout
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-bold">Confirmation:</span> Included in contract summary and welcome email
          </p>

        </div>

        <div className="mt-8 bg-[#0C3A5A] dark:bg-gray-800 text-white font-semibold px-6 md:px-8 py-4 rounded-xl shadow-sm max-w-fit mx-auto">
          <Link href="/speed-check">Run a Speed Check at Your Address</Link>
        </div>

      </section>


      {/* After You're Connected — Your Rights */}
      <section className="w-full bg-[#f9f9f9] dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-18">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] dark:text-white mb-8">
            After You're Connected — Your Rights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "Speed below guarantee:",
                text: "Contact support for troubleshooting",
              },
              {
                title: "No improvement after 30 days:",
                text: "Right to exit contract without penalty",
              },
              {
                title: "Applies to:",
                text: "All residential fixed-line customers",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border-l-4 border-amber-400"
              >
                <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold">{item.title}</span> {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>

        <div className="mt-8 bg-[#0C3A5A] dark:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl shadow-sm max-w-fit mx-auto">
          <Link href="/report-speed-issue">Report a Speed Issue</Link>
        </div>

      </section>


      {/* How We Measure Speeds */}
      <section className="w-full bg-white dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] dark:text-white mb-4">
            How We Measure Speeds
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold">Measured at the router</span> (not the device)
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold">Speeds vary</span> with home setup/Wi-Fi
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold">Wired connection</span> provides best accuracy
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 dark:text-gray-300 sm:leading-10 md:leading-10 max-w-3xl">
            <span className="font-bold">Speed tests</span> use Ofcom-approved tools
          </p>

        </div>

      </section>


      {/* Ofcom Voluntary Code */}
      <section className="w-full bg-[#f9f9f9] dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-18">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl sm:text-2xl font-semibold text-[#10446C] dark:text-white mb-8">
            Ofcom Voluntary Code — Our Compliance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              { title: "Transparency", text: "Predicted speeds shown at sign-up" },
              { title: "Accountability", text: "Your right to exit clearly explained" },
              { title: "Support", text: "Proactive speed troubleshooting" },
              { title: "Fairness", text: "Realistic speed advertising" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border-l-4 border-amber-400"
              >
                <h2 className="font-semibold text-2xl text-[#10446C] dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-3 text-base text-gray-700 dark:text-gray-300">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
}

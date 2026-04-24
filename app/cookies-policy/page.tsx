
'use client';
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [necessary, setNecessary] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [functionality, setFunctionality] = useState(false);
  const [targeting, setTargeting] = useState(false);

  return (
    <div className="dark:bg-gray-900 dark:text-white">

      {/* Hero Section */}
      <section className="w-full bg-[#10446C] dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Our Use of Cookies — Transparent and Secure
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            This Cookies Policy explains what cookies we use, why we use them,
            and how you can manage your preferences at any time.
          </p>

          <div className="mt-8 bg-white text-black px-6 py-4 rounded-xl border-l-4 border-amber-400 shadow-sm max-w-5xl mx-auto dark:bg-gray-900 dark:text-white">
            We use cookies to personalise content, improve user experience, and
            analyse website traffic.

            <div className="mt-5 flex justify-center space-x-2 font-semibold">
              <button className="bg-[#f5c241] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0C3A5A] transition-colors">
                Accept All
              </button>

              <button className="bg-[#f5c241] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0C3A5A] transition-colors">
                Reject All
              </button>

              <button className="bg-[#f5c241] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0C3A5A] transition-colors">
                Customise
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white text-[#0C3A5A] font-semibold px-6 py-4 rounded-xl shadow-sm max-w-fit mx-auto dark:bg-gray-950 dark:text-white">
            Update Cookie Preferences
          </div>

        </div>
      </section>


      {/* Cookies Overview */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8 dark:bg-gray-950 dark:text-white">
        <div className="max-w-6xl mx-auto">

          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-4 dark:text-white">
            Cookies Overview
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-white">
              What are cookies?
            </span>{" "}
            Small text files stored on your device to help websites function.
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-4xl dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-white">
              Why we use them:
            </span>{" "}
            Improve site speed, provide security, personalise settings, show
            relevant content.
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-white">
              Consent mechanism:
            </span>{" "}
            Users can change preferences via floating icon or link.
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl dark:text-gray-300">
            <Link href="/cookie-preferences" className="text-blue-600 hover:underline">
              Go to Manage My Cookie Settings
            </Link>
          </p>

        </div>
      </section>


      <hr className="border-gray-200 dark:border-gray-800" />


      {/* Cookies Table */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-950 dark:text-white">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8 dark:text-white">
            Types of Cookies We Use
          </h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <table className="w-full text-left border-collapse">

              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="sm:text-sm md:text-lg font-semibold">
                  <th className="px-6 py-4 text-[#10446C] border-b dark:text-white">Cookie Type</th>
                  <th className="px-6 py-4 text-[#10446C] border-b dark:text-white">Description</th>
                  <th className="px-6 py-4 text-[#10446C] border-b dark:text-white">Examples</th>
                  <th className="px-6 py-4 text-[#10446C] border-b dark:text-white">Essential?</th>
                </tr>
              </thead>

              <tbody className="sm:text-sm md:text-base text-gray-700 dark:text-gray-300">

                <tr className="border-b border-gray-300 dark:border-gray-800">
                  <td className="px-6 py-4">Setting up service</td>
                  <td className="px-6 py-4">Required for website functionality and security</td>
                  <td className="px-6 py-4">Login sessions, fraud prevention</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>

                <tr className="border-b border-gray-300 dark:border-gray-800">
                  <td className="px-6 py-4">Performance & Analytics</td>
                  <td className="px-6 py-4">Helps improve performance and analyse usage</td>
                  <td className="px-6 py-4">Google Analytics, Hotjar</td>
                  <td className="px-6 py-4">No</td>
                </tr>

                <tr className="border-b border-gray-300 dark:border-gray-800">
                  <td className="px-6 py-4">Functionality</td>
                  <td className="px-6 py-4">Remembers settings and preferences</td>
                  <td className="px-6 py-4">Language, form autofill</td>
                  <td className="px-6 py-4">No</td>
                </tr>

                <tr>
                  <td className="px-6 py-4">Targeting / Advertising</td>
                  <td className="px-6 py-4">Displays personalised content and ads</td>
                  <td className="px-6 py-4">Facebook Pixel, Google Ads</td>
                  <td className="px-6 py-4">No</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>


      <hr className="border-gray-200 dark:border-gray-800" />


      {/* Third Party */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8 dark:bg-gray-950 dark:text-white">
        <div className="max-w-6xl mx-auto">

          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-4 dark:text-white">
            Third-Party Cookies
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-11 max-w-3xl dark:text-gray-300">
            Some cookies are set by trusted third-party providers.
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-11 max-w-3xl dark:text-gray-300">
            These may track you across websites.
          </p>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-11 max-w-3xl dark:text-gray-300">
            Control via browser or third-party opt-out.
          </p>

        </div>
      </section>

    </div>
  );
}


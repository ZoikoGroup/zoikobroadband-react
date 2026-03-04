'use client';
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function page() {
  const [necessary, setNecessary] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [functionality, setFunctionality] = useState(false);
  const [targeting, setTargeting] = useState(false);
  return (
    <div>
      {/* Cookies policy hero section... */}
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Our Use of Cookies — Transparent and Secure
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            This Cookies Policy explains what cookies we use, why we use them,
            and how you can manage your preferences at any time.
          </p>

          {/* Updated Box */}
          <div className="mt-8 bg-white text-black px-6 py-4 rounded-xl border-l-4 border-amber-400 shadow-sm max-w-5xl mx-auto">
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

          <div className="mt-8 bg-white text-[#0C3A5A] font-semibold px-6 py-4 rounded-xl  shadow-sm max-w-fit mx-auto">
            Update Cookie Preferences
          </div>
        </div>
      </section>

      {/* ================= COOKIE Overview================= */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-4">
            Cookies Overview
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-semibold text-gray-800">What are cookies?</span>{" "}
            Small text files stored on your device to help websites function.
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-4xl">
            <span className="font-semibold text-gray-800">Why we use them:</span>{" "}
            Improve site speed, provide security, personalise settings, show
            relevant content.
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl">
            <span className="font-semibold text-gray-800">Consent mechanism:</span>{" "}
            Users can change preferences via floating icon or link.
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-10 max-w-3xl">
            <Link href="/cookie-preferences" className="text-blue-600 hover:underline">
            Go to Manage My Cookie Settings
            </Link>
          </p>
        </div>
      </section>
      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Types of cookie we use - table */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Types of Cookies We Use
          </h2>

          {/* Table Wrapper */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr className="sm:text-sm md:text-lg font-semibold">
                  <th className="px-6 py-4  text-[#10446C] border-b">
                    Cookie Type
                  </th>
                  <th className="px-6 py-4  text-[#10446C] border-b">
                    Description
                  </th>
                  <th className="px-6 py-4  text-[#10446C] border-b">
                    Examples
                  </th>
                  <th className="px-6 py-4  text-[#10446C] border-b">
                    Essential?
                  </th>
                </tr>
              </thead>

              <tbody className="sm:text-sm md:text-base text-gray-700">
                <tr className="border-b-2 border-b-gray-300">
                  <td className="px-6 py-4">Setting up service</td>
                  <td className="px-6 py-4">
                    Required for website functionality and security
                  </td>
                  <td className="px-6 py-4">Login sessions, fraud prevention</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>

                <tr className="border-b-2 border-b-gray-300">
                  <td className="px-6 py-4">Performance & Analytics</td>
                  <td className="px-6 py-4">
                    Helps improve performance and analyse usage
                  </td>
                  <td className="px-6 py-4">Google Analytics, Hotjar</td>
                  <td className="px-6 py-4">No</td>
                </tr>

                <tr className="border-b-2 border-b-gray-300">
                  <td className="px-6 py-4">Functionality</td>
                  <td className="px-6 py-4">
                    Remembers settings and preferences
                  </td>
                  <td className="px-6 py-4">Language, form autofill</td>
                  <td className="px-6 py-4">No</td>
                </tr>

                <tr className="border-b-2 border-b-gray-300">
                  <td className="px-6 py-4">Targeting / Advertising</td>
                  <td className="px-6 py-4">
                    Displays personalised content and ads
                  </td>
                  <td className="px-6 py-4">Facebook Pixel, Google Ads</td>
                  <td className="px-6 py-4">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* types of cookie we use - buttons */}
      <section className="w-full bg-[#f9f9f9] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Types of Cookies We Use
          </h2>
      <div className="max-w-6xl mx-auto bg-white rounded-xl border-2 border-blue-950 shadow-sm">
        {/* Row 1 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300">
          <span className="text-sm sm:text-base text-[#10446C]">
            Strictly Necessary Cookies
          </span>

          <button
            
            className={`aria-disabled:true cursor-not-allowed relative w-12 h-6 rounded-full transition-colors duration-300
              ${necessary ? "bg-amber-400" : "bg-gray-300"}
            `}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300
                ${necessary ? "translate-x-6" : ""}
              `}
            />
          </button>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300">
          <span className="text-sm sm:text-base text-[#10446C]">
            Performance & Analytics Cookies
          </span>

          <button
            onClick={() => setAnalytics(!analytics)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300
              ${analytics ? "bg-amber-400" : "bg-gray-300"}
            `}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300
                ${analytics ? "translate-x-6" : ""}
              `}
            />
          </button>
        </div>
         {/* Row 3 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300">
          <span className="text-sm sm:text-base text-[#10446C]">
            Functionality Cookies
          </span>

          <button
            onClick={() => setFunctionality(!functionality)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300
              ${functionality ? "bg-amber-400" : "bg-gray-300"}
            `}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300
                ${functionality ? "translate-x-6" : ""}
              `}
            />
          </button>
        </div>
         {/* Row 4 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300">
          <span className="text-sm sm:text-base text-[#10446C]">
            Targeting / Advertising Cookies
          </span>

          <button
            onClick={() => setTargeting(!targeting)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300
              ${targeting ? "bg-amber-400" : "bg-gray-300"}
            `}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300
                ${targeting ? "translate-x-6" : ""}
              `}
            />
          </button>
        </div>
        </div>
      </div>
    </section>


      {/* Divider */}
      <hr className="border-gray-200" />
      {/* =================THIRD PARTY COOKIE ================= */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-4">
            Third-Party Cookies
          </h2>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-11 max-w-3xl">
            Some cookies are set by trusted third-party providers.
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-11 max-w-3xl">
            These may track you across websites.
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-11 max-w-3xl">
            Control via browser or third-party opt-out.
          </p>
        </div>
      </section>
    </div>
  );
}

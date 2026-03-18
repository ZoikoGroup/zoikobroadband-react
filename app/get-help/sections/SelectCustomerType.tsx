"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SelectCustomerType() {
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    { id: "new", label: "New to Zoiko" },
    { id: "customer", label: "Current Customer" },
    { id: "business", label: "Business Support" },
  ];
  const popularSearches = [
    "router setup",
    "speed test",
    "login error",
    "billing issue",
  ];
  const CardItems = [
    {
      src: "/Images/Gethelp/sec2-icon1.png",
      label: "Welcome Pack",
      description: "Everything you need to get started",
      btn: "Report an Issue",
      btnlink: "/report-a-fault",
    },
    {
      src: "/Images/Gethelp/sec2-icon2.png",
      label: "Activation Questions",
      description: "Help with setting up your new service",
      btn: "Wi-Fi Help",
      btnlink: "/setup-installation",
    },
    {
      src: "/Images/Gethelp/sec2-icon3.png",
      label: "Setup Guides",
      description: "Step-by-step installation instructions",
      btn: "Contact Us",
      btnlink: "/contact-us",
    },
  ];

  return (
    <>
      <section
        aria-labelledby="select-your-customer-type-heading"
        className="bg-[#f8fafc] py-12 flex flex-col items-center"
      >
        <h2
          id="select-your-customer-type-heading"
          className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center"
        >
          Select your customer type for tailored help
        </h2>

        <div className="bg-white rounded-full p-1 md:p-2 flex gap-1 md:gap-3 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 sm:px-6 lg:px-12
        py-2 sm:py-2.5 lg:py-3
        text-xs sm:text-sm lg:text-base
        rounded-full font-medium md:font-semibold transition whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "bg-[#10b981] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {CardItems.map((item, i) => (
            <li key={i}>
              <article
                className="h-full bg-white rounded-2xl border border-gray-200 px-5 py-10
                  flex flex-col items-center text-center
                  transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Icon wrapper (important for layout stability) */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={80}
                    height={80}
                    className="object-contain"
                    sizes="80px"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg lg:text-2xl font-bold text-[#10446C]">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base text-[#555555] leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href={item.btnlink}
                  className="mt-5 bg-[#10b981] text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-[#059669] transition"
                >
                  {item.btn}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Search Input */}
      <div
        aria-labelledby="search-section"
        className="relative  max-w-4xl mx-auto mt-8 pt-10"
      >
        <h2
          id="how-we-help-heading"
          className="text-black text-center text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
        >
          Search our help centre
        </h2>

        <p className="mt-3 mb-4 text-center text-base md:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto">
          Can't find what you're looking for? Try searching below
        </p>
        <input
          type="text"
          placeholder="Search our help centre..."
          className=" w-full rounded-lg border-4 border-gray-200 py-4 pl-4 pr-14 text-sm md:base focus:outline-none focus:ring-2 focus:ring-[#10446C]"
        />

        <button className="absolute right-2 top-[85%] -translate-y-1/2 bg-[#10446C] text-white p-2.5 rounded-md">
          <Image
            src="/Images/Gethelp/search.png"
            alt="Search"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Popular Searches */}
      <div className="mt-8 mb-10 pb-8 flex flex-wrap justify-center items-center gap-2 md:gap-5 text-base text-gray-500">
        <span className="mr-1">Popular searches:</span>

        {popularSearches.map((item, index) => (
          <button
            key={index}
            className=" bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm md:text-base hover:bg-gray-300 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

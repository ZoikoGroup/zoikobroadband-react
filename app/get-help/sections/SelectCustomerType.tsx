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

const cardData = {
  new: [
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
  ],

  customer: [
    {
      src: "/Images/Gethelp/sec2-icon2.png",
      label: "Report a Fault",
      description: "Report broadband, Wi-Fi or router issues.",
      btn: "Report Fault",
      btnlink: "/report-a-fault",
    },
    {
      src: "/Images/Gethelp/sec2-icon3.png",
      label: "Setup & Installation",
      description: "Get help with setting up your service or equipment.",
      btn: "Check Status",
      btnlink: "/setup-installation",
    },
    {
      src: "/Images/Gethelp/sec2-icon1.png",
      label: "Manage Account",
      description: "View bills and update account information.",
      btn: "My Account",
      btnlink: "/dashboard",
    },
  ],

  business: [
    {
      src: "/Images/Gethelp/sec2-icon3.png",
      label: "Business Support",
      description: "Get dedicated support for business services.",
      btn: "Contact Support",
      btnlink: "/contact-us",
    },
    {
      src: "/Images/Gethelp/sec2-icon2.png",
      label: "Business Fault",
      description: "Report business broadband issues.",
      btn: "Report Fault",
      btnlink: "/report-a-fault",
    },
    {
      src: "/Images/Gethelp/sec2-icon1.png",
      label: "Service Requests",
      description: "Request upgrades or service changes.",
      btn: "Request a callback",
      btnlink: "tel:+442071646399",
    },
  ],
};
const activeCards = cardData[activeTab as keyof typeof cardData];
  return (
    <>
      <section
        aria-labelledby="select-your-customer-type-heading"
        className="bg-[#f8fafc] py-12 flex flex-col items-center dark:bg-gray-950  dark:text-white"
      >
        <h2
          id="select-your-customer-type-heading"
          className="text-xl md:text-2xl font-semibold dark:bg-gray-950  dark:text-white text-gray-800 mb-6 text-center"
        >
          Select your customer type for tailored help
        </h2>

        <div className="bg-white rounded-full p-1 md:p-2 flex gap-1 md:gap-3 shadow-sm border border-gray-200 dark:bg-gray-950  dark:text-white">
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
          {activeCards.map((item, i) => (
            <li key={i}>
              <article
                className="h-full bg-white rounded-2xl border dark:bg-gray-950  dark:text-white border-gray-200 px-5 py-10
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
                <h3 className="mt-5 text-lg lg:text-1xl font-bold  dark:text-[#63a7db] text-[#10446C]">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base text-[#555555] leading-relaxed dark:bg-gray-950  dark:text-white">
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
    </>
  );
}

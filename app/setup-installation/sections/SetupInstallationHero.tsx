"use client";
import React, { useState } from "react";
import Link from "next/link";
import StepGuide from "./StepGuide";

export default function SetupInstallationHero() {
      const [activeTab, setActiveTab] = useState<"new" | "replacement" | "fibre">("new");
    
      const tabs = [
        { id: "new", label: "New Setup" , description: "For new customers or first-time installation"},
        { id: "replacement", label: "Replacement Router" , description: "For users replacing old equipment"},
        { id: "fibre", label: "Fibre Upgrade" , description: "For FTTP setup with engineer visit"},
      ];

  return (
    <>
      <section
        aria-labelledby="get-connected-heading"
        className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-5xl mx-auto   dark:text-white
 text-white text-center">
          {/* Heading */}
          <h1
            id="get-connected-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight  dark:text-white
"
          >
            Get Connected in Minutes
          </h1>

          <p className="mt-2 text-base md:text-xl   dark:text-white
 text-white/90 max-w-3xl mx-auto">
            Whether you're setting up your router for the first time or
            replacing your kit, we'll walk you through it.
          </p>
          <Link
            href="#"
            className="border border-[#f5c241] bg-[#698a96] text-white rounded-full px-6 py-3 text-sm md:text-base font-semibold whitespace-nowrap max-w-fit mt-6 inline-block"
          >
            Average Setup Time: 10-15 minutes
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="select-your-setup-type-heading"
        className="  dark:bg-gray-950  dark:text-white
 bg-[#f8fafc] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <h2
          id="select-your-setup-type-heading"
          className="text-xl md:text-2xl font-semibold dark:text-[#63a7db] text-[#10446C] mb-2 text-center"
        >
          Choose Your Setup Type
        </h2>
        <p className=" mb-4 text-center text-sm md:text-base  dark:bg-gray-950  dark:text-white
 text-[#555555] leading-relaxed max-w-2xl mx-auto">
          Select the option that best describes your situation
        </p>

        <div className= " bg-white border border-gray-300 rounded-xl p-1 md:p-2 flex flex-col md:flex-row gap-2 md:gap-3 dark:bg-gray-950  dark:text-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "new" | "replacement" | "fibre")}
              className={`px-2 sm:px-4 
        py-2 sm:py-5
        text-sm sm:text-base lg:text-base
        rounded-xl font-semibold md:font-bold border dark:bg-gray-950  dark:text-white
 border-gray-300 transition whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "bg-[#ffd300] text-black border-none"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              <p className="text-xs sm:text-sm font-normal md:font-medium mt-1 dark:bg-gray-950  dark:text-white
 text-gray-600">
                {tab.description}
              </p>
            </button>
          ))}
        </div>
      </section>
      <StepGuide activeTab={activeTab} />
    </>
  );
}

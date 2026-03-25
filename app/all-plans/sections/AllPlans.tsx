"use client";

import { useState } from "react";

export default function AllPlans() {
  const [activeTab, setActiveTab] = useState("all");

  //  DATA
  const plans = [
    {
      name: "Sonic Lite",
      type: "fibre",
      speed: "0.5 Mbps",
      price: "£22",
      features: [
        "Future-proof fibre technology",
        "Reliable connection",
        "No usage caps",
        "Easy upgrade options",
      ],
    },
    {
      name: "Zippy Essential",
      type: "sogea",
      speed: "0.5 Mbps",
      price: "£23",
      features: [
        "Perfect for basic browsing",
        "Email and social media",
        "No usage caps",
        "UK-based support",
      ],
    },
    {
      name: "Turbo Stream",
      type: "sogea",
      speed: "40/10 Mbps",
      price: "£35",
      features: [
        "HD streaming for 2–3 users",
        "Online gaming",
        "Video calls",
        "Free router included",
      ],
    },
    {
      name: "Blitz Core",
      type: "fibre",
      speed: "40/10 Mbps",
      price: "£35",
      features: [
        "Consistent fibre speeds",
        "Low latency gaming",
        "Multiple HD streams",
        "Free router & installation",
      ],
    },
    {
      name: "Hyper Plus",
      type: "sogea",
      speed: "80/20 Mbps",
      price: "£39.99",
      features: [
        "4K streaming",
        "Multiple device support",
        "Fast uploads",
        "Priority support",
      ],
    },
  ];

  //  FILTER LOGIC
  const filteredPlans =
    activeTab === "all"
      ? plans
      : plans.filter((p) => p.type === activeTab);

  return (
    <section className="w-full bg-[#f3f5f7] dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* 🔹 Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["all", "sogea", "fibre"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition
              ${
                activeTab === tab
                  ? "bg-[#10446C] text-white border-[#10446C]"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
            >
              {tab === "all"
                ? "All Packages"
                : tab === "sogea"
                ? "SOGEA"
                : "Full Fibre (FTTP)"}
            </button>
          ))}
        </div>

        {/*  Title */}
        <h2 className="text-center text-xl md:text-2xl font-semibold text-[#10446C] dark:text-white mb-6">
          Choose Your Perfect Package
        </h2>

        {/*  Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredPlans.map((plan, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-md transition"
            >
              {/* Name */}
              <h3 className="text-lg font-semibold text-center text-[#10446C] dark:text-white">
                {plan.name}
              </h3>

              {/* Badge */}
              <p className="text-xs text-center mt-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {plan.type.toUpperCase()} + Free SIM Card
              </p>

              {/* Speed */}
              <p className="text-center text-[#F6C140] text-xl font-bold mt-4">
                {plan.speed}
              </p>

              <p className="text-center text-xs text-gray-500">
                Down/Up Speed
              </p>

              {/* Price */}
              <p className="text-center text-2xl font-bold mt-4 text-[#10446C] dark:text-white">
                {plan.price}
                <span className="text-sm text-gray-500">/month</span>
              </p>

              {/* Features */}
              <ul className="mt-4  space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F6C140]">✔</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="mt-6 bg-[#F6C140] text-[#10446C] py-2 rounded-md font-semibold hover:bg-[#eab530] transition">
                Choose This Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
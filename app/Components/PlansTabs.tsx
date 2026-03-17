"use client";
import { useState, useMemo } from "react";
interface Plan {
  title: string;
  speed: string;
  downloadSpeed: string;
  uploadSpeed: string;
  price: number;
  priceDisplay: string;
  desc: string;
  features: string[];
  popularity: number;
  contractLength: number;
  badge: string | null;
}

export default function PlansTabs({ plans }: { plans: Plan[] }) {
  const [activeTab, setActiveTab] = useState("Speed");
  const tabs = ["Speed", "Price", "Popularity", "Contract Length"];
  // All plans data
  const allPlans = [
    {
      title: "Zippy Essential",
      speed: "0.5 Mbps",
      downloadSpeed: "0.5",
      uploadSpeed: "0.5",
      price: 22.0,
      priceDisplay: "£22.00",
      desc: "Download Speed",
      features: [
        "Perfect for basic browsing",
        "Email & social media",
        "No usage caps",
        "UK-based support",
      ],
      popularity: 2,
      contractLength: 12,
      badge: null,
    },
    {
      title: "Blitz Core",
      speed: "40/10 Mbps",
      downloadSpeed: "40",
      uploadSpeed: "10",
      price: 35.0,
      priceDisplay: "£35.00",
      desc: "Download Speed",
      features: [
        "Consistent fibre speeds",
        "Low latency gaming",
        "Multiple HD streams",
        "Free router & installation",
      ],
      popularity: 3,
      contractLength: 18,
      badge: null,
    },
    {
      title: "Quantum Boost",
      speed: "115/20 Mbps",
      downloadSpeed: "115",
      uploadSpeed: "20",
      price: 42.99,
      priceDisplay: "£42.99",
      desc: "Download Speed",
      features: [
        "Ultra-low downloads",
        "Perfect for home offices",
        "Seamless video conferencing",
        "Advanced router included",
      ],
      popularity: 4,
      contractLength: 24,
      badge: "FULL FIBRE",
    },
    {
      title: "Supersonic Infinity",
      speed: "1000/115 Mbps",
      downloadSpeed: "1000",
      uploadSpeed: "115",
      price: 61.99,
      priceDisplay: "£61.99",
      desc: "Download Speed",
      features: [
        "Gigabit speeds",
        "Future-proof technology",
        "Unlimited potential",
        "White-glove service",
      ],
      popularity: 5,
      contractLength: 24,
      badge: "FULL FIBRE",
    },
  ];

  // Sort plans based on active tab (you can implement actual sorting logic here)
  const getSortedPlans = () => {
    let sorted = [...allPlans];

    switch (activeTab) {
      case "Speed":
        sorted.sort(
          (a, b) => parseFloat(b.downloadSpeed) - parseFloat(a.downloadSpeed),
        );
        break;
      case "Price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Popularity":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "Contract Length":
        sorted.sort((a, b) => a.contractLength - b.contractLength);
        break;
      default:
        break;
    }

    return sorted;
  };

  const sortedPlans = useMemo(() => {
    const sorted = [...plans];

    switch (activeTab) {
      case "Speed":
        sorted.sort(
          (a, b) => parseFloat(b.downloadSpeed) - parseFloat(a.downloadSpeed),
        );
        break;
      case "Price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Popularity":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "Contract Length":
        sorted.sort((a, b) => a.contractLength - b.contractLength);
        break;
    }

    return sorted;
  }, [activeTab, plans]);

  return (
    <>
      <div>
        <section className="w-full bg-[#F5FAFF] py-16 px-4 dark:bg-gray-950  dark:text-white">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <h2 className="text-2xl md:text-3xl font-bold text-center dark:bg-gray-950  dark:text-[#63a7db]
 text-[#10446C]">
              Choose Your Perfect Fibre Plan
            </h2>

            <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto dark:bg-gray-950  dark:text-white
">
              Superfast broadband packages designed for modern British homes
            </p>

            {/* Tabs - Filtering Buttons */}
            <div className="mt-8 flex gap-1 sm:gap-2 justify-center items-center dark:bg-gray-950  dark:text-white
   bg-gray-100 rounded-full p-1.5 sm:p-2 w-full max-w-[95%] sm:max-w-fit mx-auto overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={` dark:bg-gray-950  dark:text-white
 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0
      ${
        activeTab === tab
          ? "bg-[#F5C241] text-[#10446C] shadow-sm"
          : "bg-transparent text-gray-600 hover:text-[#10446C]"
      }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Plans Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 dark:bg-gray-950  dark:text-white
">
              {sortedPlans.map((plan: Plan) => (
                <div
                  key={plan.title}
                  className="bg-white rounded-2xl p-6 flex flex-col justify-between border-2 dark:bg-gray-950  dark:text-white
   border-gray-100 hover:border-[#F5C241] hover:shadow-xl transition-all relative"
                >
                  {/* Badge if exists */}
                  {plan.badge && (
                    <div className="absolute top-4 right-4 bg-[#10446C] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Plan Title */}
                    <h3 className="font-bold text-lg dark:text-[#63a7db] text-[#10446C] pr-20">
                      {plan.title}
                    </h3>

                    {/* Speed */}
                    <p className="mt-4 font-bold text-3xl text-[#F5C241]">
                      {plan.speed}
                    </p>

                    <p className="mt-1 text-sm dark:text-white text-gray-500">{plan.desc}</p>

                    {/* Price */}
                    <div className="mt-6">
                      <p className="text-4xl font-bold 
dark:text-[#63a7db]

 text-[#10446C]">
                        {plan.priceDisplay}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 dark:text-white">per month</p>
                    </div>

                    {/* Features */}
                    <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-white
">
                      {plan.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button className="mt-6 w-full py-3 rounded-full font-semibold bg-[#10446C] text-white hover:bg-[#0d3a5c] transition-colors">
                    Choose This Package
                  </button>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 flex justify-center">
              <button className="px-12 py-5 rounded-full border-2 dark:text-white
 border-[#10446C] text-[#10446C] font-semibold hover:bg-[#10446C] hover:text-white transition-all">
                View All
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

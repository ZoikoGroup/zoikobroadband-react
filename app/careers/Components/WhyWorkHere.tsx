import React from "react";
import Image from "next/image";

export default function WhyWorkHere() {
  return (
    <section className=" w-full py-10 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#10446C]">
          Our M
          <span className="underline decoration-amber-400 underline-offset-14">
            easurable
          </span>{" "}
          Goals
        </h2>
        {/* Cards container */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {[
            {
              src: "/Images/Careers/dollar.png",
              label: "Competitive Salary + Benefits",
              description:
                "Industry-leading compensation packages with comprehensive health, dental, and wellness benefits",
              benefits: [
                "Performance bonuses",
                "Private healthcare",
                "Pension contributions",
              ],
            },
            {
              src: "/Images/Careers/growth.png",
              label: "Career Growth Programmes",
              description:
                "Structured development paths with mentorship, training, and clear progression opportunities",
              benefits: [
                "Learning & development budget",
                "Internal promotions",
                "Skills certification",
              ],
            },
            {
              src: "/Images/Careers/house.png",
              label: "Hybrid & Flexible Work",
              description:
                "Work-life balance with flexible hours, remote options, and modern office spaces",
              benefits: [
                " 3 days home, 2 office",
                "Flexible start times",
                "Wellness programmes",
              ],
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f5fbff] rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-shadow duration-300 h-full"
            >
              <Image
                src={item.src}
                alt={item.label}
                width={80}
                height={80}
                className="w-16 h-16 object-contain"
              />

              <h3 className="text-lg lg:text-2xl font-bold text-[#10446C]">
                {item.label}
              </h3>

              <p className="text-base lg:text-lg text-[#10446C] max-w-xs">
                {item.description}
              </p>

              <ul className="mt-3 space-y-2 text-sm lg:text-base text-[#10446C]">
                {item.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

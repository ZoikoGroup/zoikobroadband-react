import React from "react";
import Image from "next/image";

const features = [
  {
    src: "/Images/Bundles/page.png",
    label: "One Bill, One Provider",
    description: "Simplify your life with everything in one place",
  },
  {
    src: "/Images/Bundles/dollar.png",
    label: "Guaranteed Best Pricing",
    description: "Locked in for 24 months",
  },
  {
    src: "/Images/Bundles/star.png",
    label: "Priority Customer Care",
    description: "Fast-track support when you need it",
  },
];

export default function WhyBundle() {
  return (
    <>
      <section
        aria-labelledby="why-bundle-with-zoiko-heading"
        role="region"
        className="w-full py-16 px-6 sm:px-10 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Title */}
          <h2
            id="why-bundle-with-zoiko-heading"
            className="text-[#10446C] dark:text-white text-2xl md:text-3xl font-semibold mb-6"
          >
            Why Bundle with Zoiko
            <span className="block w-16 h-0.5 bg-amber-400 mx-auto mt-2"></span>
          </h2>

          {/* Feature List */}
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((item) => (
              <li key={item.label}>
                <div className="flex flex-col items-center text-center px-4 transition-transform duration-300 hover:-translate-y-1">
                  
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />

                  <h3 className="text-[#10446C] dark:text-white text-lg md:text-xl font-semibold mt-6">
                    {item.label}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mt-3 max-w-xs">
                    {item.description}
                  </p>

                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
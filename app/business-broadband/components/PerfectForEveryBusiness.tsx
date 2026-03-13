import React from "react";
import Image from "next/image";

const features = [
  {
    src: "/Images/BusinessBroadband/icon1.png",
    label: "Small Offices",
    description:
      "Perfect for teams of 5-20 people who need reliable connectivity for daily operations.",
    subfeatures: [
      "Email and web browsing",
      "Cloud-based applications",
      "Video conferencing",
      "Basic VoIP systems",
    ],
  },
  {
    src: "/Images/BusinessBroadband/icon2.png",
    label: "Home Offices",
    description:
      "Professional-grade connectivity for remote workers and home-based businesses.",
    subfeatures: [
      "Reliable remote access",
      "Professional video calls",
      "File sharing and backup",
      "Separate business line",
    ],
  },
  {
    src: "/Images/BusinessBroadband/icon3.png",
    label: "Retail & Hospitality",
    description:
      "High-performance connectivity for customer-facing businesses and POS systems.",
    subfeatures: [
      "POS and payment systems",
      "Customer WiFi provision",
      "Inventory management",
      "Security system support",
    ],
  },
  {
    src: "/Images/BusinessBroadband/icon4.png",
    label: "Enterprise",
    description:
      "Scalable solutions for larger organisations with complex networking requirements.",
    subfeatures: [
      "Multi-site connectivity",
      "Advanced security features",
      "Dedicated account management",
      "Custom SLA agreements",
    ],
  },
];

export default function WhyBusinessChooseUs() {
  return (
    <section
      aria-labelledby="business-types-heading"
      className="bg-white w-full py-16 px-5 sm:px-10"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2
          id="business-types-heading"
          className="text-2xl md:text-3xl font-semibold text-gray-900"
        >
          Perfect for Every Business Type
        </h2>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Whether you're operating from a high street, home office, or
          co-working space, our business broadband plans come with the tools
          you need to thrive.
        </p>

        {/* Feature Grid */}
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((item) => (
            <li key={item.label}>
              <article className="h-full bg-slate-100 rounded-2xl border border-gray-200 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                
                {/* Icon */}
                <div className="bg-yellow-400 rounded-full p-4 mb-4">
                  <Image
                    src={item.src}
                    alt={`${item.label} icon`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  {item.description}
                </p>

                {/* Subfeatures */}
                <ul className="mt-4 space-y-2 text-left">
                  {item.subfeatures.map((subfeature) => (
                    <li
                      key={subfeature}
                      className="flex items-start gap-2 text-gray-600 text-sm"
                    >
                      <span
                        className="w-2 h-2 bg-blue-900 rounded-full mt-2"
                        aria-hidden="true"
                      />
                      {subfeature}
                    </li>
                  ))}
                </ul>

              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
import React from "react";
import Image from "next/image";

const features = [
  {
    src: "/Images/BusinessBroadband/card1.png",
    label: "Reliable Fibre Connectivity",
    description:
      "Speed and high-capacity options designed for business-critical applications.",
    subfeatures: [
      " VoIP and unified communications",
      "Cloud application access",
      " Remote desktop and VPN support",
      "Video conferencing optimisation",
    ],
  },
  {
    src: "/Images/BusinessBroadband/card2.png",
    label: "Static IP Addresss",
    description:
      "Enable advanced business functions with dedicated IP addressing solutions.",
    subfeatures: [
      "Remote working capabilities",
      "Secure business access",
      "CCTV and security system support",
    ],
  },
  {
    src: "/Images/BusinessBroadband/card3.png",
    label: "UK-Based Customer Support",
    description:
      "Priority technical assistance tailored specifically for commercial requirements.",
    subfeatures: [
      "Dedicated business support line",
      "Priority fault resolution",
      "Account management service",
      "Technical consultation available",
    ],
  },
  {
    src: "/Images/BusinessBroadband/card4.png",
    label: "Quick Setup, Minimal Downtime",
    description:
      "Smooth installations and seamless transitions when switching providers.",
    subfeatures: [
      "Professional installation service",
      "Minimal business disruption",
      "Migration assistance included",
      "Testing and optimisation",
    ],
  },
  {
    src: "/Images/BusinessBroadband/card5.png",
    label: "Flexible Terms",
    description:
      "Tailored plans designed for growing SMEs, startups, and established firms.",
    subfeatures: [
      "No lengthy lock-in contracts",
      "Scalable bandwidth options",
      "Volume discounts available",
      "Multi-site solutions",
    ],
  },
  {
    src: "/Images/BusinessBroadband/card6.png",
    label: "Enhanced Security",
    description:
      "Business-grade security features to protect your operations and data.",
    subfeatures: [
      "Advanced firewall options",
      "DDoS protection included",
      "Secure VPN connectivity",
      "Regular security monitoring",
    ],
  },
];

export default function WhyBusinessChooseUs() {
  return (
    <>
      <section
        aria-labelledby="why-businesses-heading"
        className="bg-gray-100 w-full py-16 px-5 sm:px-10"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Heading */}
          <h2
            id="why-businesses-heading"
            className="text-2xl md:text-3xl font-semibold text-gray-900"
          >
            Why Businesses Choose Us
          </h2>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Professional-grade connectivity with the support and features your
            business needs to thrive
          </p>

          {/* Feature Grid */}
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {features.map((item) => (
              <li key={item.label}>
                <article className="bg-white h-full rounded-2xl border border-gray-200 px-10 py-10 flex flex-col transition hover:shadow-lg">
                  {/* Icon */}
                  <Image
                    src={item.src}
                    alt={`${item.label} icon`}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-14 h-14 object-contain"
                  />

                  {/* Title */}
                  <h3 className="text-left text-lg font-semibold text-gray-900 mt-4">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-left text-sm md:text-base text-gray-600 leading-relaxed mt-3 flex-1">
                    {item.description}
                  </p>

                  {/* Subfeatures */}
                  <ul
                    className="text-left space-y-2 mt-4"
                    aria-label="Key benefits"
                  >
                    {item.subfeatures.map((subfeature) => (
                      <li
                        key={subfeature}
                        className="flex items-start gap-2 text-gray-600 text-sm"
                      >
                        <span
                          className="text-green-500 mt-0.5"
                          aria-hidden="true"
                        >
                          ✓
                        </span>

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
    </>
  );
}

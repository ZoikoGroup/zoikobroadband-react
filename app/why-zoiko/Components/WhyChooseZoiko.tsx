import React from "react";
import Image from "next/image";

const features = [
  {
    src: "/Images/Whyzoiko/whyzoiko-card1.png",
    label: "Why Zoiko Broadband?",
    description:
      "We offer full fibre (FTTP) and SOGEA connections - tailored to what's available at your address.",
  },
  {
    src: "/Images/Whyzoiko/whyzoiko-card2.png",
    label: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. Choose from 12, 18, or 24-month options.",
  },
  {
    src: "/Images/Whyzoiko/whyzoiko-card3.png",
    label: "UK-Based Customer Support",
    description:
      "Speak to real people who understand your needs - and get help when it matters.",
  },
  {
    src: "/Images/Whyzoiko/whyzoiko-card4.png",
    label: "Designed for Modern Living",
    description:
      "Whether you're streaming, gaming, or working remotely, our network delivers.",
  },
  {
    src: "/Images/Whyzoiko/whyzoiko-card5.png",
    label: "Hassle-Free Setup",
    description: "We make switching simple and installation fast.",
  },
  {
    src: "/Images/Whyzoiko/whyzoiko-card6.png",
    label: "Future-Proof Performance",
    description: "Because your home deserves the best internet available.",
  },
];

export default function WhyChooseZoiko() {
  return (
    <>
      <section
        className="bg-[#fafbff] w-full py-12 px-5 sm:px-10 border-t border-gray-200"
        aria-labelledby="why-zoiko-features"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2
            id="why-zoiko-features"
            className="text-2xl md:text-3xl font-semibold text-gray-900"
          >
            Why Zoiko Broadband?
          </h2>

          {/* Feature List */}
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {features.map((item) => (
              <li key={item.label}>
                <article className="bg-white h-full rounded-2xl border border-gray-200 px-6 py-10 flex flex-col transition hover:shadow-xl">
                  {/* Icon */}
                  <Image
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain"
                  />

                  {/* Title */}
                  <h3 className="text-left text-lg font-semibold text-gray-900 mt-4">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-left text-base md:text-lg text-gray-700 leading-relaxed mt-3 flex-1">
                    {item.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

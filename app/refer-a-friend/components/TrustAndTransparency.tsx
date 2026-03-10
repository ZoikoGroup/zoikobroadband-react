import React from 'react'
import Image from "next/image";
const features = [
  {
    src: "/Images/ReferFriend/lock.png",
    label: "Secure Tracking",
    description:
      "Monitor all your referrals through your secure My Zoiko Portal dashboard",
    subfeatures: [
      " Real-time updates",
      " Encrypted data",
      " 24/7 access",
    ],
  },
  {
    src: "/Images/ReferFriend/infinity.png",
    label: "No Cap on Rewards",
    description:
      "Refer as many friends as you like - there's no limit to how much you can earn",
    subfeatures: [
      " Real-time updates",
      " Encrypted data",
      " 24/7 access",
    ],
  },
  {
    src: "/Images/ReferFriend/chart.png",
    label: "Full Transparency",
    description:
      "Clear terms, visible progress, and detailed tracking of all your referral activity",
    subfeatures: [
      "Clear terms & conditions",
      "Payment history",
      "Progress tracking",
    ],
  },
];
export default function TrustAndTransparency() {
  return (
    <>
    <section
            aria-labelledby="trust-and-transparency-heading"
            className="bg-white w-full py-16 px-5 sm:px-10"
          >
            <div className="max-w-6xl mx-auto text-center">
              {/* Section Heading */}
              <h2
                id="trust-and-transparency-heading"
                className="text-2xl md:text-3xl font-semibold text-gray-900"
              >
                Trust & Transparency
              </h2>

              {/* Feature Grid */}
              <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ">
                {features.map((item) => (
                  <li key={item.label}>
                    <article className="h-full bg-slate-100 rounded-2xl border border-gray-200 p-8 flex flex-col items-center text-center transition hover:shadow-lg">
                      {/* Icon */}
                      <div className="mb-4">
                        <Image
                          src={item.src}
                          alt=""
                          aria-hidden="true"
                          width={40}
                          height={40}
                          className="w-18 h-18 object-contain"
                        />
                      </div>
    
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-[#10446C]">
                        {item.label}
                      </h3>
    
                      {/* Description */}
                      <p className="text-sm md:text-base text-[#10446C] leading-relaxed mt-3">
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
                              className="w-2 h-2 bg-gray-600 rounded-full mt-1.75"
                              aria-hidden="true"
                            ></span>
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
  )
}

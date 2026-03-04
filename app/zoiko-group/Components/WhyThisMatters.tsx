import React from 'react'
import Image from 'next/image'

export default function WhyThisMatters() {
  return (
    <>
              <section className=" w-full py-10 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#10446C]">
                    Why This Matters for You
                    </h2>
                  {/* Cards container */}
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                      {
                        src: "/Images/ZoikoGroup/ZG-icon1.png",
                        label: "Resilience",
                        description:
                          "Long-term financial security ensures uninterrupted service and continuous investment in infrastructure.",
                      },
                      {
                        src: "/Images/ZoikoGroup/ZG-icon2.png",
                        label: "Compliance",
                        description:
                          "Ofcom-regulated, PCI-DSS and GDPR compliant, ensuring your data and service meet the highest standards.",
                      },
                      {
                        src: "/Images/ZoikoGroup/ZG-icon3.png",
                        label: "Innovation",
                        description:
                          "Access to the latest technology via ZoikoTech and ZoikoNex, keeping you ahead of the curve.",
                      },
                      {
                        src: "/Images/ZoikoGroup/ZG-icon4.png",
                        label: "Trust",
                        description:
                          "Transparent governance and corporate responsibility you can depend on for the long haul.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-[#f8f9fa] rounded-2xl border border-gray-200 px-6 py-10 flex flex-col items-center justify-between gap-3 hover:shadow-2xl transition-shadow duration-300"
                      >
                        <Image
                          src={item.src}
                          alt={item.label}
                          width={100}
                          height={100}
                          className="w-22 h-22 object-contain"
                        />
                        <h3 className="text-center text-lg lg:text-2xl font-bold text-[#10446C] mb-4">
                          {item.label}
                        </h3>
                        <p className="text-center text-base lg:text-lg font-normal text-[#555555] leading-8">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
    </>
  )
}

import React from 'react'
import Image from 'next/image'

export default function OurMeasurable() {
  return (
    <>
    {/* Our Measurable Goals */}
          <section className=" w-full py-10 px-5 sm:px-10">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#10446C]">
                Our M<span className="underline decoration-amber-400 underline-offset-14">easurable</span> Goals
              </h2>
              {/* Cards container */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {[
                  {
                    src: "/Images/Oursustainability/Sec1-icon1.png",
                    label: "Carbon-Neutral Operations",
                    year: "2030",
                    description:
                      "Complete carbon neutrality across all operational activities",
                    progress: "45%",
                  },
                  {
                    src: "/Images/Oursustainability/Sec1-icon2.png",
                    label: "100% Renewable Energy",
                    year: "2027",
                    description:
                      "All data centres powered by renewable energy sources",
                    progress: "67%",
                  },
                  {
                    src: "/Images/Oursustainability/Sec1-icon3.png",
                    label: "Net-Zero Supply Chain",
                    year: "2035",
                    description:
                      "Complete supply chain transformation to net-zero emissions",
                    progress: "28%",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 px-6 py-12 flex flex-col items-center justify-between gap-3 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-contain"
                    />
                    <h3 className="text-center text-lg lg:text-2xl font-bold text-[#10446C]">
                      {item.label}
                    </h3>
                    <h3 className="text-center text-md lg:text-3xl  font-bold text-[#F5C241]">
                      {item.year}
                    </h3>
                    <p className="text-center text-sm lg:text-base font-normal text-[#10446C]">
                      {item.description}
                    </p>
                    <div className="w-[90%] h-1 border-2 border-gray-300"></div>
                    <p className="text-center text-sm lg:text-base font-bold text-[#10446C]">
                      {item.progress} Complete.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
    </>
  )
}

import React from 'react'
import Image from 'next/image'

export default function liveImpact() {
  return (
    <>
    {/* Live Impact Tracker */}
              <section className=" w-full py-10 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#10446C] text-center mb-2">
                    Live Impact Tracker
                  </h2>
        
                  <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
                    See the real-time environmental impact of our combined efforts
                  </p>
                  {/* Cards container */}
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                      {
                        src: "/Images/Oursustainability/earth.png",
                        label: "CO₂ Saved",
                        quantity: "12,847",
                        units: "Tonnes",
                        description: "Equivalent to planting 64,235 trees",
                        progress: "+156 tonnes this month",
                      },
                      {
                        src: "/Images/Oursustainability/recycle.png",
                        label: "Devices Recycled",
                        quantity: "89,432",
                        units: "Units",
                        description: "2.3 tonnes of e-waste diverted",
                        progress: "+423 devices this week",
                      },
                      {
                        src: "/Images/Oursustainability/thunder.png",
                        label: "Renewable Energy",
                        quantity: "67.3",
                        units: "%",
                        description: "Of total energy consumption",
                        progress: "+2.1% this quarter",
                      },
                      {
                        src: "/Images/Oursustainability/car.png",
                        label: "Trips Avoided",
                        quantity: "34,829",
                        units: "Journeys",
                        description: "Through remote diagnostics",
                        progress: "+1,856 this month",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="relative bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] px-10 py-12 pt-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl"
                      >
                        {/* TOP ACCENT LINE */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#00A896] to-[#F5C241] rounded-t-3xl"></div>
        
                        {/* Icon */}
                        <Image
                          src={item.src}
                          alt={item.label}
                          width={80}
                          height={80}
                          className="w-16 h-16 object-contain mb-4"
                        />
        
                        {/* Title */}
                        <h3 className="text-xl lg:text-2xl font-bold text-[#10446C] mb-2">
                          {item.label}
                        </h3>
        
                        {/* Quantity */}
                        <h3 className="text-2xl lg:text-3xl font-bold text-[#F5C241] mb-1">
                          {item.quantity}
                        </h3>
        
                        {/* Units */}
                        <p className="text-sm lg:text-base text-gray-500 mb-4">
                          {item.units}
                        </p>
        
                        {/* Description */}
                        <p className="text-sm lg:text-base text-gray-500 mb-3">
                          {item.description}
                        </p>
        
                        {/* Progress */}
                        <p className="text-sm font-semibold text-[#28A745]">
                          {item.progress}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
    </>
  )
}

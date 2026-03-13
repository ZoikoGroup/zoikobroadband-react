import React from 'react'
import Image from 'next/image'

export default function BuildOnInnovation() {
  return (
    <>
    {/* Built on Innovation */}
      <section className="w-full bg-[#f8f8f8] dark:bg-gray-900 py-14 px-4">
        <div className="max-w-7xl mx-auto text-center dark:text-white">

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F3D5E] dark:text-white">
            Built on Innovation
          </h2>

          <p className="text-sm md:text-base text-[#0F3D5E]/80 mt-2 dark:text-gray-300">
            Behind our broadband is cutting-edge telecom architecture
          </p>

          {/* Cards container */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                src: "/Images/Aboutus/Sec6-icon1.png",
                label: "Seamless upgrades, remote reboots, and smart notifications",
              },
              { 
                src: "/Images/Aboutus/Sec6-icon2.png", 
                label: "Smart network provisioning via ZoikoNex OSS/BSS" 
              },
              { 
                src: "/Images/Aboutus/Sec6-icon3.png", 
                label: "Real-time diagnostics and AI fault prediction" 
              },
            ].map((item, i) => (

              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center justify-between gap-6"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  width={63}
                  height={63}
                  className="w-25 h-25 object-contain"
                />

                <h3 className="text-[#494949] text-base sm:text-base md:text-lg dark:text-gray-200">
                  {item.label}
                </h3>

              </div>

            ))}
          </div>

        </div>
      </section>
    </>
  )
}
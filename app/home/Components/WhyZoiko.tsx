
import React from 'react'

export default function WhyZoiko() {
  return (
    <div className="dark:text-white">

      {/* Why choose zoiko .. */}
      <section className="w-full bg-[#FFD56A] dark:bg-gray-950 py-14 px-4">

        <div className="max-w-7xl mx-auto text-center">

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F3D5E] dark:text-white">
            Why Choose Zoiko Broadband
          </h2>

          <p className="text-sm md:text-base text-[#0F3D5E]/80 dark:text-gray-300 mt-2">
            We’re not just faster we’re fairer
          </p>

          {/* Cards container */}
          <div
            className="
              mt-10
              flex flex-col gap-6
              lg:grid lg:grid-cols-5 lg:gap-6
            "
          >
            {[
              { icon: "BT", text: "Powered by BT Wholesale" },
              { icon: "⟳", text: "Zero Data Caps" },
              { icon: "FREE", text: "No Setup Fees" },
              { icon: "⚙️", text: "Free Router with Every Plan" },
              { icon: "🇬🇧", text: "UK-Based Support" },
            ].map((item) => (
              <div
                key={item.text}
                className="
                  bg-white dark:bg-gray-900
                  rounded-3xl
                  flex flex-col items-center justify-center
                  px-6 py-10
                  min-h-40
                  shadow-sm hover:shadow-md
                  transition
                  dark:border dark:border-gray-700
                "
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#F0F6FF] dark:bg-gray-800 flex items-center justify-center mb-4">
                  <span className="font-bold text-[#6B4EFF]">
                    {item.icon}
                  </span>
                </div>

                {/* Text */}
                <p className="text-sm md:text-base font-semibold text-[#0F3D5E] dark:text-gray-200 text-center">
                  {item.text}
                </p>

              </div>
            ))}
          </div>

        </div>

      </section>

    </div>
  )
}


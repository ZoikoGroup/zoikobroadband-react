import React from 'react'

export default function page() {
  return (
    <>
      <section
        className="w-full bg-[#10446C] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-5xl mx-auto text-center text-white dark:text-gray-100">
          {/* Heading */}
          <h2
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Improve Your Wi-Fi by Changing the Channel
          </h2>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Step-by-Step Guide
          </p>
        </div>
      </section>
    </>
  )
}

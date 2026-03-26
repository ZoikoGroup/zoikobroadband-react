import React from 'react'
import Image from 'next/image'

export default function OurSustainabilityHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full dark:bg-gray-950 dark:text-white">
      <div className="max-w-7xl flex flex-col-reverse lg:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8 mx-auto dark:bg-gray-950">

        {/* Text Content */}
        <div className="text-[#10446C] dark:text-white w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-[40px] font-bold text-center lg:text-left mb-4">
            Connecting the UK.<br />
            Protecting the Planet.
          </h2>

          <p className="text-base text-center lg:text-left sm:text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
            Our promise: zero-compromise connectivity, zero net carbon by 2030.
          </p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 py-4">
          <Image
            src="/Images/Oursustainability/hero-pic.png"
            alt="Our Sustainability"
            width={600}
            height={400}
            className="w-full max-w-xl mx-auto lg:mx-0 h-auto object-contain"
          />
        </div>

      </div>
      </section>
    </>
  )
}
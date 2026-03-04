import React from 'react'
import Image from 'next/image'

export default function OurSustainabilityHero() {
  return (
    <>
    {/* Hero Section . */}
          <section className=" max-w-7xl flex flex-col-reverse lg:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8 mx-auto">
            <div className=" text-[#10446C] w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-[40px] font-bold text-center lg:text-left mb-4">
                Connecting the UK.<br></br>Protecting the Planet.
              </h2>
              <p className="text-base text-center lg:text-left sm:text-2xl leading-relaxed">
                Our promise: zero-compromise connectivity, zero net carbon by 2030.
              </p>
            </div>
            <div className="w-full lg:w-1/2 py-4">
              <Image
                src="/Images/Oursustainability/hero-pic.png"
                alt="Our Sustainability"
                width={600}
                height={400}
                className="w-full max-w-xl mx-auto lg:mx-0 h-auto object-contain"
              />
            </div>
          </section>
    </>
  )
}

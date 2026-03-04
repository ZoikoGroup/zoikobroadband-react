import React from 'react'
import Image from 'next/image'
export default function DigitalInclusionSec1() {
  return (
    <>
    {/* Digital Inclusion & Sustainability section1 */}
          <section className="w-full bg-[#f6c140] flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10  px-5 sm:px-10 md:px-16 lg:px-32 py-14 ">
            {/* LEFT IMAGE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <Image
                src="/Images/Aboutus/about-hero-pic.png"
                alt="Hero"
                width={900}
                height={600}
                priority
                fetchPriority="high"
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-lg "
              />
            </div>
    
            {/* RIGHT CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              {/* Row 1 */}
              <h2 className="text-black font-bold sm:text-2xl md:text-3xl lg:text-4xl leading-tight max-w-xl">
                Digital Inclusion & Sustainability
              </h2>
    
              {/* Row 2 */}
              <p className="text-black text-base sm:text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
                Fibre That’s Built Right. Service That’s Built Around You. Zoiko
                Broadband is a trading name of Zoiko Telecom Ltd, a UK-registered
                company and authorised BT Wholesale reseller. We deliver high-speed,
                reliable, and future-ready broadband built on Britain’s most robust
                fibre infrastructure.
              </p>
            </div>
          </section>
    </>
  )
}

import React from 'react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div>
        {/* Hero - section ..*/}
              <section className="w-full mt-25 bg-[#19598b] flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10  px-5 sm:px-10 md:px-16 lg:px-32 py-12 ">
                {/* LEFT CONTENT */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  {/* Row 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <Image
                      src="/Images/hero-pic-left.png"
                      alt="Decorative hero accent"
                      width={150}
                      height={60}
                      className="h-10 sm:h-12 w-auto"
                    />
                    <h1 className="text-[#F5C241] font-bold text-2xl sm:text-3xl md:text-4xl">
                      Built on1
                    </h1>
                  </div>
        
                  {/* Row 2 */}
                  <h1 className="text-[#F5C241] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-xl">
                    BT's Tier-1 Backbone <br />
                    From Just £22/month
                  </h1>
        
                  {/* Row 3 */}
                  <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed mb-6 max-w-xl">
                    Experience lightning-fast broadband with unbeatable reliability,
                    UK-based support, and prices that won’t break the bank. Join
                    thousands of happy British homes already connected.
                  </p>
        
                  {/* Row 4 */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-[#F6C140] text-blue-950 px-8 py-3 rounded-3xl font-medium">
                      Check Your Postcode
                    </button>
                    <button className="bg-white text-blue-950 px-8 py-3 rounded-3xl font-medium">
                      View Fibre Plans
                    </button>
                  </div>
                </div>
        
                {/* RIGHT IMAGE */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <Image
                    src="/Images/hero-pic-right.jpg"
                    alt="Hero"
                    width={900}
                    height={600}
                    priority
                    fetchPriority="high"
                    className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-2xl border-2 border-blue-950"
                  />
                </div>
              </section>
    </div>
  )
}

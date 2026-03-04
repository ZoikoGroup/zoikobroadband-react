import React from 'react'
import Image from 'next/image'

export default function DigitalInclusionSec2() {
  return (
    <>
    {/* Digital Inclusion & Sustainability section2 */}
          <section className="w-full bg-[#fffff3] flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8  px-5 sm:px-10 md:px-16 lg:px-32 py-14 ">
            {/* LEFT  */}
            <div className="w-full lg:w-[40%] flex flex-col">
              {/* Row 1 */}
              <h2 className="text-black font-bold text-2xl sm:text-3xl leading-tight mb-6">
                Digital Inclusion & Sustainability
              </h2>
              {[
                {
                  src: "/Images/Aboutus/Sec1-icon1.png",
                  label: "Expanding into underserved rural areas",
                },
                { src: "/Images/Aboutus/Sec1-icon2.png", label: "Fast Connected" },
                { src: "/Images/Aboutus/Sec1-icon3.png", label: "Support 24/7" },
                {
                  src: "/Images/Aboutus/Sec1-icon4.png",
                  label: "Expanding into underserved rural areas",
                },
                {
                  src: "/Images/Aboutus/Sec1-icon5.png",
                  label: "Expanding into underserved rural areas",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-row items-center gap-3 mb-5">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={63}
                    height={63}
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                  <h3 className="text-[#494949] font-medium text-base sm:text-base md:text-xl">
                    {item.label}
                  </h3>
                </div>
              ))}
            </div>
            {/* RIGHT  */}
            <div className="w-full lg:w-[60%] flex items-center justify-center">
              <Image
                src="/Images/Aboutus/about-section1-rightpic.png"
                alt="Hero"
                width={1000}
                height={600}
                priority
                fetchPriority="high"
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-2xl "
              />
            </div>
          </section>
    </>
  )
}

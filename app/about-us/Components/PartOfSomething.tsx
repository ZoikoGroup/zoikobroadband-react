import React from 'react'
import Image from 'next/image'

export default function PartOfSomething() {
  return (
    <>
    {/* Part of Something bigger */}
          <section className="w-full bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto text-center ">
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-semibold ">
                Part of Something Bigger 
              </h2>
    
              <p className=" text-[#494949] text-base md:text-lg mt-4 mb-5 max-w-4xl mx-auto">
                Zoiko Broadband is the broadband division of Zoiko Telecom Ltd,
                which is part of Zoiko Communications Group Inc., the telecoms arm
                of multinational conglomerate Zoiko Group Inc.
              </p>
    
              <h2 className="text-lg md:text-xl font-semibold ">
                As a Zoiko brand, we offer full integration with:
              </h2>
    
              {/* Bundle cards */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                {[
                  { src: "/Images/Aboutus/ZT_Logo.png", alt: "Zoiko TV" },
                  { src: "/Images/Aboutus/ZM-logo.png", alt: "Zoiko Mobile" },
                  { src: "/Images/Aboutus/ZO-Logo.png", alt: "Zoiko Orbit" },
                  { src: "/Images/Aboutus/ZN_Logo.png", alt: "Zoiko Network" },
                ].map((logo) => (
                  <div key={logo.alt} className="w-full max-w-xs">
                    <div className="bg-white rounded-xl w-full h-20 sm:h-24 flex items-center justify-center p-3">
                      <div className="relative w-32 h-16">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          sizes="128px"
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Part Of Something Bigger picture */}
          <section className="bg-[#756DE7] w-full flex flex-col items-center justify-center py-4 sm:py-10 px-0">
            {/* Mobile Image - shown below md */}
            <Image
              src="/Images/Aboutus/Sec5-mv.png"
              alt="Part of Something Bigger"
              width={480}
              height={900}
              className="block md:hidden w-full object-contain px-2"
              priority
            />
    
            {/* Desktop Image - shown above md */}
            <Image
              src="/Images/Aboutus/Sec5-dv.png"
              alt="Part of Something Bigger"
              width={1200}
              height={600}
              className="hidden md:block w-full max-w-6xl object-contain"
              priority
            />
          </section>
    </>
  )
}

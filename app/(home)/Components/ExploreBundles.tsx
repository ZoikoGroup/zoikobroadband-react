import React from 'react'
import Image from 'next/image'

export default function ExploreBundles() {
  return (
    <div>
         {/* Explore bundles .. */}
              <section className="w-full bg-[#19598b] py-16 px-4">
                <div className="max-w-6xl mx-auto text-center text-white">
                  {/* Heading */}
                  <h2 className="text-lg md:text-xl font-semibold text-[#F5C241]">
                    Save up to 30% when you bundle Zoiko Broadband with:
                  </h2>
        
                  <p className="text-sm md:text-base text-white/90 mt-2 max-w-2xl mx-auto">
                    Create your complete connected ecosystem with exclusive multiservice
                    discounts for British families
                  </p>
        
                  {/* Bundle cards */}
                  <div className="mt-12 flex flex-col lg:flex-row lg:items-start sm:items-center justify-center gap-8">
                    {/* Left Card - Zoiko Mobile */}
                    <div className="text-white rounded-2xl p-6 w-full max-w-sm">
                      {/* Logo with white background */}
                      <div className="bg-white rounded-xl p-3 w-fit mx-auto mb-4">
                        {/* <img src="/ZM-logo.png" alt="Zoiko Mobile" className="h-10" /> */}
                        <Image
                          src="/Images/Aboutus/ZM-logo.png"
                          alt="Zoiko Mobile"
                          width={160}
                          height={60}
                          className="h-10 w-auto"
                          loading="lazy"
                        />
                      </div>
        
                      <h3 className="font-semibold text-[#F5C241] text-lg">
                        Zoiko Mobile
                      </h3>
        
                      <p className="text-sm text-white mt-2">
                        Dual SIM plans with international roaming. Perfect for British
                        expats and frequent travellers.
                      </p>
        
                      <button className="mt-4 px-6 py-2 rounded-full bg-[#F5C241] text-[#10446C] text-sm font-semibold hover:bg-[#E6B93A] transition">
                        View Mobile
                      </button>
                    </div>
        
                    {/* Connector – Dashed Line (desktop only) */}
                    <div className="hidden lg:flex items-start justify-center pt-10">
                      <div className="w-40 border-t-2 border-dashed border-white"></div>
                    </div>
        
                    {/* Right Card - Zoiko Orbit */}
                    <div className="text-white rounded-2xl p-6 w-full max-w-sm">
                      {/* Logo with white background */}
                      <div className="bg-white rounded-xl p-3 w-fit mx-auto mb-4">
                        {/* <img src="/ZO-Logo.png" alt="Zoiko Orbit" className="h-10" /> */}
                        <Image
                          src="/Images/Aboutus/ZO-Logo.png"
                          alt="Zoiko Orbit"
                          width={160}
                          height={60}
                          className="h-10 w-auto"
                          loading="lazy"
                        />
                      </div>
        
                      <h3 className="font-semibold text-[#F5C241] text-lg">
                        Zoiko Orbit
                      </h3>
        
                      <p className="text-sm text-white mt-2">
                        Global travel eSIMs for seamless connectivity. Stay connected
                        from London to Lisbon and beyond.
                      </p>
        
                      <button className="mt-4 px-6 py-2 rounded-full bg-[#F5C241] text-[#10446C] text-sm font-semibold hover:bg-[#E6B93A] transition">
                        View Orbit
                      </button>
                    </div>
                  </div>
        
                  {/* CTA Button */}
                  <div className="mt-10">
                    <button className="px-8 py-3 rounded-full bg-[#F5C241] text-[#10446C] font-semibold hover:scale-105 transition-transform">
                      Explore Bundles
                    </button>
                  </div>
                </div>
              </section>
    </div>
  )
}

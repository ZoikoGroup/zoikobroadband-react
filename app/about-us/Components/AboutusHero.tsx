import React from 'react'

export default function AboutusHero() {
  return (
    <>
    {/* Hero section */}
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Fibre That’s Built Right
          </h1>
          {/* Description */}
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            High-speed, reliable, and future-ready broadband built on Britain’s
            most robust fibre infrastructure.
          </p>
        </div>
      </section>
    </>
  )
}

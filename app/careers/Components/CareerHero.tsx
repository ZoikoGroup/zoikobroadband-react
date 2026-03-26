import React from 'react'

export default function CareerHero() {
  return (
    <section className="w-full dark:bg-gray-950 bg-[#465e5c] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center dark:text-white text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight dark:text-white">
            Build the Future with Zoiko
          </h1>
          {/* Description */}
          <p className="mt-2 text-base sm:text-lg lg:text-xl dark:text-white text-white/90 leading-relaxed max-w-4xl mx-auto">
            Where innovation, integrity, and impact meet
          </p>
        </div>
      </section>
  )
}

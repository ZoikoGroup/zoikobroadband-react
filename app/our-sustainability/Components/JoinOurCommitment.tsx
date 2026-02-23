import React from 'react'

export default function JoinOurCommitment() {
  return (
    <>
    {/* Join Our Green Commitment */}
      <section className="flex justify-center py-16 px-4">
        <div className="w-full max-w-7xl text-center bg-[#10446C] rounded-3xl shadow-xl px-6 sm:px-12 py-12 text-white">
          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Join Our Green Commitment
          </h2>

          <p className="text-sm sm:text-base text-white/90 mb-8 max-w-2xl mx-auto">
            Together, we're building a sustainable future for UK connectivity.
            Be part of the solution.
          </p>

          {/* Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 justify-items-center max-w-4xl mx-auto">
            <span className="border border-[#f5c241] bg-[#2d4f59] rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              Carbon Neutral by 2030
            </span>

            <span className="border border-[#f5c241] bg-[#2d4f59] rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              100% E-Waste Recycling
            </span>

            <span className="border border-[#f5c241] bg-[#2d4f59] rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              Renewable Energy Powered
            </span>
          </div>

          {/* Button */}
          <button className="bg-[#f5c241] text-[#10446C] px-6 py-3 rounded-xl text-lg font-bold hover:scale-105 transition-transform duration-200">
            Take Action Today
          </button>
        </div>
      </section>
    </>
  )
}

import React from 'react'

export default function CheckYourPostcode() {
  return (
    <div>
        {/* Check your postcode */}
      <section className="w-full bg-[#F4F8FC] py-20 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          {/* Card */}
          <div className="w-full max-w-xl bg-white border-t-4 border-b-blue-900 rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            {/* Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F5C241] flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#10446C]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 1.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 9h1v7a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1V9h1a1 1 0 00.707-1.707l-7-7z" />
              </svg>
            </div>

            {/* Text */}
            <h2 className="text-lg sm:text-xl font-bold text-[#10446C]">
              Let’s see if we’re in your area
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Enter your postcode to check availability and get results in
              seconds
            </p>

            {/* Form */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter your postcode (e.g. SW1A 1AA)"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-[#F5C241]"
              />

              <button
                className="px-6 py-3 rounded-xl bg-[#F5C241] text-[#10446C]
            font-semibold hover:bg-[#E6B93A] transition"
              >
                Check Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

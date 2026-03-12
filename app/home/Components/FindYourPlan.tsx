import React from 'react'

export default function FindYourPlan() {
  return (
    <div>
        {/* Find your plan .. */}
      <section className="w-full bg-[#E5F0FF] dark:bg-gray-600 py-16 px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900  border-t-4 border-[#10446C] rounded-3xl p-6 md:p-10">
          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#10446C] dark:text-white">
            Let's find your perfect plan 1
          </h2>
          <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
            Answer a few quick questions to get a personalised recommendation
            tailored to your British lifestyle
          </p>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div
              className="group border-2 border-[#F5C241] rounded-3xl p-6 flex flex-col items-center
        min-h-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-4"
              >
                1
              </div>

              <h3 className="text-[#10446C] font-semibold text-lg text-center mb-6">
                How many people in your household?
              </h3>

              <div className="w-full flex flex-col gap-4">
                {[
                  "1–2 people (Couple/Single)",
                  "3–4 people (Small family)",
                  "5+ people (Large family)",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full py-3 rounded-xl border-2 border-gray-200 bg-white
                hover:border-[#10446C] hover:bg-[#F0F6FF]
                transition-all text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CARD 2 */}
            <div
              className="border-2 border-[#F5C241] rounded-3xl p-6 flex flex-col items-center
        min-h-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-4"
              >
                2
              </div>

              <h3 className="text-[#10446C] font-semibold text-lg text-center mb-6">
                What do you do online?
              </h3>

              <div className="w-full flex flex-col gap-4">
                {[
                  "Basic browsing & BBC iPlayer",
                  "Netflix, YouTube & social media",
                  "Gaming & large downloads",
                  "Working from home & video calls",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full py-3 rounded-xl border-2 border-gray-200 bg-white
                hover:border-[#10446C] hover:bg-[#F0F6FF]
                transition-all text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CARD 3 – RECOMMENDED */}
            <div
              className="border-2 border-gray-200 rounded-3xl p-6 flex flex-col items-center
        min-h-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-4"
              >
                3
              </div>

              <h3 className="text-[#10446C] font-semibold text-lg text-center mb-6">
                Your perfect match
              </h3>

              <div className="bg-[#0F3D5E] text-white rounded-2xl p-6 text-center flex flex-col gap-4 w-full flex-1 justify-between">
                <div>
                  <p className="text-[#F5C241] font-semibold">Recommended:</p>
                  <h4 className="text-xl font-bold mt-1">Fibre Plus 67Mb</h4>
                  <p className="text-sm text-gray-200 mt-3">
                    Perfect for your family size and British streaming habits –
                    Netflix, BBC iPlayer, and more!
                  </p>
                </div>

                <button
                  className="bg-[#F5C241] text-[#10446C] py-3 rounded-full font-semibold
            hover:scale-105 transition-transform"
                >
                  View This Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

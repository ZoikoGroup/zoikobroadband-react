import React from "react";

export default function Diversity() {
  return (
    <>
      <section>
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-bold text-[#10446C] text-center mb-2">
          Diversity, Equality & Inclusion
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center py-16 px-4">
          <div className="max-w-xl w-full">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-lg px-6 sm:px-10 py-8 flex flex-col items-center ">
              {/* Content */}
              <div className="text-[#10446C] sm:text-left w-full max-w-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Equal Opportunity Statement
                </h3>

                <p className="text-sm sm:text-base leading-relaxed mb-6 text-gray-700">
                  At Zoiko, we believe that diversity drives innovation. We're
                  committed to creating an inclusive environment where everyone
                  can thrive, regardless of background, identity, or experience.
                  Our hiring practices are designed to be fair, transparent, and
                  focused on merit.
                </p>

                {/* Button */}
                <button className="bg-gray-300 text-[#10446C] font-semibold w-full px-6 py-3 rounded-xl mb-3">
                   Equal opportunities for all
                </button>
                <button className="bg-gray-300 text-[#10446C] font-semibold w-full px-6 py-3 rounded-xl mb-3">
                   Inclusive workplace culture
                </button>
                <button className="bg-gray-300 text-[#10446C] font-semibold w-full px-6 py-3 rounded-xl mb-3">
                   Equal opportunities for all
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-xl w-full">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-lg px-4 sm:px-10 py-5 flex items-center ">
              {/* Content */}
              <div className="text-[#10446C] text-center md:text-left w-full max-w-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Our Progress
                </h3>
                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className=" bg-gray-100 rounded-2xl p-5 text-center">
                    <span className="text-[#f5c241] text-3xl font-bold">
                      47%
                    </span>
                    <p className="text-[#10446C] text-xl font-semibold">
                      Women in Leadership
                    </p>
                    <p className="text-gray-500 text-base">
                      Target: 50% by 2025 to 2026
                    </p>
                  </div>

                  <div className=" bg-gray-100 rounded-2xl p-5 text-center">
                    <span className="text-[#f5c241] text-3xl font-bold">
                      68%
                    </span>
                    <p className="text-[#10446C] text-xl font-semibold">
                      Ethnic Diversity
                    </p>
                    <p className="text-gray-500 text-base">Above UK average</p>
                  </div>

                  <div className=" bg-gray-100 rounded-2xl p-5 text-center">
                    <span className="text-[#f5c241] text-3xl font-bold">
                      £0
                    </span>
                    <p className="text-[#10446C] text-xl font-semibold">
                      Gender Pay Gap
                    </p>
                    <p className="text-gray-500 text-base">Achieved in 2023</p>
                  </div>

                  <div className=" bg-gray-100 rounded-2xl p-6 text-center">
                    <span className="text-[#f5c241] text-3xl font-bold">
                      4.8/5
                    </span>
                    <p className="text-[#10446C] text-xl font-semibold">
                      Inclusion Score
                    </p>
                    <p className="text-gray-500 text-base">
                      Employee survey 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

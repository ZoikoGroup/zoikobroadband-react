import React from 'react'
import Image from 'next/image'

export default function Initiatives() {
  return (
    <>
    {/* Initiatives in Action */}
          <section className="flex justify-center py-16 px-4">
            <div className="max-w-7xl w-full">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#10446C] text-center mb-10">
                Initiati<span className="underline decoration-amber-400 underline-offset-14">ves in A</span>ction
              </h2>
    
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-72 lg:h-auto">
                  <Image
                    src="/Images/Oursustainability/Sec2-pic.png"
                    alt="Our Sustainability"
                    width={500}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
    
                <div className="lg:w-1/2 p-6 sm:p-10 text-[#10446C]">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    E-Waste Recycling Programme
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed mb-5">
                    We responsibly recycle all electronic equipment, ensuring proper
                    disposal and material recovery. Our certified partners process
                    over 10,000 devices annually.
                  </p>
                  {/* STATS */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-gray-100 rounded-2xl p-5 text-center">
                      <span className="text-[#f5c241] text-2xl font-bold">
                        15,847
                      </span>
                      <p className="text-gray-500 text-sm">Devices Recycled</p>
                    </div>
    
                    <div className="flex-1 bg-gray-100 rounded-2xl p-5 text-center">
                      <span className="text-[#f5c241] text-2xl font-bold">
                        98.7%
                      </span>
                      <p className="text-gray-500 text-sm">
                        Material Recovery Rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

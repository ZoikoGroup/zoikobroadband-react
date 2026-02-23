import React from 'react'
import Image from 'next/image'

export default function CustomerAction() {
  return (
    <>
    {/* Customer Action Zone */}
          <section className="flex justify-center py-16 px-4">
            <div className="max-w-xl w-full">
              {/* Heading */}
              <h2 className="text-2xl sm:text-4xl font-bold text-[#10446C] text-center mb-2">
                Customer Action Zone
              </h2>
    
              <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
                Join us in making a difference — every action counts towards our
                shared environmental goals
              </p>
    
              {/* Card */}
              <div className="bg-white rounded-3xl shadow-lg px-6 sm:px-10 py-8 flex flex-col items-center ">
                {/* Icon */}
                <div className="mb-4">
                  <Image
                    src="/Images/Oursustainability/phone.png"
                    alt="Paperless Billing"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority={false}
                  />
                </div>
    
                {/* Content */}
                <div className="text-[#10446C] sm:text-left w-full max-w-lg">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    Sign Up for Paperless Billing
                  </h3>
    
                  <p className="text-sm sm:text-base leading-relaxed mb-6 text-gray-700">
                    Reduce paper waste by switching to digital bills. Get instant
                    notifications and help save trees.
                  </p>
    
                  {/* Benefits */}
                  <ul className="text-left space-y-2 mb-6 w-fit">
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500 font-bold">✓</span>
                      Save 12 trees per year
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500 font-bold">✓</span>
                      Save 1,500L water annually
                    </li>
                  </ul>
    
                  {/* Button */}
                  <button className="bg-[#10446C] w-full text-white px-6 py-3 rounded-xl hover:bg-[#0c3654] transition duration-300">
                    Contact Us
                  </button>
    
                  {/* Progress text */}
                  <p className="text-sm text-gray-500 mt-5">
                    100% of customers already paperless
                  </p>
    
                  {/* Real Progress Bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

import React from 'react'
import Image from 'next/image'

export default function FromOurLeadership() {
  return (
    <>
      {/* From Our Leadership */}
      <section className="w-full bg-[#e8f0eb] dark:bg-gray-900 py-20 sm:py-28 px-4 sm:px-8 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-16">
          
          {/* Left — Photo + Name + Title */}
          <div className="flex flex-col items-center sm:items-center shrink-0 sm:w-52 md:mr-5">
            
            <div className="w-72 h-72 sm:w-72 sm:h-72 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/Images/Aboutus/Frame-1.png"
                alt="Samuel Gittens – Marketing Director"
                width={300}
                height={300}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <p className="mt-3 font-bold text-[#1a1a1a] dark:text-white text-sm sm:text-base text-center">
              Samuel Gittens
            </p>

            <p className="text-[#555555] dark:text-gray-400 text-xs sm:text-sm text-center">
              Marketing Director.
            </p>

          </div>

          {/* Right — Quote */}
          <div className="flex flex-col justify-center max-w-2xl">
            
            <h2 className="text-[#1a1a1a] dark:text-white font-bold text-2xl sm:text-3xl mb-3 mt-4">
              From Our Leadership
            </h2>

            <p className="text-[#494949] dark:text-gray-300 text-base sm:text-xl leading-8 md:leading-10">
              We&rsquo;re not just selling broadband &mdash; we&rsquo;re
              building digital futures for Britain. From bustling cities to
              countryside communities, we connect people with the speed,
              security, and simplicity they deserve.
            </p>

          </div>

        </div>
      </section>
    </>
  )
}
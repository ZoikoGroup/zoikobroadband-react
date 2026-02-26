import React from "react";

export default function WorldClassInnovation() {
  return (
    <>
      <section
        className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="innovation-heading"
      >
        {/* Heading */}
        <div className="max-w-6xl mx-auto text-center">
          <h2
            id="innovation-heading"
            className="text-[#16213E] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
          >
            Powered by World-Class Innovation
          </h2>

          <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-8 max-w-4xl mx-auto">
            From OSS/BSS platforms to cloud and security infrastructure, Zoiko
            Broadband partners with global leaders to deliver seamless customer
            experiences.
          </p>
        </div>

        {/* Partners List */}
        <ul className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-6 max-w-7xl mx-auto">
          {["ZoikoNex", "Cisco", "Microsoft Azure", "BeQuick"].map(
            (partner) => (
              <li key={partner} className="list-none">
                <div className="flex justify-center items-center px-6 py-5 md:px-10 md:py-6 text-base md:text-lg font-semibold text-white bg-[#10446C] rounded-2xl hover:scale-105 transition-transform duration-200">
                  {partner}
                </div>
              </li>
            ),
          )}
        </ul>
      </section>
    </>
  );
}

import React from "react";

export default function WorldClassInnovation() {
  return (
    <>
      <section className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8 lg:py-18">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-[#16213E] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Powered by World-Class Innovation
          </h1>
          {/* Description */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-8 max-w-4xl mx-auto">
            From OSS/BSS platforms to cloud and security infrastructure, Zoiko
            Broadband partners with global leaders to deliver seamless customer
            experiences.
          </p>
        </div>
        <div className="flex justify-center items-center mt-8 gap-8 max-w-8xl mx-auto">
          <div className="flex justify-center items-center px-18 py-6 text-xl font-bold text-white bg-[#10446C] rounded-2xl ">
            ZoikoNex
          </div>
          <div className="flex justify-center items-center px-18 py-6 text-xl font-bold text-white bg-[#10446C] rounded-2xl ">
            Cisco
          </div>
          <div className="flex justify-center items-center px-18 py-6 text-xl font-bold text-white bg-[#10446C] rounded-2xl ">
            Microsoft Azure
          </div>
          <div className="flex justify-center items-center px-18 py-6 text-xl font-bold text-white bg-[#10446C] rounded-2xl ">
            BeQuick
          </div>
        </div>
      </section>
    </>
  );
}

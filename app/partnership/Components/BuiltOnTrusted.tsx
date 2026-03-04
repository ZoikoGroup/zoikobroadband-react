import React from "react";

export default function BuiltOnTrusted() {
  return (
    <>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-18">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-[#16213E] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Built on Trusted Networks
          </h2>
          {/* Description */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-8 max-w-4xl mx-auto">
            As an authorised reseller of BT Wholesale, Zoiko Broadband delivers
            nationwide coverage and Tier-1 reliability. This foundation ensures
            crystal-clear digital lines and future-proof broadband services.
          </p>
        </div>
        <div className="relative mt-10 bg-[#10446C] flex flex-col justify-center items-center text-white px-8 py-10 md:px-8 md:py-18 rounded-xl max-w-lg mx-auto">
            <button className="absolute -top-5  bg-[#f5c241] text-[#10446C] px-10 py-2 rounded-2xl text-base font-semibold">
                Authorised Reseller
              </button>
            <h2 className="text-2xl md:text-4xl font-bold">
                BT Wholesale
            </h2>
          </div>
      </section>
    </>
  );
}

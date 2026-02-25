import Image from "next/image";
import React from "react";

const OurBrands = [
  {
    src: "/Images/ZoikoGroup/ZG.png",
    name: "Zoiko Group",
    title: "Global Conglomerate",
  },
  {
    src: "/Images/ZoikoGroup/ZT.png",
    name: "Zoiko Telecom",
    title: "UK-Registered Company",
  },
  {
    src: "/Images/ZoikoGroup/ZB.png",
    name: "Zoiko Broadband",
    title: "Your Trusted ISP",
  },
];

export default function CorporateBacking() {
  return (
    <>
      <section className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8 lg:py-18">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-[#10446C] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Our Corporate Backing
          </h1>
          {/* Description */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-[#555555] leading-relaxed md:leading-9 max-w-4xl mx-auto">
            Zoiko Broadband benefits from the scale and investment strength of
            Zoiko Group. Customers gain confidence knowing their broadband is
            supported by a global conglomerate with interests in telecoms,
            fintech, media, foods, and more.
          </p>
        </div>
        <div className="mt-8 bg-white text-base md:text-lg  px-6 py-4 border-l-4 border-amber-400 rounded-2xl max-w-4xl mx-auto">
          <span className="font-bold text-[#333333]">Key assurance: </span>
          <span className="text-gray-700">
            Zoiko Broadband is not a small independent ISP—it's a future-proofed
            provider backed by international resources.
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {OurBrands.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-3"
              >
                {/* Logo Circle */}
                <div className="relative bg-white rounded-full w-32 h-32 overflow-hidden flex items-center justify-center shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-contain p-4"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#0f3d5e]">
                  {item.name}
                </h3>

                {/* Subtitle */}
                <p className="text-sm md:text-base text-gray-500">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

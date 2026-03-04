import React from "react";
import Image from "next/image";
const benefits = [
  {
    src: "/Images/Checkmypost/icon1.png",
    label: "Instant Availability Results",
    title: "Get results based on your postcode.",
  },
  {
    src: "/Images/Checkmypost/icon2.png",
    label: "Fibre Type Confirmation",
    title: "Know if you have FTTP or SOGEA at your location.",
  },
  {
    src: "/Images/Checkmypost/icon3.png",
    label: "Tailored Plan Suggestions",
    title: "Find plans that best fit your needs.",
  },
  {
    src: "/Images/Checkmypost/icon4.png",
    label: "Quick-start Installation",
    title: "Enjoy a seamless setup with minimal disruption.",
  },
];

export default function BenefitsOfZB() {
  return (
    <>
      <section
        aria-labelledby="benefits-heading"
        className="w-full bg-[#fffcf4] py-16"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT IMAGE */}
            <div className="flex justify-center">
              <Image
                src="/Images/Checkmypost/section-pic.png"
                alt="Customers enjoying reliable broadband connectivity"
                width={900}
                height={600}
                priority
                className="w-full max-w-lg rounded-lg"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2
                id="benefits-heading"
                className="text-black font-bold text-3xl md:text-4xl mb-2"
              >
                Benefits of Zoiko Broadband
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-8">
                Here’s what you’ll get:
              </p>

              <ul className="space-y-5">
                {benefits.map((item) => (
                  <li key={item.label}>
                    <article className="bg-white border border-gray-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition">
                      <Image
                        src={item.src}
                        alt=""
                        aria-hidden="true"
                        width={64}
                        height={64}
                        className="shrink-0 w-16 h-16 object-contain"
                      />

                      <div>
                        <h3 className="text-black font-semibold text-lg md:text-xl">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                          {item.title}
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Items = [
  {
    src: "/Images/Gethelp/sec3-icon1.png",
    label: "Live Chat",
    description: "Chat with a Zoiko agent now",
    feature:"24/7 Available",
    btn: "Start Chat",
    btnlink: "https://web.whatsapp.com",
  },
  {
    src: "/Images/Gethelp/sec3-icon2.png",
    label: "Request a Call Back",
    description: "Request technical callback at your convenience",
    feature:"Usually within 2 hours",
    btn: "Request Call Back",
    btnlink: "tel:+442071646399",
  },
  {
    src: "/Images/Gethelp/sec3-icon4.png",
    label: "Self-Diagnostic Tool",
    description: "Run automated setup and connection checks",
    feature:"Response within 24 hours",
    btn: "Run Diagnostic",
    btnlink: "#",
  },
];

export default function StillNeedHelp() {
  return (
    <>
    <section
        className="w-full bg-white dark:bg-gray-950  py-16 px-6 sm:px-8 lg:px-12"
        aria-labelledby="how-we-help-heading"
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center">
          <h2
            id="how-we-help-heading"
            className="text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
          >
            Need more support?
          </h2>

          <p className="mt-2 text-base md:text-lg text-[#555555] dark:text-white leading-relaxed max-w-3xl mx-auto">
            Our friendly UK-based team is here to help
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Items.map((item, i) => (
            <li key={i}>
              <article
                className="h-full bg-white dark:bg-gray-900 shadow-md rounded-2xl border border-gray-100 px-6 py-10
                  flex flex-col items-center text-center
                  transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Icon wrapper (important for layout stability) */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={80}
                    height={80}
                    className="object-contain"
                    sizes="80px"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg lg:text-2xl font-bold text-[#10446C]">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base text-[#555555] leading-relaxed">
                  {item.description}
                </p>
                <p className="mt-4 max-w-fit bg-[#F0FDF4] text-sm text-[#15803D] p-2 font-bold rounded-2xl leading-relaxed">
                  {item.feature}
                </p>
                <Link
                  href={item.btnlink}
                  className="mt-5 bg-[#10446C] text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-[#0d3a5a] transition"
                >
                  {item.btn}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

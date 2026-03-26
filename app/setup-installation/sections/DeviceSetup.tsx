import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Items = [
  {
    src: "/Images/Gethelp/mobile.png",
    label: "Smartphones & Tablets",
    description: "Android & iOS Wi-Fi setup guides",
    btn: "View Guide",
  },
  {
    src: "/Images/Gethelp/laptop.png",
    label: "Request a Call Back",
    description: "Have us call you at a convenient time",
    feature:"Usually within 2 hours",
    btn: "View Guide",
  },
];

export default function DeviceSetup() {
  return (
    <>
    <section
        className=" dark:bg-gray-950  dark:text-white
 w-full bg-[#D2ECFF] py-16 px-6 sm:px-8 lg:px-12"
        aria-labelledby="device-setup-heading"
      >
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center">
          <h2
            id="device-setup-heading"
            className="  dark:text-[#63a7db]
 text-[#10446C] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
          >
            Device Setup Support
          </h2>

          <p className="mt-2 text-base md:text-lg text-[#555555] leading-relaxed max-w-3xl mx-auto dark:bg-gray-950  dark:text-white
">
            Get your devices connected quickly with our step-by-step guides
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {Items.map((item, i) => (
            <li key={i}>
              <article
                className="h-full bg-white shadow-md rounded-2xl border border-gray-100 px-6 py-10 dark:bg-gray-950  dark:text-white

                  flex flex-col items-center text-center
                  transition-all duration-300 hover:shadow-md"
              >
                {/* Icon wrapper (important for layout stability) */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={48}
                    height={48}
                    className="object-contain"
                    sizes="48px"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-base lg:text-lg font-bold text-black dark:bg-gray-950  dark:text-white
">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[#555555] leading-relaxed dark:bg-gray-950  dark:text-white
">
                  {item.description}
                </p>
                <button
                  className="mt-5 bg-[#fcd108]  text-[#10446C] px-6 py-3 rounded-md font-semibold text-center hover:bg-[#e6b800] transition"
                >
                  {item.btn}
                </button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

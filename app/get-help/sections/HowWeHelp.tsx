import React from "react";
import Image from "next/image";
import Link from "next/link";

const complianceItems = [
  {
    src: "/Images/Gethelp/sec1-icon1.png",
    label: "Setup & Installation",
    description: "Step-by-step guides to get you connected",
    btn: "View Setup Guide",
    btnlink: "/setup-installation",
  },
  {
    src: "/Images/Gethelp/sec1-icon2.png",
    label: "Manage My Account",
    description: "Change your details, passwords, and preferences",
    btn: "Go to My Account",
    btnlink: "/my-account",
  },
  {
    src: "/Images/Gethelp/sec1-icon3.png",
    label: "Payments & Billing",
    description: "View, download or pay your bills",
    btn: "Billing Help",
    btnlink: "/payments-billing",
  },
  {
    src: "/Images/Gethelp/sec1-icon4.png",
    label: "Report a Fault",
    description: "Experiencing issues? Log and track faults",
    btn: "Report an Issue",
    btnlink: "/report-a-fault",
  },
  {
    src: "/Images/Gethelp/sec1-icon5.png",
    label: "Wi-Fi & Performance",
    description: "Optimise speed and check connectivity",
    btn: "Wi-Fi Help",
    btnlink: "/setup-installation",
  },
  {
    src: "/Images/Gethelp/sec1-icon6.png",
    label: "Speak to Support",
    description: "Can't find what you need? We're here to help",
    btn: "Contact Us",
    btnlink: "/contact-us",
  },
];

export default function HowWeHelp() {
  return (
    <>
      <section
        className="w-full bg-white py-16 px-6 sm:px-8 lg:px-12"
        aria-labelledby="how-we-help-heading"
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center">
          <h2
            id="how-we-help-heading"
            className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
          >
            How can we help you today?
          </h2>

          <p className="mt-6 text-base md:text-lg text-[#555555] leading-relaxed max-w-3xl mx-auto">
            Choose from the most common support topics below
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {complianceItems.map((item, i) => (
            <li key={i}>
              <article
                className="h-full bg-[#f8f9fa] rounded-2xl border border-gray-100 px-6 py-10
                  flex flex-col items-center text-center
                  transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Icon wrapper (important for layout stability) */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#FFE7A6]">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={56}
                    height={56}
                    className="object-contain"
                    sizes="56px"
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
                <Link
                  href={item.btnlink}
                  className="mt-5 bg-[#F6C140] text-[#10446C] px-6 py-3 rounded-md font-semibold text-center hover:bg-[#eab530] transition"
                >
                  {item.btn}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

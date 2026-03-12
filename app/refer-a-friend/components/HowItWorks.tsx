import React from "react";
import Image from "next/image";

const steps = [
  {
    id: "1",
    src: "/Images/ReferFriend/link.png",
    label: "Share Your Unique Link",
    description:
      "Send your personal referral link to friends via email, social media, or text message.",
  },
  {
    id: "2",
    src: "/Images/ReferFriend/sign.png",
    label: "Friend Signs Up",
    description:
      "Your friend uses your link to sign up for any Zoiko broadband package.",
  },
  {
    id: "3",
    src: "/Images/ReferFriend/reward.png",
    label: "You Both Get Rewarded",
    description: "After 30 days, you both receive your chosen £50 reward.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section
      aria-labelledby="how-it-works"
       className=" w-full py-10 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="how-it-works-heading" className="text-2xl md:text-4xl font-bold text-[#10446C]">
            H<span className="underline decoration-amber-400 underline-offset-14">ow It Wo</span>rks
          </h2>
          {/* Cards container */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {steps.map((item, i) => (
              <div
                key={i}
                className="bg-[#f8f9fa] rounded-2xl border border-gray-200 px-6 py-10 flex flex-col items-center justify-between gap-4 hover:shadow-sm transition-shadow duration-300"
              >
                <div
                  className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-3"
                >
                  {item.id}
                </div>
                <Image
                  src={item.src}
                  alt={item.label}
                  width={100}
                  height={100}
                  className="w-18 h-18 object-contain"
                />
                <h3 className="text-center text-lg md:text-2xl font-bold text-[#10446C] mb-2">
                  {item.label}
                </h3>
                <p className="text-center text-base md:text-lg font-normal text-[#10446C] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

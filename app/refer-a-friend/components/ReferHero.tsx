"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "./modal-system/ModalContext";

export default function ReferHero() {
 const { openModal } = useModal();
  return (
    <>
      <section
        aria-labelledby="bundle-services"
        className="bg-[#10446C] text-white w-full py-12"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center">
              <h2
                id="bundle-services"
                className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4"
              >
                Friends Deserve Great Internet. You Deserve Rewards.
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mb-6">
                £50 credit for them | £50 credit for you <br /> Unlimited
                referral
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="?showReferral=true"
                  scroll={false}
                  onClick={() => openModal("referral")}
                  className="bg-white text-[#10446C] px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition"
                >
                  Get My Referral Link
                </Link>
              </div>
            </div>

            <div className="grid">
              {/* Large image */}
              <div className="">
                <Image
                  src="/Images/ReferFriend/refer-hero.png"
                  alt="Customer using Zoiko services"
                  width={500}
                  height={600}
                  fetchPriority="high"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

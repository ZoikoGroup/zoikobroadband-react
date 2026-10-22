"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ComingSoonModal({ onClose }: { onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    //   const handleSubmit = async () => {
    //     if (!email.trim()) return;

    //     console.log("Notify email:", email);
    //     setSubmitted(true);
    //   };
    const handleSubmit = () => {
        if (!email.trim()) return;
        alert("Thanks! We'll notify you when referrals go live.");
        setEmail("");
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl leading-none z-10"
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="flex flex-col items-center text-center px-6 pt-8 pb-4">
                    {/* Logo */}
                    <Image
                        src="/ZBLogo.svg"
                        alt="Zoiko Broadband"
                        width={120}
                        height={40}
                        className="object-contain mb-4"
                    />

                    {/* Icon */}
                    <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-2xl mb-3">
                        ☀️
                    </div>

                    {/* Badge */}
                    <span className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-300 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        🚀 NEW FEATURE
                    </span>

                    {/* Heading */}
                    <h2 className="text-xl sm:text-2xl font-bold text-[#10446C] dark:text-[#63a7db] mb-3">
                        Referrals are coming soon
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
                        We&apos;re putting the finishing touches on a way for you to invite
                        friends to Zoiko Broadband — and get rewarded when they join.
                    </p>

                    {/* Reward boxes */}
                    <div className="flex gap-3 w-full mb-2">
                        <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl py-4">
                            <p className="text-2xl font-bold text-[#10446C] dark:text-[#63a7db]">
                                £50
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                credit for them
                            </p>
                        </div>
                        <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl py-4">
                            <p className="text-2xl font-bold text-[#10446C] dark:text-[#63a7db]">
                                £50
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                credit for you
                            </p>
                        </div>
                    </div>

                    {/* Planned reward note */}
                    <p className="text-xs text-gray-400 italic mb-6">
                        Planned reward — final details confirmed at launch
                    </p>

                    {/* Email input */}
                    {!submitted ? (
                        <>
                            <div className="flex w-full gap-2 mb-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    className="flex-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full px-4 py-3 text-sm outline-none focus:border-[#10446C] dark:focus:border-[#63a7db] transition"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#10446C] hover:bg-[#0d3a5c] text-white w-12 h-12 rounded-full flex items-center justify-center transition shrink-0"
                                    aria-label="Submit"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">
                                We&apos;ll only email you once — the day referrals go live. No
                                spam.
                            </p>
                        </>
                    ) : (
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-4">
                            You&apos;re on the list! We&apos;ll notify you at launch.
                        </p>
                    )}

                    {/* Maybe later */}
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
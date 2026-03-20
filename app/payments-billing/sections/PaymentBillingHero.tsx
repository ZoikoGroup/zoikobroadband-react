import React from "react";
import Link from "next/link";

export default function PaymentBillingHero() {
  return (
    <>
      <section
        aria-labelledby="payment-and-billing-heading"
        className="w-full bg-[#10446C] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center text-white dark:text-gray-100">
          {/* Heading */}
          <h2
            id="payment-and-billing-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            View, Pay, and Stay in Control of Your Zoiko Broadband Bills
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Securely manage your invoices, update payment methods, monitor
            usage, and get billing support — all in one place.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/80 dark:text-gray-400">
            All payments are protected by bank-grade encryption and the UK
            Direct Debit Guarantee.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/login"
              className="bg-white text-[#10446C] dark:bg-gray-200 dark:text-gray-900 px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-gray-100 transition"
            >
              Log In to View My Bills
            </Link>

            <Link
              href="https://tawk.to/chat/68c5379a0a06ff1929296dd0/1j5162dnk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get help with billing issues"
              className="border border-white dark:border-gray-400 text-white dark:text-gray-200 px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-white hover:text-[#10446C] dark:hover:bg-gray-200 dark:hover:text-black transition"
            >
              Help with a Billing Issue
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="billing-dashboard-heading"
        className="bg-white dark:bg-gray-900 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="billing-dashboard-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6"
          >
            Billing Dashboard
          </h2>

          {/* Card */}
          <div
            className="bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-2xl shadow-sm flex flex-col lg:flex-row items-center 
      gap-6 px-6 sm:px-8 py-8"
          >
            {/* LEFT CONTENT */}
            <div className="lg:w-2/3 text-center lg:text-left">
              <h3 className="text-[#10446C] dark:text-gray-200 font-semibold text-sm mb-2">
                Current Balance
              </h3>

              {/* Amount + Due */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-[#10446C] dark:text-white">
                  £34.99
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Due by 28 Aug
                </span>
              </div>

              {/* Semantic Data */}
              <dl className="space-y-1 text-sm">
                <div>
                  <dt className="font-semibold inline text-black dark:text-gray-200">
                    Next Payment Date:
                  </dt>{" "}
                  <dd className="inline text-gray-600 dark:text-gray-400">
                    28 Aug 2025
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold inline text-black dark:text-gray-200">
                    Payment Method:
                  </dt>{" "}
                  <dd className="inline text-gray-600 dark:text-gray-400">
                    Direct Debit — Barclays •••• 8293
                  </dd>
                </div>
              </dl>

              {/* Status Badge */}
              <span className="inline-block mt-3 bg-emerald-100 dark:bg-emerald-900 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">
                In Good Standing
              </span>
            </div>

            {/* RIGHT CTA */}
            <div className="lg:w-1/3 w-full flex justify-center lg:justify-end">
              <Link
              href={"/dashboard"}
                className="bg-[#F5C241] text-[#10446C] text-sm font-semibold
          px-6 py-2.5 rounded-lg
          hover:bg-[#e0ad2f] transition"
              >
                Go to My Billing Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

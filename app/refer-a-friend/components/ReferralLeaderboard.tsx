"use client";
import React from "react";
import { useModal } from "./modal-system/ModalContext";

export default function ReferralLeaderboard() {
  const { openModal } = useModal();
  return (
    <>
      <section
        aria-labelledby="leaderboard-heading"
        className="bg-white dark:bg-black w-full py-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Title */}
          <h2
            id="leaderboard-heading"
            className="text-center text-xl md:text-2xl font-semibold text-[#10446C] dark:text-white"
          >
            Live Referral Leaderboard
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1 mb-6">
            See how our top referrers are doing this month
          </p>

          {/* Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 p-2">
            
            {/* Table Header */}
            <table className="w-full rounded-t-xl overflow-hidden border border-gray-100 dark:border-gray-700 table-fixed">
              <thead className="bg-[#10446C] text-white text-sm md:text-base">
                <tr className="rounded-t-xl">
                  <th className="px-4 py-3 text-left font-semibold">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Referrer
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Referrals
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Rewards Earned
                  </th>
                </tr>
              </thead>
            </table>

            {/* Gold Divider */}
            <div className="w-full h-[2px] bg-amber-400 mb-5 mt-3"></div>

            {/* Footer Info */}
            <div className="bg-gray-50 dark:bg-gray-800 text-center py-6 text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span aria-hidden="true">🎯</span> Your Position:{" "}
              <strong>#247</strong> with <strong>2 referrals</strong>
            </div>

            {/* Button */}
            <div className="bg-gray-50 dark:bg-gray-800 pb-8 pt-8 flex justify-center border border-gray-50 dark:border-gray-700 rounded-b-xl">
              <button
                aria-label="View the full referral leaderboard"
                onClick={() => openModal("other")}
                className="bg-[#10446C] text-white px-8 py-3 rounded-lg font-semibold transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                View Full Leaderboard
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
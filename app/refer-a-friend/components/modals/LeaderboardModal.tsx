import React from "react";

export default function LeaderboardModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaderboard-title"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close leaderboard modal"
            className="absolute top-3 right-3 text-white z-10"
          >
            ✕
          </button>

          {/* Header */}
          <header className="bg-[#10446C] text-white text-center py-5">
            <h2 id="leaderboard-title" className="font-semibold">
              Leaderboard
            </h2>

            {/* Top 3 */}
            <div className="flex justify-center items-end gap-4 mt-4">
              {/* 2nd */}
              <div className="text-center">
                <img
                  src="/avatar2.png"
                  alt="Second place"
                  className="w-12 h-12 rounded-full mx-auto"
                />
                <p className="text-xs mt-1">Eloyemi</p>
                <p className="font-semibold">4900</p>
              </div>

              {/* 1st */}
              <div className="text-center">
                <img
                  src="/avatar1.png"
                  alt="First place"
                  className="w-16 h-16 rounded-full border-4 border-yellow-400 mx-auto"
                />
                <p className="text-xs mt-1">Kumar</p>
                <p className="font-bold text-lg">5000</p>
              </div>

              {/* 3rd */}
              <div className="text-center">
                <img
                  src="/avatar3.png"
                  alt="Third place"
                  className="w-12 h-12 rounded-full mx-auto"
                />
                <p className="text-xs mt-1">Arvin</p>
                <p className="font-semibold">4500</p>
              </div>
            </div>
          </header>

          {/* Leaderboard list */}
          <section className="p-4 space-y-3">
            {[
              { rank: 4, name: "Kumar", score: 4400 },
              { rank: 5, name: "Monkonden", score: 4300 },
              { rank: 6, name: "Jimmy James", score: 3400 },
              { rank: 7, name: "Puppy", score: 3300 },
            ].map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{user.rank}</span>

                  <img
                    src="/avatar.png"
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />

                  <span className="text-sm">{user.name}</span>
                </div>

                <span className="font-semibold text-sm">{user.score}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

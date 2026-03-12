import React from 'react'

export default function LeaderboardModal({onClose}: {onClose: () => void}) {
  return (
    <>
      <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          Leaderboard...
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Invite your friends to Zoiko Broadband and earn rewards.
        </p>

        {/* Email Input */}
        <div className="flex items-center border rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Email addresses..."
            className="flex-1 px-4 py-2 outline-none"
          />

          <button className="bg-[#10446C] text-white px-4 py-2">
            Send
          </button>
        </div>

        {/* Share link */}
        <div className="mt-6 text-center">
          <h3 className="font-semibold mb-3">
            Share the referral link
          </h3>

          <button className="bg-[#10446C] text-white px-6 py-2 rounded-lg">
            Copy Link
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

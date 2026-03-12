import React from "react";

export default function ReferralModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="referral-modal-title"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close referral modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          {/* Header */}
          <header className="text-center mb-6">
            <h2 id="referral-modal-title" className="text-2xl font-bold">
              Referrals
            </h2>

            <p className="text-gray-600 text-sm mt-2">
              Invite your friends to Zoiko Broadband. If they sign up, you and
              your friend will get a reward!
            </p>
          </header>

          {/* Invite Section */}
          <section className="mb-6">
            <h3 className="font-semibold text-center mb-2">
              Invite your friends
            </h3>

            <p className="text-sm text-gray-500 text-center mb-4">
              Insert your friends' addresses and send invitations.
            </p>

            <div className="flex items-center border rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Email addresses..."
                className="flex-1 px-4 py-2 outline-none text-sm"
              />

              <button
                className="bg-[#10446C] text-white px-4 py-2"
                aria-label="Send invitation"
              >
                ➤
              </button>
            </div>
          </section>

          {/* Share Link Section */}
          <section className="text-center">
            <h3 className="font-semibold mb-2">Share the referral link</h3>

            <p className="text-sm text-gray-500 mb-4">
              You can also share your referral link by copying it or sharing it
              on social media.
            </p>

            <div className="flex items-center justify-between gap-2 bg-gray-100 rounded-full px-3 py-2 mb-4">
              <span className="text-sm truncate">
                zoikobroadband.com/referral/123
              </span>

              <button className="bg-[#10446C] text-white text-sm px-4 py-1 rounded-lg">
                Copy link
              </button>
            </div>

            {/* Social icons */}
            {/* <div className="flex justify-center gap-4">
              <button aria-label="Share on Instagram">📷</button>
              <button aria-label="Share on WhatsApp">🟢</button>
              <button aria-label="Share on Facebook">🔵</button>
              <button aria-label="Share on Twitter">🐦</button>
              <button aria-label="Share on LinkedIn">🔷</button>
            </div> */}
          </section>
        </div>
      </div>
    </>
  );
}

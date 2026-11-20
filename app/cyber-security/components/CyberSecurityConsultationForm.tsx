"use client";

import React, { useState } from "react";

export default function CyberSecurityConsultationForm() {
  const [contactName, setContactName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discussionTopic, setDiscussionTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-[#061A33] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Copy & Image */}
          <div className="lg:col-span-5">
            <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              SECURITY CONSULTATION
            </p>

            <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] mb-4 max-w-[400px]">
              Discuss your business security
            </h2>

            <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[430px] mb-7">
              Tell us what you would like to talk through. We ask only what we
              need and give you a reference once your request is received.
            </p>

            <div className="relative w-full max-w-[440px] aspect-[16/9] rounded-[16px] overflow-hidden bg-[#1E293B]">
              <img
                src="/Images/cyber/11.png"
                alt="Connecting Ethernet cable to a wireless router on an office desk"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[16px] border-[1.5px] border-dashed border-[#4B7FD6]/80"
              />
            </div>
          </div>

          {/* Right Column: White Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label
                    htmlFor="cyber-contact-name"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Contact name
                  </label>
                  <input
                    id="cyber-contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cyber-business-name"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Business name
                  </label>
                  <input
                    id="cyber-business-name"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cyber-business-email"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Business email
                  </label>
                  <input
                    id="cyber-business-email"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cyber-phone-optional"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="cyber-phone-optional"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cyber-discussion-topic"
                  className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                >
                  What would you like to discuss?
                </label>
                <textarea
                  id="cyber-discussion-topic"
                  rows={4}
                  value={discussionTopic}
                  onChange={(e) => setDiscussionTopic(e.target.value)}
                  className="w-full p-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all resize-y"
                />
              </div>

              <p className="text-[#64748B] text-[11.5px] leading-[1.5] mb-4">
                Do not include passwords, logs or technical details of any
                weakness. See our{" "}
                <a href="#" className="underline hover:text-[#0B2241]">
                  privacy notice
                </a>
                . Marketing opt-in is never pre-ticked.
              </p>

              <button
                type="submit"
                className="w-full h-[46px] bg-[#FFC119] hover:bg-[#F5B60A] active:scale-[0.99] text-[#0B2241] text-[14px] font-bold rounded-[8px] transition-all cursor-pointer"
              >
                Discuss Your Business Security
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [agreed_to_policy, setAgreedToPolicy] = React.useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = {
    first_name,
    last_name,
    email,
    phone,
    subject,
    message,
    agreed_to_policy,
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${API_URL}/api/contact/contact-us/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
// console.log(formData);
    const data = await res.json();

    if (data.success) {
      toast.success("Message sent successfully!");
      console.log("Message sent successfully!");  
      // Clear form fields     
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setAgreedToPolicy(false);
    } else {
      toast.error("Failed to send message.");
      console.error(data);
    }
  } catch (err) {
    toast.error("An error occurred while sending the message.");
    console.error(err);
  }
};

  return (
    <>
      <section className="bg-[#f3f5f7] dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT FORM */}
          <div className="bg-white border border-gray-200 dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f2d3d] dark:text-white">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fill out the form below and we’ll get back to you as soon as
              possible.
            </p>

            {/* FORM */}
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium dark:text-gray-300">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={first_name}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium dark:text-gray-300">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="text"
                  placeholder="07123 456789"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Subject *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select a subject</option>
                  <option value="Home Broadband">Home Broadband</option>
                  <option value="Bussiness Plans">Bussiness Plans</option>
                  <option value="Speed Issue">Speed Issue</option>
                  <option value="Postcode">Postcode</option>
                  <option value="Internet Issue">Internet Issue</option>
                  <option value="Biling">Biling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your enquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={agreed_to_policy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                />
                <p className="text-gray-600 dark:text-gray-400">
                  I agree to the processing of my personal data in accordance
                  with the{" "}
                  <span className="text-[#10446C] dark:text-[#F6C140] font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#F6C140] text-[#10446C] font-semibold py-3 rounded-md hover:bg-[#eab530] transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-7">
            {/* Live Chat */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 md:px-5 md:py-8 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                Live Chat
              </p>
              <h3 className="text-[#10446C] dark:text-white font-semibold text-lg md:text-2xl">
                Start Chat
              </h3>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mt-1">
                Available 24/7 Instant Support
              </p>
            </div>

            {/* Emergency */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                Emergency Support
              </p>
              <p className="text-[#10446C] dark:text-white font-semibold text-lg md:text-2xl mt-1">
                +44 (0)207 164 6399
              </p>
              <p className="text-base md:lg text-gray-500 dark:text-gray-400 mt-1">
                Available 24/7 Instant Support
              </p>
            </div>

            {/* Social */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-2">
                Follow Us
              </p>

              <div className="flex gap-3">
                {["f", "X", "I", "Y", "L"].map((icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#10446C] text-white text-sm"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

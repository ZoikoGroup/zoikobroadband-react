"use client";
import React from "react";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Shared input styling so every field looks consistent.
// NOTE: the visible-border bug was here originally — the `border` class
// itself was missing, so only the border *color* was set (which does nothing
// without `border`). We add `border` + focus ring here once.
const baseField =
  "mt-1 w-full rounded-md p-2.5 text-sm bg-white dark:bg-gray-700 " +
  "text-gray-900 dark:text-white placeholder-gray-400 border transition " +
  "focus:outline-none focus:ring-2 focus:ring-[#F6C140]/50 focus:border-[#F6C140]";

const fieldBorder = (hasError: boolean) =>
  hasError ? "border-red-500" : "border-gray-300 dark:border-gray-600";

export default function ContactForm() {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [agreed_to_policy, setAgreedToPolicy] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreed_to_policy: "",
  });

  // Stricter, standards-aligned email check.
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  // UK / India numbers. Digits are already capped at 15 on input (E.164 max).
  const phoneRegex = /^(\+44|0)[0-9]{9,13}$|^(\+91)?[6-9]\d{9}$/;

  const nameRegex = /^[A-Za-z\s]+$/;

  // Sanitise phone input live: digits + a single leading "+", capped at 15 digits.
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d+]/g, "");
    const hasPlus = val.startsWith("+");
    let digits = val.replace(/\D/g, "");
    if (digits.length > 15) digits = digits.slice(0, 15); // E.164: max 15 digits
    val = hasPlus ? `+${digits}` : digits;

    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      agreed_to_policy: "",
    };

    if (!first_name.trim()) newErrors.first_name = "First name is required.";
    else if (!nameRegex.test(first_name))
      newErrors.first_name = "Only letters are allowed.";

    if (!last_name.trim()) newErrors.last_name = "Last name is required.";
    else if (!nameRegex.test(last_name))
      newErrors.last_name = "Only letters are allowed.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email address.";

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?\d+$/.test(phone)) {
      newErrors.phone =
        "Phone number can only contain digits and an optional leading +.";
    } else if (phoneDigits.length > 15) {
      newErrors.phone = "Phone number cannot exceed 15 digits.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!subject) newErrors.subject = "Please select a subject.";

    if (!message.trim()) newErrors.message = "Message is required.";
    else if (message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters.";

    if (!agreed_to_policy)
      newErrors.agreed_to_policy = "Please accept the Privacy Policy.";

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      first_name,
      last_name,
      email,
      phone,
      subject,
      message,
      agreed_to_policy,
    };

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact/contact-us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-[#f3f5f7] dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT FORM */}
          <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f2d3d] dark:text-white">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fill out the form below and we&rsquo;ll get back to you as soon as
              possible.
            </p>

            {/* FORM */}
            <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={first_name}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.first_name)
                        setErrors((prev) => ({ ...prev, first_name: "" }));
                    }}
                    className={`${baseField} ${fieldBorder(!!errors.first_name)}`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={last_name}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.last_name)
                        setErrors((prev) => ({ ...prev, last_name: "" }));
                    }}
                    className={`${baseField} ${fieldBorder(!!errors.last_name)}`}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={`${baseField} ${fieldBorder(!!errors.email)}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  maxLength={16}
                  placeholder="07123 456789"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`${baseField} ${fieldBorder(!!errors.phone)}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject)
                      setErrors((prev) => ({ ...prev, subject: "" }));
                  }}
                  className={`${baseField} ${fieldBorder(!!errors.subject)}`}
                >
                  <option value="">Select a subject</option>
                  <option value="Home Broadband">Home Broadband</option>
                  <option value="Business Plans">Business Plans</option>
                  <option value="Speed Issue">Speed Issue</option>
                  <option value="Postcode">Postcode</option>
                  <option value="Internet Issue">Internet Issue</option>
                  <option value="Billing">Billing</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your enquiry..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  className={`${baseField} resize-y ${fieldBorder(!!errors.message)}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Checkbox */}
              <div>
                <div className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#F6C140]"
                    checked={agreed_to_policy}
                    onChange={(e) => {
                      setAgreedToPolicy(e.target.checked);
                      if (errors.agreed_to_policy)
                        setErrors((prev) => ({
                          ...prev,
                          agreed_to_policy: "",
                        }));
                    }}
                  />
                  <p className="text-gray-600 dark:text-gray-400">
                    I agree to the processing of my personal data in accordance
                    with the{" "}
                    <span className="text-[#10446C] dark:text-[#F6C140] font-medium cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>
                {errors.agreed_to_policy && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.agreed_to_policy}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#F6C140] text-[#10446C] font-semibold py-3 rounded-md hover:bg-[#eab530] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send Message"}
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
                <a href="tel:+442071646399">+44 (0)207 164 6399</a>
              </p>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mt-1">
                Available 24/7 Instant Support
              </p>
            </div>

            {/* Social */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-2">
                Follow Us
              </p>

              <div className="flex gap-3">
                {[
                  {
                    icon: <FaFacebookF />,
                    href: "https://www.facebook.com/ZoikoBroadband/",
                  },
                  { icon: <FaTwitter />, href: "https://x.com/zoikobroadband" },
                  {
                    icon: <FaInstagram />,
                    href: "https://www.instagram.com/zoikobroadband/",
                  },
                  {
                    icon: <FaPinterest />,
                    href: "https://www.pinterest.com/zoikobroadband/",
                  },
                  {
                    icon: <FaYoutube />,
                    href: "https://www.youtube.com/@ZoikoBroadband",
                  },
                  {
                    icon: <FaLinkedinIn />,
                    href: "https://www.linkedin.com/company/zoiko-broadband/",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#10446C] text-white text-sm md:text-base hover:bg-[#F6C140] hover:text-[#10446C] transition"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
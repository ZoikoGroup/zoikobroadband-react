"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";

type Bundle = {
  label: string;
  price: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  bundle: Bundle | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function BundleRequestModal({ open, onClose, bundle }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async () => {
    setLoading(true);
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required");
      setLoading(false);
      return;
    }

  try {
    const res = await fetch(`${API_URL}/api/bundle-request/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        bundle_name: bundle?.label,
        bundle_price: bundle?.price,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      toast.error("Failed to submit");
      setLoading(false);
      return;
    }

    toast.success("Request submitted successfully!");

    // reset form
    setForm({
      name: "",
      phone: "",
      email: "",
    });
    setLoading(false);

    onClose();
  } catch (error) {
    console.error(error);
    toast.error("Server error");
    setLoading(false);
  }
};

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className=" dark:bg-black/50 dark:text-white fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative dark:bg-gray-800 dark:text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close referral modal"
            className="bg-[#10446C] px-2 py-1 rounded-lg dark:bg-gray-900 dark:text-white absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            ✕
          </button>

          {/* Header */}
          <header className="text-left mb-6">
            <h2 id="referral-modal-title" className="text-2xl font-bold">
              Get Started
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Selected Plan:{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {bundle?.label}
              </span>{" "}
              -{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {bundle?.price}
              </span>
            </p>
          </header>

          {/* form Section */}
          <section className="mb-6">
            <div className=" dark:bg-gray-800 dark:text-white flex flex-col items-center overflow-hidden">
              <label
                htmlFor="email"
                className=" py-2 text-sm md:text-base font-bold text-left w-full"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name..."
                onChange={handleChange}
                name="name"
                className="flex-1 px-4 py-2 md:py-3 outline-none text-sm border border-gray-300 dark:border-gray-700 rounded-xl w-full mb-3"
              />
              <label
                htmlFor="phone"
                className=" py-2 text-sm md:text-base font-bold text-left w-full"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Your phone number..."
                onChange={handleChange}
                name="phone"
                className="flex-1 px-4 py-2 md:py-3 outline-none text-sm border border-gray-300 dark:border-gray-700 rounded-xl w-full mb-3"
              />
              <label
                htmlFor="email"
                className=" py-2 text-sm md:text-base font-bold text-left w-full"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email addresses..."
                onChange={handleChange}
                name="email"
                className="flex-1 px-4 py-2 md:py-3 outline-none text-sm border border-gray-300 dark:border-gray-700 rounded-xl w-full mb-3"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#10446C] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#0d3a5a] transition"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </section>
        </div>
      </div>
    </Modal>
  );
}

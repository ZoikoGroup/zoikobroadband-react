"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function GetCustomQuote() {
  const [business_name, setBusinessName] = useState("");
  const [contact_name, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [business_postcode, setBusinessPostcode] = useState("");
  const [business_size, setBusinessSize] = useState("");
  const [additional_requirements, setAdditionalRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    business_postcode: "",
    business_size: "",
  });

  const validateForm = () => {
    const newErrors = {
      business_name: "",
      contact_name: "",
      email: "",
      phone_number: "",
      business_postcode: "",
      business_size: "",
    };

    let isValid = true;

    const nameRegex = /^[A-Za-z\s'-]+$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^\+?[1-9]\d{9,14}$/;

    const postcodeRegex =
      /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;

    // Business Name
    if (!business_name.trim()) {
      newErrors.business_name = "Business name is required";
      isValid = false;
    }

    // Contact Name
    if (!contact_name.trim()) {
      newErrors.contact_name = "Contact name is required";
      isValid = false;
    } else if (!nameRegex.test(contact_name)) {
      newErrors.contact_name = "Enter a valid name";
      isValid = false;
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Phone
    const digitCount = phone_number.trim().replace(/^\+/, '').length;

    if (!phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (digitCount < 10) {
      newErrors.phone_number = "Phone number must be at least 10 digits";
      isValid = false;
    } else if (digitCount > 15) {
      newErrors.phone_number = "Phone number must be 15 digits or less";
      isValid = false;
    } else if (!phoneRegex.test(phone_number)) {
      newErrors.phone_number = "Enter a valid UK phone number";
      isValid = false;
    }
    

    // Postcode
    if (!business_postcode.trim()) {
      newErrors.business_postcode = "Postcode is required";
      isValid = false;
    } else if (!postcodeRegex.test(business_postcode)) {
      newErrors.business_postcode = "Enter a valid UK postcode";
      isValid = false;
    }

    // Business Size
    if (!business_size) {
      newErrors.business_size = "Please select a business size";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    const payload = {
      business_name,
      contact_name,
      email,
      phone_number,
      business_postcode,
      business_size,
      additional_requirements,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/business-broadband/business-inquiry/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Your inquiry has been submitted successfully!");
        // Clear form fields after successful submission
        setBusinessName("");
        setContactName("");
        setEmail("");
        setPhoneNumber("");
        setBusinessPostcode("");
        setBusinessSize("");
        setAdditionalRequirements("");
      } else {
        toast.error("Failed to submit your inquiry. Please try again.");
      }

    } catch (error) {
      toast.error("An error occurred while submitting your inquiry. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section
      aria-labelledby="business-quote-heading"
      className="relative w-full bg-[url('/Images/BusinessBroadband/bg-image.png')] bg-cover bg-center py-20 dark:bg-gray-900 dark:text-white"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#10446C]/75 dark:bg-gray-900 dark:text-white" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-10 text-center">
        {/* Heading */}
        <h2
          id="business-quote-heading"
          className="text-2xl md:text-3xl font-semibold text-white"
        >
          Ready to Upgrade Your Business Connectivity?
        </h2>

        <p className="text-blue-100 mt-3 max-w-2xl mx-auto">
          Get a custom quote tailored to your specific business needs. Our team
          will work with you to find the perfect solution.
        </p>

        {/* Form Card */}
        <div className="mt-10 bg-white dark:bg-gray-800  rounded-xl shadow-xl max-w-xl mx-auto p-8 text-left">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Business Name */}
            <div>
              <label
                htmlFor="business-name"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Business Name
              </label>
              <input
                id="business-name"
                name="business_name"
                type="text"
                placeholder="Your Business Name"
                required
                value={business_name}
                onChange={(e) => {
                  setBusinessName(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    business_name: "",
                  }));
                }}
                className={'w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C] ${errors.business_name ? "border-red-500" : "border-gray-300 dark:border-gray-700"}'}
              />
              {errors.business_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.business_name}
                </p>
              )}
            </div>

            {/* Contact Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Contact Name
              </label>
              <input
                id="contact-name"
                name="contact_name"
                type="text"
                placeholder="Your Name"
                required
                value={contact_name}
                onChange={(e) => {
                  setContactName(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    contact_name: "",
                  }));
                }}
                className={'w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C] ${errors.contact_name ? "border-red-500" : "border-gray-300 dark:border-gray-700"}'}
              />
              {errors.contact_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contact_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email Address"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
                className={'w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C] ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"}'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                required
                value={phone_number}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    phone_number: "",
                  }));
                }}
                className={'w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C] ${errors.phone_number ? "border-red-500" : "border-gray-300 dark:border-gray-700"}'}
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone_number}
                </p>
              )}
            </div>

            {/* Postcode */}
            <div>
              <label
                htmlFor="postcode"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Business Postcode
              </label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                placeholder="Business Postcode"
                required
                value={business_postcode}
                onChange={(e) => {
                  setBusinessPostcode(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    business_postcode: "",
                  }));
                }}
                className={'w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C] ${errors.business_postcode ? "border-red-500" : "border-gray-300 dark:border-gray-700"}'}
              />
              {errors.business_postcode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.business_postcode}
                </p>
              )}
            </div>

            {/* Business Size */}
            <div>
              <label
                htmlFor="business-size"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Business Size
              </label>

              <select
                id="business-size"
                name="business_size"
                required
                value={business_size}
                onChange={(e) => {
                  setBusinessSize(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    business_size: "",
                  }));
                }}
                className={'w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C] ${errors.business_size ? "border-red-500" : "border-gray-300 dark:border-gray-700"}'}
              >
                <option value="">Select Size</option>
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="50+ employees">50+ employees</option>
              </select>
              {errors.business_size && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.business_size}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <label
                htmlFor="requirements"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Additional Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                value={additional_requirements}
                onChange={(e) => {
                  setAdditionalRequirements(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    additional_requirements: "",
                  }));
                }}
                placeholder="Tell us about your connectivity needs..."
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-center mt-3">
              <button
                type="submit"
                className="bg-[#10446C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0d3555] transition"
              >
                {isSubmitting ? "Submitting..." : "Get My Custom Quote"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
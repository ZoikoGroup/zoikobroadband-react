"use client"
type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  statement: string;
  consent: boolean;
  file: File | null;
  role?: string;
  experience?: number;
  skills?: string;
};
type ErrorType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: string;
  location?: string;
  file?: string;
  consent?: string;
};
import React, { useState } from "react";

export default function CareerForm() {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    location: "",
    statement: "",
    consent: false,
    file: null,
  });

  const [errors, setErrors] = useState<ErrorType>({});

  // Reusable styles
  const inputClass =
    "mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400";

  const labelClass =
    "text-sm font-medium text-gray-700 dark:text-gray-300";

  // Handle change
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type, checked, files } = e.target as HTMLInputElement;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : type === "file"
        ? files?.[0] || null
        : type === "number"
        ? Number(value)
        : value,
  }));
};

  // Basic validation
 const validate = () => {
  let newErrors: ErrorType = {};

  if (!formData.firstName) newErrors.firstName = "Required";
  if (!formData.lastName) newErrors.lastName = "Required";

  if (!formData.email) {
    newErrors.email = "Required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email";
  }

  if (!formData.phone) newErrors.phone = "Required";
  if (!formData.position) newErrors.position = "Required";
  if (!formData.location) newErrors.location = "Required";
  if (!formData.file) newErrors.file = "CV required";
  if (!formData.consent) newErrors.consent = "Required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // Submit
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <section className="w-full py-10 md:py-14 px-4 dark:bg-gray-800 ">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 md:p-8">

        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Join the Zoiko Team
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
          Complete your application below to build the future with us.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">

          {/* 1. Personal Details */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              1. Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input name="firstName" onChange={handleChange} className={inputClass} />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div>
                <label className={labelClass}>Last Name *</label>
                <input name="lastName" onChange={handleChange} className={inputClass} />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelClass}>Email *</label>
                <input name="email" type="email" onChange={handleChange} className={inputClass} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>Phone *</label>
                <input name="phone" onChange={handleChange} className={inputClass} />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 2. Position */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              2. Position & Availability
            </h3>

            <div className="mt-4">
              <label className={labelClass}>Position *</label>
              <select name="position" onChange={handleChange} className={inputClass}>
                <option value="">Select role</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>DevOps Engineer</option>
              </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            <div className="mt-4">
              <label className={labelClass}>Location *</label>
              <select name="location" onChange={handleChange} className={inputClass}>
                <option value="">Select location</option>
                <option>London</option>
                <option>Birmingham</option>
                <option>Manchester</option>
                <option>Remote</option>
              </select>
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
          </div>

          {/* 3. Documents */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              3. Documents & Statement
            </h3>

            <div className="mt-4">
              <label className={labelClass}>Upload CV *</label>
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className={inputClass}
              />
              {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Max 5MB (PDF, DOC, DOCX)
              </p>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Supporting Statement</label>
              <textarea
                name="statement"
                rows={5}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <input type="checkbox" name="consent" onChange={handleChange} />
            <p className="text-sm text-gray-700 dark:text-gray-400">
              I confirm that the information is accurate and agree to the privacy policy.
            </p>
          </div>
          {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-fit bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
          >
            Submit Form
          </button>
        </form>
      </div>
    </section>
  );
}
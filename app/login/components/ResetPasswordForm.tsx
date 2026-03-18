import React from "react";

export default function ResetPasswordForm() {
  return (
    <section className="w-full" id="reset-password">
      {/* Header */}
      <header className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          Reset Password
        </h3>

        <p className="text-gray-600 mt-2">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </header>

      {/* Form */}
      <form className="flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C] focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#10446C] text-white py-3 rounded-lg font-semibold hover:bg-[#0d3555] transition"
        >
          Send Reset Link
        </button>
      </form>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-600 mt-6">
        <a href="/login" className="text-[#10446C] hover:underline">
          Back to Login
        </a>
      </footer>
    </section>
  );
}

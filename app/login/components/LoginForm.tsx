import Image from "next/image";
import React from "react";

type Tab = "login" | "register" | "reset-password";
type Props = {
  setActiveTab: (tab: Tab) => void;
};

export default function LoginForm({ setActiveTab }: Props)  {
  return (
    <section className="w-full">
      <header className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome back!
        </h3>

        <p className="text-gray-600 mt-2">
          Enter your credentials to access your account.
        </p>
      </header>

      <form className="flex flex-col gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Username or Email Address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C] focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C] focus:outline-none"
          />
        </div>

        {/* Remember + Google */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center gap-1 border border-gray-300 rounded-lg text-sm py-2 hover:bg-gray-50"
          >
            <Image
              src="/google-logo.png"
              alt="Google login"
              height={40}
              width={40}
              className="w-12 h-12 object-contain"
            />
            Login with Google
          </button>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" />
            Remember for 30 days
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#10446C] text-white py-3 rounded-lg font-semibold hover:bg-[#0d3555] transition"
        >
          Log In
        </button>
      </form>

      {/* Footer Links */}
      <footer className="text-sm text-center text-gray-600 mt-6">
        <p className="text-base text-center text-gray-600 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("reset-password")}
            className="text-[#10446C] hover:underline"
          >
            Forgot Password?
          </button>

          <span className="mx-1">|</span>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className="text-[#10446C] hover:underline"
          >
            Create Account
          </button>
        </p>
      </footer>
    </section>
  );
}

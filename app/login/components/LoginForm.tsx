import Image from "next/image";
import React from "react";

type Tab = "login" | "register" | "reset-password";
type Props = {
  setActiveTab: (tab: Tab) => void;
};

export default function LoginForm({ setActiveTab }: Props) {
  return (
    <section className="w-full dark:bg-gray-950 dark:text-white">
      
      {/* HEADER */}
      <header className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome back!
        </h3>

        <p className="text-gray-600 mt-2 dark:text-gray-300">
          Enter your credentials to access your account.
        </p>
      </header>

      {/* FORM */}
      <form className="flex flex-col gap-5">
        
        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username or Email Address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* GOOGLE + REMEMBER */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-sm py-2
                       hover:bg-gray-50 transition
                       dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <Image
              src="/google-logo.png"
              alt="Google login"
              height={40}
              width={40}
              className="w-10 h-10 object-contain"
            />
            Login with Google
          </button>

          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              className="accent-[#10446C] dark:accent-blue-500"
            />
            Remember for 30 days
          </label>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#10446C] text-white py-3 rounded-lg font-semibold
                     hover:bg-[#0d3555] transition
                     dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Log In
        </button>
      </form>

      {/* FOOTER */}
      <footer className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
        <p className="mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("reset-password")}
            className="text-[#10446C] dark:text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>

          <span className="mx-1">|</span>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className="text-[#10446C] dark:text-blue-400 hover:underline"
          >
            Create Account
          </button>
        </p>
      </footer>

    </section>
  );
}
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Origin": window.location.origin, // Send the frontend origin for CORS validation
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password2: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend Error:", data);
        alert(JSON.stringify(data));
        return;
      }

      alert("Registered successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // ONLY redirect on success
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <section className="w-full dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <header className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Create Account
        </h3>

        <p className="text-gray-600 mt-2 dark:text-gray-300">
          Fill in your details to get started.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col gap-5"
      >
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username *
          </label>

          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Choose a username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email *
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password *
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password *
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#10446C] text-white py-3 rounded-lg font-semibold
                     hover:bg-[#0d3555] transition
                     dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
        Already have an account?
        <a
          href="/login"
          className="text-[#10446C] dark:text-blue-400 ml-1 hover:underline"
        >
          Sign In
        </a>
      </footer>
    </section>
  );
}

"use client";
import React, { useState }  from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authHeading, authInput, authLabel, authLink, authPrimaryBtn, authSubheading } from "./authStyles";

const API_URL =  process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ResetPasswordForm({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
  try {
    const res = await fetch(`${API_URL}/api/accounts/forgot-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Origin": window.location.origin,
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }

  } catch (err) {
    toast.error("Something went wrong");
  }
};

  return (
    <section className="w-full" id="reset-password">
      {/* Header */}
      <header className="mb-4 [@media(max-height:760px)]:mb-3">
        <h2 className={authHeading}>Reset password</h2>
        <p className={authSubheading}>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleForgotPassword();
        }}
        className="flex flex-col gap-3.5 [@media(max-height:760px)]:gap-2.5"
      >
        <div>
          <label htmlFor="email" className={authLabel}>
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            required
            className={authInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button type="submit" className={authPrimaryBtn}>
          Send Reset Link
        </button>
      </form>

      {/* Footer */}
      <p className="mt-5 text-center text-[13px] text-slate-600 dark:text-slate-400">
        Remembered it?{" "}
        <button type="button" onClick={() => setActiveTab("login")} className={authLink}>
          Back to Login
        </button>
      </p>
    </section>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import AuthShell from "@/app/login/components/AuthShell";
import { authEyeBtn, authHeading, authInput, authLabel, authLink, authPrimaryBtn, authSubheading } from "@/app/login/components/authStyles";

const API_URL =  process.env.NEXT_PUBLIC_API_BASE_URL;
export default function ResetPassword() {
    const router = useRouter();
    const params = useParams();

  const uid = Array.isArray(params?.uid) ? params.uid[0] : params?.uid;
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async () => {
    if (!uid || !token) {
      alert("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/accounts/reset-password/${uid}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password , password2: confirmPassword }),
        }
      );

      const data = await res.json();
      console.log("Api response:", data);

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      alert("Password reset successful!");
      router.push("/login");

    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="shrink-0 border-b border-slate-200 px-6 py-3.5 text-center text-[13px] font-semibold text-[#0B1F45] dark:border-slate-800 dark:text-white">
        Reset Password
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 [@media(max-height:760px)]:py-3.5 sm:px-7">
        <header className="mb-4">
          <h2 className={authHeading}>Choose a new password</h2>
          <p className={authSubheading}>Enter your new password below.</p>
        </header>

        <div className="flex flex-col gap-3.5">
          {/* Password */}
          <div>
            <label htmlFor="new-password" className={authLabel}>
              New password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="New Password"
                className={`${authInput} pr-11`}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={authEyeBtn}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-new-password" className={authLabel}>
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm-new-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm Password"
                className={`${authInput} pr-11`}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className={authEyeBtn}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button onClick={handleReset} disabled={loading} className={authPrimaryBtn}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>

        <p className="mt-5 text-center text-[13px] text-slate-600 dark:text-slate-400">
          <Link href="/login" className={authLink}>
            Back to Login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

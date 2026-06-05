"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your new password below.
        </p>

        {/* Password */}
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full mb-4 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 bottom-3 pr-3 flex items-center"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      

        {/* Confirm Password */}
        <div className="relative mt-1">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full mb-4 px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-[#10446C] focus:outline-none
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-2 bottom-3 pr-3 flex items-center"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
    

        {/* Button */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#10446C] text-white py-3 rounded-lg font-semibold
                     hover:bg-[#0d3555] transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}
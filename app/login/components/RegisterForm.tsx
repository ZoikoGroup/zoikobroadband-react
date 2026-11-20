"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SocialButtons from "./SocialButtons";
import { authEyeBtn, authHeading, authInput, authLabel, authLink, authPrimaryBtn, authSubheading } from "./authStyles";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/accounts/register/`, {
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

      // if (!res.ok) {
      // console.error("Backend Error:", data);
      // toast.error(JSON.stringify(data));
      // return;
      // }
      if (!res.ok) {
        console.error("Backend Error:", data);

        let errorMessage = "Something went wrong";

        if (typeof data === "object") {
          const firstKey = Object.keys(data)[0];

          if (Array.isArray(data[firstKey])) {
            errorMessage = data[firstKey][0];
          } else {
            errorMessage = data[firstKey];
          }
        }

        toast.error(errorMessage);
        return;
      }

      toast.success("Registered successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowVerificationMessage(true);

      // ONLY redirect on success
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      {/* Header */}
      <header className="mb-4 [@media(max-height:760px)]:mb-2">
        <h2 className={authHeading}>Create account</h2>
        <p className={authSubheading}>Fill in your details to get started.</p>
      </header>

      {showVerificationMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <h4 className="text-sm font-semibold text-green-700">Verify Your Email</h4>
          <p className="mt-1 text-xs text-green-600">
            A verification link has been sent to your email address.
            If you don&apos;t see the email, check your Spam or Junk folder.
          </p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col gap-3 [@media(max-height:760px)]:gap-2"
      >
        {/* Username */}
        <div>
          <label htmlFor="username" className={authLabel}>
            Username <span className="text-red-500">*</span>
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
            className={authInput}
          />
        </div>

        {/* Email */}
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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Password */}
          <div>
            <label htmlFor="password" className={authLabel}>
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${authInput} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={authEyeBtn}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={authLabel}>
              Confirm password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${authInput} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className={authEyeBtn}
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className={`${authPrimaryBtn} mt-1`}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Social signup */}
      <div className="mt-4 [@media(max-height:760px)]:mt-2.5">
        <SocialButtons redirectTo="/dashboard" />
      </div>

      {/* Footer */}
      <p className="mt-4 [@media(max-height:760px)]:mt-2 text-center text-[13px] text-slate-600 ">
        Already have an account?{" "}
        <a href="/login" className={authLink}>
          Sign In
        </a>
      </p>
    </section>
  );
}

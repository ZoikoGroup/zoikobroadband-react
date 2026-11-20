import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SocialButtons from "./SocialButtons";
import { authEyeBtn, authHeading, authInput, authLabel, authLink, authPrimaryBtn, authSubheading } from "./authStyles";


type Tab = "login" | "register" | "reset-password";
type Props = {
  setActiveTab: (tab: Tab) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginForm({ setActiveTab }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/accounts/login/`, {
        method: "POST",
        headers: {
 "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid credentials");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

       // THIS IS THE FIX
  window.dispatchEvent(new Event("authChanged"));

      toast.success("Logged in successfully!");
      // Redirect
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      {/* HEADER */}
      <header className="mb-4 [@media(max-height:760px)]:mb-2">
        <h2 className={authHeading}>Welcome back!</h2>
        <p className={authSubheading}>Sign in to your Zoiko Broadband account.</p>
      </header>

      {/* FORM */}
      <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-3.5 [@media(max-height:760px)]:gap-2">
        {/* EMAIL */}
        <div>
          <label htmlFor="email" className={authLabel}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="new-email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={authInput}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label htmlFor="password" className={authLabel}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${authInput} pr-11`}
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

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between gap-3 text-[12px]">
          <label className="flex items-center gap-2 text-[#0B1F45]">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#1257B8]" />
            Remember me for 30 days
          </label>
          <button type="button" onClick={() => setActiveTab("reset-password")} className="font-medium text-[#2A7F8F] hover:underline">
            Forgot password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button type="submit" disabled={loading} className={authPrimaryBtn}>
          {loading ? "Logging in..." : "Log In Securely"}
        </button>
      </form>

      {/* Social login */}
      <div className="mt-4 [@media(max-height:760px)]:mt-2.5">
        <SocialButtons redirectTo="/dashboard" />
      </div>

      {/* FOOTER */}
      <p className="mt-4 [@media(max-height:760px)]:mt-2 text-center text-[13px] text-slate-600 ">
        New to Zoiko?{" "}
        <button type="button" onClick={() => setActiveTab("register")} className={authLink}>
          Register
        </button>
      </p>
    </section>
  );
}

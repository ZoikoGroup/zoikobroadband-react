"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import {
  getGoogleAccessToken,
  getFacebookAccessToken,
  exchangeSocialToken,
  persistAuth,
  type SocialProvider,
} from "../lib/socialAuth";

type Props = {
  /** Where to send the user after a successful social login. */
  redirectTo?: string;
};

export default function SocialButtons({ redirectTo = "/dashboard" }: Props) {
  const [pending, setPending] = useState<SocialProvider | null>(null);
  const router = useRouter();

  const handleSocial = async (provider: SocialProvider) => {
    if (pending) return;
    setPending(provider);
    try {
      const accessToken =
        provider === "google"
          ? await getGoogleAccessToken()
          : await getFacebookAccessToken();

      const data = await exchangeSocialToken(provider, accessToken);
      persistAuth(data);

      toast.success("Logged in successfully!");
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Social login failed");
    } finally {
      setPending(null);
    }
  };

  const baseBtn =
    "group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 [@media(max-height:760px)]:py-2 text-[13px] font-semibold text-[#0B1F45] " +
    "transition hover:border-[#10446C]/40 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 " +
    "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";

  return (
    <div className="flex flex-col gap-2.5 [@media(max-height:760px)]:gap-2">
      {/* or continue with */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
        <span className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
          or continue with
        </span>
        <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={pending !== null}
        className={baseBtn}
      >
        <FcGoogle size={20} aria-hidden />
        <span className="flex-1 text-left">
          {pending === "google" ? "Connecting..." : "Continue with Google"}
        </span>
        <FiChevronRight aria-hidden className="text-slate-400 transition group-hover:translate-x-0.5" />
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={() => handleSocial("facebook")}
        disabled={pending !== null}
        className={baseBtn}
      >
        <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-white">
          <FaFacebookF size={11} />
        </span>
        <span className="flex-1 text-left">
          {pending === "facebook" ? "Connecting..." : "Continue with Facebook"}
        </span>
        <FiChevronRight aria-hidden className="text-slate-400 transition group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

export { SocialButtons };
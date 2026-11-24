"use client";

/**
 * C01 launcher, loaded eagerly. The full Linko panel (ChatWidget) is fetched
 * only after user intent — hover/focus prefetches it, a click opens it
 * (Doc07 §09.1 "Async-load UI after user intent"). A visitor who already has
 * a chat open in this tab gets the panel straight away so it can be restored.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/app/lib/chatbot/linko";

const ENABLED = process.env.NEXT_PUBLIC_LINKO_ENABLED !== "false";
const loadWidget = () => import("./ChatWidget");
const ChatWidget = dynamic(loadWidget, { ssr: false });

export default function LinkoLoader() {
  const [mode, setMode] = useState<"idle" | "restore" | "open">("idle");
  const pathname = usePathname() || "/";

  // An open conversation in this tab → load the panel (closed) so the launcher keeps its state.
  useEffect(() => {
    // Checked after hydration (the server can't see sessionStorage), in a callback so it doesn't cascade renders.
    const id = setTimeout(() => {
      try {
        if (sessionStorage.getItem("linko-chat-v1")) setMode((m) => (m === "idle" ? "restore" : m));
      } catch {
        // storage unavailable
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // The customer assistant isn't shown inside the staff console.
  if (!ENABLED || pathname.startsWith("/staff")) return null;
  if (mode !== "idle") return <ChatWidget startOpen={mode === "open"} />;

  return (
    <button
      type="button"
      onPointerEnter={() => void loadWidget()}
      onFocus={() => void loadWidget()}
      onClick={() => {
        track("linko_open", {
          device_class: window.innerWidth < 768 ? "mobile" : "desktop",
          current_page_type: window.location.pathname.split("/")[1] || "home",
        });
        setMode("open");
      }}
      aria-label="Ask Linko – Zoiko Broadband AI assistant"
      title="Ask Linko"
      aria-expanded={false}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#15213D] text-white shadow-[0_8px_24px_rgba(21,33,61,0.3)] transition hover:bg-[#1B3A63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A45]"
    >
      <span
        aria-hidden
        style={{ width: 54, height: 54, fontSize: 27 }}
        className="inline-flex shrink-0 select-none items-center justify-center rounded-full bg-[#C49A45] font-bold leading-none text-[#15213D]"
      >
        O
      </span>
    </button>
  );
}

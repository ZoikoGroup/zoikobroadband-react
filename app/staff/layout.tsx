import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Linko staff console",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-[60vh] bg-white">{children}</div>;
}

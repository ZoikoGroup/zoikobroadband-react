import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./Components/Footer/Footer"), {
  ssr: true,
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zoiko Broadband",
  description: "High-speed fibre broadband across the UK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 pt-20 md:pt-24 lg:pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

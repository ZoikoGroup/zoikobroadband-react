import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
// @ts-ignore
import "./globals.css";
import Header from "./Components/Header/Header";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import LinkoLoader from "./Components/Chatbot/LinkoLoader";

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
    // next-themes sets class/color-scheme on <html> before hydration, so its attributes
    // legitimately differ from the server HTML (one level only – children are still checked).
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Header />
          <ThemeProvider attribute="class">
          <main className="flex-1 pt-20">
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </main>
          </ThemeProvider>
        </CartProvider>
        <Footer />
        <LinkoLoader />
      </body>
    </html>
  );
}

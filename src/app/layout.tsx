import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira } from "next/font/google";

import "./globals.css";
import Navbar from "./components/Navbar";
import AppWalletProvider from "@/lib/wallet/WalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuzu",
  description:
    "An open marketplace and launchpad for AI Gaming Models & Agents",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saira.variable} antialiased relative`}
      >
        <AppWalletProvider>
          <img
            src="/bg-mobile.png"
            className="absolute inset-0 w-screen h-full object-cover -z-10 md:hidden"
          />
          <img
            src="/gradient.webp"
            className="absolute left-0 -z-10 hidden md:block w-screen h-full object-fill"
          />
          <Navbar />
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Itim } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const itim = Itim({ weight: ["400"], preload: false });

export const metadata: Metadata = {
  title: "Beyond",
  description: "Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar />
      <body className={itim.className}>{children}</body>
    </html>
  );
}

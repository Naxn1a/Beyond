import type { Metadata } from "next";
import { Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const Noto_Sans = Noto_Sans_Thai_Looped({ weight: ["400"], preload: false });

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
      <body className={Noto_Sans.className}>{children}</body>
    </html>
  );
}

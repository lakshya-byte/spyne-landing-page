import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spyne | AI Car Photography",
  description: "Turn Car Photos into Studio-Quality Listings powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${publicSans.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}

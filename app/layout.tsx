import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import type React from "react";
import "./globals.css";

const oxanium = Oxanium({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "CODEFUSE 2.0 - Unleash the Power of Code",
  description:
    "Join CODEFUSE 2.0, the ultimate hackathon experience. Unleash the power of code and compete with the best developers.",
  keywords: "hackathon, coding, programming, competition, CODEFUSE",
  authors: [{ name: "CODEFUSE Team" }],
  openGraph: {
    title: "CODEFUSE 2.0 - Unleash the Power of Code",
    description: "Join CODEFUSE 2.0, the ultimate hackathon experience.",
    type: "website",
  },
  generator: "v0.dev",
  icons: {
    icon: "/logo.png", // ✅ this line tells Next.js to use your custom icon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta
          name="google-site-verification"
          content="kerT7R9DCV0ireoAGXcJxjvTEJht64pLw3dnT4meEfk"
        />
      </head>
      <body className={oxanium.className}>{children}</body>
    </html>
  );
}

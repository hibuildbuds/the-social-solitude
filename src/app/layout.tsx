import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MobileBar } from "@/components/MobileBar";
import { PageFade } from "@/components/PageFade";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Social Solitude — Modern Bistro, Locally Sourced Flavors",
  description:
    "Balinese-owned Restaurant and Bar in Seminyak's Creative Hub. Open Wednesday – Sunday, 6pm – 11pm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <MobileBar />
        <PageFade>{children}</PageFade>
      </body>
    </html>
  );
}

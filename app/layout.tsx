import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import AdSenseScript from "@/components/AdSenseScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — AI Tools Reviews & Comparisons`,
    template: `%s | ${siteName}`,
  },
  description:
    "In-depth AI tool reviews, side-by-side comparisons, and expert guides. Find the best AI tools for writing, coding, image generation, and more.",
  keywords: [
    "AI tools review",
    "best AI tools 2026",
    "ChatGPT review",
    "Claude review",
    "AI tool comparison",
    "AI writing tools",
    "AI image generators",
    "artificial intelligence tools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — AI Tools Reviews & Comparisons`,
    description:
      "In-depth AI tool reviews, side-by-side comparisons, and expert guides. Find the best AI tools for writing, coding, image generation, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — AI Tools Reviews & Comparisons`,
    description:
      "In-depth AI tool reviews, side-by-side comparisons, and expert guides. Find the best AI tools for writing, coding, image generation, and more.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Analytics />
        <AdSenseScript />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

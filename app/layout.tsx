import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import AdSenseScript from "@/components/AdSenseScript";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "IssueByte";

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
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} — AI Tools Reviews & Comparisons`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — AI Tools Reviews & Comparisons`,
    description:
      "In-depth AI tool reviews, side-by-side comparisons, and expert guides. Find the best AI tools for writing, coding, image generation, and more.",
    images: [`${siteUrl}/og-default.png`],
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
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-surface-900 text-ink-100">
        <Analytics />
        <AdSenseScript />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

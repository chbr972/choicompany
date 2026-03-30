import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Text Summarizer — Summarize Any Text Instantly",
  description: "Paste any article, document, or text and get a concise summary instantly. Free, private, runs in your browser — no data sent to servers. No sign-up required.",
  keywords: ["AI text summarizer", "text summarizer free", "online summarizer", "article summarizer", "document summarizer"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

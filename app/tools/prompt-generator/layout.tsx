import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Prompt Generator — ChatGPT & Claude Prompts",
  description: "Generate optimized AI prompts for writing, coding, marketing, productivity, and more. Free, no sign-up required. Works with ChatGPT, Claude, and Gemini.",
  keywords: ["AI prompt generator", "ChatGPT prompts", "Claude prompts", "AI writing prompts", "prompt engineering"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Comparison Table 2025 — Compare 15+ AI Tools",
  description: "Compare the best AI tools side-by-side. Filter by category (writing, coding, image, productivity), sort by rating and price. Find the right AI tool for your workflow.",
  keywords: ["AI tool comparison", "best AI tools", "AI tools 2025", "ChatGPT vs Claude", "AI software comparison"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

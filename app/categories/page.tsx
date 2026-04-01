import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getPostsByCategory } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

export const metadata: Metadata = {
  title: "Browse by Category — Personal Finance, Health, Technology & More",
  description:
    "Explore our guides organized by topic: personal finance, insurance, health & wellness, legal, technology, AI tools, and productivity.",
  alternates: {
    canonical: `${siteUrl}/categories`,
  },
};

const ICONS: Record<string, string> = {
  "personal-finance": "💰",
  insurance: "🛡️",
  "health-wellness": "❤️",
  legal: "⚖️",
  technology: "💻",
  "ai-tools": "🤖",
  productivity: "⚡",
};

export default function CategoriesPage() {
  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: getPostsByCategory(cat.slug).length,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-400">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">/</li>
          <li className="text-ink-300 font-medium">Categories</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-10 pb-8 border-b border-ink-200">
        <p className="section-label mb-2">Browse Topics</p>
        <h1 className="text-4xl font-bold text-ink-50 mb-3 tracking-tight">All Categories</h1>
        <p className="text-lg text-ink-300">
          {categoriesWithCounts.reduce((sum, c) => sum + c.count, 0)} articles across {CATEGORIES.length} topics.
        </p>
      </div>

      {/* Top ad */}
      <div className="flex justify-center mb-10">
        <AdSlot slot="5544332211" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Category grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCounts.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group block bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-400" />
            <div className="p-6">
              <div className="text-3xl mb-3">{ICONS[cat.slug] ?? "📄"}</div>
              <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors mb-1">
                {cat.name}
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">{cat.description}</p>
              <span className="text-xs font-semibold text-brand-600">
                {cat.count} article{cat.count !== 1 ? "s" : ""} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

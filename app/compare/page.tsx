import type { Metadata } from "next";
import Link from "next/link";
import { getSortedComparisonsMeta } from "@/lib/comparisons";
import AdSlot from "@/components/AdSlot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

export const metadata: Metadata = {
  title: "AI Tool Comparisons — Side-by-Side Reviews",
  description:
    "Detailed AI tool comparisons: ChatGPT vs Claude, Midjourney vs DALL-E, and more. Find out which AI tool wins for your specific use case.",
  keywords: [
    "ChatGPT vs Claude",
    "AI tool comparison",
    "best AI tool",
    "Midjourney vs DALL-E",
    "AI assistant comparison 2026",
  ],
  alternates: {
    canonical: `${siteUrl}/compare`,
  },
};

export default function ComparePage() {
  const comparisons = getSortedComparisonsMeta();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/compare`,
    name: "AI Tool Comparisons",
    description: "Side-by-side comparisons of the top AI tools.",
    url: `${siteUrl}/compare`,
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 via-white to-white py-14 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            AI Comparisons
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-tight tracking-tight">
            AI Tool Comparisons
          </h1>
          <p className="text-lg text-ink-500 max-w-xl mx-auto leading-relaxed">
            Side-by-side breakdowns of the top AI tools. Real results, honest assessments,
            clear recommendations.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Ad */}
        <div className="flex justify-center mb-10">
          <AdSlot slot="1122334455" format="leaderboard" className="w-full max-w-[728px]" />
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="group block bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card-lg transition-all duration-200 overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
              <div className="p-6">
                <span className="text-xs font-semibold bg-ink-100 text-ink-600 px-2.5 py-1 rounded-full mb-3 inline-block">
                  {comparison.category}
                </span>

                {/* Tools being compared */}
                <div className="flex items-center gap-3 mb-3">
                  {comparison.tools.map((toolName, i) => (
                    <div key={toolName} className="flex items-center gap-3">
                      {i > 0 && <span className="text-ink-300 font-medium text-sm">vs</span>}
                      <span className="font-bold text-ink-900 text-lg">{toolName}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-base font-semibold text-ink-700 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                  {comparison.title}
                </h2>
                <p className="text-sm text-ink-500 mb-4 line-clamp-2 leading-relaxed">
                  {comparison.description}
                </p>

                <div className="flex items-center justify-between text-xs text-ink-400">
                  <time dateTime={comparison.date}>
                    {new Date(comparison.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                  <span>{comparison.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tools CTA */}
        <div className="mt-14 rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
          <h2 className="text-xl font-bold text-ink-900 mb-2">Want individual reviews?</h2>
          <p className="text-ink-500 mb-5">
            Read our in-depth reviews of each AI tool, including ratings, pricing breakdowns, and real-world testing.
          </p>
          <Link href="/tools" className="btn-primary inline-flex">
            Browse AI Tool Reviews
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getSortedToolsMeta } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

export const metadata: Metadata = {
  title: "AI Tools Reviews — Honest Ratings & Analysis",
  description:
    "In-depth AI tool reviews with honest ratings. We test ChatGPT, Claude, Midjourney, and more so you know exactly what to use and when.",
  keywords: [
    "AI tools review",
    "best AI tools 2026",
    "ChatGPT review",
    "Claude review",
    "AI writing tools",
    "AI image generators",
  ],
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI Writing & Chat": "bg-brand-100 text-brand-700",
  "AI Image Generation": "bg-accent-100 text-accent-700",
  "AI Code Assistant": "bg-emerald-100 text-emerald-700",
  "AI Research": "bg-amber-100 text-amber-700",
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-ink-600 font-semibold text-sm">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function ToolsPage() {
  const tools = getSortedToolsMeta();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/tools`,
    name: "AI Tools Reviews",
    description: "In-depth reviews of the best AI tools available in 2026.",
    url: `${siteUrl}/tools`,
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
            AI Tool Reviews
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-tight tracking-tight">
            Honest AI Tool Reviews
          </h1>
          <p className="text-lg text-ink-500 max-w-xl mx-auto leading-relaxed">
            We test every major AI tool so you don't have to. Unbiased ratings,
            real-world results, and clear recommendations.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Ad */}
        <div className="flex justify-center mb-10">
          <AdSlot slot="1122334455" format="leaderboard" className="w-full max-w-[728px]" />
        </div>

        {/* Tool cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const catColor = CATEGORY_COLORS[tool.category] ?? "bg-ink-100 text-ink-600";
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card-lg transition-all duration-200 overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
                      {tool.category}
                    </span>
                    <span className="text-xs text-ink-400 font-medium shrink-0">{tool.pricingModel}</span>
                  </div>

                  <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors mb-1 leading-snug">
                    {tool.toolName}
                  </h2>
                  <p className="text-sm text-ink-500 mb-4 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <StarRating rating={tool.rating} />
                    <span className="text-xs text-ink-400">{tool.readingTime}</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-ink-100">
                    <span className="text-xs font-semibold text-ink-500">From: </span>
                    <span className="text-xs font-semibold text-brand-600">{tool.startingPrice}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Compare CTA */}
        <div className="mt-14 rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
          <h2 className="text-xl font-bold text-ink-900 mb-2">Not sure which to choose?</h2>
          <p className="text-ink-500 mb-5">
            See our side-by-side comparisons to find the right AI tool for your workflow.
          </p>
          <Link href="/compare" className="btn-primary inline-flex">
            View Comparisons
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

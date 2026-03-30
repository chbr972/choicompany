import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import { getSortedToolsMeta } from "@/lib/tools";
import { getSortedComparisonsMeta } from "@/lib/comparisons";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import NewsletterSignup from "@/components/NewsletterSignup";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

export const metadata: Metadata = {
  title: {
    absolute: `${siteName} — AI Tools Reviews, Comparisons & Guides`,
  },
  description:
    "Honest AI tool reviews, side-by-side comparisons, and practical guides. We test ChatGPT, Claude, Midjourney, and more so you can make the right choice.",
  keywords: [
    "AI tools review",
    "best AI tools 2026",
    "ChatGPT vs Claude",
    "AI writing tools",
    "AI image generators",
    "artificial intelligence tools",
  ],
};

export default function HomePage() {
  const posts = getSortedPostsMeta();
  const featured = posts[0];
  const rest = posts.slice(1);
  const tools = getSortedToolsMeta().slice(0, 3);
  const comparisons = getSortedComparisonsMeta().slice(0, 2);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description:
          "Practical guides on AI tools, productivity systems, web performance, and building a better digital life.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Quality Content
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-ink-900 mb-5 leading-[1.1] tracking-tight">
            Find the Right{" "}
            <span className="text-brand-600">AI Tool</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Honest AI tool reviews, side-by-side comparisons, and practical guides.
            We test every major tool so you can make the right choice.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools" className="btn-primary">
              Browse AI Tools
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/compare" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-brand-600 border border-brand-300 hover:bg-brand-50 transition-all">
              Compare Tools
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Top AI Tool Reviews ────────────────────── */}
        {tools.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-label">AI Tool Reviews</span>
              <div className="flex-1 h-px bg-ink-200" />
              <Link href="/tools" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group block bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all overflow-hidden"
                >
                  <div className="h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
                  <div className="p-5">
                    <span className="text-xs font-semibold text-ink-400 block mb-1">{tool.category}</span>
                    <h2 className="text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors mb-1">
                      {tool.toolName}
                    </h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-amber-500">{tool.rating.toFixed(1)}/5</span>
                      <span className="text-xs text-brand-600 font-semibold">{tool.startingPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Comparisons ──────────────────────────── */}
        {comparisons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-label">Comparisons</span>
              <div className="flex-1 h-px bg-ink-200" />
              <Link href="/compare" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="group flex items-center gap-4 bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all p-5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-ink-700 mb-1">
                      {comparison.tools.join(" vs ")}
                    </div>
                    <p className="text-xs text-ink-400 line-clamp-1">{comparison.description}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brand-400 shrink-0 group-hover:text-brand-600 transition-colors">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Ad ────────────────────────────────────── */}
        <div className="flex justify-center mb-12">
          <AdSlot slot="1122334455" format="leaderboard" className="w-full max-w-[728px]" />
        </div>

        {/* ── Featured Post ─────────────────────────── */}
        {featured && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-label">Featured</span>
              <div className="flex-1 h-px bg-ink-200" />
            </div>

            <div className="group relative bg-white rounded-3xl shadow-card-lg hover:shadow-card-hover transition-all duration-300 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-3 leading-tight tracking-tight">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-ink-500 text-lg mb-6 leading-relaxed max-w-3xl">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-ink-400">
                  <time dateTime={featured.date}>
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-ink-300" />
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                    </svg>
                    {featured.readingTime}
                  </span>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                  >
                    Read article
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Post Grid ─────────────────────────────── */}
        {rest.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-7">
              <span className="section-label">Latest Articles</span>
              <div className="flex-1 h-px bg-ink-200" />
              <Link
                href="/blog"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── Newsletter Signup ─────────────────────── */}
        <section className="mt-16">
          <NewsletterSignup variant="banner" />
        </section>
      </div>
    </>
  );
}

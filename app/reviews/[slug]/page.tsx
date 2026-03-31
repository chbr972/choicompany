import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllToolSlugs, getToolBySlug, getAlternatives, tools } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Review Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  return {
    title: `${tool.name} Review (${new Date().getFullYear()}) — Is It Worth It?`,
    description: `Our full ${tool.name} review covers features, pricing, pros & cons, and real-world performance. Find out if ${tool.name} is worth it for your use case.`,
    keywords: [
      `${tool.name} review`,
      `is ${tool.name} worth it`,
      `${tool.name} pros and cons`,
      `${tool.name} pricing`,
      tool.category,
      "AI tools review",
    ],
    openGraph: {
      type: "article",
      title: `${tool.name} Review — AI Tools Hub`,
      description: tool.description,
      url: `${siteUrl}/reviews/${tool.slug}`,
    },
    alternates: { canonical: `${siteUrl}/reviews/${tool.slug}` },
  };
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-7 h-7" };
  const textMap = { sm: "text-sm", md: "text-base", lg: "text-2xl" };
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`${sizeMap[size]} ${
            i < full ? "text-accent-500" : i === full && half ? "text-accent-300" : "text-ink-200"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      <span className={`font-bold text-ink-700 ml-1 ${textMap[size]}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function RatingBar({ score, label }: { score: number; label: string }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 9 ? "bg-green-500" : score >= 7.5 ? "bg-brand-500" : "bg-accent-500";
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-600 w-36 shrink-0">{label}</span>
      <div className="flex-1 bg-ink-100 rounded-full h-2.5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold text-ink-700 w-8 text-right">{score.toFixed(1)}</span>
    </div>
  );
}

// Verdict helpers
function getVerdict(rating: number): {
  label: string;
  color: string;
  bg: string;
  border: string;
  description: string;
} {
  if (rating >= 4.7)
    return {
      label: "Exceptional",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      description: "A top-tier tool that excels across nearly all criteria. Highly recommended.",
    };
  if (rating >= 4.4)
    return {
      label: "Excellent",
      color: "text-brand-700",
      bg: "bg-brand-50",
      border: "border-brand-200",
      description: "A strong performer with only minor drawbacks. Recommended for most users.",
    };
  if (rating >= 4.0)
    return {
      label: "Very Good",
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      description: "A solid tool with clear strengths. Best suited for specific use cases.",
    };
  return {
    label: "Good",
    color: "text-ink-600",
    bg: "bg-ink-50",
    border: "border-ink-200",
    description: "Useful for the right audience. Consider alternatives before committing.",
  };
}

export default function ReviewDetailPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(tool);
  const verdict = getVerdict(tool.rating);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  const reviewYear = new Date().getFullYear();

  // Other reviews (excluding current)
  const moreReviews = tools.filter((t) => t.slug !== tool.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${tool.name} Review`,
    description: tool.description,
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME || "AI Tools Hub",
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      url: tool.url,
      applicationCategory: tool.category,
    },
    url: `${siteUrl}/reviews/${tool.slug}`,
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-400">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li>
              <Link href="/reviews" className="hover:text-brand-600 transition-colors">Reviews</Link>
            </li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li className="text-ink-600 font-medium">{tool.name}</li>
          </ol>
        </nav>

        <div className="flex gap-10">
          {/* ── Main content ── */}
          <article className="flex-1 min-w-0 space-y-10">

            {/* ── Hero ── */}
            <header>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="tag-pill">{tool.category}</span>
                {tool.badge && (
                  <span className="inline-flex items-center gap-1 bg-accent-100 text-accent-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    ⭐ {tool.badge}
                  </span>
                )}
                <span className="text-xs text-ink-400 ml-auto">
                  Updated {reviewYear}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2 leading-[1.15] tracking-tight font-serif">
                {tool.name} Review ({reviewYear}): Is It Worth It?
              </h1>
              <p className="text-xl text-ink-500 leading-relaxed mb-5">{tool.tagline}</p>

              {/* Hero score card */}
              <div className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Score */}
                    <div className="flex items-center gap-5 shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-3xl">
                        {tool.icon}
                      </div>
                      <div>
                        <div className="text-5xl font-black text-ink-900 leading-none mb-1">
                          {tool.rating.toFixed(1)}
                        </div>
                        <StarRating rating={tool.rating} size="md" />
                        <p className="text-xs text-ink-400 mt-1">Overall Score</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-ink-200 self-stretch" />
                    <div className="sm:hidden h-px w-full bg-ink-200" />

                    {/* Verdict + CTA */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-3 ${verdict.bg} ${verdict.color} border ${verdict.border}`}
                      >
                        <span className="text-base">
                          {tool.rating >= 4.7 ? "🏆" : tool.rating >= 4.4 ? "✅" : "👍"}
                        </span>
                        Our Verdict: {verdict.label}
                      </div>
                      <p className="text-ink-600 text-sm leading-relaxed mb-4">
                        {verdict.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="btn-primary text-sm"
                        >
                          Try {tool.name} →
                        </a>
                        <Link href={`/tools/${tool.slug}`} className="btn-secondary text-sm">
                          Feature Overview
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* ── Summary ── */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-3 tracking-tight">
                Overview
              </h2>
              <p className="text-ink-600 text-[1.05rem] leading-relaxed">{tool.longDescription}</p>
            </section>

            {/* ── Pros & Cons ── */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Pros &amp; Cons
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-4 flex items-center gap-1.5">
                    <span className="text-base">👍</span> What We Like
                  </p>
                  <ul className="space-y-3">
                    {tool.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2.5">
                        <span className="text-green-500 mt-0.5 shrink-0 font-bold">✓</span>
                        <span className="text-sm text-ink-700 leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-1.5">
                    <span className="text-base">👎</span> What Could Be Better
                  </p>
                  <ul className="space-y-3">
                    {tool.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2.5">
                        <span className="text-red-400 mt-0.5 shrink-0 font-bold">✗</span>
                        <span className="text-sm text-ink-700 leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Rating Breakdown ── */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Detailed Ratings
              </h2>
              <div className="bg-white border border-ink-100 rounded-2xl p-6 shadow-card space-y-4">
                {tool.ratingBreakdown.map((item) => (
                  <RatingBar key={item.criterion} score={item.score} label={item.criterion} />
                ))}
              </div>
            </section>

            {/* ── In-content ad ── */}
            <div className="rounded-xl overflow-hidden bg-ink-50 p-4 border border-ink-100">
              <AdSlot slot="7788990044" format="in-article" showLabel />
            </div>

            {/* ── Key Features ── */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tool.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="flex items-start gap-3 bg-white border border-ink-100 rounded-2xl p-4 shadow-card"
                  >
                    <div className="text-2xl shrink-0">{feat.icon}</div>
                    <div>
                      <h3 className="font-bold text-ink-900 mb-0.5">{feat.title}</h3>
                      <p className="text-sm text-ink-500 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Pricing ── */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Pricing
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.pricingTiers.map((tier, idx) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-5 border ${
                      idx === 1
                        ? "bg-brand-600 border-brand-600 text-white shadow-lg"
                        : "bg-white border-ink-200"
                    }`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${idx === 1 ? "text-brand-200" : "text-ink-500"}`}>
                      {tier.name}
                    </p>
                    <p className={`text-2xl font-bold mb-4 ${idx === 1 ? "text-white" : "text-ink-900"}`}>
                      {tier.price}
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((f) => (
                        <li key={f} className={`flex items-start gap-2 text-sm ${idx === 1 ? "text-brand-100" : "text-ink-600"}`}>
                          <span className={`mt-0.5 shrink-0 ${idx === 1 ? "text-brand-200" : "text-green-500"}`}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Who Is It For? ── */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-4 tracking-tight">
                Who Should Use {tool.name}?
              </h2>
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 space-y-3">
                {tool.useCases.map((uc, i) => (
                  <div key={uc} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-ink-700 leading-relaxed">{uc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Alternatives ── */}
            {alternatives.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                  Best Alternatives to {tool.name}
                </h2>
                <div className="space-y-3">
                  {alternatives.map((alt) => (
                    <div
                      key={alt.slug}
                      className="bg-white border border-ink-100 rounded-2xl shadow-card overflow-hidden"
                    >
                      <div className="h-1 bg-gradient-to-r from-ink-200 to-ink-100" />
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
                            {alt.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <h3 className="font-bold text-ink-900">{alt.name}</h3>
                              <span className="tag-pill text-[10px]">{alt.category}</span>
                            </div>
                            <p className="text-sm text-ink-500 line-clamp-1">{alt.tagline}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className={`w-3.5 h-3.5 ${i < Math.floor(alt.rating) ? "text-accent-500" : "text-ink-200"}`}
                                >
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                                </svg>
                              ))}
                              <span className="text-xs text-ink-500">{alt.rating.toFixed(1)}</span>
                              <span className="text-xs text-ink-400">· {alt.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Link
                            href={`/reviews/${alt.slug}`}
                            className="text-sm font-semibold text-brand-600 border border-brand-300 hover:bg-brand-50 transition-colors px-4 py-1.5 rounded-full"
                          >
                            Read Review
                          </Link>
                          <Link
                            href={`/tools/${alt.slug}`}
                            className="text-sm font-semibold text-ink-600 border border-ink-200 hover:bg-ink-50 transition-colors px-4 py-1.5 rounded-full"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/compare" className="text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                    Compare all tools side by side →
                  </Link>
                </div>
              </section>
            )}

            {/* ── Multiplex ad ── */}
            <div className="pt-6 border-t border-ink-200">
              <AdSlot slot="1100998880" format="multiplex" showLabel className="w-full" />
            </div>

            {/* ── More Reviews ── */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="section-label">More Reviews</span>
                <div className="flex-1 h-px bg-ink-200" />
                <Link href="/reviews" className="text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                  View all →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {moreReviews.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/reviews/${r.slug}`}
                    className="group block p-5 rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all bg-white"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm shrink-0">
                        {r.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink-900 group-hover:text-brand-600 transition-colors">
                          {r.name}
                        </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`w-3 h-3 ${i < Math.floor(r.rating) ? "text-accent-500" : "text-ink-200"}`}
                            >
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                            </svg>
                          ))}
                          <span className="text-xs text-ink-400 ml-0.5">{r.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-ink-500 line-clamp-2">{r.tagline}</p>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-[100px] space-y-6">
              {/* Score summary */}
              <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-3">
                  Our Score
                </p>
                <div className="text-6xl font-black text-ink-900 leading-none mb-2">
                  {tool.rating.toFixed(1)}
                </div>
                <StarRating rating={tool.rating} size="md" />
                <div
                  className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${verdict.bg} ${verdict.color} border ${verdict.border}`}
                >
                  {verdict.label}
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 w-full btn-primary justify-center text-sm"
                >
                  Try {tool.name} Free →
                </a>
              </div>

              {/* Sidebar ad */}
              <AdSlot
                slot="2233445588"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />

              {/* Compare CTA */}
              <div className="bg-ink-50 border border-ink-200 rounded-2xl p-5">
                <p className="text-sm font-bold text-ink-900 mb-1">Compare alternatives</p>
                <p className="text-xs text-ink-500 mb-3">
                  See how {tool.name} stacks up against other top tools.
                </p>
                <Link href="/compare" className="btn-secondary text-sm w-full justify-center">
                  Side-by-Side Comparison →
                </Link>
              </div>

              {/* Sidebar ad */}
              <AdSlot
                slot="6655778811"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

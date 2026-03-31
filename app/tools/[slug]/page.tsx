import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllToolSlugs, getToolBySlug, getAlternatives } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  return {
    title: `${tool.name} Review — Features, Pricing & Alternatives`,
    description: `${tool.tagline}. Read our in-depth ${tool.name} review: pricing, key features, pros & cons, and the best alternatives.`,
    keywords: [tool.name, `${tool.name} review`, `${tool.name} pricing`, `${tool.name} alternatives`, tool.category, "AI tools"],
    openGraph: {
      type: "article",
      title: `${tool.name} Review — AI Tools Hub`,
      description: tool.description,
      url: `${siteUrl}/tools/${tool.slug}`,
    },
    alternates: { canonical: `${siteUrl}/tools/${tool.slug}` },
  };
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
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
          className={`${sizeClasses[size]} ${
            i < full
              ? "text-accent-500"
              : i === full && half
              ? "text-accent-300"
              : "text-ink-200"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      <span
        className={`font-bold text-ink-700 ml-1 ${
          size === "lg" ? "text-xl" : size === "md" ? "text-base" : "text-sm"
        }`}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function RatingBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 9 ? "bg-green-500" : score >= 7.5 ? "bg-brand-500" : "bg-accent-500";
  return (
    <div className="flex-1 bg-ink-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ToolDetailPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(tool);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    offers: { "@type": "Offer", price: tool.pricingTiers[0]?.price ?? tool.price },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      ratingCount: 128,
    },
    url: `${siteUrl}/tools/${tool.slug}`,
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
              <Link href="/tools" className="hover:text-brand-600 transition-colors">AI Tools</Link>
            </li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li className="text-ink-600 font-medium">{tool.name}</li>
          </ol>
        </nav>

        <div className="flex gap-10">
          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Hero card */}
            <section className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-3xl shrink-0 shadow-sm">
                    {tool.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight">
                        {tool.name}
                      </h1>
                      {tool.badge && (
                        <span className="inline-flex items-center gap-1 bg-accent-100 text-accent-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          ⭐ {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-ink-500 text-lg mb-3 leading-relaxed">{tool.tagline}</p>

                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <StarRating rating={tool.rating} size="md" />
                      <span className="tag-pill">{tool.category}</span>
                      <span className="text-sm font-semibold text-ink-600">{tool.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="btn-primary"
                      >
                        Try {tool.name}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <Link href="/compare" className="btn-secondary">
                        Compare Tools
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-3 tracking-tight">
                What is {tool.name}?
              </h2>
              <p className="text-ink-600 text-[1.05rem] leading-relaxed">{tool.longDescription}</p>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Pros &amp; Cons
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-3">
                    Pros
                  </p>
                  <ul className="space-y-2.5">
                    {tool.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <span className="text-green-500 mt-0.5 shrink-0 text-base">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
                    Cons
                  </p>
                  <ul className="space-y-2.5">
                    {tool.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <span className="text-red-400 mt-0.5 shrink-0 text-base">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="bg-white border border-ink-100 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="text-2xl mb-2">{feat.icon}</div>
                    <h3 className="font-bold text-ink-900 mb-1">{feat.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{feat.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* In-content ad */}
            <div className="rounded-xl overflow-hidden bg-ink-50 p-4 border border-ink-100">
              <AdSlot slot="7788990022" format="in-article" showLabel />
            </div>

            {/* Pricing */}
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
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                        idx === 1 ? "text-brand-200" : "text-ink-500"
                      }`}
                    >
                      {tier.name}
                    </p>
                    <p
                      className={`text-2xl font-bold mb-4 ${
                        idx === 1 ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {tier.price}
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          className={`flex items-start gap-2 text-sm ${
                            idx === 1 ? "text-brand-100" : "text-ink-600"
                          }`}
                        >
                          <span
                            className={`mt-0.5 shrink-0 ${
                              idx === 1 ? "text-brand-200" : "text-green-500"
                            }`}
                          >
                            ✓
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-4 tracking-tight">
                Best Use Cases
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map((uc) => (
                  <span
                    key={uc}
                    className="bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </section>

            {/* Rating Breakdown */}
            <section>
              <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                Our Rating
              </h2>
              <div className="bg-white border border-ink-100 rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-ink-100">
                  <div className="text-5xl font-black text-ink-900 leading-none">
                    {tool.rating.toFixed(1)}
                  </div>
                  <div>
                    <StarRating rating={tool.rating} size="lg" />
                    <p className="text-sm text-ink-400 mt-1">Overall Score</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {tool.ratingBreakdown.map((item) => (
                    <div key={item.criterion} className="flex items-center gap-3">
                      <span className="text-sm text-ink-600 w-36 shrink-0">{item.criterion}</span>
                      <RatingBar score={item.score} />
                      <span className="text-sm font-semibold text-ink-700 w-8 text-right">
                        {item.score.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-ink-900 mb-5 tracking-tight">
                  Alternatives to {tool.name}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.slug}
                      href={`/tools/${alt.slug}`}
                      className="group flex items-start gap-3 bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all p-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
                        {alt.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-ink-900 group-hover:text-brand-600 transition-colors">
                          {alt.name}
                        </p>
                        <p className="text-xs text-ink-400 line-clamp-2 mt-0.5">{alt.tagline}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`w-3 h-3 ${
                                i < Math.floor(alt.rating) ? "text-accent-500" : "text-ink-200"
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                          <span className="text-xs text-ink-500 ml-0.5">{alt.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom multiplex ad */}
            <div className="pt-6 border-t border-ink-200">
              <AdSlot slot="1100998878" format="multiplex" showLabel className="w-full" />
            </div>
          </div>

          {/* ── Sidebar (desktop only) ── */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-[100px] space-y-6">
              {/* Quick facts */}
              <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-4">
                  Quick Facts
                </p>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Category</dt>
                    <dd className="font-medium text-ink-800">{tool.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Starting Price</dt>
                    <dd className="font-medium text-ink-800">{tool.pricingTiers[0]?.price ?? tool.price}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-ink-500">Our Rating</dt>
                    <dd className="font-bold text-ink-900">{tool.rating.toFixed(1)} / 5</dd>
                  </div>
                </dl>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-5 w-full btn-primary justify-center text-sm"
                >
                  Visit {tool.name} →
                </a>
              </div>

              {/* Sidebar ad #1 */}
              <AdSlot
                slot="2233445577"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />

              {/* Compare CTA */}
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold text-ink-900 mb-1">Not sure yet?</p>
                <p className="text-xs text-ink-500 mb-3">See how {tool.name} stacks up against competitors.</p>
                <Link href="/compare" className="btn-secondary text-sm w-full justify-center">
                  Compare Tools
                </Link>
              </div>

              {/* Sidebar ad #2 */}
              <AdSlot
                slot="6655778800"
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

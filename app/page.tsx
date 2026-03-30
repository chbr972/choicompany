import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI Tools Hub";

export const metadata: Metadata = {
  title: {
    absolute: `${siteName} — AI Tools, Productivity & Tech Guides`,
  },
  description:
    "Practical guides on AI tools, productivity systems, web performance, and building a better digital life. New articles weekly.",
  keywords: [
    "AI tools",
    "productivity tips",
    "technology guides",
    "web performance",
    "digital life",
    "blogging tips",
  ],
};

export default function HomePage() {
  const posts = getSortedPostsMeta();
  const featured = posts[0];
  const rest = posts.slice(1);

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
            AI Tools Directory
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-ink-900 mb-5 leading-[1.1] tracking-tight">
            Discover the Best{" "}
            <span className="text-brand-600">AI Tools</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Expert reviews, comparisons, and guides for AI productivity tools,
            writing assistants, code generators, and more.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools" className="btn-primary">
              Explore AI Tools
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/reviews" className="btn-secondary">
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
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

        {/* ── AI Tools Directory ────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="section-label">AI Tools Directory</span>
            <div className="flex-1 h-px bg-ink-200" />
            <Link
              href="/tools"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all tools →
            </Link>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Writing", "Coding", "Image", "Productivity", "Research"].map((cat) => (
              <span key={cat} className="tag-pill cursor-pointer">{cat}</span>
            ))}
          </div>

          {/* Tool cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "ChatGPT", category: "Writing", desc: "OpenAI's flagship conversational AI for writing, research, coding, and more.", price: "Free / $20/mo", slug: "chatgpt", icon: "C" },
              { name: "GitHub Copilot", category: "Coding", desc: "AI pair programmer that suggests code completions and entire functions in your editor.", price: "$10/mo", slug: "github-copilot", icon: "G" },
              { name: "Midjourney", category: "Image", desc: "AI image generation tool for creating stunning art and visuals from text prompts.", price: "$10/mo", slug: "midjourney", icon: "M" },
              { name: "Notion AI", category: "Productivity", desc: "AI-powered writing and summarization built directly into Notion workspaces.", price: "$10/mo add-on", slug: "notion-ai", icon: "N" },
              { name: "Perplexity AI", category: "Research", desc: "AI search engine that provides cited, real-time answers to complex questions.", price: "Free / $20/mo", slug: "perplexity-ai", icon: "P" },
              { name: "Claude", category: "Writing", desc: "Anthropic's AI assistant excelling at nuanced writing, analysis, and reasoning tasks.", price: "Free / $20/mo", slug: "claude", icon: "A" },
            ].map((tool) => (
              <div key={tool.slug} className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border border-ink-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900">{tool.name}</h3>
                    <span className="tag-pill text-[10px]">{tool.category}</span>
                  </div>
                </div>
                <p className="text-ink-500 text-sm mb-4 leading-relaxed">{tool.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">{tool.price}</span>
                  <Link href={`/tools/${tool.slug}`} className="text-brand-600 text-sm font-semibold hover:text-brand-700 transition-colors">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── In-content Ad ─────────────────────────── */}
        <div className="flex justify-center my-10">
          <AdSlot slot="1122334455" format="leaderboard" className="w-full max-w-[728px]" />
        </div>

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

        {/* ── CTA Banner ────────────────────────────── */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Find your next favorite AI tool
            </h2>
            <p className="text-brand-200 mb-6 text-lg">
              Browse our full directory of reviewed and rated AI tools across every category.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors shadow-sm"
            >
              Browse All Tools
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Tool Reviews — Honest, In-Depth Analysis",
  description:
    "Expert reviews of the best AI tools. Honest, in-depth analysis of ChatGPT, Claude, Midjourney, GitHub Copilot, and more.",
  keywords: [
    "AI tool reviews",
    "ChatGPT review",
    "Claude review",
    "Midjourney review",
    "GitHub Copilot review",
    "AI software comparison",
  ],
};

const reviews = [
  {
    name: "ChatGPT",
    category: "Writing & Research",
    rating: 4.5,
    summary:
      "The most widely-used AI assistant. Excellent for general writing, brainstorming, and research. GPT-4 raises the bar significantly.",
    pros: ["Huge community & integrations", "Strong at creative writing", "Excellent plugin ecosystem"],
    cons: ["Can hallucinate facts", "GPT-4 requires paid plan"],
    price: "Free / $20/mo",
    slug: "chatgpt",
    icon: "C",
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    rating: 4.7,
    summary:
      "The gold standard for AI-assisted coding. Deeply integrated with VS Code and JetBrains, with strong context awareness.",
    pros: ["Excellent IDE integration", "Fast autocomplete", "Great for boilerplate"],
    cons: ["Struggles with complex logic", "Requires subscription"],
    price: "$10/mo",
    slug: "github-copilot",
    icon: "G",
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    rating: 4.8,
    summary:
      "Best-in-class image quality for artistic and photorealistic outputs. The Discord-based UX is unique but manageable.",
    pros: ["Stunning image quality", "Strong art direction control", "Active community"],
    cons: ["Discord-only interface", "No free tier"],
    price: "$10/mo",
    slug: "midjourney",
    icon: "M",
  },
  {
    name: "Claude",
    category: "Writing & Analysis",
    rating: 4.6,
    summary:
      "Anthropic's model shines at nuanced, long-form writing and careful reasoning. Excellent for document analysis and research.",
    pros: ["Long context window", "Thoughtful, nuanced responses", "Strong at analysis"],
    cons: ["Fewer integrations than ChatGPT", "Slower at casual tasks"],
    price: "Free / $20/mo",
    slug: "claude",
    icon: "A",
  },
  {
    name: "Perplexity AI",
    category: "Research",
    rating: 4.4,
    summary:
      "The best AI-powered search engine. Real-time web access with cited sources makes it ideal for research tasks.",
    pros: ["Real-time web search", "Cited sources", "Clean interface"],
    cons: ["Less capable for creative tasks", "Pro plan needed for best models"],
    price: "Free / $20/mo",
    slug: "perplexity-ai",
    icon: "P",
  },
  {
    name: "Cursor",
    category: "Coding",
    rating: 4.5,
    summary:
      "An AI-native code editor that goes beyond Copilot — it understands your entire codebase and can make multi-file edits.",
    pros: ["Full codebase awareness", "Multi-file editing", "VS Code compatible"],
    cons: ["Newer tool with fewer integrations", "Can be slow on large repos"],
    price: "Free / $20/mo",
    slug: "cursor",
    icon: "C",
  },
];

function StarRating({ rating }: { rating: number }) {
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
          className={`w-4 h-4 ${i < full ? "text-accent-500" : i === full && half ? "text-accent-300" : "text-ink-200"}`}
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      <span className="text-sm font-semibold text-ink-700 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            AI Tool Reviews
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-[1.1] tracking-tight">
            Honest <span className="text-brand-600">AI Tool Reviews</span>
          </h1>
          <p className="text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
            In-depth, unbiased reviews of the most popular AI tools. Real testing, real results —
            so you can choose with confidence.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col gap-8">
          {reviews.map((review) => (
            <article
              key={review.slug}
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-ink-100 overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-2xl shrink-0">
                    {review.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-ink-900">{review.name}</h2>
                      <span className="tag-pill">{review.category}</span>
                      <span className="text-xs text-ink-400 ml-auto">{review.price}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-ink-500 mt-3 mb-4 leading-relaxed">{review.summary}</p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-2">Pros</p>
                        <ul className="space-y-1">
                          {review.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2 text-sm text-ink-600">
                              <span className="text-green-500 mt-0.5">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-2">Cons</p>
                        <ul className="space-y-1">
                          {review.cons.map((con) => (
                            <li key={con} className="flex items-start gap-2 text-sm text-ink-600">
                              <span className="text-red-400 mt-0.5">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={`/tools/${review.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm hover:text-brand-700 transition-colors"
                    >
                      Read full review
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Browse the full directory
            </h2>
            <p className="text-brand-200 mb-6 text-lg">
              Explore all AI tools by category and find exactly what you need.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors shadow-sm"
            >
              View AI Tools Directory
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

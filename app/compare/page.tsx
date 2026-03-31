import type { Metadata } from "next";
import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "AI Tool Comparison — Side-by-Side Feature Matrix",
  description:
    "Compare the best AI tools side by side. Feature matrices, pricing tables, ratings, and expert verdicts to help you choose the right AI tool.",
  keywords: [
    "AI tool comparison",
    "compare AI tools",
    "ChatGPT vs Claude",
    "best AI writing tools",
    "GitHub Copilot vs Cursor",
    "AI tools 2026",
  ],
};

// Tools featured in comparison groups
const comparisons = [
  {
    id: "writing",
    title: "Best AI Writing Tools",
    description: "Which AI assistant should you use for writing, research, and content creation?",
    slugs: ["chatgpt", "claude", "jasper"],
    verdict: {
      winner: "chatgpt",
      summary:
        "ChatGPT edges ahead on versatility and ecosystem. Claude is the better pick for long-form analysis. Jasper wins for teams needing brand consistency at scale.",
    },
  },
  {
    id: "coding",
    title: "Best AI Coding Assistants",
    description: "Copilot or Cursor? Here's how the top AI coding tools compare.",
    slugs: ["github-copilot", "cursor", "chatgpt"],
    verdict: {
      winner: "cursor",
      summary:
        "Cursor pulls ahead for complex, codebase-wide work. GitHub Copilot remains the gold standard for fast inline autocomplete. ChatGPT is a strong fallback for code explanation.",
    },
  },
  {
    id: "image",
    title: "Best AI Image & Video Tools",
    description: "For creatives: Midjourney vs Runway — image generation vs video production.",
    slugs: ["midjourney", "runway"],
    verdict: {
      winner: "midjourney",
      summary:
        "Midjourney wins on image quality and artistic control. Runway is unmatched for video generation and creative editing workflows.",
    },
  },
];

// Feature criteria for the comparison matrix
const matrixCriteria = [
  "Free tier",
  "Mobile app",
  "API access",
  "Image generation",
  "Code generation",
  "Real-time web search",
  "File upload",
  "Team features",
];

// Per-tool matrix values (slug → criterion → value)
const matrixData: Record<string, Record<string, string | boolean | null>> = {
  chatgpt: {
    "Free tier": true,
    "Mobile app": true,
    "API access": true,
    "Image generation": true,
    "Code generation": true,
    "Real-time web search": true,
    "File upload": true,
    "Team features": true,
  },
  claude: {
    "Free tier": true,
    "Mobile app": true,
    "API access": true,
    "Image generation": false,
    "Code generation": true,
    "Real-time web search": false,
    "File upload": true,
    "Team features": true,
  },
  "github-copilot": {
    "Free tier": false,
    "Mobile app": false,
    "API access": false,
    "Image generation": false,
    "Code generation": true,
    "Real-time web search": false,
    "File upload": false,
    "Team features": true,
  },
  cursor: {
    "Free tier": true,
    "Mobile app": false,
    "API access": false,
    "Image generation": false,
    "Code generation": true,
    "Real-time web search": false,
    "File upload": true,
    "Team features": true,
  },
  midjourney: {
    "Free tier": false,
    "Mobile app": false,
    "API access": false,
    "Image generation": true,
    "Code generation": false,
    "Real-time web search": false,
    "File upload": true,
    "Team features": false,
  },
  runway: {
    "Free tier": true,
    "Mobile app": true,
    "API access": true,
    "Image generation": true,
    "Code generation": false,
    "Real-time web search": false,
    "File upload": true,
    "Team features": true,
  },
  jasper: {
    "Free tier": false,
    "Mobile app": false,
    "API access": true,
    "Image generation": true,
    "Code generation": false,
    "Real-time web search": false,
    "File upload": false,
    "Team features": true,
  },
  "perplexity-ai": {
    "Free tier": true,
    "Mobile app": true,
    "API access": true,
    "Image generation": false,
    "Code generation": false,
    "Real-time web search": true,
    "File upload": true,
    "Team features": false,
  },
  "notion-ai": {
    "Free tier": false,
    "Mobile app": true,
    "API access": false,
    "Image generation": false,
    "Code generation": false,
    "Real-time web search": false,
    "File upload": true,
    "Team features": true,
  },
};

function CellValue({ value }: { value: string | boolean | null }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 text-sm font-bold">
        ✓
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ink-100 text-ink-400 text-sm font-bold">
        –
      </span>
    );
  return <span className="text-sm text-ink-600">{value}</span>;
}

function StarsMini({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-accent-500" : "text-ink-200"}`}
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      <span className="text-xs font-semibold text-ink-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ComparePage() {
  // All tools for the full matrix
  const featuredSlugs = ["chatgpt", "claude", "github-copilot", "cursor", "midjourney", "perplexity-ai"];
  const featuredTools = featuredSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as typeof tools;

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
            Side-by-Side Comparison
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-[1.1] tracking-tight">
            Compare the Best <span className="text-brand-600">AI Tools</span>
          </h1>
          <p className="text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
            Feature matrices, ratings, and expert verdicts to help you choose the right AI tool
            for your workflow.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-20">

        {/* ── Banner ad ── */}
        <AdSlot slot="3344556601" format="leaderboard" showLabel className="w-full" />

        {/* ── Comparison Groups ── */}
        {comparisons.map((group) => {
          const groupTools = group.slugs
            .map((slug) => tools.find((t) => t.slug === slug))
            .filter(Boolean) as typeof tools;
          const winner = tools.find((t) => t.slug === group.verdict.winner);

          return (
            <section key={group.id} aria-labelledby={`section-${group.id}`}>
              <div className="mb-6">
                <h2
                  id={`section-${group.id}`}
                  className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight mb-1"
                >
                  {group.title}
                </h2>
                <p className="text-ink-500">{group.description}</p>
              </div>

              {/* Side-by-side cards */}
              <div
                className={`grid gap-4 mb-6 ${
                  groupTools.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {groupTools.map((tool) => {
                  const isWinner = tool.slug === group.verdict.winner;
                  return (
                    <div
                      key={tool.slug}
                      className={`relative bg-white rounded-2xl border shadow-card hover:shadow-card-hover transition-all overflow-hidden ${
                        isWinner ? "border-brand-400 ring-2 ring-brand-300" : "border-ink-100"
                      }`}
                    >
                      {isWinner && (
                        <div className="bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest text-center py-1.5">
                          ⭐ Editor&apos;s Pick
                        </div>
                      )}
                      <div
                        className={`h-1 ${
                          isWinner
                            ? "bg-gradient-to-r from-brand-600 to-brand-400"
                            : "bg-ink-100"
                        }`}
                      />
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
                            {tool.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-ink-900">{tool.name}</h3>
                            <StarsMini rating={tool.rating} />
                          </div>
                        </div>
                        <p className="text-sm text-ink-500 mb-3 leading-relaxed line-clamp-2">
                          {tool.tagline}
                        </p>
                        <p className="text-xs font-semibold text-ink-600 mb-3">{tool.price}</p>

                        {/* Mini pros */}
                        <ul className="space-y-1 mb-4">
                          {tool.pros.slice(0, 3).map((pro) => (
                            <li key={pro} className="flex items-start gap-1.5 text-xs text-ink-600">
                              <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/tools/${tool.slug}`}
                          className="block w-full text-center text-sm font-semibold text-brand-600 border border-brand-300 hover:bg-brand-50 transition-colors rounded-full py-2"
                        >
                          Full Review →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verdict */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start">
                <div className="text-2xl shrink-0">⚖️</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
                    Our Verdict
                  </p>
                  <p className="text-sm text-ink-700 leading-relaxed">{group.verdict.summary}</p>
                  {winner && (
                    <Link
                      href={`/tools/${winner.slug}`}
                      className="inline-flex items-center gap-1.5 mt-2 text-brand-600 text-sm font-semibold hover:text-brand-700 transition-colors"
                    >
                      Read the {winner.name} review →
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── In-content ad ── */}
        <div className="rounded-xl overflow-hidden bg-ink-50 p-4 border border-ink-100">
          <AdSlot slot="7788990033" format="in-article" showLabel />
        </div>

        {/* ── Full Feature Matrix ── */}
        <section aria-labelledby="matrix-heading">
          <div className="mb-6">
            <h2 id="matrix-heading" className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight mb-1">
              Full Feature Matrix
            </h2>
            <p className="text-ink-500">
              A complete side-by-side breakdown of the top AI tools across key capabilities.
            </p>
          </div>

          {/* Scrollable table wrapper */}
          <div className="overflow-x-auto rounded-2xl border border-ink-200 shadow-card">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink-50 border-b border-ink-200">
                  <th className="text-left px-5 py-4 font-semibold text-ink-600 w-40 min-w-[160px]">
                    Feature
                  </th>
                  {featuredTools.map((tool) => (
                    <th key={tool.slug} className="px-4 py-4 text-center min-w-[110px]">
                      <Link href={`/tools/${tool.slug}`} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group">
                        <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                          {tool.icon}
                        </div>
                        <span className="font-bold text-ink-800 group-hover:text-brand-600 transition-colors text-xs">
                          {tool.name}
                        </span>
                        <StarsMini rating={tool.rating} />
                      </Link>
                    </th>
                  ))}
                </tr>
                {/* Price row */}
                <tr className="bg-white border-b border-ink-100">
                  <td className="px-5 py-3 text-ink-500 font-medium">Price</td>
                  {featuredTools.map((tool) => (
                    <td key={tool.slug} className="px-4 py-3 text-center text-xs font-semibold text-ink-700">
                      {tool.price}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixCriteria.map((criterion, idx) => (
                  <tr
                    key={criterion}
                    className={`border-b border-ink-100 ${idx % 2 === 0 ? "bg-white" : "bg-ink-50/50"}`}
                  >
                    <td className="px-5 py-3 text-ink-700 font-medium">{criterion}</td>
                    {featuredTools.map((tool) => (
                      <td key={tool.slug} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <CellValue value={matrixData[tool.slug]?.[criterion] ?? false} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-brand-50 border-t border-brand-200">
                  <td className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-brand-700">
                    Full Review
                  </td>
                  {featuredTools.map((tool) => (
                    <td key={tool.slug} className="px-4 py-4 text-center">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        View →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* ── Category quick links ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink-900 tracking-tight mb-5">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.filter((c) => c !== "All").map((cat) => {
              const catTools = tools.filter((t) => t.category === cat);
              return (
                <Link
                  key={cat}
                  href={`/tools`}
                  className="group bg-white border border-ink-100 rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-ink-900 group-hover:text-brand-600 transition-colors">
                      {cat}
                    </span>
                    <span className="text-xs text-ink-400">{catTools.length} tools</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {catTools.slice(0, 3).map((t) => (
                      <span key={t.slug} className="text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                        {t.name}
                      </span>
                    ))}
                    {catTools.length > 3 && (
                      <span className="text-[11px] bg-ink-100 text-ink-500 px-2 py-0.5 rounded-full font-medium">
                        +{catTools.length - 3} more
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Multiplex ad ── */}
        <div className="pt-4 border-t border-ink-200">
          <AdSlot slot="1100998879" format="multiplex" showLabel className="w-full" />
        </div>

        {/* ── CTA ── */}
        <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Want a deeper dive?
            </h2>
            <p className="text-brand-200 mb-6 text-lg">
              Read our full in-depth reviews with real-world testing and use-case breakdowns.
            </p>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors shadow-sm"
            >
              Read AI Tool Reviews
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

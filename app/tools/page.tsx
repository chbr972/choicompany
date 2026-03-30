import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Tools Directory — Find the Best AI Software",
  description:
    "Browse our curated directory of the best AI tools. Find reviews and comparisons for writing assistants, code generators, image tools, and productivity AI.",
  keywords: [
    "AI tools",
    "AI directory",
    "best AI software",
    "AI reviews",
    "ChatGPT alternatives",
    "AI productivity",
  ],
};

const tools = [
  {
    name: "ChatGPT",
    category: "Writing",
    desc: "OpenAI's flagship conversational AI for writing, research, coding, and more.",
    price: "Free / $20/mo",
    slug: "chatgpt",
    icon: "C",
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    desc: "AI pair programmer that suggests code completions and entire functions in your editor.",
    price: "$10/mo",
    slug: "github-copilot",
    icon: "G",
  },
  {
    name: "Midjourney",
    category: "Image",
    desc: "AI image generation tool for creating stunning art and visuals from text prompts.",
    price: "$10/mo",
    slug: "midjourney",
    icon: "M",
  },
  {
    name: "Notion AI",
    category: "Productivity",
    desc: "AI-powered writing and summarization built directly into Notion workspaces.",
    price: "$10/mo add-on",
    slug: "notion-ai",
    icon: "N",
  },
  {
    name: "Perplexity AI",
    category: "Research",
    desc: "AI search engine that provides cited, real-time answers to complex questions.",
    price: "Free / $20/mo",
    slug: "perplexity-ai",
    icon: "P",
  },
  {
    name: "Claude",
    category: "Writing",
    desc: "Anthropic's AI assistant excelling at nuanced writing, analysis, and reasoning tasks.",
    price: "Free / $20/mo",
    slug: "claude",
    icon: "A",
  },
  {
    name: "Runway",
    category: "Image",
    desc: "AI-powered video and image editing platform for creatives and filmmakers.",
    price: "Free / $15/mo",
    slug: "runway",
    icon: "R",
  },
  {
    name: "Cursor",
    category: "Coding",
    desc: "AI-first code editor built on VS Code with deep codebase understanding.",
    price: "Free / $20/mo",
    slug: "cursor",
    icon: "C",
  },
  {
    name: "Jasper",
    category: "Writing",
    desc: "AI writing platform built for marketing teams, with brand voice and templates.",
    price: "$49/mo",
    slug: "jasper",
    icon: "J",
  },
];

const categories = ["All", "Writing", "Coding", "Image", "Productivity", "Research"];

export default function ToolsPage() {
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
            AI Tools Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-[1.1] tracking-tight">
            The Best <span className="text-brand-600">AI Tools</span> in One Place
          </h1>
          <p className="text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
            Discover, compare, and choose the right AI tools for writing, coding, image generation,
            productivity, and research.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span key={cat} className="tag-pill cursor-pointer">{cat}</span>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border border-ink-100"
            >
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
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-brand-600 text-sm font-semibold hover:text-brand-700 transition-colors"
                >
                  View →
                </Link>
              </div>
            </div>
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
              Read in-depth reviews
            </h2>
            <p className="text-brand-200 mb-6 text-lg">
              Go beyond the listing — see how each tool performs in real-world use cases.
            </p>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-7 py-3 rounded-full hover:bg-brand-50 transition-colors shadow-sm"
            >
              Browse All Reviews
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

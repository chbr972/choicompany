"use client";

import { useState } from "react";
import AdSlot from "@/components/AdSlot";

const TOOLS = [
  { name: "ChatGPT", category: "Writing", price: "Free / $20/mo", rating: 4.8, strengths: "Versatile, huge ecosystem, plugin support", weaknesses: "Hallucinations, knowledge cutoff", bestFor: "General tasks, brainstorming, writing", link: "https://chat.openai.com" },
  { name: "Claude", category: "Writing", price: "Free / $20/mo", rating: 4.9, strengths: "Nuanced reasoning, long context, safe", weaknesses: "No internet access on free tier", bestFor: "Long documents, analysis, coding", link: "https://claude.ai" },
  { name: "Gemini", category: "Writing", price: "Free / $20/mo", rating: 4.5, strengths: "Google integration, multimodal", weaknesses: "Inconsistent quality", bestFor: "Google Workspace users, research", link: "https://gemini.google.com" },
  { name: "GitHub Copilot", category: "Coding", price: "$10/mo", rating: 4.7, strengths: "IDE integration, code completion", weaknesses: "Only for coding, subscription required", bestFor: "Developers, code completion", link: "https://github.com/features/copilot" },
  { name: "Cursor", category: "Coding", price: "Free / $20/mo", rating: 4.8, strengths: "Full IDE, codebase-aware, multi-file edits", weaknesses: "Requires learning curve", bestFor: "Full-stack development, refactoring", link: "https://cursor.sh" },
  { name: "Midjourney", category: "Image", price: "$10/mo", rating: 4.8, strengths: "Stunning quality, artistic styles", weaknesses: "Discord-only, no free tier", bestFor: "Marketing visuals, concept art", link: "https://midjourney.com" },
  { name: "DALL-E 3", category: "Image", price: "Included in ChatGPT Plus", rating: 4.6, strengths: "Prompt accuracy, safe content filters", weaknesses: "Less artistic than Midjourney", bestFor: "Accurate illustrations, content creation", link: "https://openai.com/dall-e-3" },
  { name: "Stable Diffusion", category: "Image", price: "Free (self-hosted)", rating: 4.5, strengths: "Free, customizable, open source", weaknesses: "Requires GPU, setup complexity", bestFor: "Developers, power users, local use", link: "https://stability.ai" },
  { name: "Notion AI", category: "Productivity", price: "$10/mo add-on", rating: 4.5, strengths: "Integrated with Notion, simple", weaknesses: "Limited outside Notion ecosystem", bestFor: "Notion users, note-taking teams", link: "https://notion.so/product/ai" },
  { name: "Perplexity AI", category: "Research", price: "Free / $20/mo", rating: 4.7, strengths: "Real-time search, citations, accurate", weaknesses: "Less creative writing ability", bestFor: "Research, fact-checking, news", link: "https://perplexity.ai" },
  { name: "ElevenLabs", category: "Audio", price: "Free / $5/mo", rating: 4.8, strengths: "Ultra-realistic voice cloning, many languages", weaknesses: "Premium voices cost more", bestFor: "Podcasts, audiobooks, video voiceovers", link: "https://elevenlabs.io" },
  { name: "Descript", category: "Audio", price: "Free / $12/mo", rating: 4.6, strengths: "Edit audio like a doc, overdub", weaknesses: "Learning curve, storage limits", bestFor: "Podcast editors, video creators", link: "https://descript.com" },
  { name: "Runway", category: "Video", price: "Free / $15/mo", rating: 4.6, strengths: "AI video generation, inpainting", weaknesses: "Limited free credits", bestFor: "Video editors, content creators", link: "https://runwayml.com" },
  { name: "Jasper", category: "Writing", price: "$49/mo", rating: 4.4, strengths: "Marketing-focused, brand voice", weaknesses: "Expensive, GPT-4 under the hood", bestFor: "Marketing teams, brand content at scale", link: "https://jasper.ai" },
  { name: "Copy.ai", category: "Writing", price: "Free / $36/mo", rating: 4.3, strengths: "Marketing templates, fast", weaknesses: "Quality inconsistent, no depth", bestFor: "Quick marketing copy, small teams", link: "https://copy.ai" },
];

const CATEGORIES = ["All", ...Array.from(new Set(TOOLS.map((t) => t.category)))];
type SortKey = "name" | "rating" | "price";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-yellow-400">★</span>
      <span className="font-semibold text-ink-900">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function CompareToolsPage() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("rating");

  const filtered = TOOLS
    .filter((t) => category === "All" || t.category === category)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.price.localeCompare(b.price);
    });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Free Tool
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
          AI Tool Comparison Table
        </h1>
        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl">
          Compare {TOOLS.length} popular AI tools by category, rating, pricing, and use case. Find the right tool for your workflow.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-2xl border border-ink-100 shadow-card">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                category === cat
                  ? "bg-brand-600 text-white"
                  : "bg-ink-100 text-ink-600 hover:bg-ink-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-ink-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="text-sm px-3 py-1.5 rounded-lg border border-ink-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="rating">Highest Rated</option>
            <option value="name">Name A–Z</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-ink-100 shadow-card mb-10">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 border-b border-ink-100">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-ink-600">Tool</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-600">Category</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-600">Rating</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-600">Price</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-600 hidden lg:table-cell">Best For</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-600 hidden xl:table-cell">Strengths</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {filtered.map((tool) => (
              <tr key={tool.name} className="bg-white hover:bg-brand-50/30 transition-colors">
                <td className="px-5 py-4">
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-ink-900 hover:text-brand-600 transition-colors"
                  >
                    {tool.name} ↗
                  </a>
                </td>
                <td className="px-5 py-4">
                  <span className="tag-pill">{tool.category}</span>
                </td>
                <td className="px-5 py-4">
                  <StarRating rating={tool.rating} />
                </td>
                <td className="px-5 py-4 text-ink-600 whitespace-nowrap">{tool.price}</td>
                <td className="px-5 py-4 text-ink-500 hidden lg:table-cell max-w-xs">{tool.bestFor}</td>
                <td className="px-5 py-4 text-ink-500 hidden xl:table-cell max-w-xs">{tool.strengths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-8">
        <AdSlot slot="5544332211" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Guide */}
      <section className="prose-content mb-12">
        <h2>How to Choose the Right AI Tool</h2>
        <p>With hundreds of AI tools on the market, picking the right one comes down to three questions: What task are you trying to automate? What's your budget? How technical are you willing to get?</p>
        <h3>By use case</h3>
        <ul>
          <li><strong>General writing and analysis:</strong> Start with Claude or ChatGPT. Both are free to start and cover 90% of use cases.</li>
          <li><strong>Software development:</strong> GitHub Copilot for code completion in your existing IDE; Cursor if you want a full AI-native IDE experience.</li>
          <li><strong>Image generation:</strong> Midjourney for the best artistic quality; DALL-E 3 if you need accuracy and already pay for ChatGPT Plus.</li>
          <li><strong>Research:</strong> Perplexity AI for real-time, cited answers — it's essentially an AI-powered search engine.</li>
        </ul>
        <h3>Free vs. paid</h3>
        <p>Most tools offer a free tier that's genuinely useful. Start free, upgrade when you hit limits. The $20/month plans for ChatGPT Plus or Claude Pro are worth it if you use the tool daily.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ink-900 mb-6">FAQ</h2>
        <div className="space-y-6">
          {[
            { q: "Is this comparison updated regularly?", a: "We update ratings and pricing quarterly as the AI landscape changes rapidly. Always verify current pricing on the tool's official website before subscribing." },
            { q: "Which AI tool is best for beginners?", a: "ChatGPT or Claude — both have intuitive chat interfaces, generous free tiers, and massive communities for support. Start with either and expand from there." },
            { q: "Are there any truly free AI tools?", a: "Yes — ChatGPT (free tier), Claude (free tier), Perplexity AI (free tier), Stable Diffusion (self-hosted, free), and many others. Free tiers have usage limits but are excellent for getting started." },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-ink-100 pb-6">
              <h3 className="font-semibold text-ink-900 mb-2">{q}</h3>
              <p className="text-ink-500 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

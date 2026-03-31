"use client";

import { useState } from "react";
import AdSlot from "@/components/AdSlot";

interface Model {
  name: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
  contextWindow: string;
  notes: string;
  badge?: string;
}

const MODELS: Model[] = [
  // OpenAI
  { name: "GPT-4o", provider: "OpenAI", inputPer1M: 2.50, outputPer1M: 10.00, contextWindow: "128K", notes: "Best-in-class reasoning + vision", badge: "Popular" },
  { name: "GPT-4o mini", provider: "OpenAI", inputPer1M: 0.15, outputPer1M: 0.60, contextWindow: "128K", notes: "Fast, affordable, great for most tasks" },
  { name: "GPT-4 Turbo", provider: "OpenAI", inputPer1M: 10.00, outputPer1M: 30.00, contextWindow: "128K", notes: "Legacy high-capability model" },
  { name: "o1", provider: "OpenAI", inputPer1M: 15.00, outputPer1M: 60.00, contextWindow: "200K", notes: "Reasoning model for complex problems" },
  { name: "o1 mini", provider: "OpenAI", inputPer1M: 1.10, outputPer1M: 4.40, contextWindow: "128K", notes: "Affordable reasoning model" },
  // Anthropic
  { name: "Claude Sonnet 4.6", provider: "Anthropic", inputPer1M: 3.00, outputPer1M: 15.00, contextWindow: "200K", notes: "Balanced intelligence and speed", badge: "Recommended" },
  { name: "Claude Opus 4.6", provider: "Anthropic", inputPer1M: 15.00, outputPer1M: 75.00, contextWindow: "200K", notes: "Most capable Claude model" },
  { name: "Claude Haiku 4.5", provider: "Anthropic", inputPer1M: 0.80, outputPer1M: 4.00, contextWindow: "200K", notes: "Fastest and most affordable Claude" },
  // Google
  { name: "Gemini 1.5 Pro", provider: "Google", inputPer1M: 3.50, outputPer1M: 10.50, contextWindow: "2M", notes: "Longest context window available" },
  { name: "Gemini 1.5 Flash", provider: "Google", inputPer1M: 0.075, outputPer1M: 0.30, contextWindow: "1M", notes: "Ultra-low cost, high throughput", badge: "Cheapest" },
  { name: "Gemini 2.0 Flash", provider: "Google", inputPer1M: 0.10, outputPer1M: 0.40, contextWindow: "1M", notes: "Next-gen speed and efficiency" },
  // Meta (via Groq)
  { name: "Llama 3.3 70B (Groq)", provider: "Groq", inputPer1M: 0.59, outputPer1M: 0.79, contextWindow: "128K", notes: "Open-source via Groq's fast inference" },
  { name: "Llama 3.1 8B (Groq)", provider: "Groq", inputPer1M: 0.05, outputPer1M: 0.08, contextWindow: "128K", notes: "Smallest Llama — near-zero cost" },
  // Mistral
  { name: "Mistral Large", provider: "Mistral", inputPer1M: 2.00, outputPer1M: 6.00, contextWindow: "128K", notes: "Top European frontier model" },
  { name: "Mistral Small", provider: "Mistral", inputPer1M: 0.10, outputPer1M: 0.30, contextWindow: "32K", notes: "Efficient mid-tier option" },
];

const PROVIDERS = Array.from(new Set(MODELS.map((m) => m.provider)));

const PRESETS = [
  { label: "Short chat reply", inputTokens: 500, outputTokens: 300 },
  { label: "Email / social post", inputTokens: 1000, outputTokens: 500 },
  { label: "Blog post (1500 words)", inputTokens: 2000, outputTokens: 2000 },
  { label: "Code review", inputTokens: 3000, outputTokens: 1500 },
  { label: "Long-form document", inputTokens: 5000, outputTokens: 4000 },
  { label: "RAG query w/ large context", inputTokens: 20000, outputTokens: 1000 },
  { label: "Custom", inputTokens: 0, outputTokens: 0 },
];

function formatCost(usd: number): string {
  if (usd === 0) return "$0.00";
  if (usd < 0.000001) return `$${usd.toExponential(2)}`;
  if (usd < 0.01) return `$${usd.toFixed(6)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(4)}`;
}

function costPer(model: Model, inputTokens: number, outputTokens: number): number {
  return (model.inputPer1M * inputTokens + model.outputPer1M * outputTokens) / 1_000_000;
}

export default function PricingCalculatorPage() {
  const [preset, setPreset] = useState(0);
  const [inputTokens, setInputTokens] = useState(PRESETS[0].inputTokens);
  const [outputTokens, setOutputTokens] = useState(PRESETS[0].outputTokens);
  const [callsPerDay, setCallsPerDay] = useState(1000);
  const [activeProvider, setActiveProvider] = useState("All");
  const [sortBy, setSortBy] = useState<"cost" | "name">("cost");

  function handlePreset(idx: number) {
    setPreset(idx);
    if (idx !== PRESETS.length - 1) {
      setInputTokens(PRESETS[idx].inputTokens);
      setOutputTokens(PRESETS[idx].outputTokens);
    }
  }

  const filtered = MODELS
    .filter((m) => activeProvider === "All" || m.provider === activeProvider)
    .map((m) => ({ ...m, singleCost: costPer(m, inputTokens, outputTokens) }))
    .sort((a, b) => sortBy === "cost" ? a.singleCost - b.singleCost : a.name.localeCompare(b.name));

  const cheapest = filtered.length > 0 ? filtered[0].singleCost : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Free Tool · {MODELS.length} Models
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
          AI Model Pricing Calculator
        </h1>
        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl">
          Compare the real cost of GPT-4o, Claude, Gemini, and more. Enter your token usage and see exactly what each model will cost per call and per month.
        </p>
      </div>

      {/* Config Card */}
      <div className="bg-white rounded-3xl shadow-card-lg border border-ink-100 p-8 mb-8">
        {/* Presets */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-ink-700 mb-3">1. Choose a use case preset</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => handlePreset(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  preset === i
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-ink-600 border-ink-200 hover:border-brand-400"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Token inputs */}
        <div className="grid sm:grid-cols-3 gap-5 mb-6">
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Input tokens per call</label>
            <input
              type="number"
              min={0}
              value={inputTokens}
              onChange={(e) => { setPreset(PRESETS.length - 1); setInputTokens(Math.max(0, Number(e.target.value))); }}
              className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-ink-50 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-sm"
            />
            <p className="text-xs text-ink-400 mt-1">≈ {Math.round(inputTokens / 0.75)} words</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Output tokens per call</label>
            <input
              type="number"
              min={0}
              value={outputTokens}
              onChange={(e) => { setPreset(PRESETS.length - 1); setOutputTokens(Math.max(0, Number(e.target.value))); }}
              className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-ink-50 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-sm"
            />
            <p className="text-xs text-ink-400 mt-1">≈ {Math.round(outputTokens / 0.75)} words</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">API calls per day</label>
            <input
              type="number"
              min={1}
              value={callsPerDay}
              onChange={(e) => setCallsPerDay(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-ink-50 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-sm"
            />
            <p className="text-xs text-ink-400 mt-1">{(callsPerDay * 30).toLocaleString()} calls/month</p>
          </div>
        </div>

        {/* Filter + sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["All", ...PROVIDERS].map((p) => (
              <button
                key={p}
                onClick={() => setActiveProvider(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  activeProvider === p
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-ink-600 border-ink-200 hover:border-brand-400"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-500 font-medium">Sort:</span>
            <button
              onClick={() => setSortBy("cost")}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${sortBy === "cost" ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-600 border-ink-200 hover:border-brand-400"}`}
            >
              Cheapest first
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${sortBy === "name" ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-600 border-ink-200 hover:border-brand-400"}`}
            >
              Name
            </button>
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="bg-white rounded-3xl shadow-card-lg border border-ink-100 overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink-50 border-b border-ink-100">
                <th className="text-left px-5 py-4 font-semibold text-ink-600 text-xs uppercase tracking-wide">Model</th>
                <th className="text-right px-5 py-4 font-semibold text-ink-600 text-xs uppercase tracking-wide">Per Call</th>
                <th className="text-right px-5 py-4 font-semibold text-ink-600 text-xs uppercase tracking-wide hidden sm:table-cell">Daily</th>
                <th className="text-right px-5 py-4 font-semibold text-ink-600 text-xs uppercase tracking-wide">Monthly</th>
                <th className="text-right px-5 py-4 font-semibold text-ink-600 text-xs uppercase tracking-wide hidden md:table-cell">vs Cheapest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {filtered.map((model, idx) => {
                const daily = model.singleCost * callsPerDay;
                const monthly = daily * 30;
                const ratio = cheapest > 0 ? model.singleCost / cheapest : 1;
                const isFirst = idx === 0;

                return (
                  <tr key={model.name} className={`hover:bg-ink-50/50 transition-colors ${isFirst ? "bg-brand-50/40" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-ink-900">{model.name}</span>
                            {model.badge && (
                              <span className="text-[10px] font-bold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                                {model.badge}
                              </span>
                            )}
                            {isFirst && sortBy === "cost" && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                Cheapest
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-ink-400">{model.provider} · {model.contextWindow} ctx</span>
                          <span className="text-xs text-ink-400 hidden lg:block">{model.notes}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-semibold text-ink-800">
                      {formatCost(model.singleCost)}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-ink-600 hidden sm:table-cell">
                      {formatCost(daily)}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-semibold text-ink-800">
                      {formatCost(monthly)}
                    </td>
                    <td className="px-5 py-4 text-right hidden md:table-cell">
                      {ratio <= 1.01 ? (
                        <span className="text-xs font-bold text-emerald-600">baseline</span>
                      ) : (
                        <span className="text-xs text-ink-500">{ratio.toFixed(1)}× more</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-ink-50 border-t border-ink-100 text-xs text-ink-400">
          Prices are per 1M tokens from public pricing pages as of April 2026. Cached/batch discounts not included. Always verify with provider pricing pages.
        </div>
      </div>

      {/* Pricing reference */}
      <div className="bg-white rounded-3xl shadow-card border border-ink-100 p-6 mb-10">
        <h2 className="font-bold text-ink-900 mb-4">Price Reference (per 1M tokens)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100">
                <th className="text-left pb-3 font-semibold text-ink-600 text-xs uppercase tracking-wide">Model</th>
                <th className="text-right pb-3 font-semibold text-ink-600 text-xs uppercase tracking-wide">Input / 1M</th>
                <th className="text-right pb-3 font-semibold text-ink-600 text-xs uppercase tracking-wide">Output / 1M</th>
                <th className="text-right pb-3 font-semibold text-ink-600 text-xs uppercase tracking-wide hidden sm:table-cell">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {MODELS.filter((m) => activeProvider === "All" || m.provider === m.provider).map((model) => (
                <tr key={model.name} className="hover:bg-ink-50/50">
                  <td className="py-3">
                    <span className="font-medium text-ink-800">{model.name}</span>
                    <span className="text-ink-400 text-xs ml-2">{model.provider}</span>
                  </td>
                  <td className="py-3 text-right font-mono text-ink-700">${model.inputPer1M.toFixed(model.inputPer1M < 1 ? 3 : 2)}</td>
                  <td className="py-3 text-right font-mono text-ink-700">${model.outputPer1M.toFixed(model.outputPer1M < 1 ? 3 : 2)}</td>
                  <td className="py-3 text-right text-ink-500 hidden sm:table-cell">{model.contextWindow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center my-8">
        <AdSlot slot="9988776655" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Guide */}
      <section className="prose-content mb-12">
        <h2>How to Use the AI Model Pricing Calculator</h2>
        <p>
          AI API costs depend on two things: how many tokens you send (input) and how many tokens the model generates (output). Output tokens typically cost 4–10× more than input tokens, so optimizing your output length has a bigger impact than reducing context.
        </p>
        <h3>What is a token?</h3>
        <p>
          A token is roughly ¾ of a word in English. "Hello, world!" is about 4 tokens. A 1,500-word blog post is approximately 2,000 tokens. Use the word-count hints below each input field to estimate.
        </p>
        <h3>Tips to reduce API costs</h3>
        <ul>
          <li><strong>Use a smaller model for simple tasks.</strong> GPT-4o mini or Claude Haiku handle most classification, extraction, and chat tasks at 10–50× lower cost than frontier models.</li>
          <li><strong>Use prompt caching.</strong> Most providers offer cached input discounts (50–90% off) for repeated system prompts or documents. Use it for RAG and assistant applications.</li>
          <li><strong>Limit output length.</strong> Add "Reply in 3 sentences or less" or "Be concise" to prompts when you don't need long responses.</li>
          <li><strong>Batch API requests.</strong> OpenAI and Anthropic offer 50% discounts for async batch processing when real-time response isn't needed.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ink-900 mb-6">FAQ</h2>
        <div className="space-y-6">
          {[
            { q: "Are these prices accurate?", a: "Prices are sourced from public API pricing pages as of April 2026. AI pricing changes frequently — always verify current rates directly with the provider before building production budgets." },
            { q: "Does this include free tiers?", a: "No. This calculator shows pay-as-you-go API pricing. Most providers offer free trial credits, but production workloads quickly exhaust them. The calculator assumes standard API pricing." },
            { q: "What's not included in the calculation?", a: "Prompt caching discounts, batch API discounts (typically 50% off), volume discounts for enterprise agreements, and any provider-specific credits. Your actual cost may be lower if you use these features." },
            { q: "How do I convert words to tokens?", a: "A rough rule: 1 token ≈ 0.75 English words, or 4 characters. A 1,000-word document is about 1,333 tokens. Non-English languages, code, and special characters may use more tokens per word." },
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

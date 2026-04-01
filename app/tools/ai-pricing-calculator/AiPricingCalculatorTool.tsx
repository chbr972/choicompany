"use client";

import { useState } from "react";

interface AiModel {
  id: string;
  name: string;
  provider: string;
  inputPricePerM: number;  // $ per million input tokens
  outputPricePerM: number; // $ per million output tokens
  contextWindow: string;
  notes: string;
  badge?: string;
  badgeColor?: string;
}

const AI_MODELS: AiModel[] = [
  // OpenAI
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", inputPricePerM: 2.50, outputPricePerM: 10.00, contextWindow: "128K", notes: "Best overall for most tasks", badge: "Popular", badgeColor: "bg-blue-100 text-blue-700" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI", inputPricePerM: 0.15, outputPricePerM: 0.60, contextWindow: "128K", notes: "Fast and cheap for simple tasks", badge: "Best Value", badgeColor: "bg-emerald-100 text-emerald-700" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", inputPricePerM: 10.00, outputPricePerM: 30.00, contextWindow: "128K", notes: "High performance, higher cost" },
  { id: "o1", name: "o1", provider: "OpenAI", inputPricePerM: 15.00, outputPricePerM: 60.00, contextWindow: "200K", notes: "Advanced reasoning tasks", badge: "Reasoning", badgeColor: "bg-purple-100 text-purple-700" },
  { id: "o1-mini", name: "o1-mini", provider: "OpenAI", inputPricePerM: 3.00, outputPricePerM: 12.00, contextWindow: "128K", notes: "Affordable reasoning model" },
  // Anthropic
  { id: "claude-opus-4", name: "Claude Opus 4", provider: "Anthropic", inputPricePerM: 15.00, outputPricePerM: 75.00, contextWindow: "200K", notes: "Most capable Claude model", badge: "Most Capable", badgeColor: "bg-amber-100 text-amber-700" },
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic", inputPricePerM: 3.00, outputPricePerM: 15.00, contextWindow: "200K", notes: "Best balance of speed and quality", badge: "Popular", badgeColor: "bg-blue-100 text-blue-700" },
  { id: "claude-haiku-4", name: "Claude Haiku 4", provider: "Anthropic", inputPricePerM: 0.80, outputPricePerM: 4.00, contextWindow: "200K", notes: "Fastest and most affordable Claude" },
  // Google
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google", inputPricePerM: 1.25, outputPricePerM: 5.00, contextWindow: "1M+", notes: "Massive context window" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "Google", inputPricePerM: 0.075, outputPricePerM: 0.30, contextWindow: "1M+", notes: "Ultra low cost, huge context", badge: "Cheapest", badgeColor: "bg-emerald-100 text-emerald-700" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", inputPricePerM: 0.10, outputPricePerM: 0.40, contextWindow: "1M+", notes: "Fast and capable" },
  // Meta
  { id: "llama-3-70b", name: "Llama 3.3 70B", provider: "Meta (via API)", inputPricePerM: 0.23, outputPricePerM: 0.40, contextWindow: "128K", notes: "Open-source, low inference cost" },
  { id: "llama-3-8b", name: "Llama 3.1 8B", provider: "Meta (via API)", inputPricePerM: 0.06, outputPricePerM: 0.06, contextWindow: "128K", notes: "Extremely cheap open-source" },
  // Mistral
  { id: "mistral-large", name: "Mistral Large 2", provider: "Mistral", inputPricePerM: 2.00, outputPricePerM: 6.00, contextWindow: "128K", notes: "Strong European alternative" },
  { id: "mistral-small", name: "Mistral Small", provider: "Mistral", inputPricePerM: 0.20, outputPricePerM: 0.60, contextWindow: "32K", notes: "Affordable, good for tasks" },
];

const PROVIDERS = ["All", "OpenAI", "Anthropic", "Google", "Meta (via API)", "Mistral"];

const USE_CASE_PRESETS = [
  { label: "Simple Q&A", inputTokens: 500, outputTokens: 300 },
  { label: "Short email", inputTokens: 300, outputTokens: 200 },
  { label: "Blog post", inputTokens: 1000, outputTokens: 2000 },
  { label: "Code generation", inputTokens: 800, outputTokens: 1500 },
  { label: "Document analysis", inputTokens: 8000, outputTokens: 1500 },
  { label: "Long document (RAG)", inputTokens: 50000, outputTokens: 2000 },
];

function calcCost(model: AiModel, inputTokens: number, outputTokens: number, calls: number): number {
  const inputCost = (inputTokens / 1_000_000) * model.inputPricePerM * calls;
  const outputCost = (outputTokens / 1_000_000) * model.outputPricePerM * calls;
  return inputCost + outputCost;
}

function formatCost(cost: number): string {
  if (cost < 0.00001) return "< $0.00001";
  if (cost < 0.001) return `$${cost.toFixed(6)}`;
  if (cost < 0.01) return `$${cost.toFixed(5)}`;
  if (cost < 1) return `$${cost.toFixed(4)}`;
  if (cost < 100) return `$${cost.toFixed(2)}`;
  return `$${cost.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function AiPricingCalculatorTool() {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [callsPerMonth, setCallsPerMonth] = useState(1000);
  const [selectedProvider, setSelectedProvider] = useState("All");
  const [sortBy, setSortBy] = useState<"cost" | "name">("cost");

  const filteredModels = AI_MODELS
    .filter((m) => selectedProvider === "All" || m.provider === selectedProvider)
    .map((m) => ({
      ...m,
      perCallCost: calcCost(m, inputTokens, outputTokens, 1),
      monthlyCost: calcCost(m, inputTokens, outputTokens, callsPerMonth),
    }))
    .sort((a, b) => sortBy === "cost" ? a.monthlyCost - b.monthlyCost : a.name.localeCompare(b.name));

  const cheapest = filteredModels[0];
  const mostExpensive = filteredModels[filteredModels.length - 1];

  function handlePreset(preset: { inputTokens: number; outputTokens: number }) {
    setInputTokens(preset.inputTokens);
    setOutputTokens(preset.outputTokens);
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Presets */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-2">
          Quick Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {USE_CASE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePreset(preset)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                inputTokens === preset.inputTokens && outputTokens === preset.outputTokens
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-ink-600 border-ink-200 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            Input Tokens per Call
          </label>
          <input
            type="number"
            min="1"
            max="1000000"
            value={inputTokens}
            onChange={(e) => setInputTokens(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
          <p className="text-xs text-ink-400 mt-1">≈ {Math.round(inputTokens * 0.75).toLocaleString()} words</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            Output Tokens per Call
          </label>
          <input
            type="number"
            min="1"
            max="100000"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
          <p className="text-xs text-ink-400 mt-1">≈ {Math.round(outputTokens * 0.75).toLocaleString()} words</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            API Calls per Month
          </label>
          <input
            type="number"
            min="1"
            max="10000000"
            value={callsPerMonth}
            onChange={(e) => setCallsPerMonth(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
          <p className="text-xs text-ink-400 mt-1">{callsPerMonth.toLocaleString()} requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5 pb-5 border-b border-ink-200">
        <div className="flex-1 min-w-[160px]">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          >
            {PROVIDERS.map((p) => <option key={p} value={p}>{p === "All" ? "All providers" : p}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("cost")}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${sortBy === "cost" ? "bg-ink-800 text-white border-ink-800" : "bg-white text-ink-600 border-ink-200 hover:border-ink-400"}`}
          >
            Sort by cost
          </button>
          <button
            onClick={() => setSortBy("name")}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${sortBy === "name" ? "bg-ink-800 text-white border-ink-800" : "bg-white text-ink-600 border-ink-200 hover:border-ink-400"}`}
          >
            Sort by name
          </button>
        </div>
      </div>

      {/* Summary cards */}
      {filteredModels.length > 1 && (
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Cheapest Option</p>
            <p className="font-bold text-ink-900">{cheapest.name}</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCost(cheapest.monthlyCost)}<span className="text-sm font-normal text-ink-400">/mo</span></p>
            <p className="text-xs text-ink-400">{formatCost(cheapest.perCallCost)} per call</p>
          </div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-4">
            <p className="text-xs font-bold text-ink-400 uppercase tracking-wide mb-1">Most Expensive</p>
            <p className="font-bold text-ink-900">{mostExpensive.name}</p>
            <p className="text-2xl font-bold text-ink-600">{formatCost(mostExpensive.monthlyCost)}<span className="text-sm font-normal text-ink-400">/mo</span></p>
            <p className="text-xs text-ink-400">
              {mostExpensive.monthlyCost > 0
                ? `${Math.round(mostExpensive.monthlyCost / cheapest.monthlyCost)}× more than cheapest`
                : "—"}
            </p>
          </div>
        </div>
      )}

      {/* Model table */}
      <div className="space-y-2">
        {filteredModels.map((m, idx) => {
          const isCheapest = idx === 0 && sortBy === "cost";
          const savingsVsCheapest = cheapest && m.monthlyCost > cheapest.monthlyCost
            ? ((m.monthlyCost - cheapest.monthlyCost) / cheapest.monthlyCost * 100).toFixed(0)
            : null;
          const maxCost = mostExpensive?.monthlyCost || 1;
          const barWidth = maxCost > 0 ? Math.max(2, (m.monthlyCost / maxCost) * 100) : 2;

          return (
            <div
              key={m.id}
              className={`rounded-xl border p-4 transition-colors ${
                isCheapest
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-ink-200 bg-white hover:border-brand-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-bold text-ink-900 text-sm">{m.name}</span>
                    {m.badge && (
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${m.badgeColor}`}>
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-400">{m.provider} · {m.contextWindow} context · {m.notes}</p>
                  <div className="mt-2 h-1.5 bg-ink-100 rounded-full overflow-hidden w-full max-w-[200px]">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${isCheapest ? "bg-emerald-500" : "bg-brand-400"}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xl font-bold ${isCheapest ? "text-emerald-600" : "text-ink-900"}`}>
                    {formatCost(m.monthlyCost)}
                  </p>
                  <p className="text-xs text-ink-400">/month</p>
                  <p className="text-xs text-ink-400 mt-0.5">{formatCost(m.perCallCost)}/call</p>
                  {savingsVsCheapest && (
                    <p className="text-xs text-red-400 font-semibold mt-0.5">+{savingsVsCheapest}% vs cheapest</p>
                  )}
                </div>
              </div>

              {/* Per-token pricing */}
              <div className="mt-3 pt-2 border-t border-ink-100 grid grid-cols-2 gap-2 text-xs text-ink-400">
                <span>Input: <strong className="text-ink-600">${m.inputPricePerM.toFixed(2)}</strong> / 1M tokens</span>
                <span>Output: <strong className="text-ink-600">${m.outputPricePerM.toFixed(2)}</strong> / 1M tokens</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-ink-400 mt-4 leading-relaxed">
        * Prices shown are approximate and based on publicly available API pricing as of early 2026. Verify current rates on each provider&apos;s official pricing page before making budget decisions. Prices for open-source models (Llama) reflect typical inference API costs.
      </p>
    </div>
  );
}

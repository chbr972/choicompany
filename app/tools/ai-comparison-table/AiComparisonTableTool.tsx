"use client";

import { useState } from "react";
import Link from "next/link";

const PRESET_TOOLS: Record<string, Record<string, string>> = {
  ChatGPT: {
    Developer: "OpenAI",
    "Free Tier": "✅ GPT-4o (limited)",
    "Paid Plan": "$20/mo (Plus)",
    "Context Window": "128K tokens",
    "Image Generation": "✅ DALL-E 3",
    "Web Search": "✅",
    "Code Execution": "✅",
    API: "✅",
    "Best For": "All-around, coding, plugins",
  },
  Claude: {
    Developer: "Anthropic",
    "Free Tier": "✅ Claude 3.5 Haiku",
    "Paid Plan": "$20/mo (Pro)",
    "Context Window": "200K tokens",
    "Image Generation": "❌",
    "Web Search": "✅",
    "Code Execution": "✅",
    API: "✅",
    "Best For": "Long documents, writing quality",
  },
  Gemini: {
    Developer: "Google",
    "Free Tier": "✅ Gemini 1.5 Flash",
    "Paid Plan": "$19.99/mo (Advanced)",
    "Context Window": "1M tokens",
    "Image Generation": "✅ Imagen 3",
    "Web Search": "✅ Native",
    "Code Execution": "✅",
    API: "✅",
    "Best For": "Google Workspace, multimodal",
  },
  Midjourney: {
    Developer: "Midjourney, Inc.",
    "Free Tier": "❌",
    "Paid Plan": "$10/mo (Basic)",
    "Context Window": "N/A",
    "Image Generation": "✅ Best-in-class",
    "Web Search": "❌",
    "Code Execution": "❌",
    API: "❌",
    "Best For": "AI art, creative images",
  },
  Perplexity: {
    Developer: "Perplexity AI",
    "Free Tier": "✅",
    "Paid Plan": "$20/mo (Pro)",
    "Context Window": "N/A",
    "Image Generation": "✅ (Pro)",
    "Web Search": "✅ Core feature",
    "Code Execution": "❌",
    API: "✅",
    "Best For": "Research, cited answers",
  },
  Copilot: {
    Developer: "Microsoft",
    "Free Tier": "✅",
    "Paid Plan": "Included in M365",
    "Context Window": "N/A",
    "Image Generation": "✅ Designer",
    "Web Search": "✅",
    "Code Execution": "✅ (IDE)",
    API: "✅",
    "Best For": "Microsoft 365, productivity",
  },
};

const ALL_FEATURES = [
  "Developer",
  "Free Tier",
  "Paid Plan",
  "Context Window",
  "Image Generation",
  "Web Search",
  "Code Execution",
  "API",
  "Best For",
];

const TOOL_NAMES = Object.keys(PRESET_TOOLS);

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 inline">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400 inline">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
    </svg>
  );
}

function renderCell(value: string) {
  if (value === "✅" || value.startsWith("✅")) {
    return (
      <span>
        <CheckIcon /> {value.replace("✅", "").trim() || null}
      </span>
    );
  }
  if (value === "❌" || value.startsWith("❌")) {
    return (
      <span>
        <XIcon /> {value.replace("❌", "").trim() || null}
      </span>
    );
  }
  return value;
}

export default function AiComparisonTableTool() {
  const [selectedTools, setSelectedTools] = useState<string[]>(["ChatGPT", "Claude"]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(ALL_FEATURES);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  function toggleTool(name: string) {
    setSelectedTools((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : prev.length < 4
        ? [...prev, name]
        : prev
    );
    setGenerated(false);
  }

  function toggleFeature(feat: string) {
    setSelectedFeatures((prev) =>
      prev.includes(feat)
        ? prev.filter((f) => f !== feat)
        : [...prev, feat]
    );
    setGenerated(false);
  }

  function handleGenerate() {
    if (selectedTools.length < 2) return;
    setGenerated(true);
    setCopied(false);
  }

  function buildTextTable() {
    const cols = selectedTools;
    const rows = selectedFeatures.filter((f) => f !== "Developer");
    let out = `| Feature | ${cols.join(" | ")} |\n`;
    out += `| --- | ${cols.map(() => "---").join(" | ")} |\n`;
    for (const feat of rows) {
      const cells = cols.map((tool) => {
        const v = PRESET_TOOLS[tool]?.[feat] ?? "N/A";
        return v;
      });
      out += `| ${feat} | ${cells.join(" | ")} |\n`;
    }
    return out;
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildTextTable());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const features = selectedFeatures;

  return (
    <div className="p-6 sm:p-8">
      {/* Tool selector */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-2">
          Select AI Tools to Compare{" "}
          <span className="text-ink-300 font-normal">(choose 2–4)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TOOL_NAMES.map((name) => {
            const selected = selectedTools.includes(name);
            const disabled = !selected && selectedTools.length >= 4;
            return (
              <button
                key={name}
                onClick={() => toggleTool(name)}
                disabled={disabled}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  selected
                    ? "bg-brand-600 text-white border-brand-600"
                    : disabled
                    ? "bg-ink-50 text-ink-300 border-ink-200 cursor-not-allowed"
                    : "bg-white text-ink-700 border-ink-200 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-2">
          Features to Include
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_FEATURES.map((feat) => {
            const selected = selectedFeatures.includes(feat);
            return (
              <button
                key={feat}
                onClick={() => toggleFeature(feat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected
                    ? "bg-ink-800 text-white border-ink-800"
                    : "bg-white text-ink-500 border-ink-200 hover:border-ink-400"
                }`}
              >
                {feat}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={selectedTools.length < 2}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm2.25-.75a.75.75 0 0 0-.75.75v.085l8.25 4.95 8.25-4.95V5.25a.75.75 0 0 0-.75-.75H3.25Zm14.75 2.69-8.25 4.95-8.25-4.95v7.56c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V7.19Z" clipRule="evenodd" />
        </svg>
        Build Comparison Table
      </button>

      {/* Generated table */}
      {generated && (
        <div className="mt-8 pt-6 border-t border-ink-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-ink-500 uppercase tracking-wide">
              Comparison Table
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                    <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                  </svg>
                  Copy as Markdown
                </>
              )}
            </button>
          </div>

          {/* Responsive table wrapper */}
          <div className="overflow-x-auto rounded-xl border border-ink-200">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink-50 border-b border-ink-200">
                  <th className="text-left px-4 py-3 font-bold text-ink-700 min-w-[140px]">
                    Feature
                  </th>
                  {selectedTools.map((tool) => (
                    <th key={tool} className="text-left px-4 py-3 font-bold text-ink-900 min-w-[130px]">
                      <div className="text-base">{tool}</div>
                      {selectedFeatures.includes("Developer") && (
                        <div className="text-[10px] font-normal text-ink-400">
                          {PRESET_TOOLS[tool]?.Developer}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features
                  .filter((f) => f !== "Developer")
                  .map((feat, i) => (
                    <tr
                      key={feat}
                      className={`border-b border-ink-100 last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-ink-50/50"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-ink-600 text-xs uppercase tracking-wide">
                        {feat}
                      </td>
                      {selectedTools.map((tool) => {
                        const val = PRESET_TOOLS[tool]?.[feat] ?? "N/A";
                        return (
                          <td key={tool} className="px-4 py-3 text-ink-700">
                            {renderCell(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* CTA to full reviews */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedTools.map((tool) => {
              const slug = tool.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={tool}
                  href={`/tools/${slug}-review`}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2 transition-colors"
                >
                  Full {tool} review →
                </Link>
              );
            })}
            <Link
              href="/compare"
              className="text-xs font-semibold text-ink-400 hover:text-ink-600 underline underline-offset-2 transition-colors ml-auto"
            >
              See all comparisons →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

const MAX_CHARS = 10000;

const SUMMARY_LENGTHS = [
  { value: "brief", label: "Brief", description: "1–2 sentences" },
  { value: "standard", label: "Standard", description: "3–5 sentences" },
  { value: "detailed", label: "Detailed", description: "7–10 sentences" },
];

const SUMMARY_FORMATS = [
  { value: "paragraph", label: "Paragraph" },
  { value: "bullets", label: "Bullet Points" },
  { value: "both", label: "Paragraph + Bullets" },
];

function extractSentences(text: string): string[] {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

function scoreByPosition(sentences: string[], total: number): number[] {
  return sentences.map((_, i) => {
    const positionScore = i === 0 ? 1 : i === 1 ? 0.8 : i < total * 0.15 ? 0.7 : 0.4;
    return positionScore;
  });
}

function buildSummary(
  text: string,
  length: string,
  format: string
): { paragraph: string; bullets: string[] } {
  const sentences = extractSentences(text);
  if (sentences.length === 0) return { paragraph: "", bullets: [] };

  const targetCount = length === "brief" ? 2 : length === "standard" ? 4 : 8;
  const scores = scoreByPosition(sentences, sentences.length);

  const ranked = sentences
    .map((s, i) => ({ s, score: scores[i], i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, Math.min(targetCount, sentences.length))
    .sort((a, b) => a.i - b.i)
    .map((x) => x.s);

  const paragraph = ranked.join(" ");

  const bulletCount = length === "brief" ? 3 : length === "standard" ? 5 : 8;
  const bullets = sentences
    .slice(0, Math.min(bulletCount * 2, sentences.length))
    .filter((s) => s.length > 30)
    .slice(0, bulletCount);

  return { paragraph, bullets };
}

export default function AiTextSummarizerTool() {
  const [inputText, setInputText] = useState("");
  const [summaryLength, setSummaryLength] = useState("standard");
  const [summaryFormat, setSummaryFormat] = useState("both");
  const [result, setResult] = useState<{ paragraph: string; bullets: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  function handleSummarize() {
    if (!inputText.trim() || charCount > MAX_CHARS) return;
    setLoading(true);
    setTimeout(() => {
      const summary = buildSummary(inputText, summaryLength, summaryFormat);
      setResult(summary);
      setCopied(false);
      setLoading(false);
    }, 700);
  }

  function buildCopyText() {
    if (!result) return "";
    if (summaryFormat === "paragraph") return result.paragraph;
    if (summaryFormat === "bullets") return result.bullets.map((b) => `• ${b}`).join("\n");
    return `${result.paragraph}\n\nKey Points:\n${result.bullets.map((b) => `• ${b}`).join("\n")}`;
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildCopyText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClear() {
    setInputText("");
    setResult(null);
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Text input */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-ink-600 uppercase tracking-wide">
            Paste Your Text <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-3 text-xs text-ink-400">
            <span>{wordCount.toLocaleString()} words</span>
            <span
              className={
                charCount > MAX_CHARS
                  ? "text-red-500 font-semibold"
                  : charCount > MAX_CHARS * 0.85
                  ? "text-amber-500"
                  : ""
              }
            >
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
            </span>
            {inputText && (
              <button
                onClick={handleClear}
                className="text-ink-400 hover:text-red-500 transition-colors font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setResult(null);
          }}
          rows={9}
          placeholder="Paste an article, essay, report, email, or any text here…"
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-800 placeholder-ink-300 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition leading-relaxed"
        />
        {charCount > MAX_CHARS && (
          <p className="text-xs text-red-500 mt-1">
            Text exceeds {MAX_CHARS.toLocaleString()} character limit. Please shorten your input.
          </p>
        )}
      </div>

      {/* Options */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {/* Length */}
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-2">
            Summary Length
          </label>
          <div className="flex gap-2">
            {SUMMARY_LENGTHS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSummaryLength(opt.value)}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  summaryLength === opt.value
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-ink-600 border-ink-200 hover:border-brand-300"
                }`}
              >
                <div>{opt.label}</div>
                <div className={`text-[10px] font-normal mt-0.5 ${summaryLength === opt.value ? "text-brand-100" : "text-ink-400"}`}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-2">
            Output Format
          </label>
          <div className="flex gap-2">
            {SUMMARY_FORMATS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSummaryFormat(opt.value)}
                className={`flex-1 py-2 px-2 rounded-lg border text-xs font-semibold transition-all ${
                  summaryFormat === opt.value
                    ? "bg-ink-800 text-white border-ink-800"
                    : "bg-white text-ink-600 border-ink-200 hover:border-ink-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSummarize}
        disabled={!inputText.trim() || charCount > MAX_CHARS || loading}
        className="w-full sm:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Summarizing…
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 10.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
            </svg>
            Summarize Text
          </>
        )}
      </button>

      {/* Output */}
      {result && (
        <div className="mt-6 pt-6 border-t border-ink-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-ink-500 uppercase tracking-wide">
              Summary
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
                  Copy Summary
                </>
              )}
            </button>
          </div>

          <div className="space-y-5">
            {(summaryFormat === "paragraph" || summaryFormat === "both") && result.paragraph && (
              <div>
                {summaryFormat === "both" && (
                  <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">
                    Summary
                  </p>
                )}
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-sm text-ink-700 leading-relaxed">
                  {result.paragraph}
                </div>
              </div>
            )}

            {(summaryFormat === "bullets" || summaryFormat === "both") && result.bullets.length > 0 && (
              <div>
                {summaryFormat === "both" && (
                  <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">
                    Key Points
                  </p>
                )}
                <div className="bg-ink-50 border border-ink-200 rounded-xl p-4">
                  <ul className="space-y-2">
                    {result.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-500 shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import AdSlot from "@/components/AdSlot";

function extractiveSummarize(text: string, numSentences: number): string {
  // Split into sentences
  const sentences = text
    .replace(/\n+/g, " ")
    .match(/[^.!?]+[.!?]+/g) ?? [];

  if (sentences.length <= numSentences) return text.trim();

  // Score sentences by word frequency (TF)
  const words = text.toLowerCase().match(/\b\w{4,}\b/g) ?? [];
  const freq: Record<string, number> = {};
  for (const w of words) freq[w] = (freq[w] ?? 0) + 1;

  const stopWords = new Set(["that", "this", "with", "from", "have", "will", "been", "were", "they", "their", "what", "when", "where", "which", "would", "could", "should", "about", "more", "also", "than", "then", "into", "just", "each", "very", "some", "many", "most", "over", "after", "before", "because", "through"]);
  const scored = sentences.map((sentence, idx) => {
    const sWords = sentence.toLowerCase().match(/\b\w{4,}\b/g) ?? [];
    const score = sWords
      .filter((w) => !stopWords.has(w))
      .reduce((sum, w) => sum + (freq[w] ?? 0), 0) / Math.max(sWords.length, 1);
    return { sentence: sentence.trim(), score, idx };
  });

  // Always include first sentence, pick top-scoring remaining
  const first = scored[0];
  const rest = scored.slice(1).sort((a, b) => b.score - a.score).slice(0, numSentences - 1);
  const selected = [first, ...rest].sort((a, b) => a.idx - b.idx);

  return selected.map((s) => s.sentence).join(" ");
}

const LENGTH_OPTIONS = [
  { label: "Short (2–3 sentences)", value: 3 },
  { label: "Medium (4–5 sentences)", value: 5 },
  { label: "Long (7–8 sentences)", value: 8 },
];

export default function TextSummarizerPage() {
  const [input, setInput] = useState("");
  const [length, setLength] = useState(5);
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function handleSummarize() {
    const trimmed = input.trim();
    if (!trimmed) { setError("Please paste some text first."); return; }
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 30) { setError("Text is too short to summarize. Paste at least 30 words."); return; }
    setError("");
    const result = extractiveSummarize(trimmed, length);
    setSummary(result);
  }

  function handleCopy() {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Free Tool
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
          AI Text Summarizer
        </h1>
        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl">
          Paste any text and get a concise summary instantly. Works entirely in your browser — no data sent to any server.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-card-lg border border-ink-100 p-8 mb-10">
        {/* Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-ink-700">Paste your text</label>
            <span className="text-xs text-ink-400">{wordCount} words</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste an article, document, or any long text here…"
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-ink-50 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-y text-sm leading-relaxed"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Length picker */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-ink-700 mb-3 block">Summary length</label>
          <div className="flex flex-wrap gap-3">
            {LENGTH_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLength(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  length === opt.value
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-ink-600 border-ink-200 hover:border-brand-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSummarize}
          disabled={!input.trim()}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Summarize Text
        </button>

        {/* Output */}
        {summary && (
          <div className="mt-8 pt-8 border-t border-ink-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-ink-900">Summary</h2>
              <button
                onClick={handleCopy}
                className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-ink-100 text-ink-600 hover:bg-brand-100 hover:text-brand-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
              <p className="text-ink-700 leading-relaxed">{summary}</p>
            </div>
            <p className="mt-3 text-xs text-ink-400">
              {summary.split(/\s+/).length} words — {Math.round((summary.split(/\s+/).length / Math.max(wordCount, 1)) * 100)}% of original
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center my-8">
        <AdSlot slot="6655443322" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Guide */}
      <section className="prose-content mb-12">
        <h2>How Does the AI Text Summarizer Work?</h2>
        <p>
          This tool uses extractive summarization — a technique that identifies and extracts the most
          important sentences from your text without changing them. It works by scoring each sentence
          based on word frequency: sentences that contain words used repeatedly throughout the text
          are considered more central to the meaning.
        </p>
        <p>
          Unlike abstractive summarization (which generates new sentences, like ChatGPT), extractive
          summarization is fast, deterministic, requires no API calls, and never distorts the meaning
          of the original text. Your data stays entirely in your browser.
        </p>
        <h3>When to use this tool</h3>
        <ul>
          <li>Quickly grasp the key points of a long article or report</li>
          <li>Create TL;DR versions of documents for colleagues</li>
          <li>Review research papers before reading in full</li>
          <li>Condense meeting transcripts or notes</li>
        </ul>
        <h3>For longer summaries, try ChatGPT or Claude</h3>
        <p>
          For abstractive summaries (rewritten in new words), nuanced tone, or structured bullet-point summaries,
          paste your text into <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a> or
          ChatGPT with a prompt like: <em>"Summarize the following in 5 bullet points, focusing on actionable insights."</em>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ink-900 mb-6">FAQ</h2>
        <div className="space-y-6">
          {[
            { q: "Is my text stored or sent anywhere?", a: "No. The summarizer runs entirely in your browser using JavaScript. Your text never leaves your device — there are no API calls and no data storage." },
            { q: "What types of text work best?", a: "Articles, blog posts, research papers, reports, and essays work best. Very short texts (under 30 words) or highly structured lists may not summarize well." },
            { q: "Why is the summary sometimes imperfect?", a: "Extractive summarization picks the best sentences but doesn't rewrite them. If the original text is poorly structured, the summary may feel disjointed. For those cases, paste the extractive summary into Claude or ChatGPT and ask it to 'clean up and rewrite this summary.'" },
            { q: "How is this different from ChatGPT summarization?", a: "ChatGPT generates new sentences (abstractive), which can sound more natural but occasionally introduces errors or changes meaning. This tool only picks existing sentences from your text, so it never fabricates information." },
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

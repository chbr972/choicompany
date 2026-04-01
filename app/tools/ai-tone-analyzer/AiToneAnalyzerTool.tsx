"use client";

import { useState } from "react";

const MAX_CHARS = 5000;

interface ToneResult {
  primary: string;
  primaryEmoji: string;
  primaryScore: number;
  breakdown: { tone: string; score: number; color: string }[];
  suggestions: string[];
  readability: string;
  wordCount: number;
  sentenceCount: number;
  avgSentenceLength: number;
}

const TONE_PROFILES: {
  name: string;
  emoji: string;
  color: string;
  keywords: string[];
  patterns: RegExp[];
}[] = [
  {
    name: "Formal",
    emoji: "🎩",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    keywords: [
      "furthermore", "therefore", "consequently", "hereby", "pursuant",
      "notwithstanding", "aforementioned", "heretofore", "whereas", "shall",
      "thereof", "wherein", "henceforth", "accordingly", "respectively",
    ],
    patterns: [/\b(it is|there is|there are|one must|one should)\b/gi],
  },
  {
    name: "Casual",
    emoji: "😊",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    keywords: [
      "hey", "yeah", "gonna", "wanna", "kinda", "sorta", "pretty much",
      "like", "basically", "honestly", "cool", "awesome", "stuff", "things",
      "totally", "literally", "actually", "anyway", "anyways", "btw",
    ],
    patterns: [/\b(you know|i mean|i guess|no worries|that's|it's|can't|won't|don't)\b/gi],
  },
  {
    name: "Persuasive",
    emoji: "💡",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    keywords: [
      "must", "should", "need", "crucial", "essential", "critical", "vital",
      "proven", "guaranteed", "best", "top", "leading", "powerful", "transform",
      "immediately", "now", "today", "free", "exclusive", "limited", "act",
    ],
    patterns: [/\b(you (should|must|need|will|can|deserve)|don't miss|imagine|think about|consider)\b/gi],
  },
  {
    name: "Technical",
    emoji: "⚙️",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    keywords: [
      "implement", "framework", "algorithm", "function", "parameter", "variable",
      "optimize", "architecture", "infrastructure", "deployment", "configuration",
      "interface", "integration", "protocol", "endpoint", "latency", "bandwidth",
    ],
    patterns: [/\b(api|sdk|ui|ux|cpu|gpu|http|html|css|json|xml|sql)\b/gi],
  },
  {
    name: "Empathetic",
    emoji: "❤️",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    keywords: [
      "understand", "feel", "support", "help", "care", "concern", "appreciate",
      "sorry", "thank", "grateful", "hope", "together", "share", "listen",
      "compassion", "empathy", "journey", "experience", "challenge", "struggle",
    ],
    patterns: [/\b(i (understand|feel|know|hear)|we('re| are) (here|with)|you('re| are) not alone)\b/gi],
  },
  {
    name: "Confident",
    emoji: "💪",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    keywords: [
      "will", "definitely", "certainly", "absolutely", "clearly", "obviously",
      "without doubt", "undeniably", "proven", "fact", "know", "confident",
      "achieve", "succeed", "deliver", "ensure", "guarantee",
    ],
    patterns: [/\b(i (will|know|am sure|guarantee)|we (will|guarantee|ensure|deliver))\b/gi],
  },
];

function analyzeTone(text: string): ToneResult {
  const lower = text.toLowerCase();
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 5);
  const wordCount = words.length;
  const sentenceCount = sentences.length || 1;
  const avgSentenceLength = Math.round(wordCount / sentenceCount);

  // Readability level
  const readability =
    avgSentenceLength <= 10
      ? "Very Easy"
      : avgSentenceLength <= 15
      ? "Easy"
      : avgSentenceLength <= 20
      ? "Moderate"
      : avgSentenceLength <= 28
      ? "Complex"
      : "Very Complex";

  // Score each tone
  const scores = TONE_PROFILES.map((profile) => {
    let score = 0;
    for (const kw of profile.keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      const matches = lower.match(regex);
      if (matches) score += matches.length * 2;
    }
    for (const pattern of profile.patterns) {
      const matches = text.match(pattern);
      if (matches) score += matches.length * 3;
    }
    return { tone: profile.name, rawScore: score };
  });

  const totalRaw = scores.reduce((s, x) => s + x.rawScore, 0) || 1;
  const breakdown = scores
    .map((s, i) => ({
      tone: s.tone,
      score: Math.round((s.rawScore / totalRaw) * 100),
      color: TONE_PROFILES[i].color,
    }))
    .sort((a, b) => b.score - a.score);

  const topTone = breakdown[0];
  const primaryProfile = TONE_PROFILES.find((p) => p.name === topTone.tone)!;

  // Generate targeted suggestions
  const suggestions: string[] = [];
  if (topTone.tone === "Formal" && topTone.score > 30) {
    suggestions.push("Consider simplifying complex vocabulary if addressing a general audience.");
    suggestions.push("Break up long sentences to improve readability.");
  }
  if (topTone.tone === "Casual" && topTone.score > 30) {
    suggestions.push("Replace informal contractions and slang for a more professional tone.");
    suggestions.push("Use complete sentences and avoid filler phrases like 'basically' or 'literally'.");
  }
  if (topTone.tone === "Persuasive" && topTone.score > 30) {
    suggestions.push("Back persuasive claims with specific data or evidence.");
    suggestions.push("Ensure urgency language feels genuine, not manipulative.");
  }
  if (topTone.tone === "Technical" && topTone.score > 30) {
    suggestions.push("Define technical jargon if writing for non-expert readers.");
    suggestions.push("Add context around acronyms on first use.");
  }
  if (avgSentenceLength > 25) {
    suggestions.push("Your sentences average " + avgSentenceLength + " words — try splitting long sentences for clarity.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Your writing has a balanced tone. Great for general audiences.");
    suggestions.push("Continue using this style for clear, effective communication.");
  }

  return {
    primary: topTone.tone,
    primaryEmoji: primaryProfile.emoji,
    primaryScore: topTone.score,
    breakdown,
    suggestions,
    readability,
    wordCount,
    sentenceCount,
    avgSentenceLength,
  };
}

export default function AiToneAnalyzerTool() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<ToneResult | null>(null);
  const [loading, setLoading] = useState(false);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  function handleAnalyze() {
    if (!inputText.trim() || charCount > MAX_CHARS) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeTone(inputText));
      setLoading(false);
    }, 600);
  }

  function handleClear() {
    setInputText("");
    setResult(null);
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Input */}
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
          placeholder="Paste an email, blog post, essay, or any writing to analyze its tone…"
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-800 placeholder-ink-300 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition leading-relaxed"
        />
        {charCount > MAX_CHARS && (
          <p className="text-xs text-red-500 mt-1">
            Text exceeds {MAX_CHARS.toLocaleString()} character limit. Please shorten your input.
          </p>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!inputText.trim() || charCount > MAX_CHARS || loading}
        className="w-full sm:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Analyzing…
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
            </svg>
            Analyze Tone
          </>
        )}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 pt-6 border-t border-ink-200 space-y-6">
          {/* Primary tone */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-50 border border-brand-100">
            <span className="text-3xl">{result.primaryEmoji}</span>
            <div>
              <p className="text-xs font-bold text-ink-400 uppercase tracking-wide mb-0.5">Primary Tone</p>
              <p className="text-2xl font-bold text-ink-900">{result.primary}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-brand-600">{result.primaryScore}%</p>
              <p className="text-xs text-ink-400">dominant</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Words", value: result.wordCount.toLocaleString() },
              { label: "Sentences", value: result.sentenceCount.toLocaleString() },
              { label: "Avg Sentence", value: `${result.avgSentenceLength} words` },
              { label: "Readability", value: result.readability },
            ].map((stat) => (
              <div key={stat.label} className="bg-ink-50 border border-ink-200 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-ink-900">{stat.value}</p>
                <p className="text-xs text-ink-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tone breakdown */}
          <div>
            <p className="text-xs font-bold text-ink-500 uppercase tracking-wide mb-3">Tone Breakdown</p>
            <div className="space-y-2">
              {result.breakdown.map((t) => (
                <div key={t.tone} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-ink-600 w-20 shrink-0">{t.tone}</span>
                  <div className="flex-1 bg-ink-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-brand-500 transition-all duration-500"
                      style={{ width: `${t.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-ink-500 w-8 text-right">{t.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-xs font-bold text-ink-500 uppercase tracking-wide mb-3">Suggestions</p>
            <ul className="space-y-2">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500 shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                  </svg>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

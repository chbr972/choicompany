"use client";

import { useState } from "react";
import AdSlot from "@/components/AdSlot";

interface ToneResult {
  label: string;
  score: number;
  color: string;
  description: string;
}

interface Analysis {
  tones: ToneResult[];
  dominant: string;
  readability: string;
  suggestions: string[];
  wordCount: number;
  avgSentenceLen: number;
}

function analyzeTone(text: string): Analysis {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const words = text.toLowerCase().match(/\b\w+\b/g) ?? [];
  const wordCount = words.length;
  const avgSentenceLen = Math.round(wordCount / Math.max(sentences.length, 1));

  // Vocabulary sets for tone detection
  const formalWords = new Set([
    "therefore", "furthermore", "consequently", "nevertheless", "accordingly",
    "moreover", "thus", "hence", "whereas", "pursuant", "herein", "aforementioned",
    "subsequent", "endeavor", "utilize", "facilitate", "implement", "indicate",
    "demonstrate", "constitute", "regarding", "pertaining", "establish", "conduct",
    "require", "obtain", "provide", "ensure", "significant", "considerable",
    "comprehensive", "substantial", "appropriate", "sufficient", "necessary",
  ]);
  const casualWords = new Set([
    "awesome", "cool", "great", "hey", "yeah", "yep", "nope", "gonna", "wanna",
    "gotta", "kinda", "sorta", "stuff", "thing", "things", "lot", "lots", "super",
    "totally", "literally", "basically", "honestly", "actually", "really", "very",
    "just", "like", "okay", "ok", "so", "well", "anyway", "btw", "omg", "lol",
  ]);
  const persuasiveWords = new Set([
    "must", "should", "need", "essential", "critical", "crucial", "vital",
    "important", "key", "best", "proven", "guarantee", "imagine", "discover",
    "transform", "powerful", "effective", "ultimate", "exclusive", "limited",
    "opportunity", "now", "today", "free", "boost", "improve", "achieve", "success",
    "result", "benefit", "advantage", "solution", "strategy", "tip",
  ]);
  const emotionalWords = new Set([
    "love", "hate", "fear", "joy", "happy", "sad", "angry", "excited", "afraid",
    "wonderful", "terrible", "amazing", "horrible", "beautiful", "ugly", "passionate",
    "thrilling", "devastating", "heartbreaking", "inspiring", "disappointing",
    "frustrated", "delighted", "worried", "proud", "ashamed", "grateful", "furious",
  ]);
  const confidentWords = new Set([
    "will", "definitely", "certainly", "clearly", "obviously", "undoubtedly",
    "always", "never", "absolutely", "guarantee", "proven", "fact", "evidence",
    "research", "study", "shows", "demonstrates", "confirms", "verifies",
  ]);
  const tentativeWords = new Set([
    "maybe", "perhaps", "might", "could", "possibly", "seem", "appears", "suggest",
    "likely", "probably", "sometimes", "often", "generally", "typically", "usually",
    "tend", "somewhat", "relatively", "fairly", "rather",
  ]);

  function scoreSet(set: Set<string>): number {
    const matches = words.filter((w) => set.has(w)).length;
    return Math.min(100, Math.round((matches / Math.max(wordCount, 1)) * 400));
  }

  const formalScore = scoreSet(formalWords);
  const casualScore = scoreSet(casualWords);
  const persuasiveScore = scoreSet(persuasiveWords);
  const emotionalScore = scoreSet(emotionalWords);
  const confidentScore = scoreSet(confidentWords);
  const tentativeScore = scoreSet(tentativeWords);

  // Readability (Flesch-Kincaid approximation)
  const syllableCount = words.reduce((sum, w) => {
    const s = w.replace(/[^aeiouy]/gi, "").length;
    return sum + Math.max(1, s);
  }, 0);
  const fk = 206.835 - 1.015 * avgSentenceLen - 84.6 * (syllableCount / Math.max(wordCount, 1));
  let readability = "Very Easy";
  if (fk < 30) readability = "Very Difficult";
  else if (fk < 50) readability = "Difficult";
  else if (fk < 60) readability = "Fairly Difficult";
  else if (fk < 70) readability = "Standard";
  else if (fk < 80) readability = "Fairly Easy";
  else if (fk < 90) readability = "Easy";

  // Normalize formal/casual as opposing ends
  const totalFC = formalScore + casualScore + 1;
  const normalizedFormal = Math.round((formalScore / totalFC) * 100);
  const normalizedCasual = Math.round((casualScore / totalFC) * 100);

  const tones: ToneResult[] = [
    {
      label: "Formal",
      score: normalizedFormal,
      color: "brand",
      description: "Professional, structured language with precise vocabulary.",
    },
    {
      label: "Casual",
      score: normalizedCasual,
      color: "green",
      description: "Relaxed, conversational tone with everyday language.",
    },
    {
      label: "Persuasive",
      score: Math.min(100, persuasiveScore),
      color: "orange",
      description: "Language designed to influence or convince the reader.",
    },
    {
      label: "Emotional",
      score: Math.min(100, emotionalScore),
      color: "red",
      description: "Expressive language that evokes feelings and reactions.",
    },
    {
      label: "Confident",
      score: Math.min(100, confidentScore),
      color: "purple",
      description: "Assertive, direct statements that convey certainty.",
    },
    {
      label: "Tentative",
      score: Math.min(100, tentativeScore),
      color: "yellow",
      description: "Hedging language that qualifies or softens claims.",
    },
  ];

  // Dominant tone
  const dominant = tones.reduce((a, b) => (a.score > b.score ? a : b)).label;

  // Suggestions
  const suggestions: string[] = [];
  if (avgSentenceLen > 25) suggestions.push("Your sentences average " + avgSentenceLen + " words — consider breaking long sentences into shorter ones for clarity.");
  if (avgSentenceLen < 8) suggestions.push("Very short sentences create a choppy feel. Mix in some longer, more complex sentences.");
  if (normalizedFormal > 60 && casualScore > 10) suggestions.push("You're mixing formal and casual vocabulary — pick one register for a consistent voice.");
  if (confidentScore > 30 && tentativeScore > 20) suggestions.push("You're alternating between confident and tentative language. Choose a consistent level of certainty.");
  if (emotionalScore > 40) suggestions.push("High emotional language detected — make sure it's intentional and appropriate for your audience.");
  if (persuasiveScore > 40) suggestions.push("Strong persuasive markers detected. Ensure your claims are backed by evidence to maintain credibility.");
  if (suggestions.length === 0) suggestions.push("Tone is consistent and well-balanced for general-purpose writing.");

  return { tones, dominant, readability, suggestions, wordCount, avgSentenceLen };
}

const COLOR_MAP: Record<string, { bar: string; badge: string }> = {
  brand: { bar: "bg-brand-500", badge: "bg-brand-100 text-brand-700" },
  green: { bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
  orange: { bar: "bg-orange-500", badge: "bg-orange-50 text-orange-700" },
  red: { bar: "bg-rose-500", badge: "bg-rose-50 text-rose-700" },
  purple: { bar: "bg-violet-500", badge: "bg-violet-50 text-violet-700" },
  yellow: { bar: "bg-amber-400", badge: "bg-amber-50 text-amber-700" },
};

export default function ToneAnalyzerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState("");

  function handleAnalyze() {
    const trimmed = input.trim();
    if (!trimmed) { setError("Please paste some text first."); return; }
    const wc = trimmed.split(/\s+/).length;
    if (wc < 20) { setError("Text is too short. Paste at least 20 words for a meaningful analysis."); return; }
    setError("");
    setResult(analyzeTone(trimmed));
  }

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Free Tool
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
          AI Writing Tone Analyzer
        </h1>
        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl">
          Paste any text and instantly see its tone — formal, casual, persuasive, emotional, confident, or tentative. Runs in your browser, 100% private.
        </p>
      </div>

      {/* Tool Card */}
      <div className="bg-white rounded-3xl shadow-card-lg border border-ink-100 p-8 mb-10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-ink-700">Paste your text</label>
            <span className="text-xs text-ink-400">{wordCount} words</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste an email, essay, social post, or any writing you want to analyze…"
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-ink-50 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-y text-sm leading-relaxed"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!input.trim()}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze Tone
        </button>

        {/* Results */}
        {result && (
          <div className="mt-10 pt-8 border-t border-ink-100">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Dominant Tone", value: result.dominant },
                { label: "Readability", value: result.readability },
                { label: "Avg Sentence", value: `${result.avgSentenceLen} words` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-brand-50 rounded-2xl p-4 text-center border border-brand-100">
                  <div className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">{label}</div>
                  <div className="text-lg font-bold text-ink-900">{value}</div>
                </div>
              ))}
            </div>

            {/* Tone bars */}
            <h2 className="font-bold text-ink-900 mb-4">Tone Breakdown</h2>
            <div className="space-y-4 mb-8">
              {result.tones.map((tone) => {
                const colors = COLOR_MAP[tone.color];
                return (
                  <div key={tone.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-ink-800">{tone.label}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                          {tone.score}%
                        </span>
                      </div>
                      <span className="text-xs text-ink-400 max-w-xs text-right hidden sm:block">{tone.description}</span>
                    </div>
                    <div className="h-2.5 bg-ink-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
                        style={{ width: `${tone.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggestions */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="font-bold text-ink-900 mb-3 flex items-center gap-2">
                <span className="text-amber-500">✦</span> Writing Suggestions
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-ink-700 flex gap-2">
                    <span className="text-amber-500 shrink-0 mt-0.5">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center my-8">
        <AdSlot slot="7766554433" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Guide */}
      <section className="prose-content mb-12">
        <h2>How Does the Tone Analyzer Work?</h2>
        <p>
          This tool uses a vocabulary-based approach to detect six writing tones: formal, casual, persuasive,
          emotional, confident, and tentative. It scans your text for words and phrases characteristic of each
          tone style, then calculates a score for each dimension based on their frequency.
        </p>
        <p>
          It also calculates a Flesch-Kincaid readability score, which estimates how easy your text is to read
          based on sentence length and syllable density. Everything runs in your browser — no text is sent to
          any server.
        </p>
        <h3>When to use this tool</h3>
        <ul>
          <li>Check if a cover letter sounds too casual or too stiff</li>
          <li>Verify marketing copy strikes the right persuasive balance</li>
          <li>Audit academic writing for unintentional emotional language</li>
          <li>Compare tone consistency across multiple drafts</li>
          <li>Ensure blog posts match your brand voice guidelines</li>
        </ul>
        <h3>Improving your writing based on results</h3>
        <p>
          Use the tone breakdown as a mirror, not a grade. A high emotional score isn't bad in a fundraising
          email — but it might undermine a technical report. The goal is intentional tone that matches your
          audience and purpose. After analyzing, paste your text into
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"> Claude</a> with a prompt like:
          <em> "Rewrite this to sound more formal without losing the core message."</em>
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ink-900 mb-6">FAQ</h2>
        <div className="space-y-6">
          {[
            {
              q: "Is my text stored or sent anywhere?",
              a: "No. The analysis runs entirely in your browser using JavaScript. Your text never leaves your device — there are no API calls, no data storage, and no tracking.",
            },
            {
              q: "How accurate is the tone detection?",
              a: "The tool uses lexical analysis (vocabulary matching) which is fast and privacy-safe but less nuanced than AI-based sentiment models. It works best on longer texts (100+ words). Short texts may show uneven scores due to small sample size.",
            },
            {
              q: "What does readability mean?",
              a: "Readability is based on the Flesch Reading Ease formula, which measures sentence length and word complexity. 'Standard' (60–70) suits most audiences. 'Difficult' (below 50) is better for academic or legal writing. 'Easy' (above 70) works for blogs and social media.",
            },
            {
              q: "Can I use this for SEO content?",
              a: "Yes. Search engines value content that matches reader intent. Use this tool to verify that informational content reads clearly, that product pages strike the right persuasive tone, and that your brand voice stays consistent across pages.",
            },
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

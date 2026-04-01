"use client";

import { useState } from "react";

const AI_TARGETS = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "midjourney", label: "Midjourney" },
  { value: "gemini", label: "Gemini" },
  { value: "dall-e", label: "DALL-E 3" },
  { value: "general", label: "Any AI" },
];

const TASK_TYPES = [
  { value: "writing", label: "Writing & Content" },
  { value: "coding", label: "Code & Development" },
  { value: "research", label: "Research & Analysis" },
  { value: "image", label: "Image Generation" },
  { value: "summarize", label: "Summarization" },
  { value: "brainstorm", label: "Brainstorming" },
  { value: "email", label: "Email & Communication" },
  { value: "other", label: "Other" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "creative", label: "Creative" },
  { value: "technical", label: "Technical" },
  { value: "concise", label: "Concise" },
];

function buildPrompt(
  aiTarget: string,
  taskType: string,
  goal: string,
  tone: string,
  extras: string
): string {
  const targetLabel = AI_TARGETS.find((t) => t.value === aiTarget)?.label ?? "the AI";
  const toneLabel = TONES.find((t) => t.value === tone)?.label?.toLowerCase() ?? "professional";

  const rolePrefix: Record<string, string> = {
    writing: "You are an expert content writer and editor.",
    coding: "You are a senior software engineer with deep expertise across multiple languages.",
    research: "You are a thorough research analyst who cites evidence and considers multiple perspectives.",
    image: "",
    summarize: "You are a skilled analyst who extracts key insights concisely.",
    brainstorm: "You are a creative strategist who generates diverse, actionable ideas.",
    email: "You are a professional communications expert.",
    other: "",
  };

  const role = rolePrefix[taskType] ?? "";

  let prompt = "";

  if (taskType === "image") {
    prompt = `Create a ${toneLabel} image of: ${goal}.`;
    if (extras) prompt += ` Additional requirements: ${extras}.`;
    if (aiTarget === "midjourney") {
      prompt += " --ar 16:9 --stylize 750 --v 6";
    }
    return prompt;
  }

  if (role) {
    prompt += `${role}\n\n`;
  }

  prompt += `Task: ${goal}\n\n`;
  prompt += `Tone: ${toneLabel}\n\n`;

  const formatInstructions: Record<string, string> = {
    writing: "Format the output with clear headings, short paragraphs, and engaging language. Include a compelling introduction and conclusion.",
    coding: "Provide clean, well-commented code with explanations for key decisions. Include usage examples.",
    research: "Structure your response with an executive summary, key findings, supporting evidence, and a recommendation.",
    summarize: "Provide a 3-5 sentence summary capturing the core message, then list 3-5 key takeaways as bullet points.",
    brainstorm: "Generate 10 distinct ideas with a brief explanation for each. Prioritize variety and originality.",
    email: "Write in a clear, concise style. Include a subject line suggestion, greeting, body, and sign-off.",
    other: "Organize your response clearly with headings where appropriate.",
  };

  const format = formatInstructions[taskType] ?? "";
  if (format) prompt += `Instructions: ${format}\n\n`;

  if (extras) {
    prompt += `Additional context: ${extras}\n\n`;
  }

  if (aiTarget === "claude") {
    prompt += "Please think through this carefully before responding.";
  } else if (aiTarget === "chatgpt") {
    prompt += "Be specific and actionable.";
  }

  return prompt.trim();
}

export default function AiPromptGeneratorTool() {
  const [aiTarget, setAiTarget] = useState("chatgpt");
  const [taskType, setTaskType] = useState("writing");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("professional");
  const [extras, setExtras] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!goal.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const result = buildPrompt(aiTarget, taskType, goal.trim(), tone, extras.trim());
      setGenerated(result);
      setCopied(false);
      setLoading(false);
    }, 600);
  }

  async function handleCopy() {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* AI Target */}
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            AI Tool
          </label>
          <select
            value={aiTarget}
            onChange={(e) => setAiTarget(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          >
            {AI_TARGETS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Task type */}
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            Task Type
          </label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          >
            {TASK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
          What do you want to accomplish? <span className="text-red-400">*</span>
        </label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          placeholder="e.g. Write a blog post about the benefits of AI for small businesses"
          className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 placeholder-ink-300 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {/* Tone */}
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          >
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Extras */}
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            Additional Context <span className="text-ink-300 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={extras}
            onChange={(e) => setExtras(e.target.value)}
            placeholder="e.g. target audience, length, format..."
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!goal.trim() || loading}
        className="w-full sm:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Generating…
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Generate Prompt
          </>
        )}
      </button>

      {/* Output */}
      {generated && (
        <div className="mt-6 pt-6 border-t border-ink-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-ink-500 uppercase tracking-wide">
              Your Optimized Prompt
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
                  Copy Prompt
                </>
              )}
            </button>
          </div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-4 text-sm text-ink-700 whitespace-pre-wrap leading-relaxed font-mono">
            {generated}
          </div>
        </div>
      )}
    </div>
  );
}

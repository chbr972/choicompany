"use client";

import { useState } from "react";
import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";

const PROMPTS: Record<string, Record<string, string[]>> = {
  Writing: {
    "Blog Post": [
      "Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include an engaging introduction, 5 main sections with subheadings, practical examples, and a clear conclusion with a call-to-action. Target word count: 1500 words.",
      "Create a listicle blog post titled '10 [TOPIC] Tips That Actually Work'. Make each tip actionable, include a brief explanation and one real-world example for each. Write in a conversational, friendly tone.",
      "Write a 'beginner's guide to [TOPIC]' blog post. Assume the reader knows nothing. Break it down into clear steps, define any jargon, and end with a 'next steps' section.",
      "Draft a controversial take on [TOPIC] that challenges conventional wisdom. Support your argument with data points and counterarguments. Make it thought-provoking but fair.",
      "Write a case study blog post about how someone used [TOPIC] to achieve [RESULT]. Include the problem, the approach, the result, and key takeaways.",
    ],
    "Email Copy": [
      "Write a cold email to [RECIPIENT TYPE] introducing my [PRODUCT/SERVICE]. Keep it under 150 words, focus on one pain point, and end with a low-commitment CTA like scheduling a 15-minute call.",
      "Write a welcome email sequence (3 emails) for new subscribers to my [NEWSLETTER/PRODUCT]. Email 1: welcome + what to expect. Email 2: your best content/tip. Email 3: social proof + soft pitch.",
      "Create a re-engagement email for subscribers who haven't opened in 90 days. Subject line included. Make it personal, acknowledge the silence, and offer value to bring them back.",
      "Write a promotional email for [PRODUCT] that doesn't feel salesy. Lead with a story or insight, weave in the benefits naturally, and include a clear but not pushy CTA.",
    ],
    "Social Media": [
      "Write 5 LinkedIn posts about [TOPIC] that would perform well with [TARGET AUDIENCE]. Each should be under 300 words, start with a hook, include 1-2 insights, and end with a question to drive comments.",
      "Create a Twitter/X thread (8-10 tweets) that breaks down [COMPLEX TOPIC] in simple terms. Start with a bold claim, build the argument tweet by tweet, end with a summary and follow CTA.",
      "Write 7 Instagram caption ideas for [BRAND/NICHE]. Mix educational, inspirational, and behind-the-scenes styles. Include relevant hashtag suggestions for each.",
    ],
  },
  Coding: {
    "Code Review": [
      "Review this [LANGUAGE] code for potential bugs, performance issues, and best practices violations. Suggest specific improvements and explain why each change matters:\n\n[PASTE CODE HERE]",
      "Analyze this code and explain what it does in plain English, as if explaining to a junior developer. Then identify any security vulnerabilities and suggest fixes:\n\n[PASTE CODE HERE]",
      "Refactor this code to follow [LANGUAGE] best practices and design patterns. Show the before and after, and explain each change:\n\n[PASTE CODE HERE]",
    ],
    "Debugging": [
      "I'm getting this error: [ERROR MESSAGE]. My code is: [PASTE CODE]. Explain what's causing the error, provide the fix, and tell me how to prevent this type of error in the future.",
      "My [LANGUAGE] function isn't returning the expected output. Expected: [EXPECTED]. Actual: [ACTUAL]. Code: [PASTE CODE]. Debug this step by step.",
      "This code works but is very slow. Profile it conceptually and suggest optimizations. Explain the time complexity before and after:\n\n[PASTE CODE HERE]",
    ],
    "Documentation": [
      "Write comprehensive documentation for this function/class including: description, parameters with types, return values, exceptions thrown, and 3 usage examples:\n\n[PASTE CODE HERE]",
      "Create a README.md for this project. Include: project overview, installation steps, configuration options, usage examples, API reference, and contributing guidelines. Tech stack: [LIST STACK]",
    ],
    "Architecture": [
      "I need to build a [SYSTEM DESCRIPTION]. Suggest an architecture using [TECH STACK]. Include: component breakdown, data flow diagram (as text), database schema, and API endpoints.",
      "Compare and contrast using [OPTION A] vs [OPTION B] for [USE CASE]. Evaluate on: performance, scalability, developer experience, cost, and maintenance. Give a recommendation.",
    ],
  },
  Marketing: {
    "Ad Copy": [
      "Write 5 Facebook ad variations for [PRODUCT/SERVICE] targeting [AUDIENCE]. Include headline (40 chars), primary text (125 chars), and a CTA. Test different angles: pain point, aspiration, social proof, curiosity, and urgency.",
      "Create a Google Ads campaign for [PRODUCT] with: 3 responsive search ad headlines (30 chars each), 2 descriptions (90 chars each), and 5 keywords to target. Focus on high purchase intent.",
      "Write a YouTube ad script for [PRODUCT] that hooks viewers in the first 5 seconds so they don't skip. Include: hook, problem, solution, social proof, offer, CTA. Total length: 60 seconds.",
    ],
    "SEO Content": [
      "Write an SEO-optimized meta title and description for a page about [TOPIC]. Primary keyword: [KEYWORD]. Title: under 60 chars, Description: 150-160 chars. Make them compelling to click.",
      "Create a content brief for an article targeting the keyword '[KEYWORD]'. Include: search intent, outline (H2s and H3s), LSI keywords to include, word count recommendation, and internal linking suggestions.",
      "Write 5 FAQ answers for the topic '[TOPIC]' optimized for featured snippets. Each answer should be 40-60 words, start with a direct answer, then add supporting context.",
    ],
    "Brand Strategy": [
      "Help me write a brand positioning statement for [COMPANY]. We serve [TARGET CUSTOMER] who need [NEED]. Unlike [COMPETITOR], we [DIFFERENTIATION]. Our proof is [EVIDENCE]. Format as a crisp 2-sentence positioning statement.",
      "Generate 10 brand name ideas for a [TYPE OF BUSINESS] that serves [TARGET MARKET]. For each name: explain the meaning/connotation, check if it's likely available as a .com, and rate it 1-10 for memorability.",
    ],
  },
  Productivity: {
    "Planning": [
      "Help me create a 90-day plan to achieve [GOAL]. Break it down into: Month 1 (foundations), Month 2 (execution), Month 3 (optimization). Include weekly milestones and key metrics to track.",
      "Apply the Eisenhower Matrix to this task list and tell me what to do, schedule, delegate, or eliminate:\n\n[PASTE YOUR TASK LIST]",
      "I'm overwhelmed with [SITUATION]. Help me prioritize using the 'one thing' framework. What single action will make everything else easier or unnecessary?",
    ],
    "Meeting & Communication": [
      "Write a meeting agenda for a [MEETING TYPE] meeting. Duration: [X] minutes. Goal: [GOAL]. Participants: [ROLES]. Include time allocations and desired outcomes for each agenda item.",
      "Summarize this meeting transcript into: key decisions made, action items with owners and deadlines, open questions, and next steps:\n\n[PASTE TRANSCRIPT]",
      "Rewrite this email to be more concise and professional. Keep all important information but aim for 50% fewer words:\n\n[PASTE EMAIL]",
    ],
    "Learning": [
      "I want to learn [SKILL/TOPIC] in [TIMEFRAME]. Create a structured learning plan with: recommended resources in order, daily time commitment, milestones to hit, and how to know when I've truly learned it.",
      "Explain [COMPLEX CONCEPT] using the Feynman Technique: simple language a 12-year-old could understand, an analogy to something familiar, and a quick check of understanding at the end.",
    ],
  },
  Research: {
    "Analysis": [
      "Analyze the pros and cons of [TOPIC/DECISION]. Structure it as a table with 5 pros and 5 cons, rate each impact 1-10, and give a weighted recommendation based on [MY PRIORITIES].",
      "Summarize the current state of research on [TOPIC]. What do experts agree on? What's still debated? What are the most important open questions? Cite the types of sources I should look for.",
      "Compare [OPTION A] vs [OPTION B] vs [OPTION C] on these criteria: [LIST CRITERIA]. Present as a scoring matrix and give a final recommendation for [MY USE CASE].",
    ],
    "Literature Review": [
      "Help me find gaps in the research on [TOPIC]. What questions have been under-studied? What methodologies are overused? Suggest 3 research angles that could make a contribution.",
      "Explain the evolution of thinking on [TOPIC] over the last 20 years. Who were the key thinkers, what were the paradigm shifts, and what's the current consensus?",
    ],
  },
  Education: {
    "Lesson Planning": [
      "Create a lesson plan for teaching [TOPIC] to [GRADE/LEVEL] students. Include: learning objectives, warm-up activity (5 min), main instruction (20 min), practice activity (15 min), assessment, and homework.",
      "Design a project-based learning unit on [TOPIC] for [GRADE]. Include: driving question, final project description, 4-week timeline, skills practiced, and assessment rubric.",
    ],
    "Explanations": [
      "Explain [CONCEPT] to a [GRADE/EXPERTISE LEVEL] student. Use: simple language, a real-world analogy, a step-by-step breakdown, and end with a quick comprehension check question.",
      "Create 10 discussion questions about [BOOK/TOPIC] that promote critical thinking. Include 3 factual recall, 4 inference/analysis, and 3 evaluation/synthesis questions.",
      "Design a quiz on [TOPIC] with 10 multiple-choice questions. Each question should have 4 answer choices with one clear correct answer and three plausible distractors. Include an answer key.",
    ],
  },
};

const CATEGORIES = Object.keys(PROMPTS);

export default function PromptGeneratorPage() {
  const [category, setCategory] = useState<string>("");
  const [useCase, setUseCase] = useState<string>("");
  const [copied, setCopied] = useState<number | null>(null);

  const useCases = category ? Object.keys(PROMPTS[category]) : [];
  const prompts = category && useCase ? PROMPTS[category][useCase] : [];

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      {/* SEO metadata is set below via export — this is a client component, so we use a static export */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Free Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-tight tracking-tight">
            AI Prompt Generator
          </h1>
          <p className="text-xl text-ink-500 leading-relaxed max-w-2xl">
            Get optimized, copy-ready prompts for ChatGPT and Claude. Select your category and use case — no sign-up needed.
          </p>
        </div>

        {/* Tool interface */}
        <div className="bg-white rounded-3xl shadow-card-lg border border-ink-100 p-8 mb-10">
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Category select */}
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">
                1. Choose a category
              </label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setUseCase(""); }}
                className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              >
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Use case select */}
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">
                2. Choose a use case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                disabled={!category}
                className="w-full px-4 py-3 rounded-xl border border-ink-300 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select use case…</option>
                {useCases.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Prompts output */}
          {prompts.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-ink-900">
                {prompts.length} prompts for {category} → {useCase}
              </h2>
              {prompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="relative group bg-ink-50 rounded-2xl p-5 border border-ink-100 hover:border-brand-300 transition-colors"
                >
                  <p className="text-ink-700 text-sm leading-relaxed pr-20 font-mono whitespace-pre-wrap">
                    {prompt}
                  </p>
                  <button
                    onClick={() => handleCopy(prompt, idx)}
                    className="absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-600 transition-colors"
                  >
                    {copied === idx ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-ink-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-3 opacity-40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <p className="font-medium">Select a category and use case to generate prompts</p>
            </div>
          )}
        </div>

        {/* Ad */}
        <div className="flex justify-center my-8">
          <AdSlot slot="4433221100" format="leaderboard" className="w-full max-w-[728px]" />
        </div>

        {/* How to use guide */}
        <section className="prose-content mb-12">
          <h2>How to Use the AI Prompt Generator</h2>
          <p>
            A great prompt is the difference between a mediocre AI response and one that saves you hours of work.
            This tool gives you battle-tested prompt templates across six categories: Writing, Coding, Marketing,
            Productivity, Research, and Education.
          </p>
          <h3>Tips for getting the best results</h3>
          <ol>
            <li><strong>Replace placeholders:</strong> Anywhere you see [BRACKETS], replace with your specific details. The more specific, the better the AI output.</li>
            <li><strong>Start with the template, then customize:</strong> Add context about your audience, tone, constraints, or format preferences.</li>
            <li><strong>Iterate:</strong> If the first response isn't perfect, ask the AI to "revise to be more [adjective]" or "give me a version that [specific change]."</li>
            <li><strong>Use in ChatGPT or Claude:</strong> Both work well with these prompts. Claude tends to excel at nuanced writing; ChatGPT is great for structured outputs.</li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Are these prompts free to use?",
                a: "Yes, completely free. Copy any prompt and use it in ChatGPT, Claude, Gemini, or any other AI tool without restriction.",
              },
              {
                q: "Which AI model works best with these prompts?",
                a: "All prompts are designed to work with any modern large language model. ChatGPT (GPT-4) and Claude excel at most tasks. For coding prompts, GitHub Copilot Chat or Claude tend to give more precise results.",
              },
              {
                q: "Can I modify the prompts?",
                a: "Absolutely — and you should. The templates are starting points. Add your specific context, audience details, or format requirements to get better, more tailored results.",
              },
              {
                q: "Why are there placeholders like [TOPIC] in the prompts?",
                a: "Placeholders mark where you should insert your specific information. Generic prompts give generic results — replacing [TOPIC] with your actual topic gives the AI the context it needs to produce relevant, useful output.",
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
    </>
  );
}

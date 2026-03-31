"use client";

import { useState, useMemo } from "react";
import AdSlot from "@/components/AdSlot";

interface Prompt {
  id: number;
  category: string;
  useCase: string;
  title: string;
  prompt: string;
  tags: string[];
}

const PROMPTS: Prompt[] = [
  // Writing — Blog
  { id: 1, category: "Writing", useCase: "Blog", title: "SEO Blog Post", prompt: "Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include an engaging introduction, 5 main sections with subheadings, practical examples, and a conclusion with a CTA. Target word count: 1500 words.", tags: ["seo", "blog", "content"] },
  { id: 2, category: "Writing", useCase: "Blog", title: "Listicle", prompt: "Create a listicle blog post titled '10 [TOPIC] Tips That Actually Work'. Make each tip actionable with a brief explanation and one real-world example. Tone: conversational and friendly.", tags: ["listicle", "tips", "blog"] },
  { id: 3, category: "Writing", useCase: "Blog", title: "Beginner's Guide", prompt: "Write a beginner's guide to [TOPIC]. Assume the reader knows nothing. Break it into clear steps, define all jargon, and end with a 'next steps' section pointing to deeper resources.", tags: ["beginner", "guide", "educational"] },
  { id: 4, category: "Writing", useCase: "Blog", title: "Controversial Take", prompt: "Write a thought-provoking opinion piece challenging the conventional wisdom on [TOPIC]. Support your argument with data and acknowledge the strongest counterarguments. Tone: bold but fair.", tags: ["opinion", "controversial", "thought leadership"] },
  { id: 5, category: "Writing", useCase: "Blog", title: "Case Study", prompt: "Write a case study about how [PERSON/COMPANY] used [APPROACH] to achieve [RESULT]. Structure: problem → approach → result → key takeaways. Include specific numbers and quotes.", tags: ["case study", "results", "storytelling"] },
  // Writing — Email
  { id: 6, category: "Writing", useCase: "Email", title: "Cold Outreach", prompt: "Write a cold email to [RECIPIENT TYPE] introducing my [PRODUCT/SERVICE]. Under 150 words. Focus on one specific pain point. CTA: schedule a 15-minute call. No buzzwords.", tags: ["cold email", "outreach", "sales"] },
  { id: 7, category: "Writing", useCase: "Email", title: "Welcome Sequence", prompt: "Write a 3-email welcome sequence for new subscribers to [NEWSLETTER/PRODUCT]. Email 1: warm welcome + what to expect. Email 2: your single best tip or insight. Email 3: social proof + soft pitch.", tags: ["welcome", "email sequence", "onboarding"] },
  { id: 8, category: "Writing", useCase: "Email", title: "Re-engagement", prompt: "Write a re-engagement email for subscribers who haven't opened in 90 days. Include the subject line. Start personal, acknowledge the silence, and offer genuine value to bring them back.", tags: ["re-engagement", "churn", "retention"] },
  { id: 9, category: "Writing", useCase: "Email", title: "Promotional", prompt: "Write a promotional email for [PRODUCT] that doesn't feel salesy. Lead with a story or insight, weave in benefits naturally, and include a clear but non-pushy CTA.", tags: ["promo", "sales email", "copywriting"] },
  { id: 10, category: "Writing", useCase: "Email", title: "Follow-up", prompt: "Write a follow-up email to [NAME] after [CONTEXT — e.g., a meeting, a demo, a proposal]. Reference one specific thing discussed. Next step: [ACTION]. Keep it under 100 words.", tags: ["follow-up", "professional", "sales"] },
  // Writing — Social
  { id: 11, category: "Writing", useCase: "Social Media", title: "LinkedIn Posts", prompt: "Write 5 LinkedIn posts about [TOPIC] for [TARGET AUDIENCE]. Each under 300 words. Start with a scroll-stopping hook. Include 1–2 key insights. End with a question to drive comments.", tags: ["linkedin", "b2b", "thought leadership"] },
  { id: 12, category: "Writing", useCase: "Social Media", title: "Twitter Thread", prompt: "Create a Twitter/X thread (8–10 tweets) that breaks down [COMPLEX TOPIC] simply. Start with a bold claim. Build the argument tweet by tweet. End with a TL;DR and follow CTA.", tags: ["twitter", "thread", "viral"] },
  { id: 13, category: "Writing", useCase: "Social Media", title: "Instagram Captions", prompt: "Write 7 Instagram captions for [BRAND/NICHE]. Mix educational, inspirational, and behind-the-scenes styles. Include relevant hashtag clusters (10–15 tags) for each caption.", tags: ["instagram", "caption", "hashtags"] },
  { id: 14, category: "Writing", useCase: "Social Media", title: "YouTube Description", prompt: "Write a YouTube video description for a video about [TOPIC]. Include: hook (first 2 lines before 'more'), key timestamps, 3 relevant links, and a subscribe CTA. Optimize for search with natural keyword use.", tags: ["youtube", "description", "seo"] },
  // Coding — Review
  { id: 15, category: "Coding", useCase: "Code Review", title: "Bug & Best Practices", prompt: "Review this [LANGUAGE] code for bugs, performance issues, and best practice violations. Suggest specific improvements and explain why each change matters:\n\n[PASTE CODE HERE]", tags: ["review", "bugs", "refactor"] },
  { id: 16, category: "Coding", useCase: "Code Review", title: "Security Audit", prompt: "Analyze this code for security vulnerabilities including injection attacks, authentication flaws, and data exposure risks. List each vulnerability with: severity (High/Medium/Low), explanation, and remediation:\n\n[PASTE CODE HERE]", tags: ["security", "audit", "vulnerabilities"] },
  { id: 17, category: "Coding", useCase: "Code Review", title: "Refactor", prompt: "Refactor this code following [LANGUAGE] best practices and SOLID principles. Show before and after, and explain each significant change:\n\n[PASTE CODE HERE]", tags: ["refactor", "clean code", "solid"] },
  // Coding — Debugging
  { id: 18, category: "Coding", useCase: "Debugging", title: "Error Fix", prompt: "I'm getting this error: [ERROR MESSAGE]. My code:\n\n[PASTE CODE]\n\nExplain the root cause, provide the exact fix, and tell me how to prevent this class of error in the future.", tags: ["error", "fix", "debug"] },
  { id: 19, category: "Coding", useCase: "Debugging", title: "Wrong Output", prompt: "My [LANGUAGE] function returns unexpected output.\nExpected: [EXPECTED OUTPUT]\nActual: [ACTUAL OUTPUT]\nCode:\n\n[PASTE CODE]\n\nTrace through the logic step by step and identify the bug.", tags: ["debug", "logic", "testing"] },
  { id: 20, category: "Coding", useCase: "Debugging", title: "Performance", prompt: "This code works but runs slowly on large inputs. Analyze the time and space complexity. Suggest specific optimizations. Show the improved version:\n\n[PASTE CODE HERE]", tags: ["performance", "optimization", "complexity"] },
  // Coding — Architecture
  { id: 21, category: "Coding", useCase: "Architecture", title: "System Design", prompt: "I need to build [SYSTEM DESCRIPTION]. Tech stack: [LIST STACK]. Design the architecture with: component breakdown, data flow, database schema, and key API endpoints. Highlight the most important trade-offs.", tags: ["architecture", "system design", "api"] },
  { id: 22, category: "Coding", useCase: "Architecture", title: "Tech Comparison", prompt: "Compare [OPTION A] vs [OPTION B] for [USE CASE]. Evaluate on: performance, scalability, developer experience, cost, and long-term maintenance. Give a clear recommendation with reasoning.", tags: ["comparison", "tech stack", "decision"] },
  { id: 23, category: "Coding", useCase: "Architecture", title: "API Design", prompt: "Design a RESTful API for [RESOURCE/FEATURE]. Include: endpoint structure, HTTP methods, request/response schemas (JSON), error codes, authentication approach, and rate limiting strategy.", tags: ["api", "rest", "design"] },
  // Coding — Documentation
  { id: 24, category: "Coding", useCase: "Documentation", title: "Function Docs", prompt: "Write full documentation for this function: description, parameters (with types), return value, exceptions, edge cases, and 3 usage examples:\n\n[PASTE CODE HERE]", tags: ["docs", "jsdoc", "comments"] },
  { id: 25, category: "Coding", useCase: "Documentation", title: "README", prompt: "Create a README.md for this project: overview, prerequisites, installation, configuration, usage examples, API reference, contributing guide, and license. Tech stack: [LIST STACK]", tags: ["readme", "open source", "docs"] },
  // Marketing — Ads
  { id: 26, category: "Marketing", useCase: "Ad Copy", title: "Facebook Ads", prompt: "Write 5 Facebook ad variations for [PRODUCT] targeting [AUDIENCE]. For each: headline (40 chars), primary text (125 chars), CTA. Test these angles: pain point, aspiration, social proof, curiosity, urgency.", tags: ["facebook", "paid ads", "copy"] },
  { id: 27, category: "Marketing", useCase: "Ad Copy", title: "Google Ads", prompt: "Create a Google Ads campaign for [PRODUCT]: 3 responsive search ad headlines (30 chars each), 2 descriptions (90 chars each), 5 high-intent keywords. Focus on commercial intent.", tags: ["google ads", "ppc", "sem"] },
  { id: 28, category: "Marketing", useCase: "Ad Copy", title: "YouTube Ad Script", prompt: "Write a YouTube pre-roll ad script for [PRODUCT] that hooks viewers in the first 5 seconds. Structure: hook → problem → solution → social proof → offer → CTA. Length: 60 seconds.", tags: ["youtube", "video script", "advertising"] },
  // Marketing — SEO
  { id: 29, category: "Marketing", useCase: "SEO", title: "Meta Title & Description", prompt: "Write an SEO meta title (under 60 chars) and description (150–160 chars) for a page about [TOPIC]. Primary keyword: [KEYWORD]. Make them compelling to click, not just keyword-stuffed.", tags: ["meta", "seo", "on-page"] },
  { id: 30, category: "Marketing", useCase: "SEO", title: "Content Brief", prompt: "Create a content brief for an article targeting '[KEYWORD]'. Include: search intent, full outline (H2s and H3s), LSI keywords, recommended word count, internal linking opportunities, and competitor gaps.", tags: ["content brief", "seo", "keyword"] },
  { id: 31, category: "Marketing", useCase: "SEO", title: "FAQ Schema", prompt: "Write 5 FAQ answers for '[TOPIC]' optimized for Google featured snippets. Each answer: 40–60 words, start with a direct answer, then add context. Format as JSON-LD FAQ schema.", tags: ["faq", "schema", "featured snippet"] },
  { id: 32, category: "Marketing", useCase: "SEO", title: "Product Description", prompt: "Write an SEO-optimized product description for [PRODUCT NAME]. Include: opening hook, 3 key benefits (not features), who it's for, and a CTA. Primary keyword: [KEYWORD]. Length: 150–200 words.", tags: ["product", "ecommerce", "copy"] },
  // Marketing — Brand
  { id: 33, category: "Marketing", useCase: "Brand Strategy", title: "Positioning Statement", prompt: "Write a brand positioning statement for [COMPANY]. We serve [TARGET CUSTOMER] who need [NEED]. Unlike [COMPETITOR], we [DIFFERENTIATION]. Proof: [EVIDENCE]. Format: 2 crisp sentences.", tags: ["positioning", "brand", "strategy"] },
  { id: 34, category: "Marketing", useCase: "Brand Strategy", title: "Brand Voice Guide", prompt: "Create a brand voice guide for [COMPANY TYPE]. Include: tone description (3 adjectives with explanations), do/don't examples for each, vocabulary to use, vocabulary to avoid, and a sample paragraph in brand voice.", tags: ["brand voice", "tone of voice", "guidelines"] },
  { id: 35, category: "Marketing", useCase: "Brand Strategy", title: "Name Generation", prompt: "Generate 10 brand name ideas for a [TYPE OF BUSINESS] serving [TARGET MARKET]. For each: meaning/connotation, likely .com availability, memorability rating 1–10, and a one-sentence brand story.", tags: ["naming", "branding", "startup"] },
  // Productivity — Planning
  { id: 36, category: "Productivity", useCase: "Planning", title: "90-Day Goal Plan", prompt: "Create a 90-day plan to achieve [GOAL]. Month 1: foundations. Month 2: execution. Month 3: optimization. Include weekly milestones and 3 key metrics to track progress.", tags: ["planning", "goals", "90-day"] },
  { id: 37, category: "Productivity", useCase: "Planning", title: "Eisenhower Matrix", prompt: "Apply the Eisenhower Matrix to this task list. Categorize each task as: Do Now (urgent + important), Schedule (important, not urgent), Delegate (urgent, not important), or Eliminate. Recommend the 3 highest-leverage tasks:\n\n[PASTE TASK LIST]", tags: ["prioritization", "eisenhower", "tasks"] },
  { id: 38, category: "Productivity", useCase: "Planning", title: "Weekly Review", prompt: "Help me do a weekly review. I'll share my wins, incomplete tasks, and next-week priorities. Create: a brief retrospective (what worked, what didn't), a prioritized to-do list for next week, and one focus area.\n\nThis week: [SHARE NOTES]", tags: ["weekly review", "retrospective", "planning"] },
  // Productivity — Communication
  { id: 39, category: "Productivity", useCase: "Communication", title: "Meeting Agenda", prompt: "Write a meeting agenda for a [MEETING TYPE] meeting. Duration: [X] minutes. Goal: [GOAL]. Participants: [ROLES]. Include time allocations and desired outcomes for each agenda item.", tags: ["meeting", "agenda", "facilitation"] },
  { id: 40, category: "Productivity", useCase: "Communication", title: "Email Rewrite", prompt: "Rewrite this email to be more concise and professional. Keep all important information but aim for 50% fewer words. Maintain the original intent and tone:\n\n[PASTE EMAIL]", tags: ["email", "rewrite", "concise"] },
  { id: 41, category: "Productivity", useCase: "Communication", title: "Difficult Message", prompt: "Help me write [a rejection / a critical piece of feedback / a boundary-setting message] to [RECIPIENT]. Tone: direct but respectful. Avoid hedging but don't be harsh. Context: [EXPLAIN SITUATION]", tags: ["difficult conversation", "feedback", "professional"] },
  { id: 42, category: "Productivity", useCase: "Communication", title: "Status Update", prompt: "Write a concise project status update for [STAKEHOLDER/TEAM]. Include: progress since last update, current blockers, next milestones, and any decisions needed. Format as bullet points. Context: [SHARE NOTES]", tags: ["status update", "project management", "stakeholders"] },
  // Productivity — Learning
  { id: 43, category: "Productivity", useCase: "Learning", title: "Learning Roadmap", prompt: "I want to learn [SKILL/TOPIC] in [TIMEFRAME]. Create a structured learning plan: recommended resources in order, daily time commitment, milestone checkpoints, and how to measure mastery.", tags: ["learning", "roadmap", "skill development"] },
  { id: 44, category: "Productivity", useCase: "Learning", title: "Feynman Explanation", prompt: "Explain [COMPLEX CONCEPT] using the Feynman Technique: simple enough for a 12-year-old, an analogy to something familiar, and 3 quick comprehension-check questions at the end.", tags: ["feynman", "explain", "learning"] },
  // Research — Analysis
  { id: 45, category: "Research", useCase: "Analysis", title: "Pros & Cons Table", prompt: "Analyze the pros and cons of [TOPIC/DECISION]. Present as a table with 5 pros and 5 cons, impact rating 1–10 for each, and a weighted recommendation based on [MY PRIORITIES].", tags: ["pros cons", "decision", "analysis"] },
  { id: 46, category: "Research", useCase: "Analysis", title: "Comparison Matrix", prompt: "Compare [OPTION A] vs [OPTION B] vs [OPTION C] on these criteria: [LIST CRITERIA]. Present as a scoring matrix (1–10 per criterion). Give a final recommendation for [MY USE CASE].", tags: ["comparison", "matrix", "decision"] },
  { id: 47, category: "Research", useCase: "Analysis", title: "Literature Summary", prompt: "Summarize the current state of research on [TOPIC]. What do experts agree on? What's actively debated? What are the most important open questions? What types of sources should I look for?", tags: ["research", "literature", "summary"] },
  { id: 48, category: "Research", useCase: "Analysis", title: "SWOT Analysis", prompt: "Perform a SWOT analysis for [COMPANY/PROJECT/IDEA]. For each quadrant (Strengths, Weaknesses, Opportunities, Threats), list 4–5 items with brief explanations. Conclude with the top strategic implication.", tags: ["swot", "strategy", "analysis"] },
  // Research — Investigation
  { id: 49, category: "Research", useCase: "Investigation", title: "Research Gaps", prompt: "Help me find gaps in the research on [TOPIC]. What questions are under-studied? What methodologies are overused? Suggest 3 research angles that could make an original contribution.", tags: ["research gap", "thesis", "academic"] },
  { id: 50, category: "Research", useCase: "Investigation", title: "Devil's Advocate", prompt: "I believe [POSITION]. Play devil's advocate and give me the strongest possible case against my position. Include: the best counterarguments, evidence that contradicts my view, and assumptions I may be making.", tags: ["devil's advocate", "critical thinking", "debate"] },
  // Education
  { id: 51, category: "Education", useCase: "Lesson Planning", title: "Lesson Plan", prompt: "Create a lesson plan for teaching [TOPIC] to [GRADE/LEVEL] students. Include: learning objectives, 5-min warm-up, 20-min instruction, 15-min practice activity, formative assessment, and homework.", tags: ["lesson plan", "teaching", "classroom"] },
  { id: 52, category: "Education", useCase: "Lesson Planning", title: "Project-Based Unit", prompt: "Design a 4-week project-based learning unit on [TOPIC] for [GRADE]. Include: driving question, final deliverable, week-by-week timeline, skills practiced, and a rubric.", tags: ["project-based", "unit plan", "pbl"] },
  { id: 53, category: "Education", useCase: "Assessment", title: "Quiz", prompt: "Create a 10-question multiple-choice quiz on [TOPIC]. Each question: 4 answer choices, one correct answer, three plausible distractors. Include an answer key with brief explanations.", tags: ["quiz", "assessment", "multiple choice"] },
  { id: 54, category: "Education", useCase: "Assessment", title: "Discussion Questions", prompt: "Create 10 discussion questions about [BOOK/TOPIC] that promote critical thinking. Mix: 3 factual recall, 4 inference/analysis, 3 evaluation/synthesis. Include model answers for each.", tags: ["discussion", "critical thinking", "questions"] },
  // AI & Prompting
  { id: 55, category: "AI & Prompting", useCase: "Prompt Engineering", title: "System Prompt", prompt: "Write a system prompt for an AI assistant that acts as [ROLE]. The assistant should: [BEHAVIOR 1], [BEHAVIOR 2], [BEHAVIOR 3]. Always avoid: [RESTRICTION 1], [RESTRICTION 2]. Output format: [FORMAT].", tags: ["system prompt", "ai", "prompt engineering"] },
  { id: 56, category: "AI & Prompting", useCase: "Prompt Engineering", title: "Chain of Thought", prompt: "I need you to solve [PROBLEM]. Before giving the final answer, think through it step by step: first identify what's being asked, then list relevant facts, then reason through the solution, then give your final answer.", tags: ["chain of thought", "reasoning", "problem solving"] },
  { id: 57, category: "AI & Prompting", useCase: "Prompt Engineering", title: "Few-Shot Examples", prompt: "I'm going to show you examples of [INPUT] and the [OUTPUT] I want. Learn the pattern and apply it to new inputs.\n\nExample 1:\nInput: [INPUT 1]\nOutput: [OUTPUT 1]\n\nExample 2:\nInput: [INPUT 2]\nOutput: [OUTPUT 2]\n\nNow apply this to:\nInput: [NEW INPUT]", tags: ["few-shot", "examples", "pattern"] },
  { id: 58, category: "AI & Prompting", useCase: "Prompt Engineering", title: "Persona Prompt", prompt: "You are [EXPERT PERSONA — e.g., a senior growth marketer with 15 years of SaaS experience]. You [KEY TRAIT 1] and [KEY TRAIT 2]. When answering questions, [SPECIFIC BEHAVIOR]. Your first task: [TASK].", tags: ["persona", "role play", "expert"] },
  { id: 59, category: "AI & Prompting", useCase: "Prompt Engineering", title: "Output Formatter", prompt: "Reformat the following content into [FORMAT — e.g., a structured table / numbered list / JSON / bullet-point summary / executive brief]. Keep all key information. Remove filler. Original content:\n\n[PASTE CONTENT]", tags: ["formatting", "structure", "transform"] },
  { id: 60, category: "AI & Prompting", useCase: "Prompt Engineering", title: "Iterative Refinement", prompt: "Here is my draft: [PASTE DRAFT]\n\nPlease: (1) identify the 3 biggest weaknesses, (2) rewrite it addressing those weaknesses, (3) explain what you changed and why.", tags: ["revision", "editing", "iterative"] },
];

const CATEGORIES = Array.from(new Set(PROMPTS.map((p) => p.category)));

export default function PromptLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PROMPTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.useCase.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  function handleCopy(p: Prompt) {
    navigator.clipboard.writeText(p.prompt);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Free Tool · {PROMPTS.length}+ Prompts
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
          AI Prompt Templates Library
        </h1>
        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl">
          Browse and copy battle-tested prompts for ChatGPT, Claude, and Gemini. Organized by category and use case — no sign-up needed.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-card-lg border border-ink-100 p-6 mb-8">
        <div className="relative mb-5">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts by keyword, category, or use case…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-ink-300 bg-ink-50 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-ink-600 border-ink-200 hover:border-brand-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-400 mb-5">
        {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} {activeCategory !== "All" ? `in ${activeCategory}` : ""}{search ? ` matching "${search}"` : ""}
      </p>

      {/* Prompt grid */}
      {filtered.length > 0 ? (
        <div className="space-y-3 mb-10">
          {filtered.map((p) => {
            const isExpanded = expandedId === p.id;
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-ink-100 hover:border-brand-300 transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                        <span className="text-[10px] font-semibold text-ink-400">{p.useCase}</span>
                      </div>
                      <h3 className="font-bold text-ink-900 text-base">{p.title}</h3>
                      <p className={`text-sm text-ink-500 mt-1 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                        {p.prompt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : p.id)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-ink-100 text-ink-600 hover:bg-ink-200 transition-colors"
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </button>
                      <button
                        onClick={() => handleCopy(p)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                          copiedId === p.id
                            ? "bg-brand-600 text-white"
                            : "bg-brand-100 text-brand-700 hover:bg-brand-600 hover:text-white"
                        }`}
                      >
                        {copiedId === p.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 bg-ink-50 rounded-xl p-4 border border-ink-100">
                      <p className="text-sm text-ink-700 font-mono leading-relaxed whitespace-pre-wrap">{p.prompt}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearch(tag)}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-ink-100 text-ink-500 hover:bg-brand-100 hover:text-brand-700 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-ink-400">
          <p className="text-lg font-medium mb-2">No prompts found</p>
          <p className="text-sm">Try a different search term or category</p>
          <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 text-brand-600 text-sm font-semibold hover:underline">
            Clear filters
          </button>
        </div>
      )}

      <div className="flex justify-center my-8">
        <AdSlot slot="8877665544" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Guide */}
      <section className="prose-content mb-12">
        <h2>How to Use These Prompt Templates</h2>
        <p>
          These {PROMPTS.length}+ templates are designed to give you a strong starting point for any task in ChatGPT,
          Claude, or Gemini. Each prompt uses placeholders in [BRACKETS] — replace these with your specific details
          before sending.
        </p>
        <h3>Pro tips for better results</h3>
        <ol>
          <li><strong>Be specific with placeholders.</strong> "Write a blog post about [TOPIC]" becomes dramatically more useful when [TOPIC] is "AI tools for freelance graphic designers in 2025".</li>
          <li><strong>Add context about your audience.</strong> Append: "My audience is [DESCRIBE AUDIENCE]" to tailor the output.</li>
          <li><strong>Specify format constraints.</strong> Add "Format as bullet points" or "Keep under 300 words" to get usable output directly.</li>
          <li><strong>Iterate.</strong> After getting a first response, ask: "Make it more [concise / persuasive / technical / conversational]."</li>
        </ol>
        <h3>Which AI model works best?</h3>
        <p>
          All prompts work with any major LLM. <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a> excels at nuanced writing and long-form content. ChatGPT (GPT-4o) is strong for structured outputs. Gemini works well for research and factual queries.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ink-900 mb-6">FAQ</h2>
        <div className="space-y-6">
          {[
            { q: "Are these prompts free to use?", a: "Yes, completely. Copy any prompt and use it in ChatGPT, Claude, Gemini, or any other AI tool without restriction or attribution." },
            { q: "Why do prompts have [PLACEHOLDERS]?", a: "Placeholders mark spots where you insert your specific details. Generic prompts produce generic results. The more specific you are, the better the AI output will match your needs." },
            { q: "Can I modify the prompts?", a: "Absolutely — you should. These are starting points. Add context, constraints, audience details, or format requirements to customize them for your exact situation." },
            { q: "How are these different from just typing a question?", a: "Structured prompts give the AI more context about the output format, audience, tone, and length you want — which dramatically improves relevance and reduces the need for follow-up corrections." },
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

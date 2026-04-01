"use client";

import { useState, useMemo } from "react";

interface PromptTemplate {
  id: number;
  title: string;
  category: string;
  aiTarget: string;
  prompt: string;
  tags: string[];
}

const CATEGORIES = [
  "All",
  "Email & Communication",
  "Marketing & Copywriting",
  "Content & Blogging",
  "Code & Development",
  "Research & Analysis",
  "Social Media",
  "Creative Writing",
  "Business & Strategy",
  "Education & Learning",
  "Image Generation",
];

const AI_TARGETS = ["All", "ChatGPT", "Claude", "Gemini", "Midjourney", "DALL-E 3", "Any AI"];

const PROMPT_TEMPLATES: PromptTemplate[] = [
  // Email & Communication
  { id: 1, title: "Professional cold email", category: "Email & Communication", aiTarget: "Any AI", tags: ["sales", "outreach"], prompt: "Write a concise, personalized cold email to [Name] at [Company]. I am reaching out because [reason]. My goal is [desired outcome]. Keep it under 150 words, use a conversational tone, and end with a clear call to action." },
  { id: 2, title: "Apology email to a client", category: "Email & Communication", aiTarget: "Any AI", tags: ["client", "apology"], prompt: "Write a professional apology email to a client regarding [issue]. Acknowledge the problem clearly, take responsibility without making excuses, explain what steps we are taking to fix it, and offer [compensation/remedy if any]. Keep the tone warm and accountable." },
  { id: 3, title: "Meeting follow-up email", category: "Email & Communication", aiTarget: "ChatGPT", tags: ["follow-up", "meeting"], prompt: "Write a follow-up email after a meeting with [person/team] on [date]. Summarize the key decisions made: [decisions]. List the agreed next steps: [next steps]. Close with a friendly, action-oriented sign-off." },
  { id: 4, title: "Job application cover letter", category: "Email & Communication", aiTarget: "Claude", tags: ["job", "cover letter"], prompt: "Write a compelling cover letter for the [Job Title] role at [Company]. I have [X years] of experience in [field]. My top three relevant achievements are: [achievement 1], [achievement 2], [achievement 3]. Emphasize my enthusiasm for [specific aspect of company]. Keep it to 3 paragraphs." },
  { id: 5, title: "Newsletter welcome email", category: "Email & Communication", aiTarget: "Any AI", tags: ["newsletter", "onboarding"], prompt: "Write a warm welcome email for new subscribers to [Newsletter Name]. Tell them what to expect ([topics]), how often they'll hear from me ([frequency]), and give them one immediate value — a tip, resource, or insight about [topic]. End with a question to invite a reply." },
  { id: 6, title: "Salary negotiation email", category: "Email & Communication", aiTarget: "Claude", tags: ["negotiation", "salary"], prompt: "Write a professional salary negotiation email. I have received an offer of [amount] for the [role] position. Based on my [X years] experience in [field] and market research showing [range], I would like to request [target amount]. Maintain a positive, collaborative tone throughout." },

  // Marketing & Copywriting
  { id: 7, title: "Product landing page headline", category: "Marketing & Copywriting", aiTarget: "ChatGPT", tags: ["headline", "landing page"], prompt: "Write 10 high-converting headline options for a landing page selling [product/service]. Target audience: [describe audience]. Key benefit: [main benefit]. Each headline should be under 12 words, hook-first, and outcome-focused. Include one curiosity-gap option and one social proof option." },
  { id: 8, title: "Facebook ad copy", category: "Marketing & Copywriting", aiTarget: "Any AI", tags: ["ads", "facebook"], prompt: "Write Facebook ad copy for [product/service]. Target audience: [audience description]. Primary pain point we solve: [pain point]. Offer: [offer details]. Write three versions: (1) problem-agitate-solution, (2) social proof focused, (3) curiosity-driven. Each should be under 125 words with a strong CTA." },
  { id: 9, title: "Google Ads search copy", category: "Marketing & Copywriting", aiTarget: "ChatGPT", tags: ["ads", "google"], prompt: "Write Google Search Ad copy for [product/service]. Target keywords: [keywords]. Create 3 responsive ad headlines (max 30 chars each) and 2 descriptions (max 90 chars each). Focus on [unique selling point]. Include a strong call to action in at least one headline." },
  { id: 10, title: "Product description for e-commerce", category: "Marketing & Copywriting", aiTarget: "Any AI", tags: ["ecommerce", "product"], prompt: "Write a compelling e-commerce product description for [product name]. Key features: [list features]. Target customer: [description]. Primary benefit: [benefit]. Write a 2-paragraph description — first paragraph covers what it is and its standout benefit; second covers features and who it's for. End with a confidence-boosting sentence." },
  { id: 11, title: "Email subject line A/B test", category: "Marketing & Copywriting", aiTarget: "ChatGPT", tags: ["email", "subject line"], prompt: "Generate 10 email subject line options for an email about [topic] sent to [audience]. Create two each of: curiosity-gap, benefit-driven, urgency/scarcity, personalized, and question-based. Keep each under 50 characters. Indicate which emotion each targets." },
  { id: 12, title: "Brand tagline options", category: "Marketing & Copywriting", aiTarget: "Claude", tags: ["branding", "tagline"], prompt: "Create 15 tagline options for [brand name], a [type of company] that helps [target customer] achieve [outcome]. Our brand personality is [adjectives]. Some taglines should be aspirational, some practical, some witty. Keep each under 8 words." },

  // Content & Blogging
  { id: 13, title: "Blog post outline", category: "Content & Blogging", aiTarget: "Any AI", tags: ["blog", "outline"], prompt: "Create a detailed SEO-optimized blog post outline for the topic: '[topic]'. Target keyword: [keyword]. Target audience: [audience]. Include: compelling H1 title, introduction hook, 5–7 H2 sections each with 2–3 H3 subpoints, key data/stats to include per section, and a conclusion with CTA." },
  { id: 14, title: "Listicle article", category: "Content & Blogging", aiTarget: "ChatGPT", tags: ["listicle", "article"], prompt: "Write a complete [number]-item listicle article titled '[title]'. For each item include: a bold subheading, 2–3 sentences of explanation, and one practical tip or example. Target keyword: [keyword]. Tone: [tone]. Add an intro paragraph and a conclusion. Aim for [word count] words total." },
  { id: 15, title: "How-to guide", category: "Content & Blogging", aiTarget: "Any AI", tags: ["how-to", "tutorial"], prompt: "Write a comprehensive how-to guide on '[topic]' for [target audience]. Structure: brief intro explaining why this matters, prerequisites/tools needed, numbered step-by-step instructions with detail, common mistakes to avoid, and a FAQ section with 3–5 questions. Tone: [tone]." },
  { id: 16, title: "YouTube video script", category: "Content & Blogging", aiTarget: "Claude", tags: ["youtube", "script"], prompt: "Write a YouTube video script about [topic] for a [niche] channel. Structure: strong hook (first 15 seconds to stop scrollers), main content in 3–4 segments with transitions, pattern interrupts every 90 seconds, and a strong CTA at the end. Target length: [X minutes]. Tone: [tone]." },
  { id: 17, title: "Blog post introduction", category: "Content & Blogging", aiTarget: "Any AI", tags: ["blog", "intro"], prompt: "Write 3 alternative opening paragraphs for a blog post titled '[title]'. Version 1: start with a surprising statistic. Version 2: start with a relatable problem or scenario. Version 3: start with a provocative question. Each intro should be 3–5 sentences and end with a transition into the body." },
  { id: 18, title: "Content repurposing prompt", category: "Content & Blogging", aiTarget: "ChatGPT", tags: ["repurposing", "content"], prompt: "Repurpose the following blog post into: (1) a Twitter/X thread (8–10 tweets), (2) a LinkedIn post (under 300 words), (3) a short email newsletter (under 200 words), and (4) three Instagram carousel slide captions. Adapt the tone appropriately for each platform. Blog post: [paste content]" },

  // Code & Development
  { id: 19, title: "Code review prompt", category: "Code & Development", aiTarget: "Claude", tags: ["code review", "debugging"], prompt: "Review the following [language] code for: bugs and edge cases, performance issues, security vulnerabilities, readability and maintainability, and adherence to best practices. For each issue found, explain the problem and suggest a concrete fix. Also note what is done well. Code: [paste code]" },
  { id: 20, title: "Write unit tests", category: "Code & Development", aiTarget: "ChatGPT", tags: ["testing", "unit tests"], prompt: "Write comprehensive unit tests for the following [language] function using [test framework]. Cover: happy path, edge cases, invalid inputs, and boundary conditions. Include descriptive test names that explain the expected behavior. Function: [paste function]" },
  { id: 21, title: "Explain complex code", category: "Code & Development", aiTarget: "Any AI", tags: ["explain", "learning"], prompt: "Explain the following [language] code to me as if I'm a [beginner/intermediate/senior] developer. Walk through what each section does, explain any non-obvious patterns or algorithms used, and describe why the author might have written it this way. Code: [paste code]" },
  { id: 22, title: "Refactor for readability", category: "Code & Development", aiTarget: "Claude", tags: ["refactor", "clean code"], prompt: "Refactor the following [language] code to improve readability and maintainability without changing its behavior. Apply clean code principles: meaningful variable names, small focused functions, removal of duplication, and clear comments where logic is non-obvious. Show before and after. Code: [paste code]" },
  { id: 23, title: "Debug an error", category: "Code & Development", aiTarget: "ChatGPT", tags: ["debugging", "error"], prompt: "Help me debug this error in my [language] code. Error message: [paste error]. Relevant code: [paste code]. What I've already tried: [what you tried]. Please identify the root cause, explain why it's happening, and provide a fix with explanation." },
  { id: 24, title: "API integration guide", category: "Code & Development", aiTarget: "Any AI", tags: ["api", "integration"], prompt: "Write a step-by-step guide to integrate the [API name] API into a [language/framework] project. Cover: authentication setup, making the first API call, handling responses and errors, rate limiting best practices, and a complete working example of [specific use case]." },

  // Research & Analysis
  { id: 25, title: "Competitor analysis", category: "Research & Analysis", aiTarget: "Claude", tags: ["competitive", "analysis"], prompt: "Conduct a competitor analysis comparing [Company A] vs [Company B] vs [Company C] across: target audience, core product features, pricing model, marketing positioning, key strengths, and known weaknesses. Present findings in a structured table and include a strategic recommendation for how [my company] can differentiate." },
  { id: 26, title: "SWOT analysis", category: "Research & Analysis", aiTarget: "Any AI", tags: ["SWOT", "strategy"], prompt: "Create a detailed SWOT analysis for [company/product/idea]. For each quadrant (Strengths, Weaknesses, Opportunities, Threats), provide 5 specific, evidence-backed points. Then write a 2-paragraph strategic summary that highlights the most critical SWOT interactions and recommends 3 priority actions." },
  { id: 27, title: "Literature review summary", category: "Research & Analysis", aiTarget: "Claude", tags: ["research", "academic"], prompt: "Summarize the current state of research on [topic]. Cover: the main schools of thought or competing theories, key findings from the most influential studies, areas of consensus and ongoing debate, and gaps in current knowledge. Cite the types of evidence typically used in this field. Write at a [undergraduate/graduate] level." },
  { id: 28, title: "Data analysis interpretation", category: "Research & Analysis", aiTarget: "Any AI", tags: ["data", "analysis"], prompt: "Interpret the following data and provide insights: [paste data or describe dataset]. Identify: the 3 most significant trends or patterns, any anomalies or outliers worth investigating, actionable insights for [business/research goal], and suggested next steps or follow-up analyses." },
  { id: 29, title: "Pros and cons analysis", category: "Research & Analysis", aiTarget: "Any AI", tags: ["decision", "pros cons"], prompt: "Give me a balanced pros and cons analysis of [decision/option/technology]. Include at least 6 pros and 6 cons, with a brief explanation for each. Weight the most important factors. Conclude with a recommendation for [specific use case or audience], explaining the key trade-offs." },

  // Social Media
  { id: 30, title: "Twitter/X thread", category: "Social Media", aiTarget: "ChatGPT", tags: ["twitter", "thread"], prompt: "Write a 10-tweet thread about [topic] for my [niche] audience. Tweet 1 should be a strong hook that promises value. Tweets 2–9 should each deliver one insight, tip, or story with a connecting transition. Tweet 10 is a summary and CTA. Keep each tweet under 260 characters. Topic: [topic]" },
  { id: 31, title: "LinkedIn post", category: "Social Media", aiTarget: "Any AI", tags: ["linkedin", "professional"], prompt: "Write a LinkedIn post about [topic/experience/insight] for a [industry] professional audience. Open with a one-sentence hook (no 'I'm excited to announce'). Share the key story or insight in 3–4 short paragraphs. End with a question to spark comments. Use line breaks for readability. Under 300 words." },
  { id: 32, title: "Instagram caption", category: "Social Media", aiTarget: "ChatGPT", tags: ["instagram", "caption"], prompt: "Write 3 Instagram caption options for a photo of [describe image] posted by a [type of account]. Version 1: short and punchy (under 50 words). Version 2: storytelling style (100–150 words). Version 3: educational/value-driven (100–150 words). Include 5–10 relevant hashtags for each." },
  { id: 33, title: "TikTok video hook scripts", category: "Social Media", aiTarget: "Any AI", tags: ["tiktok", "video"], prompt: "Write 5 strong opening hook scripts for a TikTok video about [topic]. Each hook should be 1–2 sentences (under 15 seconds when spoken), immediately grab attention, create curiosity or promise value, and speak directly to [target audience]. Vary the hook style: question, bold claim, story, shocking stat, and controversy." },
  { id: 34, title: "Social media content calendar", category: "Social Media", aiTarget: "Claude", tags: ["content calendar", "planning"], prompt: "Create a 2-week social media content calendar for a [type of business] posting on [platforms]. Include: post topic, content format (reel, carousel, static, story), caption angle (educational, entertaining, promotional, behind-the-scenes), and best posting day/time. Maintain a [X%] educational, [Y%] entertaining, [Z%] promotional split." },

  // Creative Writing
  { id: 35, title: "Short story opening", category: "Creative Writing", aiTarget: "Claude", tags: ["fiction", "story"], prompt: "Write the opening 300 words of a [genre] short story. Setting: [setting]. Protagonist: [brief character description]. The inciting incident is [incident]. Start in medias res, establish voice immediately, and end the opening on a hook that makes the reader want to continue." },
  { id: 36, title: "Character development sheet", category: "Creative Writing", aiTarget: "Any AI", tags: ["character", "fiction"], prompt: "Create a detailed character development sheet for [character name], a [age/gender/occupation] in a [genre] story. Include: physical description, background and formative experiences, core motivation and fear, personality traits and contradictions, speech pattern or verbal tics, and a secret they haven't told anyone." },
  { id: 37, title: "Poem in a specific style", category: "Creative Writing", aiTarget: "Claude", tags: ["poetry", "creative"], prompt: "Write a [poem style: sonnet/haiku/free verse/villanelle] poem about [subject/theme]. Tone: [tone]. If structured form, follow the correct meter and rhyme scheme. The poem should use at least two strong metaphors and evoke [specific emotion]. Avoid clichés." },
  { id: 38, title: "Dialogue scene", category: "Creative Writing", aiTarget: "Any AI", tags: ["dialogue", "scene"], prompt: "Write a dialogue scene between [Character A] and [Character B]. Context: [situation]. The subtext is [underlying tension or unspoken meaning]. Character A wants [goal A]; Character B wants [goal B]. Write 15–20 exchanges. Show personality through word choice and sentence rhythm. No dialogue tags except 'said' and 'asked'." },

  // Business & Strategy
  { id: 39, title: "Business plan executive summary", category: "Business & Strategy", aiTarget: "Claude", tags: ["business plan", "startup"], prompt: "Write an executive summary for a business plan for [business name], a [type of business] that [what it does]. Include: the problem being solved, our solution and unique value proposition, target market size, revenue model, traction to date (if any), team highlights, and funding ask/use of funds. Keep it to 400 words." },
  { id: 40, title: "OKR framework", category: "Business & Strategy", aiTarget: "Any AI", tags: ["OKR", "goals"], prompt: "Create an OKR (Objectives and Key Results) framework for [team/department/company] for Q[X] [year]. Develop 3 Objectives that are qualitative and inspirational. For each Objective, write 3–4 measurable Key Results with specific metrics and targets. Ensure Key Results are challenging but achievable, and directly measurable." },
  { id: 41, title: "Pitch deck narrative", category: "Business & Strategy", aiTarget: "Claude", tags: ["pitch", "investor"], prompt: "Write the narrative script for a 10-slide investor pitch deck for [company]. Slides: Problem, Solution, Market Size, Product Demo, Business Model, Traction, Team, Competition, Financials, Ask. For each slide, write 3–5 sentences the founder should say, plus one key visual or data point to show. Keep total speaking time under 10 minutes." },
  { id: 42, title: "Job description", category: "Business & Strategy", aiTarget: "Any AI", tags: ["hiring", "HR"], prompt: "Write a compelling job description for a [Job Title] at [Company Name], a [company description]. Include: a 2-sentence company intro, role overview, 5–7 key responsibilities, 4–6 required qualifications, 3–4 nice-to-have qualifications, and a brief section on culture/benefits. Avoid jargon. Make it feel like an exciting opportunity." },

  // Education & Learning
  { id: 43, title: "Explain a complex concept simply", category: "Education & Learning", aiTarget: "Any AI", tags: ["explanation", "learning"], prompt: "Explain [complex concept] to me as if I'm [a 12-year-old / a complete beginner / someone from a completely different field]. Use an analogy I can relate to, break it into 3–4 clear steps or ideas, and end with a simple example that makes the concept concrete. Avoid jargon." },
  { id: 44, title: "Study plan creator", category: "Education & Learning", aiTarget: "Claude", tags: ["study", "learning plan"], prompt: "Create a structured [X-week] study plan to learn [subject/skill] from a [beginner/intermediate] level. I can dedicate [hours per week]. Include: weekly goals and topics, recommended free and paid resources (books, courses, videos), practical exercises for each week, and milestones to measure progress. Format as a weekly table." },
  { id: 45, title: "Flashcard generation", category: "Education & Learning", aiTarget: "Any AI", tags: ["flashcards", "memorization"], prompt: "Create 20 Anki-style flashcards for studying [topic]. Format each as: Front: [concise question or term], Back: [clear, memorable answer in 1–3 sentences]. Prioritize the most important concepts. Vary the question types: definition, application, comparison, and fill-in-the-blank." },
  { id: 46, title: "Socratic dialogue for learning", category: "Education & Learning", aiTarget: "Claude", tags: ["Socratic", "critical thinking"], prompt: "Lead me through a Socratic dialogue to help me understand [concept or question]. Ask me one question at a time, build on my answers, gently challenge faulty assumptions, and guide me toward discovering the key insights myself. Do not lecture — only ask questions and give brief acknowledgments." },

  // Image Generation
  { id: 47, title: "Photorealistic portrait", category: "Image Generation", aiTarget: "Midjourney", tags: ["portrait", "photorealistic"], prompt: "Photorealistic portrait of [subject description], [lighting style] lighting, shot on [camera type], [lens type] lens, [background description], highly detailed skin texture, professional photography, 8K resolution --ar 4:5 --stylize 200 --v 6" },
  { id: 48, title: "Product photography", category: "Image Generation", aiTarget: "DALL-E 3", tags: ["product", "photography"], prompt: "Professional product photography of [product description] on [background/surface]. Studio lighting setup with soft shadows. [Color palette]. Photorealistic, commercial grade, clean composition. The product should be the clear focal point with a slight depth-of-field blur on the background." },
  { id: 49, title: "Logo concept", category: "Image Generation", aiTarget: "Midjourney", tags: ["logo", "branding"], prompt: "Minimalist logo design for a company called '[Company Name]' in the [industry] industry. Style: [geometric/organic/typographic]. Color palette: [colors]. Clean vector style, white background, professional, scalable. The logo should convey [brand values]. --no shadows gradients textures --ar 1:1 --v 6" },
  { id: 50, title: "Cinematic landscape", category: "Image Generation", aiTarget: "Midjourney", tags: ["landscape", "cinematic"], prompt: "Cinematic landscape of [location/scene description], [time of day], [weather/atmosphere], [color grade style: golden hour/blue hour/overcast moody/neon rain], shot from [camera angle], wide angle lens, volumetric fog, epic scale, concept art quality --ar 21:9 --stylize 750 --v 6" },
  { id: 51, title: "UI/UX mockup illustration", category: "Image Generation", aiTarget: "DALL-E 3", tags: ["UI", "mockup"], prompt: "Clean, modern UI design mockup for a [type of app] app. [Color scheme]. Flat design style, professional layout with [key screens or components]. Include realistic placeholder content. The design should feel like a polished Figma prototype screenshot, minimal and user-friendly." },
];

export default function AiPromptLibraryTool() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAI, setSelectedAI] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return PROMPT_TEMPLATES.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchAI = selectedAI === "All" || p.aiTarget === selectedAI || p.aiTarget === "Any AI";
      const matchSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchAI && matchSearch;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  async function handleCopy(p: PromptTemplate) {
    await navigator.clipboard.writeText(p.prompt);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts by title, category, or tag…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-ink-200 text-sm text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
            AI Tool
          </label>
          <select
            value={selectedAI}
            onChange={(e) => setSelectedAI(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          >
            {AI_TARGETS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-ink-400 mb-4 font-medium">
        {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} found
        {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
        {selectedAI !== "All" ? ` for ${selectedAI}` : ""}
      </p>

      {/* Prompt cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-ink-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto mb-2 opacity-40">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">No prompts match your filters. Try clearing the search or changing the category.</p>
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="border border-ink-200 rounded-xl overflow-hidden bg-white hover:border-brand-300 transition-colors"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    <span className="text-xs text-ink-400 bg-ink-50 border border-ink-200 px-2 py-0.5 rounded-full">
                      {p.aiTarget}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink-900 text-sm">{p.title}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                    className="text-xs font-semibold text-ink-500 hover:text-ink-800 transition-colors"
                  >
                    {expandedId === p.id ? "Hide" : "Preview"}
                  </button>
                  <button
                    onClick={() => handleCopy(p)}
                    className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {copiedId === p.id ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-500">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                          <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              {expandedId === p.id && (
                <div className="border-t border-ink-100 bg-ink-50 px-4 py-3">
                  <p className="text-xs text-ink-600 leading-relaxed whitespace-pre-wrap font-mono">{p.prompt}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

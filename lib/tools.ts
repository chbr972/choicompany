import fs from "fs";
import path from "path";
import matter from "gray-matter";

const toolsDirectory = path.join(process.cwd(), "content/tools");

export interface ToolMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  toolName: string;
  toolDeveloper?: string;
  toolUrl?: string;
  category: string;
  rating: number;
  pricingModel: string;
  startingPrice: string;
  paidPrice?: string;
  operatingSystem?: string;
  pros?: string[];
  cons?: string[];
  readingTime: string;
}

function calcReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getSortedToolsMeta(): ToolMeta[] {
  if (!fs.existsSync(toolsDirectory)) return [];
  const fileNames = fs.readdirSync(toolsDirectory);
  const allTools = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(toolsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        readingTime: calcReadingTime(content),
        ...(data as Omit<ToolMeta, "slug" | "readingTime">),
      } as ToolMeta;
    });

  return allTools.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface RatingCriterion {
  criterion: string;
  score: number; // 0–10
}

export interface ToolFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ToolData {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  icon: string;
  url: string;
  badge?: string;
  price: string;
  pricingTiers: PricingTier[];
  rating: number; // 0–5
  ratingBreakdown: RatingCriterion[];
  description: string;
  longDescription: string;
  pros: string[];
  cons: string[];
  features: ToolFeature[];
  useCases: string[];
  alternatives: string[]; // other tool slugs
}

export const tools: ToolData[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "The world's most versatile AI assistant",
    category: "Writing",
    icon: "C",
    url: "https://chat.openai.com",
    badge: "Most Popular",
    price: "Free / $20/mo",
    pricingTiers: [
      {
        name: "Free",
        price: "$0/mo",
        features: ["GPT-3.5 access", "Standard response speed", "Web interface"],
      },
      {
        name: "Plus",
        price: "$20/mo",
        features: ["GPT-4o access", "Faster responses", "Image generation (DALL·E)", "Code interpreter"],
      },
      {
        name: "Team",
        price: "$25/user/mo",
        features: ["Everything in Plus", "Shared workspace", "Admin controls", "Higher usage limits"],
      },
    ],
    rating: 4.5,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.5 },
      { criterion: "Output Quality", score: 8.8 },
      { criterion: "Speed", score: 9.0 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 9.0 },
    ],
    description:
      "OpenAI's flagship conversational AI for writing, research, coding, and more.",
    longDescription:
      "ChatGPT is the most widely-adopted AI assistant in the world, built by OpenAI. It excels at natural-language tasks — drafting emails, summarizing documents, generating code, brainstorming ideas, and answering complex questions. GPT-4o, available on the paid plan, delivers multimodal capabilities including image understanding, voice input, and real-time web browsing.",
    pros: [
      "Huge community and third-party integrations",
      "Strong at creative writing and brainstorming",
      "Excellent plugin and GPT ecosystem",
      "Multimodal: text, image, and voice",
      "Regular model updates from OpenAI",
    ],
    cons: [
      "Can confidently state incorrect information",
      "GPT-4o requires a paid subscription",
      "Privacy concerns for sensitive data",
    ],
    features: [
      {
        title: "GPT-4o",
        description: "The latest flagship model with multimodal reasoning across text, images, and audio.",
        icon: "🧠",
      },
      {
        title: "Code Interpreter",
        description: "Execute Python code, analyze data, and generate charts in a sandboxed environment.",
        icon: "💻",
      },
      {
        title: "DALL·E Integration",
        description: "Generate and edit images directly from your chat session using natural language.",
        icon: "🎨",
      },
      {
        title: "Memory",
        description: "ChatGPT can remember your preferences and context across conversations.",
        icon: "💾",
      },
      {
        title: "Custom GPTs",
        description: "Build and share specialized AI assistants tuned for specific tasks.",
        icon: "🛠",
      },
      {
        title: "Web Browsing",
        description: "Real-time search access lets ChatGPT pull current information from the web.",
        icon: "🌐",
      },
    ],
    useCases: [
      "Drafting and editing long-form content",
      "Customer support chat automation",
      "Code generation and debugging",
      "Research summaries and fact-finding",
      "Language translation and localization",
    ],
    alternatives: ["claude", "perplexity-ai", "jasper"],
  },
  {
    slug: "claude",
    name: "Claude",
    tagline: "Nuanced writing and careful reasoning at scale",
    category: "Writing",
    icon: "A",
    url: "https://claude.ai",
    badge: "Best for Analysis",
    price: "Free / $20/mo",
    pricingTiers: [
      {
        name: "Free",
        price: "$0/mo",
        features: ["Claude 3 Haiku access", "Standard speed", "Web interface"],
      },
      {
        name: "Pro",
        price: "$20/mo",
        features: ["Claude 3.7 Sonnet", "Priority access", "5× more usage", "Projects & memory"],
      },
      {
        name: "Team",
        price: "$30/user/mo",
        features: ["Everything in Pro", "Team workspace", "Admin console", "SSO"],
      },
    ],
    rating: 4.6,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 9.2 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.8 },
      { criterion: "Feature Depth", score: 8.5 },
    ],
    description:
      "Anthropic's AI assistant excelling at nuanced writing, analysis, and reasoning tasks.",
    longDescription:
      "Claude is Anthropic's flagship AI assistant, designed with a focus on safety, honesty, and nuanced reasoning. It stands out for long-context document analysis, careful multi-step thinking, and producing writing that feels considered rather than templated. Claude is particularly strong when working with large documents, complex instructions, and tasks that require careful judgment.",
    pros: [
      "Exceptional at long-form and nuanced writing",
      "Handles very long documents (200k token context)",
      "Thoughtful, carefully calibrated responses",
      "Strong reasoning and chain-of-thought",
      "High accuracy on complex multi-step tasks",
    ],
    cons: [
      "Fewer third-party integrations than ChatGPT",
      "No built-in image generation",
      "Can be slower on casual conversational tasks",
    ],
    features: [
      {
        title: "Extended Context",
        description: "200,000-token context window — handle entire books, codebases, or legal documents.",
        icon: "📄",
      },
      {
        title: "Projects",
        description: "Organize conversations and upload persistent reference files for ongoing work.",
        icon: "📁",
      },
      {
        title: "Artifacts",
        description: "Generate and preview code, documents, and SVGs directly in the chat sidebar.",
        icon: "⚡",
      },
      {
        title: "Vision",
        description: "Analyze images, charts, and screenshots with accurate textual descriptions.",
        icon: "👁",
      },
      {
        title: "Honest Uncertainty",
        description: "Claude flags when it's uncertain, reducing confident-sounding hallucinations.",
        icon: "✅",
      },
      {
        title: "API Access",
        description: "Full API access for building custom integrations and production applications.",
        icon: "🔌",
      },
    ],
    useCases: [
      "Long document review and summarization",
      "Legal and medical research assistance",
      "Technical writing and API documentation",
      "Coding with detailed explanations",
      "Nuanced creative and editorial work",
    ],
    alternatives: ["chatgpt", "perplexity-ai", "jasper"],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "The gold standard for AI-assisted coding",
    category: "Coding",
    icon: "G",
    url: "https://github.com/features/copilot",
    badge: "Best for Coding",
    price: "$10/mo",
    pricingTiers: [
      {
        name: "Individual",
        price: "$10/mo",
        features: ["IDE autocomplete", "Copilot Chat", "Pull request summaries"],
      },
      {
        name: "Business",
        price: "$19/user/mo",
        features: ["Everything in Individual", "Organization-wide policy controls", "Audit logs"],
      },
      {
        name: "Enterprise",
        price: "$39/user/mo",
        features: ["Everything in Business", "Custom fine-tuning", "Security scanning"],
      },
    ],
    rating: 4.7,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.5 },
      { criterion: "Output Quality", score: 9.0 },
      { criterion: "Speed", score: 9.5 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 9.0 },
    ],
    description:
      "AI pair programmer that suggests code completions and entire functions in your editor.",
    longDescription:
      "GitHub Copilot is the most widely-used AI coding assistant, deeply integrated into VS Code, JetBrains, Neovim, and the GitHub web editor. It uses large-scale code training to suggest context-aware completions, auto-generate boilerplate, write tests, and explain unfamiliar code. Copilot Chat extends this to a conversational interface for debugging and refactoring.",
    pros: [
      "Best-in-class IDE integration across all major editors",
      "Extremely fast inline autocomplete",
      "Strong at boilerplate and repetitive patterns",
      "Integrated directly into GitHub PRs and issues",
      "Large model — understands cross-file context",
    ],
    cons: [
      "Struggles with complex multi-step logic",
      "No free tier (student exception aside)",
      "Suggestions can be subtly wrong — requires review",
    ],
    features: [
      {
        title: "Inline Autocomplete",
        description: "Real-time code suggestions as you type, from single lines to entire functions.",
        icon: "⚡",
      },
      {
        title: "Copilot Chat",
        description: "Conversational AI for debugging, refactoring, and explaining code.",
        icon: "💬",
      },
      {
        title: "PR Summaries",
        description: "Automatically generate pull request descriptions from your diffs.",
        icon: "📝",
      },
      {
        title: "Test Generation",
        description: "Generate unit tests for your functions with a single command.",
        icon: "🧪",
      },
      {
        title: "Multi-file Context",
        description: "Understands your repository structure to provide more relevant suggestions.",
        icon: "🗂",
      },
      {
        title: "Security Scanning",
        description: "Detect potential vulnerabilities in AI-generated code (Enterprise).",
        icon: "🔒",
      },
    ],
    useCases: [
      "Accelerating daily coding workflows",
      "Writing test suites for existing code",
      "Learning new frameworks and languages",
      "Code documentation and commenting",
      "Onboarding new engineers to a codebase",
    ],
    alternatives: ["cursor", "chatgpt"],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    tagline: "Best-in-class AI image generation",
    category: "Image",
    icon: "M",
    url: "https://www.midjourney.com",
    badge: "Best Image Quality",
    price: "$10/mo",
    pricingTiers: [
      {
        name: "Basic",
        price: "$10/mo",
        features: ["~200 images/mo", "General commercial terms", "Discord access"],
      },
      {
        name: "Standard",
        price: "$30/mo",
        features: ["15h fast GPU/mo", "Unlimited relaxed generations", "General commercial terms"],
      },
      {
        name: "Pro",
        price: "$60/mo",
        features: ["30h fast GPU/mo", "Stealth mode", "Max concurrent jobs"],
      },
    ],
    rating: 4.8,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 7.5 },
      { criterion: "Output Quality", score: 9.8 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.0 },
      { criterion: "Feature Depth", score: 8.8 },
    ],
    description:
      "AI image generation tool for creating stunning art and visuals from text prompts.",
    longDescription:
      "Midjourney produces some of the highest-quality AI-generated images available, with an aesthetic that blends photorealism with painterly beauty. It operates through Discord, making the workflow unique among competitors. Version 6 significantly improved prompt adherence, text in images, and photorealistic detail.",
    pros: [
      "Unmatched image quality and aesthetic",
      "Strong community and shared prompt library",
      "Excellent art direction control",
      "Version 6 handles text in images well",
      "Consistent, reliable output",
    ],
    cons: [
      "Discord-only interface is a barrier",
      "No free tier available",
      "Less control over exact compositions than Stable Diffusion",
    ],
    features: [
      {
        title: "V6 Model",
        description: "State-of-the-art image generation with improved prompt adherence and detail.",
        icon: "🎨",
      },
      {
        title: "Vary & Remix",
        description: "Generate subtle or strong variations of any image, or remix with new prompts.",
        icon: "🔄",
      },
      {
        title: "Upscaling",
        description: "Upscale images to 2× or 4× resolution with detail enhancement.",
        icon: "🔍",
      },
      {
        title: "Inpainting",
        description: "Edit specific regions of an image using natural language.",
        icon: "✏️",
      },
      {
        title: "Style References",
        description: "Reference existing images to guide the style and aesthetic of new generations.",
        icon: "🖼",
      },
      {
        title: "Aspect Ratios",
        description: "Generate in any aspect ratio — portrait, landscape, square, or custom.",
        icon: "📐",
      },
    ],
    useCases: [
      "Marketing and advertising visuals",
      "Concept art and mood boards",
      "Book covers and editorial illustration",
      "Social media content creation",
      "Product visualization and prototyping",
    ],
    alternatives: ["runway"],
  },
  {
    slug: "perplexity-ai",
    name: "Perplexity AI",
    tagline: "AI-powered search with cited, real-time answers",
    category: "Research",
    icon: "P",
    url: "https://www.perplexity.ai",
    badge: "Best for Research",
    price: "Free / $20/mo",
    pricingTiers: [
      {
        name: "Free",
        price: "$0/mo",
        features: ["Real-time web search", "5 Pro searches/day", "Standard model"],
      },
      {
        name: "Pro",
        price: "$20/mo",
        features: ["300+ Pro searches/day", "GPT-4o & Claude models", "File upload", "API access"],
      },
    ],
    rating: 4.4,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 9.0 },
      { criterion: "Value for Money", score: 9.0 },
      { criterion: "Feature Depth", score: 8.0 },
    ],
    description:
      "AI search engine that provides cited, real-time answers to complex questions.",
    longDescription:
      "Perplexity AI is the leading AI-native search engine, combining real-time web access with LLM reasoning to deliver concise, cited answers. It excels at research tasks where up-to-date information and source traceability matter. The Pro tier unlocks access to GPT-4o and Claude models for deeper reasoning.",
    pros: [
      "Real-time web access with cited sources",
      "Clean, fast interface",
      "Free tier is genuinely useful",
      "Supports multiple top-tier models (Pro)",
      "Great for academic and market research",
    ],
    cons: [
      "Less capable for creative or generative tasks",
      "Best models require Pro subscription",
      "Depth limited compared to dedicated writing tools",
    ],
    features: [
      {
        title: "Real-Time Search",
        description: "Every answer is grounded in live web results, not a training cutoff.",
        icon: "🔍",
      },
      {
        title: "Cited Sources",
        description: "Every claim is linked to its source — making verification trivial.",
        icon: "📚",
      },
      {
        title: "Collections",
        description: "Organize research threads into persistent, shareable collections.",
        icon: "📁",
      },
      {
        title: "Multi-Model",
        description: "Switch between GPT-4o, Claude, and Sonar for different task needs.",
        icon: "🔄",
      },
      {
        title: "File Upload",
        description: "Upload PDFs and ask questions over your own documents.",
        icon: "📎",
      },
      {
        title: "Focus Modes",
        description: "Target searches to academic papers, Reddit, YouTube, or news sources.",
        icon: "🎯",
      },
    ],
    useCases: [
      "Academic and competitive research",
      "Financial and market intelligence",
      "News monitoring and summarization",
      "Technical documentation lookup",
      "Fact-checking and verification",
    ],
    alternatives: ["chatgpt", "claude"],
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "The AI-native code editor that understands your codebase",
    category: "Coding",
    icon: "C",
    url: "https://www.cursor.com",
    badge: "Best Editor",
    price: "Free / $20/mo",
    pricingTiers: [
      {
        name: "Hobby",
        price: "$0/mo",
        features: ["2,000 completions/mo", "50 slow premium requests", "VS Code compatible"],
      },
      {
        name: "Pro",
        price: "$20/mo",
        features: ["Unlimited completions", "500 fast premium requests/mo", "Claude & GPT-4o"],
      },
      {
        name: "Business",
        price: "$40/user/mo",
        features: ["Everything in Pro", "Privacy mode by default", "Centralized billing"],
      },
    ],
    rating: 4.5,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 8.5 },
      { criterion: "Output Quality", score: 9.0 },
      { criterion: "Speed", score: 8.0 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 9.5 },
    ],
    description:
      "AI-first code editor built on VS Code with deep codebase understanding.",
    longDescription:
      "Cursor is a fork of VS Code that puts AI at the center of the editing experience. Unlike Copilot, Cursor understands your full codebase via embeddings — enabling multi-file edits, codebase-wide Q&A, and intelligent refactoring. The Composer feature lets you describe changes in natural language and apply them across multiple files simultaneously.",
    pros: [
      "Full codebase awareness via semantic indexing",
      "Multi-file edits with a single prompt",
      "Supports Claude, GPT-4o, and other models",
      "VS Code compatible — all extensions work",
      "Rapidly improving with weekly updates",
    ],
    cons: [
      "Can be slower than Copilot on large repos",
      "Fewer enterprise controls than Copilot",
      "New tool — some rough edges remain",
    ],
    features: [
      {
        title: "Composer",
        description: "Describe a feature in plain English and apply multi-file edits in one step.",
        icon: "✍️",
      },
      {
        title: "Codebase Indexing",
        description: "Semantic search over your entire repository for context-aware completions.",
        icon: "🗂",
      },
      {
        title: "Tab Completion",
        description: "Predictive next-action completions that anticipate your entire next edit.",
        icon: "⚡",
      },
      {
        title: "Chat",
        description: "Ask questions about your codebase or get step-by-step implementation help.",
        icon: "💬",
      },
      {
        title: "Privacy Mode",
        description: "Run in privacy mode — your code is never stored or used for training.",
        icon: "🔒",
      },
      {
        title: "Multi-Model",
        description: "Switch between Claude 3.7, GPT-4o, and other frontier models per session.",
        icon: "🔄",
      },
    ],
    useCases: [
      "Full-stack feature development",
      "Large-scale refactoring projects",
      "Onboarding to unfamiliar codebases",
      "Automated test generation",
      "Debugging complex multi-file issues",
    ],
    alternatives: ["github-copilot", "chatgpt"],
  },
  {
    slug: "jasper",
    name: "Jasper",
    tagline: "AI writing platform built for marketing teams",
    category: "Writing",
    icon: "J",
    url: "https://www.jasper.ai",
    badge: "Best for Marketing",
    price: "$49/mo",
    pricingTiers: [
      {
        name: "Creator",
        price: "$49/mo",
        features: ["1 user", "Brand voice", "SEO mode", "AI image generation"],
      },
      {
        name: "Pro",
        price: "$69/mo",
        features: ["Up to 5 users", "3 brand voices", "Collaboration", "Instant campaigns"],
      },
      {
        name: "Business",
        price: "Custom",
        features: ["Unlimited users", "Custom AI tuning", "API access", "Dedicated support"],
      },
    ],
    rating: 4.1,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 8.5 },
      { criterion: "Output Quality", score: 8.0 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 7.0 },
      { criterion: "Feature Depth", score: 8.5 },
    ],
    description:
      "AI writing platform built for marketing teams, with brand voice and templates.",
    longDescription:
      "Jasper is the leading enterprise-focused AI writing platform, designed specifically for marketing teams that need consistent, on-brand content at scale. It includes brand voice training, 50+ templates for different content types, and a campaign builder that generates multiple assets at once.",
    pros: [
      "Brand voice training keeps content consistent",
      "50+ specialized marketing templates",
      "Integrated AI image generation",
      "Campaign mode generates multiple assets at once",
      "Strong SEO integration with Surfer",
    ],
    cons: [
      "Expensive compared to general-purpose tools",
      "Output can feel formulaic for long-form content",
      "Heavy feature set has a learning curve",
    ],
    features: [
      {
        title: "Brand Voice",
        description: "Train Jasper on your brand guidelines so every output matches your tone.",
        icon: "🎙",
      },
      {
        title: "Instant Campaigns",
        description: "Generate blog posts, ads, social copy, and emails from a single brief.",
        icon: "🚀",
      },
      {
        title: "Templates",
        description: "50+ pre-built templates for every marketing content type.",
        icon: "📋",
      },
      {
        title: "SEO Mode",
        description: "Integrated with Surfer SEO to optimize content for search rankings.",
        icon: "📈",
      },
      {
        title: "Team Workspace",
        description: "Collaborate with your team on documents and campaigns in one place.",
        icon: "👥",
      },
      {
        title: "Art Generation",
        description: "Create marketing visuals alongside written content in a unified workflow.",
        icon: "🎨",
      },
    ],
    useCases: [
      "Large-scale content marketing operations",
      "Consistent brand voice across channels",
      "Product description and listing generation",
      "Email marketing campaigns",
      "Social media content calendars",
    ],
    alternatives: ["chatgpt", "claude"],
  },
  {
    slug: "runway",
    name: "Runway",
    tagline: "AI-powered video and image editing for creatives",
    category: "Image",
    icon: "R",
    url: "https://runwayml.com",
    badge: "Best for Video",
    price: "Free / $15/mo",
    pricingTiers: [
      {
        name: "Free",
        price: "$0/mo",
        features: ["125 credits/mo", "Gen-2 video generation", "Basic tools"],
      },
      {
        name: "Standard",
        price: "$15/mo",
        features: ["625 credits/mo", "No watermarks", "All Gen models"],
      },
      {
        name: "Pro",
        price: "$35/mo",
        features: ["2,250 credits/mo", "Extended video length", "Priority generation"],
      },
    ],
    rating: 4.2,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 8.0 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 7.5 },
      { criterion: "Value for Money", score: 7.5 },
      { criterion: "Feature Depth", score: 9.0 },
    ],
    description:
      "AI-powered video and image editing platform for creatives and filmmakers.",
    longDescription:
      "Runway is a comprehensive AI creative studio that specializes in video generation and editing. Its Gen-3 Alpha model produces remarkably coherent short video clips from text or image prompts. Runway also includes a full suite of AI-powered editing tools: background removal, motion tracking, inpainting, and frame interpolation.",
    pros: [
      "Best text-to-video quality available",
      "Full creative suite beyond just generation",
      "Strong for filmmakers and motion designers",
      "Regular model updates (Gen-1 through Gen-3)",
      "No-code interface accessible to beginners",
    ],
    cons: [
      "Credit system can be expensive for heavy use",
      "Video generation is relatively slow",
      "5-second clips on most plans",
    ],
    features: [
      {
        title: "Gen-3 Alpha",
        description: "State-of-the-art text-to-video model with consistent motion and detail.",
        icon: "🎬",
      },
      {
        title: "Image-to-Video",
        description: "Animate any still image into a dynamic video clip.",
        icon: "🖼",
      },
      {
        title: "Inpainting",
        description: "Remove or replace any object in a video using natural language.",
        icon: "✂️",
      },
      {
        title: "Background Removal",
        description: "Instantly remove or replace video backgrounds with AI precision.",
        icon: "🎭",
      },
      {
        title: "Motion Tracking",
        description: "Track objects and apply effects that follow their movement.",
        icon: "🎯",
      },
      {
        title: "Frame Interpolation",
        description: "Smooth out slow-motion footage or create super-slow-mo effects.",
        icon: "⚡",
      },
    ],
    useCases: [
      "Short-form social media video content",
      "Advertising and commercial production",
      "Music video and film prototyping",
      "Product showcase animations",
      "Concept visualization for directors",
    ],
    alternatives: ["midjourney"],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    tagline: "AI writing and summarization built into your workspace",
    category: "Productivity",
    icon: "N",
    url: "https://www.notion.so/product/ai",
    price: "$10/mo add-on",
    pricingTiers: [
      {
        name: "AI Add-on",
        price: "$10/user/mo",
        features: ["Unlimited AI usage", "All Notion plans", "AI writing, editing, and Q&A"],
      },
    ],
    rating: 4.2,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.5 },
      { criterion: "Output Quality", score: 8.0 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.0 },
      { criterion: "Feature Depth", score: 7.5 },
    ],
    description:
      "AI-powered writing and summarization built directly into Notion workspaces.",
    longDescription:
      "Notion AI integrates large language model capabilities directly into the Notion workspace, allowing teams to draft, summarize, translate, and query their own documents without switching tools. The Q&A feature is particularly powerful — it lets you ask questions over your entire Notion workspace and get sourced answers.",
    pros: [
      "Seamlessly integrated into existing Notion workflow",
      "Q&A searches your entire workspace",
      "Great for meeting notes and summaries",
      "Easy for non-technical users",
      "Works across all Notion plan types",
    ],
    cons: [
      "Limited compared to dedicated AI writing tools",
      "Add-on cost on top of Notion subscription",
      "Not useful if you don't already use Notion",
    ],
    features: [
      {
        title: "AI Q&A",
        description: "Ask questions over your entire Notion workspace and get sourced answers.",
        icon: "❓",
      },
      {
        title: "Autofill",
        description: "Generate database properties, summaries, or content using AI in any block.",
        icon: "✨",
      },
      {
        title: "Writing Assistant",
        description: "Draft, edit, improve tone, and fix grammar inline without leaving Notion.",
        icon: "✍️",
      },
      {
        title: "Meeting Notes",
        description: "Summarize transcripts and extract action items in seconds.",
        icon: "📝",
      },
    ],
    useCases: [
      "Team knowledge base management",
      "Meeting note summarization",
      "Project documentation drafting",
      "Content planning and calendars",
      "Internal wiki Q&A",
    ],
    alternatives: ["chatgpt", "jasper"],
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    tagline: "AI copywriting for marketers and content teams",
    category: "Writing",
    icon: "C",
    url: "https://www.copy.ai",
    price: "Free / $36/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["2,000 words/mo", "90+ tools", "Chat"] },
      { name: "Pro", price: "$36/mo", features: ["Unlimited words", "Brand voice", "Workflows"] },
      { name: "Team", price: "$186/mo", features: ["5 users", "Advanced workflows", "API access"] },
    ],
    rating: 4.0,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 7.5 },
      { criterion: "Speed", score: 9.0 },
      { criterion: "Value for Money", score: 8.0 },
      { criterion: "Feature Depth", score: 7.5 },
    ],
    description: "AI-powered copywriting tool with 90+ templates for ads, emails, and social content.",
    longDescription: "Copy.ai is a popular AI writing assistant focused on marketing copy. With 90+ templates covering everything from Facebook ads to product descriptions, it helps marketers generate first drafts quickly. The Workflows feature lets you automate multi-step content processes, making it useful for teams producing content at scale.",
    pros: ["90+ specialized copy templates", "Generous free tier", "Workflow automation", "Fast output generation"],
    cons: ["Output quality trails Claude and ChatGPT", "Best features require paid plan", "Less suited for long-form content"],
    features: [
      { title: "90+ Templates", description: "Specialized templates for ads, emails, social, and sales copy.", icon: "📋" },
      { title: "Brand Voice", description: "Train the AI on your brand tone for consistent output.", icon: "🎙" },
      { title: "Workflows", description: "Chain AI steps together to automate multi-stage content processes.", icon: "⚙️" },
      { title: "Chat Interface", description: "Conversational AI interface for freeform copy generation.", icon: "💬" },
    ],
    useCases: ["Social media ad copy", "Email subject lines", "Product descriptions", "Blog intros and outlines"],
    alternatives: ["jasper", "chatgpt"],
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    tagline: "AI writing assistant for grammar, clarity, and tone",
    category: "Writing",
    icon: "G",
    url: "https://www.grammarly.com",
    price: "Free / $12/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["Grammar and spelling", "Tone detection", "Browser extension"] },
      { name: "Premium", price: "$12/mo", features: ["Full sentence rewrites", "Clarity suggestions", "Plagiarism detection"] },
      { name: "Business", price: "$15/user/mo", features: ["Style guide", "Brand tones", "Team analytics"] },
    ],
    rating: 4.3,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.5 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 9.5 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 7.5 },
    ],
    description: "AI writing assistant that checks grammar, rewrites sentences, and improves clarity.",
    longDescription: "Grammarly is the most widely-used AI writing assistant, with over 30 million daily active users. It integrates into browsers, Microsoft Office, Google Docs, and mobile keyboards, making it available wherever you write. Beyond grammar and spelling, its AI now rewrites full sentences, adjusts tone, and generates text completions.",
    pros: ["Works everywhere via browser extension", "Excellent grammar and spelling", "Real-time tone detection", "Strong free tier"],
    cons: ["Not a full content generator", "Premium rewrites can be bland", "Privacy concerns for sensitive documents"],
    features: [
      { title: "Grammar Check", description: "Real-time grammar, spelling, and punctuation corrections.", icon: "✅" },
      { title: "Clarity Suggestions", description: "Rewrites confusing sentences for better readability.", icon: "💡" },
      { title: "Tone Detector", description: "Analyzes the emotional tone of your writing and suggests adjustments.", icon: "🎭" },
      { title: "Plagiarism Checker", description: "Checks your text against billions of web pages (Premium).", icon: "🔍" },
    ],
    useCases: ["Professional email writing", "Academic papers", "Business communications", "Social media posts"],
    alternatives: ["jasper", "copy-ai"],
  },
  {
    slug: "gemini",
    name: "Google Gemini",
    tagline: "Google's multimodal AI assistant for everyday tasks",
    category: "Writing",
    icon: "G",
    url: "https://gemini.google.com",
    badge: "Google's Best",
    price: "Free / $20/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["Gemini 1.5 Flash", "Google Workspace integration", "Image generation"] },
      { name: "Advanced", price: "$20/mo", features: ["Gemini Ultra", "2TB Google One storage", "Deep Research"] },
    ],
    rating: 4.2,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 9.0 },
      { criterion: "Value for Money", score: 8.0 },
      { criterion: "Feature Depth", score: 8.0 },
    ],
    description: "Google's multimodal AI assistant integrated with Search, Docs, Gmail, and more.",
    longDescription: "Google Gemini is Google's flagship AI assistant, powered by the Gemini Ultra model at the top tier. It integrates natively with Google Workspace — summarizing emails in Gmail, drafting in Docs, analyzing data in Sheets. Gemini stands out for real-time web search integration and its Deep Research feature that produces structured reports from live web sources.",
    pros: ["Deep Google Workspace integration", "Real-time web access", "Strong multimodal capabilities", "Competitive free tier"],
    cons: ["Trails Claude on nuanced writing tasks", "Advanced tier requires Google One subscription", "Less third-party ecosystem"],
    features: [
      { title: "Deep Research", description: "Automated multi-step research that produces structured reports.", icon: "🔬" },
      { title: "Workspace Integration", description: "Native AI assistant in Gmail, Docs, Sheets, and Slides.", icon: "📊" },
      { title: "Real-Time Search", description: "Grounded in live Google Search for up-to-date answers.", icon: "🌐" },
      { title: "Multimodal", description: "Understands text, images, audio, and video inputs.", icon: "🎭" },
    ],
    useCases: ["Drafting emails and docs in Google Workspace", "Research and fact-finding", "Data analysis in Sheets", "Image and video understanding"],
    alternatives: ["chatgpt", "claude", "perplexity-ai"],
  },
  {
    slug: "dalle-3",
    name: "DALL-E 3",
    tagline: "OpenAI's image generator with precise prompt following",
    category: "Image",
    icon: "D",
    url: "https://openai.com/dall-e-3",
    badge: "Best Prompt Accuracy",
    price: "Included in ChatGPT Plus",
    pricingTiers: [
      { name: "ChatGPT Plus", price: "$20/mo", features: ["DALL-E 3 access", "High-resolution images", "Inpainting"] },
      { name: "API", price: "$0.04–$0.12/image", features: ["Programmatic access", "HD quality option", "Batch generation"] },
    ],
    rating: 4.3,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.5 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 7.5 },
    ],
    description: "OpenAI's image generator known for precise prompt adherence and natural language control.",
    longDescription: "DALL-E 3 is OpenAI's image generation model, integrated directly into ChatGPT. Its biggest advantage over competitors is prompt adherence — it accurately renders complex, detailed prompts including specific objects, relationships, and text. Accessible via ChatGPT Plus or the API, it's the easiest way to generate images from natural language.",
    pros: ["Best prompt adherence of any image model", "Integrated into ChatGPT — no extra subscription", "Excellent at text in images", "Natural language editing via chat"],
    cons: ["Aesthetic not as distinctive as Midjourney", "Limited style customization options", "API pricing adds up for bulk generation"],
    features: [
      { title: "Precise Prompt Following", description: "Accurately renders complex, detailed prompts with multiple elements.", icon: "🎯" },
      { title: "Text in Images", description: "Reliably renders legible text within generated images.", icon: "✍️" },
      { title: "ChatGPT Integration", description: "Generate and edit images directly within your ChatGPT conversation.", icon: "💬" },
      { title: "Inpainting", description: "Edit specific regions of an image using natural language.", icon: "✂️" },
    ],
    useCases: ["Blog and article illustrations", "Social media graphics", "Product concept visualization", "Presentation visuals"],
    alternatives: ["midjourney", "stable-diffusion"],
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    tagline: "Open-source image generation you can run locally",
    category: "Image",
    icon: "S",
    url: "https://stability.ai",
    badge: "Open Source",
    price: "Free / self-hosted",
    pricingTiers: [
      { name: "Self-Hosted", price: "Free", features: ["Full model access", "No usage limits", "Custom fine-tuning"] },
      { name: "DreamStudio API", price: "Pay-per-image", features: ["Cloud access", "SD3 model", "No setup required"] },
    ],
    rating: 4.2,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 5.5 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 8.0 },
      { criterion: "Value for Money", score: 10.0 },
      { criterion: "Feature Depth", score: 9.5 },
    ],
    description: "Open-source AI image model you can run locally with unlimited generation and full control.",
    longDescription: "Stable Diffusion is the leading open-source AI image generation model, giving users full control over the generation process. Run it locally on your own GPU with no usage limits, fine-tune it on custom datasets, and access a massive ecosystem of community models and extensions via tools like AUTOMATIC1111 and ComfyUI.",
    pros: ["Completely free to self-host", "Unlimited generations locally", "Huge community model ecosystem", "Full customization and fine-tuning", "Privacy — no data leaves your machine"],
    cons: ["Requires technical setup for self-hosting", "GPU hardware needed for best performance", "Steep learning curve vs. hosted tools"],
    features: [
      { title: "Local Execution", description: "Run entirely on your own hardware with no API calls or usage fees.", icon: "💻" },
      { title: "Custom Fine-Tuning", description: "Train the model on your own images for consistent character or style.", icon: "🎨" },
      { title: "ControlNet", description: "Precise control over image composition using pose, depth, or edge maps.", icon: "🎮" },
      { title: "Community Models", description: "Thousands of fine-tuned models on Civitai for any style or subject.", icon: "🌐" },
    ],
    useCases: ["Unlimited image generation at zero cost", "Custom character and brand style consistency", "Research and experimentation", "Privacy-sensitive image generation"],
    alternatives: ["midjourney", "dalle-3"],
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Agentic AI coding assistant that works in your terminal",
    category: "Coding",
    icon: "A",
    url: "https://claude.ai/code",
    badge: "Agentic Coding",
    price: "Usage-based (API)",
    pricingTiers: [
      { name: "API Usage", price: "$3–$15/M tokens", features: ["Full codebase access", "Terminal integration", "Git operations"] },
      { name: "Max Plan", price: "$100/mo", features: ["High usage limits", "Claude Opus access", "Priority capacity"] },
    ],
    rating: 4.7,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 8.0 },
      { criterion: "Output Quality", score: 9.5 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.0 },
      { criterion: "Feature Depth", score: 9.5 },
    ],
    description: "Anthropic's agentic CLI tool that reads, edits, and runs code across your entire codebase.",
    longDescription: "Claude Code is an agentic coding assistant that runs directly in your terminal, with full access to your file system, shell, and git history. Unlike code autocomplete tools, it can autonomously plan and execute multi-step coding tasks — reading relevant files, editing code, running tests, and committing changes. It's particularly strong at complex refactors and feature implementation in large codebases.",
    pros: ["True agentic execution — not just autocomplete", "Full codebase and shell access", "Excellent reasoning on complex tasks", "Works with any editor or IDE"],
    cons: ["Usage-based pricing can be expensive for heavy use", "CLI-first UX has a learning curve", "Requires API key setup"],
    features: [
      { title: "Agentic Execution", description: "Plans and executes multi-step coding tasks autonomously.", icon: "🤖" },
      { title: "Full File System Access", description: "Reads any file in your repo to build complete context.", icon: "🗂" },
      { title: "Shell Integration", description: "Runs commands, tests, and scripts directly in your terminal.", icon: "⚡" },
      { title: "Git Operations", description: "Creates branches, commits changes, and manages git history.", icon: "📝" },
    ],
    useCases: ["Complex multi-file refactoring", "Feature implementation from spec", "Automated test generation", "Codebase exploration and Q&A"],
    alternatives: ["cursor", "github-copilot"],
  },
  {
    slug: "pika",
    name: "Pika",
    tagline: "AI video generation for fast, expressive short clips",
    category: "Video",
    icon: "P",
    url: "https://pika.art",
    price: "Free / $8/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["150 credits/mo", "Watermarked video", "1080p generation"] },
      { name: "Standard", price: "$8/mo", features: ["700 credits/mo", "No watermark", "Priority generation"] },
      { name: "Unlimited", price: "$28/mo", features: ["Unlimited generations", "4K upscaling", "Longest clips"] },
    ],
    rating: 4.0,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 7.5 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 7.5 },
    ],
    description: "Fast, user-friendly AI video generator for social media clips and creative animation.",
    longDescription: "Pika is a consumer-friendly AI video generation platform that makes creating short video clips accessible to anyone. It supports text-to-video, image-to-video, and video-to-video transformation. Pika 2.0 improved consistency and motion quality significantly, making it competitive for social media content creation without a steep learning curve.",
    pros: ["Easy to use — no technical skills needed", "Affordable entry-level pricing", "Fast generation speed", "Good for social media short clips"],
    cons: ["Shorter clips than professional tools", "Quality trails Runway and Sora", "Credit system limits heavy use"],
    features: [
      { title: "Text-to-Video", description: "Generate video clips from text prompts with motion and scene variety.", icon: "🎬" },
      { title: "Image-to-Video", description: "Animate any still image into a dynamic video.", icon: "🖼" },
      { title: "Modify Region", description: "Select and transform specific parts of a video using AI.", icon: "✂️" },
      { title: "Lip Sync", description: "Automatically sync character mouth movements to audio.", icon: "🎤" },
    ],
    useCases: ["Social media video content", "Product showcase animations", "Quick concept visualization", "Fun creative experiments"],
    alternatives: ["runway", "sora"],
  },
  {
    slug: "sora",
    name: "Sora",
    tagline: "OpenAI's video generation model for cinematic clips",
    category: "Video",
    icon: "S",
    url: "https://sora.com",
    badge: "Best Cinematic Quality",
    price: "$20/mo (ChatGPT Plus)",
    pricingTiers: [
      { name: "ChatGPT Plus", price: "$20/mo", features: ["50 video generations/mo", "Up to 5-second clips", "720p resolution"] },
      { name: "ChatGPT Pro", price: "$200/mo", features: ["500 video generations/mo", "1080p resolution", "20-second clips"] },
    ],
    rating: 4.4,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 8.5 },
      { criterion: "Output Quality", score: 9.0 },
      { criterion: "Speed", score: 7.0 },
      { criterion: "Value for Money", score: 7.5 },
      { criterion: "Feature Depth", score: 8.0 },
    ],
    description: "OpenAI's video generation model producing cinematic, physically realistic short clips.",
    longDescription: "Sora is OpenAI's text-to-video model, delivering some of the highest-quality AI video available. It creates cinematic clips with realistic physics, consistent characters, and smooth motion. Available to ChatGPT Plus subscribers, Sora is best suited for creative professionals who need visually impressive short-form video without extensive post-production.",
    pros: ["Exceptional cinematic quality and realism", "Consistent object and character motion", "Integrated with ChatGPT ecosystem", "Strong at complex scene generation"],
    cons: ["Limited generation quota on Plus tier", "Relatively slow generation", "Short clip lengths on base plan"],
    features: [
      { title: "Realistic Physics", description: "Generates video with physically plausible motion and interactions.", icon: "⚡" },
      { title: "Consistent Characters", description: "Maintains character appearance across frames and scenes.", icon: "🎭" },
      { title: "Story Mode", description: "Chain multiple video clips together into a short narrative.", icon: "📽" },
      { title: "Re-Cut", description: "Edit and remix generated videos with additional prompts.", icon: "✂️" },
    ],
    useCases: ["Cinematic concept visualization", "Advertising and brand videos", "Film and TV prototyping", "Social media hero content"],
    alternatives: ["runway", "pika"],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    tagline: "Hyper-realistic AI voice generation and cloning",
    category: "Audio",
    icon: "E",
    url: "https://elevenlabs.io",
    badge: "Best Voice Quality",
    price: "Free / $5/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["10,000 chars/mo", "10 voices", "Standard quality"] },
      { name: "Starter", price: "$5/mo", features: ["30,000 chars/mo", "30 voices", "Commercial license"] },
      { name: "Creator", price: "$22/mo", features: ["100,000 chars/mo", "Voice cloning", "Projects feature"] },
    ],
    rating: 4.8,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 9.8 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 9.0 },
    ],
    description: "The gold standard for AI voice synthesis — natural, expressive, and cloneable.",
    longDescription: "ElevenLabs produces the most realistic AI-generated voices available, with natural pacing, emotional inflection, and minimal robotic artifacts. It offers an extensive library of pre-built voices plus voice cloning from a short sample. The Projects feature handles long-form narration for podcasts, audiobooks, and video dubbing.",
    pros: ["Best-in-class voice realism", "Voice cloning from short samples", "Multi-language support (29 languages)", "Excellent for audiobooks and narration"],
    cons: ["Character limits on lower tiers", "Cloning voices requires careful ethical use", "API pricing can scale up quickly"],
    features: [
      { title: "Voice Cloning", description: "Clone any voice from a 1-minute sample with high fidelity.", icon: "🎙" },
      { title: "Multilingual", description: "Generate natural speech in 29 languages with native accents.", icon: "🌍" },
      { title: "Projects", description: "Long-form audio production for audiobooks, podcasts, and dubbing.", icon: "📚" },
      { title: "Sound Effects", description: "Generate custom sound effects from text descriptions.", icon: "🔊" },
    ],
    useCases: ["Podcast and audiobook narration", "Video voiceovers and dubbing", "Virtual assistant voices", "Interactive character voices for games"],
    alternatives: ["murf-ai", "descript"],
  },
  {
    slug: "murf-ai",
    name: "Murf AI",
    tagline: "Professional AI voiceover studio for creators",
    category: "Audio",
    icon: "M",
    url: "https://murf.ai",
    price: "$29/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["10 min voice generation", "No download", "10 voices"] },
      { name: "Creator", price: "$29/mo", features: ["2h voice/mo", "60+ voices", "Commercial license"] },
      { name: "Business", price: "$99/mo", features: ["4h voice/mo", "Custom voices", "Team collaboration"] },
    ],
    rating: 4.2,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 8.0 },
      { criterion: "Speed", score: 9.0 },
      { criterion: "Value for Money", score: 7.5 },
      { criterion: "Feature Depth", score: 8.5 },
    ],
    description: "AI voiceover studio with 120+ voices for presentations, videos, and explainers.",
    longDescription: "Murf AI is a professional voiceover studio that lets content creators, marketers, and educators generate studio-quality narration without recording equipment. With 120+ AI voices across 20 languages, a built-in video editor, and Canva integration, Murf is designed as a complete voiceover production tool rather than just a TTS generator.",
    pros: ["120+ high-quality voices", "Built-in video editor with sync", "Canva and Google Slides integration", "Easy studio interface"],
    cons: ["More expensive than ElevenLabs for same quality", "No real-time voice cloning", "Limited voice customization options"],
    features: [
      { title: "Studio Editor", description: "Timeline-based voice editing with pitch, speed, and emphasis controls.", icon: "🎚" },
      { title: "Video Sync", description: "Sync voiceover to video with automatic timing adjustment.", icon: "🎬" },
      { title: "120+ Voices", description: "Professional voice library across 20 languages and many styles.", icon: "🎙" },
      { title: "Canva Integration", description: "Generate voiceovers directly from Canva presentations.", icon: "🎨" },
    ],
    useCases: ["E-learning and training videos", "Marketing explainer videos", "Presentation voiceovers", "YouTube channel narration"],
    alternatives: ["elevenlabs", "descript"],
  },
  {
    slug: "descript",
    name: "Descript",
    tagline: "Edit video and podcasts by editing the transcript",
    category: "Audio",
    icon: "D",
    url: "https://www.descript.com",
    badge: "Best for Podcasters",
    price: "Free / $24/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["1 hour transcription/mo", "Basic editing", "720p export"] },
      { name: "Hobbyist", price: "$24/mo", features: ["10h transcription/mo", "Overdub voice", "4K export"] },
      { name: "Creator", price: "$40/mo", features: ["30h transcription/mo", "Screen recording", "Advanced AI tools"] },
    ],
    rating: 4.5,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.0 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 8.5 },
      { criterion: "Value for Money", score: 8.5 },
      { criterion: "Feature Depth", score: 9.0 },
    ],
    description: "Audio and video editor where you edit the transcript to edit the media — unique and powerful.",
    longDescription: "Descript takes a fundamentally different approach to audio and video editing: you edit the text transcript, and the media changes to match. Delete a word in the transcript and it disappears from the audio/video. The Overdub feature lets you clone your own voice to fix recording mistakes by typing. It's the most approachable professional editing tool for podcasters and video creators.",
    pros: ["Edit media by editing transcript — unique workflow", "Overdub voice cloning for mistake correction", "Excellent for podcast production", "Handles video and screen recording too"],
    cons: ["Not a replacement for professional video editing", "Overdub quality varies with source audio", "Transcription accuracy affects edit quality"],
    features: [
      { title: "Transcript Editing", description: "Edit audio and video by editing the auto-generated transcript.", icon: "✍️" },
      { title: "Overdub", description: "Clone your voice and fix audio mistakes by typing corrections.", icon: "🎙" },
      { title: "Filler Word Removal", description: "One-click removal of 'um', 'uh', and other filler words.", icon: "✂️" },
      { title: "Screen Recording", description: "Built-in screen recorder integrated with the full editing workflow.", icon: "💻" },
    ],
    useCases: ["Podcast production and editing", "YouTube video editing", "Course and tutorial creation", "Remote interview editing"],
    alternatives: ["elevenlabs", "murf-ai"],
  },
  {
    slug: "otter-ai",
    name: "Otter.ai",
    tagline: "AI meeting notes and transcription in real time",
    category: "Productivity",
    icon: "O",
    url: "https://otter.ai",
    badge: "Best for Meetings",
    price: "Free / $17/mo",
    pricingTiers: [
      { name: "Free", price: "$0/mo", features: ["300 min transcription/mo", "Meeting summaries", "Zoom integration"] },
      { name: "Pro", price: "$17/mo", features: ["1,200 min/mo", "Advanced search", "Speaker identification"] },
      { name: "Business", price: "$40/user/mo", features: ["6,000 min/mo", "Admin controls", "Team features"] },
    ],
    rating: 4.3,
    ratingBreakdown: [
      { criterion: "Ease of Use", score: 9.5 },
      { criterion: "Output Quality", score: 8.5 },
      { criterion: "Speed", score: 9.5 },
      { criterion: "Value for Money", score: 9.0 },
      { criterion: "Feature Depth", score: 8.0 },
    ],
    description: "AI meeting assistant that transcribes, summarizes, and extracts action items in real time.",
    longDescription: "Otter.ai is the leading AI meeting assistant, automatically joining your Zoom, Teams, and Google Meet calls to produce real-time transcripts, summaries, and action item lists. Its OtterPilot feature joins meetings autonomously, generates summaries within minutes of the meeting ending, and pushes action items to tools like Salesforce and HubSpot.",
    pros: ["Real-time transcription in meetings", "Automatic action item extraction", "Integrates with Zoom, Teams, Google Meet", "Excellent speaker identification"],
    cons: ["Less accurate on heavy accents", "Summaries can miss nuance", "Limited non-meeting use cases"],
    features: [
      { title: "OtterPilot", description: "Autonomously joins meetings and delivers summaries + action items.", icon: "🤖" },
      { title: "Real-Time Transcription", description: "Live captions during any video call or in-person meeting.", icon: "📝" },
      { title: "Action Item Extraction", description: "Automatically identifies and assigns tasks from meeting content.", icon: "✅" },
      { title: "CRM Integration", description: "Push meeting summaries and action items to Salesforce and HubSpot.", icon: "🔗" },
    ],
    useCases: ["Sales call documentation", "Remote team meetings", "Interview transcription", "Conference and webinar notes"],
    alternatives: ["notion-ai", "chatgpt"],
  },
];

export function getToolBySlug(slug: string): ToolData | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getToolsByCategory(category: string): ToolData[] {
  if (category === "All") return tools;
  return tools.filter((t) => t.category === category);
}

export function getAlternatives(tool: ToolData): ToolData[] {
  return tool.alternatives
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolData => t !== undefined);
}

export const categories = ["All", "Writing", "Coding", "Image", "Video", "Audio", "Productivity", "Research"];

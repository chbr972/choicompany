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

export const categories = ["All", "Writing", "Coding", "Image", "Productivity", "Research"];

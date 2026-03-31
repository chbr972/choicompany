import type { Metadata } from "next";
import AiPromptGeneratorTool from "./AiPromptGeneratorTool";
import InteractiveToolLayout from "@/components/InteractiveToolLayout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

export const metadata: Metadata = {
  title: "Free AI Prompt Generator — Create Better ChatGPT Prompts Instantly",
  description:
    "Generate high-quality prompts for ChatGPT, Claude, Midjourney, and other AI tools. Free AI prompt generator — no sign-up required. Get better results from any AI in seconds.",
  keywords: [
    "AI prompt generator",
    "ChatGPT prompts",
    "free prompt generator",
    "Claude prompts",
    "prompt engineering tool",
    "AI prompt tool",
    "free AI prompt generator",
    "Midjourney prompts",
  ],
  openGraph: {
    type: "website",
    title: "Free AI Prompt Generator — Create Better ChatGPT Prompts Instantly",
    description:
      "Generate high-quality prompts for ChatGPT, Claude, Midjourney, and other AI tools. Free, no sign-up required.",
    url: `${siteUrl}/tools/ai-prompt-generator`,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Prompt Generator — Create Better ChatGPT Prompts Instantly",
    description:
      "Generate high-quality prompts for ChatGPT, Claude, Midjourney, and other AI tools. Free, no sign-up required.",
  },
  alternates: {
    canonical: `${siteUrl}/tools/ai-prompt-generator`,
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Choose your AI and task type",
    description:
      "Select which AI tool you're targeting (ChatGPT, Claude, Midjourney, etc.) and the type of task you want to accomplish.",
  },
  {
    step: 2,
    title: "Describe your goal",
    description:
      "Enter a brief description of what you want the AI to do. Don't worry about phrasing — we'll handle that.",
  },
  {
    step: 3,
    title: "Customize tone and style",
    description:
      "Optionally set the tone (professional, casual, creative) and any specific requirements.",
  },
  {
    step: 4,
    title: "Generate and copy",
    description:
      "Click Generate to get an optimized prompt. Copy it directly into your AI tool and get better results.",
  },
];

const FAQS = [
  {
    question: "What is an AI prompt generator?",
    answer:
      "An AI prompt generator is a free tool that helps you write better instructions (prompts) for AI tools like ChatGPT, Claude, and Midjourney. Instead of guessing how to phrase your request, the generator crafts an optimized prompt that gets you higher-quality results from any AI.",
  },
  {
    question: "How do I write a good ChatGPT prompt?",
    answer:
      "Good ChatGPT prompts are specific, include context, define the desired format or tone, and give the AI a clear role. For example: \"Act as a senior marketing strategist. Write a 300-word product description for [product] targeting [audience]. Use a confident, conversational tone.\" Our free AI prompt generator handles this structure automatically.",
  },
  {
    question: "Does this tool work for Midjourney prompts?",
    answer:
      "Yes. Our AI prompt generator supports image generation tools including Midjourney, DALL-E, and Stable Diffusion. Select the image generation task type and your target tool, and the generator will produce a structured, descriptive prompt optimized for that platform.",
  },
  {
    question: "Is this AI prompt generator really free?",
    answer:
      "Yes — completely free, no account or sign-up required. You can generate unlimited prompts directly in your browser.",
  },
  {
    question: "What is prompt engineering?",
    answer:
      "Prompt engineering is the practice of designing effective inputs for AI language models to get better, more accurate, and more useful outputs. Well-engineered prompts specify context, role, format, tone, and constraints. This tool automates prompt engineering so you don't have to learn it from scratch.",
  },
  {
    question: "Can I use generated prompts with Claude or Gemini?",
    answer:
      "Yes. Generated prompts work with any major AI assistant: ChatGPT, Claude, Gemini, Perplexity, Copilot, and others. You can also select your specific target AI when generating so the prompt is tailored to that model's strengths.",
  },
];

const RELATED_TOOLS = [
  {
    name: "AI Text Summarizer",
    href: "/tools/ai-text-summarizer",
    description: "Paste any text and get a concise, accurate summary in seconds.",
  },
  {
    name: "AI Comparison Table",
    href: "/tools/ai-comparison-table",
    description: "Build side-by-side feature comparisons of any AI tools.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/tools/ai-prompt-generator#software`,
      name: "AI Prompt Generator",
      description:
        "Free tool to generate optimized prompts for ChatGPT, Claude, Midjourney, and other AI tools. No sign-up required.",
      url: `${siteUrl}/tools/ai-prompt-generator`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "ChatGPT prompt generation",
        "Midjourney prompt generation",
        "Claude prompt generation",
        "Tone and style customization",
        "One-click copy",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Use the Free AI Prompt Generator",
      description:
        "Generate optimized ChatGPT and AI prompts in four steps using our free prompt generator tool.",
      step: HOW_TO_STEPS.map((s) => ({
        "@type": "HowToStep",
        position: s.step,
        name: s.title,
        text: s.description,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "AI Tools", item: `${siteUrl}/tools` },
        {
          "@type": "ListItem",
          position: 3,
          name: "AI Prompt Generator",
          item: `${siteUrl}/tools/ai-prompt-generator`,
        },
      ],
    },
  ],
};

export default function AiPromptGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveToolLayout
        title="Free AI Prompt Generator"
        description="Generate perfectly crafted prompts for ChatGPT, Claude, Midjourney, and more. Get better AI results instantly — free, no sign-up."
        category="Free AI Tool"
        categoryColor="bg-emerald-100 text-emerald-700"
        breadcrumbLabel="AI Prompt Generator"
        howToSteps={HOW_TO_STEPS}
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
      >
        <AiPromptGeneratorTool />
      </InteractiveToolLayout>
    </>
  );
}

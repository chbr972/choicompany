import type { Metadata } from "next";
import AiPromptLibraryTool from "./AiPromptLibraryTool";
import InteractiveToolLayout from "@/components/InteractiveToolLayout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

export const metadata: Metadata = {
  title: "Free AI Prompt Templates Library — 50+ Ready-to-Use Prompts",
  description:
    "Browse 50+ free AI prompt templates for ChatGPT, Claude, Midjourney, and more. Organized by use case: email, marketing, coding, creative writing, and more. Copy in one click.",
  keywords: [
    "AI prompt templates",
    "ChatGPT prompt library",
    "best AI prompts",
    "prompt templates for ChatGPT",
    "Claude prompts",
    "Midjourney prompts",
    "free prompt library",
  ],
  alternates: {
    canonical: `${siteUrl}/tools/ai-prompt-library`,
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Browse or search",
    description:
      "Use the search bar to find prompts by keyword, or filter by category (email, marketing, coding, etc.) and AI tool.",
  },
  {
    step: 2,
    title: "Preview the prompt",
    description:
      "Click 'Preview' on any template to read the full prompt text before copying.",
  },
  {
    step: 3,
    title: "Copy in one click",
    description:
      "Hit 'Copy' to instantly copy the prompt to your clipboard — ready to paste into ChatGPT, Claude, or any AI tool.",
  },
  {
    step: 4,
    title: "Customize the placeholders",
    description:
      "Replace the bracketed placeholders like [product name] or [target audience] with your specific details for best results.",
  },
];

const RELATED_TOOLS = [
  {
    name: "AI Prompt Generator",
    href: "/tools/ai-prompt-generator",
    description: "Generate custom prompts for ChatGPT, Claude, and Midjourney from scratch.",
  },
  {
    name: "AI Writing Tone Analyzer",
    href: "/tools/ai-tone-analyzer",
    description: "Analyze and improve the tone of your writing instantly.",
  },
  {
    name: "AI Text Summarizer",
    href: "/tools/ai-text-summarizer",
    description: "Paste any text and get a concise, accurate summary in seconds.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${siteUrl}/tools/ai-prompt-library`,
  name: "AI Prompt Templates Library",
  description:
    "Free library of 50+ AI prompt templates for ChatGPT, Claude, Midjourney, and more.",
  url: `${siteUrl}/tools/ai-prompt-library`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function AiPromptLibraryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveToolLayout
        title="AI Prompt Templates Library"
        description="50+ ready-to-use prompt templates for ChatGPT, Claude, Midjourney, and more. Filter by use case, copy in one click, and customize with your own details."
        category="Free AI Tool"
        categoryColor="bg-purple-100 text-purple-700"
        breadcrumbLabel="AI Prompt Library"
        howToSteps={HOW_TO_STEPS}
        relatedTools={RELATED_TOOLS}
      >
        <AiPromptLibraryTool />
      </InteractiveToolLayout>
    </>
  );
}

import type { Metadata } from "next";
import AiToneAnalyzerTool from "./AiToneAnalyzerTool";
import InteractiveToolLayout from "@/components/InteractiveToolLayout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

export const metadata: Metadata = {
  title: "Free AI Writing Tone Analyzer — Check Your Writing Tone Instantly",
  description:
    "Analyze the tone of any text instantly. Detect formal, casual, persuasive, technical, or empathetic writing styles with actionable suggestions. Free, no sign-up.",
  keywords: [
    "tone analyzer",
    "writing tone checker",
    "tone of voice analyzer",
    "writing style checker",
    "text tone detector",
    "free tone analyzer",
  ],
  alternates: {
    canonical: `${siteUrl}/tools/ai-tone-analyzer`,
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Paste your text",
    description:
      "Copy and paste any writing — an email, blog post, marketing copy, essay, or message. Up to 5,000 characters.",
  },
  {
    step: 2,
    title: "Click Analyze Tone",
    description:
      "Our tool scans your text for linguistic patterns, keyword frequency, and sentence structure to determine tone.",
  },
  {
    step: 3,
    title: "Review the breakdown",
    description:
      "See your primary tone, a percentage breakdown of all detected tones, and key readability stats.",
  },
  {
    step: 4,
    title: "Apply the suggestions",
    description:
      "Use the targeted suggestions to adjust your tone to match your intended audience and communication goal.",
  },
];

const RELATED_TOOLS = [
  {
    name: "AI Text Summarizer",
    href: "/tools/ai-text-summarizer",
    description: "Paste any text and get a concise, accurate summary in seconds.",
  },
  {
    name: "AI Prompt Generator",
    href: "/tools/ai-prompt-generator",
    description: "Generate optimized prompts for ChatGPT, Claude, Midjourney, and more.",
  },
  {
    name: "AI Model Pricing Calculator",
    href: "/tools/ai-pricing-calculator",
    description: "Compare API costs across GPT-4, Claude, Gemini, and other AI models.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${siteUrl}/tools/ai-tone-analyzer`,
  name: "AI Writing Tone Analyzer",
  description:
    "Free tool to analyze the tone of any text — formal, casual, persuasive, technical, or empathetic.",
  url: `${siteUrl}/tools/ai-tone-analyzer`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function AiToneAnalyzerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveToolLayout
        title="AI Writing Tone Analyzer"
        description="Instantly detect the tone of any text — formal, casual, persuasive, technical, and more. Get a full breakdown and actionable tips to refine your writing."
        category="Free AI Tool"
        categoryColor="bg-amber-100 text-amber-700"
        breadcrumbLabel="AI Tone Analyzer"
        howToSteps={HOW_TO_STEPS}
        relatedTools={RELATED_TOOLS}
      >
        <AiToneAnalyzerTool />
      </InteractiveToolLayout>
    </>
  );
}

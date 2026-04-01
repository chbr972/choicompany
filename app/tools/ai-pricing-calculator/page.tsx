import type { Metadata } from "next";
import AiPricingCalculatorTool from "./AiPricingCalculatorTool";
import InteractiveToolLayout from "@/components/InteractiveToolLayout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

export const metadata: Metadata = {
  title: "Free AI Model Pricing Calculator — Compare GPT-4, Claude, Gemini API Costs",
  description:
    "Compare AI API costs across GPT-4, Claude, Gemini, and more. Enter your token usage and monthly call volume to see exact pricing. Free, no sign-up required.",
  keywords: [
    "AI model pricing calculator",
    "GPT-4 API cost",
    "Claude API pricing",
    "Gemini API cost",
    "AI API cost comparison",
    "LLM pricing calculator",
    "ChatGPT API cost calculator",
  ],
  alternates: {
    canonical: `${siteUrl}/tools/ai-pricing-calculator`,
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Choose a use case preset or enter tokens manually",
    description:
      "Select a quick preset (blog post, code generation, document analysis) or enter your own input and output token counts per API call.",
  },
  {
    step: 2,
    title: "Enter your monthly call volume",
    description:
      "Type how many API requests you expect per month. This lets us calculate your total monthly cost per model.",
  },
  {
    step: 3,
    title: "Filter and sort the results",
    description:
      "Filter by provider (OpenAI, Anthropic, Google, etc.) and sort by cost or name to compare models side by side.",
  },
  {
    step: 4,
    title: "Pick the right model for your budget",
    description:
      "See per-call and monthly costs for every model. Use the cost breakdown to choose the best model for your performance and budget needs.",
  },
];

const RELATED_TOOLS = [
  {
    name: "AI Comparison Table",
    href: "/tools/ai-comparison-table",
    description: "Build side-by-side feature comparisons of any AI tools.",
  },
  {
    name: "AI Prompt Generator",
    href: "/tools/ai-prompt-generator",
    description: "Generate optimized prompts for ChatGPT, Claude, and more.",
  },
  {
    name: "AI Writing Tone Analyzer",
    href: "/tools/ai-tone-analyzer",
    description: "Analyze and improve the tone of your writing instantly.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${siteUrl}/tools/ai-pricing-calculator`,
  name: "AI Model Pricing Calculator",
  description:
    "Free tool to compare API costs across GPT-4, Claude, Gemini, and other AI models based on your token usage.",
  url: `${siteUrl}/tools/ai-pricing-calculator`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function AiPricingCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveToolLayout
        title="AI Model Pricing Calculator"
        description="Compare exact API costs for GPT-4, Claude, Gemini, Llama, and more. Enter your token count and monthly call volume to find the most cost-effective AI model for your use case."
        category="Free AI Tool"
        categoryColor="bg-indigo-100 text-indigo-700"
        breadcrumbLabel="AI Pricing Calculator"
        howToSteps={HOW_TO_STEPS}
        relatedTools={RELATED_TOOLS}
      >
        <AiPricingCalculatorTool />
      </InteractiveToolLayout>
    </>
  );
}

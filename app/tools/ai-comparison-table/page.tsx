import type { Metadata } from "next";
import AiComparisonTableTool from "./AiComparisonTableTool";
import InteractiveToolLayout from "@/components/InteractiveToolLayout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

export const metadata: Metadata = {
  title: "Free AI Comparison Table — Compare AI Tools Side by Side (ChatGPT vs Claude & More)",
  description:
    "Build instant side-by-side AI tool comparison tables. Compare ChatGPT vs Claude, Gemini, and more — features, pricing, and capabilities. Free AI comparison tool, no sign-up.",
  keywords: [
    "AI tool comparison",
    "compare AI tools",
    "ChatGPT vs Claude",
    "AI comparison table",
    "AI tool comparison generator",
    "compare ChatGPT",
    "AI features comparison",
    "free AI comparison tool",
  ],
  openGraph: {
    type: "website",
    title: "Free AI Comparison Table — Compare AI Tools Side by Side",
    description:
      "Build instant side-by-side comparison tables for any AI tools. Compare ChatGPT vs Claude, Gemini, and more. Free, no sign-up.",
    url: `${siteUrl}/tools/ai-comparison-table`,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Comparison Table — Compare AI Tools Side by Side",
    description:
      "Build instant side-by-side comparison tables for any AI tools. Compare ChatGPT vs Claude, Gemini, and more. Free, no sign-up.",
  },
  alternates: {
    canonical: `${siteUrl}/tools/ai-comparison-table`,
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Select the AI tools to compare",
    description:
      "Pick 2–4 AI tools from our list of popular options, or type in any tool name.",
  },
  {
    step: 2,
    title: "Choose comparison categories",
    description:
      "Select which feature categories matter most to you: pricing, capabilities, integrations, etc.",
  },
  {
    step: 3,
    title: "Generate the table",
    description:
      "We build a structured comparison table with clear, honest data for each tool.",
  },
  {
    step: 4,
    title: "Copy or share",
    description:
      "Copy the table as text or link to our full comparison reviews for deeper detail.",
  },
];

const FAQS = [
  {
    question: "How do I compare AI tools effectively?",
    answer:
      "To compare AI tools effectively, focus on the criteria that matter for your use case: pricing (free tier limits, cost per seat), core capabilities (writing, coding, research, image generation), context window size, and integrations. Our AI comparison table tool lets you generate structured side-by-side comparisons in seconds.",
  },
  {
    question: "Is ChatGPT better than Claude?",
    answer:
      "It depends on the task. Claude generally produces higher-quality long-form writing and has a stronger 200K token context window for processing long documents. ChatGPT has a larger plugin ecosystem, built-in image generation via DALL-E, and is more versatile across general tasks. Use our comparison tool to build a tailored feature table for your specific needs.",
  },
  {
    question: "Which AI tool is best for business?",
    answer:
      "For business use, the top AI tools are ChatGPT (versatile, large ecosystem), Claude (best for writing-heavy workflows), Gemini Advanced (best for Google Workspace users), and Microsoft Copilot (best for Microsoft 365 environments). Pricing, compliance features, and integrations vary significantly — our comparison table helps you evaluate them side by side.",
  },
  {
    question: "Is this AI comparison tool free?",
    answer:
      "Yes — completely free. No account, no sign-up, no watermarks. Use it as many times as you need.",
  },
  {
    question: "Can I compare more than two AI tools at once?",
    answer:
      "Yes. Our comparison table supports comparing 2 to 4 AI tools simultaneously, with customizable feature categories so you can focus on what matters most for your decision.",
  },
  {
    question: "Where can I read full AI tool reviews?",
    answer:
      "We publish in-depth reviews of all major AI tools on our site. Browse our full review library covering ChatGPT, Claude, Gemini, Perplexity, Cursor, GitHub Copilot, and more.",
  },
];

const RELATED_TOOLS = [
  {
    name: "AI Prompt Generator",
    href: "/tools/ai-prompt-generator",
    description: "Generate optimized prompts for ChatGPT, Claude, Midjourney, and more.",
  },
  {
    name: "AI Text Summarizer",
    href: "/tools/ai-text-summarizer",
    description: "Paste any text and get a concise, accurate summary in seconds.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/tools/ai-comparison-table#software`,
      name: "AI Comparison Table Builder",
      description:
        "Free tool to build side-by-side comparison tables for any AI tools — ChatGPT vs Claude, Gemini, and more.",
      url: `${siteUrl}/tools/ai-comparison-table`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Side-by-side AI tool comparison",
        "ChatGPT vs Claude comparison",
        "Customizable comparison categories",
        "Pricing comparison",
        "Feature matrix export",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Compare AI Tools Side by Side",
      description:
        "Build a structured AI tool comparison table in four steps using our free comparison generator.",
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
          name: "AI Comparison Table",
          item: `${siteUrl}/tools/ai-comparison-table`,
        },
      ],
    },
  ],
};

export default function AiComparisonTablePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveToolLayout
        title="AI Tool Comparison Table"
        description="Build instant side-by-side feature comparison tables for any AI tools. See how ChatGPT, Claude, Gemini, and others stack up — free, no sign-up."
        category="Free AI Tool"
        categoryColor="bg-brand-100 text-brand-700"
        breadcrumbLabel="AI Comparison Table"
        howToSteps={HOW_TO_STEPS}
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
      >
        <AiComparisonTableTool />
      </InteractiveToolLayout>
    </>
  );
}

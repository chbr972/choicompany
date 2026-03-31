import type { Metadata } from "next";
import AiTextSummarizerTool from "./AiTextSummarizerTool";
import InteractiveToolLayout from "@/components/InteractiveToolLayout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

export const metadata: Metadata = {
  title: "Free AI Text Summarizer — Summarize Any Article or Text in Seconds",
  description:
    "Paste any article, document, or text and get an instant AI-powered summary. Free AI text summarizer — choose summary length and format, no sign-up required.",
  keywords: [
    "AI text summarizer",
    "free AI summarizer",
    "summarize text AI",
    "summarize article",
    "text summarization tool",
    "AI summary generator",
    "free text summarizer",
    "document summarizer",
  ],
  openGraph: {
    type: "website",
    title: "Free AI Text Summarizer — Summarize Any Article or Text in Seconds",
    description:
      "Paste any article, document, or text and get an instant AI-powered summary. Free, no sign-up required.",
    url: `${siteUrl}/tools/ai-text-summarizer`,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Text Summarizer — Summarize Any Article or Text in Seconds",
    description:
      "Paste any article, document, or text and get an instant AI-powered summary. Free, no sign-up required.",
  },
  alternates: {
    canonical: `${siteUrl}/tools/ai-text-summarizer`,
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Paste your text",
    description:
      "Copy and paste any text — an article, essay, report, email, or document. Up to 10,000 characters.",
  },
  {
    step: 2,
    title: "Choose your summary style",
    description:
      "Select how long the summary should be and whether you want key bullet points, a paragraph, or both.",
  },
  {
    step: 3,
    title: "Summarize",
    description:
      "Click Summarize and get an instant, accurate summary that captures the key ideas.",
  },
  {
    step: 4,
    title: "Copy and use",
    description:
      "Copy the summary to your clipboard and use it however you need — notes, briefings, reports.",
  },
];

const FAQS = [
  {
    question: "What is an AI text summarizer?",
    answer:
      "An AI text summarizer is a free tool that reads a long piece of text — an article, report, essay, or document — and generates a concise summary that captures the main points. It uses large language models to understand context and meaning, not just keywords.",
  },
  {
    question: "How accurate is AI text summarization?",
    answer:
      "Modern AI summarizers are highly accurate for factual, structured content like news articles, research papers, reports, and business documents. They may miss nuance in highly technical or creative texts. Always review the summary against the original for high-stakes use cases.",
  },
  {
    question: "Can I summarize a PDF or document?",
    answer:
      "To summarize a PDF, copy the text content from the document and paste it into the summarizer. Most PDFs allow text selection and copy. For scanned PDFs, you may need an OCR tool first to extract the text.",
  },
  {
    question: "Is this AI summarizer free?",
    answer:
      "Yes — completely free with no sign-up required. Paste your text and get an instant summary directly in your browser.",
  },
  {
    question: "How long can the text be?",
    answer:
      "Our free AI text summarizer supports up to 10,000 characters (roughly 1,500–2,000 words). For longer documents, summarize in sections for best results.",
  },
  {
    question: "What are the best use cases for AI text summarization?",
    answer:
      "AI text summarization is most useful for: quickly reviewing research papers or academic articles, condensing long reports into executive briefs, summarizing news articles and blog posts for research, generating meeting notes from transcripts, and processing large volumes of content for analysis.",
  },
  {
    question: "How is AI summarization different from copy-pasting key sentences?",
    answer:
      "AI summarization understands the meaning of a text and synthesizes it into new, coherent sentences — it doesn't just extract existing sentences. This produces more natural, accurate summaries that handle paraphrasing, implied meaning, and structural reorganization that simple extraction can't do.",
  },
];

const RELATED_TOOLS = [
  {
    name: "AI Prompt Generator",
    href: "/tools/ai-prompt-generator",
    description: "Generate optimized prompts for ChatGPT, Claude, Midjourney, and more.",
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
      "@id": `${siteUrl}/tools/ai-text-summarizer#software`,
      name: "AI Text Summarizer",
      description:
        "Free tool to summarize any text, article, or document instantly using AI. No sign-up required.",
      url: `${siteUrl}/tools/ai-text-summarizer`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Instant AI text summarization",
        "Bullet point and paragraph summary formats",
        "Adjustable summary length",
        "Article and document summarization",
        "One-click copy",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Summarize Text with AI",
      description:
        "Summarize any article, document, or text in four steps using our free AI text summarizer.",
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
          name: "AI Text Summarizer",
          item: `${siteUrl}/tools/ai-text-summarizer`,
        },
      ],
    },
  ],
};

export default function AiTextSummarizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveToolLayout
        title="Free AI Text Summarizer"
        description="Paste any article, report, or document and get an instant, accurate summary. Ideal for research, briefings, and saving time on long reads — free, no sign-up."
        category="Free AI Tool"
        categoryColor="bg-accent-100 text-accent-700"
        breadcrumbLabel="AI Text Summarizer"
        howToSteps={HOW_TO_STEPS}
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
      >
        <AiTextSummarizerTool />
      </InteractiveToolLayout>
    </>
  );
}

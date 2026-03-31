"use client";

import Link from "next/link";
import { useState } from "react";
import AdSlot from "@/components/AdSlot";

interface RelatedTool {
  name: string;
  href: string;
  description: string;
}

interface HowToStep {
  step: number;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface InteractiveToolLayoutProps {
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  breadcrumbLabel: string;
  howToSteps?: HowToStep[];
  relatedTools?: RelatedTool[];
  faqs?: FAQ[];
  children: React.ReactNode;
}

function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-ink-200 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-white hover:bg-ink-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-ink-900 text-sm leading-snug">{faq.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 text-ink-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
            >
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4 text-sm text-ink-500 leading-relaxed bg-ink-50 border-t border-ink-100">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function InteractiveToolLayout({
  title,
  description,
  category,
  categoryColor = "bg-brand-100 text-brand-700",
  breadcrumbLabel,
  howToSteps = [],
  relatedTools = [],
  faqs = [],
  children,
}: InteractiveToolLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 via-white to-white py-10 sm:py-14 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-400">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-brand-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-300">/</li>
              <li>
                <Link href="/tools" className="hover:text-brand-600 transition-colors">
                  AI Tools
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-300">/</li>
              <li className="text-ink-600 line-clamp-1">{breadcrumbLabel}</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span
                className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${categoryColor}`}
              >
                {category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 leading-tight tracking-tight mb-2">
                {title}
              </h1>
              <p className="text-ink-500 text-base sm:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Free Tool
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Leaderboard ad — above the tool, non-intrusive */}
        <div className="flex justify-center mb-8">
          <AdSlot
            slot="3344556677"
            format="leaderboard"
            className="w-full max-w-[728px]"
            showLabel
          />
        </div>

        <div className="flex gap-8 lg:gap-10">
          {/* Tool area */}
          <div className="flex-1 min-w-0">
            {/* Tool widget */}
            <div className="rounded-2xl border border-ink-200 bg-white shadow-card overflow-hidden mb-8">
              {children}
            </div>

            {/* In-article ad below tool — separated by clear whitespace */}
            <div className="my-6 rounded-xl overflow-hidden bg-ink-50 p-4 border border-ink-100">
              <AdSlot slot="8899001122" format="in-article" showLabel />
            </div>

            {/* How to use */}
            {howToSteps.length > 0 && (
              <section className="mt-8 pt-8 border-t border-ink-200">
                <h2 className="text-xl font-bold text-ink-900 mb-5">How to Use This Tool</h2>
                <ol className="space-y-4">
                  {howToSteps.map((s) => (
                    <li key={s.step} className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                        {s.step}
                      </div>
                      <div>
                        <p className="font-semibold text-ink-900 mb-0.5">{s.title}</p>
                        <p className="text-sm text-ink-500 leading-relaxed">{s.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* FAQ section */}
            {faqs.length > 0 && (
              <section className="mt-8 pt-8 border-t border-ink-200">
                <h2 className="text-xl font-bold text-ink-900 mb-5">Frequently Asked Questions</h2>
                <FaqAccordion faqs={faqs} />
              </section>
            )}

            {/* Multiplex ad at bottom */}
            <div className="mt-10 pt-8 border-t border-ink-200">
              <AdSlot slot="2211334455" format="multiplex" showLabel className="w-full" />
            </div>

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <section className="mt-12 pt-8 border-t border-ink-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-label">More Free AI Tools</span>
                  <div className="flex-1 h-px bg-ink-200" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group block p-5 rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all bg-white"
                    >
                      <h3 className="text-sm font-semibold text-ink-900 group-hover:text-brand-600 transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-ink-400 leading-relaxed">{tool.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — ads only, sticky */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-[140px] space-y-6">
              <AdSlot
                slot="5566778899"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />
              <AdSlot
                slot="9988776655"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />

              {/* CTA to reviews */}
              <div className="rounded-2xl bg-brand-50 border border-brand-100 p-5">
                <h3 className="font-bold text-ink-900 text-sm mb-2">Want full AI reviews?</h3>
                <p className="text-xs text-ink-500 mb-4 leading-relaxed">
                  We test and rate the top AI tools so you know exactly what to use.
                </p>
                <Link href="/tools" className="btn-primary text-xs px-4 py-2 inline-flex">
                  Browse Reviews →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

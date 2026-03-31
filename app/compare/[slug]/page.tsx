import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllComparisonSlugs, getComparisonBySlug, getSortedComparisonsMeta } from "@/lib/comparisons";
import { getSortedToolsMeta } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllComparisonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const comparison = await getComparisonBySlug(params.slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";
    return {
      title: comparison.title,
      description: comparison.description,
      keywords: comparison.tags,
      authors: [{ name: comparison.author }],
      openGraph: {
        type: "article",
        title: comparison.title,
        description: comparison.description,
        url: `${siteUrl}/compare/${comparison.slug}`,
        publishedTime: comparison.date,
        modifiedTime: comparison.date,
        tags: comparison.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: comparison.title,
        description: comparison.description,
      },
      alternates: {
        canonical: `${siteUrl}/compare/${comparison.slug}`,
      },
    };
  } catch {
    return { title: "Comparison Not Found" };
  }
}

export default async function ComparisonPage({ params }: Props) {
  let comparison;
  try {
    comparison = await getComparisonBySlug(params.slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "IssueByte";

  const allTools = getSortedToolsMeta();
  const featuredTools = allTools.filter((t) =>
    comparison.tools.some((name) => t.toolName.toLowerCase() === name.toLowerCase())
  );

  const allComparisons = getSortedComparisonsMeta();
  const relatedComparisons = allComparisons
    .filter((c) => c.slug !== comparison.slug && c.category === comparison.category)
    .slice(0, 2);

  // ItemList schema for comparison page
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/compare/${comparison.slug}#article`,
        headline: comparison.title,
        description: comparison.description,
        keywords: comparison.tags.join(", "),
        author: {
          "@type": "Person",
          name: comparison.author,
        },
        datePublished: comparison.date,
        dateModified: comparison.date,
        url: `${siteUrl}/compare/${comparison.slug}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteName,
          url: siteUrl,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/compare/${comparison.slug}#itemlist`,
        name: comparison.title,
        description: comparison.description,
        url: `${siteUrl}/compare/${comparison.slug}`,
        numberOfItems: comparison.tools.length,
        itemListElement: comparison.tools.map((toolName, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: toolName,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: `${siteUrl}/compare` },
          { "@type": "ListItem", position: 3, name: comparison.title, item: `${siteUrl}/compare/${comparison.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-400">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-brand-600 transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li><Link href="/compare" className="hover:text-brand-600 transition-colors">Comparisons</Link></li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li className="text-ink-600 line-clamp-1">{comparison.tools.join(" vs ")}</li>
          </ol>
        </nav>

        <div className="flex gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {comparison.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-[1.15] tracking-tight font-serif">
                {comparison.title}
              </h1>
              <p className="text-xl text-ink-500 mb-6 leading-relaxed">{comparison.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-400 pb-6 border-b border-ink-200">
                <span className="font-medium text-ink-600">{comparison.author}</span>
                <span className="w-1 h-1 rounded-full bg-ink-300" />
                <time dateTime={comparison.date}>
                  {new Date(comparison.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span className="w-1 h-1 rounded-full bg-ink-300" />
                <span>{comparison.readingTime}</span>
              </div>
            </header>

            {/* Quick links to individual reviews */}
            {featuredTools.length > 0 && (
              <div className="mb-8 p-5 rounded-2xl bg-ink-50 border border-ink-200">
                <p className="text-sm font-semibold text-ink-500 mb-3">Jump to individual reviews:</p>
                <div className="flex flex-wrap gap-2">
                  {featuredTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2 transition-colors"
                    >
                      {tool.toolName} Review →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison body */}
            <div
              className="prose-content text-[1.0625rem] leading-[1.85]"
              dangerouslySetInnerHTML={{ __html: comparison.content }}
            />

            {/* Mid-article ad */}
            <div className="my-8 rounded-xl overflow-hidden bg-ink-50 p-4 border border-ink-100">
              <AdSlot slot="7788990011" format="in-article" showLabel />
            </div>

            {/* Bottom ad */}
            <div className="mt-10 pt-8 border-t border-ink-200">
              <AdSlot slot="1100998877" format="multiplex" showLabel className="w-full" />
            </div>

            {/* Related comparisons */}
            {relatedComparisons.length > 0 && (
              <section className="mt-12 pt-8 border-t border-ink-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-label">More Comparisons</span>
                  <div className="flex-1 h-px bg-ink-200" />
                  <Link href="/compare" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    View all →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedComparisons.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/compare/${c.slug}`}
                      className="group block p-5 rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all bg-white"
                    >
                      <p className="text-xs text-ink-400 mb-1">{c.tools.join(" vs ")}</p>
                      <h3 className="text-sm font-semibold text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {c.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA to tools */}
            <div className="mt-10 p-6 rounded-2xl bg-brand-50 border border-brand-100 text-center">
              <h2 className="text-lg font-bold text-ink-900 mb-2">Read the full reviews</h2>
              <div className="flex flex-wrap justify-center gap-3 mt-3">
                {featuredTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="btn-primary inline-flex text-sm"
                  >
                    {tool.toolName} Review
                  </Link>
                ))}
                <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 px-4 py-2 rounded-lg border border-brand-200 hover:border-brand-300 transition-all">
                  All AI Tools
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-[140px] space-y-6">
              <AdSlot slot="2233445566" format="rectangle" className="w-[300px] h-[250px]" responsive={false} showLabel />
              <AdSlot slot="6655778899" format="rectangle" className="w-[300px] h-[250px]" responsive={false} showLabel />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

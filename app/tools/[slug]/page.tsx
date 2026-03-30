import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllToolSlugs, getToolBySlug, getSortedToolsMeta } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const tool = await getToolBySlug(params.slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
    return {
      title: tool.title,
      description: tool.description,
      keywords: tool.tags,
      authors: [{ name: tool.author }],
      openGraph: {
        type: "article",
        title: tool.title,
        description: tool.description,
        url: `${siteUrl}/tools/${tool.slug}`,
        publishedTime: tool.date,
        modifiedTime: tool.date,
        tags: tool.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: tool.title,
        description: tool.description,
      },
      alternates: {
        canonical: `${siteUrl}/tools/${tool.slug}`,
      },
    };
  } catch {
    return { title: "Tool Not Found" };
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ${i < Math.floor(rating) ? "" : i < rating ? "opacity-50" : "opacity-20"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-ink-700 font-bold text-lg">{rating.toFixed(1)}</span>
      <span className="text-ink-400 text-sm">/5</span>
    </span>
  );
}

export default async function ToolReviewPage({ params }: Props) {
  let tool;
  try {
    tool = await getToolBySlug(params.slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

  const allTools = getSortedToolsMeta();
  const relatedTools = allTools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3);

  // SoftwareApplication schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/tools/${tool.slug}#software`,
        name: tool.toolName,
        description: tool.description,
        url: tool.toolUrl,
        applicationCategory: tool.category,
        operatingSystem: tool.operatingSystem,
        offers: {
          "@type": "Offer",
          price: tool.startingPrice === "Free" ? "0" : tool.startingPrice.replace(/[^0-9.]/g, ""),
          priceCurrency: "USD",
          description: `${tool.pricingModel} — ${tool.startingPrice}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tool.rating.toString(),
          bestRating: "5",
          worstRating: "1",
          ratingCount: "1",
        },
        author: {
          "@type": "Organization",
          name: tool.toolDeveloper,
        },
      },
      {
        "@type": "Review",
        "@id": `${siteUrl}/tools/${tool.slug}#review`,
        itemReviewed: { "@id": `${siteUrl}/tools/${tool.slug}#software` },
        reviewRating: {
          "@type": "Rating",
          ratingValue: tool.rating.toString(),
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteName,
        },
        datePublished: tool.date,
        reviewBody: tool.description,
        url: `${siteUrl}/tools/${tool.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "AI Tools", item: `${siteUrl}/tools` },
          { "@type": "ListItem", position: 3, name: tool.title, item: `${siteUrl}/tools/${tool.slug}` },
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
            <li><Link href="/tools" className="hover:text-brand-600 transition-colors">AI Tools</Link></li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li className="text-ink-600 line-clamp-1">{tool.toolName}</li>
          </ol>
        </nav>

        <div className="flex gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4 leading-[1.15] tracking-tight font-serif">
                {tool.title}
              </h1>
              <p className="text-xl text-ink-500 mb-6 leading-relaxed">{tool.description}</p>

              {/* Rating + meta bar */}
              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-ink-200">
                <StarRating rating={tool.rating} />
                <span className="w-1 h-1 rounded-full bg-ink-300" />
                <span className="text-sm text-ink-500">By <span className="font-medium text-ink-700">{tool.author}</span></span>
                <span className="w-1 h-1 rounded-full bg-ink-300" />
                <time className="text-sm text-ink-400" dateTime={tool.date}>
                  {new Date(tool.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span className="w-1 h-1 rounded-full bg-ink-300" />
                <span className="text-sm text-ink-400">{tool.readingTime}</span>
              </div>
            </header>

            {/* Quick facts box */}
            <div className="mb-8 p-5 rounded-2xl bg-brand-50 border border-brand-100">
              <h2 className="text-sm font-bold text-ink-700 uppercase tracking-wide mb-4">Quick Facts</h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-ink-400">Developer:</span>{" "}
                  <span className="font-medium text-ink-700">{tool.toolDeveloper}</span>
                </div>
                <div>
                  <span className="text-ink-400">Category:</span>{" "}
                  <span className="font-medium text-ink-700">{tool.category}</span>
                </div>
                <div>
                  <span className="text-ink-400">Pricing:</span>{" "}
                  <span className="font-medium text-ink-700">{tool.pricingModel}</span>
                </div>
                <div>
                  <span className="text-ink-400">Starts at:</span>{" "}
                  <span className="font-medium text-brand-600">{tool.startingPrice}</span>
                </div>
                {tool.paidPrice && (
                  <div>
                    <span className="text-ink-400">Paid plans:</span>{" "}
                    <span className="font-medium text-ink-700">{tool.paidPrice}</span>
                  </div>
                )}
                <div>
                  <span className="text-ink-400">Platforms:</span>{" "}
                  <span className="font-medium text-ink-700">{tool.operatingSystem}</span>
                </div>
              </div>

              {/* Pros & Cons */}
              {(tool.pros?.length > 0 || tool.cons?.length > 0) && (
                <div className="mt-4 pt-4 border-t border-brand-200 grid sm:grid-cols-2 gap-4">
                  {tool.pros?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-emerald-700 uppercase mb-2">Pros</h3>
                      <ul className="space-y-1">
                        {tool.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-1.5 text-sm text-ink-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5">
                              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tool.cons?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-red-600 uppercase mb-2">Cons</h3>
                      <ul className="space-y-1">
                        {tool.cons.map((con) => (
                          <li key={con} className="flex items-start gap-1.5 text-sm text-ink-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400 shrink-0 mt-0.5">
                              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-8-8a8 8 0 1 1 16 0A8 8 0 0 1 2 10Zm8.75-4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" clipRule="evenodd" />
                            </svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-brand-200">
                <a
                  href={tool.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex text-sm"
                >
                  Visit {tool.toolName}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Review body */}
            <div
              className="prose-content text-[1.0625rem] leading-[1.85]"
              dangerouslySetInnerHTML={{ __html: tool.content }}
            />

            {/* Mid-article ad */}
            <div className="my-8 rounded-xl overflow-hidden bg-ink-50 p-4 border border-ink-100">
              <AdSlot slot="7788990011" format="in-article" showLabel />
            </div>

            {/* Bottom ad */}
            <div className="mt-10 pt-8 border-t border-ink-200">
              <AdSlot slot="1100998877" format="multiplex" showLabel className="w-full" />
            </div>

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <section className="mt-12 pt-8 border-t border-ink-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-label">More AI Tool Reviews</span>
                  <div className="flex-1 h-px bg-ink-200" />
                  <Link href="/tools" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    View all →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTools.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="group block p-5 rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-card transition-all bg-white"
                    >
                      <h3 className="text-sm font-semibold text-ink-900 group-hover:text-brand-600 transition-colors mb-1">
                        {t.toolName}
                      </h3>
                      <p className="text-xs text-ink-400 mb-2">{t.category}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-brand-600">{t.rating.toFixed(1)}/5</span>
                        <span className="text-ink-400">{t.readingTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
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

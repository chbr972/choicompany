import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getSortedPostsMeta } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
    return {
      title: post.title,
      description: post.description,
      keywords: post.tags,
      authors: [{ name: post.author }],
      openGraph: {
        type: "article",
        title: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        publishedTime: post.date,
        modifiedTime: post.date,
        tags: post.tags,
        authors: [post.author],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
      alternates: {
        canonical: `${siteUrl}/blog/${post.slug}`,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

/** Split an HTML string after the Nth closing </p> tag. */
function splitAtParagraph(html: string, after: number): [string, string] {
  const marker = "</p>";
  let count = 0;
  let idx = 0;
  while (count < after) {
    const found = html.indexOf(marker, idx);
    if (found === -1) return [html, ""];
    idx = found + marker.length;
    count++;
  }
  return [html.slice(0, idx), html.slice(idx)];
}

export default async function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Choi Company Blog";

  // Related articles: other posts sharing at least one tag (max 3)
  const allPosts = getSortedPostsMeta();
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 3);

  // Word count estimate from reading time
  const wordCount = parseInt(post.readingTime) * 200;

  // JSON-LD structured data (Article + BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        keywords: post.tags.join(", "),
        wordCount,
        articleSection: post.tags[0] || "General",
        author: {
          "@type": "Person",
          name: post.author,
        },
        datePublished: post.date,
        dateModified: post.date,
        url: `${siteUrl}/blog/${post.slug}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteName,
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteUrl}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  // Inject mid-article ad after the 3rd paragraph
  const [contentTop, contentBottom] = splitAtParagraph(post.content, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
          <ol className="flex items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" className="hover:text-brand-600 transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/blog" className="hover:text-brand-600 transition-colors" itemProp="item">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span className="text-gray-600" itemProp="name">{post.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="flex gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="text-xs font-medium bg-brand-50 text-brand-700 px-2 py-1 rounded-full hover:bg-brand-100 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight font-serif">
                {post.title}
              </h1>
              <p className="text-xl text-gray-500 mb-6">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-200">
                <span>{post.author}</span>
                <span>·</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            {/* Article body — top portion */}
            <div
              className="prose-content text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentTop }}
            />

            {/* Mid-article in-article ad (highest CPM placement) */}
            {contentBottom && (
              <div className="my-8">
                <AdSlot
                  slot="7788990011"
                  format="in-article"
                  showLabel
                />
              </div>
            )}

            {/* Article body — bottom portion */}
            {contentBottom && (
              <div
                className="prose-content text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: contentBottom }}
              />
            )}

            {/* Multiplex / related content ad below article */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <AdSlot
                slot="1100998877"
                format="multiplex"
                showLabel
                className="w-full"
              />
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group block p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-wrap gap-1 mb-2">
                        {r.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-xs font-medium bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{r.readingTime}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar (desktop only) */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-[140px] space-y-6">
              <AdSlot
                slot="2233445566"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />
              <AdSlot
                slot="6655778899"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
                showLabel
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

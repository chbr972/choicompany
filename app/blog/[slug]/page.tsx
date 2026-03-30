import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        type: "article",
        title: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        publishedTime: post.date,
        tags: post.tags,
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

export default async function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-brand-50 text-brand-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
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

            {/* Top in-content ad */}
            <div className="mb-8">
              <AdSlot slot="7788990011" format="rectangle" className="w-full" />
            </div>

            {/* Article body */}
            <div
              className="prose-content text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Bottom in-content ad */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <AdSlot slot="1100998877" format="rectangle" className="w-full" />
            </div>
          </article>

          {/* Sidebar (desktop only) */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-[140px]">
              <AdSlot
                slot="2233445566"
                format="rectangle"
                className="w-[300px] h-[250px]"
                responsive={false}
              />
              <div className="mt-6">
                <AdSlot
                  slot="6655778899"
                  format="rectangle"
                  className="w-[300px] h-[250px]"
                  responsive={false}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

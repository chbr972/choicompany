import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return { title: "Category Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  return {
    title: `${cat.name} Guides & Articles`,
    description: cat.description,
    alternates: {
      canonical: `${siteUrl}/categories/${cat.slug}`,
    },
  };
}

const ICONS: Record<string, string> = {
  "personal-finance": "💰",
  insurance: "🛡️",
  "health-wellness": "❤️",
  legal: "⚖️",
  technology: "💻",
  "ai-tools": "🤖",
  productivity: "⚡",
};

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} Guides & Articles`,
    description: cat.description,
    url: `${siteUrl}/categories/${cat.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Categories", item: `${siteUrl}/categories` },
        { "@type": "ListItem", position: 3, name: cat.name, item: `${siteUrl}/categories/${cat.slug}` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-400">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li>
              <Link href="/categories" className="hover:text-brand-600 transition-colors">Categories</Link>
            </li>
            <li aria-hidden="true" className="text-ink-300">/</li>
            <li className="text-ink-300 font-medium">{cat.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-ink-200">
          <div className="text-4xl mb-3">{ICONS[cat.slug] ?? "📄"}</div>
          <p className="section-label mb-2">Category</p>
          <h1 className="text-4xl font-bold text-ink-50 mb-3 tracking-tight">{cat.name}</h1>
          <p className="text-lg text-ink-300 max-w-2xl">{cat.description}</p>
          <p className="text-sm text-ink-400 mt-3">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Top ad */}
        <div className="flex justify-center mb-10">
          <AdSlot slot="5544332211" format="leaderboard" className="w-full max-w-[728px]" />
        </div>

        {/* Post grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-ink-400">
            <p className="text-lg">No articles yet. Check back soon.</p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-ink-200">
          <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            ← Browse all categories
          </Link>
        </div>
      </div>
    </>
  );
}

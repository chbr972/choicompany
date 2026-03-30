import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) return { title: "Tag Not Found" };

  // Find the canonical tag label from the first matching post
  const tagLabel = posts[0].tags.find((t) => tagToSlug(t) === params.tag) ?? params.tag;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choicompany-site.vercel.app";

  return {
    title: `${tagLabel} Articles — Guides & Insights`,
    description: `Browse all articles tagged "${tagLabel}". In-depth guides on ${tagLabel.toLowerCase()} and related topics.`,
    alternates: {
      canonical: `${siteUrl}/blog/tag/${params.tag}`,
    },
  };
}

export default function TagPage({ params }: Props) {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) notFound();

  const tagLabel = posts[0].tags.find((t) => tagToSlug(t) === params.tag) ?? params.tag;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-2">
          Tag
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{tagLabel}</h1>
        <p className="text-lg text-gray-500">
          {posts.length} article{posts.length !== 1 ? "s" : ""} tagged &ldquo;{tagLabel}&rdquo;
        </p>
      </div>

      {/* Top ad */}
      <div className="flex justify-center mb-8">
        <AdSlot slot="5544332211" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

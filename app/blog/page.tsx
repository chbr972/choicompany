import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Articles — AI, Productivity & Tech Guides",
  description:
    "Browse our complete collection of in-depth articles on AI tools, productivity systems, web performance, blogging, and modern tech. New guides added regularly.",
};

export default function BlogPage() {
  const posts = getSortedPostsMeta();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-400">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true" className="text-ink-300">/</li>
          <li className="text-ink-600 font-medium">Blog</li>
        </ol>
      </nav>

      {/* Page header */}
      <div className="mb-10 pb-8 border-b border-ink-200">
        <p className="section-label mb-2">The Archive</p>
        <h1 className="text-4xl font-bold text-ink-900 mb-3 tracking-tight">All Articles</h1>
        <p className="text-lg text-ink-500">
          {posts.length} article{posts.length !== 1 ? "s" : ""} and growing.
        </p>
      </div>

      {/* Top ad */}
      <div className="flex justify-center mb-10">
        <AdSlot slot="5544332211" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Post grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <>
            <PostCard key={post.slug} post={post} />
            {/* Insert ad after every 3 posts */}
            {(i + 1) % 3 === 0 && (
              <div
                key={`ad-${i}`}
                className="md:col-span-2 lg:col-span-3 flex justify-center my-4 py-4 border-y border-ink-100"
              >
                <AdSlot
                  slot="6655443322"
                  format="leaderboard"
                  className="w-full max-w-[728px]"
                />
              </div>
            )}
          </>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-ink-400">
          <p className="text-lg">No articles yet. Check back soon.</p>
        </div>
      )}
    </div>
  );
}

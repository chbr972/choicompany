import type { Metadata } from "next";
import { getSortedPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Blog",
  description: "All articles — browse our complete collection of guides and insights.",
};

export default function BlogPage() {
  const posts = getSortedPostsMeta();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">All Articles</h1>
        <p className="text-lg text-gray-500">
          {posts.length} article{posts.length !== 1 ? "s" : ""} and growing.
        </p>
      </div>

      {/* Top ad */}
      <div className="flex justify-center mb-8">
        <AdSlot slot="5544332211" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <>
            <PostCard key={post.slug} post={post} />
            {/* Insert ad after every 6 posts */}
            {(i + 1) % 6 === 0 && (
              <div
                key={`ad-${i}`}
                className="md:col-span-2 lg:col-span-3 flex justify-center my-4"
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
    </div>
  );
}

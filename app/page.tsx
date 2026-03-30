import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome — discover insightful articles on tech, productivity, and modern life.",
};

export default function HomePage() {
  const posts = getSortedPostsMeta();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Ideas Worth Reading
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Practical guides and in-depth articles on technology, productivity,
          and building a better digital life.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Featured
          </h2>
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl border border-brand-100 p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-wrap gap-2 mb-3">
              {featured.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-brand-100 text-brand-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              <Link
                href={`/blog/${featured.slug}`}
                className="hover:text-brand-600 transition-colors"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="text-gray-500 text-lg mb-6">{featured.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                {new Date(featured.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{featured.readingTime}</span>
            </div>
          </div>
        </section>
      )}

      {/* In-content ad between featured and grid */}
      <div className="flex justify-center my-8">
        <AdSlot slot="1122334455" format="leaderboard" className="w-full max-w-[728px]" />
      </div>

      {/* Post grid */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Browse All Articles
        </Link>
      </section>
    </div>
  );
}

import Link from "next/link";
import { getSortedPostsMeta, CATEGORIES, tagToSlug } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";
import NewsletterSignup from "@/components/NewsletterSignup";

interface SidebarProps {
  currentSlug?: string;
}

export default function Sidebar({ currentSlug }: SidebarProps) {
  const allPosts = getSortedPostsMeta();
  const popularPosts = allPosts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 5);

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    count: allPosts.filter((p) =>
      (p.tags ?? []).some((t) => cat.tagSlugs.includes(tagToSlug(t)))
    ).length,
  })).filter((cat) => cat.count > 0);

  return (
    <div className="space-y-6">
      {/* Ad slot */}
      <AdSlot
        slot="2233445566"
        format="rectangle"
        className="w-[300px]"
        responsive={false}
        showLabel
      />

      {/* Popular Posts */}
      <div className="bg-surface-800 rounded-2xl p-5 border border-surface-600">
        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-4">
          Popular Posts
        </h3>
        <ul className="space-y-4">
          {popularPosts.map((post, i) => (
            <li key={post.slug} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-700 border border-surface-500 flex items-center justify-center text-[11px] font-bold text-brand-400">
                {i + 1}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-ink-200 hover:text-brand-400 transition-colors leading-snug line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-surface-800 rounded-2xl p-5 border border-surface-600">
        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-4">
          Browse by Category
        </h3>
        <ul className="space-y-1">
          {categoriesWithCount.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
                className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-700 transition-colors group"
              >
                <span className="text-sm text-ink-300 group-hover:text-brand-400 transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-ink-500 bg-surface-600 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter signup */}
      <div className="bg-surface-800 rounded-2xl p-5 border border-surface-600">
        <NewsletterSignup variant="footer" />
      </div>
    </div>
  );
}

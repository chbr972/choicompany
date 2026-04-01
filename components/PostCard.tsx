import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { tagToSlug, getCategoryForPost } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

// Full Tailwind class strings so they are not purged from the build
const CATEGORY_STYLES: Record<string, string> = {
  "personal-finance": "bg-green-100 text-green-700",
  insurance: "bg-blue-100 text-blue-700",
  "health-wellness": "bg-emerald-100 text-emerald-700",
  legal: "bg-violet-100 text-violet-700",
  technology: "bg-slate-100 text-slate-600",
  "ai-tools": "bg-cyan-50 text-cyan-700",
  productivity: "bg-amber-100 text-amber-700",
};

export default function PostCard({ post }: PostCardProps) {
  const category = getCategoryForPost(post.tags ?? []);
  const categoryStyle =
    category ? (CATEGORY_STYLES[category.slug] ?? "bg-gray-100 text-gray-600") : null;

  return (
    <article className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col">
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-brand-400 shrink-0" />

      <div className="p-6 flex flex-col flex-1">
        {/* Category badge + remaining tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {category && categoryStyle && (
            <Link
              href={`/categories/${category.slug}`}
              className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full transition-colors hover:opacity-80 ${categoryStyle}`}
            >
              {category.name}
            </Link>
          )}
          {post.tags
            .filter((tag) => {
              // Hide tags that are the same as the category slug
              if (!category) return true;
              return tagToSlug(tag) !== category.slug;
            })
            .slice(0, 1)
            .map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tagToSlug(tag)}`}
                className="tag-pill hover:bg-brand-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-ink-900 mb-2 leading-snug tracking-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-brand-700 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt — 2-line clamp */}
        <p className="text-ink-600 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-ink-500 pt-4 border-t border-ink-100">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-ink-700">By {post.author}</span>
            <time dateTime={post.date} className="text-ink-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <span className="flex items-center gap-1 font-medium text-ink-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 opacity-70">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
            {post.readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}

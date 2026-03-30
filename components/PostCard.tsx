import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { tagToSlug } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col">
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-brand-400 shrink-0" />

      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tagToSlug(tag)}`}
                onClick={(e) => e.stopPropagation()}
                className="tag-pill hover:bg-brand-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold text-ink-900 mb-2 leading-snug tracking-tight flex-1">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-brand-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        <p className="text-ink-500 text-sm leading-relaxed line-clamp-3 mb-5">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-ink-400 pt-4 border-t border-ink-100">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
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

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-brand-50 text-brand-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-brand-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}

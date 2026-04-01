"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES, getCategoryForPost } from "@/lib/categories";
import PostCard from "@/components/PostCard";

interface CategoryFilteredPostsProps {
  posts: PostMeta[];
}

export default function CategoryFilteredPosts({ posts }: CategoryFilteredPostsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Only show categories that have at least one post
  const categoriesWithPosts = CATEGORIES.filter((cat) =>
    posts.some((p) => getCategoryForPost(p.tags ?? [])?.slug === cat.slug)
  );

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter(
          (p) => getCategoryForPost(p.tags ?? [])?.slug === activeCategory
        );

  return (
    <section>
      {/* ── Section header ── */}
      <div className="flex items-center gap-3 mb-6">
        <span className="section-label">Latest Articles</span>
        <div className="flex-1 h-px bg-surface-700" />
      </div>

      {/* ── Category filter tabs ── */}
      <div
        className="flex flex-wrap gap-2 mb-7"
        role="tablist"
        aria-label="Filter articles by category"
      >
        <button
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all ${
            activeCategory === "all"
              ? "bg-brand-500 text-surface-950 border-brand-500 shadow-glow-cyan"
              : "bg-surface-800 text-ink-300 border-surface-600 hover:border-brand-500 hover:text-brand-400"
          }`}
        >
          All
        </button>

        {categoriesWithPosts.map((cat) => (
          <button
            key={cat.slug}
            role="tab"
            aria-selected={activeCategory === cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all ${
              activeCategory === cat.slug
                ? "bg-brand-500 text-surface-950 border-brand-500 shadow-glow-cyan"
                : "bg-surface-800 text-ink-300 border-surface-600 hover:border-brand-500 hover:text-brand-400"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── Post grid ── */}
      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-ink-400 text-sm py-8 text-center">
          No articles in this category yet.
        </p>
      )}
    </section>
  );
}

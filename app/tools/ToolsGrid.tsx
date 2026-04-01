"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolData } from "@/lib/tools";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-3.5 h-3.5 ${i < full ? "text-accent-500" : i === full && half ? "text-accent-300" : "text-ink-200"}`}
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      <span className="text-xs font-semibold text-ink-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

const categoryIcons: Record<string, string> = {
  All: "◈",
  Writing: "✍️",
  Coding: "💻",
  Image: "🎨",
  Video: "🎬",
  Audio: "🎙",
  Productivity: "⚡",
  Research: "🔬",
};

interface Props {
  tools: ToolData[];
  categories: string[];
}

export default function ToolsGrid({ tools, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? tools : tools.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            role="listitem"
            onClick={() => setActiveCategory(cat)}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
              activeCategory === cat
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-white text-ink-600 border-ink-200 hover:border-brand-400 hover:text-brand-700"
            }`}
          >
            <span>{categoryIcons[cat] ?? "•"}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-ink-400 mb-6">
        Showing <span className="font-semibold text-ink-700">{filtered.length}</span> tools
        {activeCategory !== "All" && (
          <> in <span className="font-semibold text-brand-600">{activeCategory}</span></>
        )}
      </p>

      {/* Tools grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool) => (
          <div
            key={tool.slug}
            className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border border-ink-100 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-ink-900">{tool.name}</h3>
                  {tool.badge && (
                    <span className="text-[10px] font-bold bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full shrink-0">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <span className="tag-pill text-[10px]">{tool.category}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-3">
              <StarRating rating={tool.rating} />
            </div>

            {/* Description */}
            <p className="text-ink-500 text-sm mb-4 leading-relaxed flex-1">{tool.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-ink-100">
              <span className="text-xs text-ink-400 font-medium">{tool.price}</span>
              <div className="flex items-center gap-3">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-xs font-bold bg-brand-600 text-white px-3 py-1.5 rounded-full hover:bg-brand-700 transition-colors"
                >
                  Try Free →
                </a>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                >
                  Review
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  coverImage?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

function calcReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getSortedPostsMeta(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        readingTime: calcReadingTime(content),
        ...(data as PostFrontmatter),
      };
    });

  return allPosts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/** Convert a tag label to a URL-safe slug (e.g. "AI Tools" → "ai-tools") */
export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

/** Return all unique tags across all posts */
export function getAllTags(): string[] {
  const posts = getSortedPostsMeta();
  const seen = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      seen.add(tag);
    }
  }
  return Array.from(seen).sort();
}

/** Return posts that have a given tag (case-insensitive slug match) */
export function getPostsByTag(tagSlug: string): PostMeta[] {
  const posts = getSortedPostsMeta();
  return posts.filter((p) =>
    p.tags.some((t) => tagToSlug(t) === tagSlug)
  );
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  /** Tag slugs whose posts belong to this category */
  tagSlugs: string[];
}

/** Curated top-level categories. Order matters — shown on the hub page. */
export const CATEGORIES: Category[] = [
  {
    name: "Personal Finance",
    slug: "personal-finance",
    description: "Credit scores, investing, debt payoff, savings accounts, and building long-term wealth.",
    tagSlugs: ["personal-finance", "savings", "banking", "investing", "debt", "credit-cards", "credit-score", "credit-repair", "money-management", "home-equity", "homeowners", "wealth-building", "financial-planning"],
  },
  {
    name: "Insurance",
    slug: "insurance",
    description: "Everything you need to know about health, auto, homeowners, and life insurance.",
    tagSlugs: ["insurance", "health-insurance", "car-insurance", "auto-insurance", "homeowners-insurance", "life-insurance", "aca", "open-enrollment"],
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Evidence-based guides on fitness, nutrition, mental health, and healthy living.",
    tagSlugs: ["health", "wellness", "supplements", "energy", "focus", "cognitive-performance", "blood-pressure", "hypertension", "mental-health", "therapy", "weight-loss", "fitness", "over-40"],
  },
  {
    name: "Legal",
    slug: "legal",
    description: "Practical guides on bankruptcy, estate planning, car accidents, and your legal rights.",
    tagSlugs: ["legal", "bankruptcy", "debt-relief", "estate-planning", "will", "car-accident", "personal-injury"],
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Reviews and guides on VPNs, password managers, cloud storage, and essential software.",
    tagSlugs: ["technology", "vpn", "cybersecurity", "privacy", "online-security", "password-manager", "cloud-storage", "software-comparison"],
  },
  {
    name: "AI Tools",
    slug: "ai-tools",
    description: "Practical guides to AI writing, coding, and productivity tools for individuals and businesses.",
    tagSlugs: ["ai-tools", "ai-writing", "chatgpt", "claude", "ai-guide", "small-business"],
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "Systems, habits, and strategies to get more done and focus on what matters.",
    tagSlugs: ["productivity", "habits", "focus", "blogging", "content", "seo", "income"],
  },
];

/** Return posts that belong to a given category (matched via tag slugs) */
export function getPostsByCategory(categorySlug: string): PostMeta[] {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return [];
  const posts = getSortedPostsMeta();
  return posts.filter((p) =>
    p.tags.some((t) => category.tagSlugs.includes(tagToSlug(t)))
  );
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    content: contentHtml,
    readingTime: calcReadingTime(content),
    ...(data as PostFrontmatter),
  };
}

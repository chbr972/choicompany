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

/** Convert a tag label to a URL-safe slug (e.g. "AI Tools" → "ai-tools") */
export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

/** Find the primary category for a post based on its tags */
export function getCategoryForPost(tags: string[]): Category | null {
  const tagSlugsForPost = tags.map(tagToSlug);
  for (const cat of CATEGORIES) {
    if (tagSlugsForPost.some((ts) => cat.tagSlugs.includes(ts))) {
      return cat;
    }
  }
  return null;
}

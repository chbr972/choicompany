import { MetadataRoute } from "next";
import { getSortedPostsMeta, getAllTags, tagToSlug } from "@/lib/posts";
import { getAllToolSlugs } from "@/lib/tools";
import { getAllComparisonSlugs } from "@/lib/comparisons";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://issuebyte.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsMeta();
  const tags = getAllTags();
  const toolSlugs = getAllToolSlugs();
  const comparisonSlugs = getAllComparisonSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tools/prompt-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/tools/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/tools/text-summarizer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteUrl}/blog/tag/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const toolDetailRoutes: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${siteUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolDetailRoutes, ...comparisonRoutes, ...postRoutes, ...tagRoutes];
}

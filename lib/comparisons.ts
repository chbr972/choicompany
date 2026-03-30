import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const comparisonsDirectory = path.join(process.cwd(), "content/comparisons");

export interface ComparisonFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tools: string[];
  winner?: string;
  category: string;
  tags: string[];
  coverImage?: string;
}

export interface Comparison extends ComparisonFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface ComparisonMeta extends ComparisonFrontmatter {
  slug: string;
  readingTime: string;
}

function calcReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getSortedComparisonsMeta(): ComparisonMeta[] {
  if (!fs.existsSync(comparisonsDirectory)) return [];
  const fileNames = fs.readdirSync(comparisonsDirectory);
  const allComparisons = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(comparisonsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        readingTime: calcReadingTime(content),
        ...(data as ComparisonFrontmatter),
      };
    });

  return allComparisons.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
}

export function getAllComparisonSlugs(): string[] {
  if (!fs.existsSync(comparisonsDirectory)) return [];
  const fileNames = fs.readdirSync(comparisonsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getComparisonBySlug(slug: string): Promise<Comparison> {
  const fullPath = path.join(comparisonsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    content: contentHtml,
    readingTime: calcReadingTime(content),
    ...(data as ComparisonFrontmatter),
  };
}

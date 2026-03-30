import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const toolsDirectory = path.join(process.cwd(), "content/tools");

export interface ToolFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  toolName: string;
  toolDeveloper: string;
  toolUrl: string;
  category: string;
  rating: number;
  pricingModel: string;
  startingPrice: string;
  paidPrice?: string;
  operatingSystem: string;
  pros: string[];
  cons: string[];
  tags: string[];
  coverImage?: string;
}

export interface Tool extends ToolFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface ToolMeta extends ToolFrontmatter {
  slug: string;
  readingTime: string;
}

function calcReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getSortedToolsMeta(): ToolMeta[] {
  if (!fs.existsSync(toolsDirectory)) return [];
  const fileNames = fs.readdirSync(toolsDirectory);
  const allTools = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(toolsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        readingTime: calcReadingTime(content),
        ...(data as ToolFrontmatter),
      };
    });

  return allTools.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
}

export function getAllToolSlugs(): string[] {
  if (!fs.existsSync(toolsDirectory)) return [];
  const fileNames = fs.readdirSync(toolsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getToolBySlug(slug: string): Promise<Tool> {
  const fullPath = path.join(toolsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    content: contentHtml,
    readingTime: calcReadingTime(content),
    ...(data as ToolFrontmatter),
  };
}

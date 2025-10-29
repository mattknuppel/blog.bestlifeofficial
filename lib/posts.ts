import fs from "fs/promises";
import path from "path";
import readingTime from "reading-time";
import { format } from "date-fns";
import { getAllMDXFiles, readMDXFile } from "@/lib/mdx";
import type { MDXContent } from "@/lib/mdx";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  cover?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  readingTime: ReturnType<typeof readingTime>;
  formattedDate: string;
  content: MDXContent<PostFrontmatter>["content"];
  rawBody: string;
}

const POSTS_DIR = "content/posts";

function extractHeadings(rawBody: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = rawBody.split("\n");
  for (const line of lines) {
    const match = /^(#{2,4})\s+(.*)/.exec(line.trim());
    if (match) {
      const level = match[1].length;
      const text = match[2].trim().replace(/[`*]/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

export async function getPosts(): Promise<Post[]> {
  const files = await getAllMDXFiles(POSTS_DIR);
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { frontmatter, content, rawBody } = await readMDXFile<PostFrontmatter>(path.join(POSTS_DIR, file));
      const stats = readingTime(rawBody);
      const formattedDate = format(new Date(frontmatter.date), "MMMM d, yyyy");
      return {
        ...frontmatter,
        slug,
        readingTime: stats,
        formattedDate,
        content,
        rawBody
      } satisfies Post;
    })
  );

  return posts.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const exists = await fs
    .access(path.join(process.cwd(), filePath))
    .then(() => true)
    .catch(() => false);

  if (!exists) return null;

  const { frontmatter, content, rawBody } = await readMDXFile<PostFrontmatter>(filePath);
  const stats = readingTime(rawBody);
  const formattedDate = format(new Date(frontmatter.date), "MMMM d, yyyy");

  return {
    ...frontmatter,
    slug,
    readingTime: stats,
    formattedDate,
    content,
    rawBody,
    headings: extractHeadings(rawBody)
  } satisfies Post & { headings: ReturnType<typeof extractHeadings> };
}

export async function getLatestPosts(limit = 3) {
  const posts = await getPosts();
  return posts.slice(0, limit);
}

export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3) {
  const posts = await getPosts();
  const related = posts
    .filter((post) => post.slug !== currentSlug && post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit);
  return related;
}

export async function getAllTags() {
  const posts = await getPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

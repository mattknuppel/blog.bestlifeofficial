import type { ReactNode } from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx";

export interface MDXContent<TFrontmatter extends Record<string, unknown>> {
  frontmatter: TFrontmatter;
  content: ReactNode;
  rawBody: string;
}

export async function readMDXFile<TFrontmatter extends Record<string, unknown>>(filePath: string) {
  const absolutePath = path.join(process.cwd(), filePath);
  const file = await fs.readFile(absolutePath, "utf8");
  const { content, data } = matter(file);

  const compiled = await compileMDX<TFrontmatter>({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: "group" } }]
        ]
      }
    }
  });

  return {
    frontmatter: { ...(data as TFrontmatter) },
    content: compiled.content,
    rawBody: content
  } satisfies MDXContent<TFrontmatter>;
}

export async function getAllMDXFiles(dir: string) {
  const directory = path.join(process.cwd(), dir);
  const entries = await fs.readdir(directory);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

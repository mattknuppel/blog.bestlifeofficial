import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import type { ReactNode } from 'react';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../components/mdx-components';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getSiteConfig } from './config';

const POSTS_PATH = path.join(process.cwd(), 'content', 'posts');

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  cover: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

export type Post = PostMeta & {
  content: ReactNode;
};

const normalizeTag = (tag: string) => tag.toLowerCase();

export const listPostSlugs = cache(async () => {
  const files = await fs.readdir(POSTS_PATH);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
});

export const getPostSource = async (slug: string) => {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf-8');
  return raw;
};

export const getPostBySlug = cache(async (slug: string) => {
  const source = await getPostSource(slug);
  const { content, data } = matter(source);
  const frontmatter = data as PostFrontmatter;
  const mdx = await compileMDX<{ frontmatter: PostFrontmatter }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
  });

  const time = readingTime(content);

  return {
    slug,
    ...frontmatter,
    tags: frontmatter.tags.map(normalizeTag),
    readingTimeMinutes: Math.max(1, Math.round(time.minutes)),
    content: mdx.content,
  } satisfies Post;
});

export const getAllPostsMeta = cache(async () => {
  const slugs = await listPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await getPostSource(slug);
      const { content, data } = matter(source);
      const fm = data as PostFrontmatter;
      const time = readingTime(content);
      return {
        slug,
        ...fm,
        tags: fm.tags.map(normalizeTag),
        readingTimeMinutes: Math.max(1, Math.round(time.minutes)),
      } satisfies PostMeta;
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPaginatedPosts = cache(async (page: number, perPage: number, tag?: string, query?: string) => {
  const posts = await getAllPostsMeta();
  const normalizedTag = tag ? normalizeTag(tag) : undefined;
  const filtered = posts.filter((post) => {
    const matchesTag = normalizedTag ? post.tags.includes(normalizedTag) : true;
    const matchesQuery = query
      ? [post.title, post.description, post.tags.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesTag && matchesQuery;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  return {
    posts: paginated,
    totalPages,
    currentPage: safePage,
    total: filtered.length,
  };
});

export const getAllTags = cache(async () => {
  const posts = await getAllPostsMeta();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
});

export const getRelatedPosts = cache(async (slug: string, limit = 3) => {
  const posts = await getAllPostsMeta();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];
  const related = posts
    .filter((post) => post.slug !== slug && post.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit);
  if (related.length < limit) {
    const filler = posts.filter((post) => post.slug !== slug && !related.includes(post)).slice(0, limit - related.length);
    return [...related, ...filler];
  }
  return related;
});

export const getSitePostsForFeeds = cache(async () => {
  const config = getSiteConfig();
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({
    ...post,
    url: new URL(`/blog/${post.slug}`, config.url).toString(),
  }));
});

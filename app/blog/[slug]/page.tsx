import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/container';
import { MDXContent } from '@/components/mdx-content';
import { Tag } from '@/components/tag';
import { getOgImagePath } from '@/lib/og';
import { generateToc } from '@/lib/toc';
import { allBlogPosts } from 'contentlayer/generated';

export const dynamicParams = false;

function getPostFromParams(params: { slug: string }) {
  const post = allBlogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  return post;
}

export function generateStaticParams() {
  return allBlogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostFromParams(params);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      title: post.title,
      description: post.description,
      tags: post.tags,
      images: [getOgImagePath(post.slug)],
    },
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostFromParams(params);
  const toc = generateToc(post.body.raw);

  return (
    <Container className="space-y-10 py-16">
      <article className="grid gap-12 lg:grid-cols-[3fr,1fr]">
        <div className="space-y-10">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <time dateTime={post.date} className="text-sm uppercase tracking-wide text-muted-foreground">
                {formatDate(post.date)}
              </time>
              {post.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{post.description}</p>
          </header>

          <MDXContent code={post.body.code} />
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-black/5 bg-muted/40 p-6 shadow-sm dark:border-white/10">
            <h2 className="text-lg font-semibold">On this page</h2>
            {toc.length > 0 ? (
              <nav aria-label="Table of contents">
                <ul className="mt-4 space-y-3 text-sm">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'pl-4' : undefined}>
                      <a className="text-brand hover:underline" href={`#${item.id}`}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">Headings will appear here for quick reference.</p>
            )}
          </div>
        </aside>
      </article>
    </Container>
  );
}

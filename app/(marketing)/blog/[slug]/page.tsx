import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Container } from '../../../(layout)/components/container';
import { Breadcrumbs } from '../../../(layout)/components/breadcrumbs';
import { TableOfContents } from '../../../(layout)/components/table-of-contents';
import { ShareButtons } from '../../../(layout)/components/share-buttons';
import { AuthorBio } from '../../../(layout)/components/author-bio';
import { NewsletterForm } from '../../../(layout)/components/newsletter-form';
import { getPostBySlug, getRelatedPosts, listPostSlugs } from '../../../(layout)/lib/posts';
import { buildMetadata, buildCanonical, articleJsonLd } from '../../../(layout)/lib/seo';
import { PostCard } from '../../../(layout)/components/post-card';

export async function generateStaticParams() {
  const slugs = await listPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) return buildMetadata();
  return buildMetadata({
    title: post.title,
    description: post.description,
    alternates: { canonical: buildCanonical(`/blog/${post.slug}`) },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, 3);
  const breadcrumbs = [
    { href: '/blog', label: 'Blog' },
    { href: `/blog/${post.slug}`, label: post.title },
  ];

  return (
    <article className="bg-background py-16">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <header className="mt-6 max-w-3xl">
          <p className="text-sm uppercase tracking-wide text-accent">{post.tags.join(' · ')}</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="font-medium text-foreground">{post.author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
          <div className="mt-6">
            <ShareButtons title={post.title} />
          </div>
        </header>
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr),260px]">
          <div>
            <figure className="overflow-hidden rounded-3xl border border-slate-200">
              <Image
                src={post.cover}
                alt={`Illustration for ${post.title}`}
                width={1280}
                height={720}
                className="h-auto w-full object-cover"
                priority
              />
              <figcaption className="sr-only">Cover image for {post.title}</figcaption>
            </figure>
            <div className="prose prose-lg prose-emerald mt-10 max-w-none prose-headings:scroll-mt-28">
              {post.content}
            </div>
            <section className="mt-12 rounded-3xl bg-emerald-50 p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground">Enjoyed this guide?</h2>
              <p className="mt-2 text-sm text-slate-600">Get weekly nutrition insights straight to your inbox.</p>
              <div className="mt-6 flex justify-center">
                <NewsletterForm />
              </div>
            </section>
            <AuthorBio name={post.author} />
          </div>
          <div className="space-y-8">
            <TableOfContents />
            <section className="lg:hidden">
              <h2 className="text-lg font-semibold text-foreground">Table of contents</h2>
              <details className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-600">Jump to a section</summary>
                <div className="mt-3">
                  <TableOfContents variant="compact" />
                </div>
              </details>
            </section>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Related reads</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
      <Script id={`ld-article-${post.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          articleJsonLd({
            title: post.title,
            description: post.description,
            date: post.date,
            author: post.author,
            url: buildCanonical(`/blog/${post.slug}`),
          })
        )}
      </Script>
    </article>
  );
}

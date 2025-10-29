import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import config from "@/config";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { buildCanonical, buildOgImageUrl } from "@/lib/seo";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const ogUrl = buildOgImageUrl({ title: post.title, tag: post.tags[0], date: post.formattedDate });
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: buildCanonical(`/blog/${post.slug}`) },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${config.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      images: [ogUrl]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl]
    }
  };
}

function TableOfContents({
  headings
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden h-max max-w-xs space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm lg:block"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">On this page</p>
      <ul className="space-y-2 text-sm text-ink-600">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <a href={`#${heading.id}`} className="focus-ring hover:text-emerald-600">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const related = await getRelatedPosts(post.slug, post.tags);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author
    },
    publisher: {
      "@type": "Organization",
      name: config.siteName
    },
    mainEntityOfPage: `${config.url}/blog/${post.slug}`
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr,320px]">
      <article className="prose prose-lg prose-emerald max-w-none">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">{post.tags.join(" · ")}</p>
          <h1 className="mt-3 text-3xl font-semibold text-ink-900">{post.title}</h1>
          <p className="mt-3 text-sm text-ink-600">
            By {post.author} · {post.formattedDate} · {post.readingTime.text}
          </p>
          <ShareButtons title={post.title} slug={post.slug} />
        </header>
        <div className="mt-8">{post.content}</div>
        <section className="mt-12 rounded-2xl border border-ink-100 bg-white p-6 text-sm text-ink-600 shadow-sm">
          <h2 className="text-lg font-semibold text-ink-900">About the author</h2>
          <p className="mt-2">
            {post.author} is a registered dietitian and health writer at {config.siteName}, dedicated to translating clinical
            research into actionable habits.
          </p>
        </section>
        <section className="no-print mt-12 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-ink-900">Enjoyed this article?</h2>
          <p className="mt-3 text-sm text-ink-700">Join 25,000+ readers getting smarter every Sunday.</p>
          <NewsletterForm className="mt-6 max-w-md" />
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>
      <aside className="space-y-6">
        <TableOfContents headings={post.headings} />
        {related.length > 0 && (
          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink-900">Related reads</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="focus-ring hover:text-emerald-600">
                    {item.title}
                  </Link>
                  <p className="text-xs text-ink-400">{item.formattedDate}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}

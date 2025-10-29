import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllTags, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Discover evidence-based nutrition insights, training guides, and habit systems."
};

interface BlogPageProps {
  searchParams: { q?: string; tag?: string; page?: string };
}

const POSTS_PER_PAGE = 6;

function PostCard({ post }: { post: Awaited<ReturnType<typeof getPosts>>[number] }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{post.tags[0] ?? "Featured"}</p>
      <h3 className="mt-3 text-lg font-semibold text-ink-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-emerald-600">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm text-ink-600">{post.description}</p>
      <p className="mt-4 text-xs text-ink-500">{post.formattedDate} · {post.readingTime.text}</p>
    </article>
  );
}

async function Filters({ currentTag }: { currentTag?: string }) {
  const tags = await getAllTags();
  return (
    <div className="no-print flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full border px-4 py-2 text-sm ${!currentTag ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-ink-200 text-ink-600 hover:border-emerald-200"}`}
      >
        All topics
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          className={`rounded-full border px-4 py-2 text-sm focus-ring ${currentTag === tag ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-ink-200 text-ink-600 hover:border-emerald-200"}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q, tag, page } = searchParams;
  const posts = await getPosts();
  const filtered = posts.filter((post) => {
    const matchesQuery = q
      ? post.title.toLowerCase().includes(q.toLowerCase()) || post.description.toLowerCase().includes(q.toLowerCase())
      : true;
    const matchesTag = tag ? post.tags.includes(tag) : true;
    return matchesQuery && matchesTag;
  });

  const currentPage = Math.max(Number.parseInt(page ?? "1", 10) || 1, 1);
  const totalPages = Math.max(Math.ceil(filtered.length / POSTS_PER_PAGE), 1);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">The Library</p>
        <h1 className="text-3xl font-semibold text-ink-900">Evidence-based articles for your best life.</h1>
        <p className="text-base text-ink-600">
          Filter by topic or search for key terms to find the research-backed guidance you need.
        </p>
        <form className="no-print flex flex-col gap-3 md:flex-row" role="search">
          <label className="sr-only" htmlFor="search">
            Search articles
          </label>
          <input
            id="search"
            name="q"
            defaultValue={q}
            placeholder="Search by keyword, topic, or myth…"
            className="w-full rounded-full border border-ink-200 px-4 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
          <button className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow focus-ring hover:bg-emerald-500">
            Search
          </button>
        </form>
        <Suspense fallback={<p className="text-sm text-ink-500">Loading filters…</p>}>
          {/* @ts-expect-error Async Server Component */}
          <Filters currentTag={tag} />
        </Suspense>
      </header>

      {paginated.length === 0 ? (
        <p className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-600">
          No articles matched your search. Try a different keyword or filter.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <nav className="no-print flex items-center justify-between rounded-full border border-ink-100 bg-white px-4 py-3 text-sm text-ink-600" aria-label="Pagination">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Link
            aria-disabled={currentPage === 1}
            className={`rounded-full px-3 py-2 focus-ring ${currentPage === 1 ? "cursor-not-allowed text-ink-400" : "hover:bg-emerald-50"}`}
            href={`/blog?${new URLSearchParams({ ...(q ? { q } : {}), ...(tag ? { tag } : {}), page: String(Math.max(currentPage - 1, 1)) }).toString()}`}
          >
            Previous
          </Link>
          <Link
            aria-disabled={currentPage === totalPages}
            className={`rounded-full px-3 py-2 focus-ring ${currentPage === totalPages ? "cursor-not-allowed text-ink-400" : "hover:bg-emerald-50"}`}
            href={`/blog?${new URLSearchParams({ ...(q ? { q } : {}), ...(tag ? { tag } : {}), page: String(Math.min(currentPage + 1, totalPages)) }).toString()}`}
          >
            Next
          </Link>
        </div>
      </nav>
    </div>
  );
}

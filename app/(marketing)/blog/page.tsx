import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '../../(layout)/components/container';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';
import { getAllTags, getPaginatedPosts } from '../../(layout)/lib/posts';
import { BlogFilterControls } from '../../(layout)/components/blog-filter-controls';
import { PostCard } from '../../(layout)/components/post-card';
import { Pagination } from '../../(layout)/components/pagination';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Nutriwise Blog',
    description: 'Explore evidence-based articles on fueling your health with confidence.',
    alternates: { canonical: buildCanonical('/blog') },
  }),
};

type SearchParams = {
  page?: string;
  query?: string;
  tag?: string;
};

const PER_PAGE = 6;

export default async function BlogIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page ?? '1');
  const query = searchParams.query ?? undefined;
  const tag = searchParams.tag ?? undefined;

  const [{ posts, totalPages, currentPage, total }, tags] = await Promise.all([
    getPaginatedPosts(page, PER_PAGE, tag, query),
    getAllTags(),
  ]);

  if (page > totalPages && totalPages !== 0) {
    notFound();
  }

  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (tag) params.set('tag', tag);

  return (
    <section className="bg-background py-16">
      <Container>
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Latest articles</h1>
            <p className="mt-2 text-sm text-slate-600">
              {total} article{total === 1 ? '' : 's'} to help you fuel your wellness goals.
            </p>
          </div>
        </header>
        <div className="mt-8">
          <BlogFilterControls tags={tags} />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="mt-6 text-sm text-slate-600">No articles match your filters yet. Try clearing the search or tag.</p>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" searchParams={params} />
      </Container>
    </section>
  );
}

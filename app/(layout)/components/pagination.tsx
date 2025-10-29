import Link from 'next/link';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: URLSearchParams;
}

export const Pagination = ({ currentPage, totalPages, basePath, searchParams }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const createLink = (page: number) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      {pages.map((page) => (
        <Link
          key={page}
          href={createLink(page)}
          className={clsx(
            'inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            page === currentPage ? 'border-accent bg-accent text-accent-foreground' : 'border-slate-200 hover:border-accent/40'
          )}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
};

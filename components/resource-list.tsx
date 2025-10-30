'use client';

import { useMemo, useState } from 'react';

import { Card } from './card';
import { SearchBar } from './search-bar';
import { Tag } from './tag';

export interface ResourceItem {
  title: string;
  description: string;
  href: string;
  tags: string[];
  meta?: string;
}

interface ResourceListProps {
  items: ResourceItem[];
  typeLabel: string;
}

const PAGE_SIZE = 10;

export function ResourceList({ items, typeLabel }: ResourceListProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(normalizedQuery);
      const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      return matchesTitle || matchesTags;
    });
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-8">
      <SearchBar
        placeholder={`Search ${typeLabel}`}
        onSearch={(value) => {
          setQuery(value);
          setPage(1);
        }}
      />

      {paginated.length === 0 ? (
        <p className="text-muted-foreground">No {typeLabel.toLowerCase()} found. Try another search.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {paginated.map((item) => (
            <Card key={item.href} title={item.title} description={item.description} href={item.href}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                {item.meta ? <span>{item.meta}</span> : <span />}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-between rounded-lg border border-black/5 bg-muted/40 p-4 text-sm dark:border-white/10">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-full px-3 py-2 text-brand transition hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-full px-3 py-2 text-brand transition hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

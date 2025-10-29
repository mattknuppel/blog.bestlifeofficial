'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface BlogFilterControlsProps {
  tags: string[];
}

export const BlogFilterControls = ({ tags }: BlogFilterControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') ?? '');
  const [isReady, setIsReady] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setQuery(searchParams.get('query') ?? '');
    setSelectedTag(searchParams.get('tag') ?? '');
    setIsReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (!isReady) return;
    const handler = setTimeout(() => {
      updateParams(query, selectedTag, 1);
    }, 300);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isReady]);

  const updateParams = (nextQuery: string, nextTag: string, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQuery) {
      params.set('query', nextQuery);
    } else {
      params.delete('query');
    }
    if (nextTag) {
      params.set('tag', nextTag);
    } else {
      params.delete('tag');
    }
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex-1">
        <span className="sr-only">Search posts</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Search articles..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </label>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600" htmlFor="tag-select">
          Filter by tag
        </label>
        <select
          id="tag-select"
          value={selectedTag}
          onChange={(event) => {
            const value = event.target.value;
            setSelectedTag(value);
            updateParams(query, value, 1);
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <option value="">All</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

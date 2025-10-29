"use client";

import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headingsSelector?: string;
  variant?: 'sidebar' | 'compact';
  className?: string;
}

export const TableOfContents = ({ headingsSelector = 'h2, h3', variant = 'sidebar', className }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLHeadingElement>(headingsSelector));
    const nodesWithId = nodes.filter((node) => node.id);
    const mapped = nodesWithId.map((node) => ({
      id: node.id,
      text: node.innerText,
      level: Number(node.tagName.replace('H', '')),
    }));
    setHeadings(mapped);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-60% 0px -35% 0px' }
    );

    nodesWithId.forEach((node) => observer.observe(node));

    return () => {
      nodesWithId.forEach((node) => observer.unobserve(node));
    };
  }, [headingsSelector]);

  if (headings.length === 0) return null;

  if (variant === 'compact') {
    return (
      <ul className={clsx('space-y-2 text-sm text-slate-600', className)}>
        {headings.map((heading) => (
          <li key={heading.id} className={clsx(heading.level === 3 && 'pl-4')}>
            <a
              href={`#${heading.id}`}
              className={clsx(
                'block rounded px-2 py-1 transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                heading.id === activeId ? 'bg-accent/10 text-accent' : undefined
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <aside
      className={clsx(
        'sticky top-28 hidden max-h-[70vh] w-64 flex-shrink-0 overflow-auto rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 lg:block',
        className
      )}
      aria-label="Table of contents"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
      <ul className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={clsx('pl-0', heading.level === 3 && 'pl-4')}>
            <a
              href={`#${heading.id}`}
              className={clsx(
                'block rounded px-2 py-1 transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                heading.id === activeId ? 'bg-accent/10 text-accent' : undefined
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

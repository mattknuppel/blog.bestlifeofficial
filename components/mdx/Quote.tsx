import type { ReactNode } from "react";

interface QuoteProps {
  by?: string;
  children: ReactNode;
}

export function Quote({ by, children }: QuoteProps) {
  return (
    <figure className="not-prose rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
      <blockquote className="text-lg font-medium text-ink-800">“{children}”</blockquote>
      {by && <figcaption className="mt-4 text-sm text-ink-500">— {by}</figcaption>}
    </figure>
  );
}

"use client";

import { useState } from "react";
import config from "@/config";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${config.url}/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  return (
    <div className="no-print mt-6 flex flex-wrap gap-3 text-sm" aria-live="polite">
      <span className="text-ink-500">Share:</span>
      <a
        className="rounded-full border border-ink-200 px-3 py-2 focus-ring hover:border-emerald-300"
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
      <a
        className="rounded-full border border-ink-200 px-3 py-2 focus-ring hover:border-emerald-300"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <button
        className="rounded-full border border-ink-200 px-3 py-2 focus-ring hover:border-emerald-300"
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (error) {
            setCopied(false);
          }
        }}
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

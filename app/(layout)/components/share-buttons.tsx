'use client';

import { usePathname } from 'next/navigation';
import { getSiteConfig } from '../lib/config';

export const ShareButtons = ({ title }: { title: string }) => {
  const pathname = usePathname();
  const config = getSiteConfig();
  const url = new URL(pathname, config.url).toString();
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="font-medium text-slate-600">Share:</span>
      <a
        className="text-accent underline-offset-4 hover:underline"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className="text-accent underline-offset-4 hover:underline"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        className="text-accent underline-offset-4 hover:underline"
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
      >
        Email
      </a>
    </div>
  );
};

import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';

const baseUrl = siteConfig.url.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

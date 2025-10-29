import { getSiteConfig } from './config';
import { getAllPostsMeta } from './posts';

export const generateSitemap = async () => {
  const config = getSiteConfig();
  const baseUrl = config.url.replace(/\/$/, '');
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/subscribe',
    '/legal/terms',
    '/legal/privacy',
    '/legal/medical-disclaimer',
    '/legal/affiliate-disclosure',
  ];

  const posts = await getAllPostsMeta();

  const urls = [
    ...staticRoutes.map((route) => ({ loc: route || '/', lastmod: new Date().toISOString() })),
    ...posts.map((post) => ({ loc: `/blog/${post.slug}`, lastmod: new Date(post.date).toISOString() })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(({ loc, lastmod }) => `<url><loc>${baseUrl}${loc}</loc><lastmod>${lastmod}</lastmod></url>` )
    .join('\n  ')}
</urlset>`;
};

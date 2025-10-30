import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';
import { allBlogPosts, allRecipes } from 'contentlayer/generated';

const baseUrl = siteConfig.url.replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries: MetadataRoute.Sitemap = [
    '',
    '/recipes',
    '/blog',
    '/calculators',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified: new Date().toISOString(),
  }));

  const recipeEntries = allRecipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const blogEntries = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [...baseEntries, ...recipeEntries, ...blogEntries];
}

import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';
import { ResourceList } from '@/components/resource-list';
import { allBlogPosts } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'MDX-powered articles with actionable strategies for nutrition, recovery, and mindset.',
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const items = allBlogPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      title: post.title,
      description: post.description,
      href: `/blog/${post.slug}`,
      tags: post.tags,
      meta: formatDate(post.date),
    }));

  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="Articles"
        description="Research-backed insights, practical frameworks, and deep dives into the habits that drive lasting health."
      />
      <ResourceList items={items} typeLabel="Articles" />
    </Container>
  );
}

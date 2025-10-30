import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';
import { ResourceList } from '@/components/resource-list';
import { allRecipes } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Recipes',
  description:
    'Explore balanced recipes with macro breakdowns, prep guidance, and tags to support any nutrition goal.',
};

export default function RecipesPage() {
  const items = allRecipes
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((recipe) => ({
      title: recipe.title,
      description: recipe.description,
      href: `/recipes/${recipe.slug}`,
      tags: recipe.tags,
      meta: `${recipe.servings} servings • Prep ${recipe.prepTime} min • Cook ${recipe.cookTime} min`,
    }));

  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="Recipes"
        description="High-impact meals with full nutrition facts, adjustable servings, and tips for every lifestyle."
      />
      <ResourceList items={items} typeLabel="Recipes" />
    </Container>
  );
}

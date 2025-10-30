import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Container } from '@/components/container';
import { Tag } from '@/components/tag';
import { allBlogPosts, allRecipes } from 'contentlayer/generated';

const features = [
  {
    title: 'Recipes',
    description: 'Balanced meals with full macro profiles, prep tips, and swaps for every lifestyle.',
    href: '/recipes',
  },
  {
    title: 'Articles',
    description: 'Evidence-based guides on fueling, recovery, and building sustainable habits.',
    href: '/blog',
  },
  {
    title: 'Calculators',
    description: 'Personalize your goals with BMI, TDEE, and macro split tools that work together.',
    href: '/calculators',
  },
];

export default function HomePage() {
  const recentRecipes = allRecipes.slice(0, 3);
  const recentArticles = allBlogPosts.slice(0, 3);

  return (
    <>
      <section className="border-b border-black/5 bg-muted/50 py-20 dark:border-white/10">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
              <span>Fuel smarter</span>
              <Tag label="New" className="bg-white text-brand dark:bg-slate-900" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Nourish your everyday with science-backed nutrition guidance.
            </h1>
            <p className="text-lg text-muted-foreground">
              Best Life Official combines delicious recipes, actionable education, and planning tools so you can
              feel confident about every meal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/recipes">Explore Recipes</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Read Latest Guides</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-brand/20 shadow-lg">
              <Image
                src="/logo.svg"
                alt="Best Life Official"
                fill
                priority
                className="object-contain p-10"
                sizes="(min-width: 1024px) 18rem, 60vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} title={feature.title} description={feature.description} href={feature.href} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Featured Recipes</h2>
            <p className="text-muted-foreground">Every recipe includes macros, time-saving tips, and dietary tags.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentRecipes.map((recipe) => (
              <Card
                key={recipe.slug}
                title={recipe.title}
                description={`${recipe.description}`}
                href={`/recipes/${recipe.slug}`}
              >
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">Latest Articles</h2>
            <p className="text-muted-foreground">
              Stay up-to-date on the latest strategies for sustainable health and performance.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentArticles.map((article) => (
              <Card
                key={article.slug}
                title={article.title}
                description={article.description}
                href={`/blog/${article.slug}`}
              >
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

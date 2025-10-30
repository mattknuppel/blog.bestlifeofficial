import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Container } from '@/components/container';
import { MDXContent } from '@/components/mdx-content';
import { Tag } from '@/components/tag';
import { getOgImagePath } from '@/lib/og';
import { allRecipes } from 'contentlayer/generated';

export const dynamicParams = false;

function getRecipeFromParams(params: { slug: string }) {
  const recipe = allRecipes.find((item) => item.slug === params.slug);
  if (!recipe) notFound();
  return recipe;
}

export function generateStaticParams() {
  return allRecipes.map((recipe) => ({ slug: recipe.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getRecipeFromParams(params);
  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [getOgImagePath(recipe.slug)],
      tags: recipe.tags,
    },
  };
}

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeFromParams(params);
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Container className="space-y-10 py-16">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          {recipe.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">{recipe.title}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">{recipe.description}</p>
        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-black/5 bg-muted/40 p-6 text-sm dark:border-white/10 sm:grid-cols-4">
          <div>
            <dt className="font-medium uppercase text-muted-foreground">Servings</dt>
            <dd className="text-lg font-semibold text-[rgb(var(--foreground))]">{recipe.servings}</dd>
          </div>
          <div>
            <dt className="font-medium uppercase text-muted-foreground">Prep</dt>
            <dd className="text-lg font-semibold text-[rgb(var(--foreground))]">{recipe.prepTime} min</dd>
          </div>
          <div>
            <dt className="font-medium uppercase text-muted-foreground">Cook</dt>
            <dd className="text-lg font-semibold text-[rgb(var(--foreground))]">{recipe.cookTime} min</dd>
          </div>
          <div>
            <dt className="font-medium uppercase text-muted-foreground">Ready in</dt>
            <dd className="text-lg font-semibold text-[rgb(var(--foreground))]">{totalTime} min</dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-black/5 shadow-lg dark:border-white/10">
            <Image
              src={recipe.coverImage}
              alt={recipe.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <MDXContent code={recipe.body.code} />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Steps</h2>
            <ol className="list-decimal space-y-4 pl-6 text-base leading-relaxed">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="space-y-4 rounded-2xl border border-black/5 bg-muted/50 p-6 shadow-sm dark:border-white/10">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 rounded-2xl border border-black/5 bg-muted/50 p-6 shadow-sm dark:border-white/10">
            <h2 className="text-xl font-semibold">Nutrition Facts</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                <tr>
                  <td className="py-2 font-medium">Calories</td>
                  <td className="py-2 text-right font-semibold">{recipe.macros.kcal}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Protein</td>
                  <td className="py-2 text-right">{recipe.macros.protein} g</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Carbohydrates</td>
                  <td className="py-2 text-right">{recipe.macros.carbs} g</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Fat</td>
                  <td className="py-2 text-right">{recipe.macros.fat} g</td>
                </tr>
              </tbody>
            </table>
          </section>
        </aside>
      </div>
    </Container>
  );
}

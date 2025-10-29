import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import config from "@/config";
import { NutritionFacts } from "@/components/mdx/NutritionFacts";
import { RecipeDetail } from "@/components/recipes/RecipeDetail";
import { buildCanonical, buildOgImageUrl } from "@/lib/seo";
import { getRecipeBySlug, getRecipes } from "@/lib/recipes";

interface RecipePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug);
  if (!recipe) return {};
  const ogUrl = buildOgImageUrl({ title: recipe.title, tag: recipe.mealType[0], date: recipe.formattedDate });
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: buildCanonical(`/recipes/${recipe.slug}`) },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      url: `${config.url}/recipes/${recipe.slug}`,
      images: [ogUrl]
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [ogUrl]
    }
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeBySlug(params.slug);
  if (!recipe) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    datePublished: new Date(recipe.date).toISOString(),
    author: {
      "@type": "Organization",
      name: config.siteName
    },
    recipeYield: `${recipe.servings} servings`,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeCuisine: recipe.cuisine,
    recipeCategory: recipe.mealType.join(", "),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((instruction) => ({ "@type": "HowToStep", text: instruction })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.calories} calories`,
      ...Object.fromEntries(Object.entries(recipe.nutrition).map(([key, value]) => [key, value]))
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 rounded-3xl border border-ink-100 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
        <div className="flex-1 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">{recipe.mealType.join(" · ")}</p>
          <h1 className="text-3xl font-semibold text-ink-900">{recipe.title}</h1>
          <p className="text-base text-ink-600">{recipe.description}</p>
          <dl className="grid grid-cols-2 gap-4 text-sm text-ink-600 sm:grid-cols-4">
            <div>
              <dt className="font-semibold text-ink-900">Servings</dt>
              <dd>{recipe.servings}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Ready in</dt>
              <dd>{recipe.totalTime}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Calories</dt>
              <dd>{recipe.calories} kcal</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink-900">Diet</dt>
              <dd>{recipe.diet.join(", ")}</dd>
            </div>
          </dl>
          <div className="no-print flex flex-wrap gap-3 text-xs text-emerald-700">
            {recipe.tags.map((tag) => (
              <Link key={tag} href={`/recipes?tag=${encodeURIComponent(tag)}`} className="rounded-full bg-emerald-100 px-3 py-1">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        {recipe.image && (
          <div className="relative h-56 w-full overflow-hidden rounded-3xl border border-ink-100 bg-emerald-100 sm:h-72 lg:w-72">
            <Image src={recipe.image.replace("./", "/content/recipes/")} alt="" fill className="object-cover" />
          </div>
        )}
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
        <div className="space-y-8">
          <RecipeDetail
            recipe={{
              slug: recipe.slug,
              title: recipe.title,
              servings: recipe.servings,
              calories: recipe.calories,
              nutrition: recipe.nutrition,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions
            }}
          />
          <article className="prose prose-emerald max-w-none">{recipe.content}</article>
        </div>
        <aside className="space-y-6">
          <NutritionFacts calories={recipe.calories} nutrition={recipe.nutrition} />
          <section className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink-900">Recipe notes</h2>
            <p className="mt-3 text-sm text-ink-600">
              Adjust ingredient brands to meet your dietary needs. Macros are estimates and can vary by product.
            </p>
            <p className="mt-3 text-xs text-ink-400">
              Last updated {recipe.formattedDate}
            </p>
          </section>
        </aside>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

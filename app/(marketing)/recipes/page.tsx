import type { Metadata } from "next";
import { RecipeExplorer } from "@/components/recipes/RecipeExplorer";
import { getRecipeFilters, getRecipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Protein-forward, evidence-based recipes tailored to your schedule and goals."
};

export default async function RecipesPage() {
  const [recipes, filters] = await Promise.all([getRecipes(), getRecipeFilters()]);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Recipe Library</p>
        <h1 className="text-3xl font-semibold text-ink-900">Cook with confidence, fuel with intention.</h1>
        <p className="text-base text-ink-600">
          Browse high-protein meals built for busy schedules. Filter by time, cuisine, or dietary preference and save your
          favorites to a shopping list.
        </p>
      </header>
      <RecipeExplorer
        recipes={recipes.map(({ slug, title, description, date, tags, cuisine, mealType, diet, totalTime, calories }) => ({
          slug,
          title,
          description,
          date,
          tags,
          cuisine,
          mealType,
          diet,
          totalTime,
          calories
        }))}
        filters={filters}
      />
    </div>
  );
}

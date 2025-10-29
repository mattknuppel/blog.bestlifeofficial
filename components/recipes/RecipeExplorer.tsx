"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import clsx from "clsx";

export interface RecipeSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cuisine: string;
  mealType: string[];
  diet: string[];
  totalTime: string;
  calories: number;
}

interface RecipeExplorerProps {
  recipes: RecipeSummary[];
  filters: {
    tags: string[];
    mealType: string[];
    diet: string[];
    cuisine: string[];
  };
}

type SortOption = "newest" | "time" | "calories";

function minutesFromString(value: string) {
  const match = value.match(/(\d+)(?=\s*min)/i);
  return match ? Number.parseInt(match[1], 10) : Number.POSITIVE_INFINITY;
}

export function RecipeExplorer({ recipes, filters }: RecipeExplorerProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeMeal, setActiveMeal] = useState<string | null>(null);
  const [activeDiet, setActiveDiet] = useState<string | null>(null);
  const [activeCuisine, setActiveCuisine] = useState<string | null>(null);
  const [maxTime, setMaxTime] = useState<number | null>(null);
  const [maxCalories, setMaxCalories] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        const matchesSearch = search
          ? recipe.title.toLowerCase().includes(search.toLowerCase()) ||
            recipe.description.toLowerCase().includes(search.toLowerCase())
          : true;
        const matchesTag = activeTag ? recipe.tags.includes(activeTag) : true;
        const matchesMeal = activeMeal ? recipe.mealType.includes(activeMeal) : true;
        const matchesDiet = activeDiet ? recipe.diet.includes(activeDiet) : true;
        const matchesCuisine = activeCuisine ? recipe.cuisine === activeCuisine : true;
        const time = minutesFromString(recipe.totalTime);
        const matchesTime = maxTime ? time <= maxTime : true;
        const matchesCalories = maxCalories ? recipe.calories <= maxCalories : true;
        return matchesSearch && matchesTag && matchesMeal && matchesDiet && matchesCuisine && matchesTime && matchesCalories;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === "time") {
          return minutesFromString(a.totalTime) - minutesFromString(b.totalTime);
        }
        return a.calories - b.calories;
      });
  }, [activeCuisine, activeDiet, activeMeal, activeTag, maxCalories, maxTime, recipes, search, sortBy]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm lg:grid-cols-[300px,1fr]">
        <section aria-label="Filters" className="space-y-5 text-sm text-ink-700">
          <div className="space-y-2">
            <label htmlFor="recipe-search" className="text-sm font-semibold text-ink-800">
              Search
            </label>
            <input
              id="recipe-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="High protein, plant-based, snack…"
              className="w-full rounded-full border border-ink-200 px-4 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <FilterGroup
            label="Tags"
            options={filters.tags}
            active={activeTag}
            onSelect={(value) => setActiveTag((prev) => (prev === value ? null : value))}
          />
          <FilterGroup
            label="Meal type"
            options={filters.mealType}
            active={activeMeal}
            onSelect={(value) => setActiveMeal((prev) => (prev === value ? null : value))}
          />
          <FilterGroup
            label="Diet"
            options={filters.diet}
            active={activeDiet}
            onSelect={(value) => setActiveDiet((prev) => (prev === value ? null : value))}
          />
          <FilterGroup
            label="Cuisine"
            options={filters.cuisine}
            active={activeCuisine}
            onSelect={(value) => setActiveCuisine((prev) => (prev === value ? null : value))}
          />
          <div className="grid gap-2">
            <label htmlFor="max-time" className="text-sm font-semibold text-ink-800">
              Max time (minutes)
            </label>
            <input
              id="max-time"
              type="number"
              min={0}
              value={maxTime ?? ""}
              onChange={(event) => setMaxTime(event.target.value ? Number(event.target.value) : null)}
              className="w-full rounded-full border border-ink-200 px-4 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="max-calories" className="text-sm font-semibold text-ink-800">
              Max calories
            </label>
            <input
              id="max-calories"
              type="number"
              min={0}
              value={maxCalories ?? ""}
              onChange={(event) => setMaxCalories(event.target.value ? Number(event.target.value) : null)}
              className="w-full rounded-full border border-ink-200 px-4 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="sort" className="text-sm font-semibold text-ink-800">
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full rounded-full border border-ink-200 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="newest">Newest</option>
              <option value="time">Fastest</option>
              <option value="calories">Lowest calories</option>
            </select>
          </div>
          <button
            type="button"
            className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 focus-ring hover:bg-emerald-50"
            onClick={() => {
              setSearch("");
              setActiveTag(null);
              setActiveMeal(null);
              setActiveDiet(null);
              setActiveCuisine(null);
              setMaxTime(null);
              setMaxCalories(null);
              setSortBy("newest");
            }}
          >
            Reset filters
          </button>
        </section>
        <section aria-live="polite" className="space-y-4">
          <p className="text-sm text-ink-600">
            Showing <strong>{filteredRecipes.length}</strong> recipe{filteredRecipes.length === 1 ? "" : "s"}.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredRecipes.map((recipe) => (
              <article key={recipe.slug} className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{recipe.cuisine}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  <Link href={`/recipes/${recipe.slug}`} className="hover:text-emerald-600">
                    {recipe.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm text-ink-600">{recipe.description}</p>
                <dl className="mt-4 grid gap-1 text-xs text-ink-500">
                  <div className="flex justify-between">
                    <dt>Time</dt>
                    <dd>{recipe.totalTime}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Calories</dt>
                    <dd>{recipe.calories} kcal</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  options: string[];
  active: string | null;
  onSelect: (value: string) => void;
}

function FilterGroup({ label, options, active, onSelect }: FilterGroupProps) {
  if (options.length === 0) return null;
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-ink-800">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-xs focus-ring",
              active === option
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-ink-200 text-ink-600 hover:border-emerald-200"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

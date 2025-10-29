"use client";

import { useEffect, useMemo, useState } from "react";

interface RecipeDetailProps {
  recipe: {
    slug: string;
    title: string;
    servings: number;
    calories: number;
    nutrition: Record<string, string>;
    ingredients: string[];
    instructions: string[];
  };
}

type ShoppingListState = Record<string, { title: string; items: string[] }>;

const STORAGE_KEY = "best-life-shopping-list";

function loadShoppingList(): ShoppingListState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShoppingListState) : {};
  } catch (error) {
    console.warn("Unable to load shopping list", error);
    return {};
  }
}

function saveShoppingList(state: ShoppingListState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Unable to save shopping list", error);
  }
}

function scaleIngredient(ingredient: string, factor: number) {
  return ingredient.replace(/(\d+\/\d+|\d+(?:\.\d+)?)/g, (match) => {
    if (match.includes("/")) {
      const [num, den] = match.split("/").map(Number);
      if (!den) return match;
      const value = (num / den) * factor;
      return Number.isFinite(value) ? formatNumber(value) : match;
    }
    const value = Number.parseFloat(match) * factor;
    return Number.isFinite(value) ? formatNumber(value) : match;
  });
}

function formatNumber(value: number) {
  if (value % 1 === 0) return value.toString();
  return value.toFixed(value < 1 ? 2 : 1).replace(/\.0$/, "");
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [expanded, setExpanded] = useState<{ ingredients: boolean; steps: boolean }>({ ingredients: true, steps: true });
  const [shoppingList, setShoppingList] = useState<ShoppingListState>({});

  useEffect(() => {
    setShoppingList(loadShoppingList());
  }, []);

  useEffect(() => {
    saveShoppingList(shoppingList);
  }, [shoppingList]);

  const factor = servings / recipe.servings;

  const scaledIngredients = useMemo(() => {
    if (factor === 1) return recipe.ingredients;
    return recipe.ingredients.map((ingredient) => scaleIngredient(ingredient, factor));
  }, [factor, recipe.ingredients]);

  const toggleList = () => {
    setShoppingList((prev) => {
      const next = { ...prev };
      if (next[recipe.slug]) {
        delete next[recipe.slug];
      } else {
        next[recipe.slug] = { title: recipe.title, items: recipe.ingredients };
      }
      return next;
    });
  };

  const isSaved = Boolean(shoppingList[recipe.slug]);

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-ink-700" htmlFor="servings">
          Servings
        </label>
        <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-white px-4 py-2 shadow-sm">
          <button
            type="button"
            aria-label="Decrease servings"
            className="text-lg text-ink-500 focus-ring"
            onClick={() => setServings((value) => Math.max(1, value - 1))}
          >
            −
          </button>
          <input
            id="servings"
            type="number"
            min={1}
            value={servings}
            onChange={(event) => setServings(Math.max(1, Number.parseInt(event.target.value, 10) || recipe.servings))}
            className="w-16 border-none text-center text-base font-semibold text-ink-900 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Increase servings"
            className="text-lg text-ink-500 focus-ring"
            onClick={() => setServings((value) => value + 1)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={toggleList}
          className={`rounded-full border px-4 py-2 text-sm focus-ring ${isSaved ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-ink-200 text-ink-600 hover:border-emerald-200"}`}
        >
          {isSaved ? "Remove from shopping list" : "Save ingredients"}
        </button>
      </div>

      <div className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm">
        <section>
          <button
            type="button"
            onClick={() => setExpanded((prev) => ({ ...prev, ingredients: !prev.ingredients }))}
            className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold text-ink-900 focus-ring"
            aria-expanded={expanded.ingredients}
          >
            Ingredients
            <span aria-hidden>{expanded.ingredients ? "−" : "+"}</span>
          </button>
          {expanded.ingredients && (
            <ul className="space-y-2 px-6 pb-6 text-sm text-ink-700">
              {scaledIngredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <button
            type="button"
            onClick={() => setExpanded((prev) => ({ ...prev, steps: !prev.steps }))}
            className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold text-ink-900 focus-ring"
            aria-expanded={expanded.steps}
          >
            Steps
            <span aria-hidden>{expanded.steps ? "−" : "+"}</span>
          </button>
          {expanded.steps && (
            <ol className="space-y-3 px-6 pb-6 text-sm text-ink-700">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-emerald-100 text-center text-sm font-semibold text-emerald-700">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 text-sm text-ink-700">
        <p>
          Shopping lists are saved in your browser. Revisit this page to keep planning your week.
        </p>
      </div>
    </section>
  );
}

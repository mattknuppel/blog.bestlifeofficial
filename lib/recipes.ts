import fs from "fs/promises";
import path from "path";
import { format } from "date-fns";
import readingTime from "reading-time";
import { getAllMDXFiles, readMDXFile } from "@/lib/mdx";
import type { MDXContent } from "@/lib/mdx";

export interface RecipeFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cuisine: string;
  mealType: string[];
  diet: string[];
  servings: number;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  calories: number;
  nutrition: Record<string, string>;
  ingredients: string[];
  instructions: string[];
  image?: string;
}

export interface Recipe extends RecipeFrontmatter {
  slug: string;
  formattedDate: string;
  readingTime: ReturnType<typeof readingTime>;
  content: MDXContent<RecipeFrontmatter>["content"];
  rawBody: string;
}

const RECIPES_DIR = "content/recipes";

export async function getRecipes(): Promise<Recipe[]> {
  const files = await getAllMDXFiles(RECIPES_DIR);
  const recipes = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { frontmatter, content, rawBody } = await readMDXFile<RecipeFrontmatter>(path.join(RECIPES_DIR, file));
      const formattedDate = format(new Date(frontmatter.date), "MMMM d, yyyy");
      return {
        ...frontmatter,
        slug,
        formattedDate,
        readingTime: readingTime(rawBody),
        content,
        rawBody
      } satisfies Recipe;
    })
  );
  return recipes.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

export async function getRecipeBySlug(slug: string) {
  const filePath = path.join(RECIPES_DIR, `${slug}.mdx`);
  const exists = await fs
    .access(path.join(process.cwd(), filePath))
    .then(() => true)
    .catch(() => false);
  if (!exists) return null;
  const { frontmatter, content, rawBody } = await readMDXFile<RecipeFrontmatter>(filePath);
  const formattedDate = format(new Date(frontmatter.date), "MMMM d, yyyy");
  return {
    ...frontmatter,
    slug,
    formattedDate,
    readingTime: readingTime(rawBody),
    content,
    rawBody
  } satisfies Recipe;
}

export async function getLatestRecipes(limit = 4) {
  const recipes = await getRecipes();
  return recipes.slice(0, limit);
}

export async function getRecipeFilters() {
  const recipes = await getRecipes();
  const tags = new Set<string>();
  const mealTypes = new Set<string>();
  const diets = new Set<string>();
  const cuisines = new Set<string>();

  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => tags.add(tag));
    recipe.mealType.forEach((meal) => mealTypes.add(meal));
    recipe.diet.forEach((diet) => diets.add(diet));
    cuisines.add(recipe.cuisine);
  });

  return {
    tags: Array.from(tags).sort((a, b) => a.localeCompare(b)),
    mealType: Array.from(mealTypes).sort((a, b) => a.localeCompare(b)),
    diet: Array.from(diets).sort((a, b) => a.localeCompare(b)),
    cuisine: Array.from(cuisines).sort((a, b) => a.localeCompare(b))
  };
}

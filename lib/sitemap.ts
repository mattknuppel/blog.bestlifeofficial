import config from "@/config";
import { getPosts } from "@/lib/posts";
import { getRecipes } from "@/lib/recipes";

export async function generateSitemapEntries() {
  const baseEntries = [
    "",
    "/about",
    "/blog",
    "/recipes",
    "/calculators/bmi",
    "/calculators/tdee",
    "/calculators/macros",
    "/contact",
    "/subscribe",
    "/legal/privacy",
    "/legal/terms",
    "/legal/medical-disclaimer",
    "/legal/affiliate-disclosure"
  ].map((path) => ({
    url: `${config.url}${path}`,
    lastModified: new Date().toISOString()
  }));

  const [posts, recipes] = await Promise.all([getPosts(), getRecipes()]);

  const postEntries = posts.map((post) => ({
    url: `${config.url}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString()
  }));

  const recipeEntries = recipes.map((recipe) => ({
    url: `${config.url}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.date).toISOString()
  }));

  return [...baseEntries, ...postEntries, ...recipeEntries];
}

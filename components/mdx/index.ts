import { Callout } from "./Callout";
import { ProsCons } from "./ProsCons";
import { NutritionTable } from "./NutritionTable";
import { NutritionFacts } from "./NutritionFacts";
import { Note } from "./Note";
import { Quote } from "./Quote";

export const mdxComponents = {
  Callout,
  ProsCons,
  NutritionTable,
  NutritionFacts,
  Note,
  Quote
};

export type MDXComponentMap = typeof mdxComponents;

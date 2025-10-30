import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const macrosSchema = z.object({
  kcal: z.number().positive(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
});

const recipeFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().min(1),
  servings: z.number().int().positive(),
  prepTime: z.number().int().nonnegative(),
  cookTime: z.number().int().nonnegative(),
  macros: macrosSchema,
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).min(1),
});

const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().min(1),
  date: z.coerce.date(),
  tags: z.array(z.string().min(1)).min(1),
});

const Macros = defineNestedType(() => ({
  name: 'Macros',
  fields: {
    kcal: { type: 'number', required: true },
    protein: { type: 'number', required: true },
    carbs: { type: 'number', required: true },
    fat: { type: 'number', required: true },
  },
}));

export const Recipe = defineDocumentType(() => ({
  name: 'Recipe',
  filePathPattern: `recipes/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    coverImage: { type: 'string', required: true },
    servings: { type: 'number', required: true },
    prepTime: { type: 'number', required: true },
    cookTime: { type: 'number', required: true },
    macros: { type: 'nested', of: Macros, required: true },
    ingredients: { type: 'list', of: { type: 'string' }, required: true },
    steps: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
    },
    validatedFrontmatter: {
      type: 'json',
      resolve: (doc) =>
        recipeFrontmatterSchema.parse({
          title: doc.title,
          description: doc.description,
          coverImage: doc.coverImage,
          servings: doc.servings,
          prepTime: doc.prepTime,
          cookTime: doc.cookTime,
          macros: doc.macros,
          ingredients: doc.ingredients,
          steps: doc.steps,
          tags: doc.tags,
        }),
    },
  },
}));

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    coverImage: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
    },
    validatedFrontmatter: {
      type: 'json',
      resolve: (doc) =>
        blogFrontmatterSchema.parse({
          title: doc.title,
          description: doc.description,
          coverImage: doc.coverImage,
          date: doc.date,
          tags: doc.tags,
        }),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Recipe, BlogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

# Best Life Official

Evidence-based health & nutrition made simple. This project is a Next.js 14 App Router site with TypeScript, Tailwind CSS, and MDX-powered content.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the site.

## Project structure

- `app/` – App Router pages, API routes, calculators, and legal pages.
- `components/` – UI primitives, MDX shortcodes, recipe experiences, and calculator widgets.
- `content/` – MDX files for blog posts and recipes with frontmatter metadata.
- `lib/` – Utility modules for MDX loading, content queries, SEO helpers, and calculator math.
- `public/` – Static assets including fonts and default OG image.

## Content authoring

### Blog posts

Create a new `.mdx` file in `content/posts` with frontmatter:

```mdx
---
title: "Title"
description: "Short summary"
date: YYYY-MM-DD
author: "Author Name"
tags: ["tag-a", "tag-b"]
cover: ""
---
```

Use the shortcodes `<Callout>`, `<ProsCons>`, `<Note>`, `<Quote>`, `<NutritionTable>`, and `<NutritionFacts>` to enhance storytelling.

### Recipes

Add `.mdx` files to `content/recipes` with frontmatter mirroring the sample recipes. Include nutrition facts, instructions, and optional imagery.

## Filters & search

- Blog index: server-side search across titles/descriptions, tag filters, and pagination.
- Recipe library: client-side filtering by tag, meal type, diet, cuisine, prep time, and calories with instant search.

## Environment variables

- `CONTACT_WEBHOOK_URL` (optional): URL to forward validated contact form submissions.
- `NEXT_PUBLIC_SITE_URL` (optional): provide if you reference the canonical URL client-side.

## Calculators

- BMI, TDEE, and Macro calculators support metric/imperial toggles and shareable URLs via query parameters.
- Mathematical helpers live in `lib/units.ts` and `lib/tdee.ts`.

## Deployment

Deploy to Vercel (Node 20). The included GitHub Action runs `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` to mirror production checks.

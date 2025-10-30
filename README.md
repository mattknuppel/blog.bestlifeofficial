# Best Life Official

A production-ready Next.js 14 static site for Best Life Official, featuring recipes, blog articles, and nutrition
calculators. The project ships with Contentlayer-powered content, Tailwind CSS styling, automatic Open Graph image
generation, and a GitHub Actions workflow that deploys static exports to GitHub Pages.

## Highlights

- **Next.js 14 App Router** with static export (`output: "export"`) and Contentlayer MDX integration.
- **Nutrition hub** with recipe listings, blog articles (with automatic table of contents), calculators, and legal pages.
- **Reusable UI** components (cards, inputs, tag pills, theme toggle) with Tailwind CSS and custom theming.
- **Light/dark mode** respecting the user’s system preference with a manual override.
- **Static Open Graph images** generated at build time for every recipe and article.
- **GitHub Pages ready** via `npm run build` and a workflow that publishes the `/out` directory using
  `peaceiris/actions-gh-pages`.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [Contentlayer](https://www.contentlayer.dev/) for typed MDX content
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zod](https://zod.dev/) for frontmatter validation
- [Satori](https://github.com/vercel/satori) + [@resvg/resvg-js](https://github.com/yisibl/resvg-js) for OG images
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for calculator tests

## Getting Started

1. **Install Node 20** (use `.nvmrc` for convenience) and npm 10.
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Lint and test:
   ```bash
   npm run lint
   npm test
   ```

## Content authoring

- Recipes live in `content/recipes/*.mdx` and articles in `content/blog/*.mdx`.
- Each entry supplies validated frontmatter (title, description, tags, nutrition metadata) and a Markdown/MDX body.
- Contentlayer generates typed modules in `.contentlayer/generated`, enabling type-safe imports throughout the app.

## Calculators

The `/calculators` page includes:

- **BMI calculator** supporting metric and imperial inputs.
- **BMR/TDEE calculator** using the Mifflin-St Jeor equation with selectable activity multipliers.
- **Macro split calculator** that converts TDEE into daily gram targets.

All three calculators share utilities in `lib/calculators.ts` and are covered by Vitest + Testing Library tests located in
`tests/`.

## Static export & OG image generation

- `npm run build` runs `next build`, `next export`, and `node scripts/generate-og.mjs`.
- The export outputs HTML to `/out` (ready for GitHub Pages) and writes Open Graph PNGs to `public/og/{slug}.png`.
- The OG script reads Contentlayer data, renders SVGs with Satori, converts them to PNGs using Resvg, and logs the output
  directory.

## Deployment to GitHub Pages

- The workflow in `.github/workflows/gh-pages.yml` builds the site on pushes to `main` and publishes `./out` to the
  `gh-pages` branch with `peaceiris/actions-gh-pages`.
- By default the site assumes root hosting (e.g., `username.github.io`).
- Deploying to `username.github.io/repo`? Set a repository variable named `BASE_PATH` to `/repo` (include the leading
  slash). The build picks up `process.env.BASE_PATH` to configure `basePath` and `assetPrefix` automatically.

## Contact form

The contact form posts to `mailto:hello@bestlifeofficial.com` for an accessible static fallback. For serverless handling,
replace the form `action` with a provider such as Netlify Forms or Formspree. Additional guidance is included in the form
helper text.

## Testing

- Run component tests with `npm test` (Vitest + Testing Library, JSDOM environment).
- Run linting with `npm run lint`.

## Accessibility & UX

- Semantic headings, accessible form labels, keyboard-focusable navigation, and color-contrast-friendly palettes.
- Searchable recipe and article listings with client-side filtering and pagination.
- Theme toggle stored in local storage with system preference detection.

## Static assets

- Logos, favicons, and illustration-style cover art live in `public/`.
- Generated Open Graph images reside in `public/og/` after running the build script.

## Post-clone steps

- [ ] `npm ci`
- [ ] `npm run dev`
- [ ] Update content in `content/blog` and `content/recipes` as needed

## GitHub Pages setup

- [ ] Configure repository variable `BASE_PATH` (only when deploying to `username.github.io/repo`)
- [ ] Enable GitHub Pages to serve from the `gh-pages` branch (GitHub Actions will create/update it automatically)

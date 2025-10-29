# Nutriwise

Nutriwise is a Next.js 14 + TypeScript wellness publishing starter focused on performance, accessibility, and evidence-based nutrition storytelling.

## Getting started

```bash
pnpm install
pnpm dev
```

Available scripts:

- `pnpm dev` – start the development server.
- `pnpm build` – create an optimized production build.
- `pnpm start` – run the production build.
- `pnpm lint` – run Next.js linting.
- `pnpm typecheck` – validate TypeScript types.

## Project structure

```
app/
  layout.tsx                 # Global layout, metadata, structured data
  (marketing)/               # Marketing + blog routes
  legal/                     # Policy pages with breadcrumbs
  api/contact/route.ts       # Contact form handler
content/posts/               # MDX posts + assets
public/                      # Static assets (favicon, OG image, hero art)
```

### Writing posts

1. Add a new `.mdx` file in `content/posts/` with the required frontmatter:

   ```mdx
   ---
   title: "Post title"
   description: "Short summary for cards and SEO."
   date: "2024-02-01"
   author: "Name, Credentials"
   tags: ["tag-slug"]
   cover: "/posts/my-post/cover.svg"
   ---
   ```

2. Place related illustrations in `public/posts/<post-slug>/` and reference them with absolute paths (e.g. `/posts/my-post/figure.svg`). Images are automatically optimized via `next/image` through the MDX renderer.

3. Use the built-in shortcodes:

   ```mdx
   <Callout type="info" title="Key Takeaway">...</Callout>
   <ProsCons pros={["Pro"]} cons={["Con"]} />
   <Note>Helpful tip.</Note>
   <Quote cite="Expert">Quote text.</Quote>
   <NutritionTable items={[{ food: 'Food', serving: '1 cup', protein: '10 g' }]} />
   ```

## Styling & branding

Tailwind tokens for the color palette and typography live in `tailwind.config.ts`. Update accent colors or font stacks there, then restart the dev server.

Global styles (focus states, background colors, etc.) are defined in `app/(layout)/styles/globals.css`.

Site-wide metadata (name, description, social links) lives in `site.config.ts`. Update it whenever branding or canonical URLs change.

## Environment variables

Create a `.env.local` file with:

```
CONTACT_WEBHOOK_URL= # Optional webhook endpoint for contact form submissions
SITE_URL=https://www.yoursite.com
```

`SITE_URL` is used by Vercel when deploying—set it as a project environment variable or update `site.config.ts` to match your production domain.

## Deployment

Deploy seamlessly to [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Create a new Vercel project and import the repo.
3. Set `CONTACT_WEBHOOK_URL` and `SITE_URL` environment variables.
4. Vercel automatically runs the build (`pnpm build`) and deploys the optimized output.

For other platforms, run `pnpm build` and serve the `.next` output with any Node.js server (`pnpm start`).

## Continuous integration

GitHub Actions run linting and type checks on every push. See `.github/workflows/ci.yml` for details.

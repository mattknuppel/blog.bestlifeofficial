import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";
import { getLatestRecipes } from "@/lib/recipes";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export default async function HomePage() {
  const [posts, recipes] = await Promise.all([getLatestPosts(3), getLatestRecipes(3)]);

  return (
    <div className="space-y-20">
      <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-white via-emerald-50 to-white px-6 py-14 shadow-sm sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Best Life Official</p>
          <h1 className="mt-4 text-4xl font-semibold text-ink-900 sm:text-5xl">
            Evidence-based health & nutrition made simple.
          </h1>
          <p className="mt-6 text-lg text-ink-600">
            We translate the latest science into doable habits, tasty recipes, and smart calculators so you can feel your
            best without the guesswork.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/subscribe"
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow focus-ring hover:bg-emerald-500"
            >
              Join the newsletter
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-600 focus-ring hover:bg-emerald-50"
            >
              Meet the team
            </Link>
          </div>
        </div>
        <div className="grid gap-4 text-sm text-ink-600">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink-900">What you&apos;ll get</h2>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Digestible breakdowns of nutrition myths</li>
              <li>Dietitian-tested recipes for busy schedules</li>
              <li>Tools that adapt to your body & goals</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink-900">Start exploring</h2>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li><Link href="/blog" className="hover:text-emerald-600">Guides & explainers</Link></li>
              <li><Link href="/recipes" className="hover:text-emerald-600">Protein-forward recipes</Link></li>
              <li><Link href="/calculators/tdee" className="hover:text-emerald-600">Personalized calculators</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink-900">Latest articles</h2>
          <Link href="/blog" className="text-sm font-semibold text-emerald-600">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{post.tags[0] ?? "Insight"}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-emerald-600">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink-600">{post.description}</p>
              <p className="mt-4 text-xs text-ink-500">{post.formattedDate} · {post.readingTime.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink-900">Fresh recipes</h2>
          <Link href="/recipes" className="text-sm font-semibold text-emerald-600">
            Browse all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <article key={recipe.slug} className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{recipe.cuisine}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink-900">
                <Link href={`/recipes/${recipe.slug}`} className="hover:text-emerald-600">
                  {recipe.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink-600">{recipe.description}</p>
              <p className="mt-4 text-xs text-ink-500">Ready in {recipe.totalTime} · {recipe.calories} kcal</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-white p-10 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1fr,320px] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-ink-900">Stay ahead with the Best Life Briefing</h2>
            <p className="mt-4 text-sm text-ink-600">
              Every Sunday we send the latest evidence, a featured recipe, and one actionable habit to try. No spam. Ever.
            </p>
          </div>
          <NewsletterForm className="no-print" />
        </div>
      </section>
    </div>
  );
}

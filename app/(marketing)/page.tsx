import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata, buildCanonical } from '../(layout)/lib/seo';
import { Container } from '../(layout)/components/container';
import { ButtonLink } from '../(layout)/components/button';
import { Card } from '../(layout)/components/card';
import { NewsletterForm } from '../(layout)/components/newsletter-form';
import { getAllPostsMeta } from '../(layout)/lib/posts';
import { PostCard } from '../(layout)/components/post-card';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Nutriwise | Evidence-based wellness made simple',
    description: 'Science-backed nutrition guidance, practical recipes, and supplement clarity to help you feel great.',
    alternates: { canonical: buildCanonical('/') },
  }),
};

export default async function HomePage() {
  const posts = await getAllPostsMeta();
  const featured = posts.slice(0, 3);

  return (
    <>
      <section className="border-b border-slate-200 bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Nutrition clarity for real life</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Evidence-based health & nutrition made simple.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Nutriwise distills research into actionable guidance so you can feel confident about what fuels your body—without the overwhelm.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/blog" variant="primary">
                Read the Blog
              </ButtonLink>
              <ButtonLink href="/subscribe" variant="secondary">
                Subscribe
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-100 via-white to-emerald-50" aria-hidden />
            <Image
              src="/hero-illustration.svg"
              alt="Colorful whole-food breakfast bowls with berries and seeds."
              width={720}
              height={540}
              className="relative rounded-3xl object-cover shadow-xl"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="bg-background py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-foreground">Why Nutriwise?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Science-backed guides',
                description: 'We translate peer-reviewed research into plain language and practical recommendations.',
              },
              {
                title: 'Practical meal tips',
                description: 'Simple swaps, smart shopping, and flexible meal ideas designed for busy schedules.',
              },
              {
                title: 'Smarter supplements',
                description: 'Clarity on what works, what is hype, and how to use supplements responsibly.',
              },
            ].map((pillar) => (
              <Card key={pillar.title}>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Featured insights</h2>
              <p className="mt-2 text-sm text-slate-600">Discover the latest evidence-based nutrition explainers.</p>
            </div>
            <ButtonLink href="/blog" variant="ghost">
              Browse all articles
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-16">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Free weekly insights</h2>
            <p className="mt-3 text-sm text-slate-600">
              Join thousands of readers getting practical nutrition tips, vetted supplement guidance, and seasonal recipe ideas.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-foreground">Trusted by wellness-forward teams</h2>
          <div className="mt-6 grid gap-6 text-center text-sm text-slate-500 sm:grid-cols-4">
            {['ThriveLabs', 'Mindful Meals', 'Peak Performance Co.', 'Everyday Strength'].map((brand) => (
              <div key={brand} className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6">
                {brand}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-16">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Meet Nutriwise</h2>
            <p className="mt-3 text-sm text-slate-600">
              We are a collective of registered dietitians, researchers, and culinary strategists committed to helping people fuel their lives with confidence.
            </p>
            <Link href="/about" className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline">
              Learn more about us
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Here is what you will find:</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Digestible breakdowns of complex nutrition topics</li>
              <li>• Meal planning frameworks that flex with real schedules</li>
              <li>• Supplement reviews vetted by credentialed experts</li>
              <li>• Action steps to feel energized, not restricted</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

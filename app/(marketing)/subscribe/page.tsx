import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { NewsletterForm } from '../../(layout)/components/newsletter-form';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Subscribe to Nutriwise',
    description: 'Join thousands of readers receiving practical nutrition insights each week.',
    alternates: { canonical: buildCanonical('/subscribe') },
  }),
};

export default function SubscribePage() {
  return (
    <section className="bg-background py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="prose prose-slate max-w-none">
          <h1>Subscribe to Nutriwise</h1>
          <p>
            Every Sunday, we send a digestible briefing covering one evidence-backed strategy, a wholesome recipe idea, and a
            supplement myth we debunk together.
          </p>
          <ul>
            <li>High-signal insights in under five minutes</li>
            <li>Seasonal recipes and shopping tips</li>
            <li>No spam—unsubscribe anytime</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Free weekly insights</h2>
          <p className="mt-2 text-sm text-slate-600">Drop your email below to join the community.</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';
import { getSiteConfig } from '../../(layout)/lib/config';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Contact Nutriwise',
    description: 'Reach out for general questions, partnerships, or press inquiries.',
    alternates: { canonical: buildCanonical('/contact') },
  }),
};

export default function ContactPage() {
  const config = getSiteConfig();
  return (
    <section className="bg-background py-16">
      <Container className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:items-start">
        <div className="prose prose-slate max-w-none">
          <h1>Contact Nutriwise</h1>
          <p>
            We love hearing from our community. Share your question below and the Nutriwise team will respond within two
            business days.
          </p>
          <p>
            Prefer email? Reach us directly at{' '}
            <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a> or visit us at {config.businessAddress} by
            appointment.
          </p>
          <ContactForm />
        </div>
        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">How we can help</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>General nutrition questions and feedback about the blog</li>
            <li>Brand or partnership opportunities aligned with our mission</li>
            <li>Media and press interviews with our registered dietitians</li>
          </ul>
        </aside>
      </Container>
    </section>
  );
}

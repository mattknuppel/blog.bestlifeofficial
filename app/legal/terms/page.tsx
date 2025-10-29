import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { Breadcrumbs } from '../../(layout)/components/breadcrumbs';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';
import { getSiteConfig } from '../../(layout)/lib/config';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Terms of Use | Nutriwise',
    alternates: { canonical: buildCanonical('/legal/terms') },
  }),
};

export default function TermsPage() {
  const config = getSiteConfig();
  const year = new Date().getFullYear();
  return (
    <section className="bg-background py-16">
      <Container className="prose prose-slate max-w-3xl">
        <Breadcrumbs items={[{ href: '/legal/terms', label: 'Terms of Use' }]} />
        <h1>Terms of Use</h1>
        <p>Last updated: {year}</p>
        <h2>Acceptance of terms</h2>
        <p>
          By accessing Nutriwise (the “Site”), you agree to these Terms of Use and our Privacy Policy. If you do not agree,
          please discontinue use immediately.
        </p>
        <h2>Use of content</h2>
        <p>
          Articles, tools, and resources are provided for educational purposes. You may not republish, distribute, or create
          derivative works without prior written consent from {config.siteName}.
        </p>
        <h2>Community guidelines</h2>
        <ul>
          <li>Engage respectfully and avoid harassment or discriminatory language.</li>
          <li>Share only accurate information and cite credible sources when possible.</li>
          <li>Do not post medical, legal, or financial advice posing as professional counsel.</li>
        </ul>
        <h2>Limitation of liability</h2>
        <p>
          {config.siteName} does not guarantee specific results and is not liable for damages arising from your use of the Site.
          All content is provided “as is.”
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms may be directed to <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a> or
          mailed to {config.businessAddress}.
        </p>
      </Container>
    </section>
  );
}

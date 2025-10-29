import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { Breadcrumbs } from '../../(layout)/components/breadcrumbs';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';
import { getSiteConfig } from '../../(layout)/lib/config';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Affiliate Disclosure | Nutriwise',
    alternates: { canonical: buildCanonical('/legal/affiliate-disclosure') },
  }),
};

export default function AffiliateDisclosurePage() {
  const config = getSiteConfig();
  const year = new Date().getFullYear();
  return (
    <section className="bg-background py-16">
      <Container className="prose prose-slate max-w-3xl">
        <Breadcrumbs items={[{ href: '/legal/affiliate-disclosure', label: 'Affiliate Disclosure' }]} />
        <h1>Affiliate Disclosure</h1>
        <p>Last updated: {year}</p>
        <p>
          Some links on {config.siteName} are affiliate links. If you purchase through these links, we may earn a small
          commission at no additional cost to you.
        </p>
        <h2>Our review process</h2>
        <ul>
          <li>Products are selected based on independent testing and expert evaluation.</li>
          <li>Affiliations do not influence our editorial recommendations.</li>
          <li>We disclose when content is sponsored or compensated.</li>
        </ul>
        <p>
          Your trust matters most. Reach out to <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a> with any
          questions about our partnerships.
        </p>
      </Container>
    </section>
  );
}

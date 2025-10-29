import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { Breadcrumbs } from '../../(layout)/components/breadcrumbs';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';
import { getSiteConfig } from '../../(layout)/lib/config';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Privacy Policy | Nutriwise',
    alternates: { canonical: buildCanonical('/legal/privacy') },
  }),
};

export default function PrivacyPage() {
  const config = getSiteConfig();
  const year = new Date().getFullYear();
  return (
    <section className="bg-background py-16">
      <Container className="prose prose-slate max-w-3xl">
        <Breadcrumbs items={[{ href: '/legal/privacy', label: 'Privacy Policy' }]} />
        <h1>Privacy Policy</h1>
        <p>Last updated: {year}</p>
        <h2>Information we collect</h2>
        <p>
          We collect information you provide directly, such as your email when you subscribe or your message when submitting
          our contact form. We also collect limited analytics data to understand how visitors engage with the Site.
        </p>
        <h2>How we use information</h2>
        <ul>
          <li>Deliver newsletters and respond to inquiries</li>
          <li>Improve our content and user experience</li>
          <li>Maintain the security and integrity of the Site</li>
        </ul>
        <h2>Sharing of information</h2>
        <p>
          {config.siteName} does not sell your personal information. We share data only with trusted service providers who assist
          in operating the Site and are bound by confidentiality obligations.
        </p>
        <h2>Your choices</h2>
        <p>
          You may unsubscribe from emails at any time by using the link in our messages or by contacting us at{' '}
          <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>.
        </p>
      </Container>
    </section>
  );
}

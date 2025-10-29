import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { Breadcrumbs } from '../../(layout)/components/breadcrumbs';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';
import { getSiteConfig } from '../../(layout)/lib/config';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Medical Disclaimer | Nutriwise',
    alternates: { canonical: buildCanonical('/legal/medical-disclaimer') },
  }),
};

export default function MedicalDisclaimerPage() {
  const config = getSiteConfig();
  const year = new Date().getFullYear();
  return (
    <section className="bg-background py-16">
      <Container className="prose prose-slate max-w-3xl">
        <Breadcrumbs items={[{ href: '/legal/medical-disclaimer', label: 'Medical Disclaimer' }]} />
        <h1>Medical Disclaimer</h1>
        <p>Last updated: {year}</p>
        <h2>No medical advice</h2>
        <p>
          The content on {config.siteName} is for educational purposes only. It is not a substitute for personalized medical
          advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for questions about your health.
        </p>
        <h2>Emergency situations</h2>
        <p>
          Never delay seeking medical help because of information read on this Site. Call your local emergency services in the
          event of a health emergency.
        </p>
        <h2>Nutritional supplementation</h2>
        <p>
          Discussions about supplements are informational and do not constitute endorsements. Consult your healthcare provider
          before starting or changing any supplement routine.
        </p>
      </Container>
    </section>
  );
}

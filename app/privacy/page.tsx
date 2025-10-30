import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Best Life Official collects, uses, and protects your information.',
};

const sections = [
  {
    title: 'Information we collect',
    body:
      'When you subscribe, download resources, or contact us we collect your name, email address, and any details you share voluntarily. We also log anonymous analytics to understand how the site performs.',
  },
  {
    title: 'How we use your data',
    body:
      'Data powers helpful content. We use it to send newsletters you opt into, improve recipes and calculators, and respond to support requests. We never sell your information.',
  },
  {
    title: 'Third-party services',
    body:
      'We rely on trusted providers for email delivery, analytics, and payment processing. Each partner is vetted for GDPR compliance and only receives the minimum data required.',
  },
  {
    title: 'Your rights',
    body:
      'You can unsubscribe at any time, request a data export, or ask for deletion by emailing privacy@bestlifeofficial.com. We respond within 30 days.',
  },
];

export default function PrivacyPage() {
  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="Privacy Policy"
        description="Your trust matters. This policy explains how we handle data collected through Best Life Official."
      />
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <p>
          Questions about privacy? Email <a href="mailto:privacy@bestlifeofficial.com">privacy@bestlifeofficial.com</a>.
        </p>
      </div>
    </Container>
  );
}

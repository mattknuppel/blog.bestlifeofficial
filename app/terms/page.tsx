import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Guidelines for using Best Life Official resources.',
};

export default function TermsPage() {
  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="Terms of Use"
        description="By accessing Best Life Official you agree to the guidelines below. We update terms when services change."
      />
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Content</h2>
          <p>
            Articles, recipes, and calculators are for educational purposes and not a substitute for personalized medical
            advice. Consult your healthcare professional before making significant changes to your diet or exercise routine.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Acceptable use</h2>
          <p>
            You may share our content with attribution. Do not resell materials, scrape content, or attempt to circumvent
            security controls.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Liability</h2>
          <p>
            Best Life Official is provided &ldquo;as is&rdquo;. We are not liable for any damages arising from use of the site.
            Some jurisdictions do not allow limitations of liability, so these terms may not apply to you.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Changes</h2>
          <p>
            We will post updates to these terms with a revised date. Continued use of the site constitutes acceptance of any
            updates.
          </p>
        </section>
        <p>
          Questions? Email <a href="mailto:support@bestlifeofficial.com">support@bestlifeofficial.com</a>.
        </p>
      </div>
    </Container>
  );
}

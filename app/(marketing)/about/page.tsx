import type { Metadata } from 'next';
import { Container } from '../../(layout)/components/container';
import { buildMetadata, buildCanonical } from '../../(layout)/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'About Nutriwise',
    description: 'Meet the team translating nutrition science into everyday clarity.',
    alternates: { canonical: buildCanonical('/about') },
  }),
};

export default function AboutPage() {
  return (
    <section className="bg-background py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1>About Nutriwise</h1>
        <p>
          Nutriwise exists to make evidence-based nutrition approachable, actionable, and compassionate. Our team of
          registered dietitians, culinary strategists, and science communicators review hundreds of studies each month so we can
          provide trustworthy guidance tailored to everyday life.
        </p>
        <p>
          We believe nourishing yourself should feel empowering—not overwhelming. That means translating research into
          real-world action, offering practical meal frameworks, and equipping you to choose supplements with discernment.
        </p>
        <h2>Our approach</h2>
        <ul>
          <li>Prioritize human-centered stories that honor diverse bodies, cultures, and experiences.</li>
          <li>Lead with transparency about sourcing, evidence strength, and conflicts of interest.</li>
          <li>Test every recommendation in real kitchens and busy schedules before we share it with you.</li>
        </ul>
        <h2>Who we serve</h2>
        <p>
          From athletes balancing recovery nutrition to caregivers fueling their families, Nutriwise is here for anyone who wants
          clarity without extremes. Our community spans every stage of the wellness journey—and you are welcome here.
        </p>
      </Container>
    </section>
  );
}

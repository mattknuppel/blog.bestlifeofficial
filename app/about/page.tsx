import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'About',
  description: 'The mission, team, and approach behind Best Life Official.',
};

const values = [
  {
    title: 'Evidence before trends',
    description: 'We translate peer-reviewed research into approachable frameworks anyone can apply in their daily routine.',
  },
  {
    title: 'Food as a lifestyle ally',
    description:
      'Balanced recipes prioritize flavor, flexibility, and time-saving techniques so healthy eating fits your schedule.',
  },
  {
    title: 'Progress over perfection',
    description: 'Small, repeatable choices move the needle. Our guidance centers habits that scale with your goals.',
  },
];

export default function AboutPage() {
  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="About Best Life Official"
        description="We are registered dietitians, culinary pros, and coaches committed to empowering everyday athletes and wellness seekers."
      />

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Best Life Official started as a weekly community newsletter and quickly grew into a trusted resource for
            intentional eating. We bridge the gap between clinical nutrition and your kitchen counter with clear,
            encouraging education.
          </p>
          <p>
            Our team has coached thousands of clients, led corporate wellness programs, and developed meal plans for busy
            families, competitive athletes, and plant-based foodies alike. We believe nourishing your best life should feel
            energizing—not overwhelming.
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-muted/40 p-8 shadow-sm dark:border-white/10">
          <h2 className="text-xl font-semibold">Our promise</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>✔️ Always cite reputable sources and make science understandable.</li>
            <li>✔️ Offer culturally inclusive recipes and flexible nutrition strategies.</li>
            <li>✔️ Respect your time with concise guides, templates, and tools.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-2xl border border-black/5 bg-muted/40 p-6 dark:border-white/10">
            <h3 className="text-lg font-semibold">{value.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </section>
    </Container>
  );
}

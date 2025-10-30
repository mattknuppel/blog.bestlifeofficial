import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the Best Life Official team for collaborations, media inquiries, or community support.',
};

export default function ContactPage() {
  return (
    <Container className="space-y-12 py-16">
      <PageHeader
        title="Contact the team"
        description="We read every message. Use the form to reach us or email hello@bestlifeofficial.com."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <form
          className="space-y-6 rounded-3xl border border-black/5 bg-muted/40 p-8 shadow-sm dark:border-white/10"
          action="mailto:hello@bestlifeofficial.com"
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Name
              <input
                type="text"
                name="name"
                required
                className="h-12 rounded-lg border border-black/10 bg-white/90 px-4 text-sm text-[rgb(var(--foreground))] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-white/10 dark:bg-slate-900/80"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Email
              <input
                type="email"
                name="email"
                required
                className="h-12 rounded-lg border border-black/10 bg-white/90 px-4 text-sm text-[rgb(var(--foreground))] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-white/10 dark:bg-slate-900/80"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              How can we help?
              <textarea
                name="message"
                rows={5}
                required
                className="rounded-lg border border-black/10 bg-white/90 px-4 py-3 text-sm text-[rgb(var(--foreground))] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-white/10 dark:bg-slate-900/80"
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            This form opens your default email client. Prefer automation? Connect the same fields to services like Formspree
            or Netlify Forms when deploying.
          </p>
          <button
            type="submit"
            className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Send message
          </button>
        </form>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Partnerships &amp; press</h2>
            <p>
              For media requests, brand collaborations, or speaking engagements, include timelines and deliverables so the
              right teammate can respond quickly.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Community support</h2>
            <p>
              Need help with a recipe or calculator? Share the link you&apos;re using and any screenshots so we can troubleshoot
              together.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}

import Link from 'next/link';

import { Container } from './container';

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-muted/60 py-10 text-sm dark:border-white/10 dark:bg-slate-900/70">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-[rgb(var(--foreground))]">Best Life Official</p>
          <p className="max-w-xl text-muted-foreground">
            Evidence-backed resources for recipes, wellness insights, and calculators to help you live your best life.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <Link href="/privacy" className="hover:text-[rgb(var(--foreground))]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[rgb(var(--foreground))]">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-[rgb(var(--foreground))]">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}

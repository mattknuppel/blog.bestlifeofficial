import Link from 'next/link';

import { Container } from './container';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/blog', label: 'Articles' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-[rgb(var(--background))]/90 backdrop-blur dark:border-white/10">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Best Life Official
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-muted-foreground transition hover:text-[rgb(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

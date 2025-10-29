'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/subscribe', label: 'Subscribe' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground" aria-label="Nutriwise home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground">NW</span>
          <span className="hidden sm:inline">Nutriwise</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx('rounded px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                  isActive ? 'text-accent' : 'text-slate-600 hover:text-foreground')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? <XMarkIcon className="h-6 w-6" aria-hidden /> : <Bars3Icon className="h-6 w-6" aria-hidden />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className={clsx('md:hidden', open ? 'max-h-96 border-t border-slate-200 bg-white shadow-lg' : 'max-h-0 overflow-hidden')}
        aria-label="Mobile navigation"
      >
        <ul className="space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx('block rounded px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                    isActive ? 'bg-accent/10 text-accent' : 'text-slate-700 hover:bg-accent/10')}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

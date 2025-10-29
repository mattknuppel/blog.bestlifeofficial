import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import config from "@/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/recipes", label: "Recipes" },
  { href: "/calculators/bmi", label: "Calculators" },
  { href: "/contact", label: "Contact" },
  { href: "/subscribe", label: "Subscribe" }
];

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title: {
    default: `${config.siteName} · Evidence-based health & nutrition made simple`,
    template: `%s · ${config.siteName}`
  },
  description: config.description,
  openGraph: {
    title: config.siteName,
    description: config.description,
    url: config.url,
    siteName: config.siteName,
    type: "website",
    images: [
      {
        url: `${config.url}/api/og`,
        width: 1200,
        height: 630,
        alt: config.siteName
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: config.siteName,
    description: config.description,
    images: [`${config.url}/api/og`]
  }
};

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-emerald-600 focus-ring">
          {config.siteName}
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium text-ink-600 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring hover:text-emerald-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/subscribe"
          className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 focus-ring"
        >
          Newsletter
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">About</h2>
          <p className="mt-3 text-sm text-ink-600">{config.description}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li><Link href="/blog" className="focus-ring hover:text-emerald-600">Blog</Link></li>
            <li><Link href="/recipes" className="focus-ring hover:text-emerald-600">Recipes</Link></li>
            <li><Link href="/calculators/bmi" className="focus-ring hover:text-emerald-600">BMI Calculator</Link></li>
            <li><Link href="/calculators/tdee" className="focus-ring hover:text-emerald-600">TDEE Calculator</Link></li>
            <li><Link href="/calculators/macros" className="focus-ring hover:text-emerald-600">Macro Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li><Link href="/legal/privacy" className="focus-ring hover:text-emerald-600">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="focus-ring hover:text-emerald-600">Terms of Use</Link></li>
            <li>
              <Link href="/legal/medical-disclaimer" className="focus-ring hover:text-emerald-600">
                Medical Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/legal/affiliate-disclosure" className="focus-ring hover:text-emerald-600">
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Contact</h2>
          <p className="mt-3 text-sm text-ink-600">
            Email: <a href={`mailto:${config.contactEmail}`} className="underline">{config.contactEmail}</a>
          </p>
          <p className="mt-2 text-sm text-ink-600">{config.businessAddress}</p>
        </div>
      </div>
      <div className="border-t border-ink-100 bg-ink-900 py-4">
        <p className="text-center text-xs text-ink-100">
          © {year} {config.siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-ink-50 text-ink-900">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import './(layout)/styles/globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import { buildMetadata, organizationJsonLd, websiteJsonLd } from './(layout)/lib/seo';
import { Navbar } from './(layout)/components/navbar';
import { Footer } from './(layout)/components/footer';
import { SkipLink } from './(layout)/components/skip-link';

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground">
        <SkipLink />
        <Navbar />
        <main id="main-content" className="relative">
          {children}
        </main>
        <Footer />
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteJsonLd())}
        </Script>
        <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationJsonLd())}
        </Script>
      </body>
    </html>
  );
}

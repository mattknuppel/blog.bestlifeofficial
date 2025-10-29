import Link from 'next/link';
import { getSiteConfig } from '../lib/config';
import { Container } from './container';

export const Footer = () => {
  const config = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-sm text-slate-600">
      <Container className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-semibold text-foreground">{config.siteName}</p>
          <p className="mt-2 max-w-md text-sm text-slate-600">{config.businessAddress}</p>
          <a className="mt-2 block text-sm text-accent hover:underline" href={`mailto:${config.contactEmail}`}>
            {config.contactEmail}
          </a>
        </div>
        <div className="md:text-right">
          <nav className="flex flex-wrap justify-start gap-4 md:justify-end" aria-label="Footer">
            <Link className="hover:text-foreground" href="/legal/privacy">
              Privacy
            </Link>
            <Link className="hover:text-foreground" href="/legal/terms">
              Terms
            </Link>
            <Link className="hover:text-foreground" href="/legal/medical-disclaimer">
              Medical Disclaimer
            </Link>
            <Link className="hover:text-foreground" href="/legal/affiliate-disclosure">
              Affiliate Disclosure
            </Link>
            <Link className="hover:text-foreground" href="/contact">
              Contact
            </Link>
          </nav>
          <p className="mt-4 text-xs text-slate-500">© {year} {config.siteName}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

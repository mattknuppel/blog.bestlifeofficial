import { NextResponse } from 'next/server';
import { getSiteConfig } from '../(layout)/lib/config';

export async function GET() {
  const config = getSiteConfig();
  const body = `User-agent: *\nAllow: /\nSitemap: ${config.url.replace(/\/$/, '')}/sitemap.xml`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

import { NextResponse } from 'next/server';
import { generateSitemap } from '../(layout)/lib/sitemap';

export async function GET() {
  const xml = await generateSitemap();
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

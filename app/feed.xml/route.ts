import { NextResponse } from 'next/server';
import { generateRssFeed } from '../(layout)/lib/rss';

export async function GET() {
  const xml = await generateRssFeed();
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

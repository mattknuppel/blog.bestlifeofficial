import { NextResponse } from "next/server";
import { generateRssFeed } from "@/lib/rss";

export async function GET() {
  const xml = await generateRssFeed();
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}

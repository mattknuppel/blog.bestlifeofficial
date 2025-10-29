import config from "@/config";
import { getPosts } from "@/lib/posts";

export async function generateRssFeed() {
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const url = `${config.url}/blog/${post.slug}`;
      return `\n    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <description><![CDATA[${post.description}]]></description>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title><![CDATA[${config.siteName}]]></title>\n    <link>${config.url}</link>\n    <description><![CDATA[${config.description}]]></description>\n    <language>en-au</language>${items}\n  </channel>\n</rss>`;
}

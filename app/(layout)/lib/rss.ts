import { getSiteConfig } from './config';
import { getSitePostsForFeeds } from './posts';

export const generateRssFeed = async () => {
  const config = getSiteConfig();
  const posts = await getSitePostsForFeeds();
  const items = posts
    .map((post) => {
      return `<item>
  <title><![CDATA[${post.title}]]></title>
  <link>${post.url}</link>
  <guid>${post.url}</guid>
  <description><![CDATA[${post.description}]]></description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${config.siteName}]]></title>
    <link>${config.url}</link>
    <description><![CDATA[${config.description}]]></description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;
};

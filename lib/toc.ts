import { slugify } from './slugify';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function generateToc(markdown: string): TocItem[] {
  return markdown
    .split('\n')
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)/);
      if (!match) return null;
      const level = match[1].length;
      const text = match[2].trim();
      return {
        id: slugify(text),
        text,
        level,
      };
    })
    .filter((item): item is TocItem => Boolean(item));
}

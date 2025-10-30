import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const ogDir = path.join(publicDir, 'og');
const fontBase64Path = path.join(__dirname, 'inter-semibold.base64');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

function truncate(text, maxLength = 140) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function tagPills(tags = []) {
  return tags.slice(0, 3).map((tag) => ({
    type: 'div',
    props: {
      style: {
        display: 'inline-flex',
        padding: '6px 14px',
        borderRadius: '999px',
        backgroundColor: 'rgba(255,255,255,0.12)',
        color: '#F8FAFC',
        fontSize: '22px',
        fontWeight: 500,
        marginRight: '12px',
      },
      children: `#${tag}`,
    },
  }));
}

async function createImage({ title, description, tags, slug }, fontData) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0f172a, #1E90FF)',
          color: '#F8FAFC',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              },
              children: tagPills(tags),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '60px',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      maxWidth: '960px',
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '30px',
                      lineHeight: 1.4,
                      maxWidth: '960px',
                      opacity: 0.9,
                    },
                    children: truncate(description, 160),
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '28px',
                fontWeight: 600,
                opacity: 0.95,
              },
              children: [
                'Best Life Official',
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      fontWeight: 500,
                      opacity: 0.8,
                    },
                    children: 'bestlifeofficial.com',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();
  const outputPath = path.join(ogDir, `${slug}.png`);
  await fs.writeFile(outputPath, png);
  return outputPath;
}

async function main() {
  await ensureDir(ogDir);

  const fontBase64 = await fs.readFile(fontBase64Path, 'utf8');
  const fontData = Buffer.from(fontBase64.replace(/\s+/g, ''), 'base64');

  const { allBlogPosts, allRecipes } = await import(path.join(rootDir, '.contentlayer/generated/index.mjs'));

  const items = [
    ...allBlogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
    })),
    ...allRecipes.map((recipe) => ({
      slug: recipe.slug,
      title: recipe.title,
      description: recipe.description,
      tags: recipe.tags,
    })),
  ];

  items.push({
    slug: 'default',
    title: 'Best Life Official',
    description: 'Nutrition, recipes, and calculators to help you live your best life every day.',
    tags: ['nutrition', 'recipes', 'wellness'],
  });

  await Promise.all(items.map((item) => createImage(item, fontData)));

  console.log(`Generated ${items.length} Open Graph images in ${ogDir}`);
}

main().catch((error) => {
  console.error('Failed to generate Open Graph images', error);
  process.exit(1);
});

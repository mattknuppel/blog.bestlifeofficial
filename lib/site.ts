import { getOgImagePath } from './og';

export const siteConfig = {
  name: 'Best Life Official',
  description:
      'Best Life Official helps you build sustainable nutrition habits with recipes, articles, and calculators tailored to your goals.',
  url: 'https://bestlifeofficial.example.com',
  ogImage: getOgImagePath('default'),
  author: 'Best Life Official',
  social: {
    instagram: 'https://instagram.com/bestlifeofficial',
    youtube: 'https://youtube.com/@bestlifeofficial',
  },
};

export type SiteConfig = typeof siteConfig;

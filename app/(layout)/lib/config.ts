import { siteConfig } from '../../../site.config';

export const getSiteConfig = () => ({
  ...siteConfig,
  url: process.env.SITE_URL ?? siteConfig.url,
});

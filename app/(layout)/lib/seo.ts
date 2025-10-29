import type { Metadata } from 'next';
import { getSiteConfig } from './config';

export const buildMetadata = (meta: Partial<Metadata> = {}): Metadata => {
  const config = getSiteConfig();
  const baseMetadata: Metadata = {
    title: config.siteName,
    description: config.description,
    metadataBase: new URL(config.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      siteName: config.siteName,
      title: config.siteName,
      description: config.description,
      images: ['/og.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@nutriwise',
      title: config.siteName,
      description: config.description,
      images: ['/og.svg'],
    },
  };

  return {
    ...baseMetadata,
    ...meta,
    openGraph: {
      ...baseMetadata.openGraph,
      ...meta.openGraph,
      images: meta.openGraph?.images ?? baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...meta.twitter,
      images: meta.twitter?.images ?? baseMetadata.twitter?.images,
    },
  };
};

export const buildCanonical = (path: string) => {
  const config = getSiteConfig();
  return new URL(path, config.url).toString();
};

export const websiteJsonLd = () => {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: config.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/blog?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
};

export const organizationJsonLd = () => {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.siteName,
    url: config.url,
    email: config.contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.businessAddress,
    },
    sameAs: Object.values(config.socialLinks),
  };
};

export const articleJsonLd = (post: {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
}) => {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
};

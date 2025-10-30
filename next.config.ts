import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer';

const rawBasePath = process.env.BASE_PATH?.trim();
const normalizedBasePath = rawBasePath && rawBasePath !== '/'
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';

const config: NextConfig = {
  output: 'export',
  basePath: normalizedBasePath || undefined,
  assetPrefix: normalizedBasePath || undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
  },
};

export default withContentlayer(config);

const rawBasePath = process.env.BASE_PATH?.trim();

const normalizedBasePath =
  rawBasePath && rawBasePath !== '/'
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`
    : '';

export function getOgImagePath(slug: string) {
  const prefix = normalizedBasePath || '';
  return `${prefix}/og/${slug}.png`;
}

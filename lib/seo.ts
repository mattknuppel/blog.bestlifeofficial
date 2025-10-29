import config from "@/config";

export function buildOgImageUrl(params: Record<string, string | number | undefined>) {
  const url = new URL("/api/og", config.url);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

export function buildCanonical(pathname: string) {
  return `${config.url}${pathname}`;
}

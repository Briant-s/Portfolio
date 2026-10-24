/**
 * Resolve a public asset path against Vite's base URL so it works on both
 * root deploys (Vercel, user GitHub Pages) and project sites served from
 * "/<repo>/". Pass a root-relative path like "/tifo.gif".
 *
 * External URLs (http/https) are returned unchanged.
 */
export function assetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

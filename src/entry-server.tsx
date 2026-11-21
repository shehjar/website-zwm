/**
 * Server entry for prerendering (SSG at build time).
 *
 * Built as an SSR bundle by `scripts/prerender.mjs` and rendered there;
 * `react-dom/server` + `StaticRouter` produce static HTML per route, which
 * is written to `dist/`. The client then hydrates that HTML (`hydrateRoot`
 * in `main.tsx`).
 *
 * Besides `renderRoute` this also exports the SEO data from `src/seo.ts`
 * so the prerender script (plain Node/.mjs, no TS support) can get
 * everything from a single bundle.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import {
  buildJsonLd,
  buildSitemapXml,
  resolveRouteSeo,
  ROUTE_PATHS,
  SEO,
  type ResolvedRouteSeo
} from './seo';

export { ROUTE_PATHS, buildSitemapXml };

/** Renders the full app for a route path as an HTML string. */
export function renderRoute(path: string): string {
  return renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>
  );
}

/** Resolved meta data (title, description, canonical, ogImage) per route. */
export function getRouteSeo(path: string): ResolvedRouteSeo {
  return resolveRouteSeo(path);
}

/**
 * Route-specific resource hints for the <head>. Only the home page has a
 * hero photo, so only it preloads the LCP image (legal pages would waste
 * the fetch). Injected at the `<!--app-head-->` marker by prerender.mjs.
 */
export function getHeadLinks(path: string): string {
  if (path !== '/') return '';
  return `<link rel="preload" as="image" href="${SEO.heroImage}" fetchpriority="high">`;
}

/**
 * JSON-LD blocks as a ready-to-embed <script> string (or null when the
 * route carries no schema). `<` is escaped so JSON content can never
 * close the script tag early.
 */
export function getJsonLdScript(path: string): string | null {
  const blocks = buildJsonLd(path);
  if (!blocks) return null;
  const json = JSON.stringify(blocks).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

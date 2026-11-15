/**
 * Server-Entry für das Prerendering (SSG beim Build).
 *
 * Wird von `scripts/prerender.mjs` als SSR-Bundle gebaut und gerendert;
 * `react-dom/server` + `StaticRouter` erzeugen statisches HTML pro Route,
 * das in `dist/` geschrieben wird. Der Client hydratisiert dieses HTML
 * anschließend (`hydrateRoot` in `main.tsx`).
 *
 * Exportiert neben `renderRoute` auch die SEO-Daten aus `src/seo.ts`,
 * damit das Prerender-Skript (reines Node/.mjs, ohne TS-Support) alles
 * aus einem Bundle beziehen kann.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import {
  buildJsonLd,
  buildSitemapXml,
  resolveRouteSeo,
  ROUTE_PATHS,
  type ResolvedRouteSeo
} from './seo';

export { ROUTE_PATHS, buildSitemapXml };

/** Rendert die komplette App für einen Routenpfad als HTML-String. */
export function renderRoute(path: string): string {
  return renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>
  );
}

/** Aufgelöste Meta-Daten (title, description, canonical, ogImage) pro Route. */
export function getRouteSeo(path: string): ResolvedRouteSeo {
  return resolveRouteSeo(path);
}

/**
 * JSON-LD-Blöcke als einbettungsfertigen <script>-String (oder null, wenn
 * die Route kein Schema trägt). `<` wird escaped, damit kein JSON-Inhalt
 * das Script-Tag vorzeitig beenden kann.
 */
export function getJsonLdScript(path: string): string | null {
  const blocks = buildJsonLd(path);
  if (!blocks) return null;
  const json = JSON.stringify(blocks).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

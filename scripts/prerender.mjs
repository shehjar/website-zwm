/**
 * Prerendering (SSG) für zumwohlmobil.de — läuft als zweiter Schritt von
 * `npm run build` nach `vite build`.
 *
 * Warum: Die Site ist eine SPA; Crawler ohne JS-Ausführung (vor allem
 * AI-Crawler wie GPTBot, ClaudeBot, PerplexityBot) sähen nur ein leeres
 * <div id="root">. Dieses Skript rendert alle Routen serverseitig zu
 * statischem HTML, damit Such- und Antwortmaschinen den vollen Inhalt
 * (Texte, Preise, FAQ, JSON-LD) direkt im ausgelieferten HTML finden.
 *
 * Ablauf:
 *  1. SSR-Bundle aus `src/entry-server.tsx` nach `dist-server/` bauen
 *  2. `dist/index.html` als Template laden (enthält noch `__SEO_*__`-Tokens
 *     und die Marker `<!--app-head-->` / `<!--app-html-->`)
 *  3. Pro Route: HTML rendern, Meta-Tokens ersetzen, JSON-LD injizieren,
 *     nach `dist/<route>/index.html` schreiben
 *  4. `dist/sitemap.xml` erzeugen, `dist-server/` aufräumen
 *
 * Alle SEO-Werte kommen aus `src/seo.ts` (über das SSR-Bundle) — hier wird
 * nichts inhaltlich dupliziert.
 */
import { build } from 'vite';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { applySeoTokens } from './seo-tokens.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');

// 1. SSR-Bundle bauen (nutzt vite.config.ts: Alias, React-Plugin;
//    das Dev-Plugin `seo-tokens-dev` greift hier nicht, apply: 'serve').
await build({
  root,
  configFile: resolve(root, 'vite.config.ts'),
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-server',
    emptyOutDir: true
  }
});

const server = await import(
  pathToFileURL(resolve(root, 'dist-server/entry-server.js')).href
);

// 2. Template laden — `vite build` hat Assets bereits referenziert.
const template = await readFile(resolve(distDir, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->')) {
  throw new Error(
    'prerender: Marker <!--app-html--> fehlt in dist/index.html — index.html nicht manuell überschreiben.'
  );
}

// 3. Routen rendern und schreiben.
for (const path of server.ROUTE_PATHS) {
  const appHtml = server.renderRoute(path);
  const seo = server.getRouteSeo(path);
  const jsonLd = server.getJsonLdScript(path) ?? '';

  let html = template.replace('<!--app-html-->', appHtml);
  html = html.replace('<!--app-head-->', jsonLd);
  html = applySeoTokens(html, seo);

  const outFile =
    path === '/'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`prerender: ${path} → ${outFile.slice(root.length + 1)}`);
}

// 4. Sitemap erzeugen + SSR-Build aufräumen.
await writeFile(resolve(distDir, 'sitemap.xml'), server.buildSitemapXml());
console.log('prerender: sitemap.xml geschrieben');
await rm(resolve(root, 'dist-server'), { recursive: true, force: true });
console.log('prerender: fertig.');

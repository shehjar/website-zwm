/**
 * Prerendering (SSG) for zumwohlmobil.de — runs as the second step of
 * `npm run build`, after `vite build`.
 *
 * Why: the site is an SPA; crawlers without JS execution (especially AI
 * crawlers like GPTBot, ClaudeBot, PerplexityBot) would only see an empty
 * <div id="root">. This script renders all routes server-side to static
 * HTML so search and answer engines find the full content (copy, prices,
 * FAQ, JSON-LD) directly in the served HTML.
 *
 * Steps:
 *  1. Build the SSR bundle from `src/entry-server.tsx` into `dist-server/`
 *  2. Load `dist/index.html` as the template (still contains the
 *     `__SEO_*__` tokens and the `<!--app-head-->` / `<!--app-html-->` markers)
 *  3. Per route: render HTML, replace meta tokens, inject JSON-LD,
 *     write to `dist/index.html` or `dist/<route>.html`
 *  4. Generate `dist/sitemap.xml`, clean up `dist-server/`
 *
 * All SEO values come from `src/seo.ts` (via the SSR bundle) — nothing is
 * duplicated here.
 */
import { build } from 'vite';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { applySeoTokens } from './seo-tokens.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');

// 1. Build the SSR bundle (uses vite.config.ts: alias, React plugin;
//    the dev plugin `seo-tokens-dev` does not apply here, apply: 'serve').
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

// 2. Load the template — `vite build` has already hashed asset references.
const template = await readFile(resolve(distDir, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->')) {
  throw new Error(
    'prerender: marker <!--app-html--> missing in dist/index.html — do not overwrite index.html manually.'
  );
}

// 3. Render and write each route.
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
      : // Flat file instead of a directory: Netlify then serves /impressum
        // directly from impressum.html (Pretty URL, 200 without a 301
        // redirect to /impressum/) — canonical and served URL stay identical.
        resolve(distDir, `${path.replace(/^\//, '')}.html`);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`prerender: ${path} → ${outFile.slice(root.length + 1)}`);
}

// 4. Generate the sitemap + clean up the SSR build.
await writeFile(resolve(distDir, 'sitemap.xml'), server.buildSitemapXml());
console.log('prerender: wrote sitemap.xml');
await rm(resolve(root, 'dist-server'), { recursive: true, force: true });
console.log('prerender: done.');

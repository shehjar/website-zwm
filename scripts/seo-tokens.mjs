/**
 * Ersetzt die `__SEO_*__`-Platzhalter in `index.html` durch konkrete Werte.
 *
 * Geteilte Logik für zwei Konsumenten (reines Node-ESM, kein TS):
 *  - Dev: Vite-Plugin `seo-tokens-dev` in `vite.config.ts` (Home-Route)
 *  - Build: `scripts/prerender.mjs` (pro Route)
 *
 * Die Platzhalter-Bauteile stehen in `index.html`; die Werte kommen aus
 * `src/seo.ts` — dort (und NUR dort) werden SEO-Texte gepflegt.
 */

export const SEO_TOKENS = {
  title: '__SEO_TITLE__',
  description: '__SEO_DESCRIPTION__',
  canonical: '__SEO_CANONICAL__',
  ogImage: '__SEO_OG_IMAGE__'
};

/** Escaped Sonderzeichen für die Einbettung in HTML-Attribute/Title. */
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * @param {string} html  Roh-HTML mit `__SEO_*__`-Platzhaltern
 * @param {{title: string, description: string, canonical: string, ogImage: string}} seo
 * @returns {string} HTML mit ersetzten Platzhaltern
 */
export function applySeoTokens(html, seo) {
  return html
    .replaceAll(SEO_TOKENS.title, escapeHtml(seo.title))
    .replaceAll(SEO_TOKENS.description, escapeHtml(seo.description))
    .replaceAll(SEO_TOKENS.canonical, escapeHtml(seo.canonical))
    .replaceAll(SEO_TOKENS.ogImage, escapeHtml(seo.ogImage));
}

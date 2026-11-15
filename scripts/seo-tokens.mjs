/**
 * Replaces the `__SEO_*__` placeholders in `index.html` with concrete values.
 *
 * Shared logic for two consumers (plain Node ESM, no TS):
 *  - dev: the `seo-tokens-dev` Vite plugin in `vite.config.ts` (home route)
 *  - build: `scripts/prerender.mjs` (per route)
 *
 * The placeholders live in `index.html`; the values come from `src/seo.ts` —
 * SEO strings are maintained there (and ONLY there).
 */

export const SEO_TOKENS = {
  title: '__SEO_TITLE__',
  description: '__SEO_DESCRIPTION__',
  canonical: '__SEO_CANONICAL__',
  ogImage: '__SEO_OG_IMAGE__'
};

/** Escapes special characters for embedding in HTML attributes/title. */
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * @param {string} html  raw HTML containing `__SEO_*__` placeholders
 * @param {{title: string, description: string, canonical: string, ogImage: string}} seo
 * @returns {string} HTML with placeholders replaced
 */
export function applySeoTokens(html, seo) {
  return html
    .replaceAll(SEO_TOKENS.title, escapeHtml(seo.title))
    .replaceAll(SEO_TOKENS.description, escapeHtml(seo.description))
    .replaceAll(SEO_TOKENS.canonical, escapeHtml(seo.canonical))
    .replaceAll(SEO_TOKENS.ogImage, escapeHtml(seo.ogImage));
}

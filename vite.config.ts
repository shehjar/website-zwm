import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { applySeoTokens } from './scripts/seo-tokens.mjs';
import { ROUTE_SEO, SEO } from './src/seo';

/**
 * Ersetzt die %SEO_*%-Platzhalter in index.html NUR im Dev-Server durch
 * die Home-Meta aus src/seo.ts. Beim Build bleiben die Tokens erhalten —
 * dort ersetzt scripts/prerender.mjs sie pro Route mit den korrekten
 * route-spezifischen Werten.
 */
function seoTokensDevPlugin(): Plugin {
  const home = ROUTE_SEO.find((r) => r.path === '/') ?? ROUTE_SEO[0];
  return {
    name: 'seo-tokens-dev',
    apply: 'serve',
    transformIndexHtml(html) {
      return applySeoTokens(html, {
        title: home.title,
        description: home.description,
        canonical: `${SEO.domain}/`,
        ogImage: `${SEO.domain}${SEO.ogImage}`
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoTokensDevPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

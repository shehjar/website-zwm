import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { applySeoTokens } from './scripts/seo-tokens.mjs';
import { ROUTE_SEO, SEO } from './src/seo';

/**
 * Replaces the __SEO_*__ placeholders in index.html — ONLY in the dev
 * server — with the home-route meta from src/seo.ts. During the build the
 * tokens are kept; scripts/prerender.mjs replaces them per route with the
 * correct route-specific values.
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

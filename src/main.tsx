import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes.tsx';
import './index.css';

/**
 * The route table lives in `src/routes.tsx` (one source for client and
 * prerendering). In production the build ships prerendered HTML
 * (scripts/prerender.mjs) — it is hydrated instead of re-rendered so the
 * crawler-visible content and the first visible second stay identical.
 * If the root div is empty (e.g. dev server), mount the classic way.
 */
const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

if (container.childElementCount > 0) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

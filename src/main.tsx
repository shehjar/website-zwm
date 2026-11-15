import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes.tsx';
import './index.css';

/**
 * Die Route-Tabelle lebt in `src/routes.tsx` (eine Quelle für Client und
 * Prerendering). In Produktion liefert der Build prerendered HTML aus
 * (scripts/prerender.mjs) — dann wird hydratisiert statt neu gerendert,
 * damit Crawler-Inhalt und erste sichtbare Sekunde identisch bleiben.
 * Fällt das root-Div leer aus (z. B. Dev-Server), wird klassisch gemountet.
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

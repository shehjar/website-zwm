import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import { AgbPage } from './pages/AgbPage';

/**
 * Route table for the whole app — one source for the client (`main.tsx`)
 * and the server/prerendering (`entry-server.tsx`) so the two never drift.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/datenschutz" element={<DatenschutzPage />} />
      <Route path="/agb" element={<AgbPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

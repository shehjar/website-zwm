import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import { AgbPage } from './pages/AgbPage';

/**
 * Route-Tabelle der gesamten App — eine Quelle für Client (`main.tsx`)
 * und Server/Prerendering (`entry-server.tsx`), damit beide nie driften.
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

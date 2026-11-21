import { Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import App from './App';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import { AgbPage } from './pages/AgbPage';

/**
 * Route table for the whole app — one source for the client (`main.tsx`)
 * and the server/prerendering (`entry-server.tsx`) so the two never drift.
 *
 * LazyMotion + domAnimation load only the animation features the `m`
 * components use (opacity/transform) instead of the full framer-motion
 * feature set. MotionConfig reducedMotion="user" respects the OS-level
 * prefers-reduced-motion setting for all framer animations.
 */
export function AppRoutes() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/agb" element={<AgbPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MotionConfig>
    </LazyMotion>
  );
}

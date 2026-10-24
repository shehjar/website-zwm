import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view while scrolling.
 * Returns the id of the last section whose top edge has passed the
 * header line; snaps to the last section at the bottom of the page.
 */
export function useActiveSection(ids: readonly string[], offset = 120): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const pos = window.scrollY + offset;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= pos) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids, offset]);

  return active;
}

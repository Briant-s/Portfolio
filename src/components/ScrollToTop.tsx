import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

/**
 * Scrolls to the top when the route PATH changes (e.g. / → /projects).
 *
 * Ignores hash changes: the scroll-spy updates the URL hash via replaceState
 * while scrolling, and reacting to those would yank the page. Uses Lenis for a
 * smooth jump (falls back to window.scrollTo before Lenis is ready).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  const lenis = useLenis();

  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, lenis]);

  return null;
}

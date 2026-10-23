import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top when the route PATH changes (e.g. / → /projects).
 *
 * It deliberately ignores hash changes: the scroll-spy updates the URL hash
 * via replaceState while you scroll, and reacting to those would yank the page
 * (the "random snapping" bug). We only act when the pathname actually changes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

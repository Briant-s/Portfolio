import { useEffect } from 'react';

/**
 * Watches all `section[id]` elements and keeps the URL hash in sync with
 * whichever section is currently most visible. Uses history.replaceState so
 * scrolling doesn't pollute the browser back-history, and updates the hash
 * without triggering a jump.
 */
export function useScrollSpy() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id]'),
    );
    if (sections.length === 0) return;

    // Track visibility ratios so we can pick the most-visible section.
    const ratios = new Map<string, number>();
    let currentId = '';

    const setHash = (id: string) => {
      if (id === currentId) return;
      currentId = id;
      const newHash = `#${id}`;
      if (window.location.hash !== newHash) {
        // Replace (not push) so back/forward isn't flooded while scrolling.
        history.replaceState(null, '', newHash);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Choose the section with the greatest visible ratio.
        let bestId = '';
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId && bestRatio > 0) setHash(bestId);
      },
      {
        // Sample multiple thresholds for smoother selection as sections scroll.
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
        // Offset the top a bit for the fixed header.
        rootMargin: '-60px 0px 0px 0px',
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

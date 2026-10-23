import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { useScrollSpy } from '../hooks/useScrollSpy';

/** The single-scroll landing page. */
export function HomePage() {
  useScrollSpy();

  // Scroll to the initial hash (e.g. arriving from /projects at "/#about")
  // ONCE on mount. We intentionally don't react to later hash changes: the
  // scroll-spy updates the hash via replaceState while you scroll, and
  // re-running scrollIntoView on those updates caused the page to fight the
  // user's scroll (random snapping up/down, especially on mobile).
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
    </>
  );
}

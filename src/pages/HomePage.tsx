import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { useScrollSpy } from '../hooks/useScrollSpy';

/** The single-scroll landing page. */
export function HomePage() {
  useScrollSpy();
  const lenis = useLenis();

  // Scroll to the initial hash (e.g. arriving from /projects at "/#about")
  // ONCE on mount. We intentionally don't react to later hash changes: the
  // scroll-spy updates the hash via replaceState while you scroll, and
  // re-running scroll on those updates caused the page to fight the user.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const el = document.querySelector<HTMLElement>(hash);
    if (el) {
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(el, { offset: -60 });
        else el.scrollIntoView({ behavior: 'smooth' });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
    </>
  );
}

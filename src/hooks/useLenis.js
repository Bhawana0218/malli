import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { setLenis } from '../lib/scroll';

/**
 * Luxury weighted smooth scrolling, kept in lockstep with ScrollTrigger.
 *
 * Lenis drives the real window scroll position and we forward every update to
 * ScrollTrigger, so pinned sections, parallax and the hero logo morph all read
 * from the same source of truth. When the visitor asks for reduced motion we
 * skip Lenis entirely and let native scrolling take over.
 */
export const useLenis = () => {
  useEffect(() => {
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Measure once the section heights are final.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.off('scroll', ScrollTrigger.update);
      setLenis(null);
      lenis.destroy();
    };
  }, []);
};

export default useLenis;

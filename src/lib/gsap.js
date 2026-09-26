import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single place where GSAP plugins are registered.
 *
 * Every section imports its animation library from here so the plugin is only
 * ever registered once, no matter how many components mount.
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Mobile browsers fire a `resize` event every time the URL bar slides in or out.
 * Recalculating pin positions on that makes the pinned Spaces stage jump around,
 * so we tell ScrollTrigger to ignore it and rely on its own debounced refresh.
 */
ScrollTrigger.config({ ignoreMobileResize: true });

export const refreshScrollTriggers = () => ScrollTrigger.refresh();

/** Honour the user's motion preference throughout the site. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof window !== 'undefined') {
  // Webfonts and the hero video finish loading after first paint and change the
  // document height, which invalidates every start/end value we measured.
  window.addEventListener('load', refreshScrollTriggers, { once: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(refreshScrollTriggers).catch(() => {});
  }
}

export { gsap, ScrollTrigger };
export default gsap;

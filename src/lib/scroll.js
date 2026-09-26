import { prefersReducedMotion } from './gsap';

/**
 * Programmatic scrolling, routed through Lenis.
 *
 * Calling the native `element.scrollIntoView({ behavior: 'smooth' })` while Lenis
 * owns the scroll position makes the two engines fight and the page lurches, so
 * every in-page jump on the site goes through here instead.
 */

let lenis = null;

/** Height of the fixed navbar, used to land headings below it. */
export const NAV_OFFSET = 88;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/**
 * @param {string | number | HTMLElement} target  `#id`, other CSS selector, an
 *   element, or an absolute pixel position.
 * @param {{ offset?: number, duration?: number, immediate?: boolean }} [options]
 */
export const scrollToTarget = (target, options = {}) => {
  const { offset = 0, duration, immediate = false } = options;

  if (lenis && !prefersReducedMotion()) {
    // No `force`: a Lenis instance that has been deliberately stopped (see the
    // mobile menu lock) must stay stopped, so callers wait for it to restart.
    lenis.scrollTo(target, { offset, duration: duration ?? 1.4, immediate });
    return;
  }

  // Reduced-motion / no-Lenis fallback: jump instantly instead of animating.
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'auto' });
    return;
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'auto' });
  }
};

/**
 * Scrolls a section into view, tucked underneath the fixed navbar.
 * Full-bleed pinned sections should pass `{ offset: 0 }`.
 */
export const scrollToSection = (id, options = {}) =>
  scrollToTarget(`#${id}`, { offset: -NAV_OFFSET, ...options });

export const scrollToTop = (options = {}) => scrollToTarget(0, options);

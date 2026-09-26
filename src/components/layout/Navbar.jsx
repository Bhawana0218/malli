import { useCallback, useEffect, useState } from 'react';
import { scrollToSection, scrollToTop, getLenis } from '../../lib/scroll';
import { NAV_LINKS as LINKS } from '../../data/spacesData';
import MalliLogo from '../common/MalliLogo';
import Botanical from '../common/Botanical';

/**
 * THE HEADER
 *
 * Transparent over the opening. The compact mark fades in exactly as the hero
 * mark travels up to meet it, so there is only ever one logo on screen.
 *
 * Nothing here is uppercase-everywhere or widely tracked: a restaurant header
 * is a quiet list of words with one action at the end of it.
 */
export const Navbar = ({ showNavLogo = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the drawer is open, freeze scrolling so the page cannot move behind it.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const go = useCallback((id, offset) => {
    setMenuOpen(false);
    // Closing the drawer restarts Lenis in an effect that runs before the next
    // frame, so hand the scroll over once that has happened.
    window.requestAnimationFrame(() => scrollToSection(id, { offset }));
  }, []);

  const showMark = showNavLogo || isScrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ${
          isScrolled
            ? 'border-b border-gold-200/15 bg-walnut-950/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-[rgba(14,9,5,0.55)] to-transparent'
        }`}
      >
        <div className="nav-shell mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 sm:px-8 md:px-14 md:py-6">
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex lg:gap-9">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id, link.offset)}
                className="link-underline cursor-pointer text-[0.8125rem] font-normal text-paper-100/90 transition-colors duration-300 hover:text-gold-100"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Compact mark — revealed as the hero mark travels up to this slot. */}
          <button
            type="button"
            onClick={() => scrollToTop()}
            aria-label="Back to the top"
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 md:left-5 md:translate-x-0 ${
              showMark
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0'
            }`}
          >
            <MalliLogo alt="Malli" className="h-9 w-auto md:h-10" />
          </button>

          <div className="ml-auto flex items-center gap-3 md:ml-0 md:gap-5">
            <button
              type="button"
              onClick={() => go('reserve')}
              className="hidden bg-gold-200 px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-walnut-950 shadow-[0_2px_16px_rgba(14,9,5,0.5)] transition-all duration-300 hover:bg-gold-50 hover:shadow-[0_2px_22px_rgba(14,9,5,0.6)] sm:block"
            >
              Reserve
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="-mr-1 cursor-pointer p-2 text-gold-200 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden="true" className="flex flex-col items-end gap-[5px]">
                <span
                  className={`h-px w-6 bg-current transition-transform duration-300 ${
                    menuOpen ? 'translate-y-[3px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-4 bg-current transition-opacity duration-300 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-px w-5 bg-current transition-transform duration-300 ${
                    menuOpen ? '-translate-y-[3px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-center surface-walnut-deep px-8 transition-opacity duration-500 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col items-center gap-2">
          <Botanical name="Jasmine" className="mb-6 h-12 w-12 text-gold-200/50" />
          {[...LINKS, { id: 'reserve', label: 'Reserve a table' }].map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id, link.offset)}
              className={`cursor-pointer px-6 py-3 font-serif text-2xl font-light transition-colors ${
                link.id === 'reserve'
                  ? 'mt-5 bg-gold-200 text-sm font-sans font-medium uppercase tracking-[0.14em] text-walnut-950'
                  : 'text-paper-50 hover:text-gold-200'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

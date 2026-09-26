import { useEffect, useRef } from 'react';
import gsap from '../../lib/gsap';
import { WINE, CELEBRATIONS } from '../../data/spacesData';
import { scrollToSection } from '../../lib/scroll';
import Botanical from '../common/Botanical';

/**
 * WINE, THEN CELEBRATIONS
 *
 * Two sections that share a file because they share a rhythm: a dark, saturated
 * room you step into (red wine, #580016) and a lighter, wider one you look
 * across (walnut, with the photograph carrying it).
 */
export const WineAndCelebrations = () => {
  const wineRef = useRef(null);
  const wineImageRef = useRef(null);
  const wineCopyRef = useRef(null);
  const celebrationRef = useRef(null);
  const celebrationImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const drift = [
        { trigger: wineRef.current, el: wineImageRef.current, from: -6, to: 6 },
        { trigger: celebrationRef.current, el: celebrationImageRef.current, from: 7, to: -7 },
      ];

      drift.forEach(({ trigger, el, from, to }) => {
        if (!trigger || !el) return;
        gsap.fromTo(
          el,
          { yPercent: from, scale: 1.1 },
          {
            yPercent: to,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          },
        );
      });

      if (wineCopyRef.current) {
        gsap.fromTo(
          wineCopyRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: wineCopyRef.current, start: 'top 85%', once: true },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="wine" className="relative w-full">
      {/* ── Wine: the deep wine section ── */}
      <div ref={wineRef} className="surface-wine relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 120% at 78% 42%, rgba(142,31,60,0.55) 0%, rgba(66,0,18,0.9) 55%, rgba(44,0,13,1) 100%)',
          }}
        />

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-5 py-28 sm:px-8 sm:py-36 md:px-14 md:py-48 lg:grid-cols-12 lg:gap-20">
          <div ref={wineCopyRef} className="lg:col-span-5">
            <Botanical name="Magnolia" className="mb-7 h-10 w-10 text-gold-200/60" />
            <span className="label text-gold-100">{WINE.eyebrow}</span>
            <h2 className="display mt-6 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] text-paper-50">
              {WINE.title.split('\n').map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-md text-[0.9375rem] leading-[1.8] text-paper-100/90">{WINE.body}</p>
            <button
              type="button"
              onClick={() => scrollToSection('reserve')}
              className="btn-quiet mt-9 text-gold-100 transition-all duration-300 hover:gap-3.5 hover:text-gold-50"
            >
              Ask about a tasting
            </button>
          </div>

          <figure className="group relative lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/9] overflow-hidden bg-wine-900">
              <img
                ref={wineImageRef}
                src={WINE.image}
                alt="A glass of red wine at the Malli cellar"
                loading="lazy"
                decoding="async"
                width={1600}
                height={451}
                className="photo-lift absolute inset-0 h-[120%] w-full object-cover will-change-transform transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: '50% 50%' }}
              />
              {/* Localized caption scrim: only the strip the caption sits on. */}
              <div aria-hidden="true" className="scrim-bottom absolute inset-x-0 bottom-0 h-24 opacity-80" />
              <figcaption className="shadow-type-soft absolute bottom-3 left-4 flex items-center gap-3 text-[0.75rem] text-paper-100/90">
                <span aria-hidden="true" className="h-px w-6 bg-gold-200/60" />
                Bailey — the wine room
              </figcaption>
            </div>
          </figure>
        </div>
      </div>

      {/* ── Celebrations: back to walnut, photograph-led ── */}
      <div ref={celebrationRef} className="surface-walnut relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-5 py-28 sm:px-8 sm:py-36 md:px-14 md:py-48 lg:grid-cols-12 lg:gap-20">
          <figure className="group relative lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-walnut-950">
              <img
                ref={celebrationImageRef}
                src={CELEBRATIONS.image}
                alt="A long table laid for a celebration at Malli"
                loading="lazy"
                decoding="async"
                width={1600}
                height={502}
                className="photo-lift absolute inset-0 h-[120%] w-full object-cover will-change-transform transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: '50% 50%' }}
              />
              <div aria-hidden="true" className="scrim-bottom absolute inset-x-0 bottom-0 h-24 opacity-80" />
              <figcaption className="shadow-type-soft absolute bottom-3 left-4 flex items-center gap-3 text-[0.75rem] text-paper-100/90">
                <span aria-hidden="true" className="h-px w-6 bg-gold-200/60" />
                Gardenia — set for thirty-six
              </figcaption>
            </div>
          </figure>

          <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
            <span className="label text-gold-200">{CELEBRATIONS.eyebrow}</span>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.04] text-paper-50">
              {CELEBRATIONS.title}
            </h2>
            <p className="mt-7 max-w-md text-[0.9375rem] leading-[1.8] text-paper-100/85">{CELEBRATIONS.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <button
                type="button"
                onClick={() => scrollToSection('reserve')}
                className="btn-primary transition-all duration-300 hover:brightness-110"
              >
                Plan an event
              </button>
              <a href="tel:+19195550148" className="link-underline text-[0.8125rem] text-paper-100/80 transition-colors duration-300 hover:text-gold-100">
                (919) 555-0148
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineAndCelebrations;

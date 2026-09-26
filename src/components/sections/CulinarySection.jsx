import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '../../lib/gsap';
import { CULINARY } from '../../data/spacesData';
import Botanical from '../common/Botanical';
import MalliLogo from '../common/MalliLogo';

/**
 * GASTRONOMY
 *
 * Typographic, on walnut, with the food treated as evidence rather than
 * decoration: three small photographs, set off the margin, that support the
 * argument instead of carrying it.
 */
export const CulinarySection = () => {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const transitionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      // Crossfade transition to Reservation: fade in overlay as section scrolls out
      if (transitionRef.current) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'bottom center',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      }

      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gastronomy"
      ref={sectionRef}
      className="surface-walnut relative w-full overflow-hidden text-paper-50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-200/12"
      />

      {/* Transition overlay at bottom: fades in as we scroll toward Reservation */}
      <div
        ref={transitionRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[60vh] z-0 pointer-events-none bg-gradient-to-t from-walnut-950 via-walnut-950 to-transparent hidden lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 md:px-14 md:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail: the claim. */}
          <div className="lg:col-span-5">
            <span className="label text-gold-200">{CULINARY.eyebrow}</span>
            <h2 className="display mt-6 text-[clamp(2.5rem,6vw,4.25rem)] text-paper-50">
              {CULINARY.title.split('\n').map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Right: the argument, then the three pillars. */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="lede max-w-xl text-paper-100/90">{CULINARY.body}</p>
            <p className="mt-8 max-w-xl border-l border-gold-200/30 pl-6 text-[0.875rem] leading-[1.8] text-paper-100/75">
              {CULINARY.note}
            </p>
          </div>
        </div>

        {/* Pillars: a set list, not a card grid. */}
        <div className="mt-28 border-t border-gold-200/12 md:mt-36">
          {CULINARY.pillars.map((pillar, i) => (
            <article
              key={pillar.id}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="group grid grid-cols-1 items-center gap-6 border-b border-gold-200/12 py-8 transition-colors duration-500 sm:grid-cols-12 sm:gap-8 md:py-10"
            >
              <span className="font-serif text-sm tabular-nums text-gold-200/85 sm:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05] text-paper-50 sm:col-span-3">
                {pillar.title}
              </h3>

              <p className="max-w-md text-[0.9375rem] leading-[1.75] text-paper-100/85 sm:col-span-5">
                {pillar.body}
              </p>

              <figure className="sm:col-span-3 sm:justify-self-end">
                <div className="aspect-[16/10] w-full overflow-hidden bg-walnut-950 sm:w-40">
                  <img
                    src={pillar.image}
                    alt={`${pillar.title} — a Malli plate`}
                    loading="lazy"
                    decoding="async"
                    width={720}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </figure>
            </article>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-5 md:mt-16">
          <MalliLogo alt="" className="h-6 w-auto opacity-70" />
          <Botanical name="Jasmine" className="h-6 w-6 text-gold-200/40" />
          <span aria-hidden="true" className="h-px flex-1 bg-gold-200/12" />
          <span className="text-[0.75rem] text-paper-100/45">South Indian · charcoal · whole spice</span>
        </div>
      </div>
    </section>
  );
};

export default CulinarySection;

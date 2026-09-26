import { useEffect, useRef } from 'react';
import gsap from '../../lib/gsap';
import Botanical from '../common/Botanical';

/**
 * INTERLUDE
 *
 * A full-bleed photograph between two dense sections. Its only job is to give
 * the eye somewhere to rest and to break the rhythm of the page: the walk
 * through the rooms ends, and the room itself takes over for a moment.
 */
export const CorridorInterlude = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[68svh] w-full overflow-hidden bg-walnut-950 sm:h-[78svh]"
      aria-label="A corridor at Malli"
    >
      <img
        ref={imageRef}
        src="/media/corridor.webp"
        alt="A dim corridor at Malli, lit by a single pendant and a round mirror"
        loading="lazy"
        decoding="async"
        width={1600}
        height={875}
        className="photo-lift absolute inset-0 h-[116%] w-full object-cover will-change-transform"
        style={{ objectPosition: '50% 50%' }}
      />

      {/* Edge blend into the neighbouring walnut sections; the centre of the
          frame is left clear for the room itself. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,12,8,0.72) 0%, transparent 22%, transparent 72%, rgba(20,12,8,0.78) 100%)',
        }}
      />

      {/* Centred copy sits in a soft radial pocket — no rectangle. */}
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <div className="scrim-center flex flex-col items-center gap-5 px-8 py-10 text-center sm:px-14">
          <Botanical name="Jasmine" className="h-14 w-14 text-gold-200/60" />
          <p className="display shadow-type max-w-2xl text-[clamp(1.75rem,4.5vw,3rem)] text-paper-50">
            Seven rooms, one kitchen, and a building that was designed to be
            walked through slowly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CorridorInterlude;

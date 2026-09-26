import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { scrollToSection } from '../../lib/scroll';
import MalliLogo from '../common/MalliLogo';
import MalliLogo3D from '../common/MalliLogo3D';
import HeroFilm from './HeroFilm';

/**
 * THE OPENING
 *
 * A full-height room, filmed. The mark arrives on its own, holds centre stage
 * while one line of type introduces it, and then — as the visitor scrolls —
 * contracts and travels up into the header, where the navigation grows around
 * it. One continuous movement, no cut.
 *
 * The hero is exactly one viewport tall. Nothing spills past the fold, which is
 * what used to leave a dead black band between the hero and the story.
 */
export const Hero = ({ onLogoMorph }) => {
  const heroRef = useRef(null);
  const filmRef = useRef(null);
  const markRef = useRef(null);
  const typeRef = useRef(null);
  const ctaRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const mark = markRef.current;
    if (!hero || !mark) return undefined;

    const calm = prefersReducedMotion();
    const onMobile = () => window.innerWidth < 768;
    // How far the mark has to travel to reach the header slot. Measured against
    // the viewport so it lands correctly on a phone and on a wide desktop.
    const lift = () => (onMobile() ? 128 : 208);

    const ctx = gsap.context(() => {
      if (!calm) {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(mark, { y: 26, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 1.5 })
          .fromTo(typeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.9')
          .fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
          .fromTo(cueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.5');
      }

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          onLogoMorph?.(p);

          // The room drifts and the camera pushes in very slightly.
          if (filmRef.current) {
            gsap.set(filmRef.current, { scale: 1 + p * 0.09, yPercent: p * 6 });
          }

          // The mark contracts for most of the scroll, then hands over.
          const scale = 1 - p * 0.78;
          const opacity = p < 0.72 ? 1 : Math.max(0, 1 - (p - 0.72) / 0.28);
          gsap.set(mark, { scale, y: -p * lift(), opacity });

          if (typeRef.current) gsap.set(typeRef.current, { opacity: Math.max(0, 1 - p * 3.2), y: -p * 26 });
          if (ctaRef.current) gsap.set(ctaRef.current, { opacity: Math.max(0, 1 - p * 4.5), y: -p * 18 });
          if (cueRef.current) gsap.set(cueRef.current, { opacity: Math.max(0, 1 - p * 6) });
        },
      });
    }, hero);

    return () => ctx.revert();
  }, [onLogoMorph]);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex h-[100svh] min-h-[560px] w-full flex-col overflow-hidden surface-walnut-deep"
      aria-label="Malli — Indian Reimagined"
    >
      <HeroFilm wrapperRef={filmRef} />

      {/* The foot of the opening: one way in, one action. */}
      <div className="relative z-10 mt-auto w-full px-5 pb-8 sm:px-8 sm:pb-12 md:px-14 md:pb-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            ref={cueRef}
            onClick={() => scrollToSection('story')}
            aria-label="Scroll to the story"
            className="group flex w-fit items-center gap-3 text-paper-100/55 transition-colors hover:text-gold-200 will-change-opacity"
          >
            <span aria-hidden="true" className="cue-drop block h-8 w-px bg-gold-200/60" />
            <span className="label">Enter</span>
          </button>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-x-7 gap-y-3 will-change-transform"
          >
            <button
              type="button"
              onClick={() => scrollToSection('spaces', { offset: 0 })}
              className="btn-quiet text-paper-100/80"
            >
              Walk the rooms
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('reserve')}
              className="btn-primary"
            >
              Reserve a table
            </button>
          </div>
        </div>
      </div>

      {/* The mark, with the one line of type that introduces it. Centred as a
          single block so nothing can drift into it as the viewport changes. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <div ref={markRef} className="flex w-fit will-change-transform">
            <MalliLogo3D
              alt="Malli"
              className="w-[min(62vw,20rem)] select-none sm:w-[min(46vw,24rem)] lg:w-[26rem]"
              externallyControlled
              interactive={true}
              idle={true}
            />
          </div>

          <p
            ref={typeRef}
            className="lede shadow-type mt-8 max-w-md text-center text-paper-100 will-change-transform sm:mt-10"
          >
            Malli means jasmine. Seven rooms, one kitchen, and an evening with
            no particular reason to end.
          </p>
        </div>
      </div>

      {/* Scroll cue lives in the foot grid above, so it can never sit on top of
          the type or the buttons. */}
    </section>
  );
};

export default Hero;

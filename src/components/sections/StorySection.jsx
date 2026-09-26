import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '../../lib/gsap';
import { STORY } from '../../data/spacesData';
import Botanical from '../common/Botanical';
import MalliLogo from '../common/MalliLogo';

/**
 * THE STORY
 *
 * The page changes material here. After the dark, moving opening, the story is
 * printed on warm walnut: an editorial spread with a lot of air in it and
 * two real photographs. Nothing is centred, nothing is boxed, and there is no
 * second CTA competing with the one in the hero.
 *
 * Crossfade transition from Hero: a full-width gradient overlay fades out
 * as the Story section enters, creating a seamless handoff.
 */
export const StorySection = () => {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const figureRefs = useRef([]);
  const transitionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      // Crossfade transition from Hero: fade in the story section as hero scrolls out
      if (transitionRef.current) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top center',
              scrub: 1,
            },
          },
        );
      }

      // Copy rises line by line, once, so it never re-hides while being read.
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current.children,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.09,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: copyRef.current, start: 'top 84%', once: true },
          },
        );
      }

      // Photographs drift against the page at different rates. The second
      // figure is smaller and starts lower, which is what gives a spread its
      // depth.
      const drift = [
        { el: figureRefs.current[0], from: -5, to: 5, speed: 1.1 },
        { el: figureRefs.current[1], from: 6, to: -6, speed: 1.4 },
      ];

      drift.forEach(({ el, from, to, speed }) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { yPercent: from },
          {
            yPercent: to,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: speed,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="surface-walnut-deep relative w-full overflow-hidden text-paper-100"
    >
      {/* Transition overlay: walnut gradient that covers the section
          during the Hero→Story handoff, creating a seamless crossfade */}
      <div
        ref={transitionRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-walnut-950 via-walnut-950 to-transparent"
      />

      {/* Directional gradient: dark on left (copy side), transparent on right (photo side) */}
      <div aria-hidden="true" className="absolute inset-0 scrim-left hidden lg:block" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 md:px-14 md:py-40">
        {/* Spread header: the mark, a rule, and the only label on the page. */}
        <header className="mb-16 flex items-center gap-5 border-b border-gold-200/15 pb-6 sm:mb-24">
          <MalliLogo alt="" className="h-7 w-auto" blend="normal" imgClassName="opacity-90" />
          <span className="label text-gold-200/80">{STORY.eyebrow}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-gold-200/15" />
          <span className="font-serif text-sm italic text-gold-200/70">மல்லி</span>
        </header>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy — deliberately short. */}
          <div ref={copyRef} className="lg:col-span-5">
            <h2 className="display text-[clamp(2.75rem,7vw,4.75rem)] text-paper-50">
              {STORY.title.split('\n').map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="mt-10 max-w-md space-y-6">
              {STORY.body.map((para) => (
                <p key={para.slice(0, 24)} className="text-[0.9375rem] leading-[1.75] text-paper-100/85">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Photography, set on a slight diagonal like a printed spread. */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 lg:col-span-7 lg:gap-10">
            {STORY.images.map((image, i) => (
              <figure
                key={image.src}
                className={`relative ${i === 0 ? 'sm:col-span-7' : 'sm:col-span-5 sm:mt-20'}`}
              >
                <div className="overflow-hidden bg-walnut-950">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      ref={(el) => {
                        figureRefs.current[i] = el;
                      }}
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      width={i === 0 ? 1400 : 1200}
                      height={i === 0 ? 766 : 1006}
                      className="photo-lift h-[112%] w-full -translate-y-[5%] object-cover will-change-transform"
                      style={{ objectPosition: i === 0 ? '50% 45%' : '50% 40%' }}
                    />
                  </div>
                </div>

                <Botanical
                  name={i === 0 ? 'Gardenia' : 'Magnolia'}
                  className="absolute -bottom-7 -right-4 h-14 w-14 text-gold-200/50"
                />

                <figcaption className="mt-4 flex items-center gap-3 text-paper-100/60">
                  <span aria-hidden="true" className="h-px w-6 bg-gold-200/20" />
                  <span className="text-[0.75rem]">{image.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
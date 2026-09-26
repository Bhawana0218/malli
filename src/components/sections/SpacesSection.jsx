import { useCallback, useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { SPACES } from '../../data/spacesData';
import Botanical from '../common/Botanical';

/**
 * Viewport heights of scrolling allotted to each room across the pinned run.
 * 78 gives every room an unhurried beat without making the section a chore.
 */
const SCROLL_PER_SPACE = 78;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * THE SPACES
 *
 * ── Architecture (read before editing) ────────────────────────────────────────
 * A single `<section>` is BOTH the ScrollTrigger and the scroll track, and the
 * full-height stage is its ONLY child. ScrollTrigger pins the stage and inserts
 * a pin-spacer to create the scroll distance, which is what welds the stage to
 * the top of the viewport for the whole sequence.
 *
 * The stage must never be moved outside this section. A pinned element that is
 * not contained by its trigger freezes at whatever viewport offset it happened
 * to occupy when pinning began — far below the fold — which makes the section
 * silently invisible and leaves a tall empty gap behind it.
 *
 * The pin spacer is the only thing that lengthens the page here, and it is
 * released the moment the trigger is reverted, so no dead scroll can survive a
 * re-mount.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const SpacesSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const frameRefs = useRef([]);
  const copyRefs = useRef([]);
  const currentRef = useRef(0);

  const total = SPACES.length;
  const space = SPACES[activeIdx];

  /**
   * Swaps rooms. The outgoing frame masks closed and drifts; the incoming one
   * is revealed through a widening aperture. Both run off one timeline so the
   * two rooms overlap the way a camera crosses a doorway.
   */
  const activate = useCallback(
    (nextIdx) => {
      const next = clamp(nextIdx, 0, total - 1);
      const prev = currentRef.current;
      if (next === prev) return;

      currentRef.current = next;
      setActiveIdx(next);

      const outFrame = frameRefs.current[prev];
      const inFrame = frameRefs.current[next];
      const outCopy = copyRefs.current[prev];
      const inCopy = copyRefs.current[next];

      if (prefersReducedMotion()) {
        if (outFrame) gsap.set(outFrame, { opacity: 0, clipPath: 'inset(0% 0% 0% 0%)' });
        if (inFrame) gsap.set(inFrame, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' });
        if (outCopy) gsap.set(outCopy, { autoAlpha: 0, y: 0 });
        if (inCopy) gsap.set(inCopy, { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();
      const layers = [outFrame, inFrame, outCopy, inCopy].filter(Boolean);
      gsap.killTweensOf(layers);

      if (outFrame) {
        tl.to(outFrame, { scale: 1.06, opacity: 0, duration: 0.85, ease: 'power2.inOut' }, 0);
      }
      if (outCopy) {
        tl.to(outCopy, { y: -28, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, 0);
      }

      if (inFrame) {
        tl.fromTo(
          inFrame,
          { scale: 1.1, opacity: 0, clipPath: 'inset(14% 12% 14% 12%)' },
          { scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'power3.inOut' },
          0.1,
        );
      }
      if (inCopy) {
        tl.fromTo(inCopy, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }, 0.38);
      }
    },
    [total],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const calm = prefersReducedMotion();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // Function-based so a viewport resize recomputes the run length.
        end: () => `+=${window.innerHeight * (total * SCROLL_PER_SPACE) / 100}`,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          activate(clamp(Math.floor(p * total), 0, total - 1));

          if (calm) return;

          // Slow counter-drift on whichever photograph is on screen, so the
          // room feels observed rather than pasted.
          const idx = clamp(Math.floor(p * total), 0, total - 1);
          const local = p * total - idx;
          const image = frameRefs.current[idx];
          if (image) gsap.set(image, { yPercent: (local - 0.5) * 5 });
        },
      });

      if (calm) return;

      const firstCopy = copyRefs.current[0];
      if (firstCopy) {
        gsap.fromTo(firstCopy, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
      }
    }, section);

    return () => ctx.revert();
  }, [activate, total]);

  const handleSelectorKeys = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    activate(clamp(activeIdx + (event.key === 'ArrowRight' ? 1 : -1), 0, total - 1));
  };

  return (
    <section
      id="spaces"
      ref={sectionRef}
      className="surface-walnut-deep relative w-full"
      aria-roledescription="carousel"
      aria-label="The seven spaces at Malli"
    >
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden surface-walnut-deep">
        <p className="sr-only" aria-live="polite">
          {`Room ${activeIdx + 1} of ${total}: ${space.name} — ${space.category}`}
        </p>

        {/* ── Photography, one masked layer per room ── */}
        {SPACES.map((room, i) => (
          <div
            key={room.id}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-transform"
            style={{
              opacity: i === 0 ? 1 : 0,
              transformOrigin: 'center center',
              clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(14% 12% 14% 12%)',
            }}
          >
            <img
              src={room.image}
              alt={`${room.name} — ${room.category} at Malli`}
              className="photo-lift h-full w-full object-cover"
              style={{ objectPosition: room.position }}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              width={1900}
              height={1100}
            />

            {/* Directional scrims, composed per layout — never a full blackout.
                Left: the copy zone. Bottom: the mobile sheet + captions.
                Top: the folio row over bright ceilings. The right two-thirds
                of the frame are left alone so the room stays visible. */}
            <div aria-hidden="true" className="scrim-left absolute inset-0 hidden md:block" />
            <div aria-hidden="true" className="scrim-bottom absolute inset-0 md:hidden" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-[46%] md:block"
              style={{ background: 'linear-gradient(to top, rgba(14,9,5,0.66) 0%, transparent 100%)' }}
            />
            <div aria-hidden="true" className="scrim-top absolute inset-x-0 top-0 h-40 md:h-48" />
          </div>
        ))}

        {/* ── Fixed frame: the section never moves, the rooms change behind it ── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-5 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 md:px-14 md:pb-10 md:pt-32">
          {/* Top: the room index, drawn as an editorial folio. */}
          <div className="nav-shell flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="shadow-type font-serif text-[2.5rem] font-light leading-none text-gold-100 md:text-[3.25rem]">
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="mt-2 h-px w-8 bg-gold-200/50 md:w-12" />
              <span className="label pt-1 text-paper-100/85">The rooms</span>
            </div>

            <div
              role="tablist"
              aria-label="Choose a room"
              onKeyDown={handleSelectorKeys}
              className="nav-shell pointer-events-auto hidden max-w-[52%] items-center gap-1 overflow-x-auto no-scrollbar md:flex"
            >
              {SPACES.map((room, i) => (
                <button
                  key={room.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIdx === i}
                  aria-label={room.name}
                  onClick={() => activate(i)}
                  className={`relative shrink-0 cursor-pointer px-3 py-2 text-[0.75rem] transition-all duration-300 ${
                    activeIdx === i ? 'font-medium text-gold-100' : 'text-paper-100/70 hover:text-paper-50'
                  } ${i === 2 || i === 5 ? 'shadow-[0_1px_8px_rgba(14,9,5,0.9)]' : ''}`}
                >
                  {room.name}
                  {activeIdx === i && (
                    <span aria-hidden="true" className="absolute inset-x-2 -bottom-px h-px bg-gold-100" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom: the room's own copy. All seven panels are stacked in the
              same bottom-left slot (absolute), so the active room always lands
              in the scrim zone instead of being pushed sideways by its
              siblings. Left-anchored on desktop inside the scrim zone; a
              protected bottom sheet on mobile above the switcher. */}
          <div className="relative flex min-h-[19rem] items-end justify-end gap-8 pb-14 sm:min-h-[21rem] md:min-h-[22rem] md:pb-0">
            {SPACES.map((room, i) => (
              <div
                key={room.id}
                ref={(el) => {
                  copyRefs.current[i] = el;
                }}
                role="tabpanel"
                aria-hidden={activeIdx !== i}
                className="shadow-type absolute bottom-14 left-0 w-full max-w-lg will-change-transform md:bottom-0"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  visibility: activeIdx === i ? 'visible' : 'hidden',
                  pointerEvents: activeIdx === i ? 'auto' : 'none',
                }}
              >
                <Botanical name={room.flower} className="mb-4 h-9 w-9 text-gold-200/70" />
                <h3 className="display text-[clamp(2.25rem,6vw,4rem)] text-paper-50">{room.name}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.75] text-paper-100">{room.description}</p>

                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                  {room.details.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-paper-100/70">{label}</dt>
                      <dd className="mt-1 text-[0.8125rem] font-medium text-gold-100">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            {/* Progress: a single rule that fills, not a row of dots. */}
            <div className="nav-shell relative z-10 hidden w-40 shrink-0 md:block">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-sm tabular-nums text-paper-100/85">
                  {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <span className="label text-paper-100/60">{space.category}</span>
              </div>
              <div className="mt-3 h-px w-full bg-paper-100/25">
                <div
                  className="h-px bg-gold-100 transition-[width] duration-500 ease-out"
                  style={{ width: `${Math.max(2, progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: a protected room switcher pinned to the bottom edge. */}
        <div
          role="tablist"
          aria-label="Choose a room"
          onKeyDown={handleSelectorKeys}
          className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 flex items-center justify-center gap-1 overflow-x-auto border-t border-gold-200/15 bg-walnut-950/90 px-4 py-3 backdrop-blur-md no-scrollbar md:hidden"
        >
          {SPACES.map((room, i) => (
            <button
              key={room.id}
              type="button"
              role="tab"
              aria-selected={activeIdx === i}
              aria-label={room.name}
              onClick={() => activate(i)}
              className={`shrink-0 cursor-pointer px-2.5 py-1.5 text-[0.6875rem] tracking-[0.1em] transition-colors duration-300 ${
                activeIdx === i ? 'font-medium text-gold-100' : 'text-paper-100/60'
              } ${i === 2 || i === 5 ? 'shadow-[0_1px_8px_rgba(14,9,5,0.9)]' : ''}`}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpacesSection;

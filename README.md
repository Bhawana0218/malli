# Malli — Indian Reimagined

Single-page site for Malli, a botanical fine dining sanctuary in Holly Springs, NC.
React 19 + Vite, Tailwind CSS v4, GSAP ScrollTrigger and Lenis smooth scrolling.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production bundle -> dist/
npm run preview   # serve the production bundle
npm run lint      # eslint
```

## Page order

| # | Section          | Anchor       | Notes                                                    |
|---|------------------|--------------|----------------------------------------------------------|
| 1 | Hero             | —            | Video background, logo shrinks toward the navbar on scroll |
| 2 | The Story        | `#story`     | Editorial copy + drifting photography                     |
| 3 | The Seven Spaces | `#spaces`    | **Pinned** full-viewport walkthrough                      |
| 4 | Indian Reimagined| `#culinary`  | Rooted · Crafted · Reimagined                             |
| 5 | Wine & Bar       | `#wine`      | Cellar programme and private dining                       |
| 6 | Reservation      | `#reservation` | Booking form and footer                                 |

## Structure

```
src/
  lib/gsap.js        registers ScrollTrigger once, owns global config + refresh
  lib/scroll.js      Lenis singleton and every in-page scroll helper
  hooks/useLenis.js  initialises Lenis and keeps it in step with ScrollTrigger
  data/spacesData.js all copy and imagery for the seven rooms + cuisine pillars
  components/
    canvas/          ambient particle overlay
    common/          MalliLogo, SectionEyebrow
    layout/          Navbar
    sections/        one file per section
```

## Things worth knowing before editing

**The pinned Spaces section.** `#spaces` is both the ScrollTrigger and the scroll
track, and the full-height stage is its only child. ScrollTrigger pins the stage
and inserts a pin-spacer to create the scroll distance.

> Do not move the stage out of the section. A pinned element that is not
> contained by its trigger is frozen at whatever viewport offset it occupied when
> pinning began — in practice far below the fold, which makes the whole section
> invisible and leaves a tall empty gap in its place.

**Scrolling.** Never call `scrollIntoView` directly. Lenis owns the scroll
position, and mixing the two makes the page lurch. Use `scrollToSection(id)` from
`lib/scroll.js`; pass `{ offset: 0 }` for full-bleed pinned sections so they land
flush with the top of the viewport.

**GSAP registration.** Import `gsap` and `ScrollTrigger` from `lib/gsap.js`, not
straight from the packages, so the plugin is only registered once.

**Cleanup.** Every animation is created inside a `gsap.context()` scoped to its
own section, and unmount calls `ctx.revert()`. Keep it that way — a global
`ScrollTrigger.getAll().forEach(kill)` will take other sections' triggers with it.

**Accessibility.** Lenis, the space crossfades, the particles and the CSS
transitions all respect `prefers-reduced-motion`.

## Assets

Photography and the hero video live in `public/malli-assets/`. Note that the three
`dish-*.jpg` files still have menu text burned into the image; replace them with
clean crops before launch.

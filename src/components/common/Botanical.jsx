/**
 * Botanical line art.
 *
 * Static, engraving-style motifs drawn as single-weight strokes in
 * `currentColor`. They are used to identify a section or frame an image —
 * never as floating decoration.
 *
 * Each drawing is a side view of the flower, built on a 0 0 100 100 grid so they
 * can be dropped at any size and still line up with each other.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.15,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
};

const Frame = ({ children, ...rest }) => (
  <svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <g {...stroke}>{children}</g>
  </svg>
);

/** Five narrow petals — the flower the restaurant is named for. */
const Jasmine = (p) => (
  <Frame {...p}>
    {/* stem and a single leaf, to set the drawing in space */}
    <path d="M50 34 C50 52 50 70 50 92" />
    <path d="M50 70 C43 64 38 63 33 66 C38 71 44 73 50 72" />
    <path d="M50 78 C57 73 62 72 67 75 C62 80 56 81 50 80" />
    {/* corolla */}
    <path d="M50 36 C44 30 42 22 46 15 C49 21 50 29 50 36 Z" />
    <path d="M52 36 C55 28 61 23 68 23 C63 29 57 33 52 36 Z" />
    <path d="M48 37 C41 35 35 38 31 44 C38 45 44 42 48 37 Z" />
    <path d="M52 37 C59 35 65 38 69 44 C62 45 56 42 52 37 Z" />
    {/* centre */}
    <circle cx="50" cy="36" r="2.2" />
  </Frame>
);

/** A closed cup with three outer petals. */
const Tulip = (p) => (
  <Frame {...p}>
    <path d="M50 40 C50 58 50 74 50 94" />
    <path d="M50 76 C42 70 36 70 31 74 C37 79 44 80 50 79" />
    <path d="M31 46 C31 34 38 24 50 20 C62 24 69 34 69 46 C69 56 61 64 50 64 C39 64 31 56 31 46 Z" />
    <path d="M50 20 C50 34 50 50 50 64" />
    <path d="M50 64 C44 68 40 74 40 82" opacity="0.5" />
  </Frame>
);

/** Concentric rings of pointed petals. */
const Dahlia = (p) => (
  <Frame {...p}>
    <circle cx="50" cy="50" r="7" />
    <path d="M50 43 C50 34 50 27 50 21" />
    <path d="M57 50 C66 50 73 50 79 50" />
    <path d="M50 57 C50 66 50 73 50 79" />
    <path d="M43 50 C34 50 27 50 21 50" />
    <path d="M55 45 C61 38 65 33 68 27" />
    <path d="M55 55 C61 62 65 67 68 73" />
    <path d="M45 55 C39 62 35 67 32 73" />
    <path d="M45 45 C39 38 35 33 32 27" />
    <path d="M50 30 C53 34 55 37 55 40" opacity="0.55" />
    <path d="M70 50 C66 53 63 55 60 55" opacity="0.55" />
    <path d="M50 70 C47 66 45 63 45 60" opacity="0.55" />
    <path d="M30 50 C34 47 37 45 40 45" opacity="0.55" />
  </Frame>
);

/** Broad, blunt petals opening upward. */
const Magnolia = (p) => (
  <Frame {...p}>
    <path d="M50 62 C50 74 50 84 50 95" />
    <path d="M50 80 C42 74 36 73 30 77 C36 82 44 83 50 82" />
    <path d="M50 46 C44 40 42 30 46 20 C50 27 51 37 50 46 Z" />
    <path d="M50 46 C56 40 58 30 54 20 C50 27 49 37 50 46 Z" />
    <path d="M47 52 C39 50 32 54 28 62 C36 64 43 59 47 52 Z" />
    <path d="M53 52 C61 50 68 54 72 62 C64 64 57 59 53 52 Z" />
    <path d="M48 64 C44 69 42 76 44 84 C47 78 48 71 48 64 Z" opacity="0.5" />
    <path d="M52 64 C56 69 58 76 56 84 C53 78 52 71 52 64 Z" opacity="0.5" />
  </Frame>
);

/** Layered, quartered petals. */
const Gardenia = (p) => (
  <Frame {...p}>
    <path d="M50 68 C50 78 50 87 50 96" />
    <path d="M50 84 C43 79 37 78 32 81 C37 86 44 87 50 86" />
    <path d="M50 66 C40 66 32 60 30 50 C38 50 46 56 50 66 Z" />
    <path d="M50 66 C60 66 68 60 70 50 C62 50 54 56 50 66 Z" />
    <path d="M50 50 C44 42 42 32 47 23 C50 31 51 41 50 50 Z" />
    <path d="M50 50 C56 42 58 32 53 23 C50 31 49 41 50 50 Z" />
    <path d="M50 58 C45 60 41 63 39 67" opacity="0.5" />
    <path d="M50 58 C55 60 59 63 61 67" opacity="0.5" />
  </Frame>
);

export const FLOWER_MOTIFS = {
  Jasmine,
  Tulip,
  Dahlia,
  Magnolia,
  Gardenia,
};

/**
 * Renders a named motif.
 * @param {{ name: keyof typeof FLOWER_MOTIFS, className?: string, size?: number }} props
 */
export const Botanical = ({ name = 'Jasmine', className = '', size }) => {
  const Motif = FLOWER_MOTIFS[name] || Jasmine;
  return (
    <Motif
      className={className}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};

export default Botanical;

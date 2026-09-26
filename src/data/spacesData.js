/**
 * Malli content and space data.
 *
 * Room names, capacities and descriptions are taken verbatim from the Malli
 * reference material — none of these are invented. Every image is a real
 * photograph: either a supplied client still or a frame cut from the Malli
 * walkthrough film (see public/media).
 */

/** The five rooms, presented in the order the walkthrough moves through them. */
export const SPACES = [
  {
    id: 'magnolia',
    number: '01',
    name: 'Magnolia',
    category: 'Private Dining',
    flower: 'Magnolia',
    image: '/media/celebrations.webp',
    /** Where the image sits in its frame; keeps the interesting part visible. */
    position: '50% 50%',
    description:
      'An intimate room carved with floral reliefs and lit by woven pendants. Built for long dinners that turn into late conversations.',
    details: [
      ['Setting', 'Private dining room'],
      ['Seats', 'Up to 16 guests'],
      ['Mood', 'Intimate'],
    ],
  },
  {
    id: 'tulip',
    number: '02',
    name: 'Tulip',
    category: 'Main Dining',
    flower: 'Tulip',
    image: '/media/space-tulip.webp',
    position: '50% 50%',
    description:
      'The heart of the room. Terracotta walls, a ceiling of white floral light, and a warm amber wash that settles over every table.',
    details: [
      ['Setting', 'Grand dining hall'],
      ['Seats', 'Main dining room'],
      ['Mood', 'Lively'],
    ],
  },
  {
    id: 'dahlia',
    number: '03',
    name: 'Dahlia',
    category: 'Elevated Dining',
    flower: 'Dahlia',
    image: '/media/space-dahlia.webp',
    position: '50% 55%',
    description:
      'Deep red walls and curved banquettes. The lighting stays low and the room keeps its distance from the noise of the main hall.',
    details: [
      ['Setting', 'Elevated dining lounge'],
      ['Seats', 'Curved banquettes'],
      ['Mood', 'Romantic'],
    ],
  },
  {
    id: 'jasmine-bar',
    number: '04',
    name: 'Jasmine Bar',
    category: 'Cocktails & Conversation',
    flower: 'Jasmine',
    image: '/media/wine-cellar.webp',
    position: '50% 50%',
    description:
      'An amber backbar of botanical spirits and house distillations, where the Old World and the New meet behind the counter.',
    details: [
      ['Setting', 'Cocktail bar & lounge'],
      ['Service', 'Botanical cocktails'],
      ['Mood', 'Magnetic'],
    ],
  },
  {
    id: 'gardenia',
    number: '05',
    name: 'Gardenia',
    category: 'Celebrations & Gatherings',
    flower: 'Gardenia',
    image: '/media/space-gardenia.webp',
    position: '50% 50%',
    description:
      'A celebration hall of long banquet tables, framed by greenery overhead and white arrangements set for the occasion.',
    details: [
      ['Setting', 'Celebration hall'],
      ['Seats', '24–36 guests'],
      ['Mood', 'Ceremonial'],
    ],
  },
];

export const CULINARY = {
  eyebrow: 'Gastronomy',
  title: 'Rooted in memory.\nReimagined for tonight.',
  body: 'Malli cooks from the southern Indian tradition its kitchen grew up in — the millets, the tamarind, the charcoal, the long tempering — and plates it for the way people eat now. Nothing is invented for effect. Everything is clarified.',
  note: 'The kitchen works from a single clay oven and a set of whole spices, ground and toasted to order.',
  pillars: [
    {
      id: 'rooted',
      title: 'Rooted',
      body: 'Recipes drawn from ancestral technique and regional tradition, cooked the way they have always been cooked.',
      image: '/media/dish-rooted.webp',
    },
    {
      id: 'crafted',
      title: 'Crafted',
      body: 'Sourcing and precision doing the quiet work — long stocks, clear broths, garnishes cut to the millimetre.',
      image: '/media/dish-crafted.webp',
    },
    {
      id: 'reimagined',
      title: 'Reimagined',
      body: 'The plate reassembled for a modern palate, without losing the spice that made it worth cooking.',
      image: '/media/dish-reimagined.webp',
    },
  ],
};

export const WINE = {
  eyebrow: 'Wine & Jasmine Bar',
  title: 'Old World.\nNew World.\nIndian flavours.',
  body: 'A cellar assembled around one question: what does a glass have to do to sit next to a plate of Indian food? The answer is usually less oak and more acid, and the list is built that way.',
  image: '/media/space-jasmine-bar.webp',
};

export const CELEBRATIONS = {
  eyebrow: 'Private dining',
  title: 'Some tables are meant for more.',
  body: 'Birthdays, corporate dinners, rehearsal dinners, wine evenings. Magnolia for sixteen, Gardenia for thirty-six, Bailey for whatever the cellar has opened that week.',
  image: '/media/space-magnolia.webp',
};

export const STORY = {
  eyebrow: 'Our story',
  title: 'Malli means\njasmine.',
  body: [
    'Jasmine is the flower you bring out for someone. It is what a house smells like when people arrive, and what is left in the room after they have gone. Malli is named for it.',
    'The restaurant is a house of seven rooms around that one idea — different flowers, different light, different reasons to stay past the last course.',
  ],
  images: [
    { src: '/media/story-corridor.webp', alt: 'A dim walnut corridor at Malli lit by a single pendant', caption: 'The corridor to the rooms' },
    { src: '/media/story-monogram-wall.webp', alt: 'The Malli monogram on a clay wall', caption: 'The mark, in clay and light' },
  ],
};

export const VISIT = {
  addressLines: ['131 Oakview Commons Dr, Suite 109', 'Holly Springs, NC 27540'],
  hours: [
    ['Tuesday – Thursday', '5:30 pm – 10:00 pm'],
    ['Friday – Saturday', '5:30 pm – 11:00 pm'],
    ['Sunday', '12:00 pm – 9:00 pm'],
    ['Monday', 'Closed'],
  ],
  phone: '(919) 555-0148',
  email: 'table@malli.restaurant',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
  ],
};

export const NAV_LINKS = [
  { id: 'story', label: 'Story' },
  // Full-bleed pinned section: must land flush with the top of the viewport.
  { id: 'spaces', label: 'Spaces', offset: 0 },
  { id: 'gastronomy', label: 'Gastronomy' },
  { id: 'wine', label: 'Wine & Bar' },
];

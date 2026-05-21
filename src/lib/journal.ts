export type JournalCard =
  | {
      kind: "image";
      src: string;
      alt: string;
      title: string;
      date: string;
      ratio?: string;
    }
  | {
      kind: "poster";
      title: string;
      date: string;
      headline: string;
      sub?: string;
      bg: string;
      fg: string;
      ratio?: string;
    };

const uns = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=75&auto=format&fit=crop`;

// Poster palette is restricted to black and white (with cream paper accent)
// to match the rest of the site's monochrome UI.
const POSTER_DARK = { bg: "#0e0e0e", fg: "#ffffff" };
const POSTER_LIGHT = { bg: "#f7f6ee", fg: "#0e0e0e" };

export const JOURNAL: JournalCard[] = [
  {
    kind: "image",
    src: uns("photo-1546069901-ba9599a7e63c"),
    alt: "Garden bowl on a marble table",
    title: "The Social Solitude Select: Where to Eat in Seminyak",
    date: "02/10/26",
    ratio: "4/3",
  },
  {
    kind: "poster",
    title: "The Social Solitude x AKROSS",
    date: "10/14/25",
    headline: "The Social Solitude x AKROSS",
    sub: "All night long. Two for one.",
    ...POSTER_DARK,
    ratio: "4/5",
  },
  {
    kind: "poster",
    title: "The Social Solitude x Tatsuya Recap",
    date: "07/31/25",
    headline: "Dine with TATSUYA SHINKAI",
    sub: "Saturday, 31 July",
    ...POSTER_LIGHT,
    ratio: "4/5",
  },
  {
    kind: "poster",
    title: "The Social Solitude x Valentine",
    date: "02/10/26",
    headline: "Valentine's Day",
    sub: "A six-course love letter.",
    ...POSTER_LIGHT,
    ratio: "4/5",
  },
  {
    kind: "image",
    src: uns("photo-1517248135467-4c7edcad34c4"),
    alt: "Open kitchen at The Social Solitude",
    title: "The Social Solitude x Televisi Star",
    date: "10/14/25",
    ratio: "4/3",
  },
  {
    kind: "image",
    src: uns("photo-1604908176997-125f25cc6f3d"),
    alt: "A new dish from the seasonal menu",
    title: "The Social Solitude New Menu",
    date: "07/24/25",
    ratio: "4/5",
  },
  {
    kind: "image",
    src: uns("photo-1532634922-8fe0b757fb13"),
    alt: "Late-night cheers at the bar",
    title: "The Social Solitude x Spoons Recap",
    date: "02/03/26",
    ratio: "4/3",
  },
  {
    kind: "poster",
    title: "The Social Solitude Buy 2 Get One Free",
    date: "10/14/25",
    headline: "Every Friday — Buy 2 Get 1 Free",
    sub: "All cocktails, all night.",
    ...POSTER_LIGHT,
    ratio: "4/5",
  },
  {
    kind: "image",
    src: uns("photo-1574936145840-28808d77a0b6"),
    alt: "The Social Solitude Casa Perth restaurant interior",
    title: "The Social Solitude x Casa Perth",
    date: "07/24/25",
    ratio: "4/3",
  },
  {
    kind: "poster",
    title: "Celebrate Christmas in Bali at The Social Solitude",
    date: "12/12/25",
    headline: "A Bali Christmas, at the table.",
    sub: "Open through the holidays.",
    ...POSTER_DARK,
    ratio: "4/5",
  },
];

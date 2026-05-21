export const SITE = {
  name: "The Social Solitude",
  tagline: "Modern Bistro, Locally Sourced Flavors",
  hours: { days: "Wednesday – Sunday", time: "6pm – 11pm" },
  address: {
    lines: [
      "Jl. Kunti I No.117",
      "Seminyak, Kec. Kuta,",
      "Kabupaten Badung,",
      "Bali 80261",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Jl.+Kunti+I+No.117+Seminyak+Bali",
  },
  contact: {
    phone: "+62 8214 5226 753",
    email: "reservation@thesocialsolitude.com",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Bookings", href: "#", external: true },
    { label: "Store", href: "#", external: true },
    { label: "Press", href: "/press" },
    { label: "Journal", href: "/journal" },
    { label: "Offers", href: "/offers" },
  ],
} as const;

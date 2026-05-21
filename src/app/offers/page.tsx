import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

const offers = [
  {
    title: "Set Menu",
    detail:
      "A four-course tasting drawn from this week's market and our kitchen's mood. Best enjoyed with a glass at the bar first.",
    price: "480 / pax",
  },
  {
    title: "Wine Wednesday",
    detail:
      "Half-price bottles from our by-the-glass list every Wednesday — drop in for a slow midweek dinner.",
    price: "Every Wednesday",
  },
  {
    title: "Late Bar",
    detail:
      "After ten, the menu shrinks and the music gets a little louder. Snacks, cocktails, and the last of the night.",
    price: "10pm onward",
  },
];

export default function OffersPage() {
  return (
    <PageShell>
      <Reveal as="h1" className="mb-12 text-[1.6rem] font-bold leading-[1.15] tracking-[-0.005em] md:mb-16 md:text-[2rem]">
        Offers
      </Reveal>
      <ul className="mb-24 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
        {offers.map((item, i) => (
          <Reveal key={item.title} as="li" delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-2 py-8 md:grid-cols-[1fr_2fr_auto] md:items-baseline md:gap-10">
              <p className="text-[0.95rem] font-bold text-ink">{item.title}</p>
              <p className="text-[0.95rem] leading-[1.55] text-ink">
                {item.detail}
              </p>
              <p className="text-[0.86rem] text-mute md:text-right">
                {item.price}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}

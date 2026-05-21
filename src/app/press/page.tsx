import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

const press = [
  {
    outlet: "The Honeycombers Bali",
    title: "Where to eat in Seminyak right now",
    date: "2025",
    href: "#",
  },
  {
    outlet: "NOW! Bali",
    title: "The Social Solitude brings Melbourne wine bar energy to Seminyak",
    date: "2024",
    href: "#",
  },
  {
    outlet: "Bali Coconuts",
    title: "A modern bistro worth lingering at",
    date: "2024",
    href: "#",
  },
  {
    outlet: "The Bali Bible",
    title: "Seminyak's neighbourhood dinner spot",
    date: "2023",
    href: "#",
  },
];

export default function PressPage() {
  return (
    <PageShell>
      <Reveal as="h1" className="mb-12 text-[1.6rem] font-bold leading-[1.15] tracking-[-0.005em] md:mb-16 md:text-[2rem]">
        Press
      </Reveal>
      <ul className="mb-24 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
        {press.map((item, i) => (
          <Reveal
            key={`${item.outlet}-${item.title}`}
            as="li"
            delay={i * 0.04}
          >
            <a
              href={item.href}
              className="grid grid-cols-1 gap-1 py-6 transition-opacity hover:opacity-70 md:grid-cols-[1fr_2fr_auto] md:items-baseline md:gap-10"
            >
              <p className="text-[0.95rem] font-bold text-ink">{item.outlet}</p>
              <p className="text-[0.95rem] leading-[1.5] text-ink">
                {item.title}
              </p>
              <p className="text-[0.86rem] text-mute md:text-right">
                {item.date}
              </p>
            </a>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}

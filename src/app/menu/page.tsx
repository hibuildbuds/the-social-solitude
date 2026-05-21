import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MenuList } from "@/components/MenuList";
import { Carousel, type CarouselItem } from "@/components/Carousel";
import { Reveal } from "@/components/Reveal";

const uns = (id: string, w = 1600, q = 75) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}&auto=format&fit=crop`;

// Dummy images for the bottom carousel — user said placeholder is fine.
const carouselItems: CarouselItem[] = [
  { src: uns("photo-1551218808-94e220e084d2"), alt: "Lattice crostata on wood" },
  { src: uns("photo-1604908176997-125f25cc6f3d"), alt: "Second tart, smaller plate" },
  { src: uns("photo-1543353071-873f17a7a088"), alt: "Sliced beef with side dish" },
  { src: uns("photo-1488477181946-6428a0291777"), alt: "Slice of pie with ice cream" },
];

export default function MenuPage() {
  return (
    // Single relative parent: sidebar logo stays sticky across hero + intro +
    // menu list + carousel + footer. Nav/info blocks fade out only as they
    // approach the [data-fade-trigger] carousel section (logic in Sidebar's
    // cascade hook), so they never collide with the four photos below.
    <div className="relative">
      <Sidebar tone="dark" />

      <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
        <Image
          src={uns("photo-1604908176997-125f25cc6f3d", 2400)}
          alt="A spiced shared dish at the centre of the table"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
      </section>

      <div className="bg-paper md:pl-[17rem]">
        <div className="mx-auto max-w-2xl px-6 pt-20 pb-12 text-center md:px-12 md:pt-28">
          <Reveal as="p" className="mb-5 text-[0.95rem] font-bold leading-[1.6] text-ink">
            At The Social Solitude, our menu is always evolving. Inspired by
            Bali&rsquo;s local produce and Melbourne&rsquo;s dining scene, we
            switch up dishes based on the season and our creative mood. We
            offer both &agrave; la carte and a set menu, designed for sharing
            and enjoying together.
          </Reveal>
          <Reveal as="p" delay={0.05} className="mb-5 text-[0.95rem] font-bold leading-[1.6] text-ink">
            Pair your meal with our curated wines, crafted cocktails, or a
            late-night drink at the bar.
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-[0.95rem] font-bold leading-[1.6] text-ink">
            Come hungry. Leave full.
          </Reveal>
        </div>

        <div className="mx-auto max-w-2xl px-6 pb-24 md:px-12 md:pb-32">
          <MenuList />
        </div>
      </div>

      {/* Carousel: 4 photos at 4:5 aspect ratio (1080x1350 each). Marked as
          fade trigger — sidebar nav/info fade just before reaching here. */}
      <section data-fade-trigger className="bg-paper pb-16 md:pb-24">
        <Carousel items={carouselItems} visibleDesktop={4} />
      </section>

      <div className="bg-paper px-6 md:px-12">
        <Footer />
      </div>
    </div>
  );
}

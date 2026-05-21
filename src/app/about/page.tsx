import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

const gallery = [
  { src: "/about/fed-about-01.jpg", alt: "The Social Solitude restaurant detail" },
  { src: "/about/fed-about-02.jpg", alt: "Kitchen at The Social Solitude" },
  { src: "/about/fed-about-03.jpg", alt: "Plated course at The Social Solitude" },
  { src: "/about/fed-about-04.jpg", alt: "The Social Solitude team at work" },
  { src: "/about/fed-about-05.jpg", alt: "Dining room at The Social Solitude" },
  { src: "/about/fed-about-06.jpg", alt: "Drinks at the bar" },
  { src: "/about/fed-about-07.jpg", alt: "A shared table at The Social Solitude" },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Single sidebar that flips tone based on data-tone of the section
          currently behind each block. */}
      <Sidebar mode="auto" />

      {/* SECTION 1 — Contact + Intro (light) — full viewport */}
      <section
        data-tone="light"
        className="bg-paper min-h-[100svh] md:pl-[17rem]"
      >
        <div className="px-6 pt-24 pb-20 md:px-12 md:pt-12 md:pb-28">
          <header className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-x-16">
            <Reveal
              as="div"
              className="text-[1.05rem] font-bold leading-[1.5] text-ink"
            >
              <p className="mb-6">Contact</p>
              <p>{SITE.contact.phone}</p>
              <p>info@thesocialsolitude.com</p>
              <p>{SITE.contact.email}</p>
              <p className="mt-6">{SITE.hours.days}</p>
              <p>Dinner: 6pm &ndash; 11pm</p>
              <p className="mt-6">Jl. Kunti I No.117,</p>
              <p>Seminyak, Bali</p>
            </Reveal>
            <Reveal
              as="div"
              delay={0.1}
              className="text-[1.05rem] font-bold leading-[1.5] text-ink"
            >
              <p className="mb-6">A Modern Take on Dinner in Seminyak</p>
              <p className="mb-5 text-justify">
                Located in the heart of Seminyak, The Social Solitude is a
                restaurant and bar run by a group of young Balinese locals who
                simply love good food, great drinks, and bringing people
                together. Inspired by Melbourne&rsquo;s food scene and the
                easygoing charm of European{" "}
                <strong className="font-bold">wine bars</strong>, we serve
                modern, flavor-packed dishes made with local ingredients. It
                is our way of bringing the technique of{" "}
                <strong className="font-bold">fine dining</strong> and a
                relaxed <strong className="font-bold">wine bar</strong> into a
                Bali setting.
              </p>
              <p className="mb-5 text-justify">
                The Social Solitude is a place to eat, drink, and unwind. Come
                by for a casual{" "}
                <strong className="font-bold">dinner in Seminyak</strong>, a
                few cocktails at the bar, or a drink before heading out for
                the night.
              </p>
              <p>Come hungry, leave full.</p>
            </Reveal>
          </header>
        </div>
      </section>

      {/* SECTION 2 — Full-viewport team photo (dark) */}
      <section
        data-tone="dark"
        className="relative h-[100svh] w-full overflow-hidden bg-ink"
      >
        <Image
          src="/about/fed-staff-about-page.jpg"
          alt="The Social Solitude team gathered in the restaurant"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </section>

      {/* SECTION 3 — Origin + gallery + closing + footer (light) */}
      <section
        data-tone="light"
        className="bg-paper md:pl-[17rem]"
      >
        <div className="px-6 pt-20 pb-2 md:px-12 md:pt-28">
          <div className="mx-auto mb-16 max-w-3xl text-[1.05rem] font-bold leading-[1.7] text-ink md:mb-24">
            <Reveal as="p" className="mb-6 text-justify">
              The Social Solitude began as a pop-up in Melbourne, born from a
              simple idea: to bring people together over great food and drinks
              in a relaxed, unpretentious setting. Created by a group of young
              Balinese locals with a passion for cooking and hospitality, the
              pop-up quickly gained a following, known for its bold flavors,
              casual vibe, and warm, welcoming energy.
            </Reveal>
            <Reveal as="p" delay={0.05} className="mb-6 text-justify">
              The year of 2020 made us to move back home to Bali. But instead
              of slowing down, we kept The Social Solitude alive by hosting
              popups during the pandemic. These small, intimate gatherings
              reminded us why we started in the first place&mdash;good food,
              good drinks, and good company.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-justify">
              When the time finally came to open a permanent space, Seminyak
              was the obvious choice. We grew up here, and we wanted to
              create something for both locals and visitors to
              enjoy&mdash;a place that blends the best of Melbourne&rsquo;s
              food scene with the laid-back spirit of Bali.
            </Reveal>
          </div>

          <div className="mb-20 md:mb-28">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {gallery.map((img, i) => (
                <Reveal
                  key={img.src}
                  as="div"
                  delay={(i % 3) * 0.06}
                  className="relative aspect-square overflow-hidden bg-cream"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal
            as="p"
            className="mx-auto max-w-2xl pb-12 text-center text-[1.05rem] font-bold leading-[1.6] text-ink"
          >
            Today, The Social Solitude is more than just a restaurant.
            It&rsquo;s a place to gather, unwind, and enjoy the
            moment&mdash;whether you&rsquo;re here for dinner in Seminyak, a
            few drinks at the bar, or a late-night bite before heading out.
          </Reveal>

          <Footer />
        </div>
      </section>
    </div>
  );
}

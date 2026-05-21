"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { JOURNAL } from "@/lib/journal";

export function JournalGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
      {JOURNAL.map((card, i) => (
        <motion.article
          key={`${card.title}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: (i % 3) * 0.06,
          }}
          className="group"
        >
          <Link href="#" aria-label={card.title} className="block">
            <div
              className="relative overflow-hidden bg-cream"
              style={{ aspectRatio: card.ratio ?? "4/3" }}
            >
              {card.kind === "image" ? (
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <PosterFace card={card} />
              )}
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <h3 className="text-[0.95rem] font-medium leading-tight tracking-tight text-ink">
                {card.title}
              </h3>
              <time className="shrink-0 pt-[0.1rem] text-[0.78rem] tabular-nums text-mute">
                {card.date}
              </time>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

function PosterFace({
  card,
}: {
  card: Extract<typeof JOURNAL[number], { kind: "poster" }>;
}) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between p-6 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] md:p-8"
      style={{ background: card.bg, color: card.fg }}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.22em] opacity-80">
        The Social Solitude Journal
      </p>
      <div>
        <p
          className="font-display text-[1.6rem] leading-[1.05] md:text-[2rem]"
          style={{ color: card.fg }}
        >
          {card.headline}
        </p>
        {card.sub && (
          <p className="mt-3 text-[0.85rem] leading-[1.4] opacity-90">
            {card.sub}
          </p>
        )}
      </div>
    </div>
  );
}

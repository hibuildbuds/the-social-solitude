"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type MosaicItem = {
  src: string;
  alt: string;
  /** CSS aspect ratio, e.g. "3/4", "16/9", "1/1". Defaults to "1/1". */
  ratio?: string;
  /** Optional column span on md+ (1 or 2). */
  span?: 1 | 2;
};

export function Mosaic({ items }: { items: MosaicItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      {items.map((item, i) => (
        <motion.figure
          key={item.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: (i % 3) * 0.08,
          }}
          className={`relative overflow-hidden bg-cream ${
            item.span === 2 ? "md:col-span-2" : ""
          }`}
          style={{ aspectRatio: item.ratio ?? "1/1" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
          />
        </motion.figure>
      ))}
    </div>
  );
}

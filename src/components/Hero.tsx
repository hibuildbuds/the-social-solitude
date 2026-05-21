"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  rightBlock?: React.ReactNode;
  topRightBlock?: React.ReactNode;
  objectPosition?: string;
  scrim?: number;
  priority?: boolean;
};

export function Hero({
  src,
  alt,
  rightBlock,
  topRightBlock,
  objectPosition = "center",
  scrim = 0.35,
  priority = true,
}: Props) {
  const { scrollY } = useScroll();
  // Subtle window-scroll parallax: image rises a few percent as the page scrolls.
  const y = useTransform(scrollY, [0, 800], ["0%", "-8%"]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition }}
          />
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${
            scrim * 0.6
          }) 0%, rgba(0,0,0,${scrim * 0.15}) 35%, rgba(0,0,0,${
            scrim * 0.15
          }) 55%, rgba(0,0,0,${scrim}) 100%)`,
        }}
      />

      {topRightBlock && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="absolute right-8 top-8 z-10 hidden text-right text-[0.78rem] leading-[1.45] text-cream/90 md:block"
        >
          {topRightBlock}
        </motion.div>
      )}

      {rightBlock && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="absolute bottom-8 right-8 z-10 hidden text-right text-[0.78rem] leading-[1.55] text-cream/90 md:block"
        >
          {rightBlock}
        </motion.div>
      )}
    </section>
  );
}

"use client";

import { motion, type MotionProps } from "framer-motion";

type Props = MotionProps & {
  as?: "div" | "section" | "p" | "h1" | "h2" | "li" | "ul";
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  ...rest
}: Props) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

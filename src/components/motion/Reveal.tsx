"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { easeStd, fadeUp, getVariants, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "ul" | "li" | "article";
  className?: string;
  delay?: number;
  variants?: Variants;
};

export function Reveal({ children, as = "div", className, delay = 0, variants = fadeUp }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={getVariants(Boolean(prefersReducedMotion), variants)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { ...easeStd, delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { easeStd, fadeUp, getVariants, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "ul" | "li" | "article";
  className?: string;
  delay?: number;
};

export function Reveal({ children, as = "div", className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={getVariants(Boolean(prefersReducedMotion), fadeUp)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { ...easeStd, delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

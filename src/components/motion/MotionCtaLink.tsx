"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { springHover } from "@/lib/motion";

type MotionCtaLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function MotionCtaLink({ href, className, children }: MotionCtaLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={className}
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      transition={springHover}
    >
      {children}
    </motion.a>
  );
}

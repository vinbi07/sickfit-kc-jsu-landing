"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { getVariants, staggerContainer, viewportOnce } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  as?: "div" | "ul";
  className?: string;
  /** Animate immediately on mount instead of when scrolled into view (for above-the-fold content). */
  mount?: boolean;
};

export function StaggerGroup({ children, as = "div", className, mount = false }: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={getVariants(Boolean(prefersReducedMotion), staggerContainer)}
      initial="hidden"
      {...(mount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
    >
      {children}
    </MotionTag>
  );
}

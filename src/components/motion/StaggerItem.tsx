"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import { fadeUp, getVariants } from "@/lib/motion";

type StaggerItemProps = {
  children: ReactNode;
  as?: "div" | "li" | "article" | "span" | "p";
  className?: string;
  variants?: Variants;
  style?: CSSProperties;
};

export function StaggerItem({
  children,
  as = "div",
  className,
  variants = fadeUp,
  style,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      style={style}
      variants={getVariants(Boolean(prefersReducedMotion), variants)}
    >
      {children}
    </MotionTag>
  );
}

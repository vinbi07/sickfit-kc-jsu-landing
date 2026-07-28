"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { springHover } from "@/lib/motion";

type MotionButtonProps = HTMLMotionProps<"button">;

export function MotionButton({ disabled, ...props }: MotionButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const canAnimate = !disabled && !prefersReducedMotion;

  return (
    <motion.button
      disabled={disabled}
      whileHover={canAnimate ? { scale: 1.03 } : undefined}
      whileTap={canAnimate ? { scale: 0.97 } : undefined}
      transition={springHover}
      {...props}
    />
  );
}

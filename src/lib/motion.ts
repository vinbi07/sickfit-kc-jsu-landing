import type { Transition, Variants } from "framer-motion";

export const easeStd: Transition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

export const springHover: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: easeStd },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: easeStd },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const REDUCED_MOTION_TRANSITION: Transition = { duration: 0.15, ease: "easeOut" };

function stripMotion(variant: Record<string, unknown>): Record<string, unknown> {
  const { x, y, scale, rotate, ...rest } = variant;
  void x;
  void y;
  void scale;
  void rotate;
  return { ...rest, transition: REDUCED_MOTION_TRANSITION };
}

/**
 * Collapses a variants object to opacity-only, near-instant transitions when
 * the user prefers reduced motion, so nothing is skipped entirely (avoids
 * abrupt pop-in) while removing all transform-based movement.
 */
export function getVariants(prefersReducedMotion: boolean, variants: Variants): Variants {
  if (!prefersReducedMotion) {
    return variants;
  }

  const reduced: Record<string, unknown> = {};
  for (const key of Object.keys(variants)) {
    const value = variants[key];
    reduced[key] = typeof value === "object" && value !== null ? stripMotion(value as Record<string, unknown>) : value;
  }
  return reduced as Variants;
}

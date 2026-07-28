"use client";

import { useRef, type ReactNode } from "react";

import { MotionButton } from "@/components/motion/MotionButton";

import styles from "./Carousel.module.css";

type CarouselProps = {
  className: string;
  children: ReactNode;
  ariaLabel: string;
  as?: "div" | "ul";
};

export function Carousel({ className, children, ariaLabel, as = "div" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | HTMLUListElement>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.84, behavior: "smooth" });
  };

  const Track = as;

  return (
    <div className={styles.wrap}>
      <Track
        ref={trackRef as never}
        className={`${className} ${styles.track}`}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        {children}
      </Track>
      <MotionButton
        type="button"
        className={`${styles.navBtn} ${styles.navPrev}`}
        aria-label="Previous"
        onClick={() => scrollByAmount(-1)}
      >
        ‹
      </MotionButton>
      <MotionButton
        type="button"
        className={`${styles.navBtn} ${styles.navNext}`}
        aria-label="Next"
        onClick={() => scrollByAmount(1)}
      >
        ›
      </MotionButton>
    </div>
  );
}

"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

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
  const slideCount = Children.count(children);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount < 2) return;

    const handleScroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
      const index = Math.round(progress * (slideCount - 1));
      setActiveIndex(index);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [slideCount]);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = slideCount > 1 ? (index / (slideCount - 1)) * maxScroll : 0;
    track.scrollTo({ left: target, behavior: "smooth" });
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
      {slideCount > 1 ? (
        <div className={styles.dots} role="tablist" aria-label={`${ariaLabel} pagination`}>
          {Array.from({ length: slideCount }, (_, index) => (
            <MotionButton
              key={index}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

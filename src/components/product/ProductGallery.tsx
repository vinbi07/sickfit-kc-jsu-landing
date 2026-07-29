"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { MotionButton } from "@/components/motion/MotionButton";
import { ProductMedia } from "@/components/media/ProductMedia";
import type { MediaConfig } from "@/types/product";
import type { StorefrontImage } from "@/types/shopify";

import styles from "./ProductGallery.module.css";

type ProductGalleryProps = {
  images: StorefrontImage[];
  fallback: MediaConfig;
  activeVariantImage?: StorefrontImage | null;
  aspectRatio?: string;
};

export function ProductGallery({
  images,
  fallback,
  activeVariantImage,
  aspectRatio = "4 / 5",
}: ProductGalleryProps) {
  const variantImageIndex = useMemo(() => {
    if (!activeVariantImage) return -1;
    return images.findIndex((image) => image.url === activeVariantImage.url);
  }, [images, activeVariantImage]);

  const [activeIndex, setActiveIndex] = useState(variantImageIndex >= 0 ? variantImageIndex : 0);
  const [lastVariantImageIndex, setLastVariantImageIndex] = useState(variantImageIndex);

  if (variantImageIndex !== lastVariantImageIndex) {
    setLastVariantImageIndex(variantImageIndex);
    if (variantImageIndex >= 0) {
      setActiveIndex(variantImageIndex);
    }
  }

  if (images.length === 0) {
    const media = activeVariantImage
      ? {
          src: activeVariantImage.url,
          alt: activeVariantImage.altText ?? fallback.alt,
          placeholderLabel: fallback.placeholderLabel,
        }
      : fallback;

    return <ProductMedia media={media} aspectRatio={aspectRatio} priority />;
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeIndex];

  const media: MediaConfig = {
    src: activeImage.url,
    alt: activeImage.altText ?? fallback.alt,
    placeholderLabel: fallback.placeholderLabel,
  };

  function goTo(index: number) {
    const next = (index + images.length) % images.length;
    setActiveIndex(next);
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <ProductMedia media={media} aspectRatio={aspectRatio} priority />

        {images.length > 1 ? (
          <>
            <MotionButton
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              aria-label="Previous image"
              onClick={() => goTo(safeIndex - 1)}
            >
              ‹
            </MotionButton>
            <MotionButton
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              aria-label="Next image"
              onClick={() => goTo(safeIndex + 1)}
            >
              ›
            </MotionButton>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className={styles.thumbs} role="tablist" aria-label="Product images">
          {images.map((image, index) => (
            <li key={image.url} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={index === safeIndex}
                aria-label={`View image ${index + 1}`}
                className={`${styles.thumb} ${index === safeIndex ? styles.thumbActive : ""}`}
                onClick={() => goTo(index)}
              >
                <Image src={image.url} alt="" fill sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

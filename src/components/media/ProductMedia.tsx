import type { CSSProperties } from "react";

import type { MediaConfig } from "@/types/product";

import { MediaPlaceholder } from "./MediaPlaceholder";
import styles from "./ProductMedia.module.css";

type ProductMediaProps = {
  media: MediaConfig;
  aspectRatio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProductMedia({
  media,
  aspectRatio = "4 / 5",
  className,
  sizes,
  priority,
}: ProductMediaProps) {
  const frameStyle = { aspectRatio } as CSSProperties;

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")} style={frameStyle}>
      <MediaPlaceholder media={media} sizes={sizes} priority={priority} />
    </div>
  );
}

import Image from "next/image";

import type { MediaConfig } from "@/types/product";

import styles from "./MediaPlaceholder.module.css";

type MediaPlaceholderProps = {
  media: MediaConfig;
  sizes?: string;
  priority?: boolean;
};

export function MediaPlaceholder({ media, sizes, priority }: MediaPlaceholderProps) {
  if (media.src) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes ?? "(max-width: 820px) 100vw, 50vw"}
        className={styles.image}
        priority={priority}
      />
    );
  }

  return (
    <div className={styles.placeholder} role="img" aria-label={media.alt}>
      <p className={styles.note} aria-hidden="true">
        {media.placeholderLabel}
      </p>
    </div>
  );
}

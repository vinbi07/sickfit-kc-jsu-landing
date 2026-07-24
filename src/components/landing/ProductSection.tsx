"use client";

import { useState } from "react";

import { ProductMedia } from "@/components/media/ProductMedia";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { landingPageConfig } from "@/config/landing-page";
import type { LandingProductConfig } from "@/types/product";
import type { StorefrontProduct, StorefrontVariant } from "@/types/shopify";

import styles from "./ProductSection.module.css";

type ProductSectionProps = {
  config: LandingProductConfig;
  product: StorefrontProduct | null;
};

export function ProductSection({ config, product }: ProductSectionProps) {
  const { product: productCopy } = landingPageConfig;
  const [activeVariant, setActiveVariant] = useState<StorefrontVariant | null>(null);

  const activeImage =
    activeVariant?.image ?? product?.featuredImage ?? undefined;

  const media = activeImage
    ? {
        src: activeImage.url,
        alt: activeImage.altText ?? config.image?.alt ?? config.title,
        placeholderLabel: productCopy.productImage.placeholderLabel,
      }
    : config.image ?? productCopy.productImage;

  return (
    <section className={styles.product} id="preorder">
      <div className={`wrap ${styles.grid}`}>
        <ProductMedia media={media} aspectRatio="4 / 5" />
        <div>
          <span className={`label ${styles.eyebrow}`}>{config.eyebrow}</span>
          <h2 className={`display ${styles.heading}`}>{config.title}</h2>
          <p className={styles.body}>
            {productCopy.intro.split(productCopy.introHighlight)[0]}
            <span className={styles.highlight}>{productCopy.introHighlight}</span>
            {productCopy.intro.split(productCopy.introHighlight)[1]}
          </p>
          <p className={[styles.body, styles.bodyStrong].join(" ")}>{productCopy.audience}</p>
          <p className={styles.body}>{productCopy.body}</p>

          {config.includedItems ? (
            <ul className={styles.packList}>
              {config.includedItems.map((item) => (
                <li key={item.title} className={styles.packItem}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {config.badges ? (
            <div className={styles.badges}>
              {config.badges.map((badge) => (
                <span key={badge} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </div>
          ) : null}

          <ProductPurchasePanel config={config} product={product} onVariantChange={setActiveVariant} />
        </div>
      </div>
    </section>
  );
}

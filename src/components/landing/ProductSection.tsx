"use client";

import { useMemo, useState } from "react";

import { ColorSwatchSelector } from "@/components/product/ColorSwatchSelector";
import { ProductGallery } from "@/components/product/ProductGallery";
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
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isCopyExpanded, setIsCopyExpanded] = useState(false);

  const fallbackMedia = config.image ?? productCopy.productImage;

  const colorImage = useMemo(() => {
    if (!activeColor || !product) return null;
    return (
      product.images.find((image) => image.url.toLowerCase().includes(activeColor.toLowerCase())) ??
      null
    );
  }, [activeColor, product]);

  const productCopyBlock = (
    <>
      <p className={styles.body}>
        {productCopy.intro.split(productCopy.introHighlight)[0]}
        <span className={styles.highlight}>{productCopy.introHighlight}</span>
        {productCopy.intro.split(productCopy.introHighlight)[1]}
      </p>
      <div
        className={[styles.extraCopy, isCopyExpanded ? styles.extraCopyExpanded : ""].join(" ")}
      >
        <p className={[styles.body, styles.bodyStrong].join(" ")}>{productCopy.audience}</p>
        <p className={styles.body}>{productCopy.body}</p>
      </div>
      <button
        type="button"
        className={styles.showMoreBtn}
        aria-expanded={isCopyExpanded}
        onClick={() => setIsCopyExpanded((current) => !current)}
      >
        {isCopyExpanded ? "Show less" : "Show more"}
      </button>
    </>
  );

  return (
    <section className={styles.product} id="preorder">
      <div className={`wrap ${styles.grid}`}>
        <ProductGallery
          images={product?.images ?? []}
          fallback={fallbackMedia}
          activeVariantImage={colorImage ?? activeVariant?.image}
          aspectRatio="4 / 5"
        />
        <div>
          <span className={`label ${styles.eyebrow}`}>{config.eyebrow}</span>
          <h2 className={`display ${styles.heading}`}>{config.title}</h2>
          <div className={styles.copyDesktop}>{productCopyBlock}</div>

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

          {config.colorOptions ? (
            <ColorSwatchSelector
              colors={config.colorOptions}
              activeColor={activeColor}
              onSelect={setActiveColor}
            />
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

          <div className={styles.copyMobile}>{productCopyBlock}</div>
        </div>
      </div>
    </section>
  );
}

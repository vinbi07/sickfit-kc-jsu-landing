"use client";

import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { StorefrontCartLine } from "@/types/shopify";

import { useCart } from "./CartProvider";
import styles from "./CartLineItem.module.css";

function formatMoney(amount: string, currencyCode: string) {
  const value = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(Number.isFinite(value) ? value : 0);
}

export function CartLineItem({ line }: { line: StorefrontCartLine }) {
  const { updateCartLineQuantity, removeCartLine, isCartUpdating } = useCart();
  const { merchandise } = line;
  const image = merchandise.image ?? merchandise.product.featuredImage;
  const variantTitle = merchandise.title !== "Default Title" ? merchandise.title : null;

  return (
    <div className={styles.line}>
      <div className={styles.mediaFrame}>
        <MediaPlaceholder
          media={{
            src: image?.url,
            alt: image?.altText ?? merchandise.product.title,
            placeholderLabel: "No image",
          }}
          sizes="76px"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{merchandise.product.title}</p>
        {variantTitle ? <p className={styles.variantTitle}>{variantTitle}</p> : null}
        <p className={styles.unitPrice}>
          {formatMoney(merchandise.price.amount, merchandise.price.currencyCode)} each
        </p>
        <div className={styles.controls}>
          <div className={styles.qtyGroup}>
            <button
              type="button"
              className={styles.qtyButton}
              aria-label={`Decrease quantity of ${merchandise.product.title}`}
              disabled={isCartUpdating || line.quantity <= 1}
              onClick={() => updateCartLineQuantity(line.id, line.quantity - 1)}
            >
              −
            </button>
            <span className={styles.qtyValue} aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              className={styles.qtyButton}
              aria-label={`Increase quantity of ${merchandise.product.title}`}
              disabled={isCartUpdating || line.quantity >= 20}
              onClick={() => updateCartLineQuantity(line.id, line.quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className={styles.removeButton}
            disabled={isCartUpdating}
            onClick={() => removeCartLine(line.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

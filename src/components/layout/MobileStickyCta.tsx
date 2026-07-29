"use client";

import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { MotionButton } from "@/components/motion/MotionButton";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./MobileStickyCta.module.css";

type MobileStickyCtaProps = {
  variantId?: string;
  isAvailable: boolean;
  isConfigured: boolean;
  priceLabel: string;
};

export function MobileStickyCta({
  variantId,
  isAvailable,
  isConfigured,
  priceLabel,
}: MobileStickyCtaProps) {
  const { header } = landingPageConfig;
  const { addVariantToCart, isCartUpdating } = useCart();
  const [error, setError] = useState<string | null>(null);

  const disabled = !isConfigured || !isAvailable || !variantId || isCartUpdating;

  let label = priceLabel ? `${header.ctaLabel} — ${priceLabel}` : header.ctaLabel;
  if (!isConfigured) {
    label = "Coming Soon";
  } else if (!isAvailable) {
    label = "Sold Out";
  } else if (isCartUpdating) {
    label = "Adding...";
  }

  async function handleClick() {
    if (!variantId) {
      return;
    }

    setError(null);
    try {
      await addVariantToCart(variantId, 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add this item to the cart.");
    }
  }

  return (
    <div className={styles.bar}>
      <MotionButton
        type="button"
        className={`btn btnBig ${styles.button}`}
        disabled={disabled}
        onClick={handleClick}
      >
        {label}
      </MotionButton>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

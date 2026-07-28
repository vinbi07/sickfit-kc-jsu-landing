"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import type { LandingProductConfig } from "@/types/product";
import type { StorefrontProduct, StorefrontVariant } from "@/types/shopify";

import { AddToCartButton } from "./AddToCartButton";
import { QuantitySelector } from "./QuantitySelector";
import styles from "./ProductPurchasePanel.module.css";
import { VariantSelector } from "./VariantSelector";

type ProductPurchasePanelProps = {
  config: LandingProductConfig;
  product: StorefrontProduct | null;
  onVariantChange?: (variant: StorefrontVariant | null) => void;
};

function formatMoney(amount: string, currencyCode: string) {
  const value = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(Number.isFinite(value) ? value : 0);
}

function pickDefaultVariant(variants: StorefrontVariant[]) {
  return variants.find((variant) => variant.availableForSale) ?? variants[0] ?? null;
}

export function ProductPurchasePanel({ config, product, onVariantChange }: ProductPurchasePanelProps) {
  const isConfigured = Boolean(product && product.variants.length > 0);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaultVariant = product ? pickDefaultVariant(product.variants) : null;
    return defaultVariant
      ? Object.fromEntries(defaultVariant.selectedOptions.map((o) => [o.name, o.value]))
      : {};
  });

  const selectedVariant = useMemo<StorefrontVariant | null>(() => {
    if (!product) {
      return null;
    }

    const matched = product.variants.find((variant) =>
      variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value),
    );

    return matched ?? pickDefaultVariant(product.variants);
  }, [product, selectedOptions]);

  const [quantity, setQuantity] = useState(1);

  function handleOptionSelect(optionName: string, value: string) {
    setSelectedOptions((current) => {
      const next = { ...current, [optionName]: value };
      const nextVariant =
        product?.variants.find((variant) =>
          variant.selectedOptions.every((option) => next[option.name] === option.value),
        ) ?? null;
      onVariantChange?.(nextVariant);
      return next;
    });
  }

  if (!isConfigured || !product) {
    return (
      <div>
        <p className={styles.notConfigured}>
          This product isn&apos;t connected to Shopify yet. Once the collab product is published,
          preorders will open here.
        </p>
        <AddToCartButton
          variantId={config.fallbackVariantId}
          quantity={quantity}
          isAvailable={false}
          isConfigured={false}
          priceLabel={config.displayedPrice ?? ""}
        />
      </div>
    );
  }

  const isAvailable = Boolean(selectedVariant?.availableForSale);
  const priceLabel = selectedVariant
    ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : config.displayedPrice ?? "";

  return (
    <div>
      <div className={styles.priceRow}>
        <span className={styles.price}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={priceLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "inline-block" }}
            >
              {priceLabel}
            </motion.span>
          </AnimatePresence>
        </span>
        {selectedVariant?.compareAtPrice ? (
          <span className={styles.compareAtPrice}>
            {formatMoney(
              selectedVariant.compareAtPrice.amount,
              selectedVariant.compareAtPrice.currencyCode,
            )}
          </span>
        ) : null}
      </div>

      <p
        className={[styles.availability, isAvailable ? "" : styles.availabilityUnavailable].join(" ")}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={isAvailable ? "in-stock" : "sold-out"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ display: "inline-block" }}
          >
            {isAvailable ? "In stock" : "Sold out"}
          </motion.span>
        </AnimatePresence>
      </p>

      <VariantSelector
        options={product.options}
        variants={product.variants}
        selectedOptions={selectedOptions}
        onSelect={handleOptionSelect}
      />

      <div className={styles.quantityRow}>
        <span className={`label ${styles.quantityLabel}`} id="quantity-label">
          Quantity
        </span>
        <QuantitySelector quantity={quantity} onChange={setQuantity} disabled={!isAvailable} />
      </div>

      <AddToCartButton
        variantId={selectedVariant?.id}
        quantity={quantity}
        isAvailable={isAvailable}
        isConfigured={isConfigured}
        priceLabel={priceLabel}
      />
    </div>
  );
}

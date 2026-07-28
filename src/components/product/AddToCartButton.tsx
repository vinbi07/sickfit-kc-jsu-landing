"use client";

import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { MotionButton } from "@/components/motion/MotionButton";

import styles from "./AddToCartButton.module.css";

type AddToCartButtonProps = {
  variantId: string | undefined;
  quantity: number;
  isAvailable: boolean;
  isConfigured: boolean;
  priceLabel: string;
};

export function AddToCartButton({
  variantId,
  quantity,
  isAvailable,
  isConfigured,
  priceLabel,
}: AddToCartButtonProps) {
  const { addVariantToCart, isCartUpdating } = useCart();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const disabled = !isConfigured || !isAvailable || !variantId || isCartUpdating;

  let label = `Preorder for ${priceLabel}`;
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

    setStatus("idle");
    try {
      await addVariantToCart(variantId, quantity);
      setStatus("success");
      setMessage("Added to your cart.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to add this item to the cart.");
    }
  }

  return (
    <div>
      <MotionButton type="button" className="btn btnBig" disabled={disabled} onClick={handleClick}>
        {label}
      </MotionButton>
      <p
        className={[
          styles.status,
          status === "error" ? styles.statusError : "",
          status === "success" ? styles.statusSuccess : "",
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}

"use client";

import { MotionButton } from "@/components/motion/MotionButton";

import { useCart } from "./CartProvider";
import styles from "./CartButton.module.css";

export function CartButton() {
  const { totalQuantity, openCart } = useCart();

  return (
    <MotionButton type="button" className={styles.button} onClick={openCart}>
      Cart ({totalQuantity})
    </MotionButton>
  );
}

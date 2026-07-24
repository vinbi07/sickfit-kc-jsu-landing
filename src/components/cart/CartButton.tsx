"use client";

import { useCart } from "./CartProvider";
import styles from "./CartButton.module.css";

export function CartButton() {
  const { totalQuantity, openCart } = useCart();

  return (
    <button type="button" className={styles.button} onClick={openCart}>
      Cart ({totalQuantity})
    </button>
  );
}

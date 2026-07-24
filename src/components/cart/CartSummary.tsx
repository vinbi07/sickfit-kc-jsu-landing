"use client";

import type { StorefrontCart } from "@/types/shopify";

import { useCart } from "./CartProvider";
import styles from "./CartDrawer.module.css";

function formatMoney(amount: string, currencyCode: string) {
  const value = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(Number.isFinite(value) ? value : 0);
}

export function CartSummary({ cart }: { cart: StorefrontCart }) {
  const { checkoutCart, isCartUpdating } = useCart();

  return (
    <div className={styles.footer}>
      <div className={styles.summaryRow}>
        <span>Total quantity</span>
        <span>{cart.totalQuantity}</span>
      </div>
      <div className={styles.subtotalRow}>
        <span>Subtotal</span>
        <span>{formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}</span>
      </div>
      <button
        type="button"
        className={`btn btnBig ${styles.checkoutButton}`}
        disabled={isCartUpdating}
        onClick={checkoutCart}
      >
        {isCartUpdating ? "Please wait…" : "Checkout"}
      </button>
    </div>
  );
}

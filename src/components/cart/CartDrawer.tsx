"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { MotionButton } from "@/components/motion/MotionButton";
import { easeStd, getVariants } from "@/lib/motion";

import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";
import { CartSummary } from "./CartSummary";
import styles from "./CartDrawer.module.css";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, cartError } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const focusableElements = drawer?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusableElements?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
        return;
      }

      if (event.key !== "Tab" || !drawer) {
        return;
      }

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusedElement.current?.focus();
    };
  }, [isCartOpen, closeCart]);

  const lines = cart?.lines.edges ?? [];

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.div
            className={styles.overlay}
            onClick={closeCart}
            aria-hidden="true"
            variants={getVariants(Boolean(prefersReducedMotion), overlayVariants)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={easeStd}
          />
          <motion.div
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            variants={getVariants(Boolean(prefersReducedMotion), drawerVariants)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={easeStd}
          >
            <div className={styles.header}>
              <h2 id="cart-drawer-title" className={styles.title}>
                Your Cart
              </h2>
              <MotionButton
                type="button"
                className={styles.closeButton}
                onClick={closeCart}
                aria-label="Close cart"
              >
                ✕
              </MotionButton>
            </div>
            <div className={styles.body}>
              {cartError ? (
                <p className={styles.errorBanner} role="alert">
                  {cartError}
                </p>
              ) : null}
              {lines.length === 0 ? (
                <p className={styles.empty}>Your cart is empty.</p>
              ) : (
                lines.map(({ node }) => <CartLineItem key={node.id} line={node} />)
              )}
            </div>
            {cart && lines.length > 0 ? <CartSummary cart={cart} /> : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

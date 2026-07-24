"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { StorefrontCart } from "@/types/shopify";

type CartContextValue = {
  cart: StorefrontCart | null;
  totalQuantity: number;
  isCartOpen: boolean;
  isCartHydrating: boolean;
  isCartUpdating: boolean;
  cartError: string | null;
  addVariantToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateCartLineQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeCartLine: (lineId: string) => Promise<void>;
  checkoutCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<StorefrontCart | null>(null);
  const [isCartHydrating, setIsCartHydrating] = useState(true);
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function hydrateCart() {
      try {
        const response = await fetch("/api/cart?includeCart=1", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          return;
        }

        const data = await parseJsonSafe<{ cart?: StorefrontCart | null }>(response);
        if (isMounted) {
          setCart(data?.cart ?? null);
        }
      } finally {
        if (isMounted) {
          setIsCartHydrating(false);
        }
      }
    }

    void hydrateCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const addVariantToCart = useCallback(async (variantId: string, quantity = 1) => {
    if (!variantId) {
      setCartError("This item isn't available to add to cart yet.");
      throw new Error("No Shopify variant is configured for this product yet.");
    }

    setIsCartUpdating(true);
    setCartError(null);
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
      });

      const data = await parseJsonSafe<{
        checkoutUrl?: string;
        cart?: StorefrontCart;
        error?: string;
      }>(response);

      if (!response.ok || !data?.checkoutUrl || !data.cart) {
        const message = data?.error ?? "Unable to add this item to the cart.";
        setCartError(message);
        throw new Error(message);
      }

      setCart(data.cart);
      setIsCartOpen(true);
    } finally {
      setIsCartUpdating(false);
    }
  }, []);

  const updateCartLineQuantity = useCallback(async (lineId: string, quantity: number) => {
    const safeQuantity = Math.max(1, quantity);

    setIsCartUpdating(true);
    setCartError(null);
    try {
      const response = await fetch("/api/cart/lines", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId, quantity: safeQuantity }),
      });

      const data = await parseJsonSafe<{ cart?: StorefrontCart | null; error?: string }>(response);

      if (!response.ok || !data?.cart) {
        const message = data?.error ?? "Unable to update your cart.";
        setCartError(message);
        throw new Error(message);
      }

      setCart(data.cart);
    } finally {
      setIsCartUpdating(false);
    }
  }, []);

  const removeCartLine = useCallback(async (lineId: string) => {
    setIsCartUpdating(true);
    setCartError(null);
    try {
      const response = await fetch("/api/cart/lines", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId }),
      });

      const data = await parseJsonSafe<{ cart?: StorefrontCart | null; error?: string }>(response);

      if (!response.ok || !data?.cart) {
        const message = data?.error ?? "Unable to remove that item.";
        setCartError(message);
        throw new Error(message);
      }

      setCart(data.cart.totalQuantity > 0 ? data.cart : null);
    } finally {
      setIsCartUpdating(false);
    }
  }, []);

  const checkoutCart = useCallback(() => {
    if (!cart?.checkoutUrl) {
      setCartError("Your cart is empty.");
      return;
    }

    window.location.assign(cart.checkoutUrl);
  }, [cart]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((current) => !current), []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      totalQuantity: cart?.totalQuantity ?? 0,
      isCartOpen,
      isCartHydrating,
      isCartUpdating,
      cartError,
      addVariantToCart,
      updateCartLineQuantity,
      removeCartLine,
      checkoutCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      cart,
      isCartOpen,
      isCartHydrating,
      isCartUpdating,
      cartError,
      addVariantToCart,
      updateCartLineQuantity,
      removeCartLine,
      checkoutCart,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

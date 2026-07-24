import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CART_COOKIE_NAME, cartCookieOptions } from "@/lib/cart-cookie";
import { isValidVariantId, normalizeQuantity } from "@/lib/cart-validation";
import { isShopifyConfigured } from "@/lib/env";
import { addToCart, createCart, getCart } from "@/lib/shopify-storefront";

export const runtime = "nodejs";

type CheckoutPayload = {
  variantId?: string;
  quantity?: number;
};

const GENERIC_ERROR = { error: "Unable to add this item to the cart." };

export async function POST(request: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify is not configured for this store yet." },
      { status: 503 },
    );
  }

  let body: CheckoutPayload;
  try {
    body = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidVariantId(body.variantId)) {
    return NextResponse.json({ error: "A valid product variant is required." }, { status: 400 });
  }

  const quantity = normalizeQuantity(body.quantity ?? 1);
  if (quantity === null) {
    return NextResponse.json({ error: "Quantity must be a whole number from 1 to 20." }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    let cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

    if (cartId) {
      const existingCart = await getCart(cartId).catch(() => null);
      if (!existingCart) {
        cartId = undefined;
      }
    }

    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id;
    }

    const updatedCart = await addToCart(cartId, body.variantId, quantity);

    const response = NextResponse.json({
      checkoutUrl: updatedCart.checkoutUrl,
      cartId: updatedCart.id,
      cart: updatedCart,
    });
    response.cookies.set({
      name: CART_COOKIE_NAME,
      value: updatedCart.id,
      ...cartCookieOptions(),
    });

    return response;
  } catch (error) {
    console.error("[cart/checkout] failed", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}

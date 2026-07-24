import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CART_COOKIE_NAME } from "@/lib/cart-cookie";
import { getCart } from "@/lib/shopify-storefront";
import { isShopifyConfigured } from "@/lib/env";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
  const requestUrl = new URL(request.url);

  if (!isShopifyConfigured()) {
    return NextResponse.json({ cart: null, cartId: null, configured: false });
  }

  if (requestUrl.searchParams.get("includeCart") === "1" && cartId) {
    const cart = await getCart(cartId).catch(() => null);
    return NextResponse.json({ cartId, cart, configured: true });
  }

  return NextResponse.json({ cartId: cartId ?? null, configured: true });
}

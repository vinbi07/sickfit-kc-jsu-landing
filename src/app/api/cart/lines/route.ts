import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CART_COOKIE_NAME } from "@/lib/cart-cookie";
import { normalizeQuantity } from "@/lib/cart-validation";
import { isShopifyConfigured } from "@/lib/env";
import { removeCartLine, updateCartLineQuantity } from "@/lib/shopify-storefront";

export const runtime = "nodejs";

type UpdateLinePayload = {
  lineId?: string;
  quantity?: number;
};

type RemoveLinePayload = {
  lineId?: string;
};

const GENERIC_ERROR = { error: "Unable to update your cart." };

export async function PATCH(request: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify is not configured for this store yet." },
      { status: 503 },
    );
  }

  let body: UpdateLinePayload;
  try {
    body = (await request.json()) as UpdateLinePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.lineId || typeof body.lineId !== "string") {
    return NextResponse.json({ error: "lineId is required" }, { status: 400 });
  }

  const quantity = normalizeQuantity(body.quantity ?? 1);
  if (quantity === null) {
    return NextResponse.json({ error: "Quantity must be a whole number from 1 to 20." }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

    if (!cartId) {
      return NextResponse.json({ error: "No cart found" }, { status: 400 });
    }

    const cart = await updateCartLineQuantity(cartId, body.lineId, quantity);
    return NextResponse.json({ cartId: cart.id, cart });
  } catch (error) {
    console.error("[cart/lines] PATCH failed", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify is not configured for this store yet." },
      { status: 503 },
    );
  }

  let body: RemoveLinePayload;
  try {
    body = (await request.json()) as RemoveLinePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.lineId || typeof body.lineId !== "string") {
    return NextResponse.json({ error: "lineId is required" }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

    if (!cartId) {
      return NextResponse.json({ error: "No cart found" }, { status: 400 });
    }

    const cart = await removeCartLine(cartId, body.lineId);
    return NextResponse.json({ cartId: cart.id, cart });
  } catch (error) {
    console.error("[cart/lines] DELETE failed", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}

const VARIANT_GID_PATTERN = /^gid:\/\/shopify\/ProductVariant\/\d+$/;
const MAX_QUANTITY = 20;

export function isValidVariantId(variantId: unknown): variantId is string {
  return typeof variantId === "string" && VARIANT_GID_PATTERN.test(variantId);
}

export function normalizeQuantity(quantity: unknown): number | null {
  if (typeof quantity !== "number" || !Number.isInteger(quantity)) {
    return null;
  }
  if (quantity < 1 || quantity > MAX_QUANTITY) {
    return null;
  }
  return quantity;
}

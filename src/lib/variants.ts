import type { StorefrontVariant } from "@/types/shopify";

export function pickDefaultVariant(variants: StorefrontVariant[]): StorefrontVariant | null {
  return variants.find((variant) => variant.availableForSale) ?? variants[0] ?? null;
}

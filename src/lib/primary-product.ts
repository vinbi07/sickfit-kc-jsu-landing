import "server-only";

import { getPrimaryLandingProduct } from "@/config/products";
import { isShopifyConfigured } from "@/lib/env";
import { getProductByHandle } from "@/lib/shopify-storefront";
import { pickDefaultVariant } from "@/lib/variants";
import type { LandingProductConfig } from "@/types/product";
import type { StorefrontProduct, StorefrontVariant } from "@/types/shopify";

export type PrimaryProductSnapshot = {
  productConfig: LandingProductConfig | undefined;
  shopifyProduct: StorefrontProduct | null;
  defaultVariant: StorefrontVariant | null;
  priceLabel: string;
};

export async function getPrimaryProductSnapshot(): Promise<PrimaryProductSnapshot> {
  const productConfig = getPrimaryLandingProduct();

  let shopifyProduct: StorefrontProduct | null = null;
  if (productConfig?.productHandle && isShopifyConfigured()) {
    try {
      shopifyProduct = await getProductByHandle(productConfig.productHandle);
    } catch (error) {
      console.error("[primary-product] failed to load product", error);
      shopifyProduct = null;
    }
  }

  const defaultVariant = shopifyProduct ? pickDefaultVariant(shopifyProduct.variants) : null;

  const priceLabel = defaultVariant
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: defaultVariant.price.currencyCode,
      }).format(Number(defaultVariant.price.amount))
    : productConfig?.displayedPrice ?? "";

  return { productConfig, shopifyProduct, defaultVariant, priceLabel };
}

import type { LandingProductConfig } from "@/types/product";

export const landingProducts: LandingProductConfig[] = [
  {
    id: "game-day-three-pack",
    enabled: true,
    // TODO: set to the real Shopify product handle once the collab product exists in the store.
    productHandle: process.env.DEFAULT_PRODUCT_HANDLE || "replace-with-shopify-product-handle",
    fallbackVariantId: "",
    title: "Three Pairs. One Season.",
    shortTitle: "Game Day 3-Pack",
    eyebrow: "The Game Day 3-Pack",
    description:
      "Performance compression built for game day and long days on your feet.",
    displayedPrice: "$34.99",
    image: {
      src: undefined,
      alt: "SickFit x KC-1400 Game Day 3-Pack",
      placeholderLabel: "Product shot placeholder — 3-pack hero image or flat lay",
    },
    colorOptions: [{ name: "Navy" }, { name: "Red" }, { name: "White" }],
    badges: ["Preorder price is final", "Discount codes do not apply"],
  },
];

export function getPrimaryLandingProduct(): LandingProductConfig | undefined {
  return landingProducts.find((product) => product.enabled);
}

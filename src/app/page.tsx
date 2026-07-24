import { AnnouncementTicker } from "@/components/landing/AnnouncementTicker";
import { AthleteSection } from "@/components/landing/AthleteSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PartnershipSection } from "@/components/landing/PartnershipSection";
import { PreorderStepsSection } from "@/components/landing/PreorderStepsSection";
import { ProductSection } from "@/components/landing/ProductSection";
import { getPrimaryLandingProduct } from "@/config/products";
import { isShopifyConfigured } from "@/lib/env";
import { getProductByHandle } from "@/lib/shopify-storefront";
import type { StorefrontProduct } from "@/types/shopify";

export default async function Home() {
  const productConfig = getPrimaryLandingProduct();

  let shopifyProduct: StorefrontProduct | null = null;
  if (productConfig?.productHandle && isShopifyConfigured()) {
    try {
      shopifyProduct = await getProductByHandle(productConfig.productHandle);
    } catch (error) {
      console.error("[page] failed to load product", error);
      shopifyProduct = null;
    }
  }

  const displayedPrice =
    shopifyProduct?.variants[0]?.price.amount != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: shopifyProduct.variants[0].price.currencyCode,
        }).format(Number(shopifyProduct.variants[0].price.amount))
      : productConfig?.displayedPrice ?? "";

  return (
    <main>
      <HeroSection displayedPrice={displayedPrice} />
      <AnnouncementTicker />
      <PartnershipSection />
      {productConfig ? <ProductSection config={productConfig} product={shopifyProduct} /> : null}
      <AthleteSection />
      <BenefitsSection />
      <PreorderStepsSection />
      <FinalCTASection />
    </main>
  );
}

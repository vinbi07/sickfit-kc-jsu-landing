import { AnnouncementTicker } from "@/components/landing/AnnouncementTicker";
import { AthleteSection } from "@/components/landing/AthleteSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PartnershipSection } from "@/components/landing/PartnershipSection";
import { PreorderStepsSection } from "@/components/landing/PreorderStepsSection";
import { ProductSection } from "@/components/landing/ProductSection";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { getPrimaryProductSnapshot } from "@/lib/primary-product";

export default async function Home() {
  const { productConfig, shopifyProduct, defaultVariant, priceLabel } =
    await getPrimaryProductSnapshot();

  return (
    <main>
      <HeroSection displayedPrice={priceLabel} />
      <AnnouncementTicker />
      <PartnershipSection />
      {productConfig ? <ProductSection config={productConfig} product={shopifyProduct} /> : null}
      <AthleteSection />
      <BenefitsSection />
      <PreorderStepsSection />
      <FinalCTASection />
      <MobileStickyCta
        variantId={defaultVariant?.id}
        isAvailable={Boolean(defaultVariant?.availableForSale)}
        isConfigured={Boolean(defaultVariant)}
        priceLabel={priceLabel}
      />
    </main>
  );
}

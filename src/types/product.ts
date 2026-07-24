export type MediaConfig = {
  src?: string;
  alt: string;
  placeholderLabel: string;
};

export type LandingProductConfig = {
  id: string;
  enabled: boolean;
  productHandle?: string;
  fallbackVariantId?: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  displayedPrice?: string;
  image?: MediaConfig;
  includedItems?: {
    title: string;
    detail: string;
  }[];
  badges?: string[];
};

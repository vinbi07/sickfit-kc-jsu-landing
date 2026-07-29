export interface Money {
  amount: string;
  currencyCode: string;
}

export interface StorefrontImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface StorefrontVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: StorefrontImage | null;
}

export interface StorefrontProduct {
  id: string;
  title: string;
  handle: string;
  featuredImage: StorefrontImage | null;
  images: StorefrontImage[];
  options: ProductOption[];
  variants: StorefrontVariant[];
}

export interface CartLineMerchandise {
  id: string;
  title: string;
  selectedOptions: SelectedOption[];
  price: Money;
  image: StorefrontImage | null;
  product: {
    title: string;
    handle: string;
    featuredImage: StorefrontImage | null;
  };
}

export interface StorefrontCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: CartLineMerchandise;
}

export interface StorefrontCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: {
    edges: Array<{ node: StorefrontCartLine }>;
  };
}

export type GraphQlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export type CartPayload = {
  cart: StorefrontCart | null;
  userErrors: Array<{ message: string }>;
};

import "server-only";

import { getServerEnv, isShopifyConfigured } from "@/lib/env";
import type {
  CartPayload,
  GraphQlResponse,
  StorefrontCart,
  StorefrontProduct,
} from "@/types/shopify";

const MONEY_FRAGMENT = `#graphql
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`;

const IMAGE_FRAGMENT = `#graphql
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    selectedOptions {
      name
      value
    }
    price {
      ...MoneyFragment
    }
    compareAtPrice {
      ...MoneyFragment
    }
    image {
      ...ImageFragment
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  fragment ProductFragment on Product {
    id
    title
    handle
    featuredImage {
      ...ImageFragment
    }
    options {
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          ...ProductVariantFragment
        }
      }
    }
  }
`;

const CART_LINE_FRAGMENT = `#graphql
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  fragment CartLineFragment on CartLine {
    id
    quantity
    cost {
      totalAmount {
        ...MoneyFragment
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        title
        selectedOptions {
          name
          value
        }
        price {
          ...MoneyFragment
        }
        image {
          ...ImageFragment
        }
        product {
          title
          handle
          featuredImage {
            ...ImageFragment
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `#graphql
  ${MONEY_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
    }
    lines(first: 25) {
      edges {
        node {
          ...CartLineFragment
        }
      }
    }
  }
`;

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const env = getServerEnv();

  if (!isShopifyConfigured()) {
    throw new Error("Shopify Storefront API is not configured");
  }

  const url = `https://${env.SHOPIFY_STORE_DOMAIN}/api/${env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Storefront API request failed with status ${response.status}`);
  }

  const json = (await response.json()) as GraphQlResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(", "));
  }

  if (!json.data) {
    throw new Error("Storefront API returned empty data");
  }

  return json.data;
}

function throwOnUserErrors(errors: Array<{ message: string }>) {
  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(", "));
  }
}

function mapProductNode(node: {
  id: string;
  title: string;
  handle: string;
  featuredImage: StorefrontProduct["featuredImage"];
  options: StorefrontProduct["options"];
  variants: { edges: Array<{ node: StorefrontProduct["variants"][number] }> };
}): StorefrontProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    featuredImage: node.featuredImage,
    options: node.options,
    variants: node.variants.edges.map((edge) => edge.node),
  };
}

export async function getProductByHandle(
  handle: string,
): Promise<StorefrontProduct | null> {
  const query = `#graphql
    ${PRODUCT_FRAGMENT}
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
  `;

  const data = await storefrontFetch<{
    product: Parameters<typeof mapProductNode>[0] | null;
  }>(query, { handle });

  if (!data.product) {
    return null;
  }

  return mapProductNode(data.product);
}

export async function createCart(): Promise<StorefrontCart> {
  const mutation = `#graphql
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFragment
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartCreate: CartPayload }>(mutation);
  throwOnUserErrors(data.cartCreate.userErrors);

  if (!data.cartCreate.cart) {
    throw new Error("Unable to create cart");
  }

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<StorefrontCart | null> {
  const query = `#graphql
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
  `;

  const data = await storefrontFetch<{ cart: StorefrontCart | null }>(query, {
    cartId,
  });
  return data.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<StorefrontCart> {
  const mutation = `#graphql
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartLinesAdd: CartPayload }>(mutation, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });

  throwOnUserErrors(data.cartLinesAdd.userErrors);

  if (!data.cartLinesAdd.cart) {
    throw new Error("Unable to add line items to cart");
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLineQuantity(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<StorefrontCart> {
  const mutation = `#graphql
    ${CART_FRAGMENT}
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartLinesUpdate: CartPayload }>(mutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  throwOnUserErrors(data.cartLinesUpdate.userErrors);

  if (!data.cartLinesUpdate.cart) {
    throw new Error("Unable to update cart line");
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string,
): Promise<StorefrontCart> {
  const mutation = `#graphql
    ${CART_FRAGMENT}
    mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartLinesRemove: CartPayload }>(mutation, {
    cartId,
    lineIds: [lineId],
  });

  throwOnUserErrors(data.cartLinesRemove.userErrors);

  if (!data.cartLinesRemove.cart) {
    throw new Error("Unable to remove cart line");
  }

  return data.cartLinesRemove.cart;
}

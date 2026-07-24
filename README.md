# SickFit x KC-1400 Collective — Game Day 3-Pack Landing Page

Next.js (App Router) storefront landing page for the SickFit × KC-1400 Collective
JSU game-day sock preorder, with a real Shopify Storefront API cart and hosted checkout.

## Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | Your store's `*.myshopify.com` domain. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | A Storefront API access token (see below). |
| `SHOPIFY_STOREFRONT_API_VERSION` | Storefront API version, e.g. `2026-04`. |
| `DEFAULT_PRODUCT_HANDLE` | Optional override for the product handle used in `src/config/products.ts`. |

Without `SHOPIFY_STORE_DOMAIN` / `SHOPIFY_STOREFRONT_ACCESS_TOKEN` set, the page still renders —
the purchase panel shows a "not configured yet" state instead of crashing.

### Generating a Storefront API access token

1. In Shopify admin, go to **Settings → Apps and sales channels → Develop apps**.
2. Click **Create an app**, name it (e.g. "Landing Page Storefront"), and create it.
3. Under **Configuration → Storefront API**, grant at least: `unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts` (cart mutations use
   the same cart scopes as checkout), and `unauthenticated_read_selling_plans` if using subscriptions.
4. Click **Install app**, then copy the generated **Storefront API access token** into
   `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

## Configuring the Product

- **Product handle / variant fallback**: edit `src/config/products.ts` — set `productHandle` to the
  real Shopify product handle (or leave the `DEFAULT_PRODUCT_HANDLE` env var to override it without
  a code change). `fallbackVariantId` can hold a specific variant GID if you want to skip handle
  lookup.
- **Copy / campaign content**: edit `src/config/landing-page.ts` — hero copy, partner card text,
  athlete bios/quotes/handles, benefits, preorder steps, shipping window, close date, and footer
  disclaimer all live there. Content still pending approval is tagged with bracketed placeholders
  (e.g. `[SHIP WINDOW]`, `[handle]`) and `NEEDS_APPROVAL_NOTE`.
- **Images**: every image is a `MediaConfig` (`{ src?, alt, placeholderLabel }`). Leave `src`
  undefined to show the styled diagonal-stripe placeholder; set `src` to a real image URL/path to
  swap in the real photo — no component changes needed.

## How Cart Persistence Works

- `src/lib/shopify-storefront.ts` wraps the Shopify Storefront GraphQL API (product lookup, cart
  create/read/update/remove).
- `src/app/api/cart/route.ts`, `.../checkout/route.ts`, `.../lines/route.ts` are server-only API
  routes — Shopify credentials never reach the browser.
- The cart ID is stored in an httpOnly cookie (`sickfit_kc_cart_id`, 14-day expiry). On page load,
  `CartProvider` calls `GET /api/cart?includeCart=1` to hydrate any existing cart.
- Adding an item calls `POST /api/cart/checkout`, which creates a cart if none exists (or the
  cookied one expired) and adds the line, returning the updated cart + `checkoutUrl`.
- Quantity updates / removals go through `PATCH` / `DELETE /api/cart/lines`.

## How Checkout Works

The cart button's **Checkout** action calls `window.location.assign(cart.checkoutUrl)` using the
`checkoutUrl` Shopify returns on the cart object — the app never constructs a checkout URL itself,
so it always lands on Shopify's own hosted checkout.

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import it in Vercel, or run `vercel` from this
   directory.
2. In the Vercel project's **Settings → Environment Variables**, add `SHOPIFY_STORE_DOMAIN`,
   `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_STOREFRONT_API_VERSION`, and optionally
   `DEFAULT_PRODUCT_HANDLE`.
3. Deploy. No database, KV, or additional services are required.

## Scope

This project is intentionally limited to: the landing page, Shopify product/variant lookup, and
the Shopify cart + hosted checkout redirect. It does not include fundraising trackers, the Shopify
Admin API, authentication, dashboards, or order webhooks.

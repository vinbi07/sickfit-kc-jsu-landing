import { z } from "zod";

const serverSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1).optional(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1).optional(),
  SHOPIFY_STOREFRONT_API_VERSION: z.string().min(1).default("2026-04"),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment variables: ${message}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export function isShopifyConfigured(): boolean {
  const env = getServerEnv();
  return Boolean(env.SHOPIFY_STORE_DOMAIN && env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

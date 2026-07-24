export const CART_COOKIE_NAME = "sickfit_kc_cart_id";
export const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 14;

export function cartCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE,
  };
}

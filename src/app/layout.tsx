import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "material-symbols/outlined.css";
import "./globals.css";

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SickFit x KC-1400 Collective | Game Day 3-Pack Preorder",
  description:
    "Three pairs of SickFit performance compression socks, built with three star student-athletes through the KC-1400 Collective for the 2026 football season.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilroy.variable} ${poppins.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

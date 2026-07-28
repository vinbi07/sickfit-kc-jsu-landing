import Image from "next/image";

import { CartButton } from "@/components/cart/CartButton";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./Header.module.css";

export function Header() {
  const { header } = landingPageConfig;

  return (
    <header className={styles.topbar}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.lockup}>
          <Image
            className={styles.logo}
            src="/logos/SickFIt Logo.png"
            alt="SickFit"
            width={100}
            height={99}
            priority
          />
          <span className={styles.x}>{header.lockupSeparator}</span>
          <Image
            className={styles.kcLogo}
            src="/logos/KC1400Logo.png"
            alt="KC-1400 Collective"
            width={160}
            height={90}
          />
        </div>
        <div className={styles.actions}>
          <a className={`btn ${styles.desktopCta}`} href="#preorder">
            {header.ctaLabel}
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

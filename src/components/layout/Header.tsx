import { CartButton } from "@/components/cart/CartButton";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./Header.module.css";

export function Header() {
  const { header } = landingPageConfig;

  return (
    <header className={styles.topbar}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.lockup}>
          <span className={styles.sf}>{header.lockupPrefix}</span>
          <span className={styles.x}>{header.lockupSeparator}</span>
          <span className={styles.kc}>{header.lockupSuffix}</span>
        </div>
        <div className={styles.actions}>
          <a className="btn" href="#preorder">
            {header.ctaLabel}
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

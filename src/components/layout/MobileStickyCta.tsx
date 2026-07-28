import { landingPageConfig } from "@/config/landing-page";

import styles from "./MobileStickyCta.module.css";

export function MobileStickyCta() {
  const { header } = landingPageConfig;

  return (
    <div className={styles.bar}>
      <a className={`btn btnBig ${styles.button}`} href="#preorder">
        {header.ctaLabel}
      </a>
    </div>
  );
}

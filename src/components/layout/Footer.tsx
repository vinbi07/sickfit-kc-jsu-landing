import { landingPageConfig } from "@/config/landing-page";

import styles from "./Footer.module.css";

export function Footer() {
  const { footer } = landingPageConfig;

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.disclaimer}>{footer.disclaimer}</p>
        <p className={`label ${styles.tag}`}>{footer.tag}</p>
      </div>
    </footer>
  );
}

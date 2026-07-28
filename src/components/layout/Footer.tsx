import Image from "next/image";

import { landingPageConfig } from "@/config/landing-page";

import styles from "./Footer.module.css";

export function Footer() {
  const { footer } = landingPageConfig;

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.logos}>
          <Image
            className={styles.logo}
            src="/logos/SickFIt Logo.png"
            alt="SickFit"
            width={100}
            height={99}
          />
          <Image
            className={styles.kcLogo}
            src="/logos/KC1400Logo.png"
            alt="KC-1400 Collective"
            width={160}
            height={90}
          />
        </div>
        <div className={styles.inner}>
          <p className={styles.disclaimer}>{footer.disclaimer}</p>
          <p className={`label ${styles.tag}`}>{footer.tag}</p>
        </div>
      </div>
    </footer>
  );
}

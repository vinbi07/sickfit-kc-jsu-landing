import { MotionCtaLink } from "@/components/motion/MotionCtaLink";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./MobileStickyCta.module.css";

export function MobileStickyCta() {
  const { header } = landingPageConfig;

  return (
    <div className={styles.bar}>
      <MotionCtaLink className={`btn btnBig ${styles.button}`} href="#preorder">
        {header.ctaLabel}
      </MotionCtaLink>
    </div>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import { MotionCtaLink } from "@/components/motion/MotionCtaLink";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./FinalCTASection.module.css";

export function FinalCTASection() {
  const { finalCta } = landingPageConfig;

  return (
    <section className={styles.final}>
      <div className="wrap">
        <Reveal>
          <h2 className={`display ${styles.title}`}>{finalCta.title}</h2>
          <p className={styles.body}>{finalCta.body}</p>
          <MotionCtaLink className={`btn btnBig ${styles.button}`} href="#preorder">
            Preorder the 3-Pack
          </MotionCtaLink>
        </Reveal>
      </div>
    </section>
  );
}

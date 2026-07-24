import { landingPageConfig } from "@/config/landing-page";

import styles from "./FinalCTASection.module.css";

export function FinalCTASection() {
  const { finalCta } = landingPageConfig;

  return (
    <section className={styles.final}>
      <div className="wrap">
        <h2 className={`display ${styles.title}`}>{finalCta.title}</h2>
        <p className={styles.body}>{finalCta.body}</p>
        <a className={`btn btnBig ${styles.button}`} href="#preorder">
          Preorder the 3-Pack
        </a>
      </div>
    </section>
  );
}

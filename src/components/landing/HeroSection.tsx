import { landingPageConfig } from "@/config/landing-page";

import styles from "./HeroSection.module.css";

export function HeroSection({ displayedPrice }: { displayedPrice: string }) {
  const { hero } = landingPageConfig;

  return (
    <section className={styles.hero}>
      <div className="wrap">
        <p className={`label ${styles.eyebrow}`}>{hero.eyebrow}</p>
        <h1 className={`display ${styles.title}`}>
          {hero.titleLineOne}
          <br />
          <span className={styles.titleThin}>{hero.titleLineTwo}</span>
        </h1>
        <p className={styles.sub}>{hero.description}</p>
        <div className={styles.ctaRow}>
          <a className="btn btnBig" href="#preorder">
            {hero.ctaLabel}
          </a>
          <div className={styles.priceBlock}>
            {displayedPrice}
            <span className={styles.priceMeta}>3-Pack · Preorder</span>
          </div>
        </div>
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className="label">{hero.meta.athletesLabel}</span>
            <p>{hero.meta.athletesValue}</p>
          </div>
          <div className={styles.metaItem}>
            <span className="label">{hero.meta.shipsLabel}</span>
            <p>{landingPageConfig.preorderSteps.shippingWindow}</p>
          </div>
          <div className={styles.metaItem}>
            <span className="label">{hero.meta.quantityLabel}</span>
            <p>{hero.meta.quantityValue}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

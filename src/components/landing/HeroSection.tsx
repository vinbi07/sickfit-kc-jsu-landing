import Image from "next/image";

import { MotionCtaLink } from "@/components/motion/MotionCtaLink";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { landingPageConfig } from "@/config/landing-page";
import { fadeLeft } from "@/lib/motion";

import styles from "./HeroSection.module.css";

export function HeroSection({ displayedPrice }: { displayedPrice: string }) {
  const { hero } = landingPageConfig;

  return (
    <section className={styles.hero}>
      <Image
        className={styles.heroImage}
        src="/SickFitJSUKC-HeroImage.png"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className={`wrap ${styles.content}`}>
        <StaggerGroup mount>
          <StaggerItem as="p" variants={fadeLeft} className={`label ${styles.eyebrow}`}>
            {hero.eyebrow}
          </StaggerItem>
          <h1 className={`display ${styles.title}`}>
            <StaggerItem as="span" variants={fadeLeft} style={{ display: "inline-block" }}>
              {hero.titleLineOne}
            </StaggerItem>
            <br />
            <StaggerItem
              as="span"
              variants={fadeLeft}
              className={styles.titleThin}
              style={{ display: "inline-block" }}
            >
              {hero.titleLineTwo}
            </StaggerItem>
          </h1>
          <StaggerItem as="p" variants={fadeLeft} className={styles.sub}>
            {hero.description}
          </StaggerItem>
          <StaggerItem as="div" variants={fadeLeft} className={styles.ctaRow}>
            <MotionCtaLink className="btn btnBig" href="#preorder">
              {hero.ctaLabel}
            </MotionCtaLink>
            <div className={styles.priceBlock}>
              {displayedPrice}
              <span className={styles.priceMeta}>3-Pack · Preorder</span>
            </div>
          </StaggerItem>
          <StaggerItem as="div" variants={fadeLeft} className={styles.metaRow}>
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
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

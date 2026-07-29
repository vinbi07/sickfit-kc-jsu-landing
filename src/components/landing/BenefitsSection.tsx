import { Reveal } from "@/components/motion/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import { Icon } from "@/components/ui/Icon";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./BenefitsSection.module.css";

export function BenefitsSection() {
  const { benefits } = landingPageConfig;

  return (
    <section className={styles.why}>
      <div className="wrap">
        <Reveal>
          <span className="label" style={{ color: "var(--red)" }}>
            {benefits.eyebrow}
          </span>
          <h2 className={`display ${styles.heading}`}>{benefits.title}</h2>
        </Reveal>
        <Carousel className={styles.grid} ariaLabel="Why SickFit">
          {benefits.cards.map((card) => (
            <div className={styles.card} key={card.title}>
              <span className={styles.cardIndex}>{card.index}</span>
              <Icon name={card.icon} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

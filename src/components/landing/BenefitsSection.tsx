import { landingPageConfig } from "@/config/landing-page";

import styles from "./BenefitsSection.module.css";

export function BenefitsSection() {
  const { benefits } = landingPageConfig;

  return (
    <section className={styles.why}>
      <div className="wrap">
        <span className="label" style={{ color: "var(--red)" }}>
          {benefits.eyebrow}
        </span>
        <h2 className={`display ${styles.heading}`}>{benefits.title}</h2>
        <div className={styles.grid}>
          {benefits.cards.map((card) => (
            <div className={styles.card} key={card.title}>
              <span className={`label ${styles.cardIndex}`}>{card.index}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

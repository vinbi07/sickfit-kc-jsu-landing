import Image from "next/image";

import { landingPageConfig } from "@/config/landing-page";

import styles from "./PartnershipSection.module.css";

export function PartnershipSection() {
  const { partnership } = landingPageConfig;

  return (
    <section className={styles.partners}>
      <div className="wrap">
        <span className="label" style={{ color: "var(--red)" }}>
          {partnership.eyebrow}
        </span>
        <h2 className={`display ${styles.heading}`}>{partnership.title}</h2>
        <div className={styles.grid}>
          {partnership.cards.map((card) => (
            <div
              key={card.title}
              className={[styles.card, card.featured ? styles.cardFeatured : ""].join(" ")}
            >
              <span className="label">{card.label}</span>
              {card.title === "KC-1400 Collective" ? (
                <Image
                  className={styles.cardLogo}
                  src="/logos/KC1400Logo.png"
                  alt="KC-1400 Collective"
                  width={160}
                  height={90}
                />
              ) : (
                <h3
                  className={[
                    styles.cardTitle,
                    card.featured ? styles.cardTitleFeatured : "",
                  ].join(" ")}
                >
                  {card.title}
                </h3>
              )}
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

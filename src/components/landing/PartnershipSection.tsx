import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./PartnershipSection.module.css";

export function PartnershipSection() {
  const { partnership, athletes } = landingPageConfig;

  return (
    <section className={styles.partners}>
      <div className="wrap">
        <Reveal>
          <span className="label" style={{ color: "var(--red)" }}>
            {partnership.eyebrow}
          </span>
          <h2 className={`display ${styles.heading}`}>{partnership.title}</h2>
        </Reveal>
        <StaggerGroup className={styles.grid}>
          {partnership.cards.map((card) => (
            <StaggerItem
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
              ) : card.title === "SickFit" ? (
                <Image
                  className={styles.cardLogo}
                  src="/logos/SickFIt Logo.png"
                  alt="SickFit"
                  width={100}
                  height={99}
                />
              ) : card.title === "Student-Athletes" ? (
                <div className={styles.athletePhotos}>
                  {athletes.roster.map((athlete) => (
                    <div className={styles.athletePhoto} key={athlete.name}>
                      {athlete.photo.src ? (
                        <Image
                          src={athlete.photo.src}
                          alt={athlete.photo.alt}
                          fill
                          sizes="60px"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

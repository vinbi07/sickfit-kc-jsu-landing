import Image from "next/image";

import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./AthleteSection.module.css";

export function AthleteSection() {
  const { athletes } = landingPageConfig;

  return (
    <section className={styles.athletes}>
      <div className="wrap">
        <Reveal>
          <div className={styles.sectionHead}>
            <div className={styles.headingBlock}>
              <span className={`label ${styles.eyebrow}`}>
                {athletes.eyebrow}
              </span>
              <h2 className={`display ${styles.heading}`}>
                {athletes.titleLineOne}
                <br />
                {athletes.titleLineTwo}
              </h2>
            </div>
            <p className={styles.intro}>{athletes.intro}</p>
          </div>
        </Reveal>
        <Carousel className={styles.grid} ariaLabel="Athlete roster">
          {athletes.roster.map((athlete) => {
            const [firstName, ...lastNameParts] = athlete.name.split(" ");
            const lastName = lastNameParts.join(" ");

            return (
              <article className={styles.card} key={athlete.name}>
                <span className={styles.number} aria-hidden="true">
                  {athlete.number}
                </span>
                <div className={styles.photoFrame}>
                  <MediaPlaceholder
                    media={athlete.photo}
                    sizes="(max-width: 820px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={`label ${styles.position}`}>
                    {athlete.position}
                  </span>
                  <h3 className={styles.name}>
                    {firstName} <br className={styles.nameBreak} />
                    {lastName}
                  </h3>
                </div>
                <div className={styles.credential}>{athlete.credential}</div>
                <div className={styles.quote}>
                  <div className={styles.quoteHead}>
                    {athlete.quote.avatarSrc ? (
                      <Image
                        className={styles.avatar}
                        src={athlete.quote.avatarSrc}
                        alt=""
                        width={34}
                        height={34}
                        aria-hidden="true"
                      />
                    ) : (
                      <div className={styles.avatar} aria-hidden="true" />
                    )}
                    <div>
                      <div className={styles.quoteName}>
                        {athlete.quote.name}
                      </div>
                      <div className={styles.quoteHandle}>
                        {athlete.quote.handle}
                      </div>
                    </div>
                  </div>
                  <p className={styles.quoteText}>
                    &ldquo;{athlete.quote.quote}&rdquo;
                  </p>
                  {athlete.quote.isDraft ? (
                    <span className={styles.quoteDraft}>
                      Draft quote. Athlete approval required via KC-1400.
                    </span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Icon } from "@/components/ui/Icon";
import { landingPageConfig } from "@/config/landing-page";

import styles from "./PreorderStepsSection.module.css";

export function PreorderStepsSection() {
  const { preorderSteps } = landingPageConfig;

  return (
    <section className={styles.how}>
      <div className="wrap">
        <Reveal>
          <span className="label" style={{ color: "var(--red)" }}>
            {preorderSteps.eyebrow}
          </span>
          <h2 className={`display ${styles.heading}`}>{preorderSteps.title}</h2>
        </Reveal>
        <StaggerGroup className={styles.grid}>
          {preorderSteps.steps.map((step) => (
            <StaggerItem className={styles.step} key={step.title}>
              <span className={styles.stepLabel}>{step.label}</span>
              <Icon name={step.icon} className={styles.stepIcon} />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

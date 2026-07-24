import { landingPageConfig } from "@/config/landing-page";

import styles from "./PreorderStepsSection.module.css";

export function PreorderStepsSection() {
  const { preorderSteps } = landingPageConfig;

  return (
    <section className={styles.how}>
      <div className="wrap">
        <span className="label" style={{ color: "var(--red)" }}>
          {preorderSteps.eyebrow}
        </span>
        <h2 className={`display ${styles.heading}`}>{preorderSteps.title}</h2>
        <div className={styles.grid}>
          {preorderSteps.steps.map((step) => (
            <div className={styles.step} key={step.title}>
              <span className={`label ${styles.stepLabel}`}>{step.label}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

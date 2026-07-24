import { landingPageConfig } from "@/config/landing-page";

import styles from "./AnnouncementTicker.module.css";

export function AnnouncementTicker() {
  const { items } = landingPageConfig.ticker;
  const doubled = [...items, ...items];

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            {index < doubled.length - 1 ? " ●" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

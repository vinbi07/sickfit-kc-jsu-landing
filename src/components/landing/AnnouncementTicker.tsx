import { landingPageConfig } from "@/config/landing-page";

import styles from "./AnnouncementTicker.module.css";

export function AnnouncementTicker() {
  const { items } = landingPageConfig.ticker;
  const doubled = [...items, ...items];

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {doubled.map((item, index) => (
          <span className={styles.item} key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

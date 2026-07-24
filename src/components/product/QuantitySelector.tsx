"use client";

import styles from "./QuantitySelector.module.css";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 20,
  disabled,
}: QuantitySelectorProps) {
  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.button}
        aria-label="Decrease quantity"
        disabled={disabled || quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
      >
        −
      </button>
      <span className={styles.value} aria-live="polite" aria-label={`Quantity: ${quantity}`}>
        {quantity}
      </span>
      <button
        type="button"
        className={styles.button}
        aria-label="Increase quantity"
        disabled={disabled || quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
      >
        +
      </button>
    </div>
  );
}

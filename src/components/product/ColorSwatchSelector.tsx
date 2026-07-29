"use client";

import { MotionButton } from "@/components/motion/MotionButton";

import styles from "./ColorSwatchSelector.module.css";

type ColorSwatchSelectorProps = {
  colors: { name: string }[];
  activeColor: string | null;
  onSelect: (name: string) => void;
};

const SWATCH_CLASS: Record<string, string> = {
  navy: styles.swatchNavy,
  red: styles.swatchRed,
  white: styles.swatchWhite,
};

export function ColorSwatchSelector({ colors, activeColor, onSelect }: ColorSwatchSelectorProps) {
  if (colors.length === 0) {
    return null;
  }

  return (
    <div className={styles.group}>
      <span className={`label ${styles.label}`}>Colors</span>
      <div className={styles.values} role="group" aria-label="Color">
        {colors.map((color) => {
          const isSelected = activeColor === color.name;
          const swatchClass = SWATCH_CLASS[color.name.toLowerCase()] ?? "";

          return (
            <MotionButton
              key={color.name}
              type="button"
              className={[styles.swatch, swatchClass, isSelected ? styles.swatchSelected : ""].join(" ")}
              aria-pressed={isSelected}
              aria-label={color.name}
              title={color.name}
              onClick={() => onSelect(color.name)}
            />
          );
        })}
      </div>
    </div>
  );
}

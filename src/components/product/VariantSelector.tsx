"use client";

import type { ProductOption, StorefrontVariant } from "@/types/shopify";

import styles from "./VariantSelector.module.css";

type VariantSelectorProps = {
  options: ProductOption[];
  variants: StorefrontVariant[];
  selectedOptions: Record<string, string>;
  onSelect: (optionName: string, value: string) => void;
};

function isValueAvailable(
  variants: StorefrontVariant[],
  selectedOptions: Record<string, string>,
  optionName: string,
  value: string,
) {
  const candidate = { ...selectedOptions, [optionName]: value };
  return variants.some(
    (variant) =>
      variant.availableForSale &&
      variant.selectedOptions.every((selected) => candidate[selected.name] === selected.value),
  );
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onSelect,
}: VariantSelectorProps) {
  if (options.length === 0 || (options.length === 1 && options[0].values.length <= 1)) {
    return null;
  }

  return (
    <div>
      {options.map((option) => (
        <div className={styles.optionGroup} key={option.name}>
          <span className={`label ${styles.optionLabel}`}>{option.name}</span>
          <div className={styles.values} role="group" aria-label={option.name}>
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = isValueAvailable(variants, selectedOptions, option.name, value);

              return (
                <button
                  key={value}
                  type="button"
                  className={[
                    styles.valueButton,
                    isSelected ? styles.valueButtonSelected : "",
                  ].join(" ")}
                  aria-pressed={isSelected}
                  disabled={!isAvailable}
                  onClick={() => onSelect(option.name, value)}
                >
                  {value}
                  {!isAvailable ? " (Sold out)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

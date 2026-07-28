import styles from "./Icon.module.css";

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <span
      className={["material-symbols-outlined", styles.icon, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

import Doodle from "./Doodle";
import styles from "./Stamp.module.css";

const COLORS = {
  sky: "var(--sky)",
  rose: "var(--rose)",
  sage: "var(--sage)",
  mustard: "var(--mustard)",
};

export default function Stamp({
  doodle = "flower",
  color = "sky",
  rotate = 6,
  style,
  className,
}) {
  return (
    <div
      className={`${styles.stamp} ${className ?? ""}`}
      aria-hidden="true"
      style={{
        "--stamp-color": COLORS[color] ?? COLORS.sky,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <Doodle type={doodle} size={22} />
    </div>
  );
}

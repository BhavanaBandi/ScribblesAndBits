import styles from "./Tape.module.css";

const COLORS = {
  mustard: "rgba(207, 154, 62, 0.55)",
  rose: "rgba(201, 123, 123, 0.55)",
  sage: "rgba(127, 146, 113, 0.55)",
  sky: "rgba(124, 155, 171, 0.55)",
};

export default function Tape({ color = "mustard", rotate = -4, style, className }) {
  return (
    <span
      className={`${styles.tape} ${className ?? ""}`}
      aria-hidden="true"
      style={{
        "--tape-color": COLORS[color] ?? COLORS.mustard,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    />
  );
}

import Doodle from "./Doodle";
import Tape from "./Tape";
import styles from "./ScrapbookBackground.module.css";

// Decorative clutter for the page. Kept as small discrete items (not one
// background image) so any of them can be tweaked, added, or removed later.
// `tier` controls how many survive on smaller screens: "always" items are
// the curated 3-5 that stay on mobile, "tablet" and "desktop" add more
// density as the viewport grows.
const ITEMS = [
  { tier: "always", top: "8%", left: "6%", rotate: -10, node: <Doodle type="star" color="var(--mustard)" /> },
  { tier: "always", top: "14%", left: "88%", rotate: 8, node: <Doodle type="heart" color="var(--rose)" /> },
  { tier: "always", top: "80%", left: "10%", rotate: -6, node: <Tape color="sage" rotate={-8} /> },
  { tier: "always", top: "85%", left: "82%", rotate: 4, node: <Doodle type="flower" color="var(--sage)" /> },
  { tier: "always", top: "45%", left: "4%", rotate: 0, node: <Doodle type="scribble" color="var(--sky)" size={26} /> },

  { tier: "tablet", top: "3%", left: "80%", rotate: -4, node: <span className={styles.note}>remember to breathe</span> },
  { tier: "tablet", top: "28%", left: "92%", rotate: 6, node: <Doodle type="cloud" color="var(--sky)" size={36} /> },
  { tier: "tablet", top: "60%", left: "94%", rotate: -10, node: <Doodle type="swirl" color="var(--mustard)" /> },
  { tier: "tablet", top: "92%", left: "48%", rotate: 3, node: <Tape color="rose" rotate={5} /> },
  { tier: "tablet", top: "38%", left: "2%", rotate: -8, node: <Doodle type="star" color="var(--sage)" size={22} /> },

  { tier: "desktop", top: "4%", left: "22%", rotate: 5, node: <Doodle type="stain" color="var(--mustard)" size={44} /> },
  { tier: "desktop", top: "18%", left: "10%", rotate: -3, node: <Doodle type="arrow" color="var(--rose)" /> },
  { tier: "desktop", top: "68%", left: "3%", rotate: 4, node: <span className={styles.note}>a little life update</span> },
  { tier: "desktop", top: "12%", left: "65%", rotate: -6, node: <Doodle type="flower" color="var(--rose)" size={30} /> },
  { tier: "desktop", top: "52%", left: "90%", rotate: 8, node: <Doodle type="heart" color="var(--sage)" size={22} /> },
  { tier: "desktop", top: "88%", left: "20%", rotate: -5, node: <Doodle type="swirl" color="var(--sky)" size={28} /> },
  { tier: "desktop", top: "92%", left: "88%", rotate: 6, node: <span className={styles.note}>this one means a lot to me</span> },
  { tier: "desktop", top: "76%", left: "60%", rotate: -4, node: <Doodle type="star" color="var(--sky)" size={20} /> },
];

export default function ScrapbookBackground() {
  return (
    <div className={styles.field} aria-hidden="true">
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className={`${styles.item} ${styles[item.tier]}`}
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotate}deg)`,
          }}
        >
          {item.node}
        </div>
      ))}
    </div>
  );
}

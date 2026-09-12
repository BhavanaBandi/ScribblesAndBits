import Link from "next/link";
import { hashSlug } from "@/lib/newsletters";
import Tape from "./Tape";
import styles from "./Archive.module.css";

const TAPE_COLORS = ["mustard", "rose", "sage", "sky"];

export default function Archive({ newsletters }) {
  if (newsletters.length === 0) {
    return (
      <p className={styles.empty}>
        nothing tucked away here yet — check back next month ♡
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {newsletters.map((letter) => {
        const hash = hashSlug(letter.slug);
        const rotate = (hash % 13) - 6;
        const translateY = (hash % 5) * 4 - 8;
        const tapeColor = TAPE_COLORS[hash % TAPE_COLORS.length];

        return (
          <Link
            key={letter.slug}
            href={`/letter/${letter.slug}`}
            className={styles.card}
            style={{
              transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
            }}
          >
            <div className={styles.tapeAccent}>
              <Tape color={tapeColor} rotate={rotate / 2} />
            </div>
            <div className={styles.envelopeShape}>
              <div className={styles.labels}>
                <span className={styles.month}>
                  {letter.month?.toUpperCase()}
                </span>
                <span className={styles.year}>{letter.year}</span>
              </div>
            </div>
            {letter.note && <p className={styles.note}>&ldquo;{letter.note}&rdquo;</p>}
          </Link>
        );
      })}
    </div>
  );
}

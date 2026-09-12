import Doodle from "./Doodle";
import styles from "./Newsletter.module.css";

export default function Newsletter({ newsletter }) {
  const { title, month, year, contentHtml } = newsletter;

  return (
    <article>
      <header className={styles.header}>
        <p className={styles.date}>
          {month} {year}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <Doodle
          type="swirl"
          size={28}
          color="var(--mustard)"
          className={styles.underline}
        />
      </header>
      <div
        className={styles.prose}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}

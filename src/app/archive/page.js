import Link from "next/link";
import ArchiveGrid from "@/components/Archive";
import { getAllNewsletters } from "@/lib/newsletters";
import styles from "./page.module.css";

export const metadata = {
  title: "Other Bits — Scribbles & Bits",
};

export default function ArchivePage() {
  const newsletters = getAllNewsletters();

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← back
        </Link>
        <h1 className={styles.title}>my other bits</h1>
        <p className={styles.subtitle}>a little box of old letters</p>
      </header>
      <ArchiveGrid newsletters={newsletters} />
    </div>
  );
}
